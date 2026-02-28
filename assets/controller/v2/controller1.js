(function () {
  /*
   * Seazonify Controller for Embed
   * Author: Seazonify
   * Copyright: © 2025 Seazonify
   * Version: 1.0.0
   * License: All Rights Reserved
   * Support: https://seazonify.com/contact
   * Source: https://github.com/iMiMofficial/Seazonify
   */
  // --- Color & Font Variables ---
  const fontStack = "'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'";
  const gradient = 'linear-gradient(135deg, #3b82f6, #60a5fa, #22d3a8, #fbbf24)';
  const primary = '#3b82f6';
  const accent = '#22d3a8';
  const secondary = '#fbbf24';
  const muted = '#f8fafc';
  const cardLight = '#fff';
  const cardDark = '#181f2a';
  const border = '#e5e7eb';
  const text = '#334155';
  const mutedText = '#64748b';

  // --- Effect Storage ---
  let audioEffects = [];
  let visualEffects = [];
  let currentAudio = null;
  let currentVisual = null;
  let audioElement = null;
  let visualElement = null;
  let visualStyle = null;
  let visualScript = null;
  let audioPaused = false;
  let visualHidden = false;
  let audioPauseTime = 0;

  // Flag for autoplay blocking
  let audioBlockedByAutoplay = false;

  // --- Asset Caching ---
  const logoUrl = 'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/img/seazonify-logo.png';
  let cachedLogoImg = null;
  const loadedScripts = new Set(); // Track loaded scripts to prevent duplicates
  const loadedImages = new Set(); // Track loaded images for caching

  // --- Debug helper ---
  const DEBUG = false; // set to false to silence logs
  const dbg = (...args) => { if (DEBUG && typeof console !== 'undefined' && console.log) console.log('[Seazonify]', ...args); };

  // --- Audio consent persistence ---
  const AUDIO_CONSENT_KEY = 'seazonify_audio_consent';
  const NO_AUTO_POPUP_KEY = 'seazonify_no_auto_popup';
  const FIRST_SEEN_KEY = 'seazonify_first_seen';
  const getAudioConsent = () => {
    try { return localStorage.getItem(AUDIO_CONSENT_KEY) === '1'; } catch { return false; }
  };
  const setAudioConsent = (v) => {
    try { localStorage.setItem(AUDIO_CONSENT_KEY, v ? '1' : '0'); } catch { }
    dbg('audio consent set', v);
  };
  const getNoAutoPopup = () => {
    try { return localStorage.getItem(NO_AUTO_POPUP_KEY) === '1'; } catch { return false; }
  };
  const setNoAutoPopup = (v) => {
    try { localStorage.setItem(NO_AUTO_POPUP_KEY, v ? '1' : '0'); } catch { }
    dbg('noAutoPopup set', v);
  };
  const hasFirstSeen = () => {
    try { return localStorage.getItem(FIRST_SEEN_KEY) === '1'; } catch { return false; }
  };
  const markFirstSeen = () => {
    try { localStorage.setItem(FIRST_SEEN_KEY, '1'); } catch { }
    dbg('first seen marked');
  };

  // --- Detect dark mode ---
  const isDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // --- Asset Caching Functions ---
  function preloadLogo() {
    if (cachedLogoImg) return cachedLogoImg;

    cachedLogoImg = new Image();
    cachedLogoImg.src = logoUrl;
    cachedLogoImg.onload = () => { dbg('Logo cached'); };
    cachedLogoImg.onerror = () => { dbg('Logo cache failed'); };

    return cachedLogoImg;
  }

  function preloadImage(url) {
    if (loadedImages.has(url)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        loadedImages.add(url);
        dbg('Image cached', url);
        resolve();
      };
      img.onerror = () => {
        dbg('Image cache failed', url);
        reject();
      };
      img.src = url;
    });
  }

  function loadScriptOnce(url) {
    if (loadedScripts.has(url)) {
      dbg('Script already loaded', url);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        loadedScripts.add(url);
        dbg('Script loaded', url);
        resolve();
      };
      script.onerror = () => {
        dbg('Script load failed', url);
        reject();
      };
      document.head.appendChild(script);
    });
  }

  // --- Styles ---
  const style = document.createElement('style');
  style.textContent = `
    .szfy-sidebar-btn {
      font-family: ${fontStack};
      position: fixed;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      z-index: 2147483646;
      background: #181f2a;
      color: #fff;
      border-radius: 40px 0 0 40px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.12);
      padding: 6px 12px 6px 8px;
      font-size: 0;
      cursor: pointer;
      border: 1px solid #232b3a;
      display: flex;
      align-items: center;
      gap: 0;
      transition: background 0.3s, box-shadow 0.2s;
      opacity: 0.96;
      width: auto;
      height: auto;
    }
    .szfy-sidebar-btn.white {
      background: #fff;
      color: #181f2a;
      border: 1px solid #e5e7eb;
    }
    .szfy-sidebar-btn:hover {
      background: #232b3a;
      box-shadow: 0 4px 18px rgba(0,0,0,0.13);
      opacity: 1;
    }
    .szfy-sidebar-logo {
      width: 22px;
      height: 22px;
      display: block;
      transition: width 0.2s, height 0.2s;
    }
    @media (max-width: 600px) {
      .szfy-sidebar-btn {
        padding: 4px 8px 4px 6px;
      }
      .szfy-sidebar-logo {
        width: 18px;
        height: 18px;
      }
    }
    .szfy-overlay {
      font-family: ${fontStack};
      position: fixed;
      inset: 0;
      background: rgba(8, 12, 21, 0.7);
      backdrop-filter: blur(8px);
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: szfy-fade-in 0.2s ease-out;
    }
    @keyframes szfy-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .szfy-modal {
      font-family: ${fontStack};
      background: rgba(24, 31, 42, 0.82);
      border-radius: 20px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.3);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 18px 14px 14px 14px;
      min-width: 280px;
      max-width: 420px;
      max-height: 85vh;
      width: 90%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: szfy-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      color: #f8fafc;
      overflow-y: auto;
      scrollbar-width: none;
    }
    .szfy-modal::-webkit-scrollbar { display: none; }
    .szfy-nature {
      position: absolute;
      pointer-events: none;
      z-index: 0;
      opacity: 0.1;
      animation: szfy-nature-float 8s infinite alternate ease-in-out;
      filter: blur(0.5px);
    }
    .szfy-nature.n1 { left: 8px; top: 12px; width: 36px; animation-delay: 0s; }
    .szfy-nature.n2 { right: 12px; top: 24px; width: 32px; animation-delay: 1.8s; }
    .szfy-nature.n3 { left: 32px; bottom: 16px; width: 28px; animation-delay: 3.2s; }
    .szfy-nature.n4 { right: 24px; bottom: 8px; width: 40px; animation-delay: 2.4s; }
    .szfy-nature.n5 { left: 20px; top: 50%; width: 24px; animation-delay: 4.1s; }
    .szfy-nature.n6 { right: 40px; top: 60%; width: 30px; animation-delay: 1.5s; }
    @keyframes szfy-nature-float {
      0% { transform: translateY(0) rotate(0deg) scale(1); }
      100% { transform: translateY(-8px) rotate(2deg) scale(1.05); }
    }
    @keyframes szfy-pop-in {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .szfy-modal .szfy-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 18px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    .szfy-modal .szfy-close:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);
    }
    .szfy-modal .szfy-feedback {
      position: absolute;
      top: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
      color: #94a3b8;
      cursor: pointer;
      transition: all 0.15s ease;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    .szfy-modal .szfy-feedback:hover {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.2);
    }
    .szfy-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      margin-bottom: 10px;
      z-index: 2;
    }
    .szfy-brand img {
      height: 32px;
      width: 32px;
      border-radius: 9px;
      margin-bottom: 0;
    }
    .szfy-brand span {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      background: ${gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: block;
      text-align: center;
    }
    .szfy-message {
      font-size: 0.92rem;
      color: #cbd5e1;
      margin-bottom: 12px;
      text-align: center;
      font-weight: 500;
      line-height: 1.4;
      opacity: 0.9;
      z-index: 2;
      max-width: 340px;
    }
    .szfy-instructions {
      font-size: 0.8rem;
      color: #94a3b8;
      text-align: center;
      font-weight: 400;
      z-index: 2;
      margin-bottom: 10px;
    }
    .szfy-cards {
      width: 100%;
      display: flex;
      gap: 10px;
      z-index: 2;
      justify-content: center;
      flex-wrap: nowrap;
      margin-bottom: 16px;
    }
    .szfy-card {
      background: rgba(30, 41, 59, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 14px;
      padding: 10px 8px;
      min-width: 120px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.2s ease;
      cursor: pointer;
      user-select: none;
    }
    .szfy-card:hover {
      background: rgba(30, 41, 59, 0.6);
      border-color: rgba(255, 255, 255, 0.12);
    }
    .szfy-card.selected {
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.4);
    }
    .szfy-thumb {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-bottom: 6px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 1px;
    }
    .szfy-label {
      font-size: 0.82rem;
      font-weight: 700;
      margin-bottom: 1px;
      color: #f1f5f9;
    }
    .szfy-desc {
      font-size: 0.7rem;
      color: #94a3b8;
      text-align: center;
      line-height: 1.2;
    }
    .szfy-powered {
      font-size: 0.68rem;
      color: #64748b;
      margin-top: 10px;
      text-align: center;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
    }
    .szfy-powered .szfy-brand-gradient {
      font-weight: bold;
      background: ${gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 0.72rem;
    }
    .szfy-powered a {
      color: ${primary};
      text-decoration: none;
      font-weight: 600;
      opacity: 0.9;
    }
    @media (max-width: 600px) {
      .szfy-modal {
        width: 88%;
        padding: 14px 12px 12px 12px;
      }
      .szfy-brand img { height: 28px; width: 28px; }
      .szfy-brand span { font-size: 1.15rem; }
      .szfy-message { font-size: 0.8rem; margin-bottom: 10px; max-width: 220px; }
      .szfy-cards { gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
      .szfy-card { min-width: 90px; padding: 8px 6px; }
      .szfy-thumb { width: 34px; height: 34px; border-radius: 8px; }
      .szfy-label { font-size: 0.78rem; }
      .szfy-desc { font-size: 0.65rem; }
    }
    @media (max-height: 500px) {
      .szfy-modal { padding-top: 10px; max-height: 92vh; }
      .szfy-brand { margin-bottom: 5px; }
      .szfy-brand img { height: 24px; width: 24px; }
      .szfy-brand span { font-size: 1rem; }
      .szfy-message { font-size: 0.75rem; margin-bottom: 8px; }
      .szfy-cards { margin-bottom: 8px; }
    }
  `;
  document.head.appendChild(style);

  // --- State ---
  let state = {
    audio: false,
    visual: false,
    overlay: null,
    modal: null,
    btn: null,
    selectedAudio: 0,
    selectedVisual: 0,
  };

  // --- Effect Handlers ---
  function playAudioEffect(effect) {
    if (audioElement) {
      audioElement.pause();
      audioElement.remove();
      audioElement = null;
    }
    currentAudio = effect;
    audioElement = new Audio();
    audioElement.src = effect.url;
    audioElement.loop = effect.loop !== false;
    audioElement.volume = typeof effect.volume === 'number' ? effect.volume : 1.0;
    audioElement.autoplay = true;
    audioElement.id = 'szfy-audio';
    dbg('playAudioEffect', { url: effect.url, loop: audioElement.loop, volume: audioElement.volume });
    if (audioPaused && audioPauseTime > 0) {
      audioElement.currentTime = audioPauseTime;
    }
    const p = audioElement.play();
    audioBlockedByAutoplay = false;
    if (p && typeof p.then === 'function') {
      p.then(() => { setAudioConsent(true); }).catch(() => {
        // Browser blocked autoplay; wait for user gesture
        audioBlockedByAutoplay = true;
        dbg('audioElement.play() blocked by browser - awaiting user gesture');
        armUserGestureResume();
      });
    }
    saveSeazonifyState();
  }
  function pauseAudioEffect() {
    if (audioElement) {
      audioElement.pause();
      audioPaused = true;
      audioPauseTime = audioElement.currentTime;
      dbg('pauseAudioEffect at', audioPauseTime);
      saveSeazonifyState();
    }
  }
  function resumeAudioEffect() {
    if (audioElement && audioElement.paused) {
      dbg('resumeAudioEffect');
      audioElement.play().then(() => { setAudioConsent(true); }).catch(() => { dbg('resume blocked; awaiting user gesture'); armUserGestureResume(); });
      audioPaused = false;
      saveSeazonifyState();
    }
  }
  function stopAudioEffect() {
    if (audioElement) {
      dbg('stopAudioEffect');
      audioElement.pause();
      audioElement.remove();
      audioElement = null;
    }
    audioPaused = false;
    audioPauseTime = 0;
    saveSeazonifyState();
  }
  function showVisualEffect(effect) {
    removeVisualEffect();
    if (!effect) return;
    // Dynamically load effect JS file if present (always attempt if file exists)
    if (effect.file) {
      // Check if the URL is already absolute (starts with http/https)
      const scriptUrl = effect.file.startsWith('http') ? effect.file : `/effects/${effect.file}`;

      // Use caching system to prevent duplicate loads
      loadScriptOnce(scriptUrl).then(() => {
        // Script loaded successfully, continue with effect rendering
        // Wait for the effect to be injected, then render it
        const prevCount = visualEffects.length;
        const checkInjected = setInterval(() => {
          if (visualEffects.length > prevCount) {
            clearInterval(checkInjected);
            // Render the last injected effect
            showVisualEffect(visualEffects[visualEffects.length - 1]);
          }
        }, 50);
        return; // Wait for async load
      }).catch(() => {
        // Failed to load visual effect script
      });
    }
    // Inject CSS
    if (effect.css) {
      visualStyle = document.createElement('style');
      visualStyle.textContent = effect.css;
      document.head.appendChild(visualStyle);
    }
    // Inject HTML
    if (effect.html) {
      visualElement = document.createElement('div');
      visualElement.innerHTML = effect.html;
      visualElement.id = 'szfy-visual';
      document.body.appendChild(visualElement);
    }
    // Inject JS
    if (effect.js) {
      visualScript = document.createElement('script');
      visualScript.textContent = effect.js;
      document.body.appendChild(visualScript);
    }
    visualHidden = false;
  }
  function hideVisualEffect() {
    if (visualElement) {
      visualElement.style.display = 'none';
      visualHidden = true;
    }
  }
  function showHiddenVisualEffect() {
    if (visualElement && visualHidden) {
      visualElement.style.display = '';
      visualHidden = false;
    }
  }
  function removeVisualEffect() {
    if (visualElement) { visualElement.remove(); visualElement = null; }
    if (visualStyle) { visualStyle.remove(); visualStyle = null; }
    if (visualScript) { visualScript.remove(); visualScript = null; }
    visualHidden = false;
  }

  // --- Persistent State Helpers ---
  function saveSeazonifyState() {
    const state = {
      audio: currentAudio ? {
        src: currentAudio.url || currentAudio.src,
        paused: audioPaused,
        pauseTime: audioElement ? audioElement.currentTime : 0
      } : null,
      visual: currentVisual ? { src: currentVisual.url || currentVisual.src } : null
    };
    dbg('saveSeazonifyState', state);
    localStorage.setItem('seazonify_state', JSON.stringify(state));
  }

  function loadSeazonifyState() {
    try {
      const s = JSON.parse(localStorage.getItem('seazonify_state')) || {};
      dbg('loadSeazonifyState', s);
      return s;
    } catch {
      dbg('loadSeazonifyState parse failed');
      return {};
    }
  }

  function saveCDNState() {
    const cdnState = {
      visualUrls: visualEffects.map(e => e.file).filter(Boolean),
      audioUrls: audioEffects.map(e => e.audioJsUrl).filter(Boolean),
      lastSaved: Date.now()
    };
    localStorage.setItem('seazonify_cdn_state', JSON.stringify(cdnState));
  }

  function loadCDNState() {
    try {
      return JSON.parse(localStorage.getItem('seazonify_cdn_state') || '{}');
    } catch {
      return {};
    }
  }

  // --- Patch effect/audio start/stop to persist state ---
  const _playAudioEffect = playAudioEffect;
  playAudioEffect = function (effect) {
    _playAudioEffect(effect);
    saveSeazonifyState();
  };
  const _pauseAudioEffect = pauseAudioEffect;
  pauseAudioEffect = function () {
    _pauseAudioEffect();
    saveSeazonifyState();
  };
  const _resumeAudioEffect = resumeAudioEffect;
  resumeAudioEffect = function () {
    _resumeAudioEffect();
    saveSeazonifyState();
  };
  const _stopAudioEffect = stopAudioEffect;
  stopAudioEffect = function () {
    _stopAudioEffect();
    saveSeazonifyState();
  };
  const _showVisualEffect = showVisualEffect;
  showVisualEffect = function (effect) {
    _showVisualEffect(effect);
    saveSeazonifyState();
  };
  const _removeVisualEffect = removeVisualEffect;
  removeVisualEffect = function () {
    _removeVisualEffect();
    saveSeazonifyState();
  };

  // --- Restore state on load ---
  window.addEventListener('DOMContentLoaded', () => {
    const state = loadSeazonifyState();
    const userConsented = getAudioConsent();
    dbg('audio consent on load', userConsented);

    function tryRestoreAudio(attempt = 0) {
      if (!(state.audio && state.audio.src)) return;
      const match = audioEffects.find(e => (e.url === state.audio.src) || (e.audioJsUrl === state.audio.src) || (e.src === state.audio.src));
      dbg('tryRestoreAudio', { attempt, src: state.audio.src, found: !!match, audioEffectsCount: audioEffects.length });
      if (match) {
        // If user consented previously, keep audio active; else still attempt but modal will prompt
        if (!state.audio || !userConsented) { state.audio = true; }
        playAudioEffect(match);
        if (audioElement && state.audio.pauseTime) {
          audioElement.currentTime = state.audio.pauseTime;
        }
        if (state.audio.paused) {
          pauseAudioEffect();
        }
        return;
      }
      if (attempt < 20) { // retry up to ~2s while effects register
        setTimeout(() => tryRestoreAudio(attempt + 1), 100);
      }
    }

    function tryRestoreVisual(attempt = 0) {
      if (!(state.visual && state.visual.src)) return;
      const match = visualEffects.find(e => (e.url === state.visual.src) || (e.visualJsUrl === state.visual.src) || (e.src === state.visual.src));
      dbg('tryRestoreVisual', { attempt, src: state.visual.src, found: !!match, visualEffectsCount: visualEffects.length });
      if (match) {
        showVisualEffect(match);
        return;
      }
      if (attempt < 20) {
        setTimeout(() => tryRestoreVisual(attempt + 1), 100);
      }
    }

    tryRestoreAudio();
    tryRestoreVisual();
  });

  // --- UI Functions ---
  function renderModalContent() {
    if (!state.modal) return;
    dbg('renderModalContent', { audioCount: audioEffects.length, visualCount: visualEffects.length, stateAudio: state.audio, stateVisual: state.visual, audioPaused, audioPauseTime });

    // Preload thumbnails for better performance
    const thumbnailUrls = [];
    if (audioEffects.length && audioEffects[state.selectedAudio]?.thumbnail) {
      thumbnailUrls.push(audioEffects[state.selectedAudio].thumbnail);
    }
    if (visualEffects.length && visualEffects[state.selectedVisual]?.thumbnail) {
      thumbnailUrls.push(visualEffects[state.selectedVisual].thumbnail);
    }

    // Preload all thumbnails in parallel
    Promise.all(thumbnailUrls.map(url => preloadImage(url))).catch(() => {
      // Silently handle preload failures
    });

    // Remove old content except close button and nature SVGs
    Array.from(state.modal.children).forEach(child => {
      if (!child.classList.contains('szfy-close') && !child.classList.contains('szfy-brand') && !child.classList.contains('szfy-nature')) {
        state.modal.removeChild(child);
      }
    });
    // Message
    const message = document.createElement('div');
    message.className = 'szfy-message';
    message.textContent = 'Enjoy immersive soundscapes and stunning visuals as you explore this site.';
    state.modal.appendChild(message);
    // Determine if audio/visual are active (should be false if no effects)
    const isAudioActive = state.audio && audioEffects.length > 0 && !audioPaused;
    const isVisualActive = state.visual && visualEffects.length > 0 && !visualHidden;
    // Cards
    const cards = document.createElement('div');
    cards.className = 'szfy-cards';
    // Audio Card
    const audioCard = document.createElement('div');
    audioCard.className = 'szfy-card' + (isAudioActive ? ' selected' : '');
    audioCard.innerHTML = `<img class="szfy-thumb" src="${audioEffects.length && audioEffects[state.selectedAudio].thumbnail ? audioEffects[state.selectedAudio].thumbnail : logoUrl}" alt="Audio Effect" /><div class="szfy-label">Audio</div><div class="szfy-desc">${audioEffects.length ? audioEffects[state.selectedAudio].name : 'No audio effect loaded.'}</div>`;
    audioCard.onclick = () => {
      dbg('audioCard.click', { hasEffects: audioEffects.length > 0, isActive: state.audio, paused: audioPaused });
      if (audioEffects.length > 0) {
        if (state.audio && !audioPaused) {
          pauseAudioEffect();
        } else if (state.audio && audioPaused) {
          resumeAudioEffect();
        } else {
          state.audio = true;
          setAudioConsent(true);
          playAudioEffect(audioEffects[state.selectedAudio]);
        }
        audioCard.classList.toggle('selected', state.audio && !audioPaused);
      }
    };
    // Visual Card
    const visualCard = document.createElement('div');
    visualCard.className = 'szfy-card' + (isVisualActive ? ' selected' : '');
    visualCard.innerHTML = `<img class="szfy-thumb" src="${visualEffects.length && visualEffects[state.selectedVisual].thumbnail ? visualEffects[state.selectedVisual].thumbnail : logoUrl}" alt="Visual Effect" /><div class="szfy-label">Visual</div><div class="szfy-desc">${visualEffects.length ? visualEffects[state.selectedVisual].name : 'No visual effect loaded.'}</div>`;
    visualCard.onclick = () => {
      dbg('visualCard.click', { hasEffects: visualEffects.length > 0, isActive: state.visual, hidden: visualHidden });
      if (visualEffects.length > 0) {
        if (state.visual && !visualHidden) {
          // Visual is showing, hide it
          hideVisualEffect();
        } else if (state.visual && visualHidden) {
          // Visual is hidden, show it
          showHiddenVisualEffect();
        } else {
          // Visual is not active, show it
          state.visual = true;
          showVisualEffect(visualEffects[state.selectedVisual]);
        }
        visualCard.classList.toggle('selected', state.visual && !visualHidden);
      }
    };
    cards.appendChild(audioCard);
    cards.appendChild(visualCard);
    state.modal.appendChild(cards);
    // Instructions below cards
    const instructions = document.createElement('div');
    instructions.className = 'szfy-instructions';
    instructions.textContent = 'Toggle audio or visual effects.';
    state.modal.appendChild(instructions);
    // Sidebar toggle option
    const sidebarOption = document.createElement('div');
    sidebarOption.style.margin = '10px 0 0 0';
    sidebarOption.style.display = 'flex';
    sidebarOption.style.alignItems = 'center';
    sidebarOption.style.gap = '8px';
    const sidebarCheckbox = document.createElement('input');
    sidebarCheckbox.type = 'checkbox';
    sidebarCheckbox.id = 'szfy-hide-sidebar';
    sidebarCheckbox.checked = localStorage.getItem('szfyHideSidebar') === '1';
    sidebarCheckbox.onchange = function () {
      if (sidebarCheckbox.checked) {
        localStorage.setItem('szfyHideSidebar', '1');
        if (state.btn) { state.btn.style.display = 'none'; }
      } else {
        localStorage.removeItem('szfyHideSidebar');
        if (state.btn) { state.btn.style.display = ''; }
      }
    };
    const sidebarLabel = document.createElement('label');
    sidebarLabel.htmlFor = 'szfy-hide-sidebar';
    sidebarLabel.style.fontSize = '0.85em';
    sidebarLabel.style.color = '#cbd5e1';
    sidebarLabel.textContent = 'Hide sidebar button';
    sidebarOption.appendChild(sidebarCheckbox);
    sidebarOption.appendChild(sidebarLabel);
    state.modal.appendChild(sidebarOption);

    // No auto-open option
    const autoOption = document.createElement('div');
    autoOption.style.margin = '8px 0 0 0';
    autoOption.style.display = 'flex';
    autoOption.style.alignItems = 'center';
    autoOption.style.gap = '8px';
    const noAutoCheckbox = document.createElement('input');
    noAutoCheckbox.type = 'checkbox';
    noAutoCheckbox.id = 'szfy-no-auto-popup';
    noAutoCheckbox.checked = getNoAutoPopup();
    noAutoCheckbox.onchange = function () {
      setNoAutoPopup(noAutoCheckbox.checked);
    };
    const noAutoLabel = document.createElement('label');
    noAutoLabel.htmlFor = 'szfy-no-auto-popup';
    noAutoLabel.style.fontSize = '0.85em';
    noAutoLabel.style.color = '#cbd5e1';
    noAutoLabel.textContent = "Don't auto-open on new pages or refresh";
    autoOption.appendChild(noAutoCheckbox);
    autoOption.appendChild(noAutoLabel);
    state.modal.appendChild(autoOption);

    // Controller open instructions (small, below sidebar option)
    const openInstructions = document.createElement('div');
    openInstructions.style.fontSize = '0.85em';
    openInstructions.style.color = '#a0aec0';
    openInstructions.style.marginTop = '4px';
    openInstructions.style.textAlign = 'center';
    openInstructions.innerHTML = '<strong>Tip:</strong> You can always open this controller by tripple-tapping, tripple-clicking anywhere, or pressing Ctrl+Shift+Z.';
    state.modal.appendChild(openInstructions);
    // Powered by branding
    const powered = document.createElement('div');
    powered.className = 'szfy-powered';
    const siteUrl = encodeURIComponent(window.location.hostname);
    powered.innerHTML = `Bring your site to life with <a href="https://seazonify.com?ref=${siteUrl}" target="_blank" rel="noopener"><span class="szfy-brand-gradient">Seazonify</span></a>.`;
    state.modal.appendChild(powered);
  }

  function renderSidebarBtn() {
    if (state.btn) return;
    const btn = document.createElement('button');
    btn.className = 'szfy-sidebar-btn';
    btn.setAttribute('aria-label', 'Open Seazonify Controller');
    btn.innerHTML = `<img src="${logoUrl}" alt="" class="szfy-sidebar-logo" />`;
    btn.onclick = openModal;
    document.body.appendChild(btn);
    state.btn = btn;
    // Hide if user preference
    if (localStorage.getItem('szfyHideSidebar') === '1') {
      btn.style.display = 'none';
    }
  }

  function openModal() {
    if (state.overlay) return;
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'szfy-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
    // Modal
    const modal = document.createElement('div');
    modal.className = 'szfy-modal';
    // Nature SVGs
    modal.innerHTML += `
      <svg class="szfy-nature n1" viewBox="0 0 36 36"><path d="M18 2C15 3 12 5 10 8C8 12 9 16 11 20C13 24 16 26 18 28C20 26 23 24 25 20C27 16 28 12 26 8C24 5 21 3 18 2Z" fill="#2d5016" fill-opacity="0.4"/><path d="M18 4C16 5 14 7 13 9C12 12 13 15 14 18C15 21 17 23 18 25C19 23 21 21 22 18C23 15 24 12 23 9C22 7 20 5 18 4Z" fill="#4a7c59" fill-opacity="0.3"/><path d="M18 6C17 7 16 8 15 10C14 12 15 14 16 16C17 18 18 19 18 20C18 19 19 18 20 16C21 14 22 12 21 10C20 8 19 7 18 6Z" fill="#6b8e23" fill-opacity="0.2"/></svg>
      <svg class="szfy-nature n2" viewBox="0 0 32 32"><path d="M16 2C13 3 10 5 8 8C6 12 7 16 9 20C11 24 14 26 16 28C18 26 21 24 23 20C25 16 26 12 24 8C22 5 19 3 16 2Z" fill="#8b4513" fill-opacity="0.4"/><path d="M16 4C14 5 12 7 11 9C10 12 11 15 12 18C13 21 15 23 16 25C17 23 19 21 20 18C21 15 22 12 21 9C20 7 18 5 16 4Z" fill="#cd853f" fill-opacity="0.3"/><path d="M16 6C15 7 14 8 13 10C12 12 13 14 14 16C15 18 16 19 16 20C16 19 17 18 18 16C19 14 20 12 19 10C18 8 17 7 16 6Z" fill="#daa520" fill-opacity="0.2"/></svg>
      <svg class="szfy-nature n3" viewBox="0 0 28 28"><path d="M14 2C11 3 8 5 6 8C4 12 5 16 7 20C9 24 12 26 14 28C16 26 19 24 21 20C23 16 24 12 22 8C20 5 17 3 14 2Z" fill="#228b22" fill-opacity="0.4"/><path d="M14 4C12 5 10 7 9 9C8 12 9 15 10 18C11 21 13 23 14 25C15 23 17 21 18 18C19 15 20 12 19 9C18 7 16 5 14 4Z" fill="#32cd32" fill-opacity="0.3"/><path d="M14 6C13 7 12 8 11 10C10 12 11 14 12 16C13 18 14 19 14 20C14 19 15 18 16 16C17 14 18 12 17 10C16 8 15 7 14 6Z" fill="#90ee90" fill-opacity="0.2"/></svg>
      <svg class="szfy-nature n4" viewBox="0 0 40 40"><path d="M20 2C17 3 14 5 12 8C10 12 11 16 13 20C15 24 18 26 20 28C22 26 25 24 27 20C29 16 30 12 28 8C26 5 23 3 20 2Z" fill="#556b2f" fill-opacity="0.4"/><path d="M20 4C18 5 16 7 15 9C14 12 15 15 16 18C17 21 19 23 20 25C21 23 23 21 24 18C25 15 26 12 25 9C24 7 22 5 20 4Z" fill="#6b8e23" fill-opacity="0.3"/><path d="M20 6C19 7 18 8 17 10C16 12 17 14 18 16C19 18 20 19 20 20C20 19 21 18 22 16C23 14 24 12 23 10C22 8 21 7 20 6Z" fill="#9acd32" fill-opacity="0.2"/></svg>
      <svg class="szfy-nature n5" viewBox="0 0 24 24"><path d="M12 2C9 3 6 5 4 8C2 12 3 16 5 20C7 24 10 26 12 28C14 26 17 24 19 20C21 16 22 12 20 8C18 5 15 3 12 2Z" fill="#8b0000" fill-opacity="0.4"/><path d="M12 4C10 5 8 7 7 9C6 12 7 15 8 18C9 21 11 23 12 25C13 23 15 21 16 18C17 15 18 12 17 9C16 7 14 5 12 4Z" fill="#dc143c" fill-opacity="0.3"/><path d="M12 6C11 7 10 8 9 10C8 12 9 14 10 16C11 18 12 19 12 20C12 19 13 18 14 16C15 14 16 12 15 10C14 8 13 7 12 6Z" fill="#ff6347" fill-opacity="0.2"/></svg>
      <svg class="szfy-nature n6" viewBox="0 0 30 30"><path d="M15 2C12 3 9 5 7 8C5 12 6 16 8 20C10 24 13 26 15 28C17 26 20 24 22 20C24 16 25 12 23 8C21 5 18 3 15 2Z" fill="#2f4f4f" fill-opacity="0.4"/><path d="M15 4C13 5 11 7 10 9C9 12 10 15 11 18C12 21 14 23 15 25C16 23 18 21 19 18C20 15 21 12 20 9C19 7 17 5 15 4Z" fill="#708090" fill-opacity="0.3"/><path d="M15 6C14 7 13 8 12 10C11 12 12 14 13 16C14 18 15 19 15 20C15 19 16 18 17 16C18 14 19 12 18 10C17 8 16 7 15 6Z" fill="#a9a9a9" fill-opacity="0.2"/></svg>
    `;
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'szfy-close';
    closeBtn.setAttribute('aria-label', 'Close Modal');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeModal;
    modal.appendChild(closeBtn);
    // Feedback button
    const feedbackBtn = document.createElement('button');
    feedbackBtn.className = 'szfy-feedback';
    feedbackBtn.setAttribute('aria-label', 'Submit Feedback');
    feedbackBtn.setAttribute('title', 'Give Feedback');
    feedbackBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    feedbackBtn.onclick = () => {
      const activeAudioName = audioEffects.length ? audioEffects[state.selectedAudio].name : 'None';
      const activeVisualName = visualEffects.length ? visualEffects[state.selectedVisual].name : 'None';
      const currentUrl = window.location.href;
      const isAudioOn = state.audio && !audioPaused;
      const isVisualOn = state.visual && !visualHidden;

      const feedbackUrl = new URL('https://seazonify.com/feedback');
      feedbackUrl.searchParams.set('url', currentUrl);
      feedbackUrl.searchParams.set('audio_effect', isAudioOn ? activeAudioName : 'None');
      feedbackUrl.searchParams.set('visual_effect', isVisualOn ? activeVisualName : 'None');
      feedbackUrl.searchParams.set('audio_status', isAudioOn ? 'active' : 'inactive');
      feedbackUrl.searchParams.set('visual_status', isVisualOn ? 'active' : 'inactive');
      feedbackUrl.searchParams.set('utm_source', window.location.hostname);
      feedbackUrl.searchParams.set('utm_medium', 'controller_v2');

      window.open(feedbackUrl.toString(), '_blank');
    };
    modal.appendChild(feedbackBtn);
    // Branding
    const brand = document.createElement('div');
    brand.className = 'szfy-brand';
    brand.innerHTML = `<img src="${logoUrl}" alt="Seazonify Logo" /><span>Seazonify</span>`;
    modal.appendChild(brand);
    state.modal = modal;
    renderModalContent();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    state.overlay = overlay;
    if (!hasFirstSeen()) markFirstSeen();
    // If audio was blocked, arm immediate resume on opening modal
    armUserGestureResume();
  }

  function closeModal() {
    if (state.overlay) {
      document.body.removeChild(state.overlay);
      state.overlay = null;
      state.modal = null;
    }
  }

  // --- Load effects from URL parameters ---
  function loadEffectsFromURL() {
    const currentScript = document.currentScript;
    if (!currentScript) return;

    // Get URL parameters
    const visualParam = currentScript.getAttribute('visual');
    const audioParam = currentScript.getAttribute('audio');
    const comboParam = currentScript.getAttribute('combo');
    dbg('loadEffectsFromURL', { visualParam, audioParam, comboParam });

    // Load visual effects
    if (visualParam) {
      const visualUrls = visualParam.split(',').map(url => url.trim());
      visualUrls.forEach(url => {
        loadVisualEffectFromURL(url);
      });
    }

    // Load audio effects
    if (audioParam) {
      const audioUrls = audioParam.split(',').map(url => url.trim());
      audioUrls.forEach(url => {
        loadAudioEffectFromURL(url);
      });
    }

    // Load combo effects
    if (comboParam) {
      const comboUrls = comboParam.split(',').map(url => url.trim());
      comboUrls.forEach(url => {
        loadComboEffectFromURL(url);
      });
    }
  }

  function loadVisualEffectFromURL(url) {
    loadScriptOnce(url).then(() => {
      // Wait a bit for the effect to register itself
      setTimeout(() => {
        // Check if any new effects were added
        if (visualEffects.length > 0) {
          // Auto-play the first visual effect
          state.visual = true;
          showVisualEffect(visualEffects[0]);
          if (state.modal) renderModalContent();
        }
      }, 100);
    }).catch(() => {
      // Failed to load visual effect
    });
  }

  function loadAudioEffectFromURL(url) {
    loadScriptOnce(url).then(() => {
      // Wait a bit for the effect to register itself
      setTimeout(() => {
        // Check if any new effects were added
        if (audioEffects.length > 0) {
          // Auto-play the first audio effect
          state.audio = true;
          playAudioEffect(audioEffects[0]);
          if (state.modal) renderModalContent();

          // Show controller for audio to handle autoplay restrictions
          const delayMs = hasFirstSeen() ? 500 : 7000; // delay more on the first visit
          setTimeout(() => {
            if (!state.overlay && !getNoAutoPopup()) {
              openModal();
            }
          }, delayMs);
        }
      }, 100);
    }).catch(() => {
      // Failed to load audio effect
    });
  }

  function loadComboEffectFromURL(url) {
    loadScriptOnce(url).then(() => {
      // Wait a bit for the effect to register itself
      setTimeout(() => {
        // Check if any new effects were added
        if (visualEffects.length > 0) {
          // Auto-play the first visual effect
          state.visual = true;
          showVisualEffect(visualEffects[0]);
          if (state.modal) renderModalContent();
        }
      }, 100);
    }).catch(() => {
      // Failed to load combo effect
    });
  }

  // --- Public API ---
  window.SeazonifyController = {
    open: openModal,
    close: closeModal,
    setAudio: (on) => {
      dbg('API setAudio', on);
      state.audio = !!on;
      if (on && audioEffects.length) {
        playAudioEffect(audioEffects[state.selectedAudio]);
      } else {
        stopAudioEffect();
      }
    },
    setVisual: (on) => {
      dbg('API setVisual', on);
      state.visual = !!on;
      if (on && visualEffects.length) {
        showVisualEffect(visualEffects[state.selectedVisual]);
      } else {
        removeVisualEffect();
      }
    },
    isAudio: () => !!state.audio,
    isVisual: () => !!state.visual,
    injectAudioEffect: function (effectObj) {
      dbg('injectAudioEffect', effectObj);
      audioEffects.push(effectObj);
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    injectVisualEffect: function (effectObj) {
      dbg('injectVisualEffect', effectObj);
      visualEffects.push(effectObj);
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    clearAudioEffects: function () {
      dbg('clearAudioEffects');
      audioEffects = [];
      stopAudioEffect();
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    clearVisualEffects: function () {
      dbg('clearVisualEffects');
      visualEffects = [];
      removeVisualEffect();
      saveCDNState();
      if (state.modal) renderModalContent();
    }
  };

  // --- Init ---
  renderSidebarBtn();
  loadEffectsFromURL();

  // Restore CDN effects from previous session
  const cdnState = loadCDNState();
  if (cdnState.visualUrls && cdnState.visualUrls.length > 0) {
    cdnState.visualUrls.forEach(url => loadVisualEffectFromURL(url));
  }
  if (cdnState.audioUrls && cdnState.audioUrls.length > 0) {
    cdnState.audioUrls.forEach(url => loadAudioEffectFromURL(url));
  }

  // --- Triple-click (desktop) and triple-tap (mobile) support ---
  let tapCount = 0;
  let lastTap = 0;
  let lastControllerOpen = 0;
  let lastPointerType = '';
  const TRIPLE_TAP_THRESHOLD = 600; // 600ms window for triple
  const CONTROLLER_COOLDOWN = 2000; // 2s cooldown

  document.addEventListener('pointerup', function (e) {
    const now = Date.now();

    // Only count primary pointers
    if (e.isPrimary === false) return;

    // Only allow mouse or touch
    const type = e.pointerType === 'touch' ? 'touch' : (e.pointerType === 'mouse' ? 'mouse' : '');
    if (!type) return;

    // Don’t combine different pointer types in a single triple sequence
    if (lastPointerType && lastPointerType !== type) {
      tapCount = 0;
      lastTap = 0;
    }
    lastPointerType = type;

    // Cooldown
    if (now - lastControllerOpen < CONTROLLER_COOLDOWN) {
      tapCount = 0;
      lastTap = now;
      return;
    }

    // Reset if gap too large
    if (now - lastTap > TRIPLE_TAP_THRESHOLD) {
      tapCount = 0;
    }

    tapCount++;
    lastTap = now;

    if (tapCount === 3) {
      if (!window.SeazonifyController || document.querySelector('.szfy-overlay')) return;
      if (e.target.closest('.szfy-modal')) return;
      window.SeazonifyController.open();
      tapCount = 0;
      lastControllerOpen = now;
    }
  }, true);

  // --- Keyboard shortcut (Ctrl+Shift+Z) ---
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'Z' || e.key === 'z')) {
      const now = Date.now();
      if (now - lastControllerOpen < CONTROLLER_COOLDOWN) return; // Cooldown check
      if (!window.SeazonifyController || document.querySelector('.szfy-overlay')) return;
      window.SeazonifyController.open();
      lastControllerOpen = now;
    }
  });

  // One-time user gesture resume handler for autoplay
  function armUserGestureResume() {
    if (!audioBlockedByAutoplay) return;
    const tryResume = () => {
      if (!audioElement) { disarm(); return; }
      audioElement.play().then(() => {
        dbg('audio resumed after user gesture');
        audioBlockedByAutoplay = false;
        disarm();
      }).catch(() => { /* keep armed until a subsequent gesture */ });
    };
    const events = ['click', 'touchstart', 'keydown'];
    const disarm = () => { events.forEach(ev => document.removeEventListener(ev, tryResume, true)); };
    events.forEach(ev => document.addEventListener(ev, tryResume, true));
  }
})();
