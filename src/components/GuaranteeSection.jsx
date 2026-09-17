import { Link } from 'react-router-dom';

export default function GuaranteeSection() {
  return (
    <section className="section-wrapper scroll-section reveal-on-scroll reveal-guarantee" id="guarantee">
      <div className="container">
        <div className="guarantee-box-human">
          <div>
            <h2 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>The Anytime Rectification Guarantee&trade;</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)' }}>
              We don't charge hourly maintenance fees to fix what should have been built right in the first place. If an issue, bug, or security flaw is ever identified in your platform:
            </p>
            <ul className="guarantee-list">
              <li><span className="guarantee-check">&#10003;</span><div><strong>We rectify it at any time:</strong> Post-launch warranty with zero unexpected bills or hourly add-ons.</div></li>
              <li><span className="guarantee-check">&#10003;</span><div><strong>100% Genuine Code Quality:</strong> Clean, audited, documented code that you own entirely.</div></li>
              <li><span className="guarantee-check">&#10003;</span><div><strong>Direct Senior Access:</strong> Reach out directly to senior engineers via phone at <strong>+91 99529 34596</strong>.</div></li>
            </ul>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-hero-primary">Start Under Warranty &searr;</Link>
              <a href="tel:9952934596" className="btn-hero-phone">📞 Call 9952934596</a>
            </div>
          </div>

          <div className="guarantee-panel-side">
            <div className="guarantee-photo-wrap">
              <img src="/assets/images/guarantee-trust.jpg" alt="PrismLine Verified Client Delivery & Warranty" loading="lazy" />
            </div>
            <div className="guarantee-content-body">
              <div className="guarantee-stat-lg text-gradient">$0.00</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: '0.4rem' }}>Client Remediation Cost</div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', marginBottom: '1.2rem' }}>Any defect or bug in our delivered scope is investigated and rectified at zero extra charge.</p>
              <a href="tel:9952934596" style={{ display: 'block', fontFamily: "'Poppins', sans-serif", fontSize: '0.85rem', color: 'var(--brand-crimson)', background: '#FFFFFF', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}>
                SUPPORT HOTLINE: +91 99529 34596
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
