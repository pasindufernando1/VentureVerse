import {Header} from "../webcomponent";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, {useState} from "react";


function Schedule() {
    const [events, setEvents] = useState([]);
    const [eventTitle, setEventTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showAddEventForm, setShowAddEventForm] = useState(false);

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

            // Hide the form after submission
            setShowAddEventForm(false);
        }
    };

    const handleDateClick = () => {
        // Show the Add Event form when a date is clicked
        console.log("clicked");
        setShowAddEventForm(true);
    };

    return (
        <div>
            <Header active="Schedules">
                <h1>My Calendar</h1>

                {/* Add Event Form */}
                {showAddEventForm && (
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button type="submit">Add Event</button>
                    </form>
                )}

                {/* FullCalendar */}
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        dateClick={()=>handleDateClick}
                    />
                </div>
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
//     );
//
// }