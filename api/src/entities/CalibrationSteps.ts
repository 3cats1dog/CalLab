import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';

import { IBaseEntityExtend, Calibration ,SubProcedure} from 'entities';
import is from 'utils/validation';
/*
CreateDateColumn,
UpdateDateColumn,
RelationId,
JoinColumn,
OneToOne,
import { CalibrationType, CalibrationStatus  } from 'constants/calibration';
import { Procedure, Department, CustomerInstrument, Customer, Certicifate} from ".";
*/

@Entity({ name: 'tbcalibrationsteps', schema: 'public' }  )
class CalibrationStep extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    CalibrationId: is.required(),
    SubProcedureId: is.required(),
    OrderNo: is.required(),
  };

  PrimaryColumnName = "StepId";

  @PrimaryGeneratedColumn()
  StepId: number;

  @Column('int')
  CalibrationId: number;

  @Column('int')
  SubProcedureId: number;

  @Column('int')
  OrderNo: number;

  @Column('text', { nullable: true })
  Description: string | null;

  @Column('text', { nullable: true })
  Remarks: string  | null;


  @ManyToOne(()=>Calibration, calibration => calibration.steps)
  @JoinColumn({ name: 'CalibrationId' })
  calibration:Calibration;

  @ManyToOne(()=>SubProcedure, subProcedure => subProcedure)
  @JoinColumn({ name: 'SubProcedureId' })
  subProcedure:Calibration;

  
  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Remarks) { this.Remarks = striptags(this.Remarks); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default CalibrationStep;
