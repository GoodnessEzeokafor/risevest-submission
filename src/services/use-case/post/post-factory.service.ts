import { Injectable } from '@nestjs/common';
import { CommentEntity, IGetPosts, PostEntity } from 'src/core';
import { IGetComments } from 'src/core/types/comment';

@Injectable()
export class PostFactoryServices {
  async create(data: Partial<PostEntity>) {
    const post = new PostEntity();
    if (data.id) post.id = data.id;
    if (data.title) post.title = data.title;
    if (data.content) post.content = data.content;
    if (data.user) post.user = data.user;

    return post;
  }

  async createComment(data: Partial<CommentEntity>) {
    const comment = new CommentEntity();
    if (data.id) comment.id = data.id;
    if (data.comment) comment.comment = data.comment;
    if (data.post) comment.post = data.post;
    if (data.user) comment.user = data.user;

    return comment;
  }

  cleanPostQuery(data: IGetPosts): Partial<IGetPosts> {
    let key = {};
    if (data.id) key['id'] = data.id;
    if (data.title) key['title'] = data.title;
    if (data.user) {
      key['user'] = {
        id: Number(data.user),
      };
    }
    if (data.perpage) key['perpage'] = data.perpage;
    if (data.page) key['page'] = data.page;
    if (data.sort) key['sort'] = data.sort;
    if (data.q) key['q'] = data.q;
    return key;
  }

  cleanCommentQuery(data: IGetComments): Partial<IGetComments> {
    let key = {};
    if (data.id) key['id'] = data.id;
    if (data.user) {
      key['user'] = {
        id: Number(data.user),
      };
    }
    if (data.post) {
      key['post'] = {
        id: Number(data.post),
      };
    }

    if (data.perpage) key['perpage'] = data.perpage;
    if (data.page) key['page'] = data.page;
    if (data.sort) key['sort'] = data.sort;
    if (data.q) key['q'] = data.q;
    return key;
  }
}
