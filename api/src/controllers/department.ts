import { Department } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const create = catchErrors(async (req, res) => {
  const department = await createEntity(Department, req.body);
  res.respond({ department });
});

export const update = catchErrors(async (req, res) => {
  const department = await Department.findOne({where:{"DepartmentId": Number(req.params.CalibrationDataId)}});
  if (department!= null)
  {
    Object.assign(department, req.body);
    validateAndSaveEntity(department);
  }
  res.respond({ department });
});

export const remove = catchErrors(async (req, res) => {
  const department = await Department.findOne({where:{ "DepartmentId":Number(req.params.CalibrationDataId)}});
  if (department != null){
    department.remove();
  }
  res.respond({ department });
});
