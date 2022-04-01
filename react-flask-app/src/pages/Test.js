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
    fetch('/api/google/get_credentials', {method: 'GET',
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

    fetch('/api/settings', {method: 'POST',
                               headers: {"Content-Type": "application/json"},
                                      // , "Content-Type": "application/x-www-form-urlencoded"}
                              body: JSON.stringify(values)}

    ).then(res => res.json()).then(returnedData => {
        setData(returnedData);
        setGotData(true);
    });
  };


      return (
        <div>
        <NavBar />
        <Profile />
          {!gotData ?
            <h1> loading </h1> :

                  <div className='loginContainer'>

                    <Form {...layout} onFinish={handleFormSubmit}>
                      <Form.Item label="First Name" name="first_name" key='1-a'>
                        <Input placeholder={data.user.first_name}/>
                      </Form.Item>

                      <Form.Item label="Last Name" name="last_name" key='1-b' >
                        <Input placeholder={data.user.last_name}/>
                      </Form.Item>


                      <Form.Item label="Zipcode" name="zipcode" key='1-z'>
                        <Input placeholder={data.user.zipcode}/>
                      </Form.Item>

                      <Form.Item label="News" name="news_section" key='1-c'>
                        <Select
                          placeholder={data.other.news_section}
                          allowClear
                          showSearch
                        >
                          <Option key="1" value="all topics">All Topics</Option>
                          <Option key="2" value="arts">Arts</Option>
                          <Option key="3" value="automobiles">Automobiles</Option>
                          <Option key="4" value="books">Books</Option>
                          <Option key="5" value="business">Business</Option>
                          <Option key="6" value="fashion">Fashion</Option>
                          <Option key="7" value="food">Food</Option>
                          <Option key="8" value="health">Health</Option>
                          <Option key="9" value="home">Home</Option>
                          <Option key="10" value="insider">Insider</Option>
                          <Option key="11" value="magazine">Magazine</Option>
                          <Option key="12" value="movies">Movies</Option>
                          <Option key="13" value="nyregion">NYRegion</Option>
                          <Option key="14" value="obituaries">Obituaries</Option>
                          <Option key="15" value="opinion">Opinion</Option>
                          <Option key="16" value="politics">Politics</Option>
                          <Option key="17" value="realestate">Realestate</Option>
                          <Option key="17" value="science">Science</Option>
                          <Option key="18" value="sports">Sports</Option>
                          <Option key="19" value="sundayreview">Sunday Review</Option>
                          <Option key="20" value="technology">Technology</Option>
                          <Option key="21" value="theater">Theater</Option>
                          <Option key="22" value="t-magazine">Times Magazine</Option>
                          <Option key="23" value="travel">Travel</Option>
                          <Option key="24" value="upshot">Upshot</Option>
                          <Option key="25" value="us">U.S.</Option>
                          <Option key="26" value="world">World</Option>

                        </Select>
                      </Form.Item>

                      <Form.Item label="Favorite Teams" name="favorite_teams" key='1-e'>
                        <Select mode='multiple' allowClear={true} initialvalues={data.other.favorite_teams}>
                          {Object.keys(teams).map((league) => (
                            <OptGroup label={league}>
                            {Object.keys(teams[league]).map((team) => (
                              <Option value={teams[league][team]}> {renderLogo(league, teams[league][team], 10)} {teams[league][team]} </Option>
                            ))}
                            </OptGroup>
                          ))}

                        </Select>

                      </Form.Item>


                      <Form.Item label=" " name="gmail_login" key='1-f'>
                        <Button onClick={googleLogIn}>
                          Log Into Google
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button type="primary" htmlType="submit" key='1-g'>
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
