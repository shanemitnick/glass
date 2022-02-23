import React, { useEffect, useState } from "react";
import '../../styles/calendarBlock.css';
// import CalendarItem from "./calendarItem.js"

function CalendarBlock() {
  const [calendar, getCalendar] = useState({});
  const [gotData,  setGotData] = useState(false);

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
      //refreshes the data in the component every 3,600,000 ms (aka 1 hour)
      const intervalID = setInterval(() => {
        setGotData(false);
        }, 3600000)
        return () => clearInterval(intervalID);

  });



  return (<div className="calendar-container">
              {!gotData ?
                  <div> Loading </div> :
                  <div className='schedule-container'>
                  <div className='upcoming'> Upcoming Events </div>
                    {Object.keys(calendar.items).map((event) => (
                        <div className='events' key={event}>
                            <div className='event-details'>
                                <div className='event-date'> {(() => {
                                    if ('dateTime' in calendar.items[event].start) {
                                      return (
                                        String(calendar.items[event].start.dateTime).slice(5,10)
                                      )
                                    } else if ('date' in calendar.items[event].start) {
                                      return (
                                        String(calendar.items[event].start.date).slice(5,10)
                                      )
                                    } else {
                                      return (
                                        'Error'
                                      )
                                    }
                                  })()}
                                </div>
                                <div className='event-name'> {String(calendar.items[event].summary)} </div>
                                <div className='time'>
                                {(() => {
                                    if ('dateTime' in calendar.items[event].start) {
                                      return (
                                        String(calendar.items[event].start.dateTime).slice(11,16) + ' - ' + String(calendar.items[event].end.dateTime).slice(11, 16)
                                      )
                                    } else if ('date' in calendar.items[event].start) {
                                      return (
                                        'All Day'
                                      )
                                    } else {
                                      return (
                                        'Error'
                                      )
                                    }
                                  })()}
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
              }
           </div>)
 }

export default CalendarBlock

