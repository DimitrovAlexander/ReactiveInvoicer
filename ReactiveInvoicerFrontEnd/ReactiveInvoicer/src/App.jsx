import React from 'react';
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

export default App;
