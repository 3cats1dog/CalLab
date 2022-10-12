import { Certicifate } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';

export const create = catchErrors(async (req, res) => {
  const certicifate = await createEntity(Certicifate, req.body);
  res.respond({ certicifate });
});

export const update = catchErrors(async (req, res) => {
  const certicifate = await Certicifate.findOne({where:{"CertificateId": Number(req.params.certificateId)}});
  if (certicifate!= null)
  {
    Object.assign(certicifate, req.body);
    validateAndSaveEntity(certicifate);
  }
  res.respond({ certicifate });
});

export const remove = catchErrors(async (req, res) => {
  const certicifate = await Certicifate.findOne({where:{ "CertificateId":Number(req.params.certificateId)}});
  if (certicifate != null){
    certicifate.remove();
  }
  res.respond({ certicifate });
});
