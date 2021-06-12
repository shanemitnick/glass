import requests
import json

api_key = '0e414537796faef4dd45f1c240a8b4ab'

def get_weather(lat, lon, units='imperial'):
    ''' Returns the weather information required for weather card.

    inputs:
        lat (float): latitude of the desired weather 
        long (float): longitude of the desired weather
        units (string): openweather constraint -- imperial is base
    returns: 
        weather_info (list): list of weather information needed
                            (temperature, weather_tyep)
    '''
    url = f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={api_key}&units={units}'

    url_text = requests.get(url).text
    weather_dict = json.loads(url_text)

    temperature = round(weather_dict['current']["temp"])
    weather_type = weather_dict['current']['weather'][0]['main'].lower()

    weather_info = [temperature, weather_type]

    return weather_info