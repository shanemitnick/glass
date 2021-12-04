
import requests
# from api import app
from flask import jsonify, request
from flask import current_app as app
from geopy.geocoders import Nominatim
from models.db_model import Users, db



@app.route('/weather/current', methods=['GET', 'POST'])
def get_current_weather():
    """ Sends a request to the OpenWeatherMap Api for the current weather in a current zip code
        Returns a dictionary with the temperature and a description of the weather
    """

    user = Users.query.filter(Users.username==request.json['username']).first()
    zipcode = user.zipcode

    api = '1919d00de9f9a872d7bb9e85a63a94ec'
    units = 'imperial'

    url = f'https://api.openweathermap.org/data/2.5/weather?zip={zipcode}&appid={api}&units={units}'
    r = requests.get(url)
    data = r.json()

    weather_data = {'temp': round(data['main']['temp'], 1),
                    'description': data['weather'][0]['main']}

    return weather_data

@app.route('/weather/forecast', methods=['GET', 'POST'])
def get_all_forecast_data(zipcode='02118'):

    api = '1919d00de9f9a872d7bb9e85a63a94ec'
    units = 'imperial'

    geolocator = Nominatim(user_agent="glass_user")
    location = geolocator.geocode(zipcode)
    lat = location.latitude
    lon = location.longitude

    url= f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={api}&units={units}'

    r = requests.get(url)
    data = r.json()

    return {'current': data['current'],
            'hourly': data['hourly'],
            'daily': data['daily'], 
            'alerts': data['alerts']}
