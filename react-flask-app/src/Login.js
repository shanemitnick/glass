import React from "react";

//Login Box
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {isLoggedIn: false, username: "", password: ""};
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    fetch('/login', {method: 'POST',
                     headers: {"Content-Type": "application/json"},
                     // , "Content-Type": "application/x-www-form-urlencoded"}
                     body: JSON.stringify({'username': this.state.username,
                                          'password': this.state.password})}

    ).then(res => res.json()).then(data => {
        console.log(data);
        this.setState({weather: data.description});
        this.setState({temp: Math.round(data.temp)});
        console.log(data);
    });

  }

  render() {


    return (
      <div>
      {this.state.isLoggedIn ?
        <h1> LOGGED IN </h1>
        : <h1> NOT LOGGED IN </h1>
      }



      <form onSubmit={this.handleSubmit}>
        <label>
          username
          <input
            name="username"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          password
          <input
            name="password"
            type="text"
            onChange={this.handleInputChange} />
        </label>

        <input type="submit"/>
      </form>

      </div>
    );
  }

}

export default Login;
