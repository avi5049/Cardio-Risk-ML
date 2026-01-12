"""
Cardiovascular Disease Risk Prediction API
Flask backend server that serves the XGBoost model for predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the trained XGBoost model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "cardio_model.pkl")

model = None

def load_model():
    """Load the trained model from pickle file"""
    global model
    try:
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        print(f"✓ Model loaded successfully from {MODEL_PATH}")
    except FileNotFoundError:
        print(f"✗ Model file not found at {MODEL_PATH}")
        raise
    except Exception as e:
        print(f"✗ Error loading model: {e}")
        raise

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Predict cardiovascular disease risk
    
    Expected JSON payload:
    {
        "gender": 0 or 1,
        "height": float,
        "weight": float,
        "ap_hi": int,
        "ap_lo": int,
        "cholesterol": 1, 2, or 3,
        "gluc": 1, 2, or 3,
        "smoke": 0 or 1,
        "alco": 0 or 1,
        "active": 0 or 1,
        "ageInYr": int,
        "bmi": float,
        "hypertension": 0 or 1,
        "obese": 0 or 1,
        "age_group": 0, 1, 2, 3, or 4
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Extract features in the exact order expected by the model
        features = np.array([[
            data.get("gender", 0),
            data.get("height", 165),
            data.get("weight", 70),
            data.get("ap_hi", 120),
            data.get("ap_lo", 80),
            data.get("cholesterol", 1),
            data.get("gluc", 1),
            data.get("smoke", 0),
            data.get("alco", 0),
            data.get("active", 1),
            data.get("ageInYr", 45),
            data.get("bmi", 25.0),
            data.get("hypertension", 0),
            data.get("obese", 0),
            data.get("age_group", 2)
        ]], dtype=float)
        
        # Make prediction
        prediction = int(model.predict(features)[0])
        
        # Get probability if available
        probability = None
        try:
            proba = model.predict_proba(features)[0]
            probability = float(proba[1])  # Probability of positive class (disease)
        except Exception:
            pass
        
        # Generate health recommendations based on input
        recommendations = generate_recommendations(data, prediction, probability)
        
        return jsonify({
            "prediction": prediction,
            "probability": probability,
            "risk_level": "High Risk" if prediction == 1 else "Low Risk",
            "recommendations": recommendations
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def generate_recommendations(data, prediction, probability):
    """Generate personalized health recommendations based on input data"""
    recommendations = []
    
    # Blood pressure recommendations
    ap_hi = data.get("ap_hi", 120)
    ap_lo = data.get("ap_lo", 80)
    if ap_hi >= 140 or ap_lo >= 90:
        recommendations.append({
            "category": "Blood Pressure",
            "icon": "🩺",
            "text": "Your blood pressure is elevated. Consider monitoring it regularly and consulting a healthcare provider."
        })
    
    # BMI recommendations
    bmi = data.get("bmi", 25)
    if bmi >= 30:
        recommendations.append({
            "category": "Weight Management",
            "icon": "⚖️",
            "text": "Your BMI indicates obesity. A balanced diet and regular exercise can help manage weight."
        })
    elif bmi >= 25:
        recommendations.append({
            "category": "Weight Management", 
            "icon": "⚖️",
            "text": "Your BMI indicates you're overweight. Consider lifestyle modifications for better health."
        })
    
    # Cholesterol recommendations
    if data.get("cholesterol", 1) >= 2:
        recommendations.append({
            "category": "Cholesterol",
            "icon": "🫀",
            "text": "Elevated cholesterol levels detected. Consider a heart-healthy diet low in saturated fats."
        })
    
    # Glucose recommendations
    if data.get("gluc", 1) >= 2:
        recommendations.append({
            "category": "Blood Sugar",
            "icon": "🍬",
            "text": "Elevated glucose levels detected. Monitor your sugar intake and consider regular testing."
        })
    
    # Smoking recommendations
    if data.get("smoke", 0) == 1:
        recommendations.append({
            "category": "Smoking",
            "icon": "🚭",
            "text": "Smoking significantly increases cardiovascular risk. Consider smoking cessation programs."
        })
    
    # Alcohol recommendations
    if data.get("alco", 0) == 1:
        recommendations.append({
            "category": "Alcohol",
            "icon": "🍷",
            "text": "Excessive alcohol consumption can affect heart health. Moderation is key."
        })
    
    # Physical activity recommendations
    if data.get("active", 1) == 0:
        recommendations.append({
            "category": "Physical Activity",
            "icon": "🏃",
            "text": "Physical inactivity is a risk factor. Aim for at least 150 minutes of moderate exercise weekly."
        })
    
    # Age-related recommendations
    if data.get("ageInYr", 45) >= 50:
        recommendations.append({
            "category": "Regular Checkups",
            "icon": "📋",
            "text": "Regular cardiovascular screenings are recommended for adults over 50."
        })
    
    # General recommendation based on risk level
    if prediction == 1:
        recommendations.insert(0, {
            "category": "Consult Doctor",
            "icon": "👨‍⚕️",
            "text": "Based on your risk factors, we recommend scheduling a consultation with a cardiologist."
        })
    else:
        recommendations.append({
            "category": "Maintain Health",
            "icon": "✅",
            "text": "Your risk appears low. Continue maintaining a healthy lifestyle!"
        })
    
    return recommendations

if __name__ == "__main__":
    load_model()
    print("\n🚀 Starting Cardiovascular Disease Prediction API...")
    print("📍 Server running at http://localhost:5000")
    print("📍 Predict endpoint: POST http://localhost:5000/api/predict")
    print("📍 Health check: GET http://localhost:5000/api/health\n")
    app.run(host="0.0.0.0", port=5000, debug=True)
