import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'hi': "HILLO"}


@app.route('/weather')
def getWeatherInformation():

    return {'temp': 76}
