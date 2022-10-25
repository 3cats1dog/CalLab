import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';


@Entity({ name: 'tblabinstrument', schema: 'public' }    )
class LabInstrument extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(200)],
    Brand: [is.required(), is.maxLength(200)],
    Model: [is.required(), is.maxLength(200)],
    SerialNo: [is.required(), is.maxLength(200)],
  };

  PrimaryColumnName (){ return  "LabInstrId";}

  @PrimaryGeneratedColumn()
  LabInstrId: number;

  @Column('varchar')
  Name: string | null;

  @Column('varchar')
  Brand: string | null;

  @Column('varchar')
  Model: string | null;

  @Column('varchar')
  SerialNo: string | null;

  @Column('varchar')
  TagNo: string | null;

  @CreateDateColumn({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime',  nullable: true })
  LastCalibDate: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Brand) { this.Brand = striptags(this.Brand); }
    if (this.Model) { this.Model = striptags(this.Model); }
    if (this.SerialNo) { this.SerialNo = striptags(this.SerialNo); }
    if (this.TagNo) { this.TagNo = striptags(this.TagNo); }
  };

}

export default LabInstrument;










