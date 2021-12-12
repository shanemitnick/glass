import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from "./App.js";
import Mirror from "./Mirror.js";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/mirror" component={Mirror} />
  </Route>
);
