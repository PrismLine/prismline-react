const BACKEND_API_ENDPOINT = 'api/contact.php';

export default function ConsultationForm() {
  return (
    <section className="section-wrapper scroll-section reveal-on-scroll reveal-contact" id="consultation">
      <div className="container">
        <div className="contact-container">
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Let's Build Your System.</h2>
            <p>Tell us about the web application, frontend, or backend infrastructure you need. A senior engineer will review your requirements and respond within 4 hours.</p>
            <div className="contact-meta-card">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--brand-sunset)', fontWeight: 700 }}>Direct Phone &amp; Emergency Rectification</div>
              <a href="tel:9952934596" className="direct-phone-num">+91 99529 34596</a>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Available for consultations, project scopes, and 24/7 warranty support.</p>
              <a href="https://wa.me/919952934596?text=Hi%20PrismLine,%20I%20would%20like%20to%20consult%20on%20a%20project" target="_blank" rel="noreferrer" className="btn-hero-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>WhatsApp Us Directly &searr;</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-body)' }}>
              <div>📍 <strong>PrismLine Technologies:</strong> Affordable Secure Web Development</div>
              <div>✉️ <strong>Direct Inbox:</strong> contact@prismline.tech</div>
              <div>⚡ <strong>Incident Response:</strong> Within 15 Minutes</div>
            </div>
          </div>

          <form className="lead-capture-form" action={BACKEND_API_ENDPOINT} method="POST" data-source="Homepage Form">
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', marginBottom: '1.2rem' }}>Start a Web Project / Get Quote</h3>
            <div className="form-row-2">
              <div className="form-field-group">
                <label htmlFor="fullName">Your Full Name *</label>
                <input type="text" id="fullName" name="fullName" className="input-agency" placeholder="e.g. Sanjay Kumar" required />
              </div>
              <div className="form-field-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" className="input-agency" placeholder="e.g. 9952934596" required />
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-field-group">
                <label htmlFor="email">Work Email</label>
                <input type="email" id="email" name="email" className="input-agency" placeholder="name@company.com" />
              </div>
              <div className="form-field-group">
                <label htmlFor="service">Service Category</label>
                <select id="service" name="service" className="input-agency">
                  <option value="E-Commerce & Online Stores">E-Commerce &amp; Online Stores</option>
                  <option value="Full-Stack Web App">Full-Stack Web Applications</option>
                  <option value="Company Websites & Portals">Company Websites &amp; Portals</option>
                  <option value="Anytime Rectification">Existing Website Rectification</option>
                </select>
              </div>
            </div>
            <div className="form-field-group">
              <label htmlFor="message">Project Requirements / Current Challenges</label>
              <textarea id="message" name="message" className="input-agency" placeholder="Describe the website or web app you need built, timeline expectations, or security requirements..."></textarea>
            </div>
            <button type="submit" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.95rem', fontSize: '1rem' }}>
              Send Inquiry to Engineering &searr;
            </button>
            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-muted)', marginTop: '0.6rem' }}>🔒 Encrypted Submission. We protect all project specifications under strict NDA.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
