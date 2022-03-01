from tempfile import TemporaryFile
from urllib.error import HTTPError
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import os.path
from datetime import datetime
from flask import current_app as app
from flask import jsonify
import os
from collections import defaultdict
import base64
from bs4 import BeautifulSoup

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/gmail.readonly']

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

    try:
        service = build('calendar', 'v3', credentials=creds)

        now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                            maxResults=10, singleEvents=True,
                                            orderBy='startTime').execute()

        return events_result
    except HTTPError as e:
        print(f'An error occurred while trying to access calendar: {e}')
        return jsonify(f'An error occurred while trying to access calendar: {e}')


@app.route('/api/google/get_gmail', methods=['GET', 'POST'])
def get_gmail():
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

    try:
        service = build('gmail', 'v1', credentials=creds)
        results = service.users().messages().list(userId='me', includeSpamTrash='false', maxResults=100).execute()
        messages = results.get('messages', [])

        if not messages:
            print('No mail found')
            return
        
        exclude = ['CATEGORY_PROMOTIONS', 'CATEGORY_SOCIAL'] #, 'CATEGORY_UPDATES']
        mail = defaultdict(dict)
        idx = 0
        for msg in messages:
            try:
                txt = service.users().messages().get(userId='me', id=msg['id']).execute()
                if any(label in exclude for label in txt['labelIds']): # need to filter out spam, bc filer applied in first api call doesn't seem to work
                    raise ValueError
                
                summary = txt['snippet']
                payload = txt['payload']
                headers = payload['headers']
                for d in headers:
                    if d['name'] in ['From', 'Subject', 'Date']:
                        if d['name'] == 'From':
                            d['value'] = d['value'].split(' <')[0]
                        mail[idx][d['name'].lower()] = d['value']

                mail[idx]['summary'] = summary

                parts = payload.get('parts')[0]
                data = parts['body']['data']
                data = data.replace('-', '+').replace('_', '/')
                decoded_data = base64.b64decode(data)
                
                soup = BeautifulSoup(decoded_data, 'lxml')
                body = soup.body.p.text # Need to access the <p> tags of the <body> and access the text property in order to jsonify
                mail[idx]['body'] = body
                idx += 1

            except:
                pass

        return jsonify(dict(mail))
        
    except HTTPError as e:
        print(f'An error occurred while trying to access calendar: {e}')
        return jsonify(f'An error occurred while trying to access calendar: {e}')


