
import requests
# from api import app
from flask import jsonify, request
from flask import current_app as app
from geopy.geocoders import Nominatim
from models.db_model import Users, db
from datetime import date, timedelta

@app.route('/api/weather', methods=['GET', 'POST'])
def get_all_forecast_data():

    api = '4698d9f621f00a18a467abff9b8dde19'
    units = 'imperial'

    response = request.get_json()
    user = Users.find_by_user_id(response['user_id'])
    
    zipcode = user.zipcode
    geolocator = Nominatim(user_agent="glass_user")
    location = geolocator.geocode(zipcode, country_codes='us')
    lat = location.latitude
    lon = location.longitude
    
    url= f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={api}&units={units}'

    r = requests.get(url)
    data = r.json()

    for day, info in enumerate(data['daily']):
        info['day_of_week'] = (date.today() + timedelta(days=day)).strftime("%A")
        info['day_abbr'] = (date.today() + timedelta(days=day)).strftime("%a")
        info['month_day'] = (date.today() + timedelta(days=day)).strftime("%#m/#d")
        
    print({'current': data['current'],
            'hourly': data['hourly'],
            'daily': data['daily'], 
            # 'alerts': data['alerts']
            })
    
    return {'current': data['current'],
            'hourly': data['hourly'],
            'daily': data['daily'], 
            # 'alerts': data['alerts']
            }
