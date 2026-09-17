import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  useEffect(() => {
    document.title = 'Services — PrismLine | Affordable Secure Web Development';
  }, []);

  const services = [
    {
      id: 'web', num: '01', category: 'STOREFRONTS & WEB PLATFORMS',
      title: 'Full-Stack Web & E-Commerce Development',
      desc: 'We build fast, conversion-optimized online storefronts, brand websites, and custom web applications using modern technologies (Next.js, React, Node.js, PostgreSQL). Every platform is engineered for lightning-fast speeds, seamless payment checkouts, and low long-term maintenance costs.',
      specs: ['React / Next.js with server-side rendering (SEO optimized)', 'Razorpay / Stripe direct integration (zero PCI-scope on server)', 'Custom inventory management & automated order workflows', 'PageSpeed 95+ across mobile and desktop (Core Web Vitals certified)', 'Zero vendor lock-in — you own 100% of the source code'],
    },
    {
      id: 'security', num: '02', category: 'ZERO-BREACH WEB SECURITY',
      title: 'OWASP Hardened Security Architecture',
      desc: 'Security is not an add-on at PrismLine — it is built into every layer of the code from day one. We protect your business and your customers\' data with a full-stack security posture aligned to the OWASP Top 10.',
      specs: ['SQL Injection immunity via parameterized queries (100% coverage)', 'XSS prevention using DOMPurify and strict Content Security Policy (CSP Level 3)', 'Session security: Argon2id password hashing, rotating JWT tokens, HttpOnly cookies', 'CSRF protection and strict CORS origin policy on all API routes', 'Automated daily database snapshots with off-site encrypted backup'],
    },
    {
      id: 'portals', num: '03', category: 'CORPORATE INFRASTRUCTURE',
      title: 'Corporate Websites, Dashboards & Internal Portals',
      desc: 'Professional company websites, employee dashboards, and client-facing portals with secure backend APIs and admin panel integrations. Built to scale with your organization without breaking your budget.',
      specs: ['Role-based access control (RBAC) for multi-user management portals', 'Secure file upload handling with server-side validation (no malicious file execution)', 'End-to-end encrypted form submissions and lead capture pipelines', 'GoDaddy, cPanel, AWS EC2, and DigitalOcean deployment support', 'Handover of full source code, documentation, and admin credentials'],
    },
    {
      id: 'rectification', num: '04', category: 'ANYTIME RECTIFICATION GUARANTEE',
      title: 'Lifetime Zero-Cost Bug & Security Rectification',
      desc: 'If any defect, vulnerability, or broken feature is discovered in code we delivered — we fix it immediately at ₹0 additional charge. No hourly billing. No excuses. Direct access to the senior engineering team at all times.',
      specs: ['Direct phone line to senior engineers: +91 99529 34596', 'Emergency security patch response within 15 minutes', '24/7 WhatsApp support channel for active client projects', 'Scope-included rectification for layout, logic, and security bugs', 'No third-party support desk — you speak directly with the engineer who built your product'],
    },
  ];

  return (
    <main>
      <section className="section-wrapper inner-page-hero">
        <div className="hero-grain-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="section-head" style={{ maxWidth: '820px' }}>
            <div className="editorial-kicker">CAPABILITIES &bull; AFFORDABLE SECURE WEB DEVELOPMENT</div>
            <h1 className="page-hero-title">
              Websites Built Bold. <br /><span className="title-accent">Secured by Default at Lower Cost.</span>
            </h1>
            <p className="page-hero-desc">
              From high-converting e-commerce storefronts to scalable web platforms, we engineer modern websites with an unbreakable secure foundation built-in from day one &mdash; delivered at honest, lower rates.
            </p>
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-subtle" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {services.map(({ id, num, category, title, desc, specs }) => (
              <div key={id} id={id} className="agency-card" style={{ padding: '3.5rem' }}>
                <div className="editorial-kicker">{num} &bull; {category}</div>
                <h2 className="card-title" style={{ fontSize: '2rem' }}>{title}</h2>
                <p className="card-text" style={{ fontSize: '1.08rem', maxWidth: '780px' }}>{desc}</p>
                <ul className="card-specs">
                  {specs.map(s => <li key={s}>{s}</li>)}
                </ul>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                  <Link to="/contact" className="btn-hero-primary">Inquire About This Service &searr;</Link>
                  <a href="tel:9952934596" className="btn-hero-phone">📞 +91 99529 34596</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
