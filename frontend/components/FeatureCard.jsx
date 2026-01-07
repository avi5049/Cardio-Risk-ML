export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <div
      className="card feature-card"
      style={{
        animationDelay: `${delay}ms`,
        animation: "fadeInUp 0.6s ease forwards",
        opacity: 0,
      }}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}
