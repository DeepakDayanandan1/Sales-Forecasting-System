import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OutputPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get prediction and percentChange from navigation state (default to demo values if not present)
  const prediction = location.state?.prediction ?? 0;
  //const percentChange = location.state?.percentChange ?? 15;

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      {/* Navbar */}
      <header className="flex items-center p-4 shadow bg-white">
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <span role="img" aria-label="chart">📦</span>
          <span>Sales Forecast</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h2 className="text-4xl font-extrabold mt-12 mb-4 text-center">Sales Forecast Results</h2>
        <p className="mb-8 text-lg text-center max-w-2xl">
          Based on the information you provided, our model predicts the following sales value for the specified product and outlet.
        </p>
        <div className="bg-[#e9eef6] rounded-xl shadow p-8 w-full max-w-2xl mb-8">
          <div className="text-gray-700 text-lg font-semibold mb-2">Predicted Sales Value</div>
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">₹{prediction.toLocaleString()}</div>
          {/*<div className="text-green-600 font-semibold text-lg">+{percentChange}%</div>*/}
        </div>
        <p className="text-gray-600 text-center mb-8 max-w-2xl">
          This prediction is based on historical data and the parameters you entered. Actual sales may vary depending on market conditions and other factors.
        </p>
        <button
          className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold text-lg transition"
          onClick={() => navigate('/forecast')}
        >
          Run Another Forecast
        </button>
      </main>
    </div>
  );
}

export default OutputPage; 