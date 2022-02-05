from models.valid_nytimes_inputs import nytimes_params

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils.types.choice import ChoiceType
from datetime import datetime
from flask import current_app as app


db = SQLAlchemy(app)



# Initialize the Users table
class Users(db.Model):
    __tablename__ = 'users'
    
    # General User Info - contains info to be entered on registration and login
    user_id = db.Column(db.Integer, primary_key=True)
    auth0_id = db.Column(db.String(100), index=True, nullable=False, unique=True)
    username = db.Column(db.String(100), index=True, nullable=False, unique=True)
    password = db.Column(db.String(100), index=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    zipcode = db.Column(db.String(10), nullable=False, unique=False)
    date_joined = db.Column(db.DateTime, nullable=False, unique=False, default=datetime.utcnow())

    # Mirror Layout
    top_right = db.Column(db.String(100), nullable=True, default='weather')
    top_center = db.Column(db.String(100), nullable=True, default='greeting')
    top_left = db.Column(db.String(100), nullable=True, default='time-date')
    bottom_right = db.Column(db.String(100), nullable=True, default='news')
    bottom_center = db.Column(db.String(100), nullable=True, default=None)
    bottom_left = db.Column(db.String(100), nullable=True, default=None)

    # Favorite News Section
    news_section = db.Column(ChoiceType(nytimes_params['section']), nullable=False, default='world')
    
    # Favorite Sports Teams
    favorite_teams = db.Column(db.PickleType(), nullable=True, default=None)

    # google_key = db.Column()
    # user = db.relationship("NewsPreferences", back_populates='newspreferences', lazy=True)

    def __repr__(self):
        return f"{self.first_name} {self.last_name}"

    @classmethod
    def find_by_auth0_id(self, auth0_id):
        return self.query.filter_by(auth0_id=auth0_id).first()

    @classmethod
    def find_by_email(self, email):
        return self.query.filter_by(email=email).first()

    @classmethod
    def find_by_username(self, username):
        return self.query.filter_by(username=username).first()
   
    @classmethod
    def find_by_user_id(self, user_id):
        return self.query.filter_by(user_id=user_id).first()

    @classmethod
    def get_user_favorite_section(self, user_id):
        user = self.query.filter_by(user_id=user_id).first()
        return user.news_section

# class MirrorLayout(db.Model):
    
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

#     top_right = db.Column(db.String(100), nullable=True, default='weather')
#     top_center = db.Column(db.String(100), nullable=True, default='greeting')
#     top_left = db.Column(db.String(100), nullable=True, default='time-date')
    
#     bottom_right = db.Column(db.String(100), nullable=True, default='news')
#     bottom_center = db.Column(db.String(100), nullable=True, default=None)
#     bottom_left = db.Column(db.String(100), nullable=True, default=None)

#     ## Would it be better to have a key for every feature and the value is the position
#     ## Or should I just have the positions as columns and the value is the feature

    

# class NewsPreferences(db.Model):
#     __tablename__ = 'newspreferences'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
#     region =  db.Column(db.String(100), nullable=False, default='world')
#     section = db.Column(ChoiceType(nytimes_params['section']), nullable=False, default='world')
#     subsection = db.Column(db.String(100), nullable=True, default='world')
#     # region_of_interest
#     # favorite_section

#     newspreferences = db.relationship("Users", back_populates='user', lazy=True)

#     def __repr__(self):
#         print(self.user_id, self.users.username)

#     # @property
#     # def section(self): 
#     #     """ Returns the user's favorite section."""
#     #     return self.section

#     @classmethod
#     def get_user_favorite_section(self, user_id):
#         return self.query.filter_by(user_id=user_id).first()


db.create_all()
