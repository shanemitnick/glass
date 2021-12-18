import re
from flask import current_app as app
from flask import request, jsonify
from models.db_model import Users


@app.route('/profile/settings', methods=["GET", "POST"])
def show_and_update_settings():
    response = request.get_json()
    user_id = response['user_id']
    user = Users.find_by_user_id(user_id=user_id)

    USER_SETTINGS = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'zipcode': user.zipcode,

        'top_right': user.top_right,
        'top_center': user.top_center,
        'top_left': user.top_left,
        'bottom_left': user.bottom_left,
        'bottom_center': user.bottom_center,
        'bottom_right': user.bottom_right,

        'news_section': str(user.section)    
    }


    return USER_SETTINGS












