import pandas as pd
from datetime import datetime
from urllib.error import HTTPError

def get_nba_records(year=None):

    if year is None:
        year = datetime.now().year + 1

    try:
        records = pd.read_html(f'https://www.basketball-reference.com/leagues/NBA_{str(year)}.html')
    except HTTPError:
        try:
            records = pd.read_html(f'https://www.basketball-reference.com/leagues/NBA_{str(int(year)-1)}.html')
        except:
            print('Could not find NHL standings page.')
    
    eastern_conf = records[0]
    western_conf = records[1]

    # Remove the rank number from the conference column
    eastern_conf['Eastern Conference'] = eastern_conf['Eastern Conference'].str[:-4].str.rstrip()
    eastern_conf.rename(columns={'Eastern Conference': 'Team'}, inplace=True)
    
    western_conf['Western Conference'] = western_conf['Western Conference'].str[:-4].str.rstrip()
    western_conf.rename(columns={'Western Conference': 'Team'}, inplace=True)

    teams = pd.concat([eastern_conf, western_conf], ignore_index=True, axis=0)
    teams = teams[['Team', 'W', 'L']]
    teams.set_index('Team', inplace=True)

    return teams

def get_nfl_records(year=None):
    if year is None:
        year = datetime.now().year
    
    # When the new year starts, the year will need to be subtracted by one to get to the current season's page
    try:
        records = pd.read_html(f'https://www.pro-football-reference.com/years/{str(year)}/index.htm')
    except HTTPError:
        try:
            records = pd.read_html(f'https://www.pro-football-reference.com/years/{str(int(year)-1)}/index.htm')
        except:
            print('Could not find NFL season page.')

    afc = records[0]
    nfc = records[1]

    # Drop the division rows and unnecessary columns
    afc = afc.iloc[[i for i in range(0, len(afc.index)) if i % 5 != 0]][['Tm', 'W', 'L']]
    nfc = nfc.iloc[[i for i in range(0, len(nfc.index)) if i % 5 != 0]][['Tm', 'W', 'L']]
    
    # Replace the characters that indicate whether the team has clinched a playoff spot
    for char in ['*', '+']:
        afc['Tm'] = afc['Tm'].str.replace(char, '', regex=False)
        nfc['Tm'] = nfc['Tm'].str.replace(char, '', regex=False)


    teams = pd.concat([afc, nfc], ignore_index=True, axis=0)
    teams.rename(columns={'Tm': 'Team'}, inplace=True)
    teams.set_index('Team', inplace=True)

    return teams

def get_mlb_records(year=None):

    if year is None:
        year = datetime.now().year

    records = pd.read_html(f'https://www.baseball-reference.com/leagues/majors/2021-standings.shtml')

    teams = pd.concat(records, ignore_index=True)
    teams = teams.rename(columns={'Tm': 'Team'})
    teams = teams[['Team', 'W', 'L']]
    teams.set_index('Team', inplace=True)
    
    return teams

def get_nhl_records(year=None):

    if year is None:
        year = datetime.now().year + 1

    try:
        records = pd.read_html(f'https://www.hockey-reference.com/leagues/NHL_{str(year)}_standings.html')
    except HTTPError:
        try:
            records = pd.read_html(f'https://www.hockey-reference.com/leagues/NHL_{str(int(year)-1)}_standings.html')
        except:
            print('Could not find NHL standings page.')
    
    east = records[0]
    west = records[1]

    # Drop the division rows
    east = east.iloc[[i for i in range(0, len(east.index)) if i % 9 != 0]]
    west = west.iloc[[i for i in range(0, len(west.index)) if i % 9 != 0]]

    teams = pd.concat([east, west], ignore_index=True)
    teams = teams.rename(columns={'Unnamed: 0': 'Team'})
    teams = teams[['Team', 'GP', 'W', 'L', 'OL', 'PTS']]
    teams.set_index('Team', inplace=True)

    return teams

