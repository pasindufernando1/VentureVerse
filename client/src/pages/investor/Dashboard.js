import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {AreaChart, Button, Calendar, Header, Popover} from "../webcomponent";
import {Avatar, List, ListItem, Typography} from "@material-tailwind/react";


const DashBoard = () => {
    const series = [{
        name: "Views", data: [4, 2, 1, 4, 5, 6], color: "#1a56db",
    }, {
        name: "Interested", data: [0, 2, 0, 3, 1, 5], color: "#fdba8c",
    },]

    const interestedInvestors = [{
        name: "Bhasa Lanka",
        date: "10 August 2023",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        counter: true
    }, {
        name: "Chris Perera",
        date: "10 August 2023",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        counter: false
    }, {
        name: "Wishwa Lanka",
        date: "10 August 2023",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        counter: true
    }, {
        name: "Pamith Welikala",
        date: "10 August 2023",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        counter: false
    }, {
        name: "Nadeesha Epa",
        date: "10 August 2023",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
        counter: false
    }]

    const categories = ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February']

    return (
        <Header active="Dashboard">
            <div className="flex flex-col gap-[1rem] flex-wrap lg:flex-nowrap">
                <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                    <div className="flex flex-col gap-[0.2rem]">
                        <div>
                            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                Listing Name
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
                            <div className="flex justify-between items-center">
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400"># Interests</p>
                                <div
                                    className="flex items-center px-2.5 py-0.5 text-base font-semibold text-red-500 dark:text-red-500 text-center">
                                    3%
                                    <FontAwesomeIcon icon={faArrowDown} className="ml-1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AreaChart series={series} categories={categories}/>
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
                <div className="flex flex-col lg:flex-row gap-[1rem]">
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
                                        View All
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    interestedInvestors.map((investor, index) => (
                                        <div key={index}
                                             className="flex items-center py-[1rem] border-b-[1px] justify-between">
                                            <div className="flex items-center gap-4  w-[25%]">
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
                                                className={`inline-flex justify-center items-center p-2 text-sm ${investor.counter ? "text-label-purple-dark bg-label-purple-light" : "text-label-green-dark bg-label-green-light"} rounded-lg w-[10%] `}>{investor.counter ? "Counter" : "Interested"}</span>
                                            <Button
                                                variant="clear"
                                                className="px-[0.75rem] py-[0.1rem] !border-none"
                                                icon={"next"}
                                            >
                                                View All
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


