import React, { useEffect, useState } from "react";
import '../../styles/distanceBlock.css';

function DistanceBlock() {
  let [distance, getDistance] = useState({});
  let [gotData,  setGotData] = useState(false);

  useEffect(() => {
      if (!gotData) {
      fetch('/api/distance', {method: 'POST',
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify({"origin": "480 Massachusetts Ave, Boston, MA",
                                                          "destination": "1 Federal Street, Boston, MA",
                                                          "travelMode": "driving",
                                                        //   "startTime": "8:00", // only valid for 'driving' travel mode
                                                          "distanceUnit": "mi"})        
                        // , "Content-Type": "application/x-www-form-urlencoded"}
                             }
          ).then(res => res.json()
          ).then(data => {
              getDistance(data);
              console.log(data);
              setGotData(true);
          });
      }
  });

  return (<div className="distnace-block"> 
              {!gotData ?
                  <div> Loading </div> : 
                  <div> Loaded </div>
                  }
              </div>)
              }

export default DistanceBlock

