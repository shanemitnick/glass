import React, {useState, useEffect} from "react";
import '../../styles/stockTicker.css';



function StockTicker() {
    const [stockInfo, setStockInfo] = useState({});
    var [gotData, setGotData] = useState(false);

    useEffect(() =>  {
        if (!gotData) {
            fetch('/api/stocks', {method: 'POST',
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify()}
            ).then(res => res.json()).then(data => {
                setStockInfo(data);
                console.log(data)
                setGotData(true);
            });
        }
    });

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
