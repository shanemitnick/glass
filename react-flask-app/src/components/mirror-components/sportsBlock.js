import React, { useEffect, useState } from "react";
import '../../styles/sportsBlock.css'


function SportsBlock() {
    let [sportsGames, setSportsGames] = useState({});
    let [gotData,  setGotData] = useState(false);

    useEffect(() => {
        if (!gotData) {
        fetch('/sports', {method: 'POST',
                          headers: {"Content-Type": "application/json"},
                          // , "Content-Type": "application/x-www-form-urlencoded"}
                          body: JSON.stringify({'user_id': 1})}
            ).then(res => res.json()
            ).then(data => {
                console.log(data)
                setSportsGames(data);
                console.log(sportsGames);
                setGotData(true);
            });
        }
    });


    return (<div className="sports-container"> 
                {!gotData ?
                    <div> Loading </div> : 
                    <div className="league-containers">
                        {Object.keys(sportsGames).map((league) => (
                            <div className="league_container">
                                <div className='league-abbr' key={league}> 
                                    { league }
                                </div>
                                <div className='league-games'>
                                    {Object.keys(sportsGames[league]).map((game) => (
                                    <div className='league-game' key={game}> 
                                        <div className="'line-1"> 
                                            <p className='team'> {sportsGames[league][game].away_team} </p>
                                            <p className='event-date'> {sportsGames[league][game].date} </p>
                                        </div>
                                        <div className="line-2"> 
                                            <p className='team'> {sportsGames[league][game].home_team} </p>
                                            <p className='time'> {sportsGames[league][game].time} </p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            ))}
                        </div>
                        }
                    </div>)
 }


    // return (<div className="sports-ticker"> 
    //             {/* <div className="sports-game"> */}
    //             {!gotData ?
    //                 <div> Loading </div> : 
    //                 <div className="sports-game">
    //                     {Object.keys(sportsGames).map((game) => 
    //                     <div className='game-desc' key={game}> { game } </div>
                        
    //                     )}
    //                 </div>
    //             }
    //         {/* </div>   */}
    //     </div>)
    // }

export default SportsBlock

