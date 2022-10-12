
import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
  BeforeUpdate,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { Procedure,DataType } from '.';


@Entity({ name: 'tbSubProcedure', schema: 'public' }     )
class SubProcedure extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(100)],
    Description: is.maxLength(200),
    ProcedureId:is.required(),
  };

  PrimaryColumnName = "SubProcedureId";

  @PrimaryGeneratedColumn()
  SubProcedureId: number;

  @Column('integer')
  MeasureCount: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column('varchar',{ nullable: true })
  Range: string | null;

  @Column('varchar',{ nullable: true })
  Requirement: string | null;

  @Column('varchar',{ nullable: true })
  Uncertinity: string | null;

  //@Column('numeric',{ precision: 8, scale: 1,nullable: true })
  @Column('varchar',{ nullable: true })
  UncertinityReading: number | null;

  //@Column('numeric',{ precision: 8, scale: 1,nullable: true })
  @Column('varchar',{ nullable: true })
  UncertinityRange: number | null;

  //@Column('numeric',{ precision: 8, scale: 1,nullable: true })
  @Column('varchar',{ nullable: true })
  UncertinityResolution: number | null;


  @Column({ type: "varchar", nullable: true})
  Description: string | null;

  @ManyToOne(
    () => DataType,
    dataType => dataType,
  )
  @JoinColumn({ name: 'DataTypeId' })
  dataType: DataType;

  @Column()
  @RelationId((subprocedure: SubProcedure) => subprocedure.dataType)
  DataTypeId:number;

  @ManyToOne(
    () => Procedure,
    procedure => procedure.subs,
  )
  @JoinColumn({ name: 'ProcedureId' })
  procedure: Procedure;

  @Column()
  @RelationId((subprocedure: SubProcedure) => subprocedure.procedure)
  ProcedureId: number;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default SubProcedure;













