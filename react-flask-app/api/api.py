from flask import Flask
from flask.cli import run_command
from flask_restful import Api


def create_app():

    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///glass.db'
    app.config['SECRET_KEY'] = 'Secret Key'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        api = Api(app)

        from models.db_model import db, Users #, NewsPreferences, MirrorLayout
        db.init_app(app)

        from routes.weather import get_all_forecast_data
        from routes.google_calendar import get_google_calendar
        from routes.news import get_top_stories_by_category
        from routes.greeting import greet_user
        from routes.settings import show_and_update_settings
        from routes.stocks import get_stock_prices
        from routes.sports_games import get_sports_games
        from routes.distance_calculator import calculate_distance

        # user1 = Users(
        #     username='User',
        #     password='Password', 
        #     first_name='First', 
        #     last_name='Last', 
        #     email='user@email.com', 
        #     zipcode='02118',
        #     auth0_id='xxxxxxxx')
        # user1 = Users.find_by_username('User')

        # db.session.add(user1)
        # db.session.commit()


    return app


if __name__ == "__main__":
    app = create_app()
    app.debug = False
    app.run(host='localhost', port=5000)
