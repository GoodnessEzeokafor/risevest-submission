import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ICreatePost, IGetPosts, IResponse } from 'src/core';
import { Authorization } from 'src/core/decorators';
import { CreatePostDto, FindByPostIdDto, GetPostsQueryDto } from 'src/core/dto';
import { AddCommentDto, GetCommentQueryDto } from 'src/core/dto/comment';
import { IAddComments, IGetComments } from 'src/core/types/comment';
import { PostServices } from 'src/services/use-case/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly services: PostServices) {}

  @Authorization(true)
  @Post('/')
  async createPost(
    @Req() req: Request,
    @Body() body: CreatePostDto,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const payload: ICreatePost = {
      ...body,
      user,
    };
    const response: IResponse = await this.services.createPost(payload);
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/')
  async getPosts(
    @Req() req: Request,
    @Query() query: GetPostsQueryDto,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const payload: IGetPosts = {
      ...query,
      user,
    };
    const response: IResponse = await this.services.getPosts(payload);
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/top/posts')
  async topPost(@Res() res: Response) {
    const response: IResponse = await this.services.topPost();
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/:postId')
  async getSinglePost(@Param() params: FindByPostIdDto, @Res() res: Response) {
    const { postId } = params;
    const response: IResponse = await this.services.getSinglePost(postId);
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/:postId/comments')
  async getPostComments(
    @Query() query: GetCommentQueryDto,
    @Param() params: FindByPostIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const { postId: post } = params;
    const payload: IGetComments = { ...query, post, user };
    console.log('--- here ---');
    const response: IResponse = await this.services.getPostComments(payload);
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Post('/:postId/comments')
  async addComment(
    @Body() body: AddCommentDto,
    @Param() params: FindByPostIdDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const { postId: post } = params;
    const payload: IAddComments = { ...body, post, user };
    const response: IResponse = await this.services.addComment(payload);
    return res.status(response.status).json(response);
  }
}
