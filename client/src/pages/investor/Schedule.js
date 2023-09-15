import {Header, Button, Input , Calendar} from "../webcomponent";
import React, { useRef, useState } from 'react';
import  FullCalendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from "react-modal";
import axios from '../../api/axios';


function Schedules() {
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (eventTitle && startDate && endDate) {
            const newEvent = {
                title: eventTitle,
                start: startDate,
                end: endDate,
            };
            setEvents([...events, newEvent]);

            // Clear the form
            setEventTitle('');
            setStartDate('');
            setEndDate('');

            //Sent event to controller
            axios.post("/events", newEvent)

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
                        type="datetime-local"
                        placeholder="Start Date"
                        label = "start date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}

                    />
                    <Input
                        // add custom calendar here
                        type="datetime-local"
                        placeholder="End Date"
                        label="End date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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





