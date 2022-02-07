from flask import Flask
from flask_restful import Api
import pymysql

application = Flask(__name__)

application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://username:password@aa15g7ac150oevh.cj0xjpnfvfik.us-east-1.rds.amazonaws.com/ebdb'
application.config['SECRET_KEY'] = 'Secret Key'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['SQLALCHEMY_POOL_RECYCLE'] = 299
application.config['SQLALCHEMY_POOL_TIMEOUT'] = 20

with application.app_context():
    api = Api(application)

    from models.db_model import db, Users #, NewsPreferences, MirrorLayout
    db.init_app(application)

    from routes.weather import get_all_forecast_data
    from routes.google_calendar import get_google_calendar, get_google_credentials
    from routes.news import get_top_stories_by_category
    from routes.greeting import greet_user
    from routes.settings import show_and_update_settings
    from routes.stocks import get_stock_prices
    from routes.sports_games import get_sports_games
    from routes.distance_calculator import calculate_distance
    from routes.registration import register



if __name__ == "__main__":
    application.debug = False
    application.run()
