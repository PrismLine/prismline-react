import { useEffect } from 'react';
import ProcessSection from '../components/ProcessSection';
import ConsultationForm from '../components/ConsultationForm';

export default function Process() {
  useEffect(() => {
    document.title = 'How It Works — PrismLine | 4-Stage Secure Web Development';
  }, []);

  return (
    <main>
      <section className="section-wrapper inner-page-hero">
        <div className="hero-grain-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="section-head" style={{ maxWidth: '820px' }}>
            <div className="editorial-kicker">DEVELOPMENT LIFECYCLE &bull; 4-STAGE PROCESS</div>
            <h1 className="page-hero-title">
              How We Build <br /><span className="title-accent">Your Secure Website.</span>
            </h1>
            <p className="page-hero-desc">
              Every PrismLine project follows a disciplined 4-stage engineering lifecycle — from transparent scoping to zero-downtime launch — with built-in security at every step.
            </p>
          </div>
        </div>
      </section>
      <ProcessSection />
      <ConsultationForm />
    </main>
  );
}
