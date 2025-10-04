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

    // --- Detect dark mode ---
    const isDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

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
      if (!effect) return;
      audioElement = document.createElement('audio');
      audioElement.src = effect.url;
      audioElement.loop = effect.loop !== false;
      audioElement.volume = typeof effect.volume === 'number' ? effect.volume : 0.2;
      audioElement.autoplay = true;
      audioElement.id = 'szfy-audio';
      // Resume from pause time if audio was paused
      if (audioPaused && audioPauseTime > 0) {
        audioElement.currentTime = audioPauseTime;
        audioPauseTime = 0;
      }
      document.body.appendChild(audioElement);
      audioPaused = false;
    }
    function pauseAudioEffect() {
      if (audioElement && !audioElement.paused) {
        audioPauseTime = audioElement.currentTime;
        audioElement.pause();
        audioPaused = true;
      }
    }
    function resumeAudioEffect() {
      if (audioElement && audioElement.paused) {
        audioElement.play();
        audioPaused = false;
      }
    }
    function stopAudioEffect() {
      if (audioElement) { 
        audioElement.pause(); 
        audioElement.remove(); 
        audioElement = null; 
      }
      audioPaused = false;
      audioPauseTime = 0;
    }
    function showVisualEffect(effect) {
      removeVisualEffect();
      if (!effect) return;
      // Dynamically load effect JS file if present (always attempt if file exists)
      if (effect.file) {
        // Prevent loading the same script multiple times
        if (!document.querySelector(`script[data-szfy-effect="${effect.file}"]`)) {
          const script = document.createElement('script');
          // Check if the URL is already absolute (starts with http/https)
          const scriptUrl = effect.file.startsWith('http') ? effect.file : `/effects/${effect.file}`;
          script.src = scriptUrl;
          script.async = true;
          script.setAttribute('data-szfy-effect', effect.file);
          document.body.appendChild(script);
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
        }
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
          src: currentAudio.src,
          paused: audioPaused,
          pauseTime: audioElement ? audioElement.currentTime : 0
        } : null,
        visual: currentVisual ? { src: currentVisual.src } : null
      };
      localStorage.setItem('seazonify_state', JSON.stringify(state));
    }

    function loadSeazonifyState() {
      try {
        return JSON.parse(localStorage.getItem('seazonify_state')) || {};
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
      if (state.audio && state.audio.src) {
        // Find the effect by src and play it
        const effect = audioEffects.find(e => e.src === state.audio.src);
        if (effect) {
          playAudioEffect(effect);
          if (audioElement && state.audio.pauseTime) {
            audioElement.currentTime = state.audio.pauseTime;
          }
          if (state.audio.paused) {
            pauseAudioEffect();
          }
        }
      }
      if (state.visual && state.visual.src) {
        const effect = visualEffects.find(e => e.src === state.visual.src);
        if (effect) {
          showVisualEffect(effect);
        }
      }
    });
  
    // --- UI Functions ---
    function renderModalContent() {
      if (!state.modal) return;
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
      audioCard.innerHTML = `<img class="szfy-thumb" src="${audioEffects.length && audioEffects[state.selectedAudio].thumbnail ? audioEffects[state.selectedAudio].thumbnail : 'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/seazonify-logo.png'}" alt="Audio Effect" /><div class="szfy-label">Audio</div><div class="szfy-desc">${audioEffects.length ? audioEffects[state.selectedAudio].name : 'No audio effect loaded.'}</div>`;
      audioCard.onclick = () => {
        if (audioEffects.length > 0) {
          if (state.audio && !audioPaused) {
            // Audio is playing, pause it
            pauseAudioEffect();
          } else if (state.audio && audioPaused) {
            // Audio is paused, resume it
            resumeAudioEffect();
          } else {
            // Audio is stopped, start it
            state.audio = true;
            playAudioEffect(audioEffects[state.selectedAudio]);
          }
          audioCard.classList.toggle('selected', state.audio && !audioPaused);
        }
      };
      // Visual Card
      const visualCard = document.createElement('div');
      visualCard.className = 'szfy-card' + (isVisualActive ? ' selected' : '');
      visualCard.innerHTML = `<img class="szfy-thumb" src="${visualEffects.length && visualEffects[state.selectedVisual].thumbnail ? visualEffects[state.selectedVisual].thumbnail : 'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/seazonify-logo.png'}" alt="Visual Effect" /><div class="szfy-label">Visual</div><div class="szfy-desc">${visualEffects.length ? visualEffects[state.selectedVisual].name : 'No visual effect loaded.'}</div>`;
      visualCard.onclick = () => {
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
      // Controller open instructions (small, below sidebar option)
      const openInstructions = document.createElement('div');
      openInstructions.style.fontSize = '0.85em';
      openInstructions.style.color = '#a0aec0';
      openInstructions.style.marginTop = '4px';
      openInstructions.style.textAlign = 'center';
      openInstructions.textContent = 'Tip: You can always open this controller by tripple-tapping, tripple-clicking anywhere, or pressing Ctrl+Shift+Z.';
      state.modal.appendChild(openInstructions);
      // Powered by branding
      const powered = document.createElement('div');
      powered.className = 'szfy-powered';
      powered.innerHTML = 'Bring your site to life with <a href="https://seazonify.com" target="_blank" rel="noopener"><span class="szfy-brand-gradient">Seazonify</span></a>.';
      state.modal.appendChild(powered);
    }

    function renderSidebarBtn() {
      if (state.btn) return;
      const btn = document.createElement('button');
      btn.className = 'szfy-sidebar-btn';
      btn.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/seazonify-logo.png" alt="Seazonify Logo" style="width:28px;height:28px;display:block;" />`;
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
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = closeModal;
      modal.appendChild(closeBtn);
      // Branding
      const brand = document.createElement('div');
      brand.className = 'szfy-brand';
      brand.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/seazonify-logo.png" alt="Seazonify Logo" /><span>Seazonify</span>`;
      modal.appendChild(brand);
      state.modal = modal;
      renderModalContent();
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
      state.overlay = overlay;
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
      // Create a temporary script to load the effect
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        // The effect should register itself with window.SeazonifyController
        if (window.SeazonifyController && window.SeazonifyController.injectVisualEffect) {
          // Find the effect that was just loaded
          const effect = visualEffects.find(e => e.file === url);
          if (effect) {
            window.SeazonifyController.injectVisualEffect(effect);
          }
        }
      };
      document.head.appendChild(script);
    }

    function loadAudioEffectFromURL(url) {
      // Create a temporary script to load the effect
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        // The effect should register itself with window.SeazonifyController
        if (window.SeazonifyController && window.SeazonifyController.injectAudioEffect) {
          // Find the effect that was just loaded
          const effect = audioEffects.find(e => e.audioJsUrl === url);
          if (effect) {
            window.SeazonifyController.injectAudioEffect(effect);
          }
        }
      };
      document.head.appendChild(script);
    }

    function loadComboEffectFromURL(url) {
      // Create a temporary script to load the effect
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => {
        // The effect should register itself with window.SeazonifyController
        if (window.SeazonifyController && window.SeazonifyController.injectVisualEffect) {
          // Find the effect that was just loaded
          const effect = visualEffects.find(e => e.file === url);
          if (effect) {
            window.SeazonifyController.injectVisualEffect(effect);
          }
        }
      };
      document.head.appendChild(script);
    }
  
    // --- Public API ---
    window.SeazonifyController = {
      open: openModal,
      close: closeModal,
      setAudio: (on) => { 
        state.audio = !!on; 
        if (on && audioEffects.length) {
          playAudioEffect(audioEffects[state.selectedAudio]);
        } else {
          stopAudioEffect();
        }
      },
      setVisual: (on) => { 
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
        audioEffects.push(effectObj);
        if (state.modal) renderModalContent();
      },
      injectVisualEffect: function(effectObj) {
        visualEffects.push(effectObj);
        if (state.modal) renderModalContent();
      },
      clearAudioEffects: function() {
        audioEffects = [];
        stopAudioEffect();
        if (state.modal) renderModalContent();
      },
      clearVisualEffects: function() {
        visualEffects = [];
        removeVisualEffect();
        if (state.modal) renderModalContent();
      }
    };
  
    // --- Init ---
    renderSidebarBtn();
    loadEffectsFromURL();
    
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
  })();