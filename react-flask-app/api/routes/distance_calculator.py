from urllib.request import urlcleanup
import requests
from requests.api import get
from geopy.geocoders import Nominatim
from datetime import datetime
from flask import current_app as app, request
import pandas as pd



@app.route('/calculate-distance', methods=['POST'])
def calculate_distance():
    API_KEY = 'AtxA6KEnVG17CbHXlwyi-Dhm7mNETSRObsz-kjPrGpNx94LEVF_DbtQ7NWW-vyl9'

    res = request.get_json()
    print(res)
    origin = res['origin']
    destination = res['destination']

    # Geocode the origin and the destination
    geolocator = Nominatim(user_agent="glass_user")
    origin_location = geolocator.geocode(origin)
    dest_location = geolocator.geocode(destination)

    origin_lat = origin_location.latitude
    origin_long = origin_location.longitude

    dest_lat = dest_location.latitude
    dest_long = dest_location.longitude

    origins = str(origin_lat) + ',' + str(origin_long)
    dest = str(dest_lat) + ',' + str(dest_long)

    # if no travel mode provided, default to driving
    travel_mode = res.get('travelMode', 'driving') 
    
    # If the travel mode is driving, a start & end time parameter are allowed
    if travel_mode.lower() == 'driving':
        if 'start_time' in res:
            start_time = res['start_time']
            if not isinstance(start_time, datetime.date):
                start_time = pd.to_datetime(start_time)
            else:
                # If no start_time is passed, default to the current time
                start_time = datetime.now()

            start_time = '&startTime=' + start_time.strftime("%Y-%m-%d %H:%M:%S") 

        else:
            start_time = ''

        # Check if there was an end time passed. No default
        if 'end_time' in res:
            end_time = res['end_time']
            if not isinstance(end_time, datetime.date):
                end_time = pd.to_datetime(end_time)
            end_time = '&startTime=' + end_time.strftime("%Y-%m-%d %H:%M:%S") 

        else:
            end_time = ''

    distance_unit = res.get('distanceUnit', 'mi')

    url = ('https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?' + 'origins=' + origins +
                            '&destinations=' + dest +
                              '&travelMode=' + travel_mode +
                               start_time + 
                            #   '&timeUnit=' + time_unit +
                              '&distanceUnit=' + distance_unit +
                              '&key=' + API_KEY)

    response = requests.get(url)
    result = response.json()['resourceSets'][0]['resources'][0]['results'][0]
    print(result)
    travel_duration = round(result['travelDuration'], 1)

    if travel_duration >= 60:
        hours = travel_duration // 60
        minutes = travel_duration % 60
        travel_duration = f'{hours}:{minutes}'
    
    elif travel_duration < 60:
        minutes = round(travel_duration % 60)
        travel_duration = f'{minutes} minutes'

    travel_distance = result['travelDistance']

    return {"travelDuration": travel_duration,
            "travelDistance": travel_distance,
            "distanceUnit": distance_unit,
            "origin": origin.address,
            "destination": dest_location.address
            }
        