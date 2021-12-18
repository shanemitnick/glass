import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/profile-page.css";
import { Form, Button, Input, Select } from "antd";
import Profile from "../components/website-components/profile";
import NavBar from "../components/website-components/navbar.js";


const Test = () =>  {
  const { Option } = Select;

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
        fetch('/profile/settings', {method: 'POST',
                                   headers: {"Content-Type": "application/json"},
                                          // , "Content-Type": "application/x-www-form-urlencoded"}
                                  body: JSON.stringify({'user_id': 1})}

        ).then(res => res.json()).then(returnedData => {
            setData(returnedData);
            setGotData(true);
        });
    }

  });



  const handleFormSubmit = (values: any) => {
    console.log("SUBMTT");
    console.log(values);
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
                      <Form.Item label="First Name"name="first_name" >
                        <Input placeholder={data.first_name}/>
                      </Form.Item>

                      <Form.Item label="Last Name"name="last_name" >
                        <Input placeholder={data.last_name}/>
                      </Form.Item>


                      <Form.Item label="Zipcode"name="zipcode" >
                        <Input placeholder={data.zipcode}/>
                      </Form.Item>

                      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                          placeholder={data.news_section}

                          allowClear
                        >
                          <Option value="sports">sports</Option>
                          <Option value="politics">politics</Option>
                          <Option value="other">other</Option>
                        </Select>
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
