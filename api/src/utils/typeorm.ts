//import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
//import { FindOptionsWhere } from 'typeorm';
import {
  Project, 
  User, 
  Issue, 
  Comment, 
  Calibration, 
  CalibrationData, 
  CalibrationStep,
  Category, 
  Certicifate, 
  Customer, 
  CustomerInstrument, 
  Department, 
  LabInstrument, 
  Procedure, 
  SubProcedure, 
  DataType,
  Template,
  TemplateDetail
} from 'entities';
import { BadUserInputError } from 'errors';
import { generateErrors } from 'utils/validation';

type EntityConstructor = typeof Project | typeof User | typeof Issue | typeof Comment | typeof Calibration | typeof CalibrationData | typeof Category |
                         typeof Certicifate | typeof Customer | typeof CustomerInstrument | typeof Department | typeof LabInstrument | typeof Procedure | 
                         typeof SubProcedure | typeof CalibrationStep | typeof Template | typeof TemplateDetail |typeof DataType;

type EntityInstance = Project | User | Issue | Comment | Calibration |  CalibrationData |  Category | Certicifate |
                      Customer |  CustomerInstrument |  Department |  LabInstrument |  Procedure |  SubProcedure | 
                      CalibrationStep | Template | TemplateDetail |DataType;

const entities: { [key: string]: EntityConstructor } = 
      { Comment, Issue, Project, User, Calibration ,  CalibrationData ,  Category , Certicifate ,
        Customer ,  CustomerInstrument ,  Department ,  LabInstrument ,  Procedure ,  SubProcedure, 
        CalibrationStep, Template, TemplateDetail, DataType
      };

/*
export const findEntityOrThrow = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  options?: FindOneOptions,
//): Promise<InstanceType<T>> => {
): Promise<T> => {
    //const instance = await Constructor.findOne(id, options);

  const instance = await Constructor.findOne({where:{"$T.PrimaryColumnName": <number>id}});
  if(!instance)
  {
    throw new EntityNotFoundError(Constructor.name);
  }
  return instance;
};
*/

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ('validations' in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};

/*
export const updateEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  Object.assign(instance, input);
  return validateAndSaveEntity(instance);
};
*/

/*
export const deleteEntity = async <T extends EntityConstructor>(
  Constructor: T,
  id: number | string,
): Promise<InstanceType<T>> => {
  const instance = await findEntityOrThrow(Constructor, id);
  await instance.remove();
  return instance;
};
*/
