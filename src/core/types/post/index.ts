import { CreatePostDto, GetPostsQueryDto } from 'src/core/dto';

export type ICreatePost = CreatePostDto & {
  user: number;
};

export type IGetPosts = GetPostsQueryDto;
