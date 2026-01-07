import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "CardioRisk - Cardiovascular Disease Risk Prediction",
  description:
    "AI-powered cardiovascular disease risk prediction using advanced XGBoost machine learning. Predict your heart health risk with 74% accuracy.",
  keywords: [
    "cardiovascular",
    "heart disease",
    "risk prediction",
    "machine learning",
    "health",
    "XGBoost",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Animated Particle Background */}
          <div className="particle-background">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
