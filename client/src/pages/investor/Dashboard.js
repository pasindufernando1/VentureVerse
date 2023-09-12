import React,{useEffect,useState,useRef} from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import {AreaChart, Button, Calendar, Header, Popover} from "../webcomponent";
import {faArrowDown, faArrowUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Avatar, List, ListItem, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const[schedules,setSchedules]=useState([]);
    const {auth} = useAuth();
    const id = auth.id;

    useEffect(() => {
        get(`/investors/projects/${id}`,setResponse);
    }, []);

    useEffect(() => {
        get(`/investors/schedules/${id}`,setSchedules);
    }, []);
    
    //take meetings of this month and put the date and time to the value array
    const value = {};
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    schedules.forEach(shedule => {
        const scheduledate = shedule.date;
        const scheduletime = shedule.time.toString();
        const scheduleday = new Date(scheduledate).getDate();
        const schedulemonth = new Date(scheduledate).getMonth();
        const scheduleyear = new Date(scheduledate).getFullYear();
        //create a date object with date as the key and meeting times as the array of values
        if(scheduleyear === currentYear && schedulemonth === currentMonth){
            if (!value[scheduleday]) {
                value[scheduleday] = [];
            }          
            value[scheduleday].push(scheduletime);
        }
    });

    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [Currentmonth, setMonth] = useState(date.getMonth());
    const monthName=new Date(year, Currentmonth).toLocaleString('default', { month: 'long' });

    const handlePrevClick = () => {
        if (Currentmonth === 0) {
          setYear(year - 1);
          setMonth(11); // Set the month to December (11) for the previous year
        } else {
          setMonth(Currentmonth - 1);
        }
    };
    
    // Function to handle clicking the next icon
    const handleNextClick = () => {
    if (Currentmonth === 11) {
        setYear(year + 1);
        setMonth(0); // Set the month to January (0) for the next year
    } else {
        setMonth(Currentmonth + 1);
    }
    };
  
    const months = [];
    for (let i = 12; i > 0; i--) {
      const year = currentYear + Math.floor((currentMonth + i) / 12)-1;
      const monthIndex = (currentMonth + i) % 12;
      const monthName = new Date(currentYear, monthIndex).toLocaleString('default', { month: 'short' });
      months.push(`${monthName} ${year}`);
    }

    //reverse the array
    months.reverse();

    const countOngoing = [];
    const countFinalized = [];
    months.forEach(element => {
        let countFinalizedProjects = 0;
        let countOngoingProjects = 0;
        response.forEach(project => {
            if(project.finalizeDate === element){
                countFinalizedProjects++;
            }
        });
        countOngoing.push(countOngoingProjects);
        countFinalized.push(countFinalizedProjects);
    });

    const ongoing = [];
    response.forEach(project => {
        if(project.finalizeDate == "Not Finalized"){
            ongoing.push(project);
        }
    });

    ongoing.forEach(project => {
        const date = project.interestedDate;
        for(let i=0;i<months.length;i++){
            if(date === months[i]){
                for(let j=i;j<months.length;j++){
                    countOngoing[j]++;
                }
                break;
            }
        }
    });

    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Ongoing Projects", data: countOngoing,
                    color: "#1a56db"
                },
                {
                    name:"Completed Projects", data: countFinalized,
                    color: "#fdba8c"
                }
            ],
            categories:months
        },
    }

    const interestedInvestors = [
        {
            name: "Chris Perera",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            counter: false
        },
        {
            name: "Pamith Welikala",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            counter: true
        },
        {
            name: "Nadeesha Epa",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            counter: false
        }
    ]

    return (
        <Header active="Dashboard">
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Investments
                            </h5>
                        </div>
                    </div>
                        <AreaChart series={areaChart.chart1.series} categories={areaChart.chart1.categories}/>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-[1rem]">
                    <div className="w-full lg:w-[65%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[2rem]">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                        My Offers
                                    </h5>
                                </div>
                                <div>
                                    <Button
                                        variant="clear"
                                        className="px-[0.75rem] !border-none"
                                    >
                                        <Link to="/investor/interests">
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    interestedInvestors.map((investor, index) => (
                                        <div key={index}
                                             className="flex items-center py-[1rem] border-b-[1px] justify-between">
                                            <div className="flex items-center gap-4  w-[50%]">
                                                <Avatar
                                                    src={investor.image}
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <Typography variant="h6">{investor.name}</Typography>
                                                    <Typography variant="small" color="gray"
                                                                className="font-normal hidden lg:block">
                                                        {investor.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <span
                                                className={`hidden lg:inline-flex justify-center items-center p-2 text-sm ${investor.counter ? "text-label-purple-dark bg-label-purple-light" : "text-label-green-dark bg-label-green-light"} rounded-lg w-[15%] `}>{investor.counter ? "Counter" : "Interested"}</span>
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
                                        <Link to="/investor/schedules">
                                            View Schedule
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[1rem]">
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <FontAwesomeIcon 
                                        icon={faChevronLeft}
                                        onClick={handlePrevClick}
                                    />
                                        {monthName} {year}
                                    <FontAwesomeIcon 
                                        icon={faChevronRight}
                                        onClick={handleNextClick}
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <Calendar month={Currentmonth} year={year} value={value}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )


}

export default Dashboard