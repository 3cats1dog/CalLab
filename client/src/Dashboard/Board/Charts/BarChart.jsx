import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const propTypes = {
 data:PropTypes.array.isRequired,
};

const BarChartSample = ({  data }) => {

    /*
    <ResponsiveContainer width="100%" height="100%">
    </ResponsiveContainer>
  */
  return (
    <div style={{float:'left',margin: 50}}>
    <BarChart
      width={700}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    </div>
  );
};

BarChartSample.propTypes = propTypes;

export default BarChartSample;
