import React from "react";
import ReactApexChart from "react-apexcharts";

// Example data (replace with your actual data)
const series = {
    monthDataSeries1: {
        prices: [31, 40, 58, 51, 82, 109, 100],
        dates: [
            "2023-01-01",
            "2023-02-01",
            "2023-03-01",
            "2023-04-01",
            "2023-05-01",
            "2023-06-01",
            "2023-07-01",
        ],
    },
};

const ApexChart = () => {
    const [state] = React.useState({
        series: [
            {
                name: "STOCK ABC",
                data: series.monthDataSeries1.prices,
            },
        ],
        options: {
            chart: {
                type: "area",
                height: "100%",
                width: "100%",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: true,            // Show the toolbar
                    tools: {
                        download: true,      // Enable download (PNG only by default)
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                    },
                    export: {
                        csv: {
                            filename: 'chart-data',
                            columnDelimiter: ',',
                            headerCategory: 'Category',
                            headerValue: 'Value',
                            dateFormatter(timestamp) {
                                return new Date(timestamp).toDateString()
                            }
                        },
                        svg: {
                            filename: 'chart-image',
                        },
                        png: {
                            filename: 'chart-image',
                        }
                    },
                    autoSelected: 'zoom' // Optional: tool selected by default
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "straight",
            },
            colors: ["#22c55e"], // green color
            title: {
                align: "left",
            },
            subtitle: {
                align: "left",
            },
            labels: series.monthDataSeries1.dates,
            xaxis: {
                type: "datetime",
            },
            yaxis: {
                opposite: false,
            },
            legend: {
                horizontalAlign: "left",
            },
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 300,
                        },
                        legend: {
                            show: false,
                        },
                        title: {
                            style: {
                                fontSize: "14px",
                            },
                        },
                    },
                },
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 250,
                        },
                        title: {
                            style: {
                                fontSize: "12px",
                            },
                        },
                        subtitle: {
                            style: {
                                fontSize: "10px",
                            },
                        },
                    },
                },
            ],
        },
    });

    return (
        <div style={{ width: "100%", height: "300px" }}>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="area"
                height="100%"
                width="100%"
            />
        </div>
    );
};


export default ApexChart;
