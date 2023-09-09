import React from 'react';
import {AreaChart, Button, Calendar, DoughnutChart, Header, Popover, Select} from '../webcomponent';
import {Avatar, List, ListItem, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import useAxiosMethods from "../../hooks/useAxiosMethods";
import { useEffect, useState, useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable' ;
// import { co } from '@fullcalendar/core/internal-common';

const DashBoard = () => {
    const { get } = useAxiosMethods();
    const[interests,setInterests] = useState([]);
    const[userreq,setUserreq]=useState([]);
    const[user,setUser]=useState([]);
    const[listing,setListing]=useState([]);
    const[selectedOption,setSelectedOption]=useState("All");
    const[response2,setResponse2]=useState([]);

    const lineChartRef1 = useRef(null);

    useEffect(() => {
        get("/investors/interestSectors",setInterests);
    }, []);

    useEffect(() => {
        get("/user/getuserregistration",setResponse2);
    }, []);

    useEffect(() => {
        get("/entrepreneur/getalllistings",setListing);
    }, []);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
  
    const months = [];
    //last 6 months
    for (let i = 12; i > 0; i--) {
        const year = currentYear + Math.floor((currentMonth + i) / 12)-1;
        const monthIndex = (currentMonth + i) % 12;
        const monthName = new Date(currentYear, monthIndex).toLocaleString('default', { month: 'short' });
        months.push(`${monthName} ${year}`);
    }
    months.reverse();
    
    const completed=[];
    const Inprogress=[];

    listing.forEach(element => {
        if(element.status === "Completed"){
            completed.push(element);
        }else if(element.status === "In Progress"){
            Inprogress.push(element);
        }
    });

    const countCompleted=[];
    const countInprogress=[];

    months.forEach(month => {
        let count = 0;
        completed.forEach(element => {
            if(element.date === month){
                count++;
            }
        });
        countCompleted.push(count);  
    });

    months.forEach(month => {
        let count = 0;
        Inprogress.forEach(element => {
            if(element.date === month){
                count++;
            }
        });
        countInprogress.push(count);  
    });

    const registered=[];
    response2.forEach(element => {
        if(element.status === "APPROVED"){
            registered.push(element);
        }
    }); 

    useEffect(() => {
        if (selectedOption === "All") {
          setUser(registered);
        } else if (selectedOption === "Last 7 Days") {
          const data = registered.filter((user) => {
            const today = new Date();
            const last7Days = new Date(today.setDate(today.getDate() - 7));
            const userDate = new Date(user.registeredDate);
            return userDate > last7Days;
          });
          setUser(data);
        } else if (selectedOption === "Last Month") {
          const data = registered.filter((user) => {
            const today = new Date();
            const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
            const userDate = new Date(user.registeredDate);
            return userDate > lastMonth;
          });
          setUser(data);
        }
    }, [selectedOption, registered]);

    const handleSortByChange = (selectedOption) => {
        setSelectedOption(selectedOption); 
    };

    var FoodandBevarages = 0;
    var Technology = 0;
    var AppWebsite = 0;
    var Fitness = 0;
    var HealthWellnessNutrition = 0;
    var Sports = 0;
    var Beauty = 0;
    var ClothingFashion = 0;
    var ToysGames = 0;
    var EntertainmentExperiential = 0;
    var Pets = 0;
    var Music = 0;
    var Holiday = 0;
    var Children = 0;
    var HousewaresHomeDesign = 0;

    interests.forEach(element => {
        //convert amount to number
        element.amount = Number(element.amount);
        if(element.sectorName === "Food and Bevarages"){
            FoodandBevarages=FoodandBevarages+element.amount;
        }else if(element.sectorName === "Technology"){
            Technology=Technology+element.amount;
        }else if(element.sectorName === "App/Website"){
            AppWebsite=AppWebsite+element.amount;
        }else if(element.sectorName === "Fitness"){
            Fitness=Fitness+element.amount;
        }else if(element.sectorName === "Health/Wellness/Nutrition"){
            HealthWellnessNutrition=HealthWellnessNutrition+element.amount;
        }else if(element.sectorName === "Sports"){
            Sports=Sports+element.amount;
        }else if(element.sectorName === "Beauty"){
            Beauty=Beauty+element.amount;
        }else if(element.sectorName === "Clothing/Fashion"){
            ClothingFashion=ClothingFashion+element.amount;
        }else if(element.sectorName === "Toys/Games"){
            ToysGames=ToysGames+element.amount;
        }else if(element.sectorName === "Entertainment / Experiential"){
            EntertainmentExperiential=EntertainmentExperiential+element.amount;
        }else if(element.sectorName === "Pets"){
            Pets=Pets+element.amount;
        }else if(element.sectorName === "Music"){
            Music=Music+element.amount;
        }else if(element.sectorName === "Holiday"){
            Holiday=Holiday+element.amount;
        }else if(element.sectorName === "Children"){
            Children=Children+element.amount;
        }else if(element.sectorName === "Housewares / Home Design"){
            HousewaresHomeDesign=HousewaresHomeDesign+element.amount;
        }
    });

    let approvedInvestors = 0;
    let approvedEntrepreneurs = 0;
    let approvedCoAdmins = 0;

    user.forEach(element => {
        const userRole = element.userRole;
        if (userRole === "INDIVIDUAL_INVESTOR"||userRole === "ENTERPRISE_INVESTOR") {
            approvedInvestors++;
        } else if (userRole === "ENTREPRENEUR") {
            approvedEntrepreneurs++;
        } else if (userRole === "ADMIN") {
            approvedCoAdmins++;
        }
    });

    const areaChart = {
        chart1: {
            series: [
                {
                    name: "Category Interests", data: [FoodandBevarages,Technology,AppWebsite,Fitness,HealthWellnessNutrition,Sports,Beauty,ClothingFashion,ToysGames,EntertainmentExperiential,Pets,Music,Holiday,Children,HousewaresHomeDesign],
                    color: "#FFD668"
                }
            ],
            categories: ["Food and Bevarages", "Technology", "App/Website","Fitness","Health/Wellness/Nutrition","Sports","Beauty","Clothing/Fashion","Toys/Games","Entertainment / Experiential","Pets","Music","Holiday","Children","Housewares / Home Design"]
        },
        chart2: {
            series: [
                {
                    name: "Added", data:countInprogress, 
                    color: "#fdba8c"
                },
                {
                    name: "Completed", data:countCompleted, 
                    color: "#00e396"
                }
            ],
            categories: months
        }
    }

    const donutChart = {
        chart1: {
            label: "Total Users",
            series: [approvedInvestors, approvedEntrepreneurs, approvedCoAdmins],
            colors: ["#E186DD", "#FFD668", "#FF969C"],
            dataLabels: ["Investors", "Entrepreneur","Co-Admins"]
        }
    }


    const complains = [
        {
            name: "Bhasa Lanka",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Investor",
        },
        {
            name: "Chris Perera",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        },
        {
            name: "Wishwa Lanka",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Investor",
        },
        {
            name: "Pamith Welikala",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        },
        {
            name: "Nadeesha Epa",
            date: "10 August 2023",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            user: "Entrepreneur",
        }
    ]

    return (
        <Header active="Dashboard">
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem]">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                System Overview
                            </h5>
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            <div className="flex justify-between items-center">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"># Views</p>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                    <FontAwesomeIcon icon={faArrowUp} className="ml-1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AreaChart series={areaChart.chart1.series} categories={areaChart.chart1.categories}/>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-[1rem]">
                    <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    User Signups
                                </h5>
                            </div>
                        </div>
                        <DoughnutChart data={donutChart.chart1}/>
                        <div
                        className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                        <div className="flex justify-between items-center pt-5 w-full lg:w-[20rem]">
                            <Select
                                label="Sort By"
                                options={["All", "Last 7 Days", "Last Month"]}
                                color="purple"
                                onChange={handleSortByChange}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="w-full lg:w-[50%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    Listings
                                </h5>
                            </div>
                        </div>
                        <AreaChart series={areaChart.chart2.series} categories={areaChart.chart2.categories} colors={areaChart.chart2.colors}/>
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-[1rem]">
                    <div className="w-full lg:w-[65%] bg-white rounded-lg border-[1px] p-4 md:p-6">
                        <div className="flex flex-col gap-[2rem]">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                                        Complains
                                    </h5>
                                </div>
                                <div>
                                    <Button
                                        variant="clear"
                                        className="px-[0.75rem] !border-none"
                                    >
                                        <Link to="/admin/view-complains">
                                            View All
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    complains.map((complain, index) => (
                                        <div key={index}
                                             className="flex items-center py-[1rem] border-b-[1px] justify-between">
                                            <div className="flex items-center gap-4  w-[50%]">
                                                <Avatar
                                                    src={complain.image}
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <Typography variant="h6">{complain.name}</Typography>
                                                    <Typography variant="small" color="gray"
                                                                className="font-normal hidden lg:block">
                                                        {complain.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <span
                                                className={`hidden lg:inline-flex justify-center items-center p-2 text-sm ${complain.user === "Entrepreneur" ? "text-label-purple-dark bg-label-purple-light" : "text-label-green-dark bg-label-green-light"} rounded-lg w-[20%] `}>{complain.user}</span>
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
                                        View Schedule
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[1rem]">
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                    August 2023
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </div>
                                <div className="flex justify-center items-center gap-[1rem]">
                                    <Calendar/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default DashBoard


