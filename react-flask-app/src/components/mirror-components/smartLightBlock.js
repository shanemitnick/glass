import React, { useState, useEffect } from "react";
import '../../styles/smartLightBlock.css';
// import SmartLightHome from './smartLight.js'
import Switch from '../website-components/switch.js'



function SmartLightBlock() {
  const [home, setHome] = useState({});
  // const [light1, setLight1] = useState();
  const [gotData, setGotData] = useState(false);



  useEffect(() => {
 
    if (!gotData) {
      fetch('/api/lifx/blueprint', {method: 'POST',
                                   headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                                   body: JSON.stringify({'user_id': 1})}

      ).then(res => res.json()).then(data => {
        setHome(data['homes'])
        // setLight1(home['Apartment']['rooms'][data.room]['products'][data.prod].power)
        setGotData(true)
    });
  }

});

// const handleToggle = (id, isOn) => {
//   console.log("TOGGLE HANDLED BITCH");
//   console.log(id)
//   console.log(isOn)
//   fetch('/api/lifx/power', {method: 'POST',
//                             headers: {"Content-Type": "application/json"},
//                             body: JSON.stringify({'id': id,
//                                                   'isOn': isOn,
//                                                   'level': 'product'})}
//   ).then(res => res.json()).then(data => {
//       console.log(data.power)
//       console.log(light1)
//       {data.power === 'on' ? 
//           setLight1('off') : 
//           setLight1('on')
//   }
//       console.log(light1)

//       // home['homes'][data.location]['rooms'][data.room]['products'][data.prod].power = isOn
//       // console.log(home)
//       // setHome({...homes, data.location: {...homes[data.location],  
//       // }}
//       //   rooms: {...homes[data.rooms]}})


//     // 'homes' <location> 'rooms' <room> 'products' <product> 'power'
//   });
// }


return (<div>
            {!gotData ?
                <div> Loading </div> : 
                <div className='smart-lights'>
                {Object.keys(home).map((h) => (
                    <div className='house' key={home}>
                        <SmartLightHome
                         home={h}
                         blueprint={home}
                         stateChanger={setHome}
                        //  light1={light1}
                        //  handleToggle={handleToggle}
                         />
                    </div>)
                )}
            </div>
            }
        </div>
        
);
}

export default SmartLightBlock



// Contains all the rooms in the house
function SmartLightHome({home, blueprint, stateChanger}) {
  const homeName = home;
  const roomBlueprint = blueprint[home].rooms;
  // console.log()

  return (<div> 
      
            <div> 
              {Object.keys(roomBlueprint).map((smartRoom) => (
                <div className='house'>   
                  <SmartLightRoom key={smartRoom} room={roomBlueprint[smartRoom].products} house={blueprint} stateChanger={stateChanger}
                  />
                </div>
              ))}
            </div>
          </div>)
}


// Contains all the products in the room
function SmartLightRoom({room, house, stateChanger}) {

  return <div> 
      <div>
          {Object.keys(room).map((light) => (
              <div className='room' key={light}> 
                  <SmartLight light={room[light]} house={house} stateChanger={stateChanger}
                  // handleToggle={handleToggle}
                  />
              </div>
          ))}
      </div>
  </div>
}



// Individual smart light
function SmartLight({light, house, stateChanger}) {
  // console.log(light)
  // console.log(house)

  const isOn = (light.power === 'on') ? 
    true:
    false

  // console.log(isOn)

  const handleToggle = (id, isOn) => {
    console.log("TOGGLE HANDLED BITCH");
    const toggle = (isOn) ? 
      'on':
      'off'

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

       
            // light.power = 'on' : 
            // light.power = 'off'
          //   stateChanger(prevHouse => ({...prevHouse, 
          //                               prevHouse[data.location] : {
          //                                 ...prevHouse[data.location],
          //                                 'rooms': {
          //                                   ...prevHouse[data.location]['rooms'],
          //                                   prevHouse[data.location]['rooms'][data.room] : {
          //                                     ...prevHouse[data.location]['rooms'][data.room],
          //                                     'products' : { 
          //                                       ...prevHouse[data.location]['rooms'][data.room]['products'],
          //                                       prevHouse[data.location]['rooms'][data.room]['products'][data.prod] : {
          //                                         ...prevHouse[data.location]['rooms'][data.room]['products'][data.prod],
          //                                         prevHouse[data.location]['rooms'][data.room]['products'][data.prod]['power']: 'on'}
          //                                     }
          //                                   }

          //                             }}})) :
          //   stateChanger(prevHouse => ({...prevHouse, [house[data.location]['rooms'][data.room]['products'][data.prod].power]: 'off'}))
          // }

          stateChanger({...house, 
            [location]: {
            ...house[location], 
            'rooms': {
              ...house[location]['rooms'],
              [room]: {
                ...house[location]['rooms'][room],
                'products': {
                  ...house[location]['rooms'][room]['products'],
                  [product]: {
                    ...house[location]['rooms'][room]['products'][product],
                    'power': [power] === 'on' ? 'off' : 'on'
                  }
                }
              }
            }

          }})
          // prevState[data.location]['rooms'][data.room]['products'][data.prod]['power'] = 'on';
          const isOn = ([power] === 'on') ? 
            true:
            false

        console.log('Should be updated')
        console.log(house)
        console.log(light) // Need to get this to reupdate after the house state gets updated
  
        // home['homes'][data.location]['rooms'][data.room]['products'][data.prod].power = isOn
        // console.log(home)
        // setHome({...homes, data.location: {...homes[data.location],  
        // }}
        //   rooms: {...homes[data.rooms]}})
    
      // 'homes' <location> 'rooms' <room> 'products' <product> 'power'
    });
  }
  

  return (<div> 
            
              <div className='product'>
                <div className='switch'>
                  {/* <button type="button" onClick={() => handleToggle(light.id, light.power)}></button> */}
                  <Switch isOn={isOn} handleToggle={() => handleToggle(light.id, isOn)} onColor="#GGGGGG"/>
                </div>
                      
                <div className='product-info'> 
                lamp
                
                </div> 
               </div> 
          </div>)
  }
