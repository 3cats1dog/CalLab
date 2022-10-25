import { CalibrationStepStatusType } from 'constants/calibrationstep';
import { CalibrationStep ,TemplateDetail, CalibrationData } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity  } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
    const step = await CalibrationStep.findOne({
      where:{"StepId": Number(req.params.stepId)},
      relations:["subProcedure", "procedure"]
    });
    res.respond({ step });
  });

  
export const getByCalibration = catchErrors(async (req, res) => {
    const steps = await CalibrationStep.find({
      where: {"CalibrationId": Number(req.params.calibrationId)},
      relations:["subProcedure", "procedure"]
    });  
    res.respond({steps});
  });

export const create = catchErrors(async (req, res) => {
  const step = await createEntity(CalibrationStep, req.body);
  res.respond({ step });
});


export const createByTemplate = catchErrors(async (req, res) => {
  const { removeOld } = req.query;
  const {calibrationId, templateId} =req.body;
  if (!calibrationId || !templateId) 
  {
    console.log("Missing params", req.body);
    res.respond({ "Error":"Missing parameters in body"});
    return;
  }
  var removedResult:number|null|undefined=0;
  if (removeOld)
  {
    const DeleteResult = await CalibrationStep.createQueryBuilder().delete().where("CalibrationId = :calibrationID", {"calibrationID":Number(calibrationId) }).execute();
    removedResult=DeleteResult.affected?.valueOf();
  }
  const templateDetails=await TemplateDetail.find({where:{"TemplateId":Number(templateId)}});
  var newStepList= templateDetails.map(detail=>({
            CalibrationId: Number(calibrationId),
            ProcedureId: detail.ProcedureId,
            SubProcedureId: detail.SubProcedureId,
            Position: 1,
            NominalValue: detail.NominalValue,
            DataCount: detail.DataCount,
            Description: detail.Description,
            TotalCount: 0,
            Status: CalibrationStepStatusType.EMPTY 
       } 
    ));
  var addedStepList = newStepList.map(async (stepbody) => {
     return await createEntity(CalibrationStep, stepbody);
  });

  res.respond({ addedStepList, removedResult});
  console.log(removeOld, req.body, {templateDetailsCount:templateDetails.length}, {newStepListCount:newStepList.length},{addedStepListCount:addedStepList.length}, {removedResult: removedResult});
});



export const update = catchErrors(async (req, res) => {
  console.log(req.params.stepId);
  const step = await CalibrationStep.findOne({where:{"StepId": Number(req.params.stepId)}});
  if (step!= null)
  {
    Object.assign(step, req.body);
    validateAndSaveEntity(step);
  }
  res.respond({ step });
  console.log(step);
});

export const remove = catchErrors(async (req, res) => {
  const step = await CalibrationStep.findOne({where:{ "StepId":Number(req.params.stepId)}});
  const DeleteResult =await CalibrationData.createQueryBuilder().delete().where("StepId = :stepID", {stepID: Number(req.params.stepId)}).execute();
  if (step != null){
    step.remove();
  }
  res.respond({ step ,DeleteResult});
});
