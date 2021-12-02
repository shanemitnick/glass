
import requests
from flask import jsonify
from flask import current_app as app


@app.route('/news/top_stories/<topic>')
def get_top_stories_by_category(topic='world'):
    """ Gets the top 5 news stories by category from the NY Times. """

    api = 'krCXaBDHYgOrJUo5Io37ISIMcz8rj1DU'
    url = f'https://api.nytimes.com/svc/topstories/v2/{topic}.json?api-key={api}'

    r = requests.get(url)
    r = r.json()

    # The relevant info we want to keep to display and use
    keys_to_keep = ['title', 'abstract', 'multimedia', 'created_date', 'url']
    # response = [ {k: v for k, v in news_item.items() if k in keys_to_keep} for news_item in  r['results'] ][:5]
    
    results = r['results']
    response = []
    count = 0
    while len(response) < 5:
        # There can be blank reposonse that are just images on the popular page, we want to skip these
        if results[count]['abstract'] == '':
            pass
        else:
            article_info = {}
            for k, v in results[count].items():
                if k in keys_to_keep:
                    article_info[k] = v
            response.append(article_info)
        count += 1

    return jsonify(response)


if __name__ == '__main__':
    get_top_stories_by_category('world')