import re
from flask import current_app as app
from flask import request, jsonify
from models.db_model import Users, db
from models.db_columns import Users_columns
from sqlalchemy import update


@app.route('/profile/settings', methods=["GET", "POST"])
def show_and_update_settings():
    response = request.get_json()
    user_id = response['user_id']
    user = Users.find_by_user_id(user_id=user_id)

    # Update any settings if necessary and track invalid settings passed
    invalid_settings = []
    if len(list(set(response.keys()) - {'user_id'})) != 0:
        for setting in response.keys():
            if setting != 'user_id':
                if setting in Users_columns:
                    setattr(user, setting, response[setting])
                else: 
                    invalid_settings.append(setting)

        db.session.commit()

    for setting in invalid_settings:
        print(f'{setting} is an invalid setting. Could not process change.')

    user = Users.find_by_user_id(user_id=user_id)

    USER_SETTINGS = {
        'user': {'first_name': user.first_name,
                 'last_name': user.last_name,
                 'email': user.email,
                 'zipcode': user.zipcode},
        'mirror': {'top_right': user.top_right,
                  'top_center': user.top_center,
                   'top_left': user.top_left,
                   'bottom_left': user.bottom_left,
                   'bottom_center': user.bottom_center,
                   'bottom_right': user.bottom_right},
        'other': {'news_section': str(user.news_section).title(),
                  'favorite_teams': user.favorite_teams}
    }

    return USER_SETTINGS












