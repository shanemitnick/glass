import time
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = 'key'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# from api import models
from datetime import datetime

db = SQLAlchemy(app)

# db.create_all()

# Initialize the Users table
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    zipcode = db.Column(db.String(10), nullable=False, unique=False)
    date_joined = db.Column(db.DateTime, nullable=False, unique=False, default=datetime.utcnow())
    # google_key = db.Column()

    def __repr__(self):
        return f"{self.first_name} {self.last_name}"

# user1 = Users(first_name='Jacob', last_name='Norris', email='jn@email.com', zipcode='02118')
#
# db.session.add(user1)
# db.session.commit()

import requests
from register import RegistrationForm

@app.route('/register', methods=['GET', 'POST'])
def register():
    """ Retrieves the information filled out in the registration form and stores it in our user database"""
    form = RegistrationForm()
    if request.method == 'POST':
        first_name = request.form['First Name']
        last_name = request.form['Last Name']
        email = request.form['Email']
        zipcode = request.form['Zipcode']

        # Run a query with the submitted email to see if it already exists in our db
        user = Users.query.filter(Users.email==email).first()
        if user == None:
            flash('This email already belongs to an account.')
        else:

            # TODO Use the validated email to retrieve their gmail account/ google calendar, store token in db

            user = Users(first_name=first_name, last_name=last_name, email=email, zipcode=zipcode)
            db.session.add(user)
            db.session.commit()

    return render_template('registration.html', form=form)


@app.route('/time')
def get_current_time():
    return {'hi': "HILLO"}

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


SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

@app.route('/calendar')
def get_google_calendar():

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is created
    # automatically when the authorization flow completes for the first time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Store the credentials for the next request
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('calendar', 'v3', credentials=creds)

    now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()

    return events_result
