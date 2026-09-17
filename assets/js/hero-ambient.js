/**
 * PrismLine - Bespoke Executive Hero Ambient Lighting Engine
 * Pure, high-end studio ambient lighting with zero AI template gimmicks:
 * - Fluid, multi-layered warm aurora light fields (warm coral ember, golden honey, peach champagne)
 * - Organic undulating movement with silky 60fps physics
 * - Subtle cursor light-focus tracking with smooth spring easing
 * - NO constellation nodes, NO spiderweb lines, NO grid lines, NO fake badges, NO gimmicks.
 * - Retina 2x HiDPI crisp rendering & automatic viewport pause.
 */
(function() {
  'use strict';

  const canvas = document.getElementById('hero-ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let isVisible = true;
  let animId = null;

  // Smooth mouse focus tracking
  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false
  };

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;

    width = parent.offsetWidth;
    height = parent.offsetHeight;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', debounce(resize, 100));

  function debounce(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  const heroSection = document.getElementById('hero-stage') || canvas.parentElement;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = width * 0.7;
      mouse.targetY = height * 0.5;
    });
  }

  let time = 0;

  function render() {
    if (!isVisible) {
      animId = requestAnimationFrame(render);
      return;
    }

    time += 0.012;

    // Smooth spring lerp for interactive light focus
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    const mouseShiftX = (mouse.x - width * 0.5) * 0.06;
    const mouseShiftY = (mouse.y - height * 0.5) * 0.06;

    // =========================================================================
    // LAYER 1: Primary Volumetric Warm Aura (Behind Showcase Device)
    // Soft, organic, wide radiant bloom that gives the laptop breathtaking depth
    // =========================================================================
    const aura1X = width * 0.72 + Math.sin(time * 0.5) * 45 + mouseShiftX * 1.5;
    const aura1Y = height * 0.48 + Math.cos(time * 0.4) * 35 + mouseShiftY * 1.5;
    const aura1Radius = Math.min(width * 0.48, 580);

    const grad1 = ctx.createRadialGradient(aura1X, aura1Y, 0, aura1X, aura1Y, aura1Radius);
    grad1.addColorStop(0, 'rgba(255, 90, 30, 0.42)');
    grad1.addColorStop(0.35, 'rgba(255, 130, 10, 0.24)');
    grad1.addColorStop(0.65, 'rgba(255, 175, 70, 0.10)');
    grad1.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // =========================================================================
    // LAYER 2: Secondary Golden Amber Fill (Top Right Horizon)
    // Gentle golden warmth that balances the upper navigation and edge
    // =========================================================================
    const aura2X = width * 0.86 + Math.cos(time * 0.35) * 40;
    const aura2Y = height * 0.18 + Math.sin(time * 0.45) * 30;
    const aura2Radius = Math.min(width * 0.42, 460);

    const grad2 = ctx.createRadialGradient(aura2X, aura2Y, 0, aura2X, aura2Y, aura2Radius);
    grad2.addColorStop(0, 'rgba(255, 160, 0, 0.32)');
    grad2.addColorStop(0.45, 'rgba(255, 112, 67, 0.14)');
    grad2.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // =========================================================================
    // LAYER 3: Soft Champagne Peach Horizon (Gentle Left Fill behind text)
    // Warm light wash behind headline typography
    // =========================================================================
    const aura3X = width * 0.22 + Math.sin(time * 0.3) * 35 + mouseShiftX * 0.5;
    const aura3Y = height * 0.38 + Math.cos(time * 0.5) * 25 + mouseShiftY * 0.5;
    const aura3Radius = Math.min(width * 0.40, 440);

    const grad3 = ctx.createRadialGradient(aura3X, aura3Y, 0, aura3X, aura3Y, aura3Radius);
    grad3.addColorStop(0, 'rgba(255, 110, 64, 0.26)');
    grad3.addColorStop(0.5, 'rgba(255, 160, 0, 0.10)');
    grad3.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // =========================================================================
    // LAYER 4: Subtle Lower Foundation Glow (Bottom Right)
    // Anchors the device base with a silky soft warm shadow fill
    // =========================================================================
    const aura4X = width * 0.65 + Math.sin(time * 0.42) * 30;
    const aura4Y = height * 0.80 + Math.cos(time * 0.38) * 25;
    const aura4Radius = Math.min(width * 0.36, 400);

    const grad4 = ctx.createRadialGradient(aura4X, aura4Y, 0, aura4X, aura4Y, aura4Radius);
    grad4.addColorStop(0, 'rgba(255, 87, 34, 0.26)');
    grad4.addColorStop(0.45, 'rgba(255, 171, 64, 0.10)');
    grad4.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = grad4;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // =========================================================================
    // LAYER 5: Central Warm Glow Pulse (Between text and laptop)
    // =========================================================================
    const aura5X = width * 0.46 + Math.cos(time * 0.55) * 30;
    const aura5Y = height * 0.52 + Math.sin(time * 0.48) * 25;
    const aura5Radius = Math.min(width * 0.35, 380);

    const grad5 = ctx.createRadialGradient(aura5X, aura5Y, 0, aura5X, aura5Y, aura5Radius);
    grad5.addColorStop(0, 'rgba(255, 140, 40, 0.22)');
    grad5.addColorStop(0.5, 'rgba(255, 180, 80, 0.08)');
    grad5.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = grad5;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    animId = requestAnimationFrame(render);
  }

  // IntersectionObserver to pause rendering when hero is scrolled out of view
  if ('IntersectionObserver' in window && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  resize();
  mouse.targetX = width * 0.7;
  mouse.targetY = height * 0.5;
  mouse.x = mouse.targetX;
  mouse.y = mouse.targetY;
  animId = requestAnimationFrame(render);

})();
