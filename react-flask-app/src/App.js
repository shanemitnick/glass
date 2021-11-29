import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function App() {
  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/Mirror">Mirror</Link> |{" "}
        <Link to="/Test">Test</Link>
      </nav>
    </div>
  );
}
