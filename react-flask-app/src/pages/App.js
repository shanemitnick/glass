import React from "react";
import '../styles/App.css';
import { Link } from "react-router-dom";
import { PlasmicRootProvider, PlasmicComponent } from '@plasmicapp/loader-react';
import { PLASMIC } from '../../src/plasmic-init.ts';
// import  NavBar  from "../components/website-components/navbar.js";



function App() {
    return (
      <PlasmicRootProvider loader={PLASMIC}>
        <PlasmicComponent component="Webpage" />
      </PlasmicRootProvider>
    );
  }


export default App;
