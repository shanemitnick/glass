from lib2to3.refactor import _identity
from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
import hashlib
from models.db_model import Users, db

parser = reqparse.RequestParser()
parser.add_argument('username', help = 'Username cannot be blank', required = True)
parser.add_argument('password', help = 'Password cannot be blank', required = True)

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        print(hashlib.md5(data['password'].encode()).hexdigest())
        if Users.query.filter(Users.username==data['username']).first():
            return {"error" : "User already exists"}

        user = Users(username=data['username'], password=hashlib.md5(data['password'].encode()).hexdigest())
        # user.save()
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=data['username'])
        refresh_token = create_refresh_token(identity=data['username'])
        return {
            'username': data['username'],
            'access_token': access_token,
            'refresh_token': refresh_token
        }


class UserLogin(Resource):
    def post(self):
        try:
            data = request.get_json()
            print(data)
            current_user = Users.query.filter(Users.username==data['username']).first()

            if not current_user:
                return {"error":"User not in DB. Register as a new user"}

            password = hashlib.md5(data['password'].encode()).hexdigest()
            if current_user.password == password :
                access_token = create_access_token(identity=data['username'])
                refresh_token = create_refresh_token(identity=data['username'])
                return {
                    'username': current_user.username,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return {'error': 'Wrong credentials'}
        except:
            raise Exception("Cannot login user")
