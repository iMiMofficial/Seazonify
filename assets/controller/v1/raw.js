(function() {
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
    try { localStorage.setItem(AUDIO_CONSENT_KEY, v ? '1' : '0'); } catch {}
    dbg('audio consent set', v);
  };
  const getNoAutoPopup = () => {
    try { return localStorage.getItem(NO_AUTO_POPUP_KEY) === '1'; } catch { return false; }
  };
  const setNoAutoPopup = (v) => {
    try { localStorage.setItem(NO_AUTO_POPUP_KEY, v ? '1' : '0'); } catch {}
    dbg('noAutoPopup set', v);
  };
  const hasFirstSeen = () => {
    try { return localStorage.getItem(FIRST_SEEN_KEY) === '1'; } catch { return false; }
  };
  const markFirstSeen = () => {
    try { localStorage.setItem(FIRST_SEEN_KEY, '1'); } catch {}
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
      z-index: 9999;
      background: #181f2a;
      color: #fff;
      border-radius: 20px 0 0 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.10);
      padding: 8px 16px 8px 12px;
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
    .szfy-overlay {
      font-family: ${fontStack};
      position: fixed;
      inset: 0;
      background: rgba(8, 12, 20, 0.85);
      backdrop-filter: blur(2px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: szfy-fade-in 0.18s;
    }
    @keyframes szfy-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .szfy-modal {
      font-family: ${fontStack};
      background: rgba(24, 31, 42, 0.85);
      border-radius: 18px;
      box-shadow: 0 6px 32px rgba(0,0,0,0.18);
      border: 1.5px solid #232b3a;
      padding: 28px 18px 18px 18px;
      min-width: 260px;
      max-width: 420px;
      min-height: 220px;
      max-height: 80vh;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: szfy-pop-in 0.18s;
      color: #f1f5f9;
      overflow: hidden;
    }
    .szfy-nature {
      position: absolute;
      pointer-events: none;
      z-index: 0;
      opacity: 0.12;
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
      from { transform: scale(0.97); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .szfy-modal .szfy-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #f1f5f9;
      border: none;
      font-size: 20px;
      color: #64748b;
      cursor: pointer;
      transition: color 0.18s, background 0.18s;
      padding: 2px 6px;
      border-radius: 6px;
      z-index: 2;
    }
    .szfy-modal .szfy-close:hover {
      color: #ef4444;
      background: #f1f5f9;
    }
    .szfy-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
      margin-bottom: 10px;
      z-index: 2;
    }
    .szfy-brand img {
      height: 40px;
      width: 40px;
      border-radius: 10px;
      box-shadow: none;
      background: none;
      margin-bottom: 2px;
    }
    .szfy-brand span {
      font-size: 1.55rem;
      font-weight: bold;
      background: ${gradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      display: block;
      text-align: center;
    }
    .szfy-message {
      font-size: 1.01rem;
      color: #e0e7ef;
      margin-bottom: 10px;
      text-align: center;
      font-weight: 500;
      line-height: 1.4;
      opacity: 0.92;
      z-index: 2;
      margin-top: 8px;
      margin-bottom: 12px;
    }
    .szfy-instructions {
      font-size: 0.97rem;
      color: #cbd5e1;
      margin-top: 8px;
      margin-bottom: 2px;
      text-align: center;
      font-weight: 400;
      z-index: 2;
      margin-bottom: 14px;
    }
    .szfy-cards {
      width: 100%;
      display: flex;
      gap: 10px;
      margin-top: 2px;
      margin-bottom: 10px;
      z-index: 2;
      justify-content: center;
      flex-direction: row;
      flex-wrap: nowrap;
      margin-bottom: 18px;
    }
    .szfy-card {
      background: rgba(36, 44, 60, 0.92);
      border-radius: 10px;
      box-shadow: 0 1px 8px rgba(0,0,0,0.10);
      padding: 6px 4px 6px 4px;
      min-width: 60px;
      max-width: 75px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: box-shadow 0.18s, background 0.18s, border 0.18s;
      cursor: pointer;
      border: 2px solid transparent;
      user-select: none;
      font-size: 0.85rem;
    }
    .szfy-card.selected {
      border: 2px solid #3b82f6;
      background: rgba(36, 44, 60, 0.98);
    }
    .szfy-thumb {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      margin-bottom: 4px;
    }
    .szfy-label {
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1px;
    }
    .szfy-desc {
      font-size: 0.75rem;
      color: #cbd5e1;
      text-align: center;
      line-height: 1.1;
    }
    .szfy-powered {
      font-size: 0.72rem;
      color: #b6c2d6;
      margin-top: 18px;
      text-align: center;
      opacity: 0.85;
      z-index: 2;
      letter-spacing: 0.01em;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .szfy-powered .szfy-brand-gradient {
      font-weight: bold;
      background: linear-gradient(135deg, #3b82f6, #60a5fa, #22d3a8, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-size: 0.82rem;
      margin-left: 2px;
      margin-right: 2px;
      letter-spacing: 0.01em;
    }
    .szfy-powered a {
      color: ${primary};
      text-decoration: underline;
      font-weight: 600;
      transition: color 0.18s;
    }
    .szfy-powered a:hover {
      color: ${accent};
    }
    @media (max-width: 600px) {
      .szfy-modal {
        min-width: 180px;
        max-width: 98vw;
        padding: 16px 6px 10px 6px;
      }
      .szfy-cards {
        gap: 10px;
      }
      .szfy-card {
        min-width: 60px;
        max-width: 80px;
        padding: 6px 4px 6px 4px;
        font-size: 0.85rem;
      }
      .szfy-thumb {
        width: 22px;
        height: 22px;
        margin-bottom: 3px;
      }
      .szfy-label {
        font-size: 0.85rem;
        margin-bottom: 1px;
      }
      .szfy-desc {
        font-size: 0.75rem;
        line-height: 1.1;
      }
      .szfy-message, .szfy-instructions {
        font-size: 0.85rem;
      }
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
    audioElement.volume = typeof effect.volume === 'number' ? effect.volume : 0.2;
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
  playAudioEffect = function(effect) {
    _playAudioEffect(effect);
    saveSeazonifyState();
  };
  const _pauseAudioEffect = pauseAudioEffect;
  pauseAudioEffect = function() {
    _pauseAudioEffect();
    saveSeazonifyState();
  };
  const _resumeAudioEffect = resumeAudioEffect;
  resumeAudioEffect = function() {
    _resumeAudioEffect();
    saveSeazonifyState();
  };
  const _stopAudioEffect = stopAudioEffect;
  stopAudioEffect = function() {
    _stopAudioEffect();
    saveSeazonifyState();
  };
  const _showVisualEffect = showVisualEffect;
  showVisualEffect = function(effect) {
    _showVisualEffect(effect);
    saveSeazonifyState();
  };
  const _removeVisualEffect = removeVisualEffect;
  removeVisualEffect = function() {
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
    sidebarCheckbox.onchange = function() {
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
    noAutoCheckbox.onchange = function() {
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
    btn.innerHTML = `<img src="${logoUrl}" alt="Seazonify Logo" style="width:28px;height:28px;display:block;" />`;
    btn.onclick = openModal;
    document.body.appendChild(btn);
    state.btn = btn;
    // Preload logo for future use
    preloadLogo();
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
    // Container
    const modal = document.createElement('div');
    modal.className = 'szfy-modal';
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'szfy-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeModal;
    modal.appendChild(closeBtn);
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
    injectAudioEffect: function(effectObj) {
      dbg('injectAudioEffect', effectObj);
      audioEffects.push(effectObj);
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    injectVisualEffect: function(effectObj) {
      dbg('injectVisualEffect', effectObj);
      visualEffects.push(effectObj);
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    clearAudioEffects: function() {
      dbg('clearAudioEffects');
      audioEffects = [];
      stopAudioEffect();
      saveCDNState();
      if (state.modal) renderModalContent();
    },
    clearVisualEffects: function() {
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
  const TRIPLE_TAP_THRESHOLD = 600; // 600ms window for triple tap
  const CONTROLLER_COOLDOWN = 2000; // 2 second cooldown after opening controller

  // Desktop triple-click support
  document.addEventListener('click', function (e) {
      const now = Date.now();

      // Check cooldown first
      if (now - lastControllerOpen < CONTROLLER_COOLDOWN) {
          tapCount = 0; // Reset tap count during cooldown
          lastTap = now;
          return;
      }

      // Reset tap count if too much time has passed
      if (now - lastTap > TRIPLE_TAP_THRESHOLD) {
          tapCount = 0;
      }

      tapCount++;
      lastTap = now;

      // Check for triple click
      if (tapCount === 3) {
          if (!window.SeazonifyController || document.querySelector('.szfy-overlay')) return;
          if (e.target.closest('.szfy-modal')) return;
          window.SeazonifyController.open();
          tapCount = 0; // Reset after successful triple click
          lastControllerOpen = now;
      }
  });

  // Mobile triple-tap support
  document.addEventListener('touchend', function (e) {
      const now = Date.now();

      // Check cooldown first
      if (now - lastControllerOpen < CONTROLLER_COOLDOWN) {
          tapCount = 0; // Reset tap count during cooldown
          lastTap = now;
          return;
      }

      // Reset tap count if too much time has passed
      if (now - lastTap > TRIPLE_TAP_THRESHOLD) {
          tapCount = 0;
      }

      tapCount++;
      lastTap = now;

      // Check for triple tap
      if (tapCount === 3) {
          if (!window.SeazonifyController || document.querySelector('.szfy-overlay')) return;
          if (e.target.closest('.szfy-modal')) return;
          window.SeazonifyController.open();
          tapCount = 0; // Reset after successful triple tap
          lastControllerOpen = now;
      }
  });
  
  // --- Keyboard shortcut (Ctrl+Shift+Z) ---
  document.addEventListener('keydown', function(e) {
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
    const events = ['click','touchstart','keydown'];
    const disarm = () => { events.forEach(ev => document.removeEventListener(ev, tryResume, true)); };
    events.forEach(ev => document.addEventListener(ev, tryResume, true));
  }
})();
