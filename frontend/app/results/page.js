"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RiskGauge from "@/components/RiskGauge";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get prediction result from sessionStorage
    const storedResult = sessionStorage.getItem("predictionResult");

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      // No result found, redirect to assessment
      router.push("/assess");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div
        className="section"
        style={{
          paddingTop: "120px",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <div className="loading-spinner" style={{ margin: "0 auto 24px" }}></div>
          <p className="text-muted">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const isHighRisk = result.prediction === 1;
  const probability = result.probability || (isHighRisk ? 0.7 : 0.3);

  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span
            className="section-badge"
            style={{
              background: isHighRisk
                ? "rgba(239, 68, 68, 0.1)"
                : "rgba(16, 185, 129, 0.1)",
              color: isHighRisk ? "var(--danger)" : "var(--secondary)",
              padding: "8px 20px",
              fontSize: "14px",
              border: `1px solid ${isHighRisk ? "var(--danger)" : "var(--secondary)"}`
            }}
          >
            {isHighRisk ? "⚠️ HIGH RISK CLASSIFICATION" : "✅ LOW RISK CLASSIFICATION"}
          </span>
          <h1 className="section-title">Clinical Assessment Results</h1>
          <p className="section-description">
            Your health profile has been analyzed against 70,000 global patient records 
            using the XGBoost classification algorithm.
          </p>
        </div>

        {/* Main Result Card */}
        <div
          className="card"
          style={{
            maxWidth: "800px",
            margin: "0 auto 48px",
            background: isHighRisk
              ? "linear-gradient(145deg, rgba(239, 68, 68, 0.05) 0%, var(--card) 100%)"
              : "linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, var(--card) 100%)",
            borderColor: isHighRisk
              ? "var(--danger)"
              : "var(--secondary)",
            boxShadow: isHighRisk
              ? "0 8px 32px rgba(239, 68, 68, 0.15)"
              : "0 8px 32px rgba(16, 185, 129, 0.15)",
          }}
        >
          {/* Risk Gauge */}
          <RiskGauge probability={probability} isHighRisk={isHighRisk} />

          {/* Risk Summary */}
          <div
            className="text-center"
            style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}
          >
            <h3 style={{ marginBottom: "16px", fontSize: "1.75rem" }}>
              {isHighRisk
                ? "Classification: Elevated Risk"
                : "Classification: Standard Risk"}
            </h3>
            <p className="text-secondary" style={{ maxWidth: "550px", margin: "0 auto", fontSize: "1.1rem" }}>
              {isHighRisk
                ? "The evaluation indicates metrics correlating with high cardiovascular event risk. Clinical follow-up and diagnostic verification are strongly advised."
                : "The assessment indicates parameters within standard physiological ranges. Continued health monitoring and preventive maintenance are recommended."}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div style={{ maxWidth: "800px", margin: "0 auto 48px" }}>
            <h2 style={{ marginBottom: "24px", textAlign: "center" }}>
              💡 Personalized Recommendations
            </h2>
            <div className="recommendations">
              {result.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="recommendation-card"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease forwards",
                    opacity: 0,
                  }}
                >
                  <div className="recommendation-icon">{rec.icon}</div>
                  <div className="recommendation-content">
                    <h4>{rec.category}</h4>
                    <p>{rec.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Summary */}
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto 48px" }}>
          <h3 style={{ marginBottom: "24px", color: "var(--primary-light)" }}>
            📋 Your Health Metrics Summary
          </h3>

          <div className="grid grid-3">
            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--text-muted)", fontSize: "14px" }}>
                Personal Info
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Gender</span>
                  <span>{result.inputData.gender === 1 ? "Male" : "Female"}</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Age</span>
                  <span>{result.inputData.ageInYr} years</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Height</span>
                  <span>{result.inputData.height} cm</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Weight</span>
                  <span>{result.inputData.weight} kg</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">BMI</span>
                  <span style={{ color: result.inputData.bmi >= 30 ? "var(--danger-light)" : result.inputData.bmi >= 25 ? "var(--warning)" : "var(--secondary-light)" }}>
                    {result.inputData.bmi}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--text-muted)", fontSize: "14px" }}>
                Blood Pressure
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Systolic (ap_hi)</span>
                  <span style={{ color: result.inputData.ap_hi >= 140 ? "var(--danger-light)" : "inherit" }}>
                    {result.inputData.ap_hi} mmHg
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Diastolic (ap_lo)</span>
                  <span style={{ color: result.inputData.ap_lo >= 90 ? "var(--danger-light)" : "inherit" }}>
                    {result.inputData.ap_lo} mmHg
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Hypertension</span>
                  <span style={{ color: result.inputData.hypertension ? "var(--danger-light)" : "var(--secondary-light)" }}>
                    {result.inputData.hypertension ? "Yes" : "No"}
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Cholesterol</span>
                  <span>Level {result.inputData.cholesterol}</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Glucose</span>
                  <span>Level {result.inputData.gluc}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--text-muted)", fontSize: "14px" }}>
                Lifestyle
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Smoking</span>
                  <span style={{ color: result.inputData.smoke ? "var(--danger-light)" : "var(--secondary-light)" }}>
                    {result.inputData.smoke ? "Yes" : "No"}
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Alcohol</span>
                  <span style={{ color: result.inputData.alco ? "var(--warning)" : "var(--secondary-light)" }}>
                    {result.inputData.alco ? "Yes" : "No"}
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Active</span>
                  <span style={{ color: result.inputData.active ? "var(--secondary-light)" : "var(--danger-light)" }}>
                    {result.inputData.active ? "Yes" : "No"}
                  </span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Age Group</span>
                  <span>{["18-29", "30-44", "45-59", "60-74", "75+"][result.inputData.age_group]}</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="text-muted">Obese</span>
                  <span style={{ color: result.inputData.obese ? "var(--danger-light)" : "var(--secondary-light)" }}>
                    {result.inputData.obese ? "Yes" : "No"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center" style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/assess" className="btn btn-primary btn-lg">
              <span>🔄</span>
              Take Another Assessment
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              <span>📊</span>
              Learn About the Model
            </Link>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div
          style={{
            textAlign: "center",
            padding: "24px",
            background: "rgba(245, 158, 11, 0.1)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <p style={{ color: "var(--warning)", fontWeight: "600" }}>
            ⚠️ Important Medical Disclaimer
          </p>
          <p className="text-muted" style={{ fontSize: "14px", marginTop: "8px" }}>
            This prediction is generated by a machine learning model and is for
            informational purposes only. It should NOT be used as a substitute for
            professional medical advice, diagnosis, or treatment. If you have
            concerns about your cardiovascular health, please consult a qualified
            healthcare provider immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
