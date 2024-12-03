import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ReactModal from "react-modal";
import LoginForm from "./Components/Pages/LoginForm";
import "./App.css";

ReactModal.setAppElement("#root"); // For accessibility

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginClick = () => setLoginOpen(true);
  const closeModal = () => setLoginOpen(false);

  return (
    <Router>
      <Routes>
        {/* Pass the modal toggle function to AppLayout */}
        <Route path="/" element={<AppLayout onLoginClick={handleLoginClick} />} />
      </Routes>

      {/* Login Modal */}
      <ReactModal
        isOpen={isLoginOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          content: {
            width: "400px",
            height: "380px",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <LoginForm closeModal={closeModal} />
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
