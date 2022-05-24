import React, { useEffect, useState } from "react";
import {withRouter} from 'react-router-dom';
import { Row, Col } from 'antd';
import '../styles/Mirror.css';
import NewsBlock from '../components/mirror-components/newsBlock.js';
import TimeBlock from '../components/mirror-components/timeBlock.js';
// import WeatherBlock from '../components/mirror-components/weatherBlock.js';
// import ForecastBlock from '../components/mirror-components/forecastBlock.js';
import WeatherBlock from '../components/mirror-components/weatherBlock.js';
import GreetingBlock from '../components/mirror-components/greetingBlock.js';
import StockTicker from '../components/mirror-components/stockTicker.js';
// import SportsBlock from '../components/mirror-components/sportsBlock.js';
import CalendarBlock from '../components/mirror-components/calendarBlock.js';
// import DistanceBlock from '../components/mirror-components/distanceBlock';
import GmailBlock from '../components/mirror-components/gmailBlock';
import SmartLightBlock from '../components/mirror-components/LIFX/smartLightBlock';


const Mirror = () => {
    const [mirrorLayout, setMirrorLayout] = useState({})
    const [gotData, setGotData] = useState(false)

  // useEffect(() => {
  //   fetch('api/settings', {method: 'POST',
  //                          headers: {"Content-Type": "application/json"},
  //                          body: JSON.stringify({'user_id': 1})}
  //         ).then(res => res.json()).then(data => {
  //           console.log(data)
  //           setMirrorLayout(data.mirror)
  //           setGotData(true)
  //           })
  //   });
  
  return(<div> 
          {/* {!gotData ? */}
          {/* // <div>Black Screen</div> : */}
          <div className="mirror-contatiner">
                <Row className='top-row'>
                    <Col span={7} className='left-col'>
                        <TimeBlock />
                    </Col>
                    <Col span={10} className='middle-col'>
                        <GreetingBlock />

                    </Col>
                    <Col span={7} className='right-col'>
                        <WeatherBlock />
                    </Col>
                  </Row>

                  <Row className='middle-row'>
                    <Col span={7} className='left-col'>
                        <CalendarBlock />
                    </Col>

                    <Col span={10} className='middle-col'>
                        <SmartLightBlock />
                    </Col>

                    <Col span={7} className='right-col'>
                    </Col>
                  </Row>

                  <Row className='bottom-row'>
                    <Col span={7} className='left-col'>
                        <GmailBlock />

                    </Col>
                    <Col span={10} className='middle-col'>
                    </Col>
                    <Col span={7} className='right-col'>
                        {/* <SportsBlock /> */}
                        <NewsBlock/>

                    </Col>
                  </Row>
                  
                  <Row className='ticker-row'>
                    <Col className='ticker-col' span={24}>
                        <StockTicker />
                    </Col>
                  </Row>


            </div>
            {/* } */}
        </div>
        );
    }


export default withRouter(Mirror);

