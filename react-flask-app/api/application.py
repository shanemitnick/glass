from flask import Flask
from flask_restful import Api


application = Flask(__name__)

application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///glass.db'
application.config['SECRET_KEY'] = 'Secret Key'
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

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
