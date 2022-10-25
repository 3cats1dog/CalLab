import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  JoinColumn,
  JoinTable,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { Category,Customer,  Calibration } from '.';


@Entity({ name: 'tbcustomerinstrument', schema: 'public' } )
class CustomerInstrument extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.required(), is.maxLength(200)],
    Brand: [is.required(), is.maxLength(200)],
    Model: [is.required(), is.maxLength(200)],
    SerialNo: [is.required(), is.maxLength(200)],
  };

  PrimaryColumnName() {return "InstrumentId";}

  @PrimaryGeneratedColumn()
  InstrumentId: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column('varchar',{ nullable: true })
  Brand: string | null;

  @Column('varchar',{ nullable: true })
  Model: string | null;

  @Column('varchar',{ nullable: true })
  SerialNo: string | null;

  @Column('varchar',{ nullable: true })
  TagNo: string | null;

  @CreateDateColumn({ type: 'datetime'  , nullable: true })
  LastCalibDate: Date | null;

  //Category
  @ManyToOne( ()=> Category, category => category.instuments)
  @JoinColumn({ name: 'CategoryId' })
  @JoinTable()
  category:Category;

  @Column()
  @RelationId( (customerInstrument: CustomerInstrument) => customerInstrument.category)
  CategoryId: number;

  //Customer
  @ManyToOne( ()=> Customer, customer => customer.instruments) 
  @JoinColumn({ name: 'CustomerId' })
  @JoinTable()
  customer:Customer;

  @Column()
  @RelationId( (customerInstrument: CustomerInstrument) => customerInstrument.customer)
  CustomerId: number;

  @OneToMany( () => Calibration, calibration => calibration.instrument )
  calibrations: Calibration[];


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

export default CustomerInstrument;










