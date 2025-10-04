import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './calender.css'

function SchoolCalender() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    // Handle date selection
    const handleDateChange = (newDate) => {
        setDate(newDate);

        // Ask user for event title (you can replace this with a modal/form)
        const title = prompt("Enter event title for " + newDate.toDateString());
        if (title) {
            setEvents([...events, { date: newDate, title }]);
        }
    };

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={date}
                className='calendar'
                tileContent={({ date, view }) => {
                    if (view === "month") {
                        const event = events.find(
                            (e) => e.date.toDateString() === date.toDateString()
                        );
                        return event ? (
                            <div className="event-dot" title={event.title}></div>
                        ) : null;
                    }
                }}
            />
        </div>
    );
}

export default SchoolCalender;