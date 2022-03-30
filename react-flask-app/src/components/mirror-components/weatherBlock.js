import React, { useEffect, useState } from "react";
import '../../styles/weatherBlock.css';
import '../../styles/dailyForecastBlock.css';
import '../../styles/hourlyForecastBlock.css';
import 'boxicons';


const getWeatherIcon = (weather_desc) => {
  // const title = this.state.weather;

  switch(weather_desc) {
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

const unixDtToHour = (dt) => {

  const datetime = new Date(dt * 1000)
  let time = datetime.getHours();
  let period = '';

  if (time < 12) {
    period = 'am';
  } else {
    period = 'pm';
  }
  
  let hour = time % 12;
  if (hour === 0 ) {
    hour = 12
  };

  return hour + ' ' + period

}



function WeatherBlock() {
  const [weather, setWeather] = useState({});
  const [gotData,  setGotData] = useState(false);
  
  useEffect(() =>  {
    if (!gotData) {
    fetch('/api/weather', {method: 'POST',
                           headers: {"Content-Type": "application/json"},
                           body: JSON.stringify({'user_id': 1})}
          ).then(res => res.json()).then(data => {
            console.log(data)
            setWeather(data)
            setGotData(true)
          })
        }
            
          const intervalID = setInterval(() => {
            setGotData(false);
            }, 900000)
            return () => clearInterval(intervalID);

  })


  return (<div>

    {!gotData ?
        <div> Loading </div> :
        <div>
        
        <CurrentWeather props={weather.current} />
        <DailyWeather props={weather.daily} />
        <HourlyWeather props={weather.hourly} />

        </div>
      

        }

  </div>

  );


  }

export default WeatherBlock;

function CurrentWeather(props) {
  const {wind, temp, weather} = props.props;

  return <div className='current-weather'>

    <div className='weather-icon'>
            <div className='icon-container'>
              <box-icon size='150px' color='white' name={getWeatherIcon(weather[0].description)} ></box-icon>
            </div>

            <div className='weather-temp'>
              <span> {Math.round(temp)}° </span>
            </div>
          </div>

          <div className='weather-description'>
            <div className='description-container'>
              <h1 className= 'description'> {weather[0].description} </h1>
          </div>

          <div className='break'>
            <h1> | </h1>
          </div>

          <div className='weather-wind'>
            <h1 className= 'wind'> Wind: {wind} mph </h1>
          </div>
        </div>
    </div>
      }

function DailyWeather(props) {
  const weather = props.props;
  const forecast = weather

  const dayOne = forecast[1]
  const dayTwo = forecast[2]
  const dayThree = forecast[3]
  
  return (
      
    <div className='forecasts'>
        <div className='forecast-one'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(dayOne.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(dayOne.temp.day)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayOne.day_of_week} </span> */}
              <span> {dayOne.day_abbr} </span>
            </div>
        </div>
        <div className='forecast-two'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(dayTwo.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(dayTwo.temp.day)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayTwo.day_of_week} </span> */}
              <span> {dayTwo.day_abbr} </span>
            </div>
        </div>
        <div className='forecast-three'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(dayThree.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(dayThree.temp.day)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayThree.day_of_week} </span> */}
              <span> {dayThree.day_abbr} </span>

            </div>
        </div>
    </div>
);
}

function HourlyWeather(props) {
  const weather = props.props;
  const forecast = weather

  const hourOne = forecast[1]
  const hourTwo = forecast[2]
  const hourThree = forecast[3]
  const hourFour = forecast[4]
  const hourFive = forecast[5]


  return (
      
    <div className='hourly-forecasts'>
        <div className='hour-one'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(hourOne.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(hourOne.temp)}° </span>
            </div>
            <div className='date'>
              {/* <span> {hourOne.day_of_week} </span> */}
              <span> {unixDtToHour(hourOne.dt)} </span>
            </div>
        </div>
        <div className='hour-two'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(hourTwo.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(hourTwo.temp)}° </span>
            </div>
            <div className='date'>
              {/* <span> {hourOne.day_of_week} </span> */}
              <span> {unixDtToHour(hourTwo.dt)} </span>
            </div>
        </div>
        <div className='hour-three'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(hourThree.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(hourThree.temp)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayThree.day_of_week} </span> */}
              <span> {unixDtToHour(hourThree.dt)} </span>
            </div>
        </div>
        <div className='hour-four'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(hourFour.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(hourFour.temp)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayThree.day_of_week} </span> */}
              <span> {unixDtToHour(hourFour.dt)} </span>
            </div>
        </div>
        <div className='hour-five'>
            <div className='icon-container'>
              <box-icon size='100px' color='white' name={getWeatherIcon(hourFive.weather[0].main)} ></box-icon>
            </div>
            <div className='forecast-temp'>
              <span> {Math.round(hourFive.temp)}° </span>
            </div>
            <div className='date'>
              {/* <span> {dayThree.day_of_week} </span> */}
              <span> {unixDtToHour(hourFive.dt)} </span>
            </div>
        </div>
    </div>
);
}

