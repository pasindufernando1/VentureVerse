import {Header} from "../webcomponent";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


function Schedule() {

    return (
        <div>
            <Header active="Schedules">
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Meeting with Kamal', date: '2023-08-12' ,color: '#8458B3' },
                    { title: 'Meeting with Nimal', date: '2023-08-12'  ,color: '#8458B3' },
                    { title: 'Meeting with Kamal', date: '2023-08-11' ,color: '#8458B3' },
                    { title: 'Meeting with Nimal', date: '2023-08-11'  ,color: '#8458B3' },
                    { title: 'Meeting with Kamal', date: '2023-08-13' ,color: '#8458B3' },
                    { title: 'Meeting with Nimal', date: '2023-08-13'  ,color: '#8458B3' },
                    { title: 'Meeting with Kamal', date: '2023-08-14' ,color: '#8458B3' },
                    { title: 'Meeting with Nimal', date: '2023-08-14'  ,color: '#8458B3' }
                  ]}
            />
            </Header>
        </div>


    );

}

export default Schedule;


