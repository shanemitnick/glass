import React, { useState, useEffect } from "react";
import '../../styles/smartLightBlock.css';
// import SmartLightHome from './smartLight.js'
import Switch from '../website-components/switch.js'



function SmartLightBlock() {
  // const [lights, setLights] = useState({0: {'childIds': [1], 'id': '', 'level': 'Account', 'name': 'lifxAccount'}, 1: {'level': 'house', 'id': '8996c82053e4cba04e9c02f6b3696688', 'name': 'Apartment', 'childIds': [2]}, 2: {'level': 'room', 'id': 'dc765bf28c7794b99a71c7eb1098d78d', 'name': 'Bedroom', 'childIds': [3]}, 3: {'level': 'product', 'id': 'd073d5611e59', 'name': 'Standing Lamp', 'power': 'on', 'childIds': []}});
  const [lights, setLights] = useState({});
  const [gotData, setGotData] = useState(false);

 
  useEffect(() => {
      fetch('/api/lifx/blueprint', {method: 'POST',
                                   headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                                   body: JSON.stringify({'user_id': 1})}

      ).then(res => res.json()).then(data => {
        console.log(data);
        setLights(data);
        setGotData(true)
    });
  });
  
  if (gotData) {
    console.log(lights)
    const root = lights[0];
    console.log(root)
    // const homes = root.childIds;
    // console.log(homes);
  }

 
  const handleToggle = (id, isOn) => {
    console.log("TOGGLE HANDLED BITCH");
    console.log(id)
    console.log(isOn)

    const light = lights[id]


    fetch('/api/lifx/power', {method: 'POST',
                              headers: {"Content-Type": "application/json"},
                              body: JSON.stringify({'id': id,
                                                    'isOn': isOn,
                                                    'level': 'product'})}
    ).then(res => res.json()).then(data => {
      console.log(data)
      console.log(data.power)
      

      const isOn = (data.power === 'on') ? 
          'off' : 
          'on'

      const prevLights = lights
      lights[id].power = isOn
      setLights(lights)

     


        // console.log(isOn)
        // setLights({...lights, light.id: {
        //                           light.id,
        //                           power: data.power}
        //                           )
      console.log(lights)

    });
  }


return (<div>
            {!gotData ?
                <div> Loading </div> : 
                <div className='smart-lights'>
{/* 
                {homes.map(home => (
                    <div className='house' key={home}> 
                      <SmartLightHome lights={lights} parentId={0} id={home} handleToggle={handleToggle} />
                    </div>

                ))

                } */}

                 {/* {Object.keys(homes['homes']).map((home) => (
                    <div className='house' key={home}>
                        <SmartLightHome
                         home={home}
                         blueprint={homes['homes'][home]}
                         handleToggle={handleToggle} /> */}
                    {/* </div>) */}
                  {/* )} */}
                </div>
            }
        </div>
        
);
}

export default SmartLightBlock






// Contains all the rooms in the house
function SmartLightHome({lights, parentId, id, handleToggle}) {

  
  const homeName = lights[id].name;
  const rooms = lights[id].childIds;

  return (<div> 
      
            <div> 
              {rooms.map((room) => (
                <div className='house' key={homeName}> 
                  <SmartLightRoom lights={lights} parentId={id} id={room} handleToggle={handleToggle}/>
                </div>
              ))}
            </div>
          </div>)
}


// Contains all the products in the room
function SmartLightRoom({lights, parentId, id, handleToggle}) {
  
  console.log('TESTING HERE')
  console.log(lights)

  const homeName = lights[parentId].name;
  const roomName = lights[id].name;
  const products = lights[id].childIds;

  return <div> 
      <div>
          {products.map((light) => (
              <div className='room' key={roomName}> 
                <SmartLight lights={lights} parentId={id} id={light} handleToggle={handleToggle}/>
              </div>
          ))}
      </div>
  </div>
}



// Individual smart light
function SmartLight({lights, parentId, id, handleToggle}) {

  const roomName = lights[parentId].name;
  const lightName = lights[id].name;
  const light = lights[id];
  console.log(light)

  const isOn = (light.power === 'on') ? 
    true:
    false
  
  console.log(isOn)

  return (<div> 
            
              <div className='product'>
                <div className='switch'>
                  <button type="button" onClick={() => handleToggle(id, isOn)}></button>
                  {/* <Switch isOn={isOn} handleToggle={() => handleToggle(light.id, isOn)} onColor="#GGGGGG"/> */}
                </div>
                      
                <div className='product-info'> 
                lamp
                
                </div> 
               </div> 
          </div>)
  }




// // Contains all the rooms in the house
// function SmartLightHome({home, blueprint, handleToggle}) {

//   const homeName = home;
//   const rooms = blueprint.rooms;

//   return (<div> 
      
//             <div> 
//               {Object.keys(rooms).map((room) => (
//                 <div className='house' key={home}> 
//                   <SmartLightRoom room={rooms[room].products} handleToggle={handleToggle}/>
//                 </div>
//               ))}
//             </div>
//           </div>)
// }


// // Contains all the products in the room
// function SmartLightRoom({room, handleToggle}) {

//   return <div> 
//       <div>
//           {Object.keys(room).map((light) => (
//               <div className='room' key={light}> 
//                   <SmartLight light={room[light]} handleToggle={handleToggle}/>
//               </div>
//           ))}
//       </div>
//   </div>
// }



// // Individual smart light
// function SmartLight({light, handleToggle}) {
//   console.log(light)

//   const isOn = (light.power === 'on') ? 
//     true:
//     false
  

//   console.log(isOn)

//   return (<div> 
            
//               <div className='product'>
//                 <div className='switch'>
//                   <button type="button" onClick={() => handleToggle(light.id, isOn)}></button>
//                   {/* <Switch isOn={isOn} handleToggle={() => handleToggle(light.id, isOn)} onColor="#GGGGGG"/> */}
//                 </div>
                      
//                 <div className='product-info'> 
//                 lamp
                
//                 </div> 
//                </div> 
//           </div>)
//   }
