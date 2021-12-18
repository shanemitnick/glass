import React, { useState } from "react";
import {withRouter} from 'react-router-dom';
import './styles/Mirror.css';
import NewsBlock from './components/newsBlock.js';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import CalendarBlock from './components/calendarBlock.js';
import GreetingBlock from './components/greetingBlock.js';




const Mirror = () => {

  return(
              <div className="mirror-contatiner">

                  <div className="top-row">
                    <div className="top-left-element">
                        <WeatherBlock />
                    </div>

                    <div className="top-center-element">
                        <GreetingBlock />
                    </div>

                    <div className="top-right-element">
                         <TimeBlock />
                    </div>

                  </div>

                  <div className='bottom-row'>
                    <div className="bottom-left-element">
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
