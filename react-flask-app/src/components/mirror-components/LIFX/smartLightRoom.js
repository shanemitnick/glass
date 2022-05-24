import SmartLight from './smartLight.js'
import React, { useState, useEffect } from "react";
import '../../../styles/smartLightBlock.css';

// Contains all the products in the room
function SmartLightRoom({room, stateChanger, handleToggle}) {

    return <div> 
            {Object.keys(room).map((light) => (
                <div className='light' key={light}> 
                    <SmartLight light={room[light]} stateChanger={stateChanger} handleToggle={handleToggle} />
                </div>
            ))}
    </div>
  }

export default SmartLightRoom