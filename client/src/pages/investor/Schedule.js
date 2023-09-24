import {Header, Button, Input , Calendar} from "../webcomponent";
import React, {useEffect, useRef, useState} from 'react';
import  FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";
import axios from '../../api/axios';
import useAxiosMethods from "../../hooks/useAxiosMethods";
import useAuth from "../../hooks/useAuth";



function Schedules() {
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [Date, setDate] = useState('');
    const [Time, setTime] = useState('');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [response, setResponse] = useState(null);
    const {auth} = useAuth();
    const id = auth.id;
    const {post,get} = useAxiosMethods();
    useEffect(()=>{
        get(`schedule/list/${id}`,setResponse);
    },[] )
    console.log(response)




    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (eventTitle && Date && Time) {
            const newEvent = {
                title: eventTitle,
                date: Date,
                time: Time,
                investorId:id

                
            };
            setEvents([...events, newEvent]);

            setEventTitle('');
            setDate('');
            setTime('');

           console.log(newEvent);

            //Sent event to controller
           post(`/schedule/add/${newEvent.investorId}`, newEvent, setResponse);
           console.log(response);
           console.log(newEvent);

            // Hide the form after submission
            setShowAddEventForm(false);
        }
    };

    const handleDateClick = () => {
        // Show the Add Event form when a date is clicked
        setShowAddEventForm(true);
    };

    const handleEventClick = (info) => {
        // Handle event click here, e.g., show event details
        alert(`Event clicked: ${info.event.title}`);
        // When an event is clicked, set the selected event state
    };


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
                    eventClick={handleEventClick}
                />
            </div>
            </Header>
        </div>
    );
}


export default Schedules;





