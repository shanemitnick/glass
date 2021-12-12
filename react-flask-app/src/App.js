import React, { useState, useEffect } from "react";
import LoginButton from "./components/login-button.js";
import './styles/App.css';

import { Route, Switch, Link, Redirect } from "react-router-dom";
import Mirror from './Mirror';
import Login from './Login';
import Test from "./pages/Test.js";
import ProtectedRoute from './protected-route';



const App = () => {

  return (

    <div>


      <div id="app" className="d-flex flex-column h-100">
        <div className="container flex-grow-1">

            <ul>
                  <li> <Link to="/profile"> PROFILE </Link> </li>
                  <li> <Link to="/Mirror" > Fire Up Mirror> </Link> </li>

            </ul>
             <Switch>
               <Route path="/" exact component={Login} />
               <ProtectedRoute path="/profile" component={Test} />
               <Route path="/Mirror"> <Mirror /> </Route>
             </Switch>
          </div>

        </div>

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
