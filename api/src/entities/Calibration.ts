import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
  BeforeUpdate,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';
import { CalibrationType, CalibrationStatus  } from 'constants/calibration';
import { CustomerInstrument, Customer,  CalibrationStep} from ".";

@Entity({ name: 'tbcalibration', schema: 'public' })
class Calibration extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    InstrumentId: is.required(),
    CustomerId:is.required(),
    Type: [is.required(), is.oneOf(Object.values(CalibrationType))],
    Status: [is.required(), is.oneOf(Object.values(CalibrationStatus))],
  };

  PrimaryColumnName = "CalibrationId";

  @PrimaryGeneratedColumn()
  CalibrationId: number;

  @Column('bit', {default: true})
  ShowInCertificate: boolean;

  @Column('varchar')
  Type: CalibrationType;

  @Column('varchar')
  Status: CalibrationStatus;

  @Column('text', { nullable: true })
  Remarks: string  | null;

  @Column('text', { nullable: true })
  CustomerReq: string  | null;

  @Column('text', { nullable: true })
  DeviceReq: string  | null;

  @CreateDateColumn({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime', nullable: true  })
  ReportDate: Date | null;

  @UpdateDateColumn({ type: 'datetime' })
  ModifiedDate: Date;

  //Customer Instrument;
  @ManyToOne( ()=> CustomerInstrument, instrument => instrument.calibrations, )
  @JoinColumn({ name: 'InstrumentId' })
  instrument:CustomerInstrument;

  @Column()
  @RelationId((calibration: Calibration) => calibration.instrument)
  InstrumentId: number;

  //Customer
  @ManyToOne( ()=> Customer, customer => customer.calibrations, )
  @JoinColumn({ name: 'CustomerId' })
  customer:Customer;

  @Column()
  @RelationId((calibration: Calibration) => calibration.customer)
  CustomerId: number;


  /*
  @OneToOne( ()=>Certicifate, certicifate => certicifate.calibration, )
  @JoinColumn({ name: 'CertificateId' })
  certicifate:Certicifate;
  */

  @Column("integer", {default: 0  })
  CertificateId: number;

  @OneToMany( ()=> CalibrationStep, step=>step.CalibrationId)
  steps:CalibrationStep[];

  @Column('integer', {default: 0  })
  ModifiedUserId: number;

  @Column('integer', {default: 0  })
  AssignUserID: number;

  @Column('integer', {default: 0  })
  CreatedUserId: number ;

  @Column('integer', {default: 0  })
  ClosedUserId: number  ;

  /******* */

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Remarks) { this.Remarks = striptags(this.Remarks); } else { this.Remarks="";}
    if (this.CustomerReq) { this.CustomerReq = striptags(this.CustomerReq); }else { this.CustomerReq="";}
    if (this.DeviceReq) { this.DeviceReq = striptags(this.DeviceReq); }else { this.DeviceReq="";}
  };

}

export default Calibration;
