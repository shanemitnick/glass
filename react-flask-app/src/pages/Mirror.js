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
import DistanceBlock from '../components/mirror-components/distanceBlock';


const Mirror = () => {

  return(
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
                    </Col>
                    <Col span={7} className='right-col'>
                        <ForecastBlock />
                    </Col>
                  </Row>

                  <Row className='bottom-row'>
                    <Col span={7} className='left-col'>
                        <NewsBlock/>
                    </Col>
                    <Col span={10} className='middle-col'>
                    </Col>
                    <Col span={7} className='right-col'>
                        <SportsBlock />


                    </Col>
                  </Row>

                  <Row className='ticker-row'>
                    <Col className='ticker-col' span={24}>
                        <StockTicker />
                    </Col>
                  </Row>


              </div>
            );
    }


export default withRouter(Mirror);

