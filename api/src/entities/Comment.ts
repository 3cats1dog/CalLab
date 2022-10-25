import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { Issue, User } from '.';

@Entity({ name: 'comment', schema: 'public' } )
class Comment extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    body: [is.required(), is.maxLength(50000)],
  };

  @PrimaryGeneratedColumn()
  id: number;
  PrimaryColumnName() { return  "id";}
  
  @Column('text')
  body: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  user: User;

  @Column('integer')
  userId: number;

  @ManyToOne(
    () => Issue,
    issue => issue.comments,
    { onDelete: 'CASCADE' },
  )
  issue: Issue;

  @Column('integer')
  issueId: number;
}

export default Comment;
