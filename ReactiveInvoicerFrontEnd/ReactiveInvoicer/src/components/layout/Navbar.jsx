import React from "react";
import "./Navbar.css";
import { FaHome, FaCog, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <FaHome className="navbar-icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="navbar-right">
        <button className="navbar-button">
          <FaCog />
          <span>Settings</span>
        </button>
        {/* The Login button opens the modal without navigating */}
        <button className="navbar-button" onClick={onLoginClick}>
          <FaSignInAlt />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
