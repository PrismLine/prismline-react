import { useEffect } from 'react';
import ConsultationForm from '../components/ConsultationForm';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact PrismLine — Affordable Secure Web Development | +91 99529 34596';
  }, []);

  return (
    <main>
      <section className="section-wrapper inner-page-hero">
        <div className="hero-grain-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="section-head" style={{ maxWidth: '820px' }}>
            <div className="editorial-kicker">DIRECT COMMUNICATION &bull; SENIOR WEB ENGINEERS</div>
            <h1 className="page-hero-title">
              Talk to a <br /><span className="title-accent">Senior Engineer Directly.</span>
            </h1>
            <p className="page-hero-desc">
              No sales funnels. No ticket queues. Call or WhatsApp +91 99529 34596 to speak directly with the engineers who will build your project. Response within 15 minutes.
            </p>
          </div>
        </div>
      </section>
      <ConsultationForm />
    </main>
  );
}
