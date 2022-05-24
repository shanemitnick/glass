import SmartLightRoom from './smartLightRoom.js'
import React, { useState, useEffect } from "react";
import '../../../styles/smartLightBlock.css';

// Contains all the rooms in the house
function SmartLightHome({homeName, rooms, stateChanger, handleToggle}) {

    console.log(homeName)

    return (<div> 
                {Object.keys(rooms).map((room) => (
                  <div className='room'>   
                    <SmartLightRoom key={room} room={rooms[room].products} stateChanger={stateChanger} handleToggle={handleToggle}
                    />
                  </div>
                ))}
            </div>)
  }

export default SmartLightHome