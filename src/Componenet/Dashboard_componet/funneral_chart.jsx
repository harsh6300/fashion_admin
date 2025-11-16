import React from "react";
import ReactApexChart from "react-apexcharts";

const PipelineChart = () => {
  const options = {
    series: [
      {
        name: "",
        data: [1380, 1100, 990, 880, 740, 540],
      },
    ],
    chart: {
      type: "bar",
      height: 280,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: "80%",
        isFunnel: true,
      },
    },
    colors: [
      "#F26522",
      "#F37438",
      "#F5844E",
      "#F69364",
      "#F7A37A",
      "#F9B291",
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex];
      },
      dropShadow: {
        enabled: true,
      },
      style: {
        fontSize: "14px",
        fontWeight: 600,
        colors: ["#fff"],
      },
    },
    title: {
      align: "top",
    },
    xaxis: {
      categories: [
        "Marketing : 7,898",
        "Sales : 4658",
        "Email : 2898",
        "Chat : 789",
        "Operational : 655",
        "Calls : 454",
      ],
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div id="pipeline_chart" style={{ width: "100%", height: "280px" }}>
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={280}
      />
    </div>
  );
};

export default PipelineChart;
