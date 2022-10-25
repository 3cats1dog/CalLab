import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
/*
CreateDateColumn,
UpdateDateColumn,
RelationId,
JoinColumn,
OneToOne,
import { CalibrationType, CalibrationStatus  } from 'constants/calibration';
*/
import { Template, Procedure, SubProcedure} from "entities";

@Entity({ name: 'tbtemplatedetail', schema: 'public',orderBy: {
  ProcedureId: "ASC",
  SubProcedureId: "ASC",
  Position: "ASC",
}, }   )
class TemplateDetail extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    //Name:is.required(),
    TemplateId: is.required(),
    ProcedureId:is.required(),
    SubProcedureId:is.required(),
    NominalValue:is.required(),
    Position: is.required(),
  };

  PrimaryColumnName (){ return "TemplateDetailId";}

  @PrimaryGeneratedColumn()
  TemplateDetailId:number;

  @Column('int')
  TemplateId: number;

  @Column('int')
  ProcedureId: number;

  @Column('int')
  SubProcedureId: number;

  @Column('float')
  NominalValue: number;

  @Column('int')
  Position: number;

  @Column('int')
  DataCount: number;

  @Column('text', { nullable: true })
  Description: string | null;

  @ManyToOne(()=>Template, template => template.details)
  @JoinColumn({ name: 'TemplateId' })
  template:Template;

  @ManyToOne(()=>Procedure, procedure => procedure)
  @JoinColumn({ name: 'ProcedureId' })
  procedure:Procedure;

  @ManyToOne(()=>SubProcedure, subProcedure => subProcedure)
  @JoinColumn({ name: 'SubProcedureId' })
  subProcedure:SubProcedure;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default TemplateDetail;
