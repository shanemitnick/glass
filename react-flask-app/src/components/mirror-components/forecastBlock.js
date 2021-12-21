import React from "react";
import TimeBlock from './timeBlock';
import '../../styles/forecastBlock.css';
import 'boxicons';


class ForecastBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = { tempOne: 0, weatherOne: 'Snow', tempTwo: 0, weatherTwo: 'Snow', tempThree: 0, weatherThree: 'Snow'};
  }

  componentDidMount() {

    fetch('/weather/forecast', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'user_id': 1})}

    ).then(res => res.json()).then(data => {
        console.log(data);
        this.setState({tempOne: Math.round(data.daily[0].temp.day)});
        this.setState({tempTwo: Math.round(data.daily[1].temp.day)});
        this.setState({tempThree: Math.round(data.daily[2].temp.day)});
        this.setState({weatherOne: data.daily[0].weather[0].main});
        this.setState({weatherTwo: data.daily[1].weather[0].main});
        this.setState({weatherThree: data.daily[2].weather[0].main});
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
      default:
        return "sun";

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
      default:
        return "sun";

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
      default:
        return "sun";

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
                  <span> Sunday </span>
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
                  <span> Sunday </span>
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
                  <span> Sunday </span>
                </div>
            </div>
        </div>
    );
   }
}

export default ForecastBlock;
