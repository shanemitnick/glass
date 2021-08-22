import requests
import json
from newsapi import NewsApiClient

weather_api_key = '0e414537796faef4dd45f1c240a8b4ab'

newsapi = NewsApiClient(api_key='a332083e19314e53a15941aef8b26bee')

def get_weather(lat, lon, units='imperial'):
    
    ''' Returns the weather information required for weather card.

    inputs:
        lat (float): latitude of the desired weather 
        long (float): longitude of the desired weather
        units (string): openweather constraint -- imperial is base
    returns: 
        weather_info (list): list of weather information needed
                            (temperature, weather_tyep)
    '''
    url = f'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={weather_api_key}&units={units}'

    url_text = requests.get(url).text
    weather_dict = json.loads(url_text)

    temperature = round(weather_dict['current']["temp"])
    weather_type = weather_dict['current']['weather'][0]['main'].lower()

    weather_info = [temperature, weather_type]

    return weather_info


def get_stories_from_source(source, n = 3):
    '''Returns the top three stories from the given source in a list format.
    
    :param source (str): the soruce of the news the user wants
    :param n (int): number of top stories to get
    
    :returns news (list): list of stories, in format of [[title, description]]
    
    '''
    response = newsapi.get_top_headlines(sources=source)
    i = 0
    news = []
    
    while i < n:
        story_title = response['articles'][i]['title']
        story_description = response['articles'][i]['description']
        
        news.append([story_title, story_description])
        
        i += 1
    return news


def get_stories_from_category(category, n = 3):
    '''Returns the top three stories from the given source in a list format.
    
    :param category (str): the category of the news the user wants
    :param n (int): number of top stories to get
    
    :returns news (list): list of stories, in format of [[title, description]]
    
    '''
    response = newsapi.get_top_headlines(category=category)
    i = 0
    news = []
    
    while i < n:
        story_title = response['articles'][i]['title']
        story_description = response['articles'][i]['description']
        
        news.append([story_title, story_description])
        
        i += 1
    return news