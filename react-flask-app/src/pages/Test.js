import React from "react";

class Test extends React.Component {

  async componentDidMount(){
    fetch('/login', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'username': 'User', 'password': 'Password'})}

    ).then(res => res.json()).then(data => {
        console.log(data);
        console.log(data);
    });
  }

  render() {
      return (
              <div className='loginContainer'>
                <h1> hello world. </h1>
              </div>
            );
    }
}

export default Test;
