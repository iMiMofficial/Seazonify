// Winter Magic Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(winterMagicEffect);

const winterMagicEffect = {
  name: "Winter Magic",
  description: "Magical winter sparkles and frost effects",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/combo/thumbnails/winter-magic.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-01-15",
  category: "seasonal",
  tags: ["winter", "magic", "sparkles", "frost", "seasonal"],
  css: `
    .szfy-winter-magic {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-winter-snowflake {
      position: absolute;
      color: #fff;
      font-size: 1em;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
      animation: szfy-winter-fall linear infinite;
      opacity: 0.8;
    }
    
    .szfy-fireplace-glow {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      height: 150px;
      background: radial-gradient(ellipse at center, rgba(255, 165, 0, 0.3) 0%, rgba(255, 69, 0, 0.2) 50%, transparent 100%);
      pointer-events: none;
      z-index: 9998;
      animation: szfy-fireplace-flicker 3s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-winter-fall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes szfy-fireplace-flicker {
      0% { opacity: 0.3; transform: translateX(-50%) scale(1); }
      100% { opacity: 0.6; transform: translateX(-50%) scale(1.1); }
    }
  `,
  html: `
    <div class="szfy-winter-magic" id="szfy-winter-magic-container">
      <div class="szfy-fireplace-glow"></div>
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-winter-magic-container');
      if (!container) return;
      
      const snowflakes = ['❄', '❅', '❆', '•', '·'];
      const maxSnowflakes = 40;
      let currentSnowflakes = 0;
      
      function createSnowflake() {
        if (currentSnowflakes >= maxSnowflakes) return;
        
        const snowflake = document.createElement('div');
        snowflake.className = 'szfy-winter-snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 5;
        
        snowflake.style.left = startX + 'px';
        snowflake.style.fontSize = size + 'em';
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = delay + 's';
        
        container.appendChild(snowflake);
        currentSnowflakes++;
        
        // Remove snowflake after animation
        setTimeout(() => {
          if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
            currentSnowflakes--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create snowflakes periodically
      const createInterval = setInterval(createSnowflake, 250);
      
      // Cleanup function
      window.szfyWinterMagicCleanup = function() {
        clearInterval(createInterval);
        if (container) {
          container.innerHTML = '';
          currentSnowflakes = 0;
        }
      };
    })();
  `
};

const winterMagicAudio = {
  name: "Winter Magic Audio",
  description: "Crackling fireplace sounds",
  icon: "🔥",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/fireplace.mp3",
  loop: true,
  volume: 0.3
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(winterMagicEffect);
  window.SeazonifyController.injectAudioEffect(winterMagicAudio);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: winterMagicEffect, audio: winterMagicAudio };
} 
