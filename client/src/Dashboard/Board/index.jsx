import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';


import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs, Modal } from 'shared/components';

import Header from './Header';

import LineChartSample from './Charts/LineChart';
import BarChartSample from './Charts/BarChart';
import { data} from './fakeChartdata';

const propTypes = {

};

const DashBoard = ({   }) => {
  const match = useRouteMatch();
  const history = useHistory();

  
  return (
    <Fragment>
      <Breadcrumbs items={['Calibration Lab.', 'ver 1.0', 'Dashboard']} />
      <Header />

      <LineChartSample
      data={data}
      />
      <BarChartSample  
      data={data}
      />
    </Fragment>
  );
};

DashBoard.propTypes = propTypes;

export default DashBoard;
