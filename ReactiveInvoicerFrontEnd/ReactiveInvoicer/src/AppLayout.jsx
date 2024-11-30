import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <Sidebar />
        <div className="main-content">
          <h1>Welcome to the App</h1>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
