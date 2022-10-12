import { Category } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


export const get = catchErrors(async (req, res) => {
  const category = await Category.findOne({where:{"CategoryId": Number(req.params.categoryId)}});
  res.respond({ category });
});



export const getcategorys = catchErrors(async (req, res) => {

  const { searchTerm } = req.query;

  let whereSQL = ' ';

  if (searchTerm) {
    //whereSQL += ' (tbCustomer.Name ILIKE :searchTerm OR tbCustomer.Email ILIKE :searchTerm)';
    whereSQL += ' (Name LIKE :searchTerm OR Description LIKE :searchTerm)';
  }

  const categorys = await Category.createQueryBuilder()
    .select()
    .where(whereSQL, { searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ categorys });
});



export const create = catchErrors(async (req, res) => {
  const category = await createEntity(Category, req.body);
  res.respond({ category });
});

export const update = catchErrors(async (req, res) => {
  const category = await Category.findOne({where:{"CategoryId": Number(req.params.categoryId)}});
  if (category!= null)
  {
    Object.assign(category, req.body);
    validateAndSaveEntity(category);
  }
  res.respond({ category });
});

export const remove = catchErrors(async (req, res) => {
  const category = await Category.findOne({where:{ "CategoryId":Number(req.params.categoryId)}});
  if (category != null){
    category.remove();
  }
  res.respond({ category });
});
