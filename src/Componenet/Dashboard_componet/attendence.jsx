import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
  CategoryScale
);

const AttendanceGaugeChart = () => {
  const canvasRef = useRef(null);

  const dataValues = [29, 21, 32, 15];
  const labels = ['Present', 'Late', 'Permission', 'Absent'];
  const colors = ['#00C853', '#6c757d', '#FFC107', '#D50000'];

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const existingChart = ChartJS.getChart(canvasRef.current);
    if (existingChart) existingChart.destroy();

    new ChartJS(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: colors,
            borderWidth: 6,
            borderColor: 'white',
            borderRadius: 10,
          },
        ],
      },
      options: {
        rotation: -90,
        circumference: 180,
        cutout: '60%',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ${value}%`;
              },
            },
          },
          legend: { display: false },
        },
      },
    });
  }, []);

  return (
    <div className=" relative">
      <canvas ref={canvasRef} className="max-h-auto_importnat"></canvas>

      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-[#6b7280] text-[13px]">Total Attendance</p>
        <p className="text-xl font-bold">120</p>
      </div>
    </div>
  );
};

export default AttendanceGaugeChart;
