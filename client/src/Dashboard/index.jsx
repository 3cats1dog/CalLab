import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';

import Sidebar from './Sidebar';
import Board from './Board';
import CustomerBoard from 'Customers'
import LabInstrumentBoard from 'LabInstruments';
import CategoryBoard from 'Category';
import ProcedureBoard from 'Procedures';
import SettingBoard from 'Settings';
import ScopeBoard from 'Scope';
import CustomerInstrumentBoard from 'CustomerInstruments';

/*
import IssueSearch from './IssueSearch';
import IssueCreate from './IssueCreate';
import ProjectSettings from './ProjectSettings';
*/
import { DashboardPage } from './Styles';
import CalibrationBoard from 'Calibrations';
import TemplateBoard from 'Templates';
import TemplateDetails from 'Templates/TemplateDetails'; 

const DashBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();




  /*
  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  */

  return (
    <DashboardPage>
      <Sidebar  />

      <Route
        path={`${match.path}/board`}
        render={() => (
          <Board />
        )}
      />

    <Route
        path={`${match.path}/works`}
        render={() => (
          <CalibrationBoard />
        )}
      />
    <Route
        path={`${match.path}/customers`}
        render={() => (
          <CustomerBoard />
        )}
      />
    <Route
        path={`${match.path}/instruments`}
        render={() => (
          <CustomerInstrumentBoard />
        )}
      />
    <Route
        path={`${match.path}/equipments`}
        render={() => (
          <LabInstrumentBoard />
        )}
      />
    <Route
        path={`${match.path}/scope`}
        render={() => (
          <ScopeBoard
          />
        )}
      />
    <Route
        path={`${match.path}/templates`}
        render={() => (
          <TemplateBoard
            showInsert={true}
          />
        )}
      />
      <Route
        path={`${match.path}/template/:templateId`}
        render={routeProps => (
          <TemplateDetails
          templateId={routeProps.match.params.templateId}
        />
        )}
      />      
    <Route
        path={`${match.path}/settings`}
        render={() => (
          <SettingBoard
          />
        )}
      />


      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </DashboardPage>
  );
};

export default DashBoard;
