import React,{useEffect,useState,useRef} from "react";
import {AreaChart, Button, Calendar, Header, Popover} from "../webcomponent";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import {faArrowDown, faArrowUp,faMoneyCheckDollar, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Avatar, List, ListItem, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
    Card,
    CardBody,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
} from "@material-tailwind/react";
import {CurrencyDollarIcon,UserIcon,BuildingOfficeIcon } from "@heroicons/react/24/solid";


const Dashboard = () => {
    const { get } = useAxiosMethods();
    const [response, setResponse] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [listings, setListings] = useState([]);
    const [completedListings, setCompletedListings] = useState([]);
    const [selectedInvestor, setSelectedInvestor] = useState(null);
    const[allinvestorid,setAllinvestorid]=useState([]);
    const[investorpic,setinvestorpic]=useState([]);
    const {auth} = useAuth();
    const id = auth.id;
    var count=0;

    useEffect(() => {
        get(`/entrepreneurs/listingsCounter/${id}`,setResponse);
    }, []);

    useEffect(() => {
        get(`/entrepreneurs/listingsInterests/${id}`,setListings);
    }, []);

    useEffect(() => {
        get(`/entrepreneurs/completedListings/${id}`,setCompletedListings);
    }, []);

    //sort the listings according to the date and time
    response.sort((a, b) => new Date(a.date) - new Date(b.date) || a.time - b.time);

    //get top 5 listings  
    const top5Listings = response.slice(0, 5);

    for (let i = 0; i < top5Listings.length; i++) {
        const element = top5Listings[i];
        const investorid=Number(element.id);
        allinvestorid.push(investorid);
    }
    console.log(top5Listings);
    console.log(allinvestorid);

    useEffect(() => {
        get(`/entrepreneurs/getEntrepreneurPic/${allinvestorid}`, setinvestorpic);
    }, [response]);

    useEffect(() => {
        get(`/entrepreneurs/schedules/${id}`,setSchedules);
    }, []);

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
            const scheduletitle = shedule.title+" at "+shedule.time;  
            value[scheduleday].push(scheduletitle);
        }
    });

    const openPopup = (complain) => {
        setSelectedInvestor(complain);
        setShowPopup(true);
    };
    
    // Function to close the popup
    const closePopup = () => {
    setSelectedInvestor(null);
    setShowPopup(false);
    };


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

    const sectors= [];
    listings.forEach(element => {
        sectors.push(element.sector);
    });
    
    const sectorAmount=[];

    //group the listings according to the sector and store the total amount of listings in each sector
    sectors.forEach(sector => {
        listings.forEach(element => {
            if(element.sector===sector){
                //convert amount to number
                const amount = Number(element.amount);
                if (!sectorAmount[sector]) {
                    sectorAmount[sector] = 0;
                }
                sectorAmount[sector]=sectorAmount[sector]+amount;
            }
        });
    });

    const sectortotalAmount=[];
    sectors.forEach(sector => {
        sectortotalAmount.push(sectorAmount[sector]);
    });

    const completedSectors= [];
    //for each sector find the total amount of completed listings
    sectors.forEach(sector => {
        completedListings.forEach(element => {
            if(element.sector===sector){
                //convert amount to number
                const amount = Number(element.amount);
                if (!completedSectors[sector]) {
                    completedSectors[sector] = 0;
                }
                completedSectors[sector]=completedSectors[sector]+amount;
            }else{
                if (!completedSectors[sector]) {
                    completedSectors[sector] = 0;
                }
            }
        });
    });

    const completedSectortotalAmount=[];
    sectors.forEach(sector => {
        completedSectortotalAmount.push(completedSectors[sector]);
    });

    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Required Amount", data: sectortotalAmount, color: "#fdba8c"
                },
                {
                    name: "Completed Amount", data: completedSectortotalAmount, color: "#a1d2ff"
                }
            ],
            categories: sectors
        },
    }

    return (
        <Header active="Dashboard">
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem]">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Listings
                            </h5>
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            <div className="flex justify-between items-center">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Amount</p>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                             
                                <FontAwesomeIcon icon={faMoneyCheckDollar}/>
                                </div>
                            </div>
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
                                        Interested Investors
                                    </h5>
                                </div>
                                <div>
                                    <Button
                                        variant="clear"
                                        className="px-[0.75rem] !border-none"
                                    >
                                        <Link to="/entrepreneur/view-listingCounterProposal">
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    top5Listings.map((investor, index) => (
                                        <div key={index}
                                             className="flex items-center py-[1rem] border-b-[1px] justify-between">
                                            <div className="flex items-center gap-4  w-[50%]">
                                                <Avatar
                                                    src={`data:application/pdf;base64,${investorpic[count++]}`}
                                                    width="100%"
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <Typography variant="h6">{investor.Investor}</Typography>
                                                    <Typography variant="small" color="gray"
                                                                className="font-normal hidden lg:block">
                                                        {investor.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                            {
                                                investor.type==="Counter" ? (
                                                    <span
                                                        className={`hidden lg:inline-flex justify-center items-center p-2 text-sm text-label-purple-dark bg-label-purple-light rounded-lg w-[15%] `}>Counter</span>
                                                ) : (
                                                    <span
                                                        className={`hidden lg:inline-flex justify-center items-center p-2 text-sm text-label-green-dark bg-label-green-light rounded-lg w-[15%] `}>Interested</span>
                                                )
                                            }
                                            <Button
                                                variant="clear"
                                                className="px-[0.75rem] py-[0.1rem] !border-none"
                                                icon={"next"}
                                                onClick={() => openPopup(investor)}
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
                                        <Link to="/entrepreneur/schedules">
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
            {showPopup && selectedInvestor && (
                <div className="popup-modal">
                    <div className="popup-content">
                        <Card className="mt-6 w-200">
                                <div className="close-icon" onClick={closePopup}>
                                            X
                                </div>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray">
                                        {selectedInvestor.type=="Counter" ? (
                                            "You have a counter proposal for the project-"+selectedInvestor.title
                                        ) : (
                                            "You have a interest for the project-"+selectedInvestor.title
                                        )}
                                    </Typography>
                                    <Typography color="gray" className="font-normal text-gray-600">
                                        {selectedInvestor.date}
                                    </Typography>
                                </CardBody>
                                <CardBody className="flex items-start">
                                <div className="w-[32rem]">
                                    <Timeline>
                                        <TimelineItem>
                                        <TimelineConnector />
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2">
                                            <UserIcon className="h-4 w-4" />
                                            </TimelineIcon>
                                            <Typography variant="h6" color="blue-gray">
                                                Investor name
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-2">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                            {selectedInvestor.Investor}
                                            </Typography>
                                        </TimelineBody>
                                        </TimelineItem>
                                        <TimelineItem>
                                        <TimelineConnector />
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2">
                                            <BuildingOfficeIcon className="h-4 w-4" />
                                            </TimelineIcon>
                                            <Typography variant="h6" color="blue-gray">
                                            Return equity presentage (%)
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-2">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                            {selectedInvestor.equity}%
                                            </Typography>
                                        </TimelineBody>
                                        </TimelineItem>
                                        <TimelineItem>
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2">
                                            <CurrencyDollarIcon className="h-4 w-4" />
                                            </TimelineIcon>
                                            <Typography variant="h6" color="blue-gray">
                                            Return profit presentage (%)
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody>
                                            <Typography color="gary" className="font-normal text-gray-600">
                                            {selectedInvestor.profit}%
                                            </Typography>
                                        </TimelineBody>
                                        </TimelineItem>
                                    </Timeline>
                                    </div>
                                </CardBody>
                        </Card>
                    </div>    
                </div>
            )}
        </Header>
    )


}

export default Dashboard