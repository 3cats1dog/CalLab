import { CalibrationData } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const getCalibrationData = catchErrors(async (req, res) => {
  const { CalibrationId } = req.currentCalibration;

  let whereSQL = 'tbCalibrationData.CalibrationId = :CalibrationId';


  const issues = await CalibrationData.createQueryBuilder('tbCalibrationData')
    .select()
    .where(whereSQL, { CalibrationId })
    .getMany();

  res.respond({ issues });
});

export const create = catchErrors(async (req, res) => {
  const calibrationdata = await createEntity(CalibrationData, req.body);
  res.respond({ calibrationdata });
});

export const update = catchErrors(async (req, res) => {
  const calibrationdata = await CalibrationData.findOne({where:{"CalibrationDataId": Number(req.params.calibrationDataId)}});
  if (calibrationdata!= null)
  {
    Object.assign(calibrationdata, req.body);
    validateAndSaveEntity(calibrationdata);
  }
  res.respond({ calibrationdata });
});

export const remove = catchErrors(async (req, res) => {
  const calibrationdata = await CalibrationData.findOne({where:{ "CalibrationDataId":Number(req.params.calibrationDataId)}});
  if (calibrationdata != null){
    calibrationdata.remove();
  }
  res.respond({ calibrationdata });
});
