import React from "react";
import './../styles/calendarBlock.css';
import CalendarItem from "./calendarItem.js"

class CalendarBlock extends React.Component {



  render() {

    const data = {
      summary: "Doctor Appointment",
      startTime: "2:00PM",
      endTime: "4:00PM"};


    return (
      <div className='calendar-container'>
        <h1> {data.summary}</h1>
        <CalendarItem />
      </div>

  )}
}

export default CalendarBlock;
