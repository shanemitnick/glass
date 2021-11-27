import React from "react";
import './../styles/weatherBlock.css';

class WeatherBlock extends React.Component {

  componentDidMount() {

    console.log("HI");
//     fetch('/weather').then(res => res.json()).then(data => {
//         console.log(data);
// });
  }

  render() {
    return (
        <div className='weather-container'>
            <h1 className='weather-temp'> 40 </h1>
        </div>
    );
   }
}

export default WeatherBlock;
