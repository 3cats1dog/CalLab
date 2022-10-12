import { Customer } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const get = catchErrors(async (req, res) => {
  const customer = await Customer.findOne({where:{"CustomerId": Number(req.params.customerId)}});
  if (customer!= null)
  {
    res.respond({ customer });
  }
});


export const getCustomers = catchErrors(async (req, res) => {
  const { searchTerm } = req.query;

  let whereSQL = ' ';

  if (searchTerm) {
    //whereSQL += ' (tbCustomer.Name ILIKE :searchTerm OR tbCustomer.Email ILIKE :searchTerm)';
    whereSQL += ' (Name LIKE :searchTerm OR Email LIKE :searchTerm)';
  }

  const customers = await Customer.createQueryBuilder()
    .select()
    .where(whereSQL, { searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ customers });
});

export const create = catchErrors(async (req, res) => {
  const customer = await createEntity(Customer, req.body);
  res.respond({ customer });
});

export const update = catchErrors(async (req, res) => {
  const customer = await Customer.findOne({where:{"CustomerId": Number(req.params.customerId)}});
  if (customer!= null)
  {
    Object.assign(customer, req.body);
    validateAndSaveEntity(customer);
  }
  res.respond({ customer });
});

export const remove = catchErrors(async (req, res) => {
  const customer = await Customer.findOne({where:{ "CustomerId":Number(req.params.customerId)}});
  if (customer != null){
    customer.remove();
  }
  res.respond({ customer });
});
