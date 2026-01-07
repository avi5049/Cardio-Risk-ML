export default function AboutPage() {
  return (
    <div className="section" style={{ paddingTop: "120px" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">About</span>
          <h1 className="section-title">Project Methodology</h1>
          <p className="section-description">
            Learn about the machine learning approach, data preprocessing, and
            model architecture behind CardioRisk.
          </p>
        </div>

        {/* Project Overview */}
        <div className="card" style={{ marginBottom: "32px" }}>
          <h2 style={{ marginBottom: "20px", color: "var(--primary-light)" }}>
            📋 Project Overview
          </h2>
          <p style={{ marginBottom: "16px" }}>
            CardioRisk is a machine learning-powered web application that predicts
            cardiovascular disease risk based on patient health metrics. The
            project combines advanced data science techniques with modern web
            technologies to deliver an intuitive, production-ready health
            assessment tool.
          </p>
          <div className="grid grid-4" style={{ marginTop: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--primary-light)",
                }}
              >
                70,000
              </div>
              <div className="text-muted">Patient Records</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--secondary-light)",
                }}
              >
                15
              </div>
              <div className="text-muted">Health Features</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--warning)",
                }}
              >
                5-Fold
              </div>
              <div className="text-muted">Cross Validation</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--danger-light)",
                }}
              >
                Binary
              </div>
              <div className="text-muted">Classification</div>
            </div>
          </div>
        </div>

        {/* Dataset Information */}
        <div className="card" style={{ marginBottom: "32px" }}>
          <h2 style={{ marginBottom: "20px", color: "var(--primary-light)" }}>
            📊 Dataset Description
          </h2>
          <p style={{ marginBottom: "24px" }}>
            The model was trained on the Cardiovascular Disease dataset from
            Kaggle, containing examination results from 70,000 patients. The
            dataset includes:
          </p>

          <div className="grid grid-2" style={{ gap: "32px" }}>
            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--secondary-light)" }}>
                📥 Input Features (11 Original)
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {[
                  { name: "Gender", desc: "Male/Female" },
                  { name: "Height", desc: "Height in cm" },
                  { name: "Weight", desc: "Weight in kg" },
                  { name: "Age", desc: "Age in years" },
                  { name: "Systolic BP", desc: "ap_hi (80-250)" },
                  { name: "Diastolic BP", desc: "ap_lo (40-150)" },
                  { name: "Cholesterol", desc: "1=Normal, 2=Above, 3=High" },
                  { name: "Glucose", desc: "1=Normal, 2=Above, 3=High" },
                  { name: "Smoking", desc: "Yes/No" },
                  { name: "Alcohol", desc: "Yes/No" },
                  { name: "Physical Activity", desc: "Yes/No" },
                ].map((feature, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{feature.name}</span>
                    <span className="text-muted">{feature.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                style={{ marginBottom: "16px", color: "var(--secondary-light)" }}
              >
                🔧 Engineered Features (4 Derived)
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {[
                  { name: "BMI", desc: "weight / (height/100)²" },
                  { name: "Hypertension", desc: "ap_hi ≥ 140 OR ap_lo ≥ 90" },
                  { name: "Obesity", desc: "BMI ≥ 30" },
                  { name: "Age Group", desc: "Categorical (0-4)" },
                ].map((feature, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{feature.name}</span>
                    <span className="text-muted">{feature.desc}</span>
                  </li>
                ))}
              </ul>

              <h4
                style={{
                  marginBottom: "16px",
                  marginTop: "32px",
                  color: "var(--danger-light)",
                }}
              >
                🎯 Target Variable
              </h4>
              <p>
                <strong>Cardiovascular Disease</strong> - Binary classification
                <br />
                <span className="text-muted">
                  0 = No Disease, 1 = Disease Present
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Model Architecture */}
        <div className="card" style={{ marginBottom: "32px" }}>
          <h2 style={{ marginBottom: "20px", color: "var(--primary-light)" }}>
            🧠 Model Architecture
          </h2>

          <div className="grid grid-3" style={{ marginBottom: "24px" }}>
            <div
              className="card"
              style={{ background: "var(--background-secondary)" }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>📈</div>
              <h4>Logistic Regression</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Baseline Model
              </p>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--text-secondary)",
                  marginTop: "8px",
                }}
              >
                70% Accuracy
              </div>
            </div>

            <div
              className="card"
              style={{ background: "var(--background-secondary)" }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🌲</div>
              <h4>Random Forest</h4>
              <p className="text-muted" style={{ fontSize: "14px" }}>
                Ensemble Method
              </p>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--text-secondary)",
                  marginTop: "8px",
                }}
              >
                73% Accuracy
              </div>
            </div>

            <div
              className="card"
              style={{
                background:
                  "linear-gradient(145deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1))",
                border: "2px solid var(--primary)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🚀</div>
              <h4>XGBoost</h4>
              <p className="text-primary" style={{ fontSize: "14px" }}>
                Selected Model ✓
              </p>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--primary-light)",
                  marginTop: "8px",
                }}
              >
                74% Accuracy
              </div>
            </div>
          </div>

          <h4 style={{ marginBottom: "16px" }}>XGBoost Hyperparameters</h4>
          <div
            style={{
              background: "var(--background-secondary)",
              padding: "20px",
              borderRadius: "var(--radius-md)",
              fontFamily: "monospace",
            }}
          >
            <code>
              {`XGBClassifier(
  n_estimators=300,
  learning_rate=0.05,
  max_depth=5,
  random_state=42
)`}
            </code>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="card" style={{ marginBottom: "32px" }}>
          <h2 style={{ marginBottom: "20px", color: "var(--primary-light)" }}>
            📉 Performance Metrics
          </h2>

          <div className="grid grid-4">
            <div className="text-center">
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(var(--primary) 0deg 266deg, var(--border) 266deg 360deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  74%
                </div>
              </div>
              <div className="text-muted">Accuracy</div>
            </div>

            <div className="text-center">
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(var(--secondary) 0deg 288deg, var(--border) 288deg 360deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  80%
                </div>
              </div>
              <div className="text-muted">ROC-AUC</div>
            </div>

            <div className="text-center">
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(var(--warning) 0deg 274deg, var(--border) 274deg 360deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  76%
                </div>
              </div>
              <div className="text-muted">Precision</div>
            </div>

            <div className="text-center">
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background:
                    "conic-gradient(var(--danger) 0deg 252deg, var(--border) 252deg 360deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                  }}
                >
                  70%
                </div>
              </div>
              <div className="text-muted">Recall</div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card" style={{ marginBottom: "32px" }}>
          <h2 style={{ marginBottom: "20px", color: "var(--primary-light)" }}>
            💻 Technology Stack
          </h2>

          <div className="grid grid-3">
            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--secondary-light)" }}>
                🐍 Backend
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>• Python 3.x</li>
                <li>• Flask (REST API)</li>
                <li>• XGBoost</li>
                <li>• Pandas & NumPy</li>
                <li>• Scikit-learn</li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--secondary-light)" }}>
                ⚛️ Frontend
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• CSS3 (Custom Design System)</li>
                <li>• Responsive Design</li>
              </ul>
            </div>

            <div>
              <h4 style={{ marginBottom: "16px", color: "var(--secondary-light)" }}>
                🛠️ Development
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>• Jupyter Notebooks</li>
                <li>• Git Version Control</li>
                <li>• VS Code</li>
                <li>• Chrome DevTools</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            textAlign: "center",
            padding: "24px",
            background: "rgba(245, 158, 11, 0.1)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        >
          <p style={{ color: "var(--warning)", fontWeight: "600" }}>
            ⚠️ Important Disclaimer
          </p>
          <p className="text-muted" style={{ fontSize: "14px", marginTop: "8px" }}>
            This project is developed for educational purposes as part of the
            ML/DL coursework at Darshan University. It is not intended for actual
            medical diagnosis. Always consult healthcare professionals for medical
            advice.
          </p>
        </div>
      </div>
    </div>
  );
}
