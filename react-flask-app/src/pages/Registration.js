import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile-page.css";
import { Form, Button, Input, Select } from "antd";
import Profile from "../components/website-components/profile";
import NavBar from "../components/website-components/navbar.js";
import renderLogo from "../components/mirror-components/logoIconReference";

const Registration = () =>  {
  const { OptGroup, Option } = Select;

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
            setGotData(true);
        }

      });

  const handleFormSubmit = (values: any) => {
    values['user_id'] = 1;

    console.log("FORM SUBMIT");
    console.log(values);
    fetch('/api/registration', {method: 'POST',
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
          {!gotData ?
            <h1> loading </h1> :

                  <div className='loginContainer'>

                    <Form {...layout} onFinish={handleFormSubmit}>
                      <Form.Item label="First Name" name="first_name" >
                        <Input placeholder="" />
                      </Form.Item>
                      
                      <Form.Item label="Last Name" name="last_name" >
                        <Input placeholder="" />
                      </Form.Item>

                      <Form.Item label="Gmail" name="gmail" >
                        <Input placeholder="" />
                      </Form.Item>

                      <Form.Item label="Zipcode" name="zipcode" >
                        <Input placeholder="" />
                      </Form.Item>

                      <Form.Item label="Username" name="username" >
                        <Input placeholder=""/>
                      </Form.Item>

                      <Form.Item label="Password" name="password" >
                        <Input placeholder=""/>
                      </Form.Item>

                      <Form.Item label=" " name="gmail_login" >
                        <Button >
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

export default Registration;
