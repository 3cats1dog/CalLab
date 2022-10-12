import { TemplateDetail } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';


function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export const get = catchErrors(async (req, res) => {
    const detail = await TemplateDetail.findOne({
        where:{"TemplateDetailId": Number(req.params.detailId)},
        relations:["template","subProcedure"]
    });
    res.respond({ detail });
  });

  
export const getByTemplate = catchErrors(async (req, res) => {
    const details = await TemplateDetail.find({
      where: {"TemplateId": Number(req.params.templateId)},
      relations:["procedure"]
    });  
    await delay(1000);
    res.respond({details});
  });

export const create = catchErrors(async (req, res) => {
  const detail = await createEntity(TemplateDetail, req.body);
  res.respond({ detail });
});

export const update = catchErrors(async (req, res) => {
  const detail = await TemplateDetail.findOne({where:{"TemplateDetailId": Number(req.params.detailId)}});
  if (detail!= null)
  {
    Object.assign(detail, req.body);
    validateAndSaveEntity(detail);
  }
  res.respond({ detail });
});

export const remove = catchErrors(async (req, res) => {
  const detail = await TemplateDetail.findOne({where:{ "TemplateDetailId":Number(req.params.detailId)}});
  if (detail != null){
    detail.remove();
  }
  res.respond({ detail });
});
