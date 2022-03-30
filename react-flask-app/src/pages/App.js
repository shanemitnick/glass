import React from "react";
import '../styles/App.css';
import { Link } from "react-router-dom";
// import  NavBar  from "../components/website-components/navbar.js";



const App = () => {

  return (

    <div className="app-container">
      <header className="header-blue">
          <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
              <div className="container-fluid"><a className="navbar-brand" href="/Profile">glass</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                  <div className="collapse navbar-collapse" id="navcol-1">
                      <ul className="navbar-nav">
                          <li className="nav-item"><Link to="/Profile" className='navbar-item'> profile </Link></li>
                      </ul>
                  </div>
              </div>
          </nav>
          <div className="container hero">
              <div className="row">
                  <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
                      <h1>adding information to your reflection</h1>
                      <p>your ultimate companion for getting ready.</p><button className="btn btn-light btn-lg action-button" type="button">Learn More</button>
                  </div>
                  <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
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
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fa fa-calendar icon"></i>
                          <h3 className="name">See your calendar</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fa fa-rss icon"></i>
                          <h3 className="name">View major news updates</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fa fa-mobile-phone icon"></i>
                          <h3 className="name">Customize on your phone</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fa fa-cloud icon"></i>
                          <h3 className="name">weather for day</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fab fa-spotify icon"></i>
                          <h3 className="name">See Spotify songs</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
                  <div className="col-sm-6 col-md-5 col-lg-4 item">
                      <div className="box"><i className="fas fa-user-friends icon"></i>
                          <h3 className="name">.. and your reflection</h3>
                          <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a className="learn-more" href="/">Learn more »</a>
                      </div>
                  </div>
              </div>
          </div>
          <section className="highlight-blue">
              <div className="container">
                  <div className="intro">
                      <h2 className="text-center">Coming soon.</h2>
                      <p className="text-center">Sign up for our interest form. Become a Beta Tester.</p>
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
