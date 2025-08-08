#!/usr/bin/env python3
"""
Development server startup script
This script helps you start the Flask backend API server.
"""

import subprocess
import sys
import os
import time

from backend import app

def check_dependencies():
    """Check if required Python packages are installed"""
    try:
        import flask
        import flask_cors
        print("✅ Flask dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def start_backend():
    """Start the Flask backend server"""
    if not check_dependencies():
        return False
    
    print("🚀 Starting Flask backend server...")
    print("📡 Backend will be available at: http://localhost:5000")
    print("🔗 API endpoint: http://localhost:5000/api/predict")
    print("🏥 Health check: http://localhost:5000/api/health")
    print("\n" + "="*50)
    
    try:
        # Change to backend directory
        
        # Start Flask server
        subprocess.run([sys.executable, 'api.py'])
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")
        return False
    
    return True

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 
    print("🎯 Sales Forecasting Development Setup")
    print("="*50)
    
    # Start backend
    start_backend() 