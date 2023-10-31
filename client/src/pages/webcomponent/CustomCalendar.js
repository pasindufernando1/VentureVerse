import React, {useState} from "react";

const CustomCalendar = ({ month, year, value }) => {
    //get the current date in Sri Lanka
    const date = new Date(year, month, 1); 
    const firstDay= new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const week = [0, 1, 2, 3, 4];
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    
    //check the first day of the month and add null values to the array
    const dates = [];
    for (let i = 1; i < firstDay; i++) {
        dates.push(null);
    }

    //add the dates of the month to the array
    for (let i = 1; i <= lastDate; i++) {
        dates.push(i);
    }

    //check the last day of the month and add null values to the array
    for (let i = 1; i < 6 - new Date(year, month, lastDate).getDay(); i++) {
        dates.push(null);
    }


    const [toggle, setToggle] = useState({state: false, id: Infinity});

    const Schedule = (props) => {

        const {id, children} = props;

        if (!children) {
            return null;
        } else {
            return (
                <div id={id}
                     className={`${toggle.state && toggle.id === id ? "visible opacity-100" : "invisible opacity-0"} transition-opacity duration-300 absolute ${id % 7 === 0 ? "left-[90%]" : id % 7 === 6 ? "left-[10%]" : "left-[50%]"} translate-x-[-50%] translate-y-0 bg-white mt-2 border-[1px] rounded-lg p-[0.4rem] w-[10rem] z-[1000]`}>
                    {
                        children.map((child, index) => (
                            <p key={index}>{child}</p>
                        ))
                    }
                </div>
            );
        }
    }

    const currentDate = new Date();
    const isCurrentMonth =
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear();

    return (
        <div>
            <table className="w-auto">
                <thead>
                <tr>
                    {
                        days.map((day, index) => (
                            <th key={index} className="w-[4rem] h-[4rem]">
                                {day}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    week.map((week, index) => (
                        <tr key={index}>
                            {
                                dates.slice(week * 7, (week + 1) * 7).map((date, index) => (
                                    <td
                                        key={index}
                                        className={`text-center w-[3rem] h-[3rem] cursor-pointer relative ${
                                            isCurrentMonth && date === currentDate.getDate()
                                            ? 'bg-yellow-200 rounded-[100%]'
                                            : ''
                                        }`}
                                    >
                                        <div
                                            className={`inline-flex items-center justify-center w-[3rem] h-[3rem] ${date ? "hover:bg-main-purple hover:text-white hover:rounded-[100%]" : ""}`}
                                            onMouseEnter={() => setToggle({ state: true, id: date })} 
                                            onMouseLeave={() => setToggle({ state: false, id: date })}> 
                                            {date}
                                        </div>
                                        <Schedule id={date}>{value[date]}</Schedule> {/* Use date as the id */}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );

}

export default CustomCalendar;