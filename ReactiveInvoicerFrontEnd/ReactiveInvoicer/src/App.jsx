import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ReactModal from "react-modal";
import LoginForm from "./components/pages/LoginForm";
import SettingsForm from "./components/pages/SettingsForm";
import CreateContractor from "./components/pages/CreateContractor";
import ContractorViewTable from "./components/pages/ContractorViewTable"; 
import CreateInvoice from "./components/pages/CreateInvoice"; // Нов компонент
import InvoiceTableView from "./components/pages/InvoicesViewTable";

import "./App.css";

ReactModal.setAppElement("#root");

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const handleSettingsClick = () => {
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
        <Route path="/create-contractor" element={<CreateContractor />} />
        <Route path="/modify-existing" element={<ContractorViewTable />} />
        <Route path="/create-invoice" element={<CreateInvoice />} /> {/* Нов маршрут */}
        <Route path="/modify-invoice" element={<InvoiceTableView />} /> {/* Нов маршрут */}
      </Routes>

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
