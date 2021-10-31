import React from "react";
import logo from './logo.svg';
import './App.css';
import TimeBlock from './components/timeBlock.js';
import WeatherBlock from './components/weatherBlock.js';
import EmailBlock from './components/emailBlock.js';

class Mirror extends React.Component {

  render() {
return (
        <div className="App">
          <TimeBlock />
          <WeatherBlock />
          <EmailBlock />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reloaad.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
  }
}

export default Mirror;
