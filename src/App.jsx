import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import ForecastForm from './ForecastForm';
import LandingPage from './LandingPage';
import OutputPage from './OutputPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forecast" element={<ForecastForm />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </Router>
  );
}

export default App