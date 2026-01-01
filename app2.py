# app.py
import streamlit as st
import numpy as np
import os
import pickle

# ----------------- CONFIG & LOAD MODEL -----------------
st.set_page_config(
    page_title="Cardio Risk Classifier",
    page_icon="🫀",
    layout="wide",
)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@st.cache_resource
def load_artifacts():
    model_path = os.path.join(BASE_DIR, "cardio_model.pkl")

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at: {model_path}")

    with open(model_path, "rb") as f:
        model = pickle.load(f)

    return model

# ADD THIS LINE after sidebar, before title
model = load_artifacts()




# ----------------- SIDEBAR -----------------
st.sidebar.title("🫀 Cardio Risk App")
st.sidebar.markdown(
    """
    - Binary classification: Disease / No Disease  
    - Enter patient details on the right  
    - Model trained on cardiovascular dataset
    """
)
# st.sidebar.info("This tool is for educational use only, not medical advice.")

# ----------------- MAIN TITLE -----------------
st.title("Cardiovascular Disease Risk Classifier")
st.markdown(
    "Provide patient **clinical details** below and click *Predict* to see the estimated risk."
)

# ----------------- INPUT FORM -----------------
with st.form("cardio_form", border=True):
    col1, col2, col3 = st.columns(3)

    with col1:
        gender = st.selectbox("Gender", ["Female", "Male"])
        height = st.number_input("Height (cm)", min_value=120, max_value=220, value=165)
        weight = st.number_input("Weight (kg)", min_value=30.0, max_value=200.0, value=70.0)
        ageInYr = st.number_input("Age (years)", min_value=18, max_value=100, value=45)
        age_group = st.selectbox(
            "Age Group",
            ["18-29", "30-44", "45-59", "60-74", "75+"],
            index=2,
        )

    with col2:
        ap_hi = st.number_input("Systolic BP (ap_hi)", min_value=80, max_value=250, value=120)
        ap_lo = st.number_input("Diastolic BP (ap_lo)", min_value=40, max_value=150, value=80)
        cholesterol = st.selectbox(
            "Cholesterol",
            ["Normal (1)", "Above Normal (2)", "Well Above Normal (3)"],
            index=0,
        )
        gluc = st.selectbox(
            "Glucose",
            ["Normal (1)", "Above Normal (2)", "Well Above Normal (3)"],
            index=0,
        )

    with col3:
        smoke = st.radio("Smokes?", ["No", "Yes"], horizontal=True)
        alco = st.radio("Alcohol use?", ["No", "Yes"], horizontal=True)
        active = st.radio("Physically active?", ["No", "Yes"], horizontal=True)
        bmi = st.number_input("BMI", min_value=10.0, max_value=60.0, value=25.0)
        hypertension = st.radio("Hypertension?", ["No", "Yes"], horizontal=True)
        obese = st.radio("Obese?", ["No", "Yes"], horizontal=True)

    submitted = st.form_submit_button("🔍 Predict Risk")

# ----------------- PREPROCESSING HELPERS -----------------
def encode_gender(x):
    # adapt to how you encoded during training
    return 1 if x == "Male" else 0

def encode_yes_no(x):
    return 1 if x == "Yes" else 0

def encode_cat_from_label(selected, mapping):
    # e.g. mapping = {"Normal (1)": 1, ...}
    return mapping[selected]

chol_map = {
    "Normal (1)": 1,
    "Above Normal (2)": 2,
    "Well Above Normal (3)": 3,
}
gluc_map = {
    "Normal (1)": 1,
    "Above Normal (2)": 2,
    "Well Above Normal (3)": 3,
}
age_group_map = {
    "18-29": 0,
    "30-44": 1,
    "45-59": 2,
    "60-74": 3,
    "75+": 4,
}

# ----------------- PREDICTION -----------------
if submitted:
    # Arrange features EXACTLY as in training
    X = np.array([[
        encode_gender(gender),   # gender
        height,                  # height
        weight,                  # weight
        ap_hi,                   # ap_hi
        ap_lo,                   # ap_lo
        encode_cat_from_label(cholesterol, chol_map),  # cholesterol
        encode_cat_from_label(gluc, gluc_map),         # gluc
        encode_yes_no(smoke),    # smoke
        encode_yes_no(alco),     # alco
        encode_yes_no(active),   # active
        ageInYr,                 # ageInYr
        bmi,                     # bmi
        encode_yes_no(hypertension),  # hypertension
        encode_yes_no(obese),         # obese
        age_group_map[age_group]      # age_group
    ]], dtype=float)



    proba = None
    try:
        proba = model.predict_proba(X)[0][1]
    except Exception:
        pass
    pred = model.predict(X)[0]

    # ----------------- DISPLAY RESULT -----------------
    st.subheader("Prediction Result")

    if pred == 1:
        st.error(f"High risk of cardiovascular disease detected.")
    else:
        st.success(f"Low risk of cardiovascular disease detected.")

    if proba is not None:
        st.metric(
            label="Estimated risk probability",
            value=f"{proba*100:.1f} %",
        )

    with st.expander("Show encoded feature vector"):
        st.write(X)
