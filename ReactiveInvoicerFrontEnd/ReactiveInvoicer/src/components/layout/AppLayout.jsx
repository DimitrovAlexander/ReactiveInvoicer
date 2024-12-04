import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./AppLayout.css";

const AppLayout = ({ onLoginClick }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Header onLoginClick={onLoginClick} />
      <div className="layout-content">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="main-content">
          <h1>Welcome to ReactiveInvoicer!</h1>
        </main>
      </div>
      <Footer isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default AppLayout;








/*import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./AppLayout.css";

const AppLayout = ({ onLoginClick }) => {
  return (
    <div className="app-layout">
      <Header onLoginClick={onLoginClick} />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">*/
          /*{*//* Add the main page content here *//*}*/
          /*<h1>Welcome to ReactiveInvoicer!</h1>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;*/