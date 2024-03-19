import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { DatabaseVersion, PostEntity } from 'src/core';

@Entity('posts')
@Index(['title', 'content'], {
  fulltext: true,
})
export class Post implements PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({
    default: DatabaseVersion.V1,
  })
  version: DatabaseVersion;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
