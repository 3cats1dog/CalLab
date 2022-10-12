
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
/*
import { SubProcedure } from '.';
*/

@Entity({ name: 'tbDataType', schema: 'public'}  )
class DataType extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(100)],
    Description: is.maxLength(200),
    ProcedureId:is.required(),
  };

  PrimaryColumnName = "DataTypeId";

  @PrimaryGeneratedColumn()
  DataTypeId: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column({type:'varchar',  nullable: true ,collation:'greek_general_ci' })   //SQL_Latin1_General_CP1253_CI_AI
  Symbol: string | null;

  @Column({type:'varchar',  nullable: true ,collation:'greek_general_ci' })   //SQL_Latin1_General_CP1253_CI_AI
  Unit: string | null;

  @Column({ type: "varchar", nullable: true})
  Description: string | null;

  /*
  @ManyToOne(
    () => SubProcedure,
    subProcedure => subProcedure.dataType,
  )
  subProcedures: SubProcedure[];
*/


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default DataType;













