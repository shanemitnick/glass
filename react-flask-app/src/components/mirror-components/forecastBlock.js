import React from "react";
import TimeBlock from './timeBlock';
import '../../styles/forecastBlock.css';
import 'boxicons';


class ForecastBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { tempOne: 0, weatherOne: 'Snow', dayOne: 'Last', tempTwo: 0, weatherTwo: 'Snow', dayTwo: 'Last', tempThree: 0, weatherThree: 'Snow', dayThree: 'Last'};
  }

  componentDidMount() {

    fetch('/weather/forecast', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'user_id': 1})}

    ).then(res => res.json()).then(data => {
        console.log(data);
        this.setState({tempOne: Math.round(data.daily[1].temp.day)});
        this.setState({tempTwo: Math.round(data.daily[2].temp.day)});
        this.setState({tempThree: Math.round(data.daily[3].temp.day)});
        this.setState({weatherOne: data.daily[1].weather[0].main});
        this.setState({weatherTwo: data.daily[2].weather[0].main});
        this.setState({weatherThree: data.daily[3].weather[0].main});
        this.setState({dayOne: data.daily[1].day_of_week});
        this.setState({dayTwo: data.daily[2].day_of_week});
        this.setState({dayThree: data.daily[3].day_of_week});
        console.log(data);
    });

    console.log(this.tempOne)

  }
    // need to fix this since it is just bad code but want to make sure basics work

  getWeatherIconOne() {
    const title = this.state.weatherOne;

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
  getWeatherIconTwo() {
    const title = this.state.weatherTwo;

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
  getWeatherIconThree() {
    const title = this.state.weatherThree;

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

    const iconOne = this.getWeatherIconOne();
    const iconTwo = this.getWeatherIconTwo();
    const iconThree = this.getWeatherIconThree();


    return (

        <div className='forecasts'>
            <div className='forecast-one'>
                <div className='icon-container'>
                  <box-icon size='100px' color='white' name={iconOne} ></box-icon>
                </div>
                <div className='forecast-temp'>
                  <span> {this.state.tempOne}° </span>
                </div>
                <div className='date'>
                  <span> {this.state.dayOne} </span>
                </div>
            </div>
            <div className='forecast-two'>
                <div className='icon-container'>
                  <box-icon size='100px' color='white' name={iconTwo} ></box-icon>
                </div>
                <div className='forecast-temp'>
                  <span> {this.state.tempTwo}° </span>
                </div>
                <div className='date'>
                  <span> {this.state.dayTwo} </span>
                </div>
            </div>
            <div className='forecast-three'>
                <div className='icon-container'>
                  <box-icon size='100px' color='white' name={iconThree} ></box-icon>
                </div>
                <div className='forecast-temp'>
                  <span> {this.state.tempThree}° </span>
                </div>
                <div className='date'>
                  <span> {this.state.dayThree} </span>
                </div>
            </div>
        </div>
    );
   }
}

export default ForecastBlock;
