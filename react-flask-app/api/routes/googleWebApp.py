from functools import reduce
from pydoc import cli
import re
from sre_parse import State
from tempfile import TemporaryFile
from tkinter import W
from urllib import response
from urllib.error import HTTPError
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import os.path
from datetime import datetime
from flask import current_app as app, redirect, request, url_for, session
from flask import jsonify
import os
from collections import defaultdict
import base64
from bs4 import BeautifulSoup
import oauth2client
from oauthlib.oauth2 import WebApplicationClient
import requests
import json
from utils.pathChange import changePath
from oauth2client import client

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/gmail.readonly']


CLIENT_ID = "442607078588-g2sitipbnhfagfbvd8vvmrq4op6qsf2m.apps.googleusercontent.com"


# @app.route('/api/google/get_credentials', methods=['GET', 'POST'])
# def get_google_credentials():
#     try:
#         os.chdir(os.getcwd() + '/routes')
#     except FileNotFoundError:
#         pass

#     creds = None
#     # The file token.json stores the user's access and refresh tokens, and is created
#     # automatically when the authorization flow completes for the first time.
#     if os.path.exists('token.json'):
#         creds = Credentials.from_authorized_user_file('token.json', SCOPES)
#     if not creds or not creds.valid:
#         if creds and creds.expired and creds.refresh_token:
#             creds.refresh(Request())
#         else:
#             flow = Flow.from_client_secrets_file('client_secret.json', SCOPES, redirect_uri='http://localhost:3000/Profile')
#             flow.redirect_uri = url_for('/Profile')
#             authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
        
#             # creds = flow.run_local_server(port=0)
#         # Store the credentials for the next request
#         with open('token.json', 'w') as token:
#             token.write(creds.to_json())

#     return jsonify({'Credentials Stored Locally.'})


# @app.route('/api/google/login', methods=['GET', 'POST'])
# def authorize():
#     print('Base: ', request.base_url)
#     print('trying')
#     # redirect('https://google.com') #redirect(authorization_url)

#     try:
#         os.chdir(os.getcwd() + '/routes')
#     except FileNotFoundError:
#         pass
#     print('trying')

#     client = WebApplicationClient("442607078588-g2sitipbnhfagfbvd8vvmrq4op6qsf2m.apps.googleusercontent.com")

#     request_uri = client.prepare_request_uri("https://accounts.google.com/o/oauth2/v2/auth",
#                                             redirect_uri=request.base_url + '/callback',
#                                             scope=['openid']
#     )
#     print('Request:', request_uri)
#     # flow = Flow.from_client_secrets_file('client_secret.json', SCOPES)

#     # flow.redirect_uri = url_for('oauth2callback', _external=True)
#     # authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')

#     # return redirect('https://google.com') #redirect(authorization_url)
#     print('redirecting')
#     return redirect(url_for(request_uri, _external=True))


@app.route('/api/google/login', methods=['GET', 'POST'])
def authorize():
    try:
        os.chdir(os.getcwd() + '/routes')
    except FileNotFoundError:
        pass

    flow = Flow.from_client_secrets_file('client_secret.json', scopes=SCOPES)
    creds = flow.fetch_token(request.json['code'])
    flow.redirect_uri = 'http://localhost:5000/api/google/login/callback'
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    print(authorization_url)
    return redirect(authorization_url)

@app.route('/api/google/login/callback', methods=['GET', 'POST'])
def callback():
    print('Called Back')
    print(request.args)
    code = request.args.get("code")
    print(code)
    return redirect(url_for('/'))
    

@app.route('/api/google/save_credentials', methods=['GET', 'POST'])
def save_credentials():
    res = request.get_json()
    if 'code' not in res.keys():
        return jsonify('No authorization code provided. (Ignore message on page load)')
    
    changePath('/routes')

    # Exchange auth code for access token, refresh token, and ID token
    credentials = client.credentials_from_clientsecrets_and_code(
        'client_secret.json',
        ['https://www.googleapis.com/auth/drive.appdata', 'profile', 'email'],
        res['code'])
    print(credentials)
    # flow = Flow.from_client_secrets_file('client_secret.json', scopes=SCOPES)
    # flow.redirect_uri = url_for('credentials_saved', _external=True)
    # authorization_response = request.url
    # print('fetching')
    # flow.fetch_token(code=res['code'], authorization_response=authorization_response)
    # print('fetched')

    # # Store the credentials for the next request
    # with open('token.json', 'w') as token:
    #     token.write(flow.credentials.to_json())

    # creds = None
    # if os.path.exists('token.json'):
    #     creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = Flow.from_client_secrets_file('client_secret.json', SCOPES)
    #         flow.redirect_uri = url_for('credentials_saved', _external=True)
    #         print(flow.redirect_uri)

    #         authorization_response = request.url
    #         flow.fetch_token(code=res['code'], authorization_response=authorization_response)
    #         print(flow)    
            
    #         creds = flow.credentials
    #         print(creds)
     
    #     # Store the credentials for the next request
    #     with open('token.json', 'w') as token:
    #         token.write(creds.to_json())
    print('redirect here')
    return redirect(url_for('credentials_saved')) #jsonify('Credentials Saved') # redirect(url_for('callback'))

@app.route('/api/google/credentials_saved', methods=['GET', 'POST'])
def credentials_saved():
    print('redirected')
    changePath('/routes')

    # res = request.get_json()
    
    # creds = None
    # if os.path.exists('token.json'):
    #     creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # if not creds or not creds.valid:
    #     if creds and creds.expired and creds.refresh_token:
    #         creds.refresh(Request())
    #     else:
    #         flow = Flow.from_client_secrets_file('client_secret.json', SCOPES)
    #         flow.redirect_uri = url_for('credentials_saved', _external=True)
    #         print(flow.redirect_uri)

    #         authorization_response = request.url
    #         flow.fetch_token(code=res['code'], authorization_response=authorization_response)
    #         print(flow)    
            
    #         creds = flow.credentials
    #         print(creds)
    #         # authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
        
    #         # creds = flow.run_local_server(port=0)
    #     # Store the credentials for the next request
    #     with open('token.json', 'w') as token:
    #         token.write(creds.to_json())

    return jsonify('Credentials Saved') # redirect(url_for('callback'))






# @app.route('/api/google/save_credentials', methods=['GET', 'POST'])
# def save_credentials():
#     res = request.get_json()
#     auth_code = res['code']

#     url = 'http://authorization-server.com/oauth/authorize' \
#             + 'client_id=' + CLIENT_ID + '&' \
#             + 'response_type=code&' \
#             + 'state=' + 'offline' \
#             + 'redirect_uri=' + 'https%'


#     r = requests.get('')

# @app.route('/oauth2callback', methods=['GET', 'POST'])
# def oauth2callback():

#     try:
#         os.chdir(os.getcwd() + '/routes')
#     except FileNotFoundError:
#         pass
#     print('trying here')

#     flow = Flow.from_client_secrets_file('client_secret.json', SCOPES)
#     flow.redirect_uri = url_for('oauth2callback', _external=True)
#     authorization_response = request.url
    
#     flow.fetch_token(authorization_response=authorization_response)
#     creds = flow.credentials
    
#     with open('token.json', 'w') as token:
#         token.write(creds.to_json())


#     return redirect(url_for('/Profile'))

    






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
        # creds.refresh(Request())
        print(creds.valid)
        print(creds.expiry)
        print(creds.refresh_token)
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


