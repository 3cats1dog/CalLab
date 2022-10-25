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

import { IBaseEntityExtend, Calibration, Procedure ,SubProcedure} from 'entities';
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

@Entity({ name: 'tbcalibrationsteps', schema: 'public', orderBy: {
  ProcedureId: "ASC",
  SubProcedureId: "ASC",
  Position: "ASC",
},}  )
class CalibrationStep extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    CalibrationId: is.required(),
    ProcedureId:is.required(),
    SubProcedureId: is.required(),
    Position: is.required(),
    NominalValue:is.required(),
  };

  PrimaryColumnName() { return "StepId";}

  @PrimaryGeneratedColumn()
  StepId: number;

  @Column('int')
  CalibrationId: number;

  @Column('int')
  ProcedureId: number;

  @Column('int')
  SubProcedureId: number;

  @Column('int')
  Position: number;

  @Column('float')
  NominalValue: number;

  @Column('int')
  DataCount: number;

  @Column('text', { nullable: true })
  Description: string | null;

  @Column('text', { nullable: true })
  Remarks: string  | null;

  @Column('int')
  TotalCount: number;

  @Column('float')
  AverageValue: number;

  @Column('float')
  StandartDeviation: number;

  @Column('float')
  Error: number;

  @Column('text')
  Status: string;


  @ManyToOne(()=>Calibration, calibration => calibration.steps)
  @JoinColumn({ name: 'CalibrationId' })
  calibration:Calibration;

  @ManyToOne(()=>SubProcedure, subProcedure => subProcedure)
  @JoinColumn({ name: 'SubProcedureId' })
  subProcedure:SubProcedure;

  @ManyToOne(()=>Procedure, procedure => procedure)
  @JoinColumn({ name: 'ProcedureId' })
  procedure:Procedure;

  
  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Remarks) { this.Remarks = striptags(this.Remarks); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default CalibrationStep;
