# Sales Forecasting System

A full-stack application with a React frontend and Python Flask backend for sales prediction.

## 🏗️ Architecture

- **Frontend**: Vite + React (TypeScript/JavaScript)
- **Backend**: Flask API with ML model
- **Communication**: REST API with CORS enabled

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies
npm install
```

### 2. Start the Backend

```bash
# Option 1: Use the helper script
python start_dev.py

# Option 2: Manual start
cd backend
python api.py
```

The backend will start on `http://localhost:5000`

### 3. Start the Frontend

In a new terminal:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Test the Connection

1. Open your browser to `http://localhost:5173`
2. Navigate to the forecast form
3. Fill in the form and submit
4. You should see the prediction result from the ML model

## 📡 API Endpoints

- `POST /api/predict` - Get sales prediction
- `GET /api/health` - Health check

## 🔧 Development

### Backend Development
- The Flask API is in `backend/api.py`
- ML model files: `lr_model.pkl`, `scaler.pkl`, `feature_columns.pkl`
- API supports CORS for frontend communication

### Frontend Development
- React components in `src/`
- Uses Tailwind CSS for styling
- Form validation and error handling included

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running on port 5000
2. **Connection Failed**: Check if both servers are running
3. **Model Loading Error**: Ensure all `.pkl` files are in the `backend/` directory

### Debug Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test prediction endpoint
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"itemWeight": 1.5, "itemVisibility": 0.05, "itemMRP": 200}'
```

## 📁 Project Structure

```
SF/
├── backend/
│   ├── api.py              # Flask API server
│   ├── app.py              # Original Streamlit app
│   ├── lr_model.pkl        # ML model
│   ├── scaler.pkl          # Data scaler
│   └── feature_columns.pkl # Feature columns
├── src/
│   ├── App.jsx             # Main React app
│   ├── ForecastForm.jsx    # Prediction form
│   └── LandingPage.tsx     # Landing page
├── package.json            # Node.js dependencies
├── requirements.txt        # Python dependencies
└── start_dev.py           # Development helper script
```

## 🎯 Features

- ✅ Real-time ML predictions
- ✅ Modern React UI with Tailwind CSS
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ CORS-enabled API communication
- ✅ Health check endpoints
