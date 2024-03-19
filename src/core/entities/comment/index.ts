import { PostEntity } from '../post';
import { UserEntity } from '../user';

export class CommentEntity {
  id: number;
  comment: string;
  user: UserEntity | number | { id: number };
  post: PostEntity | number | { id: number };
}
