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
    TimelineBody,
} from "@material-tailwind/react";
import {UserIcon,ClockIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { useParams } from 'react-router-dom';

function Schedules() {
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [schedules,setSchedules]=useState([]);
    const [response, setResponse] = useState(null);
    const {auth} = useAuth();
    const investorid = auth.id;
    const {post,get} = useAxiosMethods();

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
                date: Date,
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
        const event = schedules.filter((schedule) => schedule.date === info.event.startStr);
        setSelectedEvent(event[0]);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <Header>
            {/* Add Event Form */}
            {showAddEventForm && (
                <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
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
                        value={Date}
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
            {showPopup && selectedEvent &&(
            <div className="popup-modal">
                <div className="popup-content">
                    <Card className="mt-6 w-200">
                            <div className="close-icon" onClick={closePopup}>
                                        X
                            </div>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray">
                                    Sheduling Details-{selectedEvent.title}
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
                                                Entrepreneur Name
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-2">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                            {selectedEvent.entrepreneurName}
                                            </Typography>
                                        </TimelineBody>
                                    </TimelineItem>
                                        <TimelineItem>
                                        <TimelineConnector />
                                        <TimelineHeader>
                                            <TimelineIcon className="p-2">
                                            <CalendarIcon className="h-4 w-4" />
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
                                            <TimelineIcon className="p-2">
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
                            </CardBody>
                    </Card>
                </div>    
            </div>
            )}
        </Header>
        </div>
    );
}
export default Schedules;





