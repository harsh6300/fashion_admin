import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart2 = () => {
  const options = {
    chart: {
      type: 'donut',
      height: 185,
    },
    labels: ['Paid', 'Google', 'Referals', 'Campaigns'],
    colors: ['#FFC107', '#0C4B5E', '#AB47BC', '#FD3995'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Google',
              formatter: function () {
                return '40%';
              },
            },
          },
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      lineCap: 'round',
      colors: ['#fff'],
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [25, 30, 10, 35];

  return (
    <div id="donut-chart-2">
      <Chart options={options} series={series} type="donut" height={185} />
    </div>
  );
};

export default DonutChart2;
