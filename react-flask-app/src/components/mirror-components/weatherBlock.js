import React from "react";
import '../../styles/weatherBlock.css';
import 'boxicons';


class WeatherBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { temp: 0, weather: 'Snow', wind: 0, description: 'None'};
  }

  componentDidMount() {

    this.timer = setInterval(() => {
    fetch('/api/weather', {method: 'POST',
                          headers: {"Content-Type": "application/json"},
                          body: JSON.stringify({'user_id': 1})}
    ).then(res => res.json()).then(data => {
        this.setState({weather: data.current.weather[0].main});
        this.setState({temp: Math.round(data.current.temp)});
        this.setState({wind: data.current.wind_speed});
        this.setState({description: data.current.weather[0].description});
        console.log(data);
    });

    console.log(this.temp)
    }, 100000);

  }
  
  componentWillUnmount() {
      clearInterval(this.timer);
  }

  getWeatherIcon() {
    const title = this.state.weather;

    switch(title) {
      case "Thunderstorm":
        return "cloud-lightning";
      case "Clouds":
        return "cloud";
      case "Drizzle":
        return "cloud-drizzle";
      case "Rain":
        return "cloud-rain";
      case "Snow":
        return "cloud-snow";
      case 'Clear':
        return "sun";
      case 'Mist': case 'Smoke': case 'Haze': case 'Dust': case 'Fog': case 'Sand': case 'Ash': case 'Squall': case 'Tornado':
        return 'error-alt';
      default:
        return "ghost";

    }

  }

  render() {

    const icon = this.getWeatherIcon();

    return (

        <div className='current-weather'>


            <div className='weather-icon'>
                <div className='icon-container'>
                  <box-icon size='150px' color='white' name={icon} ></box-icon>
                </div>

                <div className='weather-temp'>
                  <span> {this.state.temp}°</span>
                </div>
            </div>

            <div className='weather-description'>
              <div className='description-container'>
                <h1 className= 'description'> {this.state.description} </h1>
              </div>

              <div className='break'>
                <h1> | </h1>
              </div>

              <div className='weather-wind'>
                <h1 className= 'wind'> Wind: {this.state.wind} mph </h1>
              </div>
            </div>


        </div>
    );
   }
}

export default WeatherBlock;
