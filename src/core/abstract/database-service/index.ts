import { CommentEntity, PostEntity, UserEntity } from 'src/core/entities';
import { IGenericRepository } from '../generic-repository';

export abstract class IDatabaseServices {
  abstract users: IGenericRepository<UserEntity>;
  abstract posts: IGenericRepository<PostEntity>;
  abstract comments: IGenericRepository<CommentEntity>;
}

