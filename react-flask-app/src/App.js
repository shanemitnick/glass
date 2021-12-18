import React, { useState, useEffect } from "react";
import LoginButton from "./components/login-button.js";
import './styles/App.css';

import { Route, Switch, Link, Redirect } from "react-router-dom";
import Mirror from './Mirror';
import Login from './Login';
import Test from "./pages/Test.js";
import ProtectedRoute from './protected-route';
import  NavBar  from "./components/navbar.js";



const App = () => {

  return (

    <div className="app-container">

      <NavBar />

      }
  </div>
  );
}


export default App;

// <h1>Bookkeeper</h1>
//   <ul>
//   <li> <Link to="Mirror"> Mirror </Link> </li>
//   </ul>
//
//
//   <Swtich>
//     <Route path="/Mirror" component={Mirror} />
//     <Route path="/" component={Test} />
//
//   </Switch>
//
//   <Login />
