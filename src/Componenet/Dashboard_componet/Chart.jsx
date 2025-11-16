import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = () => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 280, // Chart height set to 280px
    },
    plotOptions: {
      bar: {
        borderRadius: 4, // Border radius set to 4px
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    colors: ['#ff6c2f'], // Bar color
    tooltip: {
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Orders',
      data: [80, 50, 30, 90, 40, 60, 50, 60, 65, 42, 67, 74],
    },
  ];

  return (
    <div className="bg-white p-4 rounded-[5px] shadow-md h-full">
      <h2 className="text-[16px] font-[500] mb-4 text-[#313b5e]">Performance</h2>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={280} />
    </div>
  );
};

export default ColumnChart;
