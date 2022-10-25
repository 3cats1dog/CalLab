import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import { LineChart, BarChart, XAxis, Tooltip,CartesianGrid,Line } from 'recharts';


const propTypes = {
 data:PropTypes.array.isRequired,
};

const LineChartSample = ({ data  }) => {

  return (
    <div style={{float: 'left',margin: 50}}>
      <LineChart
        width={500}
        height={500}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
      </LineChart>
      </div>
  );
};

LineChartSample.propTypes = propTypes;

export default LineChartSample;
