
import requests
# from api import app
from flask import jsonify, request
from flask import current_app as app
from geopy.geocoders import Nominatim
from models.db_model import Users, db
from datetime import date, timedelta

@app.route('/weather/forecast', methods=['GET', 'POST'])
def get_all_forecast_data():

    api = '1919d00de9f9a872d7bb9e85a63a94ec'
    units = 'imperial'

    r = request.get_json()
    user = Users.find_by_user_id(r['user_id'])
    
    zipcode = user.zipcode

    geolocator = Nominatim(user_agent="glass_user")
    location = geolocator.geocode(zipcode)
    lat = location.latitude
    lon = location.longitude

    url= f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={api}&units={units}'

    r = requests.get(url)
    data = r.json()

    for day, info in enumerate(data['daily']):
        info['day_of_week'] = (date.today() + timedelta(days=day)).strftime("%A")

    return {'current': data['current'],
            'hourly': data['hourly'],
            'daily': data['daily'], 
            # 'alerts': data['alerts']
            }
