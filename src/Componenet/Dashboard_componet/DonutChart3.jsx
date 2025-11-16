import React from 'react';
import Chart from 'react-apexcharts';

const DonutChart3 = () => {
  const options = {
    chart: {
      type: 'donut',
      height: 290,
    },
    labels: ['Paid', 'Google', 'Referals', 'Campaigns', 'Campaigns'],
    colors: ['#F26522', '#FFC107', '#E70D0D', '#1B84FF', '#0C4B5E'],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Leads',
              formatter: () => '589',
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const series = [15, 10, 5, 10, 60];

  return (
    <div id="donut-chart-3">
      <Chart options={options} series={series} type="donut" height={290} />
    </div>
  );
};

export default DonutChart3;
