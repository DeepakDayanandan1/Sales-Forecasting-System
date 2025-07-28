import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      {/* Navbar */}
      <header className="flex items-center p-4 shadow bg-white">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="chart">📦</span>
          <span>Sales Forecasting</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-center h-[80vh] px-4">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900 via-green-700 to-green-600 text-white rounded-2xl shadow-lg p-10 w-full max-w-4xl text-center">
          <h2 className="text-5xl font-extrabold mb-4 drop-shadow">Sales Forecasting System</h2>
          <p className="mb-8 text-lg font-medium">Enter product and outlet details to forecast future sales.</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded font-semibold text-lg transition shadow"
            onClick={() => navigate('/forecast')}
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;