import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const expenses = [40, 30, 45, 80, 80, 60, 80, 80, 80, 85, 20, 80];
    const maxLimit = 100;

    const handleBarClick = (event, chartContext, config) => {
        const seriesIndex = config.seriesIndex;
        const dataPointIndex = config.dataPointIndex;

        if (seriesIndex === 0) {
            const income = expenses[dataPointIndex];
            alert(`Income: ${income}`);
        } else if (seriesIndex === 1) {
            const expense = maxLimit - expenses[dataPointIndex];
            alert(`Expenses: ${expense}`);
        }
    };

    const chartData = {
        series: [
            {
                name: 'Income',
                data: expenses,
            },
            {
                name: 'Expenses',
                data: expenses.map(e => maxLimit - e),
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%',
                toolbar: { show: false },
            },
            colors: ['#ff6c2f', '#f1f1f1'], // orange = income, gray = expenses
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 6,
                    borderRadiusApplication: 'end',
                    columnWidth: '75%',
                    events: {
                        click: handleBarClick,
                    },
                },
            },
            xaxis: {
                categories: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
            },
            yaxis: {
                max: 100,
                tickAmount: 5,
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                y: {
                    formatter: (val, opts) => {
                        const index = opts.dataPointIndex;
                        if (opts.seriesIndex === 0) {
                            return `: ${val}`;
                        }
                        return `: ${val}`;
                    },
                },
            },
            legend: { show: false },
            grid: {
                borderColor: '#f1f1f1',
            }
        }
    };

    return (
        <div id="chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={320}
            />
        </div>
    );
};

export default ApexChart;
