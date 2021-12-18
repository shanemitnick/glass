import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

import App from "./App.js";
import Mirror from './Mirror';
import Test from "./pages/Test.js";

import ProtectedRoute from './protected-route';


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Switch>

        <Route path="/" exact component={App} />
        <Route path="/Mirror" exact component={Mirror} />
        <ProtectedRoute path="/profile" component={Test} />

      </Switch>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



// <BrowserRouter>
//   <Routes>
//     <Route path="/" element={ <Test /> } />
//     <Route path="/Mirror" element={ <Mirror /> } />
//     <Route path="/App" element={ <App /> } />
//     <Route path="/Login" element={ <Login /> } />
//
//
//   </Routes>
// </BrowserRouter>
