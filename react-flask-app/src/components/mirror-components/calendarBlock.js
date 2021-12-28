import React, { useEffect, useState } from "react";
import '../../styles/calendarBlock.css';
// import CalendarItem from "./calendarItem.js"

function CalendarBlock() {
  let [calendar, getCalendar] = useState({});
  let [gotData,  setGotData] = useState(false);

  useEffect(() => {
      if (!gotData) {
      fetch('/calendar', {method: 'GET',
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
                  <div> Loaded </div>
                  }
              </div>)
              }

export default CalendarBlock

