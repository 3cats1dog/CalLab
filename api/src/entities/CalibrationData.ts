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
import {  } from '.';

@Entity({ name: 'tbcalibrationdata', schema: 'public' })
class CalibrationData extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    InputText: [is.required(), is.maxLength(200)],
    StepId:is.required(),
    SubProcedureId:is.required(),
    Value:is.required(),
  };

  public PrimaryColumnName(){ return "CalibrationDataId";}

  @PrimaryGeneratedColumn()
  CalibrationDataId: number;

  @Column('integer')
  StepId: number;

  @Column('integer')
  SubProcedureId: number;

  @Column('varchar')
  InputText: string | null;

  @Column('float')
  Value: number | null;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.InputText) { this.InputText = striptags(this.InputText); }
  };

}

export default CalibrationData;










