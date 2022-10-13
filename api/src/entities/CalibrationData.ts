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
import { CalibrationDataType  } from 'constants/calibrationdata';
import {  } from '.';

@Entity({ name: 'tbcalibrationdata', schema: 'public' })
class CalibrationData extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    DataType: [is.required(), is.oneOf(Object.values(CalibrationDataType))],
    listPosition: is.required(),
    reporterId: is.required(),
  };

  PrimaryColumnName = "CalibrationDataId";

  @PrimaryGeneratedColumn()
  CalibrationDataId: number;

  @Column('integer')
  CalibrationId: number;

  @Column('integer')
  SubProcedureId: number;

  @Column('integer')
  ProcedureId: number;

  @Column('integer')
  CustomerInstrumentId: number;

  @Column('varchar')
  DataType: CalibrationDataType;

  @Column('varchar')
  Name: string | null;

  @Column('varchar')
  Range: string | null;

  @Column('varchar')
  Requirement: string | null;

  @Column('varchar')
  Uncertinity: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Range) { this.Range = striptags(this.Range); }
    if (this.Requirement) { this.Requirement = striptags(this.Requirement); }
  };

}

export default CalibrationData;










