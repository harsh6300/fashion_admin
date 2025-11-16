import React from 'react';
import Chart from 'react-apexcharts';

const LeadsStageChart = () => {
  const options = {
    chart: {
      height: 355,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ['#FF6F28', '#F8F9FA'],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    }],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusWhenStacked: 'all',
        horizontal: false,
        endingShape: 'rounded',
      },
    },
    xaxis: {
      categories: ['Competitor', 'Budget', 'Unresponsive', 'Timing'],
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '9px',
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: '#6B7280',
          fontSize: '10px',
        },
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: 'Income',
      data: [80, 40, 60, 40],
    },
    {
      name: 'Expenses',
      data: [100, 100, 100, 100],
    },
  ];

  return (
    <div id="leads_stage">
      <Chart options={options} series={series} type="bar" height={355} />
    </div>
  );
};

export default LeadsStageChart;
