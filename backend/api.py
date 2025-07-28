from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model, scaler, and feature columns
model = pickle.load(open("lr_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))
with open("feature_columns.pkl", "rb") as f:
    feature_columns = pickle.load(f)

# Constants from Colab for preprocessing
ITEM_VISIBILITY_MEAN = 0.06613202877895127
IQR_BOUNDS = {
    'Item_Weight': (4.28725, 16.71275),
    'Item_Visibility': (-0.0520, 0.2039),
    'Item_MRP': (93.8265, 310.8625)
}

# IQR clipping
def clip_iqr(val, lower, upper):
    return max(min(val, upper), lower)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract values from request
        item_weight = float(data.get('itemWeight', 1.5))
        item_visibility = float(data.get('itemVisibility', 0.05))
        item_mrp = float(data.get('itemMRP', 200.0))
        item_fat = data.get('fatContent', 'Low Fat')
        outlet_size = data.get('outletSize', 'Medium')
        outlet_loc = data.get('outletLocation', 'Tier 1')
        outlet_type = data.get('outletType', 'Supermarket Type1')
        new_item_type = data.get('itemType', 'Food')

        # Replace 0 visibility with mean
        if item_visibility == 0:
            item_visibility = ITEM_VISIBILITY_MEAN

        # Apply outlier clipping
        item_weight = clip_iqr(item_weight, *IQR_BOUNDS['Item_Weight'])
        item_visibility = clip_iqr(item_visibility, *IQR_BOUNDS['Item_Visibility'])
        item_mrp = clip_iqr(item_mrp, *IQR_BOUNDS['Item_MRP'])

        # Construct input dict
        input_data = {
            'Item_Weight': item_weight,
            'Item_Visibility': item_visibility,
            'Item_MRP': item_mrp,
            f'Item_Fat_Content_{item_fat}': 1,
            f'Outlet_Size_{outlet_size}': 1,
            f'Outlet_Location_Type_{outlet_loc}': 1,
            f'Outlet_Type_{outlet_type}': 1,
            f'New_Item_Type_{new_item_type}': 1
        }

        # Fill in missing dummy columns with 0s
        full_input = pd.DataFrame([input_data])
        full_input = full_input.reindex(columns=feature_columns, fill_value=0)

        # Scale numeric columns
        if hasattr(scaler, 'feature_names_in_'):
            num_cols = list(scaler.feature_names_in_)
        else:
            num_cols = ['Item_Weight', 'Item_Visibility', 'Item_MRP']
        full_input[num_cols] = scaler.transform(full_input[num_cols])

        # Predict
        prediction = model.predict(full_input)[0]

        return jsonify({
            'success': True,
            'prediction': round(prediction, 2),
            'message': f'Predicted Item Outlet Sales: ₹ {round(prediction, 2)}'
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'API is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 