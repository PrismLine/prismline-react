/**
 * PrismLine™ Awwwards-Caliber Editorial Scroll Story Engine
 * Pinned Scroll-Scrubbed Storytelling inspired by iti.ca + dayos.com
 * Powered by Lenis 1.1 + GSAP 3.12.5 + ScrollTrigger
 * 100% Light Theme • Code-Driven Visuals • Zero AI Templates
 */
(function() {
  'use strict';

  // 1. Initialize Lenis Smooth Scroll Engine
  let lenis = null;

  function initLenis() {
    if (typeof Lenis === 'undefined') {
      console.info('[PrismLine] Lenis not detected; using native scroll.');
      return;
    }

    try {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.8,
        infinite: false
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      }

      // Handle internal anchor links with Lenis smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (!targetId || targetId === '#') return;
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            e.preventDefault();
            lenis.scrollTo(targetElem, { offset: -60, duration: 1.2 });
          }
        });
      });

      window.lenis = lenis;
    } catch (err) {
      console.warn('[PrismLine] Lenis initialization error:', err);
    }
  }

  // 2. Initialize GSAP ScrollTrigger Animations
  function initScrollStory() {
    initLenis();

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[PrismLine] GSAP or ScrollTrigger not loaded.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    initPinnedEditorialBlocks();
    initTrustBarCounters();
    initEditorialSectionReveals();
  }

  /**
   * Pinned Scroll-Scrubbed Editorial Blocks (dayos.com style)
   * Four distinct code-driven visual devices on desktop; unpinned on mobile
   */
  function initPinnedEditorialBlocks() {
    const blocks = document.querySelectorAll('.editorial-story-block');
    if (!blocks.length) return;

    ScrollTrigger.matchMedia({
      // DESKTOP & TABLET LANDSCAPE (min-width: 992px): Pinned scrubbed timelines
      "(min-width: 992px)": function() {
        blocks.forEach((block) => {
          const stickyStage = block.querySelector('.story-sticky-stage');
          const serviceId = block.getAttribute('data-service');
          if (!stickyStage) return;

          const masterTl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top top",
              end: "+=120%",
              pin: stickyStage,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true
            }
          });

          // Block 1: Corporate Infrastructure (SVG Network Topology)
          if (serviceId === '01') {
            const nodes = block.querySelectorAll('.topo-node');

            // Staggered node illuminations during scrub
            masterTl.to(nodes, {
              scale: 1.04,
              transformOrigin: 'center center',
              stagger: 0.08,
              duration: 0.35,
              yoyo: true,
              repeat: 1
            }, 0.1);

            // Staggered node illuminations
            masterTl.to(nodes, {
              scale: 1.03,
              transformOrigin: 'center center',
              stagger: 0.08,
              duration: 0.3,
              yoyo: true,
              repeat: 1
            }, 0.2);

            // Core verified node lock
            const secureCore = block.querySelector('.node-core rect');
            if (secureCore) {
              masterTl.to(secureCore, {
                stroke: '#10B981',
                strokeWidth: 2.5,
                duration: 0.3
              }, 0.5);
            }
          }

          // Block 2: Custom Web Applications (TypeScript Security Workbench)
          else if (serviceId === '02') {
            const workbench = block.querySelector('#code-workbench');
            const numRows = block.querySelectorAll('.numbered-row');
            const statusRight = block.querySelector('.wb-status-right');

            if (workbench) {
              masterTl.fromTo(workbench, 
                { y: 25, opacity: 0.9 },
                { y: -10, opacity: 1, duration: 0.8, ease: 'power1.out' },
                0
              );
            }

            // Stagger highlight on numbered editorial points in lockstep
            if (numRows.length) {
              masterTl.fromTo(numRows,
                { opacity: 0.45, x: 12 },
                { opacity: 1, x: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' },
                0.15
              );
            }

            if (statusRight) {
              masterTl.fromTo(statusRight,
                { scale: 0.95 },
                { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1 },
                0.6
              );
            }
          }

          // Block 3: Digital Commerce (Flat Storefront & Checkout Canvas)
          else if (serviceId === '03') {
            const productCards = block.querySelectorAll('.product-item-card');
            const checkoutPane = block.querySelector('.checkout-sheet-pane');
            const capCards = block.querySelectorAll('.capability-item-card');

            // Simulate product selection on scroll scrub
            if (productCards.length >= 2) {
              masterTl.to(productCards[0], {
                borderColor: '#FF4D00',
                y: -4,
                boxShadow: '0 12px 24px rgba(255, 77, 0, 0.12)',
                duration: 0.4
              }, 0.15);

              masterTl.to(productCards[1], {
                borderColor: '#CBD5E1',
                y: -2,
                duration: 0.4
              }, 0.3);
            }

            // Express checkout pane activates
            if (checkoutPane) {
              const payMethods = checkoutPane.querySelectorAll('.payment-method-row');
              if (payMethods.length >= 2) {
                masterTl.to(payMethods[0], {
                  scale: 1.02,
                  duration: 0.25,
                  yoyo: true,
                  repeat: 1
                }, 0.45);
              }
            }

            // Capabilities trio gentle lift
            if (capCards.length) {
              masterTl.fromTo(capCards,
                { y: 15, opacity: 0.7 },
                { y: 0, opacity: 1, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
                0.4
              );
            }
          }

          // Block 4: Zero-Breach Hardening (Comparison Matrix & Guarantee)
          else if (serviceId === '04') {
            const tableRows = block.querySelectorAll('.matrix-table tbody tr');
            const guaranteeBanner = block.querySelector('.light-guarantee-banner');

            if (tableRows.length) {
              masterTl.fromTo(tableRows,
                { opacity: 0.5, y: 10 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
                0.1
              );
            }

            // Guarantee banner lifts in cleanly
            if (guaranteeBanner) {
              masterTl.fromTo(guaranteeBanner,
                { y: 24, opacity: 0.8 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                0.5
              );
            }
          }
        });
      },

      // MOBILE & TOUCH DEVICES (max-width: 991px): Clean unpinned staggered entry reveals
      "(max-width: 991px)": function() {
        blocks.forEach((block) => {
          const textTrack = block.querySelector('.story-text-track');
          const visualStage = block.querySelector('.story-visual-stage, .storefront-dual-canvas, .comparison-table-card');

          if (textTrack) {
            gsap.from(textTrack, {
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none none"
              },
              opacity: 0,
              y: 24,
              duration: 0.65,
              ease: "power2.out"
            });
          }

          if (visualStage) {
            gsap.from(visualStage, {
              scrollTrigger: {
                trigger: visualStage,
                start: "top 88%",
                toggleActions: "play none none none"
              },
              opacity: 0,
              y: 28,
              duration: 0.7,
              ease: "power2.out"
            });
          }
        });
      }
    });
  }

  /**
   * Numeric Count-Up Tweens for Trust Bar Metrics
   */
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

          // Card entrance
          gsap.fromTo(card,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.1, ease: 'power2.out' }
          );

          // Animated numeric count
          const text = valElem.textContent.trim();
          if (text === '100%') {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: 100,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                valElem.textContent = Math.round(counter.val) + '%';
              }
            });
          } else if (text === '99.99%') {
            const counter = { val: 80.0 };
            gsap.to(counter, {
              val: 99.99,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                valElem.textContent = counter.val.toFixed(2) + '%';
              }
            });
          }
        });
      }
    });
  }

  /**
   * Unpinned Staggered Entrance Reveals for Other Sections
   */
  function initEditorialSectionReveals() {
    // 1. Process 4-Stage Cards
    const processSection = document.getElementById('process');
    if (processSection) {
      const phaseCards = processSection.querySelectorAll('.process-phase-card');
      if (phaseCards.length) {
        gsap.from(phaseCards, {
          scrollTrigger: {
            trigger: processSection,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 28,
          stagger: 0.14,
          duration: 0.75,
          ease: 'power3.out'
        });
      }
    }

    // 2. Guarantee Section
    const guaranteeSection = document.getElementById('guarantee');
    if (guaranteeSection) {
      const gBox = guaranteeSection.querySelector('.guarantee-box-human');
      if (gBox) {
        gsap.from(gBox, {
          scrollTrigger: {
            trigger: guaranteeSection,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    }

    // 3. About Studio Section
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const narrative = aboutSection.querySelector('.about-narrative-col');
      const crestCard = aboutSection.querySelector('.about-crest-card');

      if (narrative && crestCard) {
        gsap.from([narrative, crestCard], {
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 26,
          stagger: 0.15,
          duration: 0.75,
          ease: 'power2.out'
        });
      }
    }

    // 4. Consultation & Form Section
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      const contactWrap = consultationSection.querySelector('.contact-container');
      if (contactWrap) {
        gsap.from(contactWrap, {
          scrollTrigger: {
            trigger: consultationSection,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: 'power3.out'
        });
      }
    }
  }

  // Hook into lifecycle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollStory);
  } else {
    initScrollStory();
  }

  // Refresh ScrollTrigger once window fully finishes loading images & styles
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  // Also refresh when cinematic intro completes
  window.addEventListener('prismline:intro-finished', () => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  // Expose engine and Lenis to window
  window.PrismLineScrollStory = {
    refresh: () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      if (lenis) lenis.resize();
    },
    lenis: () => lenis
  };
})();
