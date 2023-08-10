import React, {useState} from "react";

const CustomCalendar = () => {

    const week = [0, 1, 2, 3, 4];
    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const dates = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, null, null, null];

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

    const value = {
        1: ["Meeting at 10:00", "11:00", "12:00"],
        2: ["10:00", "11:00", "12:00"],
        3: ["10:00", "11:00", "12:00"],
        4: ["10:00", "11:00", "12:00"],
        6: ["Meeting at 10:00", "11:00", "12:00"],
        7: ["Meeting at 10:00", "11:00", "12:00"],
    }

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
                                    <td key={index}
                                        className="text-center w-[4rem] h-[4rem] cursor-pointer relative">
                                        <div
                                            className={`inline-flex items-center justify-center w-[3rem] h-[3rem] ${date ? "hover:bg-main-purple hover:text-white hover:rounded-[100%]" : ""}`}
                                            onMouseEnter={() => setToggle({state: true, id: (week * 7) + index})}
                                            onMouseLeave={() => setToggle({state: false, id: (week * 7) + index})}>
                                            {date}
                                        </div>
                                        <Schedule id={(week * 7) + index}>{value[(week * 7) + index]}</Schedule>
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