import {Header, Button, Input} from "../webcomponent";
import React, {useEffect, useState} from 'react';
import  FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";
import {
    Card,
    CardBody,
    Typography,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody, ListItem, List,
} from "@material-tailwind/react";
import {UserIcon,ClockIcon, CalendarIcon } from "@heroicons/react/24/solid";
import {NavLink, useParams} from 'react-router-dom';
import {AiOutlineCloseCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import { Avatar } from "@material-tailwind/react";





function Schedules() {
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [schedules,setSchedules]=useState([]);
    const [response, setResponse] = useState(null);
    const {auth} = useAuth();
    const investorid = auth.id;
    const {post,get} = useAxiosMethods();

    const handleVideoCAll = () =>{
        const conferenceWindow = window.open(
            '/meeting/01/investor/' + new Date().toISOString(),
            '_blank'
        );
        if (conferenceWindow) {
            localStorage.setItem('meetngInProgress', 'true');
            conferenceWindow.focus();
        }
    }


    //get the id passed from the url
    var {entrepreneur} = useParams();
    
    if(entrepreneur){
        //convert the string to a number
        entrepreneur=parseInt(entrepreneur);
    }else{
        entrepreneur=null;
    }

    useEffect(()=>{
        get(`schedule/list/${investorid}`,setSchedules);
    },[] )

    //format the data to be used in the calendar
    useEffect(()=>{
        let temp = [];
        schedules.forEach((schedule)=>{
            temp.push({
                title: schedule.title+" at "+schedule.time,
                date: schedule.date,
                time: schedule.time
            })
        })
        setEvents(temp);
    },[schedules])
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (eventTitle && Date && Time) {
            const newEvent = {
                title: eventTitle,
                date: date,
                time: Time,
                investorId:{
                    id: investorid
                },
                entrepreneurId:{
                    id: entrepreneur
                }
            };
            setEvents([...events, newEvent]);
            setEventTitle('');
            setDate('');
            setTime('');
            //Sent event to controller
            console.log(newEvent);
            post(`/schedule/add/${newEvent.investorId.id}`, newEvent, setResponse);
            // Hide the form after submission
            setShowAddEventForm(false);
        }
    };

    const handleDateClick = () => {
        // Show the Add Event form when a date is clicked
        setShowAddEventForm(true);
    };

    const handleEventClick = (info) => {
        const event = schedules.filter((schedule) =>
            schedule.date === info.event.startStr && schedule.time === info.event.title.split(" ")[2]);
        setSelectedEvent(event[0]);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    }
    const closeAddEventForm = () => {
        setShowAddEventForm(false);
    }


    const checkTimeGap = (time) => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const meetingTime = time.split(':')

        console.log(currentHour,' ',currentMinute);
        console.log(meetingTime[0],' ',meetingTime[1])

        // 10 minutes in milliseconds
        const tenMinutes = 10 * 60 * 1000;

        let timeGap = currentMinute - Number(meetingTime[1])

        // If the time gap is less than 10 minutes, enable the button
        return currentHour === Number(meetingTime[0]) && timeGap <= tenMinutes;
    };



    return (
        <div>
            <Header>

            {/* Add Event Form */}
            {showAddEventForm && (
                <div className="popup-modal">
                    <div className="popup-content">
                <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
                    <div className="flex justify-end">
                    <div className="close-icon" onClick={closeAddEventForm}>
                        <AiOutlineCloseCircle/>
                    </div>
                    </div>
                    <div className="mb-4 flex flex-col gap-6">
                        <h1>Add an Event</h1>
                    <Input
                        type="text"
                        label = "Event Title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Date"
                        label = "date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        // add custom calendar here
                        type="time"
                        placeholder="Time"
                        label="Time"
                        value={Time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    </div>
                    <Button type="submit">Add Event</Button>


                </form>
        </div>
                </div>


            )}

            {/* FullCalendar */}
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin  ]}
                    initialView="dayGridMonth"
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={(eventInfo) => handleEventClick(eventInfo)}
                    eventBackgroundColor="#7339a1"
                    eventBorderColor="#7339a1"
                    eventContent={(eventInfo) => (
                        <div style={{ whiteSpace: 'normal' }}>
                          {eventInfo.event.title}
                        </div>
                    )}
                />
            </div>

        </Header>
            {showPopup && selectedEvent &&(
                <div className="justify-center flex w-full">
                <div className="popup-modal ">
                    <div className="popup-content">
                        <Card className="mt-6 w-200">
                            <div className="flex justify-end">
                                <div className="close-icon" onClick={closePopup}>
                                    <AiOutlineCloseCircle/>
                                </div>
                            </div>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray">
                                    Scheduling Details-{selectedEvent.title}
                                </Typography>
                            </CardBody>
                            <CardBody className="flex items-start">
                                <div className="w-[32rem]">
                                    <Timeline>
                                        <TimelineItem>
                                            <TimelineConnector />
                                            <TimelineHeader>
                                                <TimelineIcon className="p-2 bg-main-purple">
                                                    <UserIcon className="h-4 w-4" />
                                                </TimelineIcon>
                                                <Typography variant="h6" color="blue-gray">
                                                    Entrepreneur Name
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody className="pb-2 mai">
                                                <Typography color="gary" className="font-normal text-gray-600">
                                                    {selectedEvent.entrepreneurName}
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineConnector />
                                            <TimelineHeader>
                                                <TimelineIcon className="p-2 bg-main-purple">
                                                    <CalendarIcon className="h-4 w-4 bg-main-purple" />
                                                </TimelineIcon>
                                                <Typography variant="h6" color="blue-gray">
                                                    Date
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody>
                                                <Typography color="gary" className="font-normal text-gray-600">
                                                    {selectedEvent.date}
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineHeader>
                                                <TimelineIcon className="p-2 bg-main-purple">
                                                    <ClockIcon className="h-4 w-4" />
                                                </TimelineIcon>
                                                <Typography variant="h6" color="blue-gray">
                                                    Time
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody>
                                                <Typography color="gary" className="font-normal text-gray-600">
                                                    {selectedEvent.time}
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                    </Timeline>
                                </div>
                                <a href="#" className="text-initial">
                                    <List>
                                        <a href="#" className="text-initial">
                                            <listItem onClick={checkTimeGap(selectedEvent.time) ? null : handleVideoCAll} >
                                                <Button disabled={!checkTimeGap(selectedEvent.time)} onClick={handleVideoCAll}>Start now</Button>
                                            </listItem>
                                        </a>
                                    </List>
                                </a>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                    </div>
            )}
        </div>


    );
}
export default Schedules;





