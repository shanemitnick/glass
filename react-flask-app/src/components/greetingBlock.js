import React from 'react';
import './../styles/greetingBlock.css';

class GreetingBlock extends React.Component {

    //Apologies for just copying the code, I understand JS pretty well now but still getting used to React and this was my easiest work around

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

    getTimeOfDay() {
    // Returns the Time in the correct Format
    const time = this.state.date;
    const hours = time.getHours() % 12;
    const meridium = ((time.getHours() < 12)? 'AM' : 'PM');

    switch (meridium) {
    case 'AM': return 'Good Morning';
    break;
    case 'PM': return 'Good Evening';
    break;
    default: return 'Greetings';
    break;
    };
};

    render() {
        return (
          <section class='message-container'>
            <div class="message-frame">
                <h1 class='message-greeting'> { this.getTimeOfDay() }, User </h1>
            </div>
          </section>
        );
    }

};

export default GreetingBlock;