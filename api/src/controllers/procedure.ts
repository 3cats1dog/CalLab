import { Procedure } from 'entities';
import { catchErrors } from 'errors';
import { createEntity  ,validateAndSaveEntity  } from 'utils/typeorm';

export const get = catchErrors(async (req, res) => {
  const procedure = await Procedure.findOne({where:{"ProcedureId": Number(req.params.procedureId)}});
  res.respond({ procedure });
});



export const getByCategory = catchErrors(async (req, res) => {
  const procedures = await Procedure.find({where:{"CategoryId": Number(req.params.categoryId)}});
  res.respond({ procedures });
  console.log(`GetProcedure, CategoryId/${req.params.categoryId}`)
});


export const getByCalibration = catchErrors(async (req, res) => {
  let whereSQL = ' CategoryId in (select CategoryId 	from kallab.tbcustomerinstrument 	where InstrumentId in 		(select InstrumentId 		from kallab.tbcalibration 		where CalibrationId=:calibrationId)	) ';
  const procedures = await Procedure.createQueryBuilder()
  .select()
  .where(whereSQL, { calibrationId: `${req.params.calibrationId}` })
  .getMany();

  res.respond({ procedures });

  //console.log(`${req.params.calibrationId}` );
});



export const getProcedure = catchErrors(async (req, res) => {
  const { searchTerm } = req.query;

  let whereSQL = ' ';

  if (searchTerm) {
    whereSQL += ' (Name LIKE :searchTerm OR Description LIKE :searchTerm)';
  }

  const procedures = await Procedure.createQueryBuilder()
    .select()
    .where(whereSQL, { searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ procedures });
});

export const create = catchErrors(async (req, res) => {
  const procedure = await createEntity(Procedure, req.body);
  res.respond({ procedure });
});

export const update = catchErrors(async (req, res) => {
  const procedure = await Procedure.findOne({where:{"ProcedureId": Number(req.params.procedureId)}});
  if (procedure!= null)
  {
    Object.assign(procedure, req.body);
    validateAndSaveEntity(procedure);
  }
  res.respond({ procedure });
});

export const remove = catchErrors(async (req, res) => {
  const procedure = await Procedure.findOne({where:{"ProcedureId":Number(req.params.procedureId)}});
  if (procedure != null){
    procedure.remove();
  }
  res.respond({ procedure });
});
