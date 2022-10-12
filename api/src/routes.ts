import * as authentication from 'controllers/authentication';
import * as comments from 'controllers/comments';
import * as issues from 'controllers/issues';
import * as projects from 'controllers/projects';
import * as test from 'controllers/test';
import * as users from 'controllers/users';

import * as calibrations from 'controllers/calibration';
import * as calibrationdatas from 'controllers/calibrationdata';
import * as step from 'controllers/calibrationstep';
import * as template from 'controllers/templates';
import * as templateDetail from 'controllers/templatedetails';
import * as categorys from 'controllers/category';
import * as certicifates from 'controllers/certicifate';
import * as customers from 'controllers/customer';
import * as customerInstruments from 'controllers/customerInstrument';
import * as labinstruments from 'controllers/labinstrument';
import * as procedures from 'controllers/procedure';
import * as subprocedures from 'controllers/subprocedure';
import * as dataTypes   from 'controllers/datatypes';


export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {
    app.delete('/test/reset-database', test.resetDatabase);
    app.post('/test/create-account', test.createAccount);
  }

  app.post('/login', users.login);
  app.post('/authentication/guest', authentication.createGuestAccount);
};

export const attachPrivateRoutes = (app: any): void => {
  app.post('/comments', comments.create);
  app.put('/comments/:commentId', comments.update);
  app.delete('/comments/:commentId', comments.remove);

  app.get('/issues', issues.getProjectIssues);
  app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  app.post('/issues', issues.create);
  app.put('/issues/:issueId', issues.update);
  app.delete('/issues/:issueId', issues.remove);

  app.get('/project', projects.getProjectWithUsersAndIssues);
  app.put('/project', projects.update);

  app.get('/currentUser', users.getCurrentUser);

  /*******/
  app.get('/calibrations', calibrations.getAll);
  app.get('/calibrations/:calibrationId', calibrations.get);
  app.get('/calibrations/customer/:customerId', calibrations.getByCustomer);
  app.post('/calibrations', calibrations.create);
  app.put('/calibrations/:calibrationId', calibrations.update);
  app.delete('/calibrations/:calibrationId', calibrations.remove);

  app.get("/calibrationdatas", calibrationdatas.getCalibrationData);
  app.post('/calibrationdatas', calibrationdatas.create);
  app.put('/calibrationdatas/:calibrationDataId', calibrationdatas.update);
  app.delete('/calibrationdatas/:calibrationDataId', calibrationdatas.remove);

  app.get('/categorys/:categoryId', categorys.get);
  app.get("/categorys", categorys.getcategorys);
  app.post('/categorys', categorys.create);
  app.put('/categorys/:categoryId', categorys.update);
  app.delete('/categorys/:categoryId', categorys.remove);

  app.post('/certicifates', certicifates.create);
  app.put('/certicifates/:certificateId', certicifates.update);
  app.delete('/certicifates/:certificateId', certicifates.remove);

  app.get('/customers/:customerId', customers.get);
  app.get("/customers", customers.getCustomers);
  app.post('/customers', customers.create);
  app.put('/customers/:customerId', customers.update);
  app.delete('/customers/:customerId', customers.remove);

  app.get("/customerInstruments", customerInstruments.getCustomerInstruments);
  app.get('/customerInstruments/:instrumentId', customerInstruments.get);
  app.get('/customerInstruments/customer/:customerId', customerInstruments.getByCustomer);
  app.post('/customerInstruments', customerInstruments.create);
  app.put('/customerInstruments/:instrumentId', customerInstruments.update);
  app.delete('/customerInstruments/:instrumentId', customerInstruments.remove);

  app.get("/labinstruments", labinstruments.getLabInstruments);
  app.get('/labinstruments/:LabInstrId', labinstruments.get);
  app.post('/labinstruments', labinstruments.create);
  app.put('/labinstruments/:LabInstrId', labinstruments.update);
  app.delete('/labinstruments/:LabInstrId', labinstruments.remove);

  app.get('/procedures', procedures.getProcedure);
  app.get('/procedures/:procedureId', procedures.get);
  app.get('/procedures/category/:categoryId', procedures.getByCategory);
  app.post('/procedures', procedures.create);
  app.put('/procedures/:procedureId', procedures.update);
  app.delete('/procedures/:procedureId', procedures.remove);

  app.get('/subprocedures', subprocedures.getSubProcedure);
  app.get('/subprocedures/:subProcedureId', subprocedures.get);
  app.get('/subprocedures/procedure/:procedureId', subprocedures.getByProcedure);
  app.post('/subprocedures', subprocedures.create);
  app.put('/subprocedures/:subProcedureId', subprocedures.update);
  app.delete('/subprocedures/:subProcedureId', subprocedures.remove);

  app.get('/step/:stepId', step.get);
  app.get('/step/calibration/:calibrationId', step.getByCalibration);
  app.post('/step', step.create);
  app.put('/step/:stepId', step.update);
  app.delete('/step/:stepId', step.remove);


  app.get('/templates', template.getQuery);
  app.get('/templates/:templateId', template.get);
  app.get('/templates/category/:categoryId', template.getByCategory);
  app.post('/templates', template.create);
  app.put('/templates/:templateId', template.update);
  app.delete('/templates/:templateId', template.remove);

  app.get('/templateDetails/:detailId', templateDetail.get);
  app.get('/templateDetails/template/:templateId', templateDetail.getByTemplate);
  app.post('/templateDetails', templateDetail.create);
  app.put('/templateDetails/:detailId', templateDetail.update);
  app.delete('/templateDetails/:detailId', templateDetail.remove);


  app.get('/dataTypes/:dataTypeId', dataTypes.get);
  app.get("/dataTypes", dataTypes.getAll);
  app.post('/dataTypes', dataTypes.create);
  app.put('/dataTypes/:dataTypeId', dataTypes.update);
  app.delete('/dataTypes/:dataTypeId', dataTypes.remove);

};
