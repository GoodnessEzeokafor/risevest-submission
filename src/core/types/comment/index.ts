import { AddCommentDto, GetCommentQueryDto } from 'src/core/dto/comment';

export type IGetComments = GetCommentQueryDto;
export type IAddComments = AddCommentDto & {
  post: number;
  user: number;
};
