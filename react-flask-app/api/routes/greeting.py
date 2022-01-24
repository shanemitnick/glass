from flask import current_app as app
from flask import request
from models.db_model import Users


@app.route('/api/greeting', methods=['GET', 'POST'])
def greet_user():

    response = request.get_json()
    current_user = Users.find_by_user_id(user_id=response['user_id'])

    return {'first_name': current_user.first_name}