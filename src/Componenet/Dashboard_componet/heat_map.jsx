import React from 'react';
import Chart from 'react-apexcharts';

const HeatChart = () => {
  const options = {
    chart: {
      type: 'heatmap',
      height: 300,
    },
    colors: [
      '#9CA3AF',
      '#F37438',
      '#9CA3AF',
      '#F37438',
      '#9CA3AF',
      '#F37438',
    ],
  };

  const series = [
    {
      name: '0',
      data: [
        { x: 'Mon', y: 22 },
        { x: 'Tue', y: 29 },
        { x: 'Wed', y: 13 },
        { x: 'Thu', y: 32 },
        { x: 'Fri', y: 32 },
        { x: 'Sat', y: 32 },
        { x: 'Sun', y: 32 },
      ],
    },
    {
      name: '20',
      data: [
        { x: 'Mon', y: 22, color: '#ff5722' },
        { x: 'Tue', y: 29 },
        { x: 'Wed', y: 13 },
        { x: 'Thu', y: 32 },
        { x: 'Fri', y: 32 },
        { x: 'Sat', y: 32 },
        { x: 'Sun', y: 32 },
      ],
    },
    {
      name: '40',
      data: [
        { x: 'Mon', y: 22 },
        { x: 'Tue', y: 29 },
        { x: 'Wed', y: 13 },
        { x: 'Thu', y: 32 },
        { x: 'Fri', y: 32 },
        { x: 'Sat', y: 32 },
        { x: 'Sun', y: 32 },
      ],
    },
    {
      name: '60',
      data: [
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 29 },
        { x: 'Wed', y: 13 },
        { x: 'Thu', y: 32 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
        { x: 'Sun', y: 32 },
      ],
    },
    {
      name: '80',
      data: [
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 20 },
        { x: 'Wed', y: 13 },
        { x: 'Thu', y: 32 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
        { x: 'Sun', y: 32 },
      ],
    },
    {
      name: '120',
      data: [
        { x: 'Mon', y: 0 },
        { x: 'Tue', y: 0 },
        { x: 'Wed', y: 75 },
        { x: 'Thu', y: 0 },
        { x: 'Fri', y: 0 },
        { x: 'Sat', y: 0 },
        { x: 'Sun', y: 0 },
      ],
    },
  ];

  return (
    <div id="heat_chart">
      <Chart options={options} series={series} type="heatmap" height={300} />
    </div>
  );
};

export default HeatChart;
