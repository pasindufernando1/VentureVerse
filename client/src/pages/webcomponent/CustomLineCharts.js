import React from "react";
import ReactApexChart from "react-apexcharts";

const CustomLineCharts = (props) => {

    const {series, categories} = props;

    const options = {
        chart: {
            height: "100%",
            width: "100%",
            type: "area",
            fontFamily: "Montserrat, sans-serif",
            dropShadow: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        tooltip: {
            enabled: true,
            x : {
                show: false,
            }
        },
        grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 4,
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: 0
            },
        },
        markers: {
            size: 5,
            colors: ["#1a56db", "#fdba8c"],
            strokeColor: "#FFF",
            strokeWidth: 2
        },
        xaxis: {
            categories: categories,
            labels: {
                show: true,
            },
            axisBorder: {
                show: true,
                height: 0.5,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: true,
            labels: {
                show: true,
                align: "left",
                offsetX: -10,
            },
        },
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "right",
            fontSize: "16px",
            fontWeight: 700,
            markers: {
                width: 12,
                height: 12,
            },
            itemMargin: {
                vertical: 10
            },
        }
    };

    return (
    <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
    );
}

export default CustomLineCharts;
