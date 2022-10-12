import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend } from 'entities';
import is from 'utils/validation';


@Entity({ name: 'tbCertificate', schema: 'public' }  )
class Certificate extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Address: [is.required(), is.maxLength(200)],
  };

  PrimaryColumnName = "CertificateId";

  @PrimaryGeneratedColumn()
  CertificateId: number;

  @Column('text', { nullable: true })
  Address: string  | null;

  @Column('integer')
  CreatedUserId: number;

  @CreateDateColumn({ type: 'datetime' })
  CreatedDate: Date;

  @Column('integer')
  ClosedUserId: number;

  @Column({ type: 'datetime' })
  ReportDate: Date;

  @Column('integer')
  ModifiedUserId: number;

  @UpdateDateColumn({ type: 'datetime' })
  ModifiedDate: Date;


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Address) { this.Address = striptags(this.Address); }
  };

}

export default Certificate;
