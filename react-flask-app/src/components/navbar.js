import { React } from "react";
import "../styles/navbar.css";
import { Route, Switch, Link } from "react-router-dom"
import Mirror from '../Mirror';
import Test from "../pages/Test.js";
import AuthenticationButton from "./authentication-button.js";
const NavBar = () => {

  return (
    <div className='navbar-container'>
      <Link to="/" className='navbar-title'> glass </Link>
      
      <div className='navbar-links'>

        <div className='linkone'>
          <Link to="/profile" className="navbar-link-one"> PROFILE </Link>
        </div>

        <div className='linkone'>
                 <Link to="/Mirror" className="navbar-link-one"> Fire Up Mirror </Link>
        </div>

      </div>

      <div className='navbar-login'>
        <AuthenticationButton />
      </div>
    </div>
  );
};

export default NavBar;
