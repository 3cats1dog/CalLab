import { Template, TemplateDetail } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';
import { Like } from 'typeorm';

export const get = catchErrors(async (req, res) => {

    let showChild=true;
    let showParent=true;
    let relationArray=[];
    if (showChild) relationArray.push("details");
    if (showParent) relationArray.push("category");

    const template = await Template.findOne({
        where:{"TemplateId": Number(req.params.templateId)},
        relations:relationArray
    });
    res.respond({ template });
  });


  export const getQuery = catchErrors(async (req, res) => {
    const { searchTerm } = req.query;
    let likeTerm=' ';
    if (searchTerm)
    {
        likeTerm=searchTerm.toString();
    }

    const templates = await Template.find(
    {where:[
      {"Name": Like(`%${likeTerm}%`)},
    ],
    //relations: ['customer', 'category'],
    }
  );

  //console.log(searchTerm , likeTerm);

  res.respond({ templates })
});
  


export const getByCategory = catchErrors(async (req, res) => {
  const templates = await Template.find({
      where: {"CategoryId": Number(req.params.categoryId)},
      relations:["details", 'category']
  });  
  res.respond({templates});
});



export const create = catchErrors(async (req, res) => {
  const template = await createEntity(Template, req.body);
  const {ProcedureList} = req.body;
  if (ProcedureList)
  {
    //Add procedure to template;
    template.details=[];
    ProcedureList.forEach(async (value:number, index:number)=>{
      let detail={
        "TemplateId" : template.TemplateId,
        "ProcedureId": value,
        "Position": index
      };
      template.details.push(await createEntity(TemplateDetail, detail));
    });
  }
  res.respond({ template });
});

export const update = catchErrors(async (req, res) => {
  const template = await Template.findOne({where:{"TemplateId": Number(req.params.templateId)}});
  if (template!= null)
  {
    Object.assign(template, req.body);
    validateAndSaveEntity(template);
  }
  res.respond({ template });
});

export const remove = catchErrors(async (req, res) => {
  const template = await Template.findOne({where:{ "TemplateId":Number(req.params.templateId)}});
  if (template != null){
    template.remove();
  }
  res.respond({ template });
});
