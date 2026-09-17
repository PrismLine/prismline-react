import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="section-wrapper bg-subtle scroll-section reveal-on-scroll reveal-about" id="about">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center' }} className="about-grid-wrap">
          <div className="about-narrative-col">
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '1.2rem' }}>The Problem with Conventional Web Agencies</h2>
            <p style={{ marginBottom: '1.2rem', fontSize: '1.05rem' }}>Most web development agencies treat security as an afterthought. They install dozens of unvetted third-party plugins, write fragile glue code, and hand over applications riddled with unpatched vulnerabilities.</p>
            <p style={{ marginBottom: '1.2rem', fontSize: '1.05rem' }}>When something inevitably breaks in production, they bill clients steep hourly maintenance fees to fix bugs that shouldn't have existed in the first place.</p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 700 }}>PrismLine was founded on a simple principle: Web development with security built directly into the foundation from day one, delivered at an honest, lower cost:</p>
            <ul className="guarantee-list" style={{ marginTop: '1.2rem' }}>
              <li><span className="guarantee-check">&#10003;</span><div><strong>Secure Foundation by Default:</strong> Every user form, session, and database query is pre-hardened against threats.</div></li>
              <li><span className="guarantee-check">&#10003;</span><div><strong>Affordable Transparent Pricing:</strong> Fixed project quotes with zero surprise retainers or expensive platform fees.</div></li>
              <li><span className="guarantee-check">&#10003;</span><div><strong>Anytime Rectification:</strong> If any bug or issue ever appears, our senior team fixes it for free, anytime.</div></li>
            </ul>
          </div>

          <div className="about-crest-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '3rem 2.2rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
            <img src="/assets/images/logo-emblem.svg" alt="PrismLine Logo" style={{ maxHeight: '105px', margin: '0 auto 1.5rem', filter: 'drop-shadow(0 6px 16px rgba(213,0,0,0.2))' }} />
            <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-crimson)', marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}>PRIS<span style={{ color: 'var(--brand-sunset)' }}>M</span>LINE</h3>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.80rem', color: 'var(--brand-orange)', fontWeight: 800, marginBottom: '1.2rem', letterSpacing: '0.08em' }}>AFFORDABLE SECURE WEB DEVELOPMENT</div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.65, marginBottom: '1.5rem' }}>"Modern websites engineered bold, secured by default, and delivered at lower cost with our anytime rectification guarantee."</p>
            <Link to="/contact" className="btn-hero-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem', width: '100%', justifyContent: 'center' }}>Start With Our Team &searr;</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
