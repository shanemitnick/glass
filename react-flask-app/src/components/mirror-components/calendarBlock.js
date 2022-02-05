import React, { useEffect, useState } from "react";
import '../../styles/calendarBlock.css';
// import CalendarItem from "./calendarItem.js"

function CalendarBlock() {
  let [calendar, getCalendar] = useState({});
  let [gotData,  setGotData] = useState(false);

  useEffect(() => {
      if (!gotData) {
      fetch('/api/google/get_calendar', {method: 'GET',
                                         headers: {"Content-Type": "application/json"},
                                        // , "Content-Type": "application/x-www-form-urlencoded"}
                                           }
          ).then(res => res.json()
          ).then(data => {
              getCalendar(data);
              console.log(calendar);
              setGotData(true);
          });
      }
  });

  return (<div className="calendar-container"> 
              {!gotData ?
                  <div> Loading </div> :
                  <div className='schedule-container'>
                  <div className='upcoming'> Upcoming Events </div>
                    {Object.keys(calendar.items).map((event) => (
                        <div className='events' key={event}>
                            <div className='event-details'>
                                <div className='event-date'> {String(calendar.items[event].start.dateTime).slice(5,10)} </div>
                                <div className='event-name'> {calendar.items[event].summary} </div>
                                <div className='time'> {String(calendar.items[event].start.dateTime).slice(11,16)} - {String(calendar.items[event].end.dateTime).slice(11, 16)} </div>
                            </div>
                        </div>
                    ))}
                  </div>
              }
           </div>)
 }

export default CalendarBlock

