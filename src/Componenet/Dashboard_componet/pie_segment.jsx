import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const SemiDonutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (window.mySemiDonutChart) {
      window.mySemiDonutChart.destroy(); // clean up old chart
    }

    window.mySemiDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Ongoing', 'Onhold', 'Completed', 'Overdue'],
        datasets: [
          {
            label: 'Semi Donut',
            data: [20, 40, 20, 10],
            backgroundColor: ['#FFC107', '#1B84FF', '#03C95A', '#E70D0D'],
            borderColor: 'transparent',
            borderWidth: 0,
            cutout: '75%',
            spacing: -30,
          },
        ],
      },
      options: {
        rotation: -100,
        circumference: 185,
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: -20,
            bottom: 20,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
            borderRadius: 30,
          },
        },
      },
    });
  }, []);

  return (
    <div className="relative w-[300px] h-[160px] mx-auto">
      <canvas ref={chartRef}></canvas>
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-500 text-sm">Total Tasks</p>
        <p className="font-bold text-xl">124/165</p>
      </div>
    </div>
  );
};

export default SemiDonutChart;
