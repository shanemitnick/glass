from flask import Flask
from flask.cli import run_command
from flask_restful import Api
from flask_jwt_extended import JWTManager


def create_app():

    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///glass.db'
    app.config['SECRET_KEY'] = 'Secret Key'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        api = Api(app)
        jwt = JWTManager(app)

        from models.db_model import Users, db
        db.init_app(app)
        from login import UserRegistration, UserLogin
        from routes.weather import get_current_weather, get_all_forecast_data
        from routes.google_calendar import get_google_calendar
        from routes.news import get_top_stories_by_category

        api.add_resource(UserRegistration, '/register')
        api.add_resource(UserLogin, '/login')

        # user1 = Users(username='User', password='Password', first_name='First', last_name='Last', email='user@email.com', zipcode='55555')
        # db.session.add(user1)
        # db.session.commit()

        # @app.route('/userinfo/<username>')
        # def get_user_info(username):
        #     user = Users.query.filter(Users.username==username).first()
        #     return user

    return app


if __name__ == "__main__":
    app = create_app()
    app.debug = False
    app.run(host='localhost', port=5000)
