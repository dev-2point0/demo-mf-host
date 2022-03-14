import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About/About";

const appRouting = (
  <div className="mf-host">
    <div className="mf-host-header">MF Host</div>
    <Router>
      <nav>
        <Link to="/" >Home</Link>
        <Link to="/about" >About US</Link>
      </nav>
      <div className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  </div>
);

export default appRouting;