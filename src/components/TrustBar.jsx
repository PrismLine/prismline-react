export default function TrustBar() {
  return (
    <section className="trust-bar scroll-section" id="trust-bar">
      <div className="container">
        <div className="trust-grid">
          <div className="trust-metric-card">
            <div className="trust-metric-value text-gradient">100%</div>
            <div className="trust-metric-label">Anytime Rectification SLA</div>
            <div className="trust-metric-sub">Zero-cost defect and security remediation</div>
          </div>
          <div className="trust-metric-card">
            <div className="trust-metric-value">0</div>
            <div className="trust-metric-label">Exploits Tolerated</div>
            <div className="trust-metric-sub">Rigorous OWASP Top 10 hardening</div>
          </div>
          <div className="trust-metric-card">
            <div className="trust-metric-value text-gradient">99.99%</div>
            <div className="trust-metric-label">Production Availability</div>
            <div className="trust-metric-sub">High-availability cloud architectures</div>
          </div>
          <div className="trust-metric-card">
            <div className="trust-metric-value">&lt; 15 min</div>
            <div className="trust-metric-label">Emergency Response Hotline</div>
            <div className="trust-metric-sub">Direct access via +91 99529 34596</div>
          </div>
        </div>
      </div>
    </section>
  );
}
