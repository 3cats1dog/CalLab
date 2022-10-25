import { CalibrationData, CalibrationStep, SubProcedure, DataType } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
  const data = await CalibrationData.findOne({where:{"CalibrationDataId": Number(req.params.dataId)}});
  res.respond({ data });
});


export const getByStep = catchErrors(async (req, res) => {
  const datas = await CalibrationData.find({where:{"StepId": Number(req.params.stepId)}});
  const step = await CalibrationStep.findOne({where:{"StepId": Number(req.params.stepId)}});
  let subProcedureId=0;
  let dataTypeId=0;
  if (step != null)
  {
    subProcedureId=step.SubProcedureId;
  }
  const subProcedure = await SubProcedure.findOne({where:{"SubProcedureId": subProcedureId }});
  if (subProcedure != null)
  {
    dataTypeId=subProcedure.DataTypeId;
  }
  const dataType = await DataType.findOne({where:{"DataTypeId": dataTypeId }});
  res.respond({ "PrimaryColumnName": CalibrationData.prototype.PrimaryColumnName(), datas, dataType });
});

export const create = catchErrors(async (req, res) => {
  const data = await createEntity(CalibrationData, req.body);
  res.respond({ data });
});

export const update = catchErrors(async (req, res) => {
  const data = await CalibrationData.findOne({where:{"CalibrationDataId": Number(req.params.dataId)}});
  if (data!= null)
  {
    Object.assign(data, req.body);
    validateAndSaveEntity(data);
  }
  res.respond({ data });
});

export const remove = catchErrors(async (req, res) => {
  const data = await CalibrationData.findOne({where:{ "CalibrationDataId":Number(req.params.dataId)}});
  if (data != null){
    data.remove();
  }
  res.respond({ data });
});

export const removeByStep = catchErrors(async (req, res) => {
  const DeleteResult = await CalibrationData.createQueryBuilder().delete().where("StepId = :stepId",{ "stepId":Number(req.params.dataId)}).execute();
  res.respond({ DeleteResult });
});



