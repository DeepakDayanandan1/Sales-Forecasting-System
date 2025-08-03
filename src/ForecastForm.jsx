import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ForecastForm() {
  const [formData, setFormData] = useState({
    itemWeight: '',
    itemVisibility: '',
    itemMRP: '',
    fatContent: 'Low Fat',
    outletSize: 'Medium',
    outletLocation: 'Tier 1',
    outletType: 'Supermarket Type1',
    itemType: 'Food',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
  formData.itemWeight.trim() === '' ||
  formData.itemVisibility.trim() === '' ||
  formData.itemMRP.trim() === ''
) {
  setShowValidationError(true);
  setTimeout(() => setShowValidationError(false), 3000); // hide after 3s
  return;
}
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/output', { state: { prediction: data.prediction, percentChange: data.percentChange ?? 0 } });
      } else {
        setError(data.error || 'Prediction failed');
      }
    } //catch (e) {
      //setError('Failed to connect to the server. Make sure the backend is running.');
    //}
     finally {
      setLoading(false);
    }
  };

  const isFormValid =
  formData.itemWeight.trim() !== '' &&
  formData.itemVisibility.trim() !== '' &&
  formData.itemMRP.trim() !== '';

  const buttonGroup = (field, options) => (
    <div className="flex flex-wrap gap-2 my-2">
      {options.map(option => (
        <button
          key={option}
          type="button"
          className={`px-4 py-2 rounded text-sm transition ${
            formData[field] === option
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 hover:bg-green-200'
          }`}
          onClick={() => handleChange(field, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex flex-row items-left p-1 shadow bg-white">
        <div className="text-xl font-bold flex items-center space-x-2">
          <img src="Logo1.svg" alt="Logo" className="w-20 h-18" />
          <Link to="/" className='text-2xl'>Sales Forecasting</Link>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto p-6">
        {/* <h2 className="text-3xl font-bold mb-4">Sales Forecasting System</h2> 
        <img
          src="sfff.jpg"
          alt="Sales Forecasting Banner"
          className="w-full h-60 object-cover rounded mb-6"
        />*/}
        <video
          src="GreenscreenMotion2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-60 object-cover object-bottom rounded mb-6"
        />

        {showValidationError && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 border-l-4 border-red-600 rounded shadow-md text-sm">
        ⚠️ Please fill in all required fields: Item Weight, Visibility, and MRP.
        </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Product Details</h3>
            <label className="block mb-1">Item Weight</label>
            <input
              type="number"
              step="0.1"
              placeholder="Enter weight"
              value={formData.itemWeight}
              onChange={e => handleChange('itemWeight', e.target.value)}
              className={`w-full border rounded p-2 text-sm ${
              showValidationError && formData.itemWeight.trim() === '' ? 'border-red-500' : ''
              }`}
              required
            />

            <label className="block mt-4 mb-1">Item Visibility</label>
            <input
              type="number"
              step="0.01"
              placeholder="Enter visibility"
              value={formData.itemVisibility}
              onChange={e => handleChange('itemVisibility', e.target.value)}
              className={`w-full border rounded p-2 text-sm ${
              showValidationError && formData.itemWeight.trim() === '' ? 'border-red-500' : ''
              }`}
              required
            />

            <label className="block mt-4 mb-1">Item MRP</label>
            <input
              type="number"
              step="1"
              placeholder="Enter MRP"
              value={formData.itemMRP}
              onChange={e => handleChange('itemMRP', e.target.value)}
              className={`w-full border rounded p-2 text-sm ${
              showValidationError && formData.itemWeight.trim() === '' ? 'border-red-500' : ''
              }`}
              required
            />

            <label className="block mt-4 mb-1">Item Fat Content</label>
            {buttonGroup('fatContent', ['Low Fat', 'Regular'])}

          </div>

          <div>
            <h3 className="font-semibold mb-2">Outlet Details</h3>
            <label className="block mb-1">Outlet Size</label>
            {buttonGroup('outletSize', ['Medium', 'High', 'Small'])}
            
            <label className="block mt-4 mb-1">Outlet Location</label>
            {buttonGroup('outletLocation', ['Tier 1', 'Tier 2', 'Tier 3'])}
            
            <label className="block mt-4 mb-1">Outlet Type</label>
            {buttonGroup('outletType', ['Supermarket Type1', 'Supermarket Type2', 'Supermarket Type3', 'Grocery Store'])}
          </div>

          <div>
            <h3 className="font-semibold mb-2">New Item Type</h3>
            {buttonGroup('itemType', ['Food', 'Drinks', 'Non-Consumables'])}
          </div>

          <div className="flex justify-center">
          <button
            type="submit" 
            disabled={loading}
            className={`px-8 py-3 rounded transition cursor-pointer font-semibold ${
              !isFormValid || loading
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-800'
            } text-white`}
            onClick={() => navigate('/output')}
          >
            {loading ? 'Processing...' : 'Forecast Sales'}
          </button>
          </div>
        </form>

        {/* Results */}
        {prediction && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              📊 Prediction Result
            </h3>
            <p className="text-2xl font-bold text-green-900">
              ₹ {prediction.toLocaleString()}
            </p>
            <p className="text-sm text-green-700 mt-1">
              Predicted Item Outlet Sales
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              ❌ Error
            </h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ForecastForm;