from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask import current_app as app


db = SQLAlchemy(app)



# Initialize the Users table
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    zipcode = db.Column(db.String(10), nullable=False, unique=False)
    date_joined = db.Column(db.DateTime, nullable=False, unique=False, default=datetime.utcnow())
    # google_key = db.Column()

    def __repr__(self):
        return f"{self.first_name} {self.last_name}"


db.create_all()
