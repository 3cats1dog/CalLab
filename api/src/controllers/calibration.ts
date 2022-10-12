import { Calibration } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';
import { Like } from 'typeorm';

export const getAll = catchErrors(async (req, res) => {
  const { searchTerm } = req.query;
  let likeTerm='';
  if (searchTerm)
  {
    likeTerm=searchTerm.toString();
  }

  const calibrations = await Calibration.find(
    {where:[
      {"Remarks": Like(`%${likeTerm}%`)},
      {"CustomerReq": Like(`%${likeTerm}%`)},
      {"DeviceReq": Like(`%${likeTerm}%`)}
    ],
    relations: ['customer', 'instrument'],
    });
    res.respond({ calibrations });

    if (likeTerm!='')
    console.log("Calibtarion Search Term:", likeTerm);
});


export const getByCustomer = catchErrors(async (req, res) => {
  const calibrations = await Calibration.find( {where: {"CustomerId": Number(req.params.customerId)}});  
  res.respond({ calibrations });
});


export const get = catchErrors(async (req, res) => {
    const calibration = await Calibration.findOne( {
      where: {"CalibrationId": Number(req.params.calibrationId)},
      relations: ['customer', 'instrument'],
  });  
    res.respond({ calibration });
});

export const create = catchErrors(async (req, res) => {
  const calibration = await createEntity(Calibration, req.body);
  res.respond({ calibration });
});

export const update = catchErrors(async (req, res) => {
  const calibration = await Calibration.findOne({where:{"CalibrationId": Number(req.params.calibrationId)}});
  if (calibration!= null)
  {
    Object.assign(calibration, req.body);
    validateAndSaveEntity(calibration);
  }
  res.respond({ calibration });
});

export const remove = catchErrors(async (req, res) => {
  const calibration = await Calibration.findOne({where:{ "CalibrationId":Number(req.params.calibrationId)}});
  if (calibration != null){
    calibration.remove();
  }
  res.respond({ calibration });
});
