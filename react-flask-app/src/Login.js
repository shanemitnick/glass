import React, { Component } from "react";

//Login Box
class Login extends React.Component {

  constructor(props) {
    super(props);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
  }

  handleSubmit(event) {
    const target = event.target;


    this.setState({
      username: target.username, password: target.password
    });
  }

  render() {
    return (
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

        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default Login;
