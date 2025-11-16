import React from "react";
import ReactApexChart from "react-apexcharts";

const DealsStageChart = () => {
  const options = {
    chart: {
      height: 310,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF6F28", "#FF6F28"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: ["Inpipeline", "Follow Up", "Schedule", "Conversion"],
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "#6B7280",
          fontSize: "13px",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
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
      name: "Income",
      data: [80, 40, 100, 20],
    },
    {
      name: "Expenses",
      data: [100, 100, 100, 100],
    },
  ];

  return (
    <div id="deals_stage" style={{ width: "100%", height: "310px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={310}
      />
    </div>
  );
};

export default DealsStageChart;
