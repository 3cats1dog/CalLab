import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IBaseEntityExtend, TemplateDetail, Category } from 'entities';
import is from 'utils/validation';
/*
CreateDateColumn,
UpdateDateColumn,
RelationId,
JoinColumn,
OneToOne,
import { CalibrationType, CalibrationStatus  } from 'constants/calibration';
*/

@Entity({ name: 'tbTemplate', schema: 'public' }    )
class Template extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: is.required(),
    CategoryId: is.required(),
  };

  PrimaryColumnName = "TemplateId";

  @PrimaryGeneratedColumn()
  TemplateId: number;

  @Column('varchar')
  Name: string;

  @Column('int', { default: 0})
  CategoryId: number;

  @Column('text', { nullable: true })
  Description: string | null;

  @Column('text', { nullable: true })
  Remarks: string  | null;

  @OneToMany(()=>TemplateDetail, templateDetail => templateDetail.template)
  details:TemplateDetail[];

  @ManyToOne(()=>Category, category => category.templates)
  @JoinColumn({ name: 'CategoryId' })
  category:Category;


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Remarks) { this.Remarks = striptags(this.Remarks); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default Template;
