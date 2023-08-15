import React from "react";
import { Button, Header, DoughnutChart,Popover, BarChart } from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";

const GainsReport = () => {
    const barchart={
        chart1:{
            label:"Total Users",
            series:[
            {
                name:"Income",
                data:[20000,50000,35000,40000,60000,45000,90000,19000,22000,50000,70000,100000]
            }
            ],
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
                                User Gains
                            </h5>
                        </div>
                    </div>
                    <BarChart data={barchart.chart1}/>
                </div>
            </div>         
        </Header>
        </div>   
    )

}

export default GainsReport;