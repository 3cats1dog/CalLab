import { TemplateDetail, DataType } from 'entities';
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
      relations:["procedure", "subProcedure"],
    });  
    await delay(1000);
    if (details.length>0)
    {
      const dataTypeId = details[0].procedure.DataTypeId;
      const dataType = await DataType.findOne({where: {"DataTypeId" :dataTypeId }});
      //console.log(dataType);
      res.respond({details, dataType});
      return;
    }
    
    res.respond({details, dataType:{}});
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


export const removeByProcedure = catchErrors(async (req, res) => {
  const details = await TemplateDetail.find({where:{ "ProcedureId":Number(req.params.procedureId), "TemplateId":Number(req.params.templateId)}});
  details.map(x=> x.remove());
  res.respond({ "removeCount":details.length });
});


