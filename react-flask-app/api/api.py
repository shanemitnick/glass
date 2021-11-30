import time
from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager


def create_app():
        
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config['SECRET_KEY'] = 'Secret Key'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        api = Api(app)
        jwt = JWTManager(app)

        from db_model import Users, db
        from login import UserRegistration, UserLogin
        from routes.weather import getWeatherInformation
        from routes.google_calendar import get_google_calendar

        api.add_resource(UserRegistration, '/register')
        api.add_resource(UserLogin, '/login')

        # user1 = Users(username='User', password='Password', first_name='Jacob', last_name='Norris', email='jn@email.com', zipcode='00000')
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