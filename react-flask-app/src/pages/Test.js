import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile-page.css";
import { Form, Button, Input, Select } from "antd";
import Profile from "../components/website-components/profile";
import NavBar from "../components/website-components/navbar.js";
import renderLogo from "../components/mirror-components/logoIconReference";

const Test = () =>  {
  const { OptGroup, Option } = Select;
  const teams = require("./../reference/sports_teams.json")
  console.log(teams)

  const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  };

  const { user } = useAuth0();
  const [form] = Form.useForm();

  const [ data, setData ] = useState();
  const  [ gotData, setGotData ] = useState(false);

  useEffect(() => {
    if (!gotData) {
        fetch('/api/settings', {method: 'POST',
                              headers: {"Content-Type": "application/json"},
                              // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify({'user_id': 1})}
        ).then(res => res.json()).then(returnedData => {
            setData(returnedData);
            setGotData(true);
        });
    }

  });

  const googleLogIn = () => {
    fetch('/api/calendar', {method: 'GET',
                      headers: {"Content-Type": "application/json",
                    'Accept': 'application/json'},
                      // , "Content-Type": "application/x-www-form-urlencoded"}
                    }
        ).then(res => res.json()
        ).then(data => {
            console.log(data);
            
        });
  };

  const handleFormSubmit = (values: any) => {
    values['user_id'] = 1;

    console.log("FORM SUBMIT");
    console.log(values);
    fetch('/api/settings', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify(values)}

    ).then(res => res.json()).then(returnedData => {
        setData(returnedData);
        setGotData(true);
    });
  };



  console.log(data);
      return (
        <div>
        <NavBar />
        <Profile />
          {!gotData ?
            <h1> loading </h1> :

                  <div className='loginContainer'>

                    <Form {...layout} onFinish={handleFormSubmit}>
                      <Form.Item label="First Name" name="first_name" >
                        <Input placeholder={data.user.first_name}/>
                      </Form.Item>

                      <Form.Item label="Last Name" name="last_name" >
                        <Input placeholder={data.user.last_name}/>
                      </Form.Item>


                      <Form.Item label="Zipcode" name="zipcode" >
                        <Input placeholder={data.user.zipcode}/>
                      </Form.Item>

                      <Form.Item label="News" name="news_section">
                        <Select
                          placeholder={data.other.news_section}
                          allowClear
                          showSearch
                        >
                          <Option value="all topics">All Topics</Option>
                          <Option value="arts">Arts</Option>
                          <Option value="automobiles">Automobiles</Option>
                          <Option value="books">Books</Option>
                          <Option value="business">Business</Option>
                          <Option value="fashion">Fashion</Option>
                          <Option value="food">Food</Option>
                          <Option value="health">Health</Option>
                          <Option value="home">Home</Option>
                          <Option value="insider">Insider</Option>
                          <Option value="magazine">Magazine</Option>
                          <Option value="movies">Movies</Option>
                          <Option value="nyregion">NYRegion</Option>
                          <Option value="obituaries">Obituaries</Option>
                          <Option value="opinion">Opinion</Option>
                          <Option value="politics">Politics</Option>
                          <Option value="realestate">Realestate</Option>
                          <Option value="science">Science</Option>
                          <Option value="sports">Sports</Option>
                          <Option value="sundayreview">Sunday Review</Option>
                          <Option value="technology">Technology</Option>
                          <Option value="theater">Theater</Option>
                          <Option value="t-magazine">Times Magazine</Option>
                          <Option value="travel">Travel</Option>
                          <Option value="upshot">Upshot</Option>
                          <Option value="us">U.S.</Option>
                          <Option value="world">World</Option>

                        </Select>
                      </Form.Item>

                      <Form.Item label="Favorite Teams" name="favorite_teams">
                        <Select mode='multiple' allowClear={true} defaultValue={data.other.favorite_teams}>
                          {Object.keys(teams).map((league) => (
                            <OptGroup label={league}>
                            {Object.keys(teams[league]).map((team) => (
                              <Option value={teams[league][team]}> {renderLogo(league, teams[league][team], 10)} {teams[league][team]} </Option>
                            ))}
                            </OptGroup>
                          ))}

                        </Select>

                      </Form.Item>


                      <Form.Item label=" " name="gmail_login" >
                        <Button onClick={googleLogIn}>
                          Log Into Google
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                      </Form.Item>
                    </Form>



                    </div>
                }
        </div>
            );

}

export default Test;
