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
import { CustomerInstrument, Template, Procedure } from '.';


@Entity({ name: 'tbinstrumentCategory', schema: 'public' } )
class Category extends BaseEntity implements IBaseEntityExtend {
  static validations = {
    Name: [is.maxLength(255)],
    Description: [is.maxLength(255)],
  };

  PrimaryColumnName = "CategoryId";

  @PrimaryGeneratedColumn()
  CategoryId: number;

  @Column('varchar',{ nullable: true })
  Name: string | null;

  @Column('varchar',{ nullable: true })
  Description: string | null;

  @OneToMany(()=> CustomerInstrument,  customerInstrument => customerInstrument.category)
  instuments:CustomerInstrument[];

  @OneToMany(()=> Template,  template => template.category)
  templates:Template[];

  @OneToMany(()=> Procedure,  procedure => procedure.category)
  procedures:Procedure[];


  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.Name) { this.Name = striptags(this.Name); }
    if (this.Description) { this.Description = striptags(this.Description); }
  };

}

export default Category;










