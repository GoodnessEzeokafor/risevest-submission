import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PostFactoryServices } from './post-factory.service';
import { ICreatePost, IDatabaseServices, IGetPosts } from 'src/core';
import { ErrorUtilsService, ResponseUtilsService } from 'src/services/utils';
import { IAddComments, IGetComments } from 'src/core/types/comment';
import { DataSource } from 'typeorm';

@Injectable()
export class PostServices implements OnApplicationShutdown {
  constructor(
    private readonly data: IDatabaseServices,
    private readonly postFactory: PostFactoryServices,
    private readonly response: ResponseUtilsService,
    private readonly connection: DataSource,
    private readonly error: ErrorUtilsService,
  ) {}
  async onApplicationShutdown(signal: string) {
    console.log('signal', signal);
    this.connection.destroy();
  }

  async createPost(payload: ICreatePost) {
    try {
      const factory = await this.postFactory.create({
        ...payload,
      });
      await this.data.posts.create(factory);

      return this.response.success201Response({
        message: 'Created successfully',
        data: {},
      });
    } catch (error) {
      return this.error.error({
        error,
      });
    }
  }
  async addComment(payload: IAddComments) {
    const { post } = payload;
    try {
      const postExists = await this.data.posts.findOne({ id: post });
      if (!postExists) {
        return this.response.error404Response('Post does not exists');
      }
      const factory = await this.postFactory.createComment({
        ...payload,
      });
      await this.data.comments.create(factory);

      return this.response.success201Response({
        message: 'Created successfully',
        data: {},
      });
    } catch (error) {
      return this.error.error({
        error,
      });
    }
  }

  async topPost() {
    try {
      const query = `WITH latest_comments AS (
        SELECT posts."userId", posts.id AS postId, MAX(comments."createdAt") AS latestCommentTime
        FROM posts
        LEFT JOIN comments ON posts.id = comments."postId"
        GROUP BY posts."userId", posts.id
    ),
    user_posts_count AS (
        SELECT posts."userId", COUNT(*) AS postCount
        FROM posts
        GROUP BY posts."userId"
    ),
    ranked_users AS (
        SELECT u.id, u."fullName", p.title, c.comment, uc.postCount,
               ROW_NUMBER() OVER (ORDER BY uc.postCount DESC) AS rank
        FROM users u
        JOIN posts p ON u.id = p."userId"
        JOIN latest_comments lc ON p.id = lc.postId
        JOIN comments c ON lc.postId = c."postId" AND lc.latestCommentTime = c."createdAt"
        JOIN user_posts_count uc ON u.id = uc."userId"
    )
    SELECT id, "fullName", title, "comment"
    FROM ranked_users
    WHERE rank <= 3;`;
      const data = await this.data.posts.runQuery(query);
      return this.response.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }
  async getPosts(payload: IGetPosts) {
    try {
      const filterQuery = this.postFactory.cleanPostQuery(payload);
      const { data, pagination } = await this.data.posts.findAllWithPagination(
        filterQuery,
        { relationFields: ['comments'] },
      );

      return this.response.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }

  async getSinglePost(postId: number) {
    try {
      const data = await this.data.posts.findOne({ id: postId });
      if (!data) {
        return this.response.error404Response('Post does not exists');
      }
      return this.response.success200Response({
        message: 'Retrieved successfully',
        data,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }

  async getPostComments(payload: IGetComments) {
    try {
      const filterQuery = this.postFactory.cleanCommentQuery(payload);

      const { data, pagination } =
        await this.data.comments.findAllWithPagination(filterQuery);
      return this.response.success200Response({
        message: 'Retrieved successfully',
        data,
        pagination,
      });
    } catch (error) {
      return this.error.error({ error });
    }
  }
}
