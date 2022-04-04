import Switch from '../website-components/switch.js'
import '../../styles/smartLightBlock.css';
import React, { useState } from "react";


// Contains all the rooms in the house
function SmartLightHome(props) {
    // const homeName = props.home;
    const roomBlueprint = props.blueprint[props.home].rooms;


    return (<div> 
        
              <div> 
                {Object.keys(roomBlueprint).map((room) => (
                  <div className='house'> 
                    <SmartLightRoom key={room} room={roomBlueprint[room].products}/>
                  </div>
                ))}
              </div>
            </div>)
}

export default SmartLightHome



// Contains all the products in the room
function SmartLightRoom(props) {
    const room = props.room;

    // const [smartRoom, setSmartRoom] = setState({})
    // const [gotData, setGotData] = useState(false);

    // useEffect(() => {
    //     console.log(props.room)
    //     setSmartRoom(props.room)
    //     setGotData(true)
    // })

    return <div> 
        <div>
            {Object.keys(room).map((light) => (
                <div className='room'> 
                    <SmartLight key={light} props={room[light]} />
                </div>
            ))}
        </div>
    </div>
}



// Individual smart light
function SmartLight(props) {
    console.log(props)
    const light = props.props;

    if (light.power === 'on') {
      setPower(true)
    } else {
      setPower(false)
    }

    console.log(power)

    console.log(light)
    const handleToggle = () => {
        console.log("TOGGLE HANDLED BITCH");
        fetch('/api/lifx/power', {method: 'POST',
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({'id': light.id,
                                                        'isOn': power,
                                                        'level': 'product'})}
        ).then(res => res.json()).then(data => {
            console.log(data)
            (light.power === 'on') ? 
                setPower(true) :
                setPower(false)
            console.log(isOn)
        });
    }
    {active === "USER" ? (
      <UserProfile props={data} />
    ) : active === "MIRROR" ? (
      <MirrorLayout props={data.mirror} />
    ) : null }
 

    return (<div> 
              
                <div className='product'>
                  <div className='switch'>
                    {/* <button type="button" onClick={handleToggle}></button> */}
                    <Switch isOn={power} handleToggle={handleToggle} onColor="#GGGGGG"/>
                  </div>
                        
                  <div className='product-info'> 
                  lamp
                  {console.log(light)}
                  </div> 
                 </div> 
            </div>)
    }
