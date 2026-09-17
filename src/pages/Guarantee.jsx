import { useEffect } from 'react';
import GuaranteeSection from '../components/GuaranteeSection';
import ConsultationForm from '../components/ConsultationForm';

export default function Guarantee() {
  useEffect(() => {
    document.title = 'Anytime Rectification Guarantee — PrismLine';
  }, []);

  return (
    <main>
      <section className="section-wrapper inner-page-hero">
        <div className="hero-grain-overlay" aria-hidden="true"></div>
        <div className="container">
          <div className="section-head" style={{ maxWidth: '820px' }}>
            <div className="editorial-kicker">WARRANTY POLICY &bull; ZERO-DEFECT COMMITMENT</div>
            <h1 className="page-hero-title">
              The Anytime <br /><span className="title-accent">Rectification Guarantee™</span>
            </h1>
            <p className="page-hero-desc">
              We don't charge hourly maintenance fees to fix what should have been built right in the first place. Any bug, defect, or security vulnerability is fixed immediately at ₹0 additional charge.
            </p>
          </div>
        </div>
      </section>
      <GuaranteeSection />
      <ConsultationForm />
    </main>
  );
}
