import React from "react";
import logo from './logo.svg';
import './styles/App.css';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import EmailBlock from './components/emailBlock.js';
import GreetingBlock from './components/greetingBlock.js';

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
                  <EmailBlock />
                </div>

                <div className = 'center-element'>
                    <GreetingBlock/>
                </div>



              </div>
            );
    }
}

export default Mirror;
