from pysbr import CurrentLines, EventsByDate, MLB, NBA, NFL, NHL, Sportsbook
from datetime import datetime, time, timedelta
import numpy as np
import pandas as pd
from flask import current_app as app, jsonify


@app.route('/sports', methods=['GET', 'POST'])
def get_sports_games():
    
    today = datetime.today()
    today = today.replace(hour=0, minute=0, second=0)

    print(today)
    # sb = Sportsbook()

    leagues = [
               NBA(),
               NFL(),
               MLB(),
               NHL()
               ]

    master_games = {}
    for league in leagues:

        events = EventsByDate(league.league_id, today)
        events_json = events.raw()
        if len(events_json['eventsByDateNew']['events']) > 0:
            master_games[league.abbr] = {}
            games = events_json['eventsByDateNew']['events']
            for idx, g in enumerate(games):
                if g['es'] != 'postponed':
                    game_unixtime = pd.to_datetime(g['dt'], unit='ms')
                    game_est = game_unixtime - timedelta(hours=5)
                    game_date = datetime.strftime(game_est, "%#m/%#d")
                    game_time = datetime.strftime(game_est, "%#I:%M")
                    
                    for team in g['participants']:
                        # The Clippers display their city as 'LA' instead of 'Los Angeles'
                        if team['source']['cit'] == 'LA':
                            team['source']['cit'] = 'Los Angeles'
                            
                        if team['ih'] is True:
                            home_team = team['source']['cit'] + ' ' + team['source']['nn']
                            home_abbr = team['source']['abbr'].upper()
                            _home_id = team['partid']
                        else:
                            away_team = team['source']['cit'] + ' ' + team['source']['nn']
                            away_abbr = team['source']['abbr'].upper()

                    games_desc = away_team + ' @ ' + home_team

                    # Set the score to 0 and add to it if the game is live
                    isLive = 'True' if g['es'] == 'in-progress' else 'False'
                    home_score = 0
                    away_score = 0
                    period = 0
                    # If the game has started
                    if len(g['scores']) > 0:
                        for score_info in g['scores']:
                            if score_info['partid'] == _home_id:
                                home_score += int(score_info['val'])
                            else:
                                away_score += int(score_info['val'])                  
                            period += .5

                    # The game is over if the game is not in progress and a team has recorded a score
                    isOver = 'True' if (g['es'] != 'in-progress') and (away_score + home_score > 0) else 'False'

                    master_games[league.abbr][idx] = {'desc': games_desc,
                                                      'time': game_time,
                                                      'date': game_date,
                                                      'home_team': home_team,
                                                      'home_abbr': home_abbr,
                                                      'away_team': away_team,
                                                      'away_abbr': away_abbr,
                                                      'isLive': isLive,
                                                      'home_score': home_score,
                                                      'away_score': away_score,
                                                      'period': period,
                                                      'isOver': isOver
                                                      }
            # if all the games are postponed, we need to delete the league as an index
            if len(master_games[league.abbr].keys()) == 0:
                del master_games[league.abbr]

    return master_games
