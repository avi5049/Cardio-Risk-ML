import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div>
            <div className="footer-brand">
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 32C18 32 30 24 30 14C30 10.287 27.3137 7 24 7C21.6 7 19.5 8.5 18 10.5C16.5 8.5 14.4 7 12 7C8.68629 7 6 10.287 6 14C6 24 18 32 18 32Z"
                  fill="url(#footer-heart)"
                  stroke="#6366f1"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient
                    id="footer-heart"
                    x1="6"
                    y1="7"
                    x2="30"
                    y2="32"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ef4444" />
                    <stop offset="1" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
              </svg>
              <span>CardioRisk</span>
            </div>
            <p className="footer-description">
              AI-powered cardiovascular disease risk prediction using advanced
              machine learning. Helping you understand your heart health better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <Link href="/" className="footer-link">
                Home
              </Link>
              <Link href="/assess" className="footer-link">
                Risk Assessment
              </Link>
              <Link href="/about" className="footer-link">
                About & Methodology
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer-title">Data & Model</h4>
            <div className="footer-links">
              <span className="footer-link">70,000 Patient Records</span>
              <span className="footer-link">XGBoost Classifier</span>
              <span className="footer-link">74% Accuracy</span>
              <span className="footer-link">80% ROC-AUC</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Project Info</h4>
            <div className="footer-links">
              <span className="footer-link">ML/DL Project</span>
              <span className="footer-link">Semester 6</span>
              <span className="footer-link">Darshan University</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} CardioRisk. Built with Next.js & Flask.
          </p>
          <p>
            <span style={{ color: "var(--danger)" }}>⚠️</span> For educational
            purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
