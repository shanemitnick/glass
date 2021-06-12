from flask import Flask, redirect, render_template
from datetime import date, datetime
import mirror
from utils import get_weather

shane_info = {'name': 'Shane',
            'lat' : 40.4406,
            'long': 79.9959,
            'city': 'Pittsburgh'}

owen_info = {'name': 'Owen',
            'lat' : 40.4976,
            'long': -74.4885,
            'city': 'Somerset'}

user_info = owen_info
print(user_info)

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello World!"


@app.route('/mirror')
def mirror():
    values = {}
    dt = datetime.now()
    values['time-info'] = [dt.strftime("%A"), dt.strftime("%l:%M")]

    values['weather-type'] = get_weather(user_info['lat'], user_info['long'])
    values['name'] = user_info['name']

    values['city-name'] = user_info['city']
    return render_template("mirror.html", value=values)

@app.route('/test')
def test():
    return render_template('weather.html')