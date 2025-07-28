import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ForecastForm from './ForecastForm';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="flex items-center p-4 shadow bg-white">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="chart">📈</span>
          <span>Sales Forecast</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-center h-[80vh] px-4">
        <div className="bg-gradient-to-br from-green-900 to-green-600 text-white rounded-lg shadow-lg p-10 w-full max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Sales Forecasting System</h2>
          <p className="mb-6 text-lg">Enter product and outlet details to forecast future sales.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold transition"
            onClick={() => navigate('/forecast')}
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/forecast" element={<ForecastForm />} />
      </Routes>
    </Router>
  );
}

export default App
