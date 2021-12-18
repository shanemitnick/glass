import React, { useState } from "react";
import './styles/Mirror.css';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import NewsBlock from './components/newsBlock.js';
import CalendarBlock from './components/calendarBlock.js';
import GreetingBlock from './components/greetingBlock.js';
import LoginButton from './components/login-button.js';
import LogoutButton from './components/logout-button.js';
import Profile from './components/profile.js';
import {withRouter} from 'react-router-dom';


const Mirror = () => {

  return(
              <div className="mirror-contatiner">

                  <div className="top-row">
                    <div className="top-left-element">
                        <WeatherBlock />
                    </div>

                    <div className="top-right-element">
                         <TimeBlock />
                    </div>
                  </div>

                  <div className='middle-row'>
                    <h1> Hi </h1>
                  </div>     

                  <div className='bottom-row'>
                    <div className='bottom-left-element'>
                          <NewsBlock />
                  </div>     

                  </div>

              </div>
            );
    }


export default withRouter(Mirror);



//
// <div className="bottom-left-element">
//   <CalendarBlock />
// </div>
//
// <div className = 'center-element'>
//     <GreetingBlock/>
// </div>
