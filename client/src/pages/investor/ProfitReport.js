import React from "react";
import { Button, Header,Popover, LineChart} from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const InterestReports = () => {
    const lineChart = {
        chart1: {
            series: [
                {
                    name: "Profit", data: [500000, 1200000, 2400000, 3000000, 4000000, 5000000], 
                },
                {
                    name:"Invested Amount", data: [3000000,3000000,3000000,3000000,3000000,3000000],
                }

            ],
            colors: ["#1a56db"],
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        }
    }

    return(
        <div>
        <Header active="Analytics">   
        <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem]">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Profit Growth Report
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
                    <LineChart series={lineChart.chart1.series} categories={lineChart.chart1.categories} colors={lineChart.chart1.colors}/>
                    {/* <div
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
                    </div> */}
                </div>
            </div>
        </Header>
        </div>   
    )

}

export default InterestReports;