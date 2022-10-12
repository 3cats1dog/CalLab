import { CustomerInstrument } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity  } from 'utils/typeorm';
import { Like } from 'typeorm';

export const get = catchErrors(async (req, res) => {
  const instrument = await CustomerInstrument.findOne({
      where:{"InstrumentId": Number(req.params.instrumentId)},
      relations: ['customer', 'category'],
      });

  if (instrument != null)
  {
    //console.log(( instrument.customer).Name);
    //console.log(( instrument.category).Name);
  }
  res.respond({ instrument });
});


export const getByCustomer = catchErrors(async (req, res) => {
  const instruments = await CustomerInstrument.find({
    where:{"CustomerId": Number(req.params.customerId)},
    relations: ['customer', 'category'],
  });
  res.respond({ instruments });
  console.log("CustomerID:", req.params.customerId);
});

export const getCustomerInstruments = catchErrors(async (req, res) => {

  /*
  let whereSQL = ' ';

  if (searchTerm) {
    //whereSQL += ' (tbCustomer.Name ILIKE :searchTerm OR tbCustomer.Email ILIKE :searchTerm)';
    whereSQL += ' (Name LIKE :searchTerm OR Brand LIKE :searchTerm OR SerialNo LIKE :searchTerm)';
  }

  const instruments2 = await CustomerInstrument.createQueryBuilder()
    .select()
    .where(whereSQL, { searchTerm: `%${searchTerm}%` })
    .getMany();
*/

  const { searchTerm } = req.query;
  let likeTerm=' ';
  if (searchTerm)
  {
    likeTerm=searchTerm.toString();
  }

  const instruments = await CustomerInstrument.find(
    {where:[
      {"Name": Like(`%${likeTerm}%`)},
      {"Brand": Like(`%${likeTerm}%`)},
      {"SerialNo": Like(`%${likeTerm}%`)}
    ],
    relations: ['customer', 'category'],
    }
  );

  //console.log(searchTerm , likeTerm);

  res.respond({ instruments });
});

export const create = catchErrors(async (req, res) => {
  const instrument = await createEntity(CustomerInstrument, req.body);
  res.respond({ instrument });
});

export const update = catchErrors(async (req, res) => {
  const instrument = await CustomerInstrument.findOne({where:{"InstrumentId": Number(req.params.instrumentId)}});
  if (instrument!= null)
  {
    Object.assign(instrument, req.body);
    validateAndSaveEntity(instrument);
  }
  res.respond({ instrument });
});

export const remove = catchErrors(async (req, res) => {
  const instrument = await CustomerInstrument.findOne({where:{ "InstrumentId":Number(req.params.instrumentId)}});
  if (instrument != null){
    instrument.remove();
  }
  res.respond({ instrument });
});
