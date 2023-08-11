import React from 'react';
import {Header, BarChart, DoughnutChart} from '../webcomponent';
import {Card, CardBody, Rating, Typography} from "@material-tailwind/react";

const DashBoard = () => {

    const [rated, setRated] = React.useState(4);


    return (
        <Header active="Dashboard">
            <div className="sm:flex gap-4 mb-4 ">
                <div className="flex items-center justify-center h-28 rounded  ">
                    <Card className="mt-6 w-96">
                        <CardBody>
                            <Typography color="blue-gray" className="mb-2">
                                Total Invested
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2  flex">
                                <div>
                                    $27632
                                </div>

                                <div className='ml-4' color="teal">
                                    +2.5%
                                </div>
                            </Typography>
                            <Typography>
                                Compared to ($21340 last year)
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex items-center justify-center h-28 rounded mt-12 sm:mt-0 ">
                    <Card className="mt-6 w-96">
                        <CardBody>
                            <Typography color="blue-gray" className="mb-2">
                                Expected Returns
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2  flex">
                                <div>
                                    $20199
                                </div>

                                <div className='ml-4' color="teal">
                                    +0.5%
                                </div>
                            </Typography>
                            <Typography>
                                Compared to ($19000 last year)
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex items-center justify-center h-28 rounded mt-12 sm:mt-0 ">
                    <Card className="mt-6 w-96 ">
                        <CardBody>
                            <Typography color="blue-gray" className="mb-2">
                                Investments Ongoing
                            </Typography>
                            <Typography variant="h5" color="blue-gray" className="mb-2 ">
                                <div className='mb-9 text-center'>
                                    11
                                </div>
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-4 mb-4 mt-10">
                <div className='mt-14'>
                    <BarChart />
                </div>
                <div className='p-30 bg-gray-50 sm:ml-20 sm:mr-10 items-center justify-items-center'>
                    <p className='text-center mt-10 font-bold'>
                        Investment progress
                    </p>
                    <div>
                        <DoughnutChart />
                    </div>
                </div>
            </div>
            <div className="sm:grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-center rounded">
                    <div className="w-full max-w-2xl px-4">
                        <div className="border rounded-lg pb-6 border-gray-200 dark:border-gray-700 ">
                            <div
                                className="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                                <p tabIndex="0"
                                   className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">Product
                                    Sales</p>
                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-indigo-50 dark:focus:bg-indigo-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100 dark:border-gray-800 ">
                                    <p className="focus:outline-none text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200 ">Filter
                                        by: Latest</p>
                                </button>
                            </div>
                            <div className="px-6 pt-6 overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <tbody>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td>
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
                                                        alt="apple"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Apple
                                                            MacBook Pro 2020</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
                                                        alt="apple"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Apple
                                                            MacBook Pro 2020</p>
                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg2.svg"
                                                        alt="google"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Google
                                                            Pixel 5</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg3.svg"
                                                        alt="microsoft"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">MS
                                                            Surface 2019</p>
                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded ">
                    <div className="w-full max-w-2xl px-4">
                        <div className="border rounded-lg pb-6 border-gray-200 dark:border-gray-700 ">
                            <div
                                className="flex items-center border-b border-gray-200 dark:border-gray-700  justify-between px-6 py-3">
                                <p tabIndex="0"
                                   className="focus:outline-none text-sm lg:text-xl font-semibold leading-tight text-gray-800 dark:text-white ">Product
                                    Sales</p>
                                <button
                                    className="focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:bg-indigo-50 dark:focus:bg-indigo-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100 dark:border-gray-800 ">
                                    <p className="focus:outline-none text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200 ">Filter
                                        by: Latest</p>
                                </button>
                            </div>
                            <div className="px-6 pt-6 overflow-x-auto">
                                <table className="w-full whitespace-nowrap">
                                    <tbody>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td>
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
                                                        alt="apple"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Apple
                                                            MacBook Pro 2020</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg1.svg"
                                                        alt="apple"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Apple
                                                            MacBook Pro 2020</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg2.svg"
                                                        alt="google"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">Google
                                                            Pixel 5</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>

                                            </div>
                                        </td>
                                    </tr>
                                    <tr tabIndex="0" className="focus:outline-none">
                                        <td className="pt-6">
                                            <div className="flex items-center">
                                                <div className="bg-gray-100 dark:bg-gray-800  rounded-sm p-2.5">
                                                    <img
                                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/list5-svg3.svg"
                                                        alt="microsoft"/>
                                                </div>
                                                <div className="pl-3">
                                                    <div className="flex items-center text-sm leading-none">
                                                        <p className="font-semibold text-gray-800 dark:text-white ">MS
                                                            Surface 2019</p>

                                                    </div>
                                                    <p className="text-xs md:text-sm leading-none text-gray-600 dark:text-gray-200  mt-2">15’5.
                                                        Core i5. FHD. Integrated graphics</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-16 pt-6">
                                            <div>
                                                <p className="text-sm font-semibold leading-none text-right text-gray-800 dark:text-white ">View</p>

                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative shadow-md sm:rounded-lg p-2">
                <h2 className="text-4xl font-extrabold my-5">
                    Investors
                </h2>
                <div className="flex items-center justify-between pb-4 bg-white">
                    <div className="flex">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search For users"
                            />
                        </div>
                        <div className="ml-4 mt-2">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor"
                                     viewBox="0 0 20 20" stroke="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor"
                                 viewBox="0 0 20 20" stroke="currentColor">
                                <path
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/>
                            </svg>
                            Add user
                        </button>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3 w-12">
                            Rating
                        </th>
                        <th scope="col" className="">
                            {/* Action */}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Neil Sims</div>
                                <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            React Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={1} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>

                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Bonnie Green</div>
                                <div className="font-normal text-gray-500">bonnie@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            Designer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={1} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>

                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Jese Leos</div>
                                <div className="font-normal text-gray-500">jese@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            Vue JS Developer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={5} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-2" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-2" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Thomas Lean</div>
                                <div className="font-normal text-gray-500">thomes@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            UI/UX Engineer
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Online
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={3} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>

                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>

                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-3" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Leslie Livingston</div>
                                <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            SEO Specialist
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                Offline
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={2} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Delete
                            </button>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-3" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-table-search-3" className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row"
                            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img className="w-10 h-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=htmlFormat&fit=crop&w=1480&q=80"
                                 alt="Jese"/>
                            <div className="pl-3">
                                <div className="text-base font-semibold">Leslie Livingston</div>
                                <div className="font-normal text-gray-500">leslie@flowbite.com</div>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            SEO Specialist
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                Offline
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <Rating value={1} onChange={(value) => setRated(value)}/>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <button
                                className="inline-flex items-center px-4 py-2 bg-purple-700 hover:bg-purple-800  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Update
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-700  text-white text-sm font-medium rounded-md m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                    <path strokeLinecap="round" clipRule="evenodd" strokeWidth="1.3"
                                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                </svg>
                                Ban
                            </button>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </Header>
    )
}

export default DashBoard


