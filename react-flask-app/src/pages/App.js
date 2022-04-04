import React from "react";
import '../styles/App.css';
import { Link } from "react-router-dom";
// import  NavBar  from "../components/website-components/navbar.js";
import Logo from "./Glass.svg";
import LogoLarge from "../assets/glass-large-text.png";


const App = () => {

  return (

    <div className="app-container">
      <header className="header-blue">
          <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search bg-white">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                      <img src={LogoLarge} width="auto" height="65px" style={{margin: "0px", padding: "0px"}}
                           className="d-inline-block align-top" alt="" />
                  </a>
                  <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                            <li className="navcol-5"/>
                          <li className="nav-item navcol-1"><Link to="/Profile" className='navbar-link' style={{fontSize: "25px"}}> profile </Link></li>
                          <li className="nav-item navcol-1"><Link to="/Profile" className='navbar-item' style={{fontSize: "25px"}}> shop </Link></li>
                          <li className="nav-item navcol-1"><Link to="/Profile" className='navbar-item' style={{fontSize: "25px"}}> contact us </Link></li>
                          <li className="nav-item navcol-1"><Link to="/Profile" className='navbar-item' style={{fontSize: "25px"}}> mailing list </Link></li>

              </div>
          </nav>
          <div className="container hero">
              <div className="row">
                  <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
                      <p>the new glass mirror</p>
                      <h1> <strong>Home. Schedule. News. Everything </strong> </h1>
                      <h1 className="text-white">Redefine Reflections</h1>
                  </div>
                  <div className="col-md-5 col-lg-5 lg-1 xl-0 d-none d-lg-block phone-holder">
                      <div className="phone-mockup"> <img className="device" src="assets/img/phone.svg" alt="Hero"/>
                          <div className="screen"></div>
                      </div>
                  </div>
              </div>
          </div>
      </header>
      <section className="features-boxed">
          <div className="container">
              <div className="intro">
                  <h2 className="text-center">Features </h2>
                  <p className="text-center">see what exactly our mirror can do.</p>
              </div>
              <div className="row justify-content-center features">
                  <div className="col-sm-12 col-md-6 col-lg-3 item" style={{height: "435px"}}>
                      <div className="box" style={{height: "95%"}}><i className="fa fa-rss icon"></i>
                          <h3 className="name">Smart Control for your Smart Home</h3>
                          <p className="description">Convenient access to your lights, doors, thermostat, and everything which makes your home comfortable</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-3 item" style={{height: "435px"}}>
                      <div className="box" style={{height: "95%"}}><i className="fa fa-calendar icon"></i>
                          <h3 className="name">A Schedule that Starts You Day</h3>
                          <p className="description">Your schedule, email, and news are all there, giving you the infromation to succeed during your day.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-3 item" style={{height: "435px"}}>
                      <div className="box" style={{height: "95%"}}><i className="fa fa-cloud icon"></i>
                          <h3 className="name">Say Goodbye to Tech without Design </h3>
                          <p className="description">A well-designed space should not be held back by its technology. </p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-3 item" style={{height: "435px"}}>
                      <div className="box" style={{height: "95%"}}><i className="fa fa-home icon"></i>
                          <h3 className="name">Sacrifice nothing for Security</h3>
                          <p className="description">Your home is private, and we take all means to provide you with the best in-class smart home security to keep your trust. </p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
              </div>
          </div>
          <section className="highlight-blue">
              <div className="container">
                  <div className="intro">
                      <h2 className="text-center">Coming soon.</h2>
                      <p className="text-center">Stay Up to Date. Become a Beta Tester.</p>
                  </div>
                  <div className="buttons"><a className="btn btn-primary" role="button" href="/">Im interested</a></div>
              </div>
          </section>
      </section>
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>


  </div>
  );
}


export default App;
