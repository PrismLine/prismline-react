/**
 * usePhoneSequence — Animated mobile app showcase for the phone mockup
 * Sequence: App Splash → Home Browse → Product Detail → Cart → Payment → Success → Loop
 */
import { useEffect } from 'react';

export function usePhoneSequence() {
  useEffect(() => {
    const phone = document.getElementById('phone-mockup-stage');
    if (!phone) return;

    let timers = [];
    let loopTimer = null;
    let running = true;

    function addTimer(fn, delay) {
      const id = setTimeout(() => { if (running) fn(); }, delay);
      timers.push(id);
      return id;
    }

    function clearAll() {
      timers.forEach(clearTimeout);
      timers = [];
      if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
    }

    // ── Screen refs ───────────────────────────────────────────────────────────
    const getEl = (id) => document.getElementById(id);

    function setScreen(screenId) {
      ['ph-screen-splash','ph-screen-home','ph-screen-detail',
       'ph-screen-cart','ph-screen-pay','ph-screen-success'].forEach(id => {
        const el = getEl(id);
        if (el) el.classList.remove('ph-active');
      });
      const el = getEl(screenId);
      if (el) el.classList.add('ph-active');
    }

    // ── Cart badge ────────────────────────────────────────────────────────────
    function setCartBadge(n) {
      const el = getEl('ph-cart-badge');
      if (el) { el.textContent = n; el.style.transform = 'scale(1.5)'; setTimeout(() => { el.style.transform = ''; }, 300); }
    }

    // ── Detail screen dynamic content ─────────────────────────────────────────
    function showDetail(img, name, price) {
      const imgEl = getEl('ph-detail-img');
      const nameEl = getEl('ph-detail-name');
      const priceEl = getEl('ph-detail-price');
      if (imgEl) imgEl.src = img;
      if (nameEl) nameEl.textContent = name;
      if (priceEl) priceEl.textContent = price;
    }

    // ── Progress bar on pay screen ────────────────────────────────────────────
    function animatePayProgress(onDone) {
      const bar = getEl('ph-pay-bar');
      const pct = getEl('ph-pay-pct');
      if (!bar) { onDone && onDone(); return; }
      let val = 0;
      bar.style.width = '0%';
      const iv = setInterval(() => {
        if (!running) { clearInterval(iv); return; }
        val += 4;
        bar.style.width = val + '%';
        if (pct) pct.textContent = val + '%';
        if (val >= 100) {
          clearInterval(iv);
          if (pct) pct.textContent = 'Verified ✓';
          setTimeout(() => onDone && onDone(), 400);
        }
      }, 40);
      timers.push({ cancel: () => clearInterval(iv) });
    }

    // ── Products for the home scroll ──────────────────────────────────────────
    const products = [
      { src: '/assets/images/auragift/products/shopping.jpeg',   name: 'Botanical Floral Keepsake',   price: '₹1,499' },
      { src: '/assets/images/auragift/products/gold-coasters.jpg', name: '24K Gold Leaf Coasters',    price: '₹2,199' },
      { src: '/assets/images/auragift/products/gift-hamper.jpg',  name: 'Curated Luxury Gift Hamper', price: '₹3,499' },
      { src: '/assets/images/auragift/products/floral-art.jpg',   name: 'Preserved Floral Art Decor', price: '₹4,299' },
    ];

    let currentProduct = 0;

    // ── Home screen: auto-highlight a product card ────────────────────────────
    function highlightProduct(idx) {
      document.querySelectorAll('.ph-product-card').forEach((el, i) => {
        el.classList.toggle('ph-highlighted', i === idx);
      });
    }

    // ── Main sequence ─────────────────────────────────────────────────────────
    function runSequence() {
      clearAll();
      currentProduct = Math.floor(Math.random() * products.length);

      // Reset cart badge
      setCartBadge(0);
      const badge = getEl('ph-cart-badge');
      if (badge) badge.style.display = 'none';

      // PHASE 1 — Splash (0ms)
      setScreen('ph-screen-splash');
      const splashBar = getEl('ph-splash-bar');
      if (splashBar) { splashBar.style.width = '0%'; splashBar.style.transition = 'none'; }

      addTimer(() => {
        if (splashBar) { splashBar.style.transition = 'width 1.4s cubic-bezier(0.4,0,0.2,1)'; splashBar.style.width = '100%'; }
      }, 80);

      // PHASE 2 — Home browse (1800ms)
      addTimer(() => {
        setScreen('ph-screen-home');
        highlightProduct(-1);
        // scroll the product list to top
        const track = getEl('ph-home-scroll-track');
        if (track) track.style.transform = 'translateX(0)';
      }, 1800);

      // highlight first product + auto-scroll
      addTimer(() => {
        highlightProduct(currentProduct);
        const track = getEl('ph-home-scroll-track');
        if (track) track.style.transform = `translateX(-${currentProduct * 88}px)`;
      }, 2800);

      // PHASE 3 — Product detail (4000ms)
      addTimer(() => {
        const p = products[currentProduct];
        showDetail(p.src, p.name, p.price);
        setScreen('ph-screen-detail');
      }, 4000);

      // Tap "Add to Cart" button animation
      addTimer(() => {
        const btn = getEl('ph-add-to-cart-btn');
        if (btn) {
          btn.classList.add('ph-btn-tapped');
          setTimeout(() => btn.classList.remove('ph-btn-tapped'), 400);
        }
      }, 5200);

      // Update cart badge
      addTimer(() => {
        const badge = getEl('ph-cart-badge');
        if (badge) badge.style.display = 'flex';
        setCartBadge(1);
      }, 5500);

      // PHASE 4 — Cart (6200ms)
      addTimer(() => {
        const p = products[currentProduct];
        const cartImg = getEl('ph-cart-item-img');
        const cartName = getEl('ph-cart-item-name');
        const cartPrice = getEl('ph-cart-item-price');
        if (cartImg) cartImg.src = p.src;
        if (cartName) cartName.textContent = p.name;
        if (cartPrice) cartPrice.textContent = p.price;
        setScreen('ph-screen-cart');
      }, 6200);

      // Tap checkout
      addTimer(() => {
        const btn = getEl('ph-checkout-btn');
        if (btn) { btn.classList.add('ph-btn-tapped'); setTimeout(() => btn.classList.remove('ph-btn-tapped'), 400); }
      }, 7600);

      // PHASE 5 — Payment (8200ms)
      addTimer(() => {
        setScreen('ph-screen-pay');
        const bar = getEl('ph-pay-bar');
        if (bar) { bar.style.transition = 'none'; bar.style.width = '0%'; }
        const pct = getEl('ph-pay-pct');
        if (pct) pct.textContent = '0%';
        setTimeout(() => animatePayProgress(() => {
          // PHASE 6 — Success
          addTimer(() => {
            setScreen('ph-screen-success');
          }, 400);

          // Loop
          addTimer(() => {
            runSequence();
          }, 3200);
        }), 200);
      }, 8200);
    }

    // Start after a short delay (let laptop animation start first)
    const startDelay = setTimeout(() => {
      if (running) runSequence();
    }, 1200);

    return () => {
      running = false;
      clearAll();
      clearTimeout(startDelay);
    };
  }, []);
}
