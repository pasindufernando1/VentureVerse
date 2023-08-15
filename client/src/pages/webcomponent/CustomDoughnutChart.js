import React from "react";
import ReactApexChart from "react-apexcharts";

const CustomDoughnutChart = (props) => {

    const {data} = props;

    const options = {
        colors: data.colors,
        chart: {
            height: "100%",
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["white"],
            lineCap: "",
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Montserrat, sans-serif",
                            offsetY: 20,
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: data.label,
                            fontFamily: "Montserrat, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                                return `${sum}`
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Montserrat, sans-serif",
                            offsetY: -20,
                            formatter: function (value) {
                                return value
                            },
                        },
                    },
                    size: "70%",
                },
            },
        },
        grid: {
            padding: {
                top: -2,
            },
        },
        labels: data.dataLabels,
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            markers: {
                width: 12,
                height: 12,
            },
            itemMargin: {
                vertical: 10
            },
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value
                },
            },
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            onDatasetHover: {
                highlightDataSeries: false,
            },
        }
    };

    return (


        <div id="chart" className="py-4">
            <ReactApexChart options={options} series={data.series} type="donut" height={350}/>
        </div>


    );
}

export default CustomDoughnutChart;





// import React from "react";
// import { PieChart, Pie, Cell, Legend } from 'recharts';
//
// const CustomDoughnutChart = () => {
//     const data = [
//         { name: 'Completed', students: 400, color: 'purple' },
//         { name: 'Pending', students: 700, color: 'green' },
//         { name: 'Interested', students: 200, color: 'red' }
//     ];
//
//     const COLORS = data.map((entry) => entry.color || 'purple');
//
//     return (
//         <div className=''>
//             <PieChart width={400} height={400}>
//                 <Pie
//                     data={data}
//                     dataKey="students"
//                     outerRadius={100}
//                     innerRadius={70}
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//                 <Legend
//                     iconType="circle" // You can change the legend icon type here
//                     layout="horizontal"
//                     verticalAlign="bottom"
//                     align="center"
//                 />
//             </PieChart>
//         </div>
//     );
// };
//
// export default CustomDoughnutChart;