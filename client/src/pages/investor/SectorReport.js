import React from "react";
import { Button, Header, DoughnutChart,Popover, AreaChart } from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import { LineChart } from "recharts";

const UserReports = () => {
    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Invested Amount", data: [250000, 120000, 280000, 190000, 50000, 300000], 
                    color: "#FFC542"
                },
                {
                    name:"Return Amount", data: [350000, 200000, 100000, 400000, 80000, 500000],
                    color: "#FF9671"
                }
            ],
            categories: ["Technology","App/Website","Clothing / Fashion","Food & Beverages","Music","Health & Fitness"]
        }
    }

    return(
        <div>
        <Header active="Analytics">      
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="row flex">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Investments
                            </h5>
                        </div>
                    </div>
                    <AreaChart series={areaChart.chart1.series} categories={areaChart.chart1.categories} colors={areaChart.chart1.colors}/>
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