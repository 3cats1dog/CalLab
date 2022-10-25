import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';


import Board from './Board';
import {DashboardPage } from './Styles';

const DashBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();

  /*
  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  */

  return (
    <DashboardPage>
      <Route
        path={`${match.path}/board`}
        render={() => (
          <Board />
        )}
      />

      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </DashboardPage>
  );
};

export default DashBoard;
