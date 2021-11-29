import React from "react";
import './../styles/weatherBlock.css';
import 'boxicons';


class WeatherBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { temp: 0, weather: 'Snow'};
  }

  componentDidMount() {

    console.log("HI");

    fetch('/weather').then(res => res.json()).then(data => {
        this.setState({weather: data.description});
        this.setState({temp: Math.round(data.temp)});
        console.log(data);
    });

    console.log(this.temp)

  }

  getWeatherIcon() {
    const title = this.state.weather;

    switch(title) {
      case "Thunderstorm":
        return "cloud-lightning";
      case "Cloudy":
        return "cloud";
      case "Drizzle":
        return "cloud-drizzle";
      case "Rain":
        return "cloud-rain";
      case "Snow":
        return "cloud-snow";
      default:
        return "cloud";

    }

  }

  render() {

    const icon = this.getWeatherIcon();

    return (

        <div className='weather-container'>
            <div className='weather-icon'>
                <box-icon size='100px' color='white' name={icon} ></box-icon>
            </div>
            <h1 className='weather-temp'> {this.state.temp} </h1>

        </div>
    );
   }
}

export default WeatherBlock;
