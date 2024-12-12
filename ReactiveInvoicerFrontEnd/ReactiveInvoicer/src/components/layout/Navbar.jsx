import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaHome, FaCog, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onLoginClick, onSettingsClick }) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    token ? setIsLogin(true) : setIsLogin(false)
  }, [])


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
        {!isLogin && (
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
        )}
        {isLogin && (
          <button
            className="navbar-button"
            onClick={() => {
              localStorage.setItem("token", "")
              location.replace("/")

            }}
          >
            <FaSignInAlt />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
