import { UserEntity } from '../user';

export class PostEntity {
  id: number;
  title: string;
  content: string;
  user: UserEntity | number | { id: number };
}
