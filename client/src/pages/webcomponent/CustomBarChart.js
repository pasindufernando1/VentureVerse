import React from "react";
import ReactApexChart from "react-apexcharts";

const CustomBarChart = (props) => {

    const {data} = props;

    const options = {
        colors: data.colors,
        chart: {
            height: "100%",
            width: "100%",
            type: "bar",
        },
        stroke: {
            colors: ["white"],
            lineCap: "",
        },
        plotOptions: {
            bar: {
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
            bar: {
                horizontal: false, 
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
            <ReactApexChart options={options} series={data.series} type="bar" height={350}/>
        </div>


    );
}

export default CustomBarChart;





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




// import React from "react";

// const CustomBarChart = () => {

//     return (
//         <div className="flex flex-col h-30 justify-center ">
//             <div
//                 className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 mt-10 bg-white rounded-lg shadow-xl sm:p-8">
//                 <h2 className="text-xl font-bold">Monthly Revenue</h2>
//                 <span className="text-sm font-semibold text-gray-500">2020</span>
//                 <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$37,500</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-8 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-6 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-16 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-12 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Jan</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$45,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-6 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-20 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-14 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Feb</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-20 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Mar</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$50,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-6 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-24 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Apr</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$47,500</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-10 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-20 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-9 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">May</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$55,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-24 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Jun</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$60,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-16 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-20 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-5 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Jul</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$57,500</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-24 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-2 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Aug</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$67,500</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-32 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Sep</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$65,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-12 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-28 bg-purple-300 "></div>
//                             <div className="relative flex justify-center flex-grow h-10 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Oct</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$70,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-8 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-40 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-9 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Nov</span>
//                     </div>
//                     <div className="relative flex flex-col items-center flex-grow pb-5 group">
//                         <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">$75,000</span>
//                         <div className="flex items-end w-full">
//                             {/* <div className="relative flex justify-center flex-grow h-12 bg-purple-200"></div> */}
//                             <div className="relative flex justify-center flex-grow h-8 bg-purple-500"></div>
//                             <div className="relative flex justify-center flex-grow h-40 bg-purple-300"></div>
//                             <div className="relative flex justify-center flex-grow h-7 bg-purple-100"></div>
//                         </div>
//                         <span className="absolute bottom-0 text-xs font-bold">Dec</span>
//                     </div>
//                 </div>
//                 <div className="flex w-full mt-3">
//                     <div className="flex items-center ml-auto">
//                         <span className="block w-4 h-4 bg-purple-100"></span>
//                         <span className="ml-1 text-xs font-medium">Basic</span>
//                     </div>
//                     <div className="flex items-center ml-4">
//                         <span className="block w-4  h-4  bg-purple-300"></span>
//                         <span className="ml-1 text-xs font-medium">Standard</span>
//                     </div>
//                     <div className="flex items-center ml-4">
//                         <span className="block w-4  h-4 bg-purple-500"></span>
//                         <span className="ml-1 text-xs font-medium">Premium</span>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

// export default CustomBarChart