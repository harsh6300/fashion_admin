import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const RadialBarChart = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Wait until after mount to render the chart
    setIsMounted(true);
  }, []);

  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
      offsetY: -10,
      id: 'radialBarChart',
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            formatter: (val) => val + '%',
          },
        },
      },
    },
    fill: {
      colors: ['#ff6c2f'],
      type: 'solid',
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Median Ratio'],
  };

  const series = [67];

  return (
    <div className="radial-bar-chart-container">
      <h5 className="chart-title mb-[16px] font-[600] text-[16px] text-[#313b5e]">Conversions</h5>
      <div id="chart" className="sans">
        {isMounted && (
          <ApexCharts
            options={options}
            series={series}
            type="radialBar"
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default RadialBarChart;
