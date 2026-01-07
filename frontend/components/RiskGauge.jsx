"use client";

import { useEffect, useState } from "react";

export default function RiskGauge({ probability, isHighRisk }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round(probability * 100);
  
  // SVG parameters
  const size = 240;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    // Animate the value from 0 to the actual percentage
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="risk-gauge">
      <div className="gauge-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="gradient-danger" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>
          </defs>
          
          {/* Background Circle */}
          <circle
            className="gauge-background"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          
          {/* Progress Circle */}
          <circle
            className={`gauge-progress ${isHighRisk ? "high-risk" : "low-risk"}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              stroke: isHighRisk ? "url(#gradient-danger)" : "url(#gradient-success)",
            }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="gauge-center">
          <div
            className="gauge-value"
            style={{
              color: isHighRisk ? "var(--danger)" : "var(--secondary)",
              fontSize: "2.5rem",
              lineHeight: "1",
              marginBottom: "4px"
            }}
          >
            {isHighRisk ? "HIGH" : "LOW"}
          </div>
          <div className="gauge-label" style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            RISK DETECTED
          </div>
          <div 
            style={{ 
              marginTop: "8px", 
              fontSize: "18px", 
              fontWeight: "700",
              color: "var(--text)" 
            }}
          >
            Risk Score: {animatedValue}%
          </div>
        </div>
      </div>
      
      {/* Status Badge */}
      <div className={`gauge-status ${isHighRisk ? "high-risk" : "low-risk"}`}>
        {isHighRisk ? "⚠️ High Risk Detected" : "✅ Low Risk"}
      </div>
    </div>
  );
}
