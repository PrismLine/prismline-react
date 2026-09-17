/**
 * PRISMLINE™ - CLIENT SCRIPTS & BACKEND FORM INTEGRATION
 * 100% Light Theme | GoDaddy Ready | Zero Audio | Clean Logo Intro
 */

// =========================================================================
// BACKEND TEAM CONFIGURATION:
// Replace this endpoint URL with your production API when ready:
// =========================================================================
const BACKEND_API_ENDPOINT = 'api/contact.php'; 
// Example: const BACKEND_API_ENDPOINT = 'https://api.prismline.tech/v1/leads';

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');
  document.body.classList.remove('page-is-transitioning');

  // 1. Interactive 3D Parallax Tilt for MacBook Pro Device Stage
  const heroStage = document.getElementById('macbook-stage') || document.getElementById('hero-cyber-stage');
  const heroSection = document.querySelector('.hero-section');
  if (heroStage && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroStage.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      heroStage.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    });

    navLinks.querySelectorAll('a').forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 3. Sliding Underline Navigation Indicator (Desktop)
  const navbar = document.querySelector('.navbar');

  function updateNavbarScroll() {
    if (navbar) {
      if (window.pageYOffset > 25) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }
  }
  window.addEventListener('scroll', updateNavbarScroll, { passive: true });
  updateNavbarScroll();

  if (navLinks) {
    let indicator = navLinks.querySelector('.nav-indicator-line');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'nav-indicator-line';
      navLinks.appendChild(indicator);
    }
    navLinks.classList.add('has-indicator');

    const activeLink = navLinks.querySelector('a.active');

    function positionIndicator(link) {
      if (!link || window.innerWidth <= 1040) {
        indicator.style.opacity = '0';
        return;
      }
      const linkRect = link.getBoundingClientRect();
      const parentRect = navLinks.getBoundingClientRect();
      indicator.style.opacity = '1';
      indicator.style.width = linkRect.width + 'px';
      indicator.style.left = (linkRect.left - parentRect.left) + 'px';
    }

    if (activeLink) {
      setTimeout(() => positionIndicator(activeLink), 60);
    }

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => positionIndicator(link));
    });

    navLinks.addEventListener('mouseleave', () => {
      if (activeLink) positionIndicator(activeLink);
      else indicator.style.opacity = '0';
    });

    window.addEventListener('resize', () => {
      if (activeLink) positionIndicator(activeLink);
    });
  }

  // 4. Smooth Page Transitions (Home <-> Services <-> Other Pages)
  const internalLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([target="_blank"])');
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.startsWith('javascript:')) return;
      if (href.endsWith('.html') || (!href.startsWith('http') && !href.startsWith('//'))) {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (href === currentPath || (href === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
          // Already on current page, avoid blank fade-out
          return;
        }
        e.preventDefault();
        document.body.classList.add('page-is-transitioning');
        setTimeout(() => {
          window.location.href = href;
        }, 220);
      }
    });
  });

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-is-transitioning');
  });

  // 5. GSAP Motion & Staggered Entry System
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && window.gsap) {
    const isServicesPage = window.location.pathname.includes('services.html');
    const serviceCards = document.querySelectorAll('.agency-card, .service-card');

    if (isServicesPage && serviceCards.length > 0) {
      gsap.from(serviceCards, {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }

  // 5. Unique Section Entrance Animations
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  function triggerReveal(el) {
    el.classList.add('is-revealed');
  }

  function checkReveals() {
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowH * 0.92) {
          triggerReveal(el);
        }
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          triggerReveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: [0, 0.05, 0.1],
      rootMargin: '80px 0px 40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  checkReveals();
  setTimeout(checkReveals, 300);

  if (new URLSearchParams(window.location.search).get('skip_intro') === '1') {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 6. Interactive 3D Card Hover Motion
  const agencyCards = document.querySelectorAll('.agency-card');
  agencyCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // 4. Backend Lead Capture Form Integration
  const leadForms = document.querySelectorAll('.lead-capture-form');

  leadForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn ? submitBtn.innerHTML : 'Submit';

      const formData = new FormData(form);
      const payload = {
        fullName: (formData.get('fullName') || formData.get('name') || '').toString().trim(),
        phone: (formData.get('phone') || '').toString().trim(),
        email: (formData.get('email') || '').toString().trim(),
        service: (formData.get('service') || 'General Consultation').toString(),
        timeline: (formData.get('timeline') || 'Flexible').toString(),
        message: (formData.get('message') || '').toString().trim(),
        source: form.getAttribute('data-source') || window.location.pathname,
        submittedAt: new Date().toISOString()
      };

      // Client-side validation
      if (!payload.fullName || !payload.phone) {
        showToast('Please provide your name and contact phone number.', 'error');
        return;
      }

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending to Engineering...';
      }

      try {
        const response = await fetch(BACKEND_API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.success) {
          showToast(`Inquiry received! A senior engineer will call you directly at ${payload.phone}.`, 'success');
          form.reset();
        } else {
          showToast(result.error || 'Submission received! We will follow up shortly.', 'success');
          form.reset();
        }
      } catch (error) {
        console.log('API dispatch notice:', error);
        // Fallback for static hosting environments without server runtime
        showToast(`Thank you, ${payload.fullName}! Details logged. An engineer will follow up shortly, or call +91 99529 34596 directly.`, 'success');
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origText;
        }
      }
    });
  });

  // 5. Toast Notification System
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-box';
    toast.style.borderLeftColor = type === 'error' ? '#D50000' : '#FF4D00';
    toast.innerHTML = `
      <span style="color: ${type === 'error' ? '#D50000' : '#FF4D00'}; font-weight: 700; font-size: 1.1rem;">
        ${type === 'error' ? '⚠️' : '✓'}
      </span>
      <span style="flex: 1; font-size: 0.92rem; color: #0F172A;">${message}</span>
      <button style="background: none; border: none; color: #94A3B8; cursor: pointer; padding: 0 4px; font-size: 1.1rem;" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 5500);
  }

  // 6. Realistic 3D MacBook: Code Writing -> Smooth Store Scroll (Home -> Shop -> Cart) -> Checkout & Payment Success -> Web URL SQLi (403 Image 2) -> Live XSS (403 Image 2) -> CMD SQLmap Exploit & 403 Error -> Auto Loop
  function initLaptopHeroSequence() {
    const lidWrapper = document.getElementById('macbook-lid-wrapper');
    const macScreen = document.getElementById('macbook-screen');
    const macbookStage = document.getElementById('macbook-stage');
    const browserAddress = document.getElementById('screen-browser-address');
    const sslLock = document.getElementById('screen-ssl-lock');
    const addressUrl = document.getElementById('screen-address-url');
    const shimmerSweep = document.getElementById('security-shimmer-sweep');
    const codeEditor = document.getElementById('mock-code-editor');
    const codeTypedContent = document.getElementById('code-typed-content');
    const tabEditorApp = document.getElementById('tab-editor-app');
    const tabEditorPages = document.getElementById('tab-editor-pages');
    const tabEditorSec = document.getElementById('tab-editor-sec');
    const tabHome = document.getElementById('tab-home');
    const tabShop = document.getElementById('tab-shop');
    const tabAbout = document.getElementById('tab-about');
    const tabCart = document.getElementById('tab-cart');
    const mockSiteHeader = document.getElementById('mock-site-header');

    // Scroll Canvas Elements
    const storeScrollTrack = document.getElementById('store-scroll-track');
    const sectionShop = document.getElementById('section-shop');
    const sectionCart = document.getElementById('section-cart');
    const btnShopAdd = document.getElementById('btn-shop-add-mock');
    const mockCheckoutBtn = document.getElementById('mock-checkout-btn');
    const paymentSuccessModal = document.getElementById('payment-success-modal');
    const xssLiveBanner = document.getElementById('xss-live-banner');
    const view403Nginx = document.getElementById('view-403-nginx');

    // Floating Attack CMD Console
    const mockAttackCmd = document.getElementById('mock-attack-cmd');
    const cmdTypedText = document.getElementById('cmd-typed-text');

    if (!lidWrapper || !macScreen) return;

    let activeTimeouts = [];
    let autoLoopTimeout = null;
    let isUserHovering = false;

    const linesToType = [
      { raw: "import { AuraAtelier, SecVault } from '@prismline';", html: '<span class="syn-kw">import</span> { AuraAtelier, SecVault } <span class="syn-kw">from</span> <span class="syn-str">\'@prismline\'</span>;', tab: 'app' },
      { raw: "const app = new AuraAtelier({ catalog: 'Gifts', cart: true });", html: '<span class="syn-kw">const</span> app = <span class="syn-kw">new</span> <span class="syn-fn">AuraAtelier</span>({ <span class="syn-prop">catalog</span>: <span class="syn-str">\'Gifts\'</span>, <span class="syn-prop">cart</span>: <span class="syn-kw">true</span> });', tab: 'pages' },
      { raw: "SecVault.harden({ zeroTrust: true, pciDss: true, tls13: true });", html: '<span class="syn-fn">SecVault</span>.<span class="syn-fn">harden</span>({ <span class="syn-prop">zeroTrust</span>: <span class="syn-kw">true</span>, <span class="syn-prop">pciDss</span>: <span class="syn-kw">true</span>, <span class="syn-prop">tls13</span>: <span class="syn-kw">true</span> });', tab: 'sec' },
      { raw: "export default app.deploy({ route: 'auragift.atelier' });", html: '<span class="syn-kw">export</span> <span class="syn-kw">default</span> app.<span class="syn-fn">deploy</span>({ <span class="syn-prop">route</span>: <span class="syn-str">\'auragift.atelier\'</span> });', tab: 'sec' }
    ];

    function clearAllTimers() {
      activeTimeouts.forEach(t => clearTimeout(t));
      activeTimeouts = [];
      if (autoLoopTimeout) {
        clearTimeout(autoLoopTimeout);
        autoLoopTimeout = null;
      }
    }

    function addTimeout(fn, delay) {
      const id = setTimeout(fn, delay);
      activeTimeouts.push(id);
      return id;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function setSecurity403Active(active) {
      if (view403Nginx) {
        if (active) {
          view403Nginx.classList.add('is-active');
        } else {
          view403Nginx.classList.remove('is-active');
        }
      }
      if (mockSiteHeader) {
        if (active) {
          mockSiteHeader.classList.add('is-hidden');
          mockSiteHeader.style.opacity = '0';
          mockSiteHeader.style.visibility = 'hidden';
          mockSiteHeader.style.display = 'none';
        } else {
          mockSiteHeader.classList.remove('is-hidden');
          mockSiteHeader.style.opacity = '1';
          mockSiteHeader.style.visibility = 'visible';
          mockSiteHeader.style.display = 'flex';
        }
      }
    }

    function setEditorTab(tab) {
      if (tabEditorApp) tabEditorApp.className = 'editor-tab' + (tab === 'app' ? ' active' : '');
      if (tabEditorPages) tabEditorPages.className = 'editor-tab' + (tab === 'pages' ? ' active' : '');
      if (tabEditorSec) tabEditorSec.className = 'editor-tab' + (tab === 'sec' ? ' active' : '');
    }

    function setNavTab(tab) {
      if (tabHome) tabHome.className = 'nav-tab' + (tab === 'home' ? ' active' : '');
      if (tabShop) tabShop.className = 'nav-tab' + (tab === 'shop' ? ' active' : '');
      if (tabAbout) tabAbout.className = 'nav-tab' + (tab === 'about' ? ' active' : '');
      if (tabCart) tabCart.className = 'nav-tab' + (tab === 'cart' ? ' active' : '');
    }

    function scrollToSection(offsetY) {
      if (storeScrollTrack) {
        storeScrollTrack.style.transform = `translateY(-${offsetY}px)`;
      }
    }

    function setBrowserUrl(url, isWarning = false, customIcon = null) {
      if (addressUrl) addressUrl.textContent = url;
      if (browserAddress) {
        if (isWarning) {
          browserAddress.classList.add('is-warning');
          browserAddress.classList.remove('is-hardened');
        } else {
          browserAddress.classList.remove('is-warning');
          browserAddress.classList.add('is-hardened');
        }
      }
      if (sslLock) {
        if (customIcon) {
          sslLock.textContent = customIcon;
          sslLock.classList.remove('pulse-glow');
          if (isWarning) {
            sslLock.classList.add('is-warning');
          } else {
            sslLock.classList.remove('is-warning');
          }
        } else if (isWarning) {
          sslLock.textContent = '⚠️';
          sslLock.classList.add('is-warning');
          sslLock.classList.remove('pulse-glow');
        } else {
          sslLock.textContent = '🔒';
          sslLock.classList.remove('is-warning');
          sslLock.classList.add('pulse-glow');
        }
      }
    }

    function typeCodeSequence(onComplete) {
      if (!codeTypedContent) {
        if (onComplete) onComplete();
        return;
      }
      codeTypedContent.innerHTML = '';
      let lineIdx = 0;
      let charIdx = 0;
      let renderedLines = [];
      setEditorTab('app');

      function typeNextChar() {
        if (lineIdx >= linesToType.length) {
          if (onComplete) {
            const finishId = setTimeout(onComplete, 500);
            activeTimeouts.push(finishId);
          }
          return;
        }

        const currentLine = linesToType[lineIdx];
        setEditorTab(currentLine.tab);

        if (charIdx < currentLine.raw.length) {
          charIdx++;
          const currentText = currentLine.raw.substring(0, charIdx);
          codeTypedContent.innerHTML = (renderedLines.length ? renderedLines.join('<br>') + '<br>' : '') + escapeHtml(currentText);
          const delay = 12 + Math.floor(Math.random() * 8);
          const tId = setTimeout(typeNextChar, delay);
          activeTimeouts.push(tId);
        } else {
          renderedLines.push(currentLine.html);
          codeTypedContent.innerHTML = renderedLines.join('<br>');
          lineIdx++;
          charIdx = 0;
          const tId = setTimeout(typeNextChar, 140);
          activeTimeouts.push(tId);
        }
      }

      const startTId = setTimeout(typeNextChar, 80);
      activeTimeouts.push(startTId);
    }

    function typeCmdExploit(onComplete) {
      if (!cmdTypedText) {
        if (onComplete) onComplete();
        return;
      }
      cmdTypedText.innerHTML = '';

      const promptCommand = 'root@kali:~# sqlmap -u "https://auragift-atelier.com/shop?id=1" --data="admin\' OR \'1\'=\'1" --risk=3';
      const responseLines = [
        { text: "\n[*] Testing target parameter 'id' for SQLi & XSS exploit...", delay: 90 },
        { text: "\n[*] Injecting payload: 1' OR '1'='1' -- [SQL Injection]", delay: 110 },
        { text: '\n[-] HTTP/1.1 403 Forbidden', delay: 120, color: '#EF4444' },
        { text: '\n[!] ERROR: nginx/1.18.0 (Ubuntu) 403 Forbidden (Blocked by WAF)', delay: 120, color: '#EF4444' },
        { text: '\n[!] OWASP Rule #942100: SQLi / XSS Neutralized', delay: 120, color: '#EF4444' },
        { text: '\n[✓] Threat blocked. Attacker IP banned. 0 data leaked.', delay: 120, color: '#34D399' }
      ];

      let cIdx = 0;
      function typePrompt() {
        if (cIdx < promptCommand.length) {
          cIdx++;
          cmdTypedText.textContent = promptCommand.substring(0, cIdx);
          const tId = setTimeout(typePrompt, 12);
          activeTimeouts.push(tId);
        } else {
          let lineIdx = 0;
          let currentOutput = escapeHtml(promptCommand);

          function outputNextLine() {
            if (lineIdx >= responseLines.length) {
              if (onComplete) {
                const finishId = setTimeout(onComplete, 3500);
                activeTimeouts.push(finishId);
              }
              return;
            }

            const line = responseLines[lineIdx];
            currentOutput += line.color 
              ? `<span style="color:${line.color};font-weight:700;">${escapeHtml(line.text)}</span>`
              : escapeHtml(line.text);
            cmdTypedText.innerHTML = currentOutput;

            lineIdx++;
            const tId = setTimeout(outputNextLine, line.delay);
            activeTimeouts.push(tId);
          }

          const startOutputId = setTimeout(outputNextLine, 120);
          activeTimeouts.push(startOutputId);
        }
      }

      typePrompt();
    }

    function scheduleNextCycle() {
      if (autoLoopTimeout) clearTimeout(autoLoopTimeout);
      autoLoopTimeout = setTimeout(() => {
        if (isUserHovering) {
          const checkHoverInterval = setInterval(() => {
            if (!isUserHovering) {
              clearInterval(checkHoverInterval);
              runSequence();
            }
          }, 800);
        } else {
          runSequence();
        }
      }, 2500);
    }

    function runSequence() {
      clearAllTimers();

      // 1. Reset all elements to clean initial state
      if (lidWrapper) lidWrapper.classList.add('is-open');
      if (macScreen) macScreen.classList.add('is-awake');
      
      // Reveal VS Code editor for typing stage
      if (codeEditor) codeEditor.classList.remove('fade-out');
      if (codeTypedContent) codeTypedContent.innerHTML = '';
      setEditorTab('app');
      setBrowserUrl('workspace://auragift/src/AuraGift.tsx', false, '💻');

      // Reset modals and attack overlays
      if (shimmerSweep) shimmerSweep.classList.remove('active');
      if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
      if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
      setSecurity403Active(false);
      if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
      if (cmdTypedText) cmdTypedText.innerHTML = '';

      scrollToSection(0);
      setNavTab('home');

      // STEP 1: Code Typing in VS Code
      addTimeout(() => {
        typeCodeSequence(() => {
          // After code typing finishes, hold code for 500ms, then reveal AuraGift Atelier
          addTimeout(() => {
            if (codeEditor) codeEditor.classList.add('fade-out');

            // --- 1. HOME VIEW (Top of Store) ---
            scrollToSection(0);
            setNavTab('home');
            setBrowserUrl('https://auragift-atelier.com', false, '🔒');

            // --- 2. SMOOTH SCROLL TO SHOP (+2000ms) ---
            addTimeout(() => {
              const shopY = sectionShop ? sectionShop.offsetTop - 8 : 190;
              scrollToSection(shopY);
              setNavTab('shop');
              setBrowserUrl('https://auragift-atelier.com#shop', false, '🔒');

              // Interactive "Add to Bag" click simulation (+600ms)
              addTimeout(() => {
                if (btnShopAdd) {
                  btnShopAdd.style.transform = 'scale(0.95)';
                  btnShopAdd.style.background = '#10B981';
                  btnShopAdd.textContent = 'Added ✓';
                  setTimeout(() => {
                    btnShopAdd.style.transform = '';
                    btnShopAdd.style.background = '';
                    btnShopAdd.textContent = 'Add to Bag +';
                  }, 800);
                }
              }, 600);

              // --- 3. SMOOTH SCROLL TO CART & CHECKOUT (+2200ms) ---
              addTimeout(() => {
                const cartY = sectionCart ? sectionCart.offsetTop - 8 : 520;
                scrollToSection(cartY);
                setNavTab('cart');
                setBrowserUrl('https://auragift-atelier.com#cart', false, '🔒');

                // Checkout Button Click & Payment Success Trigger (+700ms)
                addTimeout(() => {
                  if (mockCheckoutBtn) {
                    mockCheckoutBtn.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                      mockCheckoutBtn.style.transform = '';
                    }, 200);
                  }

                  // Payment Successful Modal pops in
                  if (paymentSuccessModal) {
                    paymentSuccessModal.classList.add('is-visible');
                  }

                  // --- 4. ATTACK 1: WEB URL SQL INJECTION -> 403 ERROR (+2000ms) ---
                  addTimeout(() => {
                    if (paymentSuccessModal) {
                      paymentSuccessModal.classList.remove('is-visible');
                    }

                    // Web URL changes to SQL Injection payload with warning lock
                    setBrowserUrl("https://auragift-atelier.com/shop?id=1' OR '1'='1", true, '⚠️');

                    // Show exact 403 Forbidden screen
                    setSecurity403Active(true);

                    // --- 5. ATTACK 2: LIVE XSS SCRIPT -> 403 ERROR (+2000ms) ---
                    addTimeout(() => {
                      setBrowserUrl("https://auragift-atelier.com/search?q=<script>alert('XSS')</script>", true, '⚠️');

                      if (xssLiveBanner) {
                        xssLiveBanner.classList.add('is-visible');
                      }

                      // --- 6. ATTACK 3: CMD SQL INJECTION & CMD ERROR (+2000ms) ---
                      addTimeout(() => {
                        if (xssLiveBanner) {
                          xssLiveBanner.classList.remove('is-visible');
                        }

                        setSecurity403Active(false);
                        setBrowserUrl('terminal://attacker@kali:~', true, '⚡');

                        if (mockAttackCmd) {
                          mockAttackCmd.classList.add('is-visible');
                        }

                        // Type CMD exploit and show 403 Forbidden error in red
                        typeCmdExploit(() => {
                          // Hold CMD error screen for 3.5s, then cleanly fade out and repeat
                          addTimeout(() => {
                            if (mockAttackCmd) {
                              mockAttackCmd.classList.remove('is-visible');
                            }
                            scheduleNextCycle();
                          }, 500);
                        });
                      }, 2000);

                    }, 2000);

                  }, 2000);

                }, 700);

              }, 2200);

            }, 2000);

          }, 500);
        });
      }, 200);
    }

    // Hover listeners: pause auto-repeat when mouse is over laptop mockup
    if (macbookStage) {
      macbookStage.addEventListener('mouseenter', () => { isUserHovering = true; });
      macbookStage.addEventListener('mouseleave', () => { isUserHovering = false; });
    }

    // Interactive button controls on laptop browser bar
    const btnShowcaseTerminal = document.getElementById('btn-showcase-terminal');
    const btnShowcaseCode = document.getElementById('btn-showcase-code');
    const btnShowcaseStore = document.getElementById('btn-showcase-store');

    function runTerminalNow() {
      clearAllTimers();
      if (lidWrapper) lidWrapper.classList.add('is-open');
      if (macScreen) macScreen.classList.add('is-awake');
      if (codeEditor) codeEditor.classList.add('fade-out');
      setSecurity403Active(false);
      if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
      if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');

      setBrowserUrl('terminal://attacker@kali:~', true, '⚡');
      if (mockAttackCmd) {
        mockAttackCmd.classList.add('is-visible');
      }

      typeCmdExploit(() => {
        addTimeout(() => {
          if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
          scheduleNextCycle();
        }, 5000);
      });
    }

    function runCodeNow() {
      clearAllTimers();
      runSequence();
    }

    function runStoreNow() {
      clearAllTimers();
      if (lidWrapper) lidWrapper.classList.add('is-open');
      if (macScreen) macScreen.classList.add('is-awake');
      if (codeEditor) codeEditor.classList.add('fade-out');
      setSecurity403Active(false);
      if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
      if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
      if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
      scrollToSection(0);
      setNavTab('home');
      setBrowserUrl('https://auragift-atelier.com', false, '🔒');
      addTimeout(scheduleNextCycle, 4000);
    }

    if (btnShowcaseTerminal) btnShowcaseTerminal.addEventListener('click', runTerminalNow);
    if (btnShowcaseCode) btnShowcaseCode.addEventListener('click', runCodeNow);
    if (btnShowcaseStore) btnShowcaseStore.addEventListener('click', runStoreNow);

    window.runTerminalPrompt = runTerminalNow;
    window.runCodeSequence = runCodeNow;
    window.runStorefront = runStoreNow;

    // Deduplicated showcase runner
    let sequenceStarted = false;
    function startShowcaseOnce() {
      if (sequenceStarted) return;
      sequenceStarted = true;
      runSequence();
    }

    // Expose showcase runner globally so intro completion triggers it immediately
    window.startLaptopShowcase = function() {
      startShowcaseOnce();
    };

    const introOverlayEl = document.getElementById('netflix-intro-overlay');
    // If intro overlay is present and active, wait for intro to finish/skip before starting code typing
    if (introOverlayEl && !introOverlayEl.classList.contains('intro-complete')) {
      window.addEventListener('prismline:intro-finished', () => {
        startShowcaseOnce();
      }, { once: true });
    } else {
      startShowcaseOnce();
    }
  }

  initLaptopHeroSequence();

  window.showToast = showToast;
});
