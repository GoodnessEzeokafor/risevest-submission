import { UserServices } from 'src/services/use-case/user/user.service';
import { Request, Response } from 'express';
import {
  ICreatePost,
  ICreateUser,
  IGetUsers,
  ILoginUser,
  IResponse,
} from 'src/core';
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
import {
  CreatePostDto,
  CreateUserDto,
  FindByIdDto,
  GetPostsQueryDto,
  GetUsersQueryDto,
  LoginUserDto,
} from 'src/core/dto';
import { Authorization } from 'src/core/decorators';
import { PostServices } from 'src/services/use-case/post/post.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly services: UserServices,
    private readonly postServices: PostServices,
  ) {}

  @Post('/')
  async createUser(@Res() res: Response, @Body() body: CreateUserDto) {
    const payload: ICreateUser = {
      ...body,
    };
    const response: IResponse = await this.services.createUser(payload);
    return res.status(response.status).json(response);
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body: LoginUserDto) {
    const payload: ILoginUser = {
      ...body,
    };
    const response: IResponse = await this.services.login(payload);
    return res.status(response.status).json(response);
  }

  @Get('/')
  async getUsers(@Query() query: GetUsersQueryDto, @Res() res: Response) {
    const payload: IGetUsers = {
      ...query,
    };
    const response: IResponse = await this.services.getUsers(payload);
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/auth')
  async getAuthUser(@Req() req: Request, @Res() res: Response) {
    const { id, email, firstName, lastName } = req.user;
    const response: IResponse = await this.services.getAuthUser({
      id,
      email,
      firstName,
      lastName,
    });
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Get('/:id/posts')
  async getUserPosts(
    @Query() query: GetPostsQueryDto,
    @Param() _params: FindByIdDto, // ignoring this, its more safer to get the user's id from the auth middleware/guard
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const response: IResponse = await this.postServices.getPosts({
      ...query,
      user,
    });
    return res.status(response.status).json(response);
  }

  @Authorization(true)
  @Post('/:id/posts')
  async createPost(
    @Body() body: CreatePostDto,
    @Param() _params: FindByIdDto, // ignoring this, its more safer to get the user's id from the auth middleware/guard
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { id: user } = req.user;
    const payload: ICreatePost = { ...body, user };
    const response: IResponse = await this.postServices.createPost(payload);
    return res.status(response.status).json(response);
  }
}
