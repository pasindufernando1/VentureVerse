import {Header} from "../webcomponent";
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
import {UserIcon,CalculatorIcon } from "@heroicons/react/24/solid";


function Schedule() {
    const [events, setEvents] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [schedules,setSchedules]=useState([]);
    const {auth} = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const {get} = useAxiosMethods();

    const enterpreneur=auth.id;

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    useEffect(()=>{
        get(`schedule/listEntrepreneur/${enterpreneur}`,setSchedules);
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
    },[schedules] )

    return (
        <div>
            <Header>
            {/* FullCalendar */}
            <div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin  ]}
                    initialView="dayGridMonth"
                    events={events}
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
                                    Sheduling Details
                                </Typography>
                                <Typography color="gray" className="font-normal text-gray-600">
                                   {selectedEvent.startStr}
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
                                            Title
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-2">
                                        <Typography color="gary" className="font-normal text-gray-600">
                                        {selectedEvent.title}
                                        </Typography>
                                    </TimelineBody>
                                    </TimelineItem>
                                    <TimelineItem>
                                    <TimelineHeader>
                                        <TimelineIcon className="p-2">
                                        <CalculatorIcon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <Typography variant="h6" color="blue-gray">
                                         Date
                                        </Typography>
                                    </TimelineHeader>
                                    <TimelineBody>
                                        <Typography color="gary" className="font-normal text-gray-600">
                                         {selectedEvent.startStr}
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
export default Schedule;


