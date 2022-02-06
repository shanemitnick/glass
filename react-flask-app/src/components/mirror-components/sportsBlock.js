import React, { useEffect, useState } from "react";
import '../../styles/sportsBlock.css'
import renderLogo from "./logoIconReference";

function SportsBlock() {
    let [sportsGames, setSportsGames] = useState({});
    let [gotData,  setGotData] = useState(false);

    useEffect(() => {
        if (!gotData) {
        fetch('/api/sports', {method: 'POST',
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

    return (<div className="sports">
                {!gotData ?
                    <div> Loading </div> : 
                    <div className="league-containers">
                        {Object.keys(sportsGames).map((league) => (
                            <div className="league-container">
                                <div className='league-abbr' key={league}>
                                    { league }
                                </div>
                                <div className='league-games'>
                                    {Object.keys(sportsGames[league]).map((game) => (
                                    <div className='league-game' key={game}>
                                        <div className='game-details'>
                                            <div className="teams">
                                                <ul className='teams-list'>
                                                    <li className='team'>
                                                        {/* <div className='logo>'> <NBAIcons.SAS size={20} /> </div> */}
                                                        <div className='logo>'> {renderLogo(league, sportsGames[league][game].away_abbr, 20)} </div>
                                                        <div className='name'> {sportsGames[league][game].away_abbr} </div>
                                                        <div className='record-score'> {sportsGames[league][game].away_score} </div>
                                                    </li>
                                                    <li className='team'>
                                                        <div className='logo>'> {renderLogo(league, sportsGames[league][game].home_abbr, 20)} </div>
                                                        <div className='name'> {sportsGames[league][game].home_abbr} </div>
                                                        <div className='record-score'> {sportsGames[league][game].home_score} </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="play-time">
                                                <div className='time'> {sportsGames[league][game].time} </div>
                                                <div className='gamedate'> {sportsGames[league][game].date} </div>
                                            </div>
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

export default SportsBlock

