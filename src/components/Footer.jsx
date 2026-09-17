import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="nav-brand">
              <div className="brand-emblem-wrap">
                <img src="/assets/images/logo-emblem.svg" alt="PrismLine Logo" className="brand-emblem-icon" />
              </div>
              <div className="brand-title-wrap">
                <span>PRIS<span className="brand-m">M</span>LINE</span>
                <span className="brand-badge-pill">STUDIO</span>
              </div>
            </Link>
            <p>Secure web development studio. Modern websites built on a secure base at lower cost, backed by our anytime rectification guarantee.</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--brand-crimson)' }}>
              Direct Hotline: <a href="tel:9952934596" style={{ color: 'var(--text-heading)', fontWeight: 700 }}>+91 99529 34596</a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/process">How It Works</Link></li>
              <li><Link to="/guarantee">Rectification Guarantee</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Engineering</h5>
            <ul>
              <li><Link to="/services">Web Applications</Link></li>
              <li><Link to="/services">Frontend Hardening</Link></li>
              <li><Link to="/services">Zero-Trust Architecture</Link></li>
              <li><Link to="/guarantee">Warranty Coverage</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Direct Contact</h5>
            <ul>
              <li><a href="tel:9952934596">Hotline: 9952934596</a></li>
              <li><a href="https://wa.me/919952934596">WhatsApp Dispatch</a></li>
              <li><a href="mailto:contact@prismline.tech">contact@prismline.tech</a></li>
              <li><Link to="/guarantee">Warranty Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>&copy; 2026 PrismLine Technologies. All Rights Reserved. GoDaddy &amp; cPanel Ready.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              className="btn-replay-intro"
              style={{ background: 'none', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'var(--transition)' }}
            >
              🛡️ Replay Security Intro
            </button>
            <span>Zero-Trust Architecture</span>
            <span>100% Rectification Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
