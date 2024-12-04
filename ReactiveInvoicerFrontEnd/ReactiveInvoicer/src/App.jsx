import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ReactModal from "react-modal";
import LoginForm from "./components/pages/LoginForm";
import SettingsForm from "./components/pages/SettingsForm";
import "./App.css";

ReactModal.setAppElement("#root");

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setLoginOpen(true);
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked");
    setSettingsOpen(true);
  };

  const closeLoginModal = () => setLoginOpen(false);
  const closeSettingsModal = () => setSettingsOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              onLoginClick={handleLoginClick}
              onSettingsClick={handleSettingsClick}
            />
          }
        />
      </Routes>

      {/* Login Modal */}
      <ReactModal
        isOpen={isLoginOpen}
        onRequestClose={closeLoginModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <LoginForm closeModal={closeLoginModal} />
      </ReactModal>

      {/* Settings Modal */}
      <ReactModal
        isOpen={isSettingsOpen}
        onRequestClose={closeSettingsModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            width: "400px",
            height: "300px",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <SettingsForm closeModal={closeSettingsModal} />
      </ReactModal>
    </Router>
  );
};

export default App;





/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout.jsx';  
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;*/
