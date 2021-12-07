import React from "react";
import './styles/App.css';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import CalendarBlock from './components/calendarBlock.js';
import GreetingBlock from './components/greetingBlock.js';

class Mirror extends React.Component {

  render() {
      return (
              <div className="mirror-contatiner">

                <div className="top-left-element">
                    <WeatherBlock />
                </div>

                <div className="top-right-element">
                    <TimeBlock />
                </div>

                <div className="bottom-left-element">
                  <CalendarBlock />
                </div>

                <div className = 'center-element'>
                    <GreetingBlock/>
                </div>



              </div>
            );
    }
}

export default Mirror;
