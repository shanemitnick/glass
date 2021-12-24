from pysbr import CurrentLines, EventsByDate, MLB, NBA, NFL, NHL, Sportsbook
from datetime import datetime
import numpy as np
import pandas as pd
from flask import current_app as app, jsonify

@app.route('/sports', methods=['GET', 'POST'])
def get_sports_games():
    
    today = datetime.today()
    # sb = Sportsbook()

    master_games = {}
    for league in [NBA(), NFL(), MLB(), NHL()]:
        events = EventsByDate(league.league_id, today)
        events_json = events.raw()
        if len(events_json['eventsByDateNew']['events']) > 0:
            master_games[league.abbr] = {}
            games = events_json['eventsByDateNew']['events']
            for idx, g in enumerate(games):
                if g['es'] != 'postponed':
                    games_desc = g['des']
                    games_desc = games_desc.replace('@', ' @ ')

                    game_unixtime = pd.to_datetime(g['dt'], unit='ms')
                    game_date = datetime.strftime(game_unixtime, "%#m/%#d")
                    game_time = datetime.strftime(game_unixtime, "%#I:%M")

                    for team in g['participants']:
                        if team['ih'] is True:
                            home_team = team['source']['cit'] + ' ' + team['source']['nn']
                            home_abbr = team['source']['abbr']
                        else:
                            away_team = team['source']['cit'] + ' ' + team['source']['nn']
                            away_abbr = team['source']['abbr']

                    master_games[league.abbr][idx] = {'desc': games_desc,
                                                    'time': game_time,
                                                    'date': game_date,
                                                    'home_team': home_team,
                                                    'home_abbr': home_abbr,
                                                    'away_team': away_team,
                                                    'away_abbr': away_abbr
                                                    }
            # if all the games are postponed, we need to delete the league as an index
            if len(master_games[league.abbr].keys()) == 0:
                del master_games[league.abbr]

    return master_games
