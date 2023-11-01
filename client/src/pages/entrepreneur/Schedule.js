import {Button, Header} from "../webcomponent";
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
    TimelineBody, List,
} from "@material-tailwind/react";
import {UserIcon,ClockIcon, CalendarIcon } from "@heroicons/react/24/solid";


function Schedule() {
    const [events, setEvents] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [schedules,setSchedules]=useState([]);
    const {auth} = useAuth();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const {get} = useAxiosMethods();

    const enterpreneur=auth.id;

    const handleEventClick = (info) => {
        //select the event from schedule array
        const event = schedules.filter((schedule) => schedule.date === info.event.startStr);
        setSelectedEvent(event[0]);
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
                title: schedule.title,
                start: schedule.date,
                investor: schedule.investor               
            })
        })
        setEvents(temp);
    },[schedules] )
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
    const handleVideoCAll = () =>{
        const conferenceWindow = window.open(
            '/meeting/01/entrepreneur/' + new Date().toISOString(),
            '_blank'
        );
        if (conferenceWindow) {
            localStorage.setItem('meetngInProgress', 'true');
            conferenceWindow.focus();
        }
    }

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
                                    Sheduling Details-{selectedEvent.title}
                                </Typography>
                                <Typography color="gray" className="font-normal text-gray-600">
                                   {selectedEvent.date}
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
                                                Investor Name
                                            </Typography>
                                        </TimelineHeader>
                                        <TimelineBody className="pb-2">
                                            <Typography color="gary" className="font-normal text-gray-600">
                                            {selectedEvent.investorName}
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
            )}
        </Header>
        </div>
    );
}
export default Schedule;


// function Schedule() {
//
//     return (
//         <div>
//             <Header active="Schedules">
//             <FullCalendar
//                 plugins={[ dayGridPlugin ]}
//                 initialView="dayGridMonth"
//                 events={[
//                     { title: 'Meeting with Kamal', date: '2023-08-12' ,color: '#8458B3' },
//                     { title: 'Meeting with Nimal', date: '2023-08-12'  ,color: '#8458B3' },
//                     { title: 'Meeting with Kamal', date: '2023-08-11' ,color: '#8458B3' },
//                     { title: 'Meeting with Nimal', date: '2023-08-11'  ,color: '#8458B3' },
//                     { title: 'Meeting with Kamal', date: '2023-08-13' ,color: '#8458B3' },
//                     { title: 'Meeting with Nimal', date: '2023-08-13'  ,color: '#8458B3' },
//                     { title: 'Meeting with Kamal', date: '2023-08-14' ,color: '#8458B3' },
//                     { title: 'Meeting with Nimal', date: '2023-08-14'  ,color: '#8458B3' }
//                   ]}
//             />
//             </Header>
//         </div>
//
//
//     );
//
// }