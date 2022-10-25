import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';


@Entity({ name: 'tbdepartment', schema: 'public' }  )
class Department extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(200)],
  };

  PrimaryColumnName (){ return "DepartmentId";}

  @PrimaryGeneratedColumn()
  DepartmentId: number;

  @Column('varchar')
  Name: string | null;

  @Column('varchar')
  Description: string | null;

  /*
  @OneToMany(() => User, user => user.department)
  users: User[];
  */


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default Department;










