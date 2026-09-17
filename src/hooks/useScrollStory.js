/**
 * useScrollStory — PrismLine Editorial Scroll Engine
 * Lenis 1.x + GSAP 3.12+ ScrollTrigger
 *
 * ITI.CA EDITORIAL ANIMATION SYSTEM:
 *  1. Frictionless, continuous smooth scroll (no locking pins that trap the user)
 *  2. Horizontal shifting display typography on scroll (iti.ca trademark)
 *  3. Multi-layer vertical parallax depth for canvases, cards, and floating shapes
 *  4. Masked line & word reveals on scroll entry
 *  5. Reactive SVG/code stage interactions that trigger smoothly as you scroll
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const HEADER_HEIGHT = 73; // 72px navbar + 1px border

gsap.registerPlugin(ScrollTrigger);

export function useScrollStory() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // ─── 1. Initialize Lenis (Crisp, Fluid, Non-Sticking) ────────────────────
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    // ─── 2. Sync Lenis → GSAP ScrollTrigger ───────────────────────────────
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // ─── 3. Anchor link smooth scroll ─────────────────────────────────────
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchor = function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        lenis.scrollTo(targetElem, { offset: -HEADER_HEIGHT, duration: 1.1 });
      }
    };
    anchors.forEach((a) => a.addEventListener('click', handleAnchor));

    // ─── 4. iti.ca Horizontal Drift Typography ─────────────────────────────
    initHorizontalDrift();

    // ─── 5. iti.ca Floating Geometric Accents Parallax ────────────────────
    initFloatingAccents();

    // ─── 6. Service Blocks Smooth Editorial Flow (Non-Locking) ────────────
    initServiceEditorialFlow();

    // ─── 7. Masked Line & Heading Reveals ─────────────────────────────────
    initMaskedReveals();

    // ─── 8. Trust Bar Counters ────────────────────────────────────────────
    initTrustBarCounters();

    // ─── 9. General Section Reveals ───────────────────────────────────────
    initSectionReveals();

    // ─── 10. ScrollTrigger.refresh() on load & after intro ────────────────
    const onLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const onIntroFinished = () => {
      setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }
    window.addEventListener('prismline:intro-finished', onIntroFinished, { once: true });

    // Expose engine
    window.PrismLineScrollStory = {
      refresh: () => {
        ScrollTrigger.refresh();
        lenis.resize();
      },
      lenis: () => lenis,
    };

    // ─── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      anchors.forEach((a) => a.removeEventListener('click', handleAnchor));
      window.removeEventListener('load', onLoad);
      window.removeEventListener('prismline:intro-finished', onIntroFinished);
      delete window.lenis;
      delete window.PrismLineScrollStory;
    };
  }, []);

  return lenisRef;
}

// ─────────────────────────────────────────────────────────────────────────────
// iti.ca Horizontal Drift Typography
// Drifts large bold words horizontally across the screen as user scrolls
// ─────────────────────────────────────────────────────────────────────────────
function initHorizontalDrift() {
  const driftBanner = document.querySelector('.iti-drift-banner');
  if (!driftBanner) return;

  const leftRow = driftBanner.querySelector('.iti-drift-row.drift-left');
  const rightRow = driftBanner.querySelector('.iti-drift-row.drift-right');

  if (leftRow) {
    gsap.fromTo(
      leftRow,
      { x: 0 },
      {
        x: -220,
        ease: 'none',
        scrollTrigger: {
          trigger: driftBanner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      }
    );
  }

  if (rightRow) {
    gsap.fromTo(
      rightRow,
      { x: -180 },
      {
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: driftBanner,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// iti.ca Floating Geometric Accents Parallax (+, —, pills, dots)
// ─────────────────────────────────────────────────────────────────────────────
function initFloatingAccents() {
  const shapes = document.querySelectorAll('.iti-floating-shape');
  if (!shapes.length) return;

  shapes.forEach((shape) => {
    const rawSpeed = parseFloat(shape.getAttribute('data-parallax-speed')) || 1.0;
    const offset = rawSpeed * 65;
    const parentSection = shape.closest('section') || shape.parentElement;

    gsap.fromTo(
      shape,
      { y: -offset },
      {
        y: offset,
        ease: 'none',
        scrollTrigger: {
          trigger: parentSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Service Blocks Smooth Editorial Flow (NO VIEWPORT LOCK / NO STICKING)
// ─────────────────────────────────────────────────────────────────────────────
function initServiceEditorialFlow() {
  const blocks = document.querySelectorAll('.editorial-story-block');
  if (!blocks.length) return;

  blocks.forEach((block) => {
    const serviceId = block.getAttribute('data-service');
    const visualStage = block.querySelector('.story-visual-stage');
    const textTrack = block.querySelector('.story-text-track');

    // Subtle multi-layer vertical parallax on the visual stage (iti.ca style)
    if (visualStage && window.innerWidth >= 992) {
      gsap.fromTo(
        visualStage,
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: block,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        }
      );
    }

    // Text track smooth entrance
    if (textTrack) {
      gsap.fromTo(
        textTrack,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Interactive Stage Animations (Triggered smoothly on entry, not forced-scrubbed)
    if (serviceId === '01') {
      const nodes = block.querySelectorAll('.topo-node');
      const secureCore = block.querySelector('.node-core rect');

      ScrollTrigger.create({
        trigger: block,
        start: 'top 75%',
        onEnter: () => {
          if (nodes.length) {
            gsap.fromTo(
              nodes,
              { scale: 0.94, opacity: 0.8 },
              { scale: 1, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.7)' }
            );
          }
          if (secureCore) {
            gsap.to(secureCore, { stroke: '#10B981', strokeWidth: 2.5, duration: 0.5, delay: 0.4 });
          }
        },
      });
    } else if (serviceId === '02') {
      const numRows = block.querySelectorAll('.numbered-row');
      const statusRight = block.querySelector('.wb-status-right');

      ScrollTrigger.create({
        trigger: block,
        start: 'top 75%',
        onEnter: () => {
          if (numRows.length) {
            gsap.fromTo(
              numRows,
              { opacity: 0, x: -16 },
              { opacity: 1, x: 0, stagger: 0.12, duration: 0.55, ease: 'power2.out' }
            );
          }
          if (statusRight) {
            gsap.fromTo(statusRight, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(2)', delay: 0.3 });
          }
        },
      });
    } else if (serviceId === '03') {
      const productCards = block.querySelectorAll('.product-item-card');
      const capCards = block.querySelectorAll('.capability-item-card');

      ScrollTrigger.create({
        trigger: block,
        start: 'top 75%',
        onEnter: () => {
          if (productCards.length) {
            gsap.fromTo(
              productCards,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' }
            );
          }
          if (capCards.length) {
            gsap.fromTo(
              capCards,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
            );
          }
        },
      });
    } else if (serviceId === '04') {
      const tableRows = block.querySelectorAll('.matrix-table tbody tr');
      const guaranteeBanner = block.querySelector('.light-guarantee-banner');

      ScrollTrigger.create({
        trigger: block,
        start: 'top 75%',
        onEnter: () => {
          if (tableRows.length) {
            gsap.fromTo(
              tableRows,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }
            );
          }
          if (guaranteeBanner) {
            gsap.fromTo(
              guaranteeBanner,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.25 }
            );
          }
        },
      });
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Masked Line & Heading Reveals (iti.ca .u-overflow > .u-anim.-translate)
// ─────────────────────────────────────────────────────────────────────────────
function initMaskedReveals() {
  const maskedInners = document.querySelectorAll('.u-mask-inner');
  maskedInners.forEach((inner) => {
    ScrollTrigger.create({
      trigger: inner.parentElement || inner,
      start: 'top 88%',
      onEnter: () => {
        inner.classList.add('is-revealed');
      },
    });
  });

  // Kicker tags slide-in
  document.querySelectorAll('.sec-kicker-tag').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Metric callouts pop
  document.querySelectorAll('.story-metric-callout').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Trust Bar Counters
// ─────────────────────────────────────────────────────────────────────────────
function initTrustBarCounters() {
  const trustBar = document.getElementById('trust-bar');
  if (!trustBar) return;
  const cards = trustBar.querySelectorAll('.trust-metric-card');
  if (!cards.length) return;

  ScrollTrigger.create({
    trigger: trustBar,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      cards.forEach((card, idx) => {
        const valElem = card.querySelector('.trust-metric-value');
        if (!valElem) return;
        gsap.fromTo(card, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.1, ease: 'power2.out' });
        const text = valElem.textContent.trim();
        if (text === '100%') {
          const counter = { val: 0 };
          gsap.to(counter, { val: 100, duration: 1.4, ease: 'power2.out', onUpdate: () => { valElem.textContent = Math.round(counter.val) + '%'; } });
        } else if (text === '99.99%') {
          const counter = { val: 80.0 };
          gsap.to(counter, { val: 99.99, duration: 1.6, ease: 'power2.out', onUpdate: () => { valElem.textContent = counter.val.toFixed(2) + '%'; } });
        }
      });
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Reveals
// ─────────────────────────────────────────────────────────────────────────────
function initSectionReveals() {
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    );
  });

  const processSection = document.getElementById('process');
  if (processSection) {
    const phaseCards = processSection.querySelectorAll('.process-phase-card');
    if (phaseCards.length) {
      gsap.fromTo(
        phaseCards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: processSection, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }
  }

  const guaranteeSection = document.getElementById('guarantee');
  if (guaranteeSection) {
    const gBox = guaranteeSection.querySelector('.guarantee-box-human');
    if (gBox) {
      gsap.fromTo(
        gBox,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: guaranteeSection, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );
    }
  }

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const narrative = aboutSection.querySelector('.about-narrative-col');
    const crestCard = aboutSection.querySelector('.about-crest-card');
    if (narrative && crestCard) {
      gsap.fromTo(
        [narrative, crestCard],
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: aboutSection, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );
    }
  }

  const consultationSection = document.getElementById('consultation');
  if (consultationSection) {
    const contactWrap = consultationSection.querySelector('.contact-container');
    if (contactWrap) {
      gsap.fromTo(
        contactWrap,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: consultationSection, start: 'top 82%', toggleActions: 'play none none none' },
        }
      );
    }
  }
}
