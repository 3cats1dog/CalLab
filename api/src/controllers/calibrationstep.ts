import { CalibrationStep } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
    const template = await CalibrationStep.findOne({where:{"StepId": Number(req.params.stepId)}});
    res.respond({ template });
  });

  
export const getByCalibration = catchErrors(async (req, res) => {
    const templates = await CalibrationStep.find( {where: {"CalibrationId": Number(req.params.calibrationId)}});  
    res.respond({templates});
  });

export const create = catchErrors(async (req, res) => {
  const template = await createEntity(CalibrationStep, req.body);
  res.respond({ template });
});

export const update = catchErrors(async (req, res) => {
  const template = await CalibrationStep.findOne({where:{"StepId": Number(req.params.stepId)}});
  if (template!= null)
  {
    Object.assign(template, req.body);
    validateAndSaveEntity(template);
  }
  res.respond({ template });
});

export const remove = catchErrors(async (req, res) => {
  const template = await CalibrationStep.findOne({where:{ "StepId":Number(req.params.stepId)}});
  if (template != null){
    template.remove();
  }
  res.respond({ template });
});
