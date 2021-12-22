import React, {useState, useEffect} from "react";
import '../../styles/stockTicker.css';



function StockTicker() {
    const [stockInfo, setStockInfo] = useState({});
    var [gotData, setGotData] = useState(false);

    // stockInfo = {test: 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH'}
    
    useEffect(() =>  {
        if (!gotData) {
            fetch('/stocks', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                               // , "Content-Type": "application/x-www-form-urlencoded"}
                               body: JSON.stringify({'user_id': 1})}
            ).then(res => res.json()).then(data => {
                // setStockNames(data['stocks'])
                // console.log(data)
                setStockInfo(data);
                console.log(Object.keys(stockInfo))
                console.log(data)
                setGotData(true);
            });
        }
    });
    
    // TODO Figure out how to get multiple stocks to scroll across at once
    return (<div className='stock-container'>
                {!gotData ?
                    <div> loading </div> :
                    <div className='ticker-bar'>
                         {Object.keys(stockInfo).map((stock) => (
                                <div className='ticker-item'>
                                {stock} {stockInfo[stock].last_price} <span style={{color: stockInfo[stock].color}}> {stockInfo[stock].percent_return_daily} </span>
                                </div>
                         ))}
                    </div>
                }
            </div>
            );
    }
    
export default StockTicker;
