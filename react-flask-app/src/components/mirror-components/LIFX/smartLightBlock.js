import React, { useState, useEffect } from "react";
import '../../../styles/smartLightBlock.css';
import SmartLightHome from "./smartLightHome.js";


function SmartLightBlock() {
    const [homes, setHomes] = useState({});
    const [gotData, setGotData] = useState(false);
    
    useEffect(() => {
   
      if (!gotData) {
        fetch('/api/lifx/blueprint', {method: 'POST',
                                     headers: {"Content-Type": "application/json"},
                                        // , "Content-Type": "application/x-www-form-urlencoded"}
                                     body: JSON.stringify({'user_id': 1})}
  
        ).then(res => res.json()).then(data => {
          console.log(data)
          setHomes(data['homes'])
          setGotData(true)
      });
    }
  
  });
  
  
  const handleToggle = (id, isOn) => {
    console.log("TOGGLE HANDLED BITCH");
    const toggle = (isOn) ? 
      'off':
      'on'
  
    fetch('/api/lifx/power', {method: 'POST',
                              headers: {"Content-Type": "application/json"},
                              body: JSON.stringify({'id': id,
                                                    'toggle': toggle,
                                                    'level': 'product'})}
    ).then(res => res.json()).then(data => {
        // console.log(data)
        // console.log(light)
        // console.log(house)
        const location = data.location
        const room = data.room
        const product = data.prod
        const power = data.power
  
  
          setHomes({...homes, 
            [location]: {
            ...homes[location], 
            'rooms': {
              ...homes[location]['rooms'],
              [room]: {
                ...homes[location]['rooms'][room],
                'products': {
                  ...homes[location]['rooms'][room]['products'],
                  [product]: {
                    ...homes[location]['rooms'][room]['products'][product],
                    'power': power
                  }
                }
              }
            }
  
          }})
          console.log(power)
          // prevState[data.location]['rooms'][data.room]['products'][data.prod]['power'] = 'on';
          const isOn = (power === 'on') ? 
            true:
            false
          console.log(isOn)
  
        console.log('Should be updated')
        console.log(homes)

    });
  }
  
  
  return (<div>
              {!gotData ?
                  <div> Loading </div> : 
                  <div className='smart-lights'>
                  {Object.keys(homes).map((home) => (
                      <div className='house' key={home}>
                          <SmartLightHome
                           homeName={home}
                           rooms={homes[home].rooms}
                           stateChanger={setHomes}
                           handleToggle={handleToggle}
                           />
                      </div>)
                  )}
              </div>
              }
          </div>
          
  );
  }
  
  export default SmartLightBlock
  