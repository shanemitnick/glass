import React, { useEffect, useState } from "react";
import '../../styles/calendarBlock.css';
// import CalendarItem from "./calendarItem.js"

function DistanceBlock() {
  let [calendar, getCalendar] = useState({});
  let [gotData,  setGotData] = useState(false);

  useEffect(() => {
      if (!gotData) {
      fetch('/calculate-distance', {method: 'POST',
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify({"origin": "480 Massachusetts Ave, Boston, MA",
                                                          "destination": "1 Federal Street, Boston, MA",
                                                          "travelMode": "driving",
                                                        //   "startTime": "8:00",
                                                          "distanceUnit": "mi"})        
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

export default DistanceBlock

