import { SubProcedure } from 'entities';
import { catchErrors } from 'errors';
import { Like } from 'typeorm';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
  const subprocedure = await SubProcedure.findOne({
    where:{"SubProcedureId": Number(req.params.subProcedureId)},
    relations:["dataType"]
  });
  res.respond({ subprocedure });
});

export const getByProcedure = catchErrors(async (req, res) => {
  const subprocedures = await SubProcedure.find({
    where:{"ProcedureId": Number(req.params.procedureId)},
    relations:["dataType"]
    });
  res.respond({ subprocedures });
  //console.log(`ProcedureId/${req.params.procedureId}, count ${subprocedures.length}`)
});

export const getSubProcedure = catchErrors(async (req, res) => {

  const { searchTerm } = req.query;
  let likeTerm=' ';
  if (searchTerm)
  {
    likeTerm=searchTerm.toString();
  }

  const subprocedures = await SubProcedure.find(
    {where:[
      {"Name": Like(`%${likeTerm}%`)},
      {"Description": Like(`%${likeTerm}%`)},
    ],
    relations: ['dataType'],
    }
  );

  res.respond({ subprocedures });
});

export const create = catchErrors(async (req, res) => {
  const subprocedure = await createEntity(SubProcedure, req.body);
  res.respond({ subprocedure });
});

export const update = catchErrors(async (req, res) => {
  const subprocedure = await SubProcedure.findOne({where:{"SubProcedureId": Number(req.params.subProcedureId)}});
  if (subprocedure!= null)
  {
    Object.assign(subprocedure, req.body);
    validateAndSaveEntity(subprocedure);
  }
  res.respond({ subprocedure });
});

export const remove = catchErrors(async (req, res) => {
  const subprocedure = await SubProcedure.findOne({where:{"SubProcedureId":Number(req.params.subProcedureId)}});
  if (subprocedure != null){
    subprocedure.remove();
  }
  res.respond({ subprocedure });
});
