from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import os.path
from datetime import datetime
from flask import current_app as app
from flask import jsonify
import os

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

@app.route('/api/google/get_credentials', methods=['GET', 'POST'])
def get_google_credentials():
    try:
        os.chdir(os.getcwd() + '/routes')
    except FileNotFoundError:
        pass

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

    return jsonify({'Credentials Stored Locally.'})


@app.route('/api/google/get_calendar', methods=['GET', 'POST'])
def get_google_calendar():

    try:
        os.chdir(os.getcwd() + '/routes')
    except FileNotFoundError:
        pass

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is created
    # automatically when the authorization flow completes for the first time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
                    # Store the credentials for the next request
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

        else:
            return 'User Not Logged in to Google'

    service = build('calendar', 'v3', credentials=creds)

    now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()

    return events_result
