
import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  RelationId,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { SubProcedure, Category } from '.';
//import { template } from 'lodash';


@Entity({ name: 'tbprocedure', schema: 'public' }    ) 
class Procedure extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(100)],
    Description: is.maxLength(200),
    CategoryId:is.required(),
  };

  PrimaryColumnName(){ return  "ProcedureId";}

  @PrimaryGeneratedColumn()
  ProcedureId: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column('varchar',{ nullable: true })
  Description: string | null;

  @OneToMany(
    () => SubProcedure,
    subprocedure => subprocedure.procedure,
  )
  subs: SubProcedure[];

  @ManyToOne(()=> Category, category => category.procedures) 
  @JoinColumn({ name: 'CategoryId' })
  category:Category;

  @Column()
  @RelationId( (procedure: Procedure) => procedure.category)
  CategoryId: number;


  @Column('int')
  DataTypeId:number;


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default Procedure;













