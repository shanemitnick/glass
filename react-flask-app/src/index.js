import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './Test';
import Mirror from './Mirror';
import Login from './Login';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Mirror /> }/>
      <Route path="/Test" element={ <Test /> }/>
      <Route path="/App" element={ <App /> }/>
      <Route path="/Login" element={ <Login />} />


    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
