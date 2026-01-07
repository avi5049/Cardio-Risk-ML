import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🤖</span>
            <span>AI-Powered Health Prediction</span>
          </div>

          <h1 className="hero-title">
            Predict Your <span>Cardiovascular</span> Disease Risk
          </h1>

          <p className="hero-description">
            Using advanced machine learning and 70,000+ patient records, our AI
            model helps you understand your heart health risk factors. Get
            personalized insights in seconds.
          </p>

          <div className="hero-buttons">
            <Link href="/assess" className="btn btn-primary btn-lg">
              <span>🫀</span>
              Start Assessment
            </Link>
            <Link href="/about" className="btn btn-secondary btn-lg">
              <span>📊</span>
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">74%</div>
              <div className="hero-stat-label">Accuracy</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">80%</div>
              <div className="hero-stat-label">ROC-AUC</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">70K+</div>
              <div className="hero-stat-label">Patients</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">15</div>
              <div className="hero-stat-label">Features</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2 className="section-title">Why Choose CardioRisk?</h2>
            <p className="section-description">
              Our platform combines cutting-edge machine learning with medical
              expertise to provide accurate cardiovascular risk predictions.
            </p>
          </div>

          <div className="grid grid-4">
            <FeatureCard
              icon="🧠"
              title="XGBoost Model"
              description="State-of-the-art gradient boosting with 300 estimators for highly accurate predictions."
              delay={0}
            />
            <FeatureCard
              icon="📊"
              title="15 Health Indicators"
              description="Comprehensive analysis including blood pressure, cholesterol, BMI, and lifestyle factors."
              delay={100}
            />
            <FeatureCard
              icon="⚡"
              title="Instant Results"
              description="Get your risk assessment in seconds with personalized health recommendations."
              delay={200}
            />
            <FeatureCard
              icon="🔒"
              title="Privacy First"
              description="Your health data is processed locally and never stored on our servers."
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ background: "var(--background-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Three simple steps to understand your cardiovascular health risk.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: "0.8",
                }}
              >
                1️⃣
              </div>
              <h3 style={{ marginBottom: "12px" }}>Enter Your Data</h3>
              <p className="text-muted">
                Fill in your health metrics including age, blood pressure,
                cholesterol, and lifestyle factors.
              </p>
            </div>
            <div className="card">
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: "0.8",
                }}
              >
                2️⃣
              </div>
              <h3 style={{ marginBottom: "12px" }}>AI Analysis</h3>
              <p className="text-muted">
                Our XGBoost model processes your data through 15 health
                indicators to calculate your risk.
              </p>
            </div>
            <div className="card">
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: "0.8",
                }}
              >
                3️⃣
              </div>
              <h3 style={{ marginBottom: "12px" }}>Get Insights</h3>
              <p className="text-muted">
                Receive your risk score with personalized recommendations to
                improve your heart health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Performance Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Performance</span>
            <h2 className="section-title">Model Statistics</h2>
            <p className="section-description">
              Our model was trained on the Kaggle Cardiovascular Disease dataset
              and validated using 5-fold cross-validation.
            </p>
          </div>

          <div className="grid grid-4">
            <div className="card text-center">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "var(--primary-light)",
                  marginBottom: "8px",
                }}
              >
                74%
              </div>
              <div className="text-muted">Accuracy</div>
            </div>
            <div className="card text-center">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "var(--secondary-light)",
                  marginBottom: "8px",
                }}
              >
                80%
              </div>
              <div className="text-muted">ROC-AUC Score</div>
            </div>
            <div className="card text-center">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "var(--warning)",
                  marginBottom: "8px",
                }}
              >
                76%
              </div>
              <div className="text-muted">Precision</div>
            </div>
            <div className="card text-center">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  color: "var(--danger-light)",
                  marginBottom: "8px",
                }}
              >
                70%
              </div>
              <div className="text-muted">Recall</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section"
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
        }}
      >
        <div className="container text-center">
          <h2 style={{ marginBottom: "16px" }}>
            Ready to Check Your Heart Health?
          </h2>
          <p
            className="section-description"
            style={{ marginBottom: "32px" }}
          >
            Take the first step towards understanding your cardiovascular risk.
            It only takes 2 minutes.
          </p>
          <Link href="/assess" className="btn btn-primary btn-lg">
            <span>🫀</span>
            Start Free Assessment
          </Link>
        </div>
      </section>
    </>
  );
}
