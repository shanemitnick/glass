import React from "react";
import './../styles/weatherBlock.css';
import 'boxicons';


class WeatherBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { temp: 0, weather: 'Snow'};
  }

  componentDidMount() {

    fetch('/weather/current', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'username': 'User'})}

    ).then(res => res.json()).then(data => {
        console.log(data);
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
            <div className='weather-icon-container'>

                <div className='icon-container'>
                  <box-icon size='150px' color='white' name={icon} ></box-icon>
                </div>

                <div className='weather-temp'>
                  <span> {this.state.temp}° </span>
                </div>

            </div>

            <div className='weather-detail-container'>
              <div className='description-container'>
                <h1 className= 'weather-description'> {this.state.weather} </h1>
              </div>

              <div className='break'>|</div>

              <div className='wind-container'>
                <h1 className= 'wind'> Wind 28% </h1>
              </div>
            </div>


        </div>
    );
   }
}

export default WeatherBlock;
