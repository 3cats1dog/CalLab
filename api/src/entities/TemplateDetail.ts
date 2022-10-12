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
import { Template, Procedure} from "entities";

@Entity({ name: 'tbTemplateDetail', schema: 'public' }   )
class TemplateDetail extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    //Name:is.required(),
    TemplateId: is.required(),
    ProcedureId:is.required(),
    Position: is.required(),
  };

  PrimaryColumnName = "TemplateDetailId";

  @PrimaryGeneratedColumn()
  TemplateDetailId:number;

  @Column('varchar', { nullable: true })
  Name: string | null ;

  @Column('int')
  TemplateId: number;

  @Column('int')
  ProcedureId: number;

  @Column('int')
  Position: number;

  @Column('text', { nullable: true })
  Description: string | null;

  @ManyToOne(()=>Template, template => template.details)
  @JoinColumn({ name: 'TemplateId' })
  template:Template;

  @ManyToOne(()=>Procedure, procedure => procedure)
  @JoinColumn({ name: 'ProcedureId' })
  procedure:Procedure;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default TemplateDetail;
