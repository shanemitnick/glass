import React from 'react';
import '../../styles/greetingBlock.css';

class GreetingBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date(),
                  greeting: 'Greetings',
                  first_name: 'User'};
  }

  componentDidMount() {


    console.log(this.state.first);

    fetch('/api/greeting', {method: 'POST',
                             headers: {'Content-Type': 'application/json'},
                             body: JSON.stringify({'user_id': 1})}
    ).then(res => res.json()).then(data => {
      console.log(data);
      this.setState({first_name: data.first_name});

      this.interval = setInterval(() => this.setState({ date: new Date(),
                                                        greeting: this.getTimeOfDay()}), 1000);
    });

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
    case 'PM':
      switch (true) {
        case hours <= 4: return 'Good Afternoon';
        case hours > 4: return 'Good Evening';
      }
    }
};


    render() {
        return (
          <section class='message-container'>
            <div class="message-frame">
                <h1 class='message-greeting'> { this.state.greeting }, {this.state.first_name} </h1>
            </div>
          </section>
        );
    }

};

export default GreetingBlock;
