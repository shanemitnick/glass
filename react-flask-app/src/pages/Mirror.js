import React from "react";
import {withRouter} from 'react-router-dom';
import '../styles/Mirror.css';
import NewsBlock from '../components/mirror-components/newsBlock.js';
import TimeBlock from '../components/mirror-components/timeBlock.js';
import WeatherBlock from '../components/mirror-components/weatherBlock.js';
import GreetingBlock from '../components/mirror-components/greetingBlock.js';
import ForecastBlock from '../components/mirror-components/forecastBlock.js';
import StockTicker from '../components/mirror-components/stockTicker.js';




const Mirror = () => {

  return(
              <div className="mirror-contatiner">

                  <div className="top-row">
                    <div className="top-left-element">
                        <ForecastBlock />
                    </div>

                    <div className="top-center-element">
                        <GreetingBlock />
                    </div>

                    <div className="top-right-element">
                         <WeatherBlock />
                    </div>

                  </div>

                  <div className='bottom-row'>
                    <div className="bottom-left-element">
                      <div>
                        <NewsBlock />
                        <StockTicker />
                        

                      </div>

                    <div className="bottom-right-element">
                      <div> 
                      </div>
                    </div>

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
