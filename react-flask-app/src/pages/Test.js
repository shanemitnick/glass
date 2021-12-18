import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile-page.css";
import { Button, Input } from "antd";
import Profile from "../components/website-components/profile";
import NavBar from "../components/website-components/navbar.js";


const Test = () =>  {

  const { user } = useAuth0();
  const { name, email } = user;
  useEffect(() => {
    fetch('/profile/settings', {method: 'POST',
                                headers: {"Content-Type": "application/json"},
                                // , "Content-Type": "application/x-www-form-urlencoded"}
                                body: JSON.stringify({'user_id': 1,
                                                      'first_name': 'Jacob',
                                                      'section': 'sports'
                                                    })}
    ).then(res => res.json()).then(data => {
        console.log(data);
        console.log(data);
    });
    console.log("USER");
    console.log(user);
    console.log(email);
  });

      return (
        <div>
        <NavBar />
        <Profile />
              <div className='loginContainer'>
                <h1> hello world. </h1>
                <Button type="dashed">
                    Download
                </Button>

                <Input className="input-button" placeholder="zipcode" />
                </div>
        </div>
            );

}

export default Test;
