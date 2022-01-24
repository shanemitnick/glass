from wallstreet import Stock


from flask import current_app as app
from flask import jsonify

@app.route('/api/stocks', methods=["GET", "POST"])
def get_stock_prices():
    """ Gets the price and day's percent change for a list of stocks. """

    stocks = ['FB',
              'AMZN',
              'AAPL',
              'NFLX',
              'GOOGL',
              'VZ',
              'F',
              'TMUS',
              'JPM',
              'C',
              'DISH',
              'APD',
              'ABT',
              'T',
              'TSLA',
              'V',
              'JNJ'
            ]

    
    stock_info = {}
    for stock in stocks:
        stock_obj = Stock(stock)
        price = stock_obj.price
        percent_change = stock_obj.cp

        if percent_change > 0:
            color = 'green'
        elif percent_change < 0:
            color = 'red'
        else:
            color = 'white'

        stock_info[stock] = {'last_price': price,
                             'percent_return_daily': f'{round(percent_change, 2)}%',
                             'color': color}

    return stock_info
