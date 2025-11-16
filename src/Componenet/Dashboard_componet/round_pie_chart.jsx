import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Apples", "Bananas", "Oranges", "Grapes", "Berries"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(0) + "%",
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
              formatter: (val) => val,
            },
            total: {
              show: true,
              label: 'Total',
              formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 280,
          },
        },
      },
    ],
  };

  const series = [44, 55, 41, 17, 15];

  return (
    <div style={{ maxWidth: "100%", margin: "auto" }}>
      <ReactApexChart options={chartOptions} series={series} type="donut" width="100%" />
    </div>
  );
};

export default ApexChart;
