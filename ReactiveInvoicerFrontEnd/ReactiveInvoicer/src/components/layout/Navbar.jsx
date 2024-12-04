import React from "react";
import "./Navbar.css";
import { FaHome, FaCog, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick, onSettingsClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <FaHome className="navbar-icon" />
          <span>Home</span>
        </Link>
      </div>
      <div className="navbar-right">
        <button
          className="navbar-button"
          onClick={() => {
            console.log("Settings button clicked");
            onSettingsClick();
          }}
        >
          <FaCog />
          <span>Settings</span>
        </button>
        <button
          className="navbar-button"
          onClick={() => {
            console.log("Login button clicked");
            onLoginClick();
          }}
        >
          <FaSignInAlt />
          <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
