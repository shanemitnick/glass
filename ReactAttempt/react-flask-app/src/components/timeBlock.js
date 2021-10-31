import React from "react";
import './../styles/timeBlock.css';

class TimeBlock extends React.Component {

  render() {
    return (
      <div className='time-container'>
          <div className="time-digits">9:05 PM</div>
          <div className="time-date">Oct 30, 2021 </div>
      </div>

    );
  }
}

export default TimeBlock;
