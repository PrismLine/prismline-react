/**
 * useNetflixIntro — PrismLine Cinematic Logo Intro (ported from netflix-intro.js)
 */
import { useEffect } from 'react';

export function useNetflixIntro() {
  useEffect(() => {
    const introOverlay = document.getElementById('netflix-intro-overlay');
    if (!introOverlay) return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skip_intro') === '1') {
      introOverlay.style.display = 'none';
      introOverlay.classList.add('intro-complete');
      window.dispatchEvent(new CustomEvent('prismline:intro-finished'));
      return;
    }

    let audioCtx = null;
    let audioEnabled = true;
    let isIntroActive = true;
    let introTimer = null;

    function playCinematicChime() {
      if (!audioEnabled) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtx) audioCtx = new AudioContextClass();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;
        const subOsc = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(65, now);
        subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
        subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.8);
        subGain.gain.setValueAtTime(0.01, now);
        subGain.gain.linearRampToValueAtTime(0.4, now + 0.1);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
        subOsc.connect(subGain);
        subGain.connect(audioCtx.destination);
        subOsc.start(now);
        subOsc.stop(now + 2.3);

        setTimeout(() => {
          if (!audioCtx) return;
          const hitNow = audioCtx.currentTime;
          const punchOsc = audioCtx.createOscillator();
          const punchGain = audioCtx.createGain();
          punchOsc.type = 'triangle';
          punchOsc.frequency.setValueAtTime(140, hitNow);
          punchOsc.frequency.exponentialRampToValueAtTime(50, hitNow + 0.5);
          punchGain.gain.setValueAtTime(0.6, hitNow);
          punchGain.gain.exponentialRampToValueAtTime(0.001, hitNow + 2.5);
          punchOsc.connect(punchGain);
          punchGain.connect(audioCtx.destination);
          punchOsc.start(hitNow);
          punchOsc.stop(hitNow + 2.6);

          [220, 330, 440, 554, 660, 880].forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, hitNow);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.02, hitNow + 2.0);
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800 + idx * 250, hitNow);
            filter.frequency.exponentialRampToValueAtTime(300, hitNow + 2.2);
            gain.gain.setValueAtTime(0.05 / (idx + 1), hitNow);
            gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), hitNow + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, hitNow + 2.6);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(hitNow);
            osc.stop(hitNow + 2.7);
          });
        }, 700);
      } catch (e) {
        console.log('Audio autoplay prevented:', e);
      }
    }

    function finishIntro() {
      if (!isIntroActive) return;
      isIntroActive = false;
      if (introTimer) clearTimeout(introTimer);
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
      window.scrollTo(0, 0);
      introOverlay.classList.add('intro-complete');
      introOverlay.classList.remove('intro-animating');
      window.dispatchEvent(new CustomEvent('prismline:intro-finished'));
      if (typeof window.startLaptopShowcase === 'function') {
        window.startLaptopShowcase();
      }
      setTimeout(() => { introOverlay.style.display = 'none'; }, 800);
    }

    function startIntro() {
      if (introTimer) clearTimeout(introTimer);
      isIntroActive = true;
      document.documentElement.classList.add('intro-active');
      document.body.classList.add('intro-active');
      window.scrollTo(0, 0);
      introOverlay.style.display = 'flex';
      introOverlay.style.opacity = '1';
      introOverlay.classList.remove('intro-complete');
      introOverlay.classList.add('intro-animating');

      const svg = introOverlay.querySelector('.intro-svg-emblem');
      if (svg) {
        svg.style.animation = 'none';
        void svg.offsetHeight;
        svg.style.animation = '';
      }

      playCinematicChime();
      introTimer = setTimeout(finishIntro, 4200);
    }

    const preventScroll = (e) => { if (isIntroActive) e.preventDefault(); };
    introOverlay.addEventListener('wheel', preventScroll, { passive: false });
    introOverlay.addEventListener('touchmove', preventScroll, { passive: false });
    introOverlay.addEventListener('click', (e) => { finishIntro(); });

    const replayBtns = document.querySelectorAll('.btn-replay-intro');
    const handleReplay = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startIntro();
    };
    replayBtns.forEach((btn) => btn.addEventListener('click', handleReplay));

    const handleAudioResume = () => {
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    };
    document.addEventListener('click', handleAudioResume, { once: true });

    startIntro();

    return () => {
      if (introTimer) clearTimeout(introTimer);
      introOverlay.removeEventListener('wheel', preventScroll);
      introOverlay.removeEventListener('touchmove', preventScroll);
      replayBtns.forEach((btn) => btn.removeEventListener('click', handleReplay));
    };
  }, []);
}
