import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { Comment, Issue, Project } from '.';
import { UserType } from 'constants/user';

@Entity({ name: 'tbuser', schema: 'public' } )
class User extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(100)],
    Type: [is.required(), is.oneOf(Object.values(UserType))],
    Email: [is.required(), is.email(), is.maxLength(200)],
  };

  PrimaryColumnName = "UserId";

  @PrimaryGeneratedColumn()
  UserId: number;

  @Column('varchar',{ nullable: true })
  Name: string| null;

  @Column('varchar',{ nullable: true })
  Phone: string| null;

  @Column('varchar',{ nullable: true })
  Email: string| null;

  @Column('varchar',{ nullable: true })
  Address: string| null;

  @Column('varchar',{ nullable: true })
  Password: string| null;

  @Column('varchar',{ nullable: true })
  UserName: string| null;

  @Column('varchar',{ length: 50 ,nullable: true })
  Type: UserType;

  @Column('varchar', { length: 2000 ,nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @ManyToMany(
    () => Issue,
    issue => issue.users,
  )
  issues: Issue[];

  @ManyToOne(
    () => Project,
    project => project.users,
  )
  project: Project;

  @RelationId((user: User) => user.project)
  projectId: number;

  /*
  @ManyToOne( ()=> Department, department => department.users, )
  department:Department;

  @RelationId((user: User) => user.department)
  DepartmentId: Department;
  */
}

export default User;
