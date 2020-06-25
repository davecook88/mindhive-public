import React from 'react';
import { Chart } from "react-google-charts";

const LineChart = ({data, options}) => {
  return <Chart
            // width={'600px'}
            // height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            width="100%"
            height="200px"
            legendToggle
          />
}

export default LineChart;