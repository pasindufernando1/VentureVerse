import React from 'react';
import {AreaChart, Button, Calendar, DoughnutChart, Header, Popover} from '../webcomponent';
import {Avatar, List, ListItem, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const DashBoard = () => {

    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Views", data: [10, 5, 8, 9, 5, 7], color: "#1a56db",
                }
            ],
            categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February']
        },
        chart2: {
            series: [
                {
                    name: "Added", data: [10, 5, 8, 9, 5, 7], color: "#1a56db",
                },
                {
                    name: "Completed", data: [0, 2, 0, 3, 1, 5], color: "#fdba8c",
                }
            ],
            categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February']
        },
    }

    const donutChart = {
        chart1: {
            label: "Total Users",
            series: [35, 70],
            colors: ["#1a56db", "#fdba8c"],
            dataLabels: ["Investors", "Entrepreneur"]
        },
    }


    const complains = [
        {
            name: "Bhasa Lanka",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Investor",
        },
        {
            name: "Chris Perera",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        },
        {
            name: "Wishwa Lanka",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Investor",
        },
        {
            name: "Pamith Welikala",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        },
        {
            name: "Nadeesha Epa",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        }
    ]


    return (
        <Header active="Dashboard">
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem]">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                System Overview
                            </h5>
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            <div className="flex justify-between items-center">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"># Views</p>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                    12%
                                    <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AreaChart series={areaChart.chart1.series} categories={areaChart.chart1.categories}/>
                    <div
                        className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                            <Popover handler="Last 7 days">
                                <List className="p-0">
                                    <ListItem>
                                        Last 7 Days
                                    </ListItem>
                                    <ListItem>
                                        Last 30 Days
                                    </ListItem>
                                    <ListItem>
                                        Last Month
                                    </ListItem>
                                </List>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[1rem]">
                    <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    User Signups
                                </h5>
                            </div>
                        </div>
                        <DoughnutChart data={donutChart.chart1}/>
                        <div
                            className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                            <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                                <Popover handler="Last 7 days">
                                    <List className="p-0">
                                        <ListItem>
                                            Last 7 Days
                                        </ListItem>
                                        <ListItem>
                                            Last 30 Days
                                        </ListItem>
                                        <ListItem>
                                            Last Month
                                        </ListItem>
                                    </List>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    Listings
                                </h5>
                            </div>
                        </div>
                        <AreaChart series={areaChart.chart2.series} categories={areaChart.chart2.categories}/>
                        <div
                            className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                            <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                                <Popover handler="Last 7 days">
                                    <List className="p-0">
                                        <ListItem>
                                            Last 7 Days
                                        </ListItem>
                                        <ListItem>
                                            Last 30 Days
                                        </ListItem>
                                        <ListItem>
                                            Last Month
                                        </ListItem>
                                    </List>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-[1rem]">
                    <div className="w-full lg:w-[65%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[2rem]">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                        Complains
                                    </h5>
                                </div>
                                <div>
                                    <Button
                                        variant="clear"
                                        className="px-[0.75rem] !border-none"
                                    >
                                        <Link to="/admin/view-complains">
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    complains.map((complain, index) => (
                                        <div key={index}
                                             className="flex items-center py-[1rem] border-b-[1px] justify-between">
                                            <div className="flex items-center gap-4  w-[50%]">
                                                <Avatar
                                                    src={complain.image}
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <Typography variant="h6">{complain.name}</Typography>
                                                    <Typography variant="small" color="gray"
                                                                className="font-normal hidden lg:block">
                                                        {complain.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <span
                                                className={`hidden lg:inline-flex justify-center items-center p-2 text-sm ${complain.user === "Entrepreneur" ? "text-label-purple-dark bg-label-purple-light" : "text-label-green-dark bg-label-green-light"} rounded-lg w-[20%] `}>{complain.user}</span>
                                            <Button
                                                variant="clear"
                                                className="px-[0.75rem] py-[0.1rem] !border-none"
                                                icon={"next"}
                                            >
                                                View More
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[35%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col justify-between gap-[2rem]">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                        Calendar
                                    </h5>
                                </div>
                                <div>
                                    <Button
                                        variant="clear"
                                        className="px-[0.75rem] !border-none"
                                    >
                                        View Schedule
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[1rem]">
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                    August 2023
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </div>
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <Calendar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )

    // const [rated, setRated] = React.useState(4);
    //
    //
    // return (
    //     <Header active="Dashboard">
    //         <div className="sm:flex gap-4 mb-4 ">
    //             <div className="flex items-center justify-center h-28 rounded  ">
    //                 <Card className="mt-6 w-96">
    //                     <CardBody>
    //                         <Typography color="blue-gray" className="mb-2">
    //                             Total Invested
    //                         </Typography>
    //                         <Typography variant="h5" color="blue-gray" className="mb-2  flex">
    //                             <div>
    //                                 $27632
    //                             </div>
    //
    //                             <div className='ml-4' color="teal">
    //                                 +2.5%
    //                             </div>
    //                         </Typography>
    //                         <Typography>
    //                             Compared to ($21340 last year)
    //                         </Typography>
    //                     </CardBody>
    //                 </Card>
    //             </div>
    //             <div className="flex items-center justify-center h-28 rounded mt-12 sm:mt-0 ">
    //                 <Card className="mt-6 w-96">
    //                     <CardBody>
    //                         <Typography color="blue-gray" className="mb-2">
    //                             Expected Returns
    //                         </Typography>
    //                         <Typography variant="h5" color="blue-gray" className="mb-2  flex">
    //                             <div>
    //                                 $20199
    //                             </div>
    //
    //                             <div className='ml-4' color="teal">
    //                                 +0.5%
    //                             </div>
    //                         </Typography>
    //                         <Typography>
    //                             Compared to ($19000 last year)
    //                         </Typography>
    //                     </CardBody>
    //                 </Card>
    //             </div>
    //             <div className="flex items-center justify-center h-28 rounded mt-12 sm:mt-0 ">
    //                 <Card className="mt-6 w-96 ">
    //                     <CardBody>
    //                         <Typography color="blue-gray" className="mb-2">
    //                             Investments Ongoing
    //                         </Typography>
    //                         <Typography variant="h5" color="blue-gray" className="mb-2 ">
    //                             <div className='mb-9 text-center'>
    //                                 11
    //                             </div>
    //                         </Typography>
    //                     </CardBody>
    //                 </Card>
    //             </div>
    //         </div>
    //         <div className="sm:grid sm:grid-cols-2 gap-4 mb-4 mt-10">
    //             <div className='mt-14'>
    //                 <BarChart />
    //             </div>
    //             <div className='p-30 bg-gray-50 sm:ml-20 sm:mr-10 items-center justify-items-center'>
    //                 <p className='text-center mt-10 font-bold'>
    //                     Investment progress
    //                 </p>
    //                 <div>
    //                     <DoughnutChart />
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="sm:grid sm:grid-cols-2 gap-4">
    //             {/* <div className="flex items-center justify-center rounded">
    //                 <div className="w-full max-w-2xl px-4">
    //                     <div className="border rounded-lg pb-6 border-gray-200 dark:border-gray-700 ">
    //                         <div
    //                             className="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
    //                             <p tabIndex="0"
    //                                className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">Product
    //                                 Sales</p>
    //                             <button
    //                                 className="focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-indigo-50 dark:focus:bg-indigo-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100 dark:border-gray-800 ">
    //                                 <p className="focus:outline-none text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200 ">Filter
    //                                     by: Latest</p>
    //                             </button>
    //                         </div>
    //                         <div className="px-6 pt-6 overflow-x-auto">
    //                             <table className="w-full whitespace-nowrap">
    //                                 <tbody>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td>
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
    //                                                     alt="apple"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Apple
    //                                                         MacBook Pro 2020</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
    //                                                     alt="apple"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Apple
    //                                                         MacBook Pro 2020</p>
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg2.svg"
    //                                                     alt="google"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Google
    //                                                         Pixel 5</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg3.svg"
    //                                                     alt="microsoft"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">MS
    //                                                         Surface 2019</p>
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 </tbody>
    //                             </table>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}
    //             {/* <div className="flex items-center justify-center rounded ">
    //                 <div className="w-full max-w-2xl px-4">
    //                     <div className="border rounded-lg pb-6 border-gray-200 dark:border-gray-700 ">
    //                         <div
    //                             className="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
    //                             <p tabIndex="0"
    //                                className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">Product
    //                                 Sales</p>
    //                             <button
    //                                 className="focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-indigo-50 dark:focus:bg-indigo-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100 dark:border-gray-800 ">
    //                                 <p className="focus:outline-none text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200 ">Filter
    //                                     by: Latest</p>
    //                             </button>
    //                         </div>
    //                         <div className="px-6 pt-6 overflow-x-auto">
    //                             <table className="w-full whitespace-nowrap">
    //                                 <tbody>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td>
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
    //                                                     alt="apple"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Apple
    //                                                         MacBook Pro 2020</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
    //                                                     alt="apple"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Apple
    //                                                         MacBook Pro 2020</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg2.svg"
    //                                                     alt="google"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">Google
    //                                                         Pixel 5</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 <tr tabIndex="0" className="focus:outline-none">
    //                                     <td className="pt-6">
    //                                         <div className="flex items-center">
    //                                             <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
    //                                                 <img
    //                                                     src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg3.svg"
    //                                                     alt="microsoft"/>
    //                                             </div>
    //                                             <div className="pl-3">
    //                                                 <div className="flex items-center text-sm leading-none">
    //                                                     <p className="font-semibold text-gray-800 dark:text-white ">MS
    //                                                         Surface 2019</p>
    //
    //                                                 </div>
    //                                                 <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
    //                                                     Core i5. FHD. Integrated graphics</p>
    //                                             </div>
    //                                         </div>
    //                                     </td>
    //                                     <td className="pl-16 pt-6">
    //                                         <div>
    //                                             <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
    //
    //                                         </div>
    //                                     </td>
    //                                 </tr>
    //                                 </tbody>
    //                             </table>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div> */}
    //         </div>
    //     </Header>
    // )
}

export default DashBoard


