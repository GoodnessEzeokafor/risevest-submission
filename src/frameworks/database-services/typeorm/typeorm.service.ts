import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './models/User';
import { TypeOrmGenericRepository } from './typeorm-generic-repository.service';
import { IDatabaseServices } from 'src/core';
import { Post } from './models/Post';
import { Comment } from './models/Comment';

@Injectable()
export class TypeOrmDatabaseServices
  implements IDatabaseServices, OnApplicationBootstrap
{
  users: TypeOrmGenericRepository<User>;
  posts: TypeOrmGenericRepository<Post>;
  comments: TypeOrmGenericRepository<Comment>;

  constructor(private connection: DataSource) {}

  onApplicationBootstrap() {
    this.users = new TypeOrmGenericRepository<User>(this.connection, User);
    this.posts = new TypeOrmGenericRepository<Post>(this.connection, Post);
    this.comments = new TypeOrmGenericRepository<Comment>(
      this.connection,
      Comment,
    );
  }
}
