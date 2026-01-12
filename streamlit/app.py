import streamlit as st
import pickle
import pandas as pd

# Load trained model
with open('cardio_model.pkl', 'rb') as f:
    model = pickle.load(f)

st.title("Cardio Risk Prediction App")
st.write("Enter your details below:")

# --- User Inputs ---
gender = st.selectbox("Gender", ["Male", "Female"])
height = st.number_input("Height (cm)", min_value=120, max_value=220, value=170)
weight = st.number_input("Weight (kg)", min_value=25, max_value=200, value=70)
ap_hi = st.number_input("Systolic BP (ap_hi)", min_value=70, max_value=250, value=120)
ap_lo = st.number_input("Diastolic BP (ap_lo)", min_value=40, max_value=150, value=80)
ageInYr = st.number_input("Age (years)", min_value=18, max_value=100, value=30)

# Optional features with default values
cholesterol = st.selectbox("Cholesterol (1=normal,2=above,3=high)", [1,2,3], index=0)
gluc = st.selectbox("Glucose (1=normal,2=above,3=high)", [1,2,3], index=0)
smoke = st.radio("Smoke?", [0,1], index=0)
alco = st.radio("Alcohol?", [0,1], index=0)
active = st.radio("Physically Active?", [0,1], index=1)

# --- Feature Engineering ---
# Encode gender
gender_encoded = 1 if gender == "Male" else 0

# BMI
bmi = round(weight / ((height/100)**2), 2)

# Hypertension
hypertension = 1 if (ap_hi >= 140 or ap_lo >= 90) else 0

# Obesity
obese = 1 if bmi >= 30 else 0

# Age group
if ageInYr < 30:
    age_group = 0
elif ageInYr < 45:
    age_group = 1
elif ageInYr < 60:
    age_group = 2
else:
    age_group = 3

# --- Prepare DataFrame in the exact order ---
input_data = pd.DataFrame([[gender_encoded, height, weight, ap_hi, ap_lo, cholesterol, gluc,
                            smoke, alco, active, ageInYr, bmi, hypertension, obese, age_group]],
                          columns=['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol',
                                   'gluc', 'smoke', 'alco', 'active', 'ageInYr', 'bmi', 
                                   'hypertension', 'obese', 'age_group'])

# --- Predict ---
if st.button("Predict Cardio Risk"):
    pred = model.predict(input_data)[0]
    prob = model.predict_proba(input_data)[0][1]

    if pred == 1:
        st.error(f"High Cardio Risk! Probability: {prob*100:.2f}%")
    else:
        st.success(f"Low Cardio Risk. Probability: {prob*100:.2f}%")

    st.write("Details entered:")
    st.json({
        "Gender": gender,
        "Height": height,
        "Weight": weight,
        "Systolic BP": ap_hi,
        "Diastolic BP": ap_lo,
        "Age": ageInYr,
        "Cholesterol": cholesterol,
        "Glucose": gluc,
        "Smoke": smoke,
        "Alcohol": alco,
        "Active": active,
        "BMI": bmi,
        "Hypertension": hypertension,
        "Obese": obese,
        "Age Group": age_group
    })
