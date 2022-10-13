import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import {CustomerInstrument, Calibration } from '.';

 

@Entity({ name: 'tbcustomer', schema: 'public' })
class Customer extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(200)],
  };

  PrimaryColumnName = "CustomerId";

  @PrimaryGeneratedColumn()
  CustomerId: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column('varchar',{ nullable: true })
  Phone: string | null;

  @Column('varchar',{ nullable: true })
  Email: string | null;

  @Column('varchar',{ nullable: true })
  Address: string | null;

  @OneToMany(
    () => CustomerInstrument,
    instrument => instrument.customer,
  )
  instruments: CustomerInstrument[];

  @OneToMany(
    () => Calibration,
    calibration => calibration.customer,
  )
  calibrations: Calibration[];

/*

*/

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Phone) { this.Phone = striptags(this.Phone); }
    if (this.Email) { this.Email = striptags(this.Email); }
    if (this.Address) { this.Address = striptags(this.Address); }
  };

}

export default Customer;










