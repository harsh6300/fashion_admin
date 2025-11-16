import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DealRadarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ayg"],
    datasets: [
      {
        label: "Email",
        data: [40, 70, 20, 40, 40, 70, 40, 60],
        backgroundColor: "rgba(45, 203, 115)",
        borderColor: "#2dcb73",
        pointBackgroundColor: "#2dcb73",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#2dcb73",
      },
      {
        label: "Chat",
        data: [30, 30, 90, 30, 60, 30, 60, 90],
        backgroundColor: "rgba(75, 48, 136)",
        borderColor: "#4b3088",
        pointBackgroundColor: "#4b3088",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4b3088",
      },
      {
        label: "Series 3",
        data: [70, 43, 70, 90, 30, 30, 30, 40],
        backgroundColor: "rgba(242, 101, 34)",
        borderColor: "#F26522",
        pointBackgroundColor: "#F26522",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#F26522",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // IMPORTANT to allow custom height
    scales: {
      r: {
        angleLines: {
          color: "#e9e9e9",
        },
        grid: {
          circular: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 30,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "200px" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default DealRadarChart;
