import { DataType } from 'entities';
import { catchErrors } from 'errors';
import { Like } from 'typeorm';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const get = catchErrors(async (req, res) => {
  const dataType = await DataType.findOne({where:{"DataTypeId": Number(req.params.dataTypeId)}});
  if (dataType!= null)
  {
    res.respond({ dataType });
  }
});


export const getAll = catchErrors(async (req, res) => {
  const { searchTerm } = req.query;
  let likeTerm='';
  if (searchTerm)
  {
    likeTerm=searchTerm.toString();
  }

  const dataTypes = await DataType.find(
    {where:[
      {"Name": Like(`%${likeTerm}%`)},
      {"Symbol": Like(`%${likeTerm}%`)},
    ]
    }
  );

  res.respond({ dataTypes });
});

export const create = catchErrors(async (req, res) => {
  const dataType = await createEntity(DataType, req.body);
  res.respond({ dataType });
});

export const update = catchErrors(async (req, res) => {
  const dataType = await DataType.findOne({where:{"DataTypeId": Number(req.params.dataTypeId)}});
  if (dataType!= null)
  {
    Object.assign(dataType, req.body);
    validateAndSaveEntity(dataType);
  }
  res.respond({ dataType });
});

export const remove = catchErrors(async (req, res) => {
  const dataType = await DataType.findOne({where:{ "DataTypeId":Number(req.params.dataTypeId)}});
  if (dataType != null){
    dataType.remove();
  }
  res.respond({ dataType });
});
