import React,{useState,useEffect} from "react";
import { Button, Header, DoughnutChart,Popover, BarChart } from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const UserReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);

    useEffect(() => {
        get("/entrepreneurs/getcomplains",setResponse);
    }, []);

    const investorComplains = [];
    const entrepreneurComplains = [];

    response.forEach(complain => {
        const userRole = complain.userRole;
        const complainType = complain.complainType;

        if (userRole === "INDIVIDUAL_INVESTOR") {
            investorComplains.push(complainType);
        } else if (userRole === "ENTREPRENEUR") {
            entrepreneurComplains.push(complainType);
        }
    });

    let acceptedInvestorComplains = 0;
    let pendingInvestorComplains = 0;
    let rejectedInvestorComplains = 0;

    let acceptedEntrepreneurComplains = 0;
    let pendingEntrepreneurComplains = 0;
    let rejectedEntrepreneurComplains = 0;

    //foreach complain count accepted, pending, rejected
    investorComplains.forEach(element => {
        if (element === "ACCEPTED") {
            acceptedInvestorComplains++;
        } else if (element === "PENDING") {
            pendingInvestorComplains++;
        } else if (element === "REJECTED") {
            rejectedInvestorComplains++;
        }
    });

    entrepreneurComplains.forEach(element => {
        if (element === "ACCEPTED") {
            acceptedEntrepreneurComplains++;
        } else if (element === "PENDING") {
            pendingEntrepreneurComplains++;
        } else if (element === "REJECTED") {
            rejectedEntrepreneurComplains++;
        }
    });

    const donutChart = {
        chart1: {
            label: "Total Complains",
            series: [acceptedEntrepreneurComplains, pendingEntrepreneurComplains, rejectedEntrepreneurComplains],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Accepted","Pending","Rejected"]
        },
        chart2:{
            label: "Total Complains",
            series: [acceptedInvestorComplains, pendingInvestorComplains, rejectedInvestorComplains],
            // colors: ["#A35EC2", "#C7A3D4", "#FFE8FF"],
            dataLabels: ["Accepted","Pending","Rejected"]
        }
    } 
    return(
        <div>
        <Header active="Analytics">  
            <Button
                variant="clear"
                className="px-[0.75rem] !border-none"
                type="button"
                icon="previous"
                onClick={() => {
                    window.location.href = "/admin/analytics";
                }}
            >
               Back
            </Button>    
            <div className="w-full flex flex-col lg:flex-row gap-[1rem] mt-6">
                <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                        <div className="row flex">
                            <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                Entrepreneur Complains
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
                                Investor Complains
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