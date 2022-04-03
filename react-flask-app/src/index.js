import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

import App from "./pages/App.js";
import Mirror from './pages/Mirror';
import Settings from "./pages/Settings.js";
import Registration from "./pages/Registration.js";

import ProtectedRoute from './auth/protected-route';


ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/Mirror" exact component={Mirror} />
        <Route path="/registration" component={Registration} />
        <ProtectedRoute path="/profile" component={Settings} />
      </Switch>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
