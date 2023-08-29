import React,{useState,useEffect} from "react";
import { Button, Header, DoughnutChart,Popover, BarChart } from "../webcomponent";
import { List, ListItem} from "@material-tailwind/react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

const UserReports = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const[response1,setResponse1]=useState([]);

    useEffect(() => {
        get("/user/getusers",setResponse);
    }, []);

    useEffect(() => {
        get("/user/getusersignup",setResponse1);
    }, []);
    console.log(response1);

    const approvedUsers = [];
    const pendingUsers = [];

    response.forEach(user => {
        const userStatus = user.approvalStatus;
        const userRole = user.userRole;
        if(userStatus === "APPROVED"){
            approvedUsers.push(userRole);
        }else if(userStatus === "PENDING"){
            pendingUsers.push(userRole);
        }
    });

    let approvedInvestors = 0;
    let approvedEntrepreneurs = 0;
    let approvedCoAdmins = 0;

    let pendingInvestors = 0;
    let pendingEntrepreneurs = 0;
    let pendingCoAdmins = 0;

    approvedUsers.forEach(element => {
        if (element === "INDIVIDUAL_INVESTOR"||element === "ENTERPRISE_INVESTOR") {
            approvedInvestors++;
        } else if (element === "ENTREPRENEUR") {
            approvedEntrepreneurs++;
        } else if (element === "CO_ADMIN") {
            approvedCoAdmins++;
        }
    });

    pendingUsers.forEach(element => {
        if (element === "INDIVIDUAL_INVESTOR"||element === "ENTERPRISE_INVESTOR") {
            pendingInvestors++;
        } else if (element === "ENTREPRENEUR") {
            pendingEntrepreneurs++;
        } else if (element === "CO_ADMIN") {
            pendingCoAdmins++;
        }
    });

    //barchart data
    const Investors = [];
    const Entrepreneurs = [];
    const CoAdmins = [];

    response1.forEach(user => {
        const userRole = user.userRole;
        const userMonth = user.registeredMonth;
        if(userRole === "INDIVIDUAL_INVESTOR"||userRole === "ENTERPRISE_INVESTOR"){
            Investors.push(userMonth);
        }else if(userRole === "ENTREPRENEUR"){
            Entrepreneurs.push(userMonth);
        }else if(userRole === "CO_ADMIN"){
            CoAdmins.push(userMonth);
        }
    });

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const months = [];
    for (let i = 12; i > 0; i--) {
      const year = currentYear + Math.floor((currentMonth + i) / 12)-1;
      const monthIndex = (currentMonth + i) % 12;
      const monthName = new Date(currentYear, monthIndex).toLocaleString('default', { month: 'long' });
      months.push(`${monthName} ${year}`);
    }

    //reverse the array
    months.reverse();

    //count the no of users in each month
    const countInvestors = [];
    const countEntrepreneurs = [];
    const countCoAdmins = [];

    months.forEach(month => {
        let countInvestor = 0;
        let countEntrepreneur = 0;
        let countCoAdmin = 0;
        Investors.forEach(element => {
            if(element === month){
                countInvestor++;
            }
        });
        Entrepreneurs.forEach(element => {
            if(element === month){
                countEntrepreneur++;
            }
        });
        CoAdmins.forEach(element => {
            if(element === month){
                countCoAdmin++;
            }
        });
        countInvestors.push(countInvestor);
        countEntrepreneurs.push(countEntrepreneur);
        countCoAdmins.push(countCoAdmin);
    });

    const donutChart = {
        chart1: {
            label: "Total Users",
            series: [approvedInvestors, approvedEntrepreneurs, approvedCoAdmins],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Investors", "Entrepreneur","Co-Admins"]
        },
        chart2:{
            label: "Total Users",
            series: [pendingInvestors, pendingEntrepreneurs, pendingCoAdmins],
            dataLabels: ["Accepted","Pending","Rejected"]
        }
    } 
     // bar chart to diplay no of users with the month
    const barchart={
        chart1:{
            label:"Total Users",
            series:[{
                name:"Investors",
                data:countInvestors
            },
            {
                name:"Entrepreneur",
                data:countEntrepreneurs
            },
            {
                name:"Co-Admins",
                data:countCoAdmins
            }
            ],
            colors:["#00CED9", "#1AE3B5", "#9CF28B"],
            dataLabels:months
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