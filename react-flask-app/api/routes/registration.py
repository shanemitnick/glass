from flask import current_app as app, request, jsonify, redirect
from models.db_model import db, Users
import random
import string

@app.route('/api/registration', methods=['GET', 'POST'])
def register():
    
    response = request.get_json()
    print(response)
    if response != {}:
        if Users.find_by_username(username=response['username']) is not None:
            return jsonify('Username taken.')
        if Users.find_by_email(email=response['gmail']) is not None:
            return jsonify('Gmail already has account associated with it.')
        
        user = Users(
            username=response['username'],
            password=response['password'], 
            first_name=response['first_name'], 
            last_name=response['last_name'],
            email=response['gmail'], 
            zipcode=response['zipcode'],
            auth0_id=''.join(random.choice(string.ascii_letters) for i in range(10))
            )

        db.session.add(user)
        db.session.commit()

        # print(url_for(redirect('/')))
        return "User Registered"
    else:
        return "User did not input all fields"