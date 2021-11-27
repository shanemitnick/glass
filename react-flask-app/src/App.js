import React from "react";
import './styles/App.css';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import CalendarBlock from './components/calendarBlock.js';

class Mirror extends React.Component {

  render() {
      return (
              <div className="mirror-contatiner">

                <div className="top-left-element">
                    <TimeBlock />
                </div>

                <div className="top-right-element">
                    <WeatherBlock />
                </div>

                <div className="bottom-left-element">
                  <CalendarBlock />
                </div>

              </div>
            );
    }
}

export default Mirror;
