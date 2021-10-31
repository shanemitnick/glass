from __future__ import print_function
from datetime import datetime
from datetime import timedelta
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

def get_events():
    ''' a test because the other function is not working
    '''

    events = [[['3:00 PM', 'test on TODYA'], ['10:00 AM', 'test 2']],
            [['10:00 AM', 'Accelerator Team Meeting (OPS)'],
                ['11:15 AM', 'Shane & Ben 1x1'],
                ['11:30 AM','Edinno.lab internal weekly sync & planning ']],
            [['9:30 AM', 'All team checkin'],
                ['11:00 AM', 'Shane/Turner 1:1'],
                ['5:00 PM', 'edinno.lab Learning Session']],
            [['3:00 PM', 'test on TODYA'], ['10:00 AM', 'test 2']]
          ]
    return events

def get_events_cal():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('calendar', 'v3', credentials=creds)

    # Call the Calendar API
    now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                        maxResults=10, singleEvents=True,
                                        orderBy='startTime').execute()
    events = events_result.get('items', [])
    event_info = []

    if not events:
        print('No upcoming events found.')
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(start, event['summary'])
        event_info.append([start, event['summary']])

    seperated_events = break_into_days(event_info)

    return seperated_events


def break_into_days(events):
    '''Breaks list of google chrome events into
    list by day (max of 3 per day)

    '''
    print(events)


    week_events = []
    today = datetime.today()
    for x in range(4):
        day = datetime.now() + timedelta(days=x)
        day_events = []
        for event in events:
            if day.strftime("%Y-%m-%d") == event[0][0:10]:
                day_events.append(event)
        week_events.append(day_events[0:3])

    return week_events
