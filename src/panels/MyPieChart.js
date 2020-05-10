import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const MyPieChart = props => {

  var rows = [[props.type_head, props.value_head], ];
  let temp = props.types.map((e, i) => [e, props.values[i]]);
  for (let el of temp) {
    rows.push(el);
  }
  

  return (
    <Chart
    style={{ borderRadius: 10 }}
    width={'100%'}
    height={'250px'}
    chartType="PieChart"
    loader={<div>Диаграмма загружается</div>}
    data={rows}
    options={{
      backgroundColor: 'white'
    }}
    rootProps={{ 'data-testid': '1' }}
    />
  );
};    

export default MyPieChart;