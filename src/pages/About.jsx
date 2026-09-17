import { useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import ConsultationForm from '../components/ConsultationForm';

export default function About() {
  useEffect(() => {
    document.title = 'About PrismLine — Affordable Secure Web Development Studio';
  }, []);

  return (
    <main>
      <section className="section-wrapper inner-page-hero">
        <div className="hero-grain-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="section-head" style={{ maxWidth: '820px' }}>
            <div className="editorial-kicker">ABOUT US &bull; WEB SECURITY STUDIO</div>
            <h1 className="page-hero-title">
              Built Different. <br /><span className="title-accent">Secured from Day One.</span>
            </h1>
            <p className="page-hero-desc">
              PrismLine was founded on a single principle: web development should include real security from the ground up, delivered at honest, lower costs with lifetime warranty support.
            </p>
          </div>
        </div>
      </section>
      <AboutSection />
      <ConsultationForm />
    </main>
  );
}
