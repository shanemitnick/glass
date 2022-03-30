import React from "react";
import '../styles/App.css';
import { Link } from "react-router-dom";
// import  NavBar  from "../components/website-components/navbar.js";



const App = () => {

  return (

    <div className="app-container">
      <header class="header-blue">
          <nav class="navbar navbar-dark navbar-expand-md navigation-clean-search">
              <div class="container-fluid"><a class="navbar-brand" href="#">glass</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navcol-1">
                      <ul class="navbar-nav">
                          <li class="nav-item"><Link to="/Profile" className='navbar-item'> profile </Link></li>
                      </ul>
                  </div>
              </div>
          </nav>
          <div class="container hero">
              <div class="row">
                  <div class="col-12 col-lg-6 col-xl-5 offset-xl-1">
                      <h1>adding information to your reflection</h1>
                      <p>your ultimate companion for getting ready.</p><button class="btn btn-light btn-lg action-button" type="button">Learn More</button>
                  </div>
                  <div class="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
                      <div class="phone-mockup"><img class="device" src="assets/img/phone.svg"/>
                          <div class="screen"></div>
                      </div>
                  </div>
              </div>
          </div>
      </header>
      <section class="features-boxed">
          <div class="container">
              <div class="intro">
                  <h2 class="text-center">Features </h2>
                  <p class="text-center">see what exactly our mirror can do.</p>
              </div>
              <div class="row justify-content-center features">
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fa fa-calendar icon"></i>
                          <h3 class="name">See your calendar</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fa fa-rss icon"></i>
                          <h3 class="name">View major news updates</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fa fa-mobile-phone icon"></i>
                          <h3 class="name">Customize on your phone</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fa fa-cloud icon"></i>
                          <h3 class="name">weather for day</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fab fa-spotify icon"></i>
                          <h3 class="name">See Spotify songs</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
                  <div class="col-sm-6 col-md-5 col-lg-4 item">
                      <div class="box"><i class="fas fa-user-friends icon"></i>
                          <h3 class="name">.. and your reflection</h3>
                          <p class="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu.</p><a class="learn-more" href="#">Learn more »</a>
                      </div>
                  </div>
              </div>
          </div>
          <section class="highlight-blue">
              <div class="container">
                  <div class="intro">
                      <h2 class="text-center">Coming soon.</h2>
                      <p class="text-center">Sign up for our interest form. Become a Beta Tester.</p>
                  </div>
                  <div class="buttons"><a class="btn btn-primary" role="button" href="#">Im interested</a></div>
              </div>
          </section>
      </section>
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/bootstrap/js/bootstrap.min.js"></script>


  </div>
  );
}


export default App;
