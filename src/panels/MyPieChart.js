import React from 'react';
import Chart from 'react-google-charts';

const MyPieChart = props => (
  <Chart
  style={{ borderRadius: 10 }}
  width={'100%'}
  height={'200px'}
  chartType="PieChart"
  loader={<div>Диаграмма загружается</div>}
  data={[
    ['Тип мышления', 'Количество баллов'],
    ['П-Д', props.value_1],
    ['А-С', props.value_2],
    ['С-Л', props.value_3],
    ['Н-О', props.value_4],
    ['К', props.value_5],
  ]}
  options={{
    backgroundColor: 'white'
  }}
  rootProps={{ 'data-testid': '1' }}
  />
);
      

export default MyPieChart;