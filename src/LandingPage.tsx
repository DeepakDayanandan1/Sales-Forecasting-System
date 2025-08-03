import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="flex flex-row items-left p-1 shadow bg-white">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <img src="Logo1.svg" alt="Logo" className="w-20 h-18" />
          <span className='text-2xl'>Sales Forecasting</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-3xl bg-gradient-to-br from-green-700 via-green-600 to-green-700 rounded-xl shadow-lg p-12 flex flex-col items-center">
          <h2 className="text-white text-4xl font-extrabold mb-4 text-center">Sales Forecasting System</h2>
          <p className="mb-8 text-lg text-white font-medium">Turn Your Data Into Growth—See Your Sales Future Now.</p>
          <button
            className="bg-white border-b-0 hover:bg-gray-100 text-green-600 px-8 py-3 rounded font-bold text-lg transition shadow cursor-pointer"
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