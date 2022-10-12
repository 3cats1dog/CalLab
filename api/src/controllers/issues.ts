import { Issue } from 'entities';
import { catchErrors } from 'errors';
import { createEntity,validateAndSaveEntity } from 'utils/typeorm';
//import is from 'utils/validation';

export const getProjectIssues = catchErrors(async (req, res) => {
  const { projectId } = req.currentUser;
  const { searchTerm } = req.query;

  let whereSQL = 'issue.projectId = :projectId';

  if (searchTerm) {
    whereSQL += ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
  }

  const issues = await Issue.createQueryBuilder('issue')
    .select()
    .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ issues });
});

export const getIssueWithUsersAndComments = catchErrors(async (req, res) => {
//  const issue = await findEntityOrThrow(Issue, req.params.issueId, {
//    relations: ['users', 'comments', 'comments.user'],
//  });
  const issue = await Issue.findOne({where:{ "id": Number(req.params.issueId)}});
  res.respond({ issue });
});

export const create = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);
  const issue = await createEntity(Issue, { ...req.body, listPosition });
  res.respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  //const issue = await updateEntity(Issue, req.params.issueId, req.body);
  const issue = await Issue.findOne({where:{"id": Number(req.params.issueId)}});
  if (issue!= null)
  {
    Object.assign(issue, req.body);
    return validateAndSaveEntity(issue);
  }


  res.respond({ issue });
});

export const remove = catchErrors(async (req, res) => {
  //const issue = await deleteEntity(Issue, req.params.issueId);
  const issue = await Issue.findOne({where: {"id": Number(req.params.issueId)} });
  if(issue != null)
  {
     issue.remove();
  }
  res.respond({ issue });
});

const calculateListPosition = async ({ projectId, status }: Issue): Promise<number> => {
  const issues = await Issue.find({where  :{ "projectId": projectId, "status": status }});

  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
