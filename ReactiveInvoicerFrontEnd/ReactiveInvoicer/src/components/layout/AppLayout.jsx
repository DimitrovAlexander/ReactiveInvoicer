import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

const AppLayout = ({ onLoginClick }) => {
  return (
    <div className="app-layout">
      <Header onLoginClick={onLoginClick} />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          {/* Add the main page content here */}
          <h1>Welcome to ReactiveInvoicer!</h1>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;