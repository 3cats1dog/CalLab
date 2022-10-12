import { LabInstrument } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
    const labInstrument = await LabInstrument.findOne({where:{ "LabInstrId": Number(req.params.LabInstrId)}});
    res.respond({ labInstrument });
});

export const getLabInstruments = catchErrors(async (req, res) => {
  const { searchTerm } = req.query;

  let whereSQL = ' ';

  if (searchTerm) {
    whereSQL += ' (Name LIKE :searchTerm OR SerialNo LIKE :searchTerm)';
  }

  const instrs = await LabInstrument.createQueryBuilder()
    .select()
    .where(whereSQL, { searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ instrs });
});


export const create = catchErrors(async (req, res) => {
  const labInstrument = await createEntity(LabInstrument, req.body);
  res.respond({ labInstrument });
});

export const update = catchErrors(async (req, res) => {
  const labInstrument = await LabInstrument.findOne({where:{"LabInstrId": Number(req.params.LabInstrId)}});
  if (labInstrument!= null)
  {
    Object.assign(labInstrument, req.body);
    validateAndSaveEntity(labInstrument);
  }
  res.respond({ labInstrument });
});

export const remove = catchErrors(async (req, res) => {
  const labInstrument = await LabInstrument.findOne({where:{ "LabInstrId":Number(req.params.LabInstrId)}});
  if (labInstrument != null){
    labInstrument.remove();
  }
  res.respond({ labInstrument });
});
