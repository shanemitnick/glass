import React from "react";
import {withRouter} from 'react-router-dom';
import { Row, Col } from 'antd';
import '../styles/Mirror.css';
import NewsBlock from '../components/mirror-components/newsBlock.js';
import TimeBlock from '../components/mirror-components/timeBlock.js';
import WeatherBlock from '../components/mirror-components/weatherBlock.js';
import GreetingBlock from '../components/mirror-components/greetingBlock.js';
import ForecastBlock from '../components/mirror-components/forecastBlock.js';
import StockTicker from '../components/mirror-components/stockTicker.js';
import SportsBlock from '../components/mirror-components/sportsBlock.js';
import CalendarBlock from '../components/mirror-components/calendarBlock.js';



const RyanMirror = () => {

  return(
              <div className="mirror-contatiner">


                  <Row className='top-row'>
                    <Col span={7} className='left-col'>
                        <TimeBlock userId={1}/>
                    </Col>
                    <Col span={10} className='middle-col'>
                        <GreetingBlock userId={1}/>

                    </Col>
                    <Col span={7} className='right-col'>
                        <WeatherBlock userId={1}/>
                    </Col>
                  </Row>

                  <Row className='middle-row'>
                    <Col span={7} className='left-col'>
                        <SportsBlock userId={1}/>
                    </Col>
                    <Col span={10} className='middle-col'>
                    </Col>
                    <Col span={7} className='right-col'>
                        <ForecastBlock userId={1}/>
                    </Col>
                  </Row>

                  <Row className='bottom-row'>
                    <Col span={7} className='left-col'>
                        <NewsBlock userId={1} />
                    </Col>
                    <Col span={10} className='middle-col'>
                    </Col>
                    <Col span={7} className='right-col'>
                        <CalendarBlock userId={1}/>


                    </Col>
                  </Row>

                  <Row className='ticker-row'>
                    <Col className='ticker-col' span={24}>
                        <StockTicker userId={1}/>
                    </Col>
                  </Row>


              </div>
            );
    }


export default withRouter(RyanMirror);
