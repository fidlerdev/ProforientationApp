import React from 'react';
import Chart from 'react-google-charts';

const MyColumnChart = props => (
  <Chart
    width={'100%'}
    height={'200px'}
    chartType="ColumnChart"
    loader={<div>Диаграмма загружается</div>}
    data={props.data}
    options={{
      chartArea: {width: '100%', height: '100%', left: 0, right: 0},
      hAxis: { minValue: props.minXValue, maxValue: props.maxXValue, baselineColor: 'none', ticks: [] },
      vAxis: { minValue: props.minYValue, maxValue: props.maxYValue, baselineColor: 'none', ticks: [] },
      backgroundColor: 'none',
      legend: 'none',
      animation: { startup: 'true', duration: '500', easing: 'linear'},
      colors: [props.color],
      tooltip: {trigger: 'selection'}
    }}
  />
);
      

export default MyColumnChart;