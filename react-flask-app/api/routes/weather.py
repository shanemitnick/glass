
import requests
# from api import app
from flask import current_app as app


@app.route('/weather')
def getWeatherInformation(zipcode='02118'):
    """ Sends a request to the OpenWeatherMap Api for the current weather in a current zip code
        Returns a dictionary with the temperature and a description of the weather
    """

    api = '1919d00de9f9a872d7bb9e85a63a94ec'
    units = 'imperial'

    url = f'https://api.openweathermap.org/data/2.5/weather?zip={zipcode}&appid={api}&units={units}'
    r = requests.get(url)
    data = r.json()

    weather_data = {'temp': round(data['main']['temp'], 1),
                    'description': data['weather'][0]['main']}

    return weather_data
