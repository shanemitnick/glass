
from configparser import SectionProxy
import requests
from flask import jsonify, request
from flask import current_app as app
from models.db_model import Users

@app.route('/api/news', methods=['GET', 'POST'])
def get_top_stories_by_category(section='world'):
    """ Gets the top 5 news stories by category from the NY Times. """

    response = request.get_json()
    section = Users.get_user_favorite_section(response['user_id'])
    section = 'home' if section == 'all topics' else section

    api = 'krCXaBDHYgOrJUo5Io37ISIMcz8rj1DU'
    url = f'https://api.nytimes.com/svc/topstories/v2/{section}.json?api-key={api}'

    r = requests.get(url)
    r = r.json()

    # The relevant info we want to keep to display and use
    keys_to_keep = ['title', 'abstract', 'multimedia', 'created_date', 'url']
    # response = [ {k: v for k, v in news_item.items() if k in keys_to_keep} for news_item in  r['results'] ][:5]
    
    results = r['results']
    response = {}
    count = 0
    while len(response.keys()) < 5:
        # There can be blank reposonse that are just images on the popular page, we want to skip these
        if results[count]['abstract'] == '':
            del results[count]
        else:
            article_info = {}
            for k, v in results[count].items():
                if k in keys_to_keep:
                    article_info[k] = v
            response[count] = article_info
            count += 1

    return response


if __name__ == '__main__':
    get_top_stories_by_category('world')