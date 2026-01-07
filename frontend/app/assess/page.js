"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AssessmentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    gender: "Male",
    height: 170,
    weight: 70,
    ageInYr: 45,
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: "1",
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "1",
  });

  // Calculate derived features
  const calculateBMI = () => {
    const heightM = formData.height / 100;
    return (formData.weight / (heightM * heightM)).toFixed(1);
  };

  const getHypertension = () => {
    return formData.ap_hi >= 140 || formData.ap_lo >= 90 ? 1 : 0;
  };

  const getObese = () => {
    return parseFloat(calculateBMI()) >= 30 ? 1 : 0;
  };

  const getAgeGroup = () => {
    const age = formData.ageInYr;
    if (age < 30) return 0;
    if (age < 45) return 1;
    if (age < 60) return 2;
    if (age < 75) return 3;
    return 4;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const requestData = {
        gender: formData.gender === "Male" ? 1 : 0,
        height: formData.height,
        weight: formData.weight,
        ap_hi: formData.ap_hi,
        ap_lo: formData.ap_lo,
        cholesterol: parseInt(formData.cholesterol),
        gluc: parseInt(formData.gluc),
        smoke: parseInt(formData.smoke),
        alco: parseInt(formData.alco),
        active: parseInt(formData.active),
        ageInYr: formData.ageInYr,
        bmi: parseFloat(calculateBMI()),
        hypertension: getHypertension(),
        obese: getObese(),
        age_group: getAgeGroup(),
      };

      // Call Flask API (Uses relative URL for Vercel compatibility)
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Prediction failed. Please try again.");
      }

      const result = await response.json();

      // Store results and navigate
      sessionStorage.setItem(
        "predictionResult",
        JSON.stringify({
          ...result,
          inputData: requestData,
        })
      );

      router.push("/results");
    } catch (err) {
      setError(
        err.message || "Failed to connect to the prediction server. Make sure the Flask API is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Assessment</span>
          <h1 className="section-title">Cardiovascular Risk Assessment</h1>
          <p className="section-description">
            Fill in your health details below to get your personalized risk
            prediction. All fields are required for accurate results.
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid var(--danger)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              marginBottom: "24px",
              textAlign: "center",
              color: "var(--danger-light)",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="card" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Personal Information */}
            <h3 style={{ marginBottom: "24px", color: "var(--primary-light)" }}>
              👤 Personal Information
            </h3>
            <div className="grid grid-3" style={{ marginBottom: "40px" }}>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Age (years)</label>
                <input
                  type="number"
                  name="ageInYr"
                  className="form-input"
                  value={formData.ageInYr}
                  onChange={handleInputChange}
                  min="18"
                  max="100"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  className="form-input"
                  value={formData.height}
                  onChange={handleInputChange}
                  min="120"
                  max="220"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className="form-input"
                  value={formData.weight}
                  onChange={handleInputChange}
                  min="30"
                  max="200"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  BMI (auto-calculated)
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={calculateBMI()}
                  disabled
                  style={{ opacity: 0.7 }}
                />
              </div>
            </div>

            {/* Blood Pressure */}
            <h3 style={{ marginBottom: "24px", color: "var(--primary-light)" }}>
              🩺 Blood Pressure
            </h3>
            <div className="grid grid-3" style={{ marginBottom: "40px" }}>
              <div className="form-group">
                <label className="form-label">Systolic BP (ap_hi)</label>
                <input
                  type="number"
                  name="ap_hi"
                  className="form-input"
                  value={formData.ap_hi}
                  onChange={handleInputChange}
                  min="80"
                  max="250"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Diastolic BP (ap_lo)</label>
                <input
                  type="number"
                  name="ap_lo"
                  className="form-input"
                  value={formData.ap_lo}
                  onChange={handleInputChange}
                  min="40"
                  max="150"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hypertension Status</label>
                <input
                  type="text"
                  className="form-input"
                  value={getHypertension() ? "Yes (Elevated)" : "No (Normal)"}
                  disabled
                  style={{
                    opacity: 0.7,
                    color: getHypertension()
                      ? "var(--danger-light)"
                      : "var(--secondary-light)",
                  }}
                />
              </div>
            </div>

            {/* Health Indicators */}
            <h3 style={{ marginBottom: "24px", color: "var(--primary-light)" }}>
              📊 Health Indicators
            </h3>
            <div className="grid grid-2" style={{ marginBottom: "40px" }}>
              <div className="form-group">
                <label className="form-label">Cholesterol Level</label>
                <select
                  name="cholesterol"
                  className="form-select"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                >
                  <option value="1">Normal (1)</option>
                  <option value="2">Above Normal (2)</option>
                  <option value="3">Well Above Normal (3)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Glucose Level</label>
                <select
                  name="gluc"
                  className="form-select"
                  value={formData.gluc}
                  onChange={handleInputChange}
                >
                  <option value="1">Normal (1)</option>
                  <option value="2">Above Normal (2)</option>
                  <option value="3">Well Above Normal (3)</option>
                </select>
              </div>
            </div>

            {/* Lifestyle Factors */}
            <h3 style={{ marginBottom: "24px", color: "var(--primary-light)" }}>
              🏃 Lifestyle Factors
            </h3>
            <div className="grid grid-3" style={{ marginBottom: "40px" }}>
              <div className="form-group">
                <label className="form-label">Do you smoke?</label>
                <div className="toggle-group">
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="smoke-no"
                      name="smoke"
                      value="0"
                      className="toggle-input"
                      checked={formData.smoke === "0"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="smoke-no" className="toggle-label">
                      No
                    </label>
                  </div>
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="smoke-yes"
                      name="smoke"
                      value="1"
                      className="toggle-input"
                      checked={formData.smoke === "1"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="smoke-yes" className="toggle-label">
                      Yes
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Alcohol consumption?</label>
                <div className="toggle-group">
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="alco-no"
                      name="alco"
                      value="0"
                      className="toggle-input"
                      checked={formData.alco === "0"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="alco-no" className="toggle-label">
                      No
                    </label>
                  </div>
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="alco-yes"
                      name="alco"
                      value="1"
                      className="toggle-input"
                      checked={formData.alco === "1"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="alco-yes" className="toggle-label">
                      Yes
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Physically active?</label>
                <div className="toggle-group">
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="active-no"
                      name="active"
                      value="0"
                      className="toggle-input"
                      checked={formData.active === "0"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="active-no" className="toggle-label">
                      No
                    </label>
                  </div>
                  <div className="toggle-option">
                    <input
                      type="radio"
                      id="active-yes"
                      name="active"
                      value="1"
                      className="toggle-input"
                      checked={formData.active === "1"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="active-yes" className="toggle-label">
                      Yes
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isLoading}
                style={{ minWidth: "200px" }}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner" style={{ width: "20px", height: "20px" }}></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Predict Risk
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Disclaimer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "20px",
            background: "rgba(245, 158, 11, 0.1)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <p style={{ color: "var(--warning)", fontWeight: "500" }}>
            ⚠️ Medical Disclaimer
          </p>
          <p className="text-muted" style={{ fontSize: "14px", marginTop: "8px" }}>
            This tool is for educational and informational purposes only. It is
            not a substitute for professional medical advice, diagnosis, or
            treatment. Always consult a qualified healthcare provider for medical
            concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
