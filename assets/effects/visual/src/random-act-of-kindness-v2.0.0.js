// Random Act of Kindness Day Effect v2.0.0 for Seazonify Controller
// A subtle, elegant ambient effect with soft floating hearts, warm glowing orbs, and gentle sparkles
// Non-intrusive — complements any website without interfering with content
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(randomActOfKindnessEffect);

const randomActOfKindnessEffect = {
  name: "Random Act of Kindness",
  description: "A gentle, non-intrusive ambient effect featuring delicate floating hearts, warm glowing orbs, and soft sparkles that make any website feel more alive and welcoming.",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "💖",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/random-act-of-kindness.webp",
  license: "https://seazonify.com/license",
  version: "2.0.0",
  created: "2026-02-19",
  category: "celebration",
  tags: ["kindness", "love", "heart", "positive", "elegant", "soft", "warm", "ambient", "gentle"],
  css: `
    .szfy-kindness-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    /* ── Hearts ── */
    .szfy-kindness-heart {
      position: absolute;
      opacity: 0;
      pointer-events: none;
      will-change: transform, opacity;
      animation:
        szfy-kindness-rise var(--szfy-k-dur) ease-in-out forwards,
        szfy-kindness-drift var(--szfy-k-drift-dur) ease-in-out infinite alternate;
    }

    .szfy-kindness-heart svg {
      display: block;
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 var(--szfy-k-glow-size) var(--szfy-k-glow));
    }

    @keyframes szfy-kindness-rise {
      0% {
        transform: translateY(0) scale(var(--szfy-k-scale-start));
        opacity: 0;
      }
      8% {
        opacity: var(--szfy-k-opacity);
      }
      85% {
        opacity: var(--szfy-k-opacity);
      }
      100% {
        transform: translateY(var(--szfy-k-travel)) scale(var(--szfy-k-scale-end));
        opacity: 0;
      }
    }

    @keyframes szfy-kindness-drift {
      0% {
        margin-left: calc(var(--szfy-k-drift) * -1);
      }
      100% {
        margin-left: var(--szfy-k-drift);
      }
    }

    /* ── Warm Orbs ── */
    .szfy-kindness-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      will-change: transform, opacity;
      background: radial-gradient(circle at 35% 35%,
        var(--szfy-k-orb-inner),
        var(--szfy-k-orb-outer) 70%,
        transparent 100%);
      filter: blur(1px);
      animation:
        szfy-kindness-orb-float var(--szfy-k-orb-dur) ease-in-out forwards,
        szfy-kindness-orb-pulse var(--szfy-k-orb-pulse-dur) ease-in-out infinite alternate;
      opacity: 0;
    }

    @keyframes szfy-kindness-orb-float {
      0% {
        transform: translateY(0) scale(0.5);
        opacity: 0;
      }
      12% {
        opacity: var(--szfy-k-orb-opacity);
      }
      80% {
        opacity: var(--szfy-k-orb-opacity);
      }
      100% {
        transform: translateY(var(--szfy-k-orb-travel)) scale(0.3);
        opacity: 0;
      }
    }

    @keyframes szfy-kindness-orb-pulse {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.15);
      }
    }

    /* ── Sparkles ── */
    .szfy-kindness-sparkle {
      position: absolute;
      width: var(--szfy-k-sp-size);
      height: var(--szfy-k-sp-size);
      pointer-events: none;
      will-change: transform, opacity;
      opacity: 0;
    }

    .szfy-kindness-sparkle::before,
    .szfy-kindness-sparkle::after {
      content: '';
      position: absolute;
      background: var(--szfy-k-sp-color);
      border-radius: 50%;
    }

    .szfy-kindness-sparkle::before {
      top: 0;
      left: 50%;
      width: 2px;
      height: 100%;
      transform: translateX(-50%);
    }

    .szfy-kindness-sparkle::after {
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      transform: translateY(-50%);
    }

    .szfy-kindness-sparkle {
      animation: szfy-kindness-twinkle var(--szfy-k-sp-dur) ease-in-out forwards;
    }

    @keyframes szfy-kindness-twinkle {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      20% {
        transform: scale(1) rotate(20deg);
        opacity: var(--szfy-k-sp-opacity);
      }
      50% {
        transform: scale(1.2) rotate(45deg);
        opacity: var(--szfy-k-sp-opacity);
      }
      80% {
        transform: scale(0.8) rotate(65deg);
        opacity: calc(var(--szfy-k-sp-opacity) * 0.5);
      }
      100% {
        transform: scale(0) rotate(90deg);
        opacity: 0;
      }
    }

    /* ── Wish Banner ── */
    .szfy-kindness-wish {
      position: fixed;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      opacity: 0;
      animation: szfy-kindness-wish-life 8s ease-in-out forwards;
    }

    .szfy-kindness-wish-main {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: clamp(22px, 4vw, 42px);
      font-weight: 700;
      font-style: italic;
      color: transparent;
      background: linear-gradient(135deg, #FF6B81, #FF8FA3, #FFACC7, #FF7EB3);
      -webkit-background-clip: text;
      background-clip: text;
      text-align: center;
      line-height: 1.3;
      padding: 0 20px;
      filter: drop-shadow(0 0 18px rgba(255,107,129,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.08));
      letter-spacing: 0.5px;
      transform: translateX(60px);
      opacity: 0;
      animation: szfy-kindness-text-slide 8s ease-in-out forwards;
    }

    .szfy-kindness-wish-sub {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: clamp(11px, 1.6vw, 16px);
      font-weight: 400;
      color: rgba(255,143,163,0.8);
      text-align: center;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 0 20px;
      filter: drop-shadow(0 0 8px rgba(255,143,163,0.25));
      transform: translateX(80px);
      opacity: 0;
      animation: szfy-kindness-text-slide 8s ease-in-out 0.3s forwards;
    }

    .szfy-kindness-wish-heart-icon {
      font-size: clamp(16px, 2.5vw, 26px);
      opacity: 0;
      animation: szfy-kindness-icon-pop 8s ease-in-out 0.15s forwards;
      filter: drop-shadow(0 0 10px rgba(255,107,129,0.4));
    }

    @keyframes szfy-kindness-wish-life {
      0%   { opacity: 0; }
      8%   { opacity: 1; }
      85%  { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes szfy-kindness-text-slide {
      0% {
        transform: translateX(60px);
        opacity: 0;
      }
      10% {
        transform: translateX(0);
        opacity: 1;
      }
      82% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(-60px);
        opacity: 0;
      }
    }

    @keyframes szfy-kindness-icon-pop {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      12% {
        transform: scale(1.15);
        opacity: 1;
      }
      18% {
        transform: scale(1);
      }
      80% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.3);
        opacity: 0;
      }
    }
  `,
  html: '<div class="szfy-kindness-container" id="szfy-kindness-container"></div>',
  js: `
    (function() {
      var container = document.getElementById('szfy-kindness-container');
      if (!container) return;

      /* ── Configuration ── */
      var isMobile = window.innerWidth < 768;
      var MAX_HEARTS   = isMobile ? 12 : 20;
      var MAX_ORBS     = isMobile ? 4  : 7;
      var MAX_SPARKLES = isMobile ? 6  : 10;

      var HEART_INTERVAL   = isMobile ? 2200 : 1400;
      var ORB_INTERVAL     = isMobile ? 4500 : 3200;
      var SPARKLE_INTERVAL = isMobile ? 2500 : 1600;

      var activeHearts   = 0;
      var activeOrbs     = 0;
      var activeSparkles = 0;
      var heartTimer, orbTimer, sparkleTimer, wishTimeout;
      var paused = false;

      /* ── Palettes ── */
      var heartPalettes = [
        { fill: '#FF8FA3', glow: 'rgba(255,143,163,0.50)' },
        { fill: '#FF6B81', glow: 'rgba(255,107,129,0.45)' },
        { fill: '#F9A8B8', glow: 'rgba(249,168,184,0.45)' },
        { fill: '#FF7EB3', glow: 'rgba(255,126,179,0.40)' },
        { fill: '#EDB7D5', glow: 'rgba(237,183,213,0.40)' },
        { fill: '#FF9A9E', glow: 'rgba(255,154,158,0.45)' },
        { fill: '#FFACC7', glow: 'rgba(255,172,199,0.40)' }
      ];

      var orbPalettes = [
        { inner: 'rgba(255,182,193,0.45)', outer: 'rgba(255,182,193,0.12)' },
        { inner: 'rgba(255,160,180,0.40)', outer: 'rgba(255,160,180,0.10)' },
        { inner: 'rgba(255,218,185,0.40)', outer: 'rgba(255,218,185,0.10)' },
        { inner: 'rgba(255,200,220,0.40)', outer: 'rgba(255,200,220,0.10)' },
        { inner: 'rgba(238,186,212,0.40)', outer: 'rgba(238,186,212,0.10)' }
      ];

      var sparklePalettes = [
        'rgba(255,180,200,0.7)',
        'rgba(255,200,180,0.65)',
        'rgba(255,170,210,0.65)',
        'rgba(255,220,200,0.6)',
        'rgba(255,190,190,0.65)'
      ];

      /* ── Helpers ── */
      function rand(min, max) { return Math.random() * (max - min) + min; }
      function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

      function heartSVG(color) {
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
          + '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 '
          + '2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 '
          + '14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86'
          + '-8.55 11.54L12 21.35z" fill="' + color + '"/></svg>';
      }

      /* ── Create Heart ── */
      function createHeart() {
        if (paused || activeHearts >= MAX_HEARTS) return;

        var el = document.createElement('div');
        el.className = 'szfy-kindness-heart';

        var palette = pick(heartPalettes);
        var size = rand(18, 34);
        var dur = rand(12, 20);
        var driftDur = rand(3, 6);
        var drift = rand(12, 30);
        var opacity = rand(0.4, 0.7);
        var travel = -1 * (window.innerHeight + 80);

        el.style.cssText =
          'left:' + rand(2, 95) + '%;'
          + 'bottom:-40px;'
          + 'width:' + size + 'px;'
          + 'height:' + size + 'px;'
          + '--szfy-k-dur:' + dur + 's;'
          + '--szfy-k-drift-dur:' + driftDur + 's;'
          + '--szfy-k-drift:' + drift + 'px;'
          + '--szfy-k-opacity:' + opacity + ';'
          + '--szfy-k-travel:' + travel + 'px;'
          + '--szfy-k-scale-start:' + rand(0.7, 0.9) + ';'
          + '--szfy-k-scale-end:' + rand(0.4, 0.6) + ';'
          + '--szfy-k-glow:' + palette.glow + ';'
          + '--szfy-k-glow-size:' + rand(5, 10) + 'px;';

        el.innerHTML = heartSVG(palette.fill);
        container.appendChild(el);
        activeHearts++;

        setTimeout(function() {
          if (el.parentNode) el.parentNode.removeChild(el);
          activeHearts--;
        }, (dur + 1) * 1000);
      }

      /* ── Create Orb ── */
      function createOrb() {
        if (paused || activeOrbs >= MAX_ORBS) return;

        var el = document.createElement('div');
        el.className = 'szfy-kindness-orb';

        var palette = pick(orbPalettes);
        var size = rand(30, 60);
        var dur = rand(14, 24);
        var pulseDur = rand(3, 6);
        var opacity = rand(0.25, 0.45);
        var travel = -1 * (window.innerHeight + 100);

        el.style.cssText =
          'left:' + rand(5, 90) + '%;'
          + 'bottom:-50px;'
          + 'width:' + size + 'px;'
          + 'height:' + size + 'px;'
          + '--szfy-k-orb-inner:' + palette.inner + ';'
          + '--szfy-k-orb-outer:' + palette.outer + ';'
          + '--szfy-k-orb-dur:' + dur + 's;'
          + '--szfy-k-orb-pulse-dur:' + pulseDur + 's;'
          + '--szfy-k-orb-opacity:' + opacity + ';'
          + '--szfy-k-orb-travel:' + travel + 'px;';

        container.appendChild(el);
        activeOrbs++;

        setTimeout(function() {
          if (el.parentNode) el.parentNode.removeChild(el);
          activeOrbs--;
        }, (dur + 1) * 1000);
      }

      /* ── Create Sparkle ── */
      function createSparkle() {
        if (paused || activeSparkles >= MAX_SPARKLES) return;

        var el = document.createElement('div');
        el.className = 'szfy-kindness-sparkle';

        var color = pick(sparklePalettes);
        var size = rand(8, 16);
        var dur = rand(2.5, 5);
        var opacity = rand(0.45, 0.7);

        el.style.cssText =
          'left:' + rand(5, 92) + '%;'
          + 'top:' + rand(5, 85) + '%;'
          + '--szfy-k-sp-size:' + size + 'px;'
          + '--szfy-k-sp-color:' + color + ';'
          + '--szfy-k-sp-dur:' + dur + 's;'
          + '--szfy-k-sp-opacity:' + opacity + ';';

        container.appendChild(el);
        activeSparkles++;

        setTimeout(function() {
          if (el.parentNode) el.parentNode.removeChild(el);
          activeSparkles--;
        }, (dur + 0.5) * 1000);
      }

      /* ── Wish Banner ── */
      var wishMessages = [
        { main: 'Happy Random Acts of Kindness Day!', sub: 'One small act can change someone\\'s whole day' },
        { main: 'Spread Kindness Everywhere', sub: 'The world needs more of what you have to give' },
        { main: 'Be the Reason Someone Smiles Today', sub: 'Happy Random Acts of Kindness Day' },
        { main: 'Kindness is Free — Sprinkle it Everywhere', sub: 'February 17 \u2022 A day to celebrate compassion' },
        { main: 'Your Kindness Matters More Than You Know', sub: 'Celebrating Random Acts of Kindness Day' },
        { main: 'Make Someone\\'s Day a Little Brighter', sub: 'Every act of kindness creates a ripple' }
      ];
      var wishIndex = 0;
      var WISH_DURATION = 9000;

      function showWish() {
        if (paused) return;

        var msg = wishMessages[wishIndex];
        wishIndex = (wishIndex + 1) % wishMessages.length;

        var wish = document.createElement('div');
        wish.className = 'szfy-kindness-wish';
        wish.innerHTML =
          '<div class="szfy-kindness-wish-heart-icon">\u2764\uFE0F</div>'
          + '<div class="szfy-kindness-wish-main">' + msg.main + '</div>'
          + '<div class="szfy-kindness-wish-sub">' + msg.sub + '</div>';

        container.appendChild(wish);

        setTimeout(function() {
          if (wish.parentNode) wish.parentNode.removeChild(wish);
        }, WISH_DURATION);

        scheduleNextWish();
      }

      function scheduleNextWish() {
        var delay = (rand(1, 3) * 60 * 1000);
        wishTimeout = setTimeout(showWish, delay);
      }

      /* ── Timers ── */
      function startTimers() {
        heartTimer   = setInterval(createHeart,   HEART_INTERVAL);
        orbTimer     = setInterval(createOrb,      ORB_INTERVAL);
        sparkleTimer = setInterval(createSparkle,  SPARKLE_INTERVAL);
      }

      function stopTimers() {
        clearInterval(heartTimer);
        clearInterval(orbTimer);
        clearInterval(sparkleTimer);
      }

      /* ── Staggered startup — feel alive immediately ── */
      function init() {
        var heartBurst = isMobile ? 5 : 8;
        var orbBurst   = isMobile ? 2 : 4;
        var sparkBurst = isMobile ? 3 : 5;

        for (var i = 0; i < heartBurst; i++) {
          (function(idx) {
            setTimeout(createHeart, idx * 600 + rand(0, 400));
          })(i);
        }
        for (var j = 0; j < orbBurst; j++) {
          (function(idx) {
            setTimeout(createOrb, idx * 1000 + rand(100, 600));
          })(j);
        }
        for (var k = 0; k < sparkBurst; k++) {
          (function(idx) {
            setTimeout(createSparkle, idx * 700 + rand(200, 500));
          })(k);
        }

        startTimers();

        /* First wish appears after 3s so hearts fill in first */
        setTimeout(showWish, 3000);
      }

      /* ── Visibility handling ── */
      function onVisibilityChange() {
        if (document.hidden) {
          paused = true;
          stopTimers();
        } else {
          paused = false;
          startTimers();
        }
      }
      document.addEventListener('visibilitychange', onVisibilityChange);

      /* ── Resize handling ── */
      var resizeTimeout;
      function onResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          isMobile = window.innerWidth < 768;
          MAX_HEARTS   = isMobile ? 12 : 20;
          MAX_ORBS     = isMobile ? 4  : 7;
          MAX_SPARKLES = isMobile ? 6  : 10;
          HEART_INTERVAL   = isMobile ? 2200 : 1400;
          ORB_INTERVAL     = isMobile ? 4500 : 3200;
          SPARKLE_INTERVAL = isMobile ? 2500 : 1600;
          stopTimers();
          startTimers();
        }, 300);
      }
      window.addEventListener('resize', onResize);

      /* ── Cleanup ── */
      window.szfyRandomActOfKindnessCleanup = function() {
        stopTimers();
        clearTimeout(resizeTimeout);
        clearTimeout(wishTimeout);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('resize', onResize);
        if (container) {
          container.innerHTML = '';
        }
        activeHearts = 0;
        activeOrbs = 0;
        activeSparkles = 0;
      };

      /* ── Start ── */
      init();
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(randomActOfKindnessEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = randomActOfKindnessEffect;
}
