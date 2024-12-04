import React from "react";
import Navbar from "./Navbar";
import "./Header.css";

const Header = ({ onLoginClick, onSettingsClick }) => {
  return (
    <header className="header">
      <Navbar onLoginClick={onLoginClick} onSettingsClick={onSettingsClick} />
    </header>
  );
};

export default Header;



/*import React from 'react';
import Navbar from './Navbar';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Navbar />
    </header>
  );
};

export default Header;*/
