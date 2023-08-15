import React from "react";
import { Button, Header, DoughnutChart,Popover, BarChart } from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";

const UserReports = () => {
    const donutChart = {
        chart1: {
            label: "Total Users",
            series: [35, 70,10],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Investors", "Entrepreneur","Co-Admins"]
        },
        chart2:{
            label: "Total Users",
            series: [35, 70,10],
            // colors: ["#A35EC2", "#C7A3D4", "#FFE8FF"],
            dataLabels: ["Accepted","Pending","Rejected"]
        }
    } 
     // bar chart to diplay no of users with the month
    const barchart={
        chart1:{
            label:"Total Users",
            series:[{
                name:"Investors",
                data:[10,20,10,15,30,20,10,40,25,45,80,90]
            },
            {
                name:"Entrepreneur",
                data:[20,10,28,25,85,45,60,70,80,100,50,76]
            },
            {
                name:"Co-Admins",
                data:[20,50,18,30,55,69,78,45,32,56,10,58]
            }
            ],
            colors:["#00CED9", "#1AE3B5", "#9CF28B"],
            dataLabels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        }
    } 

    return(
        <div>
        <Header active="Analytics">   
            <div className="w-full flex flex-col lg:flex-row gap-[1rem]">
                <div className="w-full lg:w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="row flex">
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                User Signups
                            </h5>
                        </div>
                    </div>
                    <BarChart data={barchart.chart1}/>
                </div>
            </div>    
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="row flex">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Registered Users
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
                        <div className="row flex">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                User Requests
                            </h5>
                        </div>
                    </div>
                    <DoughnutChart data={donutChart.chart2}/>
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
        </Header>
        </div>   
    )

}

export default UserReports;