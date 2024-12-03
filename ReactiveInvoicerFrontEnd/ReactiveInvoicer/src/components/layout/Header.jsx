import React from "react";
import Navbar from "./Navbar";
import "./Header.css";

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <Navbar onLoginClick={onLoginClick} />
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
