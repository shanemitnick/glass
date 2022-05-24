import Switch from '../../website-components/switch.js'
import React, { useState, useEffect } from "react";
import '../../../styles/smartLightBlock.css';

// Individual smart light
function SmartLight({light, stateChanger, handleToggle}) {

    // console.log(house)
    console.log(light)
    const isOn = (light.power === 'on')
  
    return (<div className='product'>
              <div className='switch'>
                    {/* <button type="button" onClick={() => handleToggle(light.id, light.power)}></button> */}
                    <Switch isOn={isOn} handleToggle={() => handleToggle(light.id, isOn)} onColor="#FFFFFF"/>
              </div>
                        
              <div className='product-info'> 
                  {light.label}
                  
              </div> 
            </div>)
    }

export default SmartLight