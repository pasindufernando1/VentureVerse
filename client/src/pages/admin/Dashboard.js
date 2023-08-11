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
        </Header>
    )
}

export default DashBoard


