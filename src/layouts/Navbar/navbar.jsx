import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./navbar.css";
import { useState } from "react";
import logo from '../../assets/logo.jpeg';


  const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);


  
  
    return ( <div className = "landing-section"> 
    <header className="header-navbar">
    <div className="container">
    <div className="header_logo-title">
    <img src={logo} alt="Company Logo" className="header_logo" />
      <h1 className="header_title">360° MarkBanch</h1>
      </div>
      <nav className="header_nav">
        <ul className="header_nav-list">
          <li className="header_nav-item">
            <Link to="/" className="header_nav-link" >Home</Link>
          </li>
          <li className="header_nav-item">
            <Link to="/about" className="header_nav-link">About</Link>
          </li>
          <li className="header_nav-item">
            <Link to="/features" className="header_nav-link">Features</Link>
          </li>
          <li className="header_nav-item">
            <Link to="/solution" className="header_nav-link">Solutions</Link>
          </li>
          <li className="header_nav-item">
            <Link to="/login" className="header_nav-link">Login</Link>
          </li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </div> 
  );
}
 
export default Navbar;
