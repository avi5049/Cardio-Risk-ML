from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the trained XGBoost model
# In Vercel, the model will be in the same directory as the function
MODEL_PATH = os.path.join(os.path.dirname(__file__), "cardio_model.pkl")

model = None

def load_model():
    """Load the trained model from pickle file"""
    global model
    if model is not None:
        return
        
    try:
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        print(f"✓ Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"✗ Error loading model: {e}")
        # We don't raise here for serverless to avoid crash on startup, 
        # but predict will fail later which we handle.

@app.route("/api/health", methods=["GET"])
def health_check():
    load_model()
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        load_model()
        if model is None:
            return jsonify({"error": "Model not loaded on server"}), 500
            
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
        
        # Get probability
        probability = None
        try:
            proba = model.predict_proba(features)[0]
            probability = float(proba[1])
        except Exception:
            pass
        
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
    recommendations = []
    
    # Blood pressure
    ap_hi = data.get("ap_hi", 120)
    ap_lo = data.get("ap_lo", 80)
    if ap_hi >= 140 or ap_lo >= 90:
        recommendations.append({
            "category": "Blood Pressure",
            "icon": "🩺",
            "text": "Your blood pressure is elevated. Consider monitoring it regularly."
        })
    
    # BMI
    bmi = data.get("bmi", 25)
    if bmi >= 30:
        recommendations.append({
            "category": "Weight Management",
            "icon": "⚖️",
            "text": "Your BMI indicates obesity. Balanced diet and exercise are advised."
        })
    elif bmi >= 25:
        recommendations.append({
            "category": "Weight Management", 
            "icon": "⚖️",
            "text": "Your BMI indicates overweight. Lifestyle modifications recommended."
        })
    
    # Cholesterol
    if data.get("cholesterol", 1) >= 2:
        recommendations.append({
            "category": "Cholesterol",
            "icon": "🫀",
            "text": "Elevated cholesterol levels. Heart-healthy diet recommended."
        })
    
    # Glucose
    if data.get("gluc", 1) >= 2:
        recommendations.append({
            "category": "Blood Sugar",
            "icon": "🍬",
            "text": "Elevated glucose levels. Monitor sugar intake."
        })
    
    # Smoking
    if data.get("smoke", 0) == 1:
        recommendations.append({
            "category": "Smoking",
            "icon": "🚭",
            "text": "Smoking increases risk. Consider cessation programs."
        })
    
    # Alcohol
    if data.get("alco", 0) == 1:
        recommendations.append({
            "category": "Alcohol",
            "icon": "🍷",
            "text": "Moderate alcohol consumption for better heart health."
        })
    
    # Activity
    if data.get("active", 1) == 0:
        recommendations.append({
            "category": "Physical Activity",
            "icon": "🏃",
            "text": "Aim for at least 150 minutes of moderate exercise weekly."
        })
    
    # General
    if prediction == 1:
        recommendations.insert(0, {
            "category": "Consult Doctor",
            "icon": "👨‍⚕️",
            "text": "We recommend scheduling a consultation with a cardiologist."
        })
    else:
        recommendations.append({
            "category": "Maintain Health",
            "icon": "✅",
            "text": "Your risk appears low. Keep it up!"
        })
    
    return recommendations

# Vercel needs the app variable
# No app.run() needed for Vercel
if __name__ == "__main__":
    load_model()
    app.run(port=5000)
