/**
 * useLaptopSequence — MacBook Hero Animation (ported from main.js initLaptopHeroSequence)
 */
import { useEffect } from 'react';

const BACKEND_API_ENDPOINT = 'api/contact.php';

export function useLaptopSequence() {
  useEffect(() => {
    // Defer to next frame so DOM is fully painted
    const raf = requestAnimationFrame(() => {
      initLaptopHeroSequence();
      initNavScrollBehavior();
      initRevealObserver();
      initAgencyCardHover();
      initLeadForms();
    });
    return () => cancelAnimationFrame(raf);
  }, []);
}

function initNavScrollBehavior() {
  const navbar = document.querySelector('.navbar');
  function updateNavbarScroll() {
    if (navbar) {
      if (window.pageYOffset > 25) navbar.classList.add('is-scrolled');
      else navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbarScroll, { passive: true });
  updateNavbarScroll();

  const navLinks = document.querySelector('.nav-links');
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
      if (!link || window.innerWidth <= 1040) { indicator.style.opacity = '0'; return; }
      const linkRect = link.getBoundingClientRect();
      const parentRect = navLinks.getBoundingClientRect();
      indicator.style.opacity = '1';
      indicator.style.width = linkRect.width + 'px';
      indicator.style.left = (linkRect.left - parentRect.left) + 'px';
    }

    if (activeLink) setTimeout(() => positionIndicator(activeLink), 60);
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('mouseenter', () => positionIndicator(link));
    });
    navLinks.addEventListener('mouseleave', () => {
      if (activeLink) positionIndicator(activeLink);
      else indicator.style.opacity = '0';
    });
    window.addEventListener('resize', () => { if (activeLink) positionIndicator(activeLink); });
  }
}

function initRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const triggerReveal = (el) => el.classList.add('is-revealed');

  if (new URLSearchParams(window.location.search).get('skip_intro') === '1') {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          triggerReveal(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: [0, 0.05, 0.1], rootMargin: '80px 0px 40px 0px' });
    revealElements.forEach(el => observer.observe(el));
  }

  function checkReveals() {
    const wh = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed') && el.getBoundingClientRect().top <= wh * 0.92) {
        triggerReveal(el);
      }
    });
  }
  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });
  checkReveals();
  setTimeout(checkReveals, 300);
}

function initAgencyCardHover() {
  document.querySelectorAll('.agency-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

function initLeadForms() {
  document.querySelectorAll('.lead-capture-form').forEach(form => {
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
        submittedAt: new Date().toISOString(),
      };
      if (!payload.fullName || !payload.phone) {
        window.showToast && window.showToast('Please provide your name and contact phone number.', 'error');
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending to Engineering...'; }
      try {
        const response = await fetch(BACKEND_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.success) {
          window.showToast && window.showToast(`Inquiry received! A senior engineer will call you directly at ${payload.phone}.`, 'success');
          form.reset();
        } else {
          window.showToast && window.showToast(result.error || 'Submission received! We will follow up shortly.', 'success');
          form.reset();
        }
      } catch {
        window.showToast && window.showToast(`Thank you, ${payload.fullName}! An engineer will follow up shortly, or call +91 99529 34596 directly.`, 'success');
        form.reset();
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = origText; }
      }
    });
  });
}

