from flask import Flask, redirect, render_template
from datetime import date, datetime
from utils import get_weather
from utils import get_stories_from_source
from user_calendar import get_events
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base

shane_info = {'name': 'Shane',
            'lat' : 40.4406,
            'long': 79.9959,
            'city': 'Pittsburgh'}

owen_info = {'name': 'Owen',
            'lat' : 40.4976,
            'long': -74.4885,
            'city': 'Somerset'}

user_info = shane_info
print(user_info)

app = Flask(__name__)
db = SQLAlchemy(app)



# @app.route("/")
# def index():
#     return "Hello World!"


@app.route('/')
@app.route('/mirror')
def mirror():
    values = {}
    dt = datetime.now()
    values['time-info'] = ['Sunday','2:35']

    values['weather-type'] = get_weather(user_info['lat'], user_info['long'])
    values['name'] = user_info['name']

    values['city-name'] = user_info['city']

    print(get_stories_from_source('cnn', n=1))
    values['events'] = get_events()

    print(values['events'])
    return render_template("mirror.html", value=values)

@app.route('/test')
def test():
    return render_template('weather.html')
