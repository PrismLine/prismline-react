/**
 * PrismLine Cinematic Netflix-Style Logo Intro Animation
 * - Features glowing light ribbons, spectral lasers, stroke dash SVG reveal,
 * - Web Audio API synthesized cinematic "Ta-dum" cyber chord,
 * - 3D camera zoom through the prism into the live website.
 */
(function() {
  const introOverlay = document.getElementById('netflix-intro-overlay');
  if (!introOverlay) return;

  // Only bypass overlay if explicitly requested via query parameter (e.g. ?skip_intro=1 for automated test screenshots)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('skip_intro') === '1') {
    introOverlay.style.display = 'none';
    introOverlay.classList.add('intro-complete');
    window.dispatchEvent(new CustomEvent('prismline:intro-finished'));
    return;
  }

  const ribbonCanvas = document.getElementById('netflix-ribbon-canvas');
  const skipBtn = document.getElementById('intro-skip-btn');
  const audioBtn = document.getElementById('intro-audio-btn');
  const replayBtns = document.querySelectorAll('.btn-replay-intro');

  let audioCtx = null;
  let audioEnabled = true;
  let isIntroActive = true;
  let animFrameId = null;

  // Web Audio API: Synthesizes a deep cinematic "Ta-dum" cyber chord
  function playCinematicChime() {
    if (!audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // 1. Deep Sub-Bass Drone (The "Ta")
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

      // 2. The Power Strike (The "DUM" at 0.7s)
      setTimeout(() => {
        if (!audioCtx) return;
        const hitNow = audioCtx.currentTime;

        // Low impact punch
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

        // Shimmering High Harmonic Chord (Prism Light Refraction Sound)
        [220, 330, 440, 554, 660, 880].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, hitNow);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.02, hitNow + 2.0);

          // Lowpass filter for smooth warmth
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
      console.log('Audio autoplay prevented or unsupported:', e);
    }
  }

  // Canvas light ribbons disabled per user request (no background lines)
  function initRibbonCanvas() {
    return;
  }

  let introTimer = null;

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

    // Reflow SVG animations for instant replay
    const brandContainer = introOverlay.querySelector('.intro-brand-container');
    if (brandContainer) {
      const svg = brandContainer.querySelector('.intro-svg-emblem');
      if (svg) {
        svg.style.animation = 'none';
        void svg.offsetHeight;
        svg.style.animation = '';
      }
    }

    // Start canvas spectrum ribbons
    initRibbonCanvas();

    // Trigger cinematic sound
    playCinematicChime();

    // Auto complete after 4.2 seconds
    introTimer = setTimeout(() => {
      finishIntro();
    }, 4200);
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

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
    }

    // Seamlessly trigger the MacBook Pro showcase right as intro dissolves
    window.dispatchEvent(new CustomEvent('prismline:intro-finished'));
    if (typeof window.startLaptopShowcase === 'function') {
      window.startLaptopShowcase();
    }

    setTimeout(() => {
      introOverlay.style.display = 'none';
    }, 800);
  }

  // Prevent background scrolling while overlay is up
  introOverlay.addEventListener('wheel', (e) => {
    if (isIntroActive) e.preventDefault();
  }, { passive: false });

  introOverlay.addEventListener('touchmove', (e) => {
    if (isIntroActive) e.preventDefault();
  }, { passive: false });

  // Click anywhere on overlay to smoothly skip intro
  introOverlay.addEventListener('click', (e) => {
    if (audioBtn && audioBtn.contains(e.target)) return;
    finishIntro();
  });

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishIntro();
    });
  }

  // Audio mute/unmute toggle
  if (audioBtn) {
    audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audioEnabled = !audioEnabled;
      audioBtn.innerHTML = audioEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      if (audioEnabled && audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    });
  }

  // Replay buttons in navbar or footer
  replayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startIntro();
    });
  });

  // Auto-play cinematic intro on website load (Option A)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      startIntro();
    });
  } else {
    startIntro();
  }

  // Enable audio context on any user click
  document.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, { once: true });

})();
