import React from "react";
import '../../styles/timeBlock.css';

class TimeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ date: new Date() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTime() {
    // Returns the Time in the correct Format
    const time = this.state.date;
    let hours = time.getHours() % 12;

    if (hours === 0 ) {hours = 12};

    const minutes = ((time.getMinutes() < 10)? '0' + time.getMinutes() : time.getMinutes());
    //const seconds = ((time.getSeconds() < 10)? '0' + time.getSeconds() : time.getSeconds());
    //const meridium = ((time.getHours() < 12)? 'AM' : 'PM');

    return hours + ":" + minutes;
  }

  getDate() {
    // Returns the Day in the correct Format
    const time = this.state.date;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const month = monthNames[time.getMonth()];
    const date = time.getDate();
    const dayOfWeek = time.getDay();
    var day = '';

    switch( dayOfWeek ) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
        default:
            return 'Funday'
    }

    return day + ", " + month + " " + date;
  }

  render() {
    return (
      <div className='time-container'>
          <div className="time-digits"> { this.getTime() } </div>
          <div className="time-date"> { this.getDate() } </div>
      </div>

    );
  }
}

export default TimeBlock;
