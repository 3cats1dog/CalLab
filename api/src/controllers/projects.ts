import { Project } from 'entities';
import { catchErrors } from 'errors';
import {  validateAndSaveEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
//  const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
//    relations: ['users', 'issues'],
 // });

  const project = await Project.findOne( {
    where: { "id": Number( req.currentUser.projectId)}, 
    relations: ['users', 'issues'],
  });

  if (project != null)
  {
    res.respond({
      project: {
        ...project,
        issues: project.issues.map(issuePartial),
      },
    });
  }
});

export const update = catchErrors(async (req, res) => {
  //const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  const project = await Project.findOne({ where: { "id": Number(req.currentUser.projectId)}});
  if (project != null)
  {
    Object.assign(project, req.body);
    return validateAndSaveEntity(project);
  }
  res.respond({ project });
});
