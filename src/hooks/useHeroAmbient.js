/**
 * useHeroAmbient — Canvas ambient lighting for hero section (ported from hero-ambient.js)
 * Optimized: 30fps throttle, 3 layers instead of 5
 */
import { useEffect } from 'react';

export function useHeroAmbient() {
  useEffect(() => {
    const canvas = document.getElementById('hero-ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isVisible = true;
    let animId = null;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    // GPU layer hint
    canvas.style.willChange = 'transform';

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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    let resizeTimer;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100); };
    window.addEventListener('resize', handleResize);

    const heroSection = document.getElementById('hero-stage') || canvas.parentElement;
    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width * 0.7;
      mouse.targetY = height * 0.5;
    };
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove, { passive: true });
      heroSection.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    let time = 0;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // 30fps cap

    function render(now) {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      // 30fps throttle
      const delta = now - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = now - (delta % FRAME_INTERVAL);

      time += 0.012;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      ctx.clearRect(0, 0, width, height);
      const msx = (mouse.x - width * 0.5) * 0.06;
      const msy = (mouse.y - height * 0.5) * 0.06;

      // Reduced to 3 layers for performance (was 5)
      const layers = [
        { x: width*0.72+Math.sin(time*0.5)*45+msx*1.5, y: height*0.48+Math.cos(time*0.4)*35+msy*1.5, r: Math.min(width*0.48,580), stops: [['rgba(255,90,30,0.42)',0],['rgba(255,130,10,0.24)',0.35],['rgba(255,255,255,0)',1]] },
        { x: width*0.86+Math.cos(time*0.35)*40, y: height*0.18+Math.sin(time*0.45)*30, r: Math.min(width*0.42,460), stops: [['rgba(255,160,0,0.32)',0],['rgba(255,112,67,0.14)',0.45],['rgba(255,255,255,0)',1]] },
        { x: width*0.22+Math.sin(time*0.3)*35+msx*0.5, y: height*0.38+Math.cos(time*0.5)*25+msy*0.5, r: Math.min(width*0.40,440), stops: [['rgba(255,110,64,0.26)',0],['rgba(255,160,0,0.10)',0.5],['rgba(255,255,255,0)',1]] },
      ];

      layers.forEach(({ x, y, r, stops }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        stops.forEach(([color, pos]) => g.addColorStop(pos, color));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });
    }

    if ('IntersectionObserver' in window && heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { isVisible = e.isIntersecting; });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    resize();
    mouse.targetX = (width || 600) * 0.7;
    mouse.targetY = (height || 400) * 0.5;
    mouse.x = mouse.targetX;
    mouse.y = mouse.targetY;
    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
}