function initLaptopHeroSequence() {
  const lidWrapper = document.getElementById('macbook-lid-wrapper');
  const macScreen = document.getElementById('macbook-screen');
  const macbookStage = document.getElementById('macbook-stage');
  const addressUrl = document.getElementById('screen-address-url');
  const browserAddress = document.getElementById('screen-browser-address');
  const sslLock = document.getElementById('screen-ssl-lock');
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
  const storeScrollTrack = document.getElementById('store-scroll-track');
  const sectionShop = document.getElementById('section-shop');
  const sectionCart = document.getElementById('section-cart');
  const btnShopAdd = document.getElementById('btn-shop-add-mock');
  const mockCheckoutBtn = document.getElementById('mock-checkout-btn');
  const paymentSuccessModal = document.getElementById('payment-success-modal');
  const xssLiveBanner = document.getElementById('xss-live-banner');
  const view403Nginx = document.getElementById('view-403-nginx');
  const mockAttackCmd = document.getElementById('mock-attack-cmd');
  const cmdTypedText = document.getElementById('cmd-typed-text');

  if (!lidWrapper || !macScreen) return;

  // MacBook 3D parallax tilt
  const heroSection = document.querySelector('.hero-section');
  if (macbookStage && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      macbookStage.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    heroSection.addEventListener('mouseleave', () => {
      macbookStage.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
  }

  let activeTimeouts = [];
  let autoLoopTimeout = null;
  let isUserHovering = false;

  const linesToType = [
    { raw: "import { AuraAtelier, SecVault } from '@prismline';", html: '<span class="syn-kw">import</span> { AuraAtelier, SecVault } <span class="syn-kw">from</span> <span class="syn-str">\'@prismline\'</span>;', tab: 'app' },
    { raw: "const app = new AuraAtelier({ catalog: 'Gifts', cart: true });", html: '<span class="syn-kw">const</span> app = <span class="syn-kw">new</span> <span class="syn-fn">AuraAtelier</span>({ <span class="syn-prop">catalog</span>: <span class="syn-str">\'Gifts\'</span>, <span class="syn-prop">cart</span>: <span class="syn-kw">true</span> });', tab: 'pages' },
    { raw: "SecVault.harden({ zeroTrust: true, pciDss: true, tls13: true });", html: '<span class="syn-fn">SecVault</span>.<span class="syn-fn">harden</span>({ <span class="syn-prop">zeroTrust</span>: <span class="syn-kw">true</span>, <span class="syn-prop">pciDss</span>: <span class="syn-kw">true</span>, <span class="syn-prop">tls13</span>: <span class="syn-kw">true</span> });', tab: 'sec' },
    { raw: "export default app.deploy({ route: 'auragift.atelier' });", html: '<span class="syn-kw">export</span> <span class="syn-kw">default</span> app.<span class="syn-fn">deploy</span>({ <span class="syn-prop">route</span>: <span class="syn-str">\'auragift.atelier\'</span> });', tab: 'sec' },
  ];

  function escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function clearAllTimers() { activeTimeouts.forEach(t => clearTimeout(t)); activeTimeouts = []; if (autoLoopTimeout) { clearTimeout(autoLoopTimeout); autoLoopTimeout = null; } }
  function addTimeout(fn, delay) { const id = setTimeout(fn, delay); activeTimeouts.push(id); return id; }

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
  function scrollToSection(offsetY) { if (storeScrollTrack) storeScrollTrack.style.transform = `translateY(-${offsetY}px)`; }
  function setSecurity403Active(active) {
    if (view403Nginx) view403Nginx.classList[active ? 'add' : 'remove']('is-active');
    if (mockSiteHeader) {
      if (active) { mockSiteHeader.classList.add('is-hidden'); mockSiteHeader.style.display = 'none'; }
      else { mockSiteHeader.classList.remove('is-hidden'); mockSiteHeader.style.display = 'flex'; }
    }
  }
  function setBrowserUrl(url, isWarning = false, customIcon = null) {
    if (addressUrl) addressUrl.textContent = url;
    if (browserAddress) {
      browserAddress.classList[isWarning ? 'add' : 'remove']('is-warning');
      browserAddress.classList[isWarning ? 'remove' : 'add']('is-hardened');
    }
    if (sslLock) {
      if (customIcon) { sslLock.textContent = customIcon; sslLock.classList[isWarning ? 'add' : 'remove']('is-warning'); }
      else if (isWarning) { sslLock.textContent = '⚠️'; sslLock.classList.add('is-warning'); sslLock.classList.remove('pulse-glow'); }
      else { sslLock.textContent = '🔒'; sslLock.classList.remove('is-warning'); sslLock.classList.add('pulse-glow'); }
    }
  }

  function typeCodeSequence(onComplete) {
    if (!codeTypedContent) { if (onComplete) onComplete(); return; }
    codeTypedContent.innerHTML = '';
    let lineIdx = 0, charIdx = 0, renderedLines = [];
    setEditorTab('app');
    function typeNextChar() {
      if (lineIdx >= linesToType.length) { if (onComplete) { const id = setTimeout(onComplete, 500); activeTimeouts.push(id); } return; }
      const currentLine = linesToType[lineIdx];
      setEditorTab(currentLine.tab);
      if (charIdx < currentLine.raw.length) {
        charIdx++;
        codeTypedContent.innerHTML = (renderedLines.length ? renderedLines.join('<br>') + '<br>' : '') + escapeHtml(currentLine.raw.substring(0, charIdx));
        const tId = setTimeout(typeNextChar, 12 + Math.floor(Math.random() * 8));
        activeTimeouts.push(tId);
      } else {
        renderedLines.push(currentLine.html);
        codeTypedContent.innerHTML = renderedLines.join('<br>');
        lineIdx++; charIdx = 0;
        const tId = setTimeout(typeNextChar, 140);
        activeTimeouts.push(tId);
      }
    }
    const startTId = setTimeout(typeNextChar, 80); activeTimeouts.push(startTId);
  }

  function typeCmdExploit(onComplete) {
    if (!cmdTypedText) { if (onComplete) onComplete(); return; }
    cmdTypedText.innerHTML = '';
    const promptCommand = 'root@kali:~# sqlmap -u "https://auragift-atelier.com/shop?id=1" --data="admin\' OR \'1\'=\'1" --risk=3';
    const responseLines = [
      { text: "\n[*] Testing target parameter 'id' for SQLi & XSS exploit...", delay: 90 },
      { text: "\n[*] Injecting payload: 1' OR '1'='1' -- [SQL Injection]", delay: 110 },
      { text: '\n[-] HTTP/1.1 403 Forbidden', delay: 120, color: '#EF4444' },
      { text: '\n[!] ERROR: nginx/1.18.0 (Ubuntu) 403 Forbidden (Blocked by WAF)', delay: 120, color: '#EF4444' },
      { text: '\n[!] OWASP Rule #942100: SQLi / XSS Neutralized', delay: 120, color: '#EF4444' },
      { text: '\n[✓] Threat blocked. Attacker IP banned. 0 data leaked.', delay: 120, color: '#34D399' },
    ];
    let cIdx = 0;
    function typePrompt() {
      if (cIdx < promptCommand.length) {
        cIdx++;
        cmdTypedText.textContent = promptCommand.substring(0, cIdx);
        const tId = setTimeout(typePrompt, 12); activeTimeouts.push(tId);
      } else {
        let lineIdx = 0;
        let currentOutput = escapeHtml(promptCommand);
        function outputNextLine() {
          if (lineIdx >= responseLines.length) { if (onComplete) { const id = setTimeout(onComplete, 3500); activeTimeouts.push(id); } return; }
          const line = responseLines[lineIdx];
          currentOutput += line.color ? `<span style="color:${line.color};font-weight:700;">${escapeHtml(line.text)}</span>` : escapeHtml(line.text);
          cmdTypedText.innerHTML = currentOutput;
          lineIdx++;
          const tId = setTimeout(outputNextLine, line.delay); activeTimeouts.push(tId);
        }
        const id = setTimeout(outputNextLine, 120); activeTimeouts.push(id);
      }
    }
    typePrompt();
  }

  function scheduleNextCycle() {
    if (autoLoopTimeout) clearTimeout(autoLoopTimeout);
    autoLoopTimeout = setTimeout(() => {
      if (isUserHovering) {
        const chk = setInterval(() => { if (!isUserHovering) { clearInterval(chk); runSequence(); } }, 800);
      } else { runSequence(); }
    }, 2500);
  }

  function runSequence() {
    clearAllTimers();
    if (lidWrapper) lidWrapper.classList.add('is-open');
    if (macScreen) macScreen.classList.add('is-awake');
    if (codeEditor) codeEditor.classList.remove('fade-out');
    if (codeTypedContent) codeTypedContent.innerHTML = '';
    setEditorTab('app');
    setBrowserUrl('workspace://auragift/src/AuraGift.tsx', false, '💻');
    if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
    if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
    setSecurity403Active(false);
    if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
    if (cmdTypedText) cmdTypedText.innerHTML = '';
    scrollToSection(0);
    setNavTab('home');

    addTimeout(() => {
      typeCodeSequence(() => {
        addTimeout(() => {
          if (codeEditor) codeEditor.classList.add('fade-out');
          scrollToSection(0); setNavTab('home');
          setBrowserUrl('https://auragift-atelier.com', false, '🔒');
          addTimeout(() => {
            const shopY = sectionShop ? sectionShop.offsetTop - 8 : 190;
            scrollToSection(shopY); setNavTab('shop');
            setBrowserUrl('https://auragift-atelier.com#shop', false, '🔒');
            addTimeout(() => {
              if (btnShopAdd) {
                btnShopAdd.style.transform = 'scale(0.95)'; btnShopAdd.style.background = '#10B981'; btnShopAdd.textContent = 'Added ✓';
                setTimeout(() => { btnShopAdd.style.transform = ''; btnShopAdd.style.background = ''; btnShopAdd.textContent = 'Add to Bag +'; }, 800);
              }
            }, 600);
            addTimeout(() => {
              const cartY = sectionCart ? sectionCart.offsetTop - 8 : 520;
              scrollToSection(cartY); setNavTab('cart');
              setBrowserUrl('https://auragift-atelier.com#cart', false, '🔒');
              addTimeout(() => {
                if (mockCheckoutBtn) { mockCheckoutBtn.style.transform = 'scale(0.96)'; setTimeout(() => { mockCheckoutBtn.style.transform = ''; }, 200); }
                if (paymentSuccessModal) paymentSuccessModal.classList.add('is-visible');
                addTimeout(() => {
                  if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
                  setBrowserUrl("https://auragift-atelier.com/shop?id=1' OR '1'='1", true, '⚠️');
                  setSecurity403Active(true);
                  addTimeout(() => {
                    setBrowserUrl("https://auragift-atelier.com/search?q=<script>alert('XSS')</script>", true, '⚠️');
                    if (xssLiveBanner) xssLiveBanner.classList.add('is-visible');
                    addTimeout(() => {
                      if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
                      setSecurity403Active(false);
                      setBrowserUrl('terminal://attacker@kali:~', true, '⚡');
                      if (mockAttackCmd) mockAttackCmd.classList.add('is-visible');
                      typeCmdExploit(() => {
                        addTimeout(() => {
                          if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
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

  if (macbookStage) {
    macbookStage.addEventListener('mouseenter', () => { isUserHovering = true; });
    macbookStage.addEventListener('mouseleave', () => { isUserHovering = false; });
  }

  const btnShowcaseTerminal = document.getElementById('btn-showcase-terminal');
  const btnShowcaseCode = document.getElementById('btn-showcase-code');
  const btnShowcaseStore = document.getElementById('btn-showcase-store');

  if (btnShowcaseTerminal) btnShowcaseTerminal.addEventListener('click', () => {
    clearAllTimers();
    if (lidWrapper) lidWrapper.classList.add('is-open');
    if (macScreen) macScreen.classList.add('is-awake');
    if (codeEditor) codeEditor.classList.add('fade-out');
    setSecurity403Active(false);
    if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
    if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
    setBrowserUrl('terminal://attacker@kali:~', true, '⚡');
    if (mockAttackCmd) mockAttackCmd.classList.add('is-visible');
    typeCmdExploit(() => { addTimeout(() => { if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible'); scheduleNextCycle(); }, 5000); });
  });
  if (btnShowcaseCode) btnShowcaseCode.addEventListener('click', () => { clearAllTimers(); runSequence(); });
  if (btnShowcaseStore) btnShowcaseStore.addEventListener('click', () => {
    clearAllTimers();
    if (codeEditor) codeEditor.classList.add('fade-out');
    setSecurity403Active(false);
    if (xssLiveBanner) xssLiveBanner.classList.remove('is-visible');
    if (mockAttackCmd) mockAttackCmd.classList.remove('is-visible');
    if (paymentSuccessModal) paymentSuccessModal.classList.remove('is-visible');
    scrollToSection(0); setNavTab('home');
    setBrowserUrl('https://auragift-atelier.com', false, '🔒');
    addTimeout(scheduleNextCycle, 4000);
  });

  // Toast notification system
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; document.body.appendChild(container); }
    const toast = document.createElement('div');
    toast.className = 'toast-box';
    toast.style.borderLeftColor = type === 'error' ? '#D50000' : '#FF4D00';
    toast.innerHTML = `<span style="color:${type === 'error' ? '#D50000' : '#FF4D00'};font-weight:700;font-size:1.1rem;">${type === 'error' ? '⚠️' : '✓'}</span><span style="flex:1;font-size:0.92rem;color:#0F172A;">${message}</span><button style="background:none;border:none;color:#94A3B8;cursor:pointer;padding:0 4px;font-size:1.1rem;" onclick="this.parentElement.remove()">✕</button>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(12px)'; toast.style.transition = 'all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 5500);
  }
  window.showToast = showToast;

  // Start showcase after intro
  let sequenceStarted = false;
  function startShowcaseOnce() { if (sequenceStarted) return; sequenceStarted = true; runSequence(); }
  window.startLaptopShowcase = startShowcaseOnce;
  const introOverlayEl = document.getElementById('netflix-intro-overlay');
  if (introOverlayEl && !introOverlayEl.classList.contains('intro-complete')) {
    window.addEventListener('prismline:intro-finished', () => { startShowcaseOnce(); }, { once: true });
  } else {
    startShowcaseOnce();
  }
}
