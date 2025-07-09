// Thunderstorm Combo Effect for Seazonify Controller
// Combines lightning visual with thunder audio
// Usage: SeazonifyController.injectVisualEffect(thunderstormVisual);
//        SeazonifyController.injectAudioEffect(thunderstormAudio);

const thunderstormVisual = {
  name: "Thunderstorm Visual",
  description: "Dramatic lightning effects with rain",
  icon: "⛈️",
  type: "visual",
  css: `
    .szfy-thunderstorm {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-lightning {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%);
      opacity: 0;
      animation: szfy-lightning-flash 0.5s ease-out;
      pointer-events: none;
    }
    
    .szfy-rain-drop {
      position: absolute;
      width: 2px;
      height: 20px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%);
      animation: szfy-rain-fall linear infinite;
      opacity: 0.7;
    }
    
    .szfy-cloud {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 60px;
      background: radial-gradient(ellipse at center, rgba(100, 100, 100, 0.8) 0%, rgba(50, 50, 50, 0.6) 70%, transparent 100%);
      border-radius: 50px;
      opacity: 0.8;
      animation: szfy-cloud-float 4s ease-in-out infinite;
    }
    
    @keyframes szfy-lightning-flash {
      0% { opacity: 0; }
      10% { opacity: 1; }
      20% { opacity: 0; }
      30% { opacity: 0.8; }
      40% { opacity: 0; }
      50% { opacity: 0.6; }
      100% { opacity: 0; }
    }
    
    @keyframes szfy-rain-fall {
      0% {
        transform: translateY(-20px) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 0.7;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(100vh) translateX(10px);
        opacity: 0;
      }
    }
    
    @keyframes szfy-cloud-float {
      0%, 100% { transform: translateX(-50%) translateY(0px); }
      50% { transform: translateX(-50%) translateY(-10px); }
    }
  `,
  html: `
    <div class="szfy-thunderstorm" id="szfy-thunderstorm-container">
      <div class="szfy-cloud"></div>
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-thunderstorm-container');
      if (!container) return;
      
      const maxRainDrops = 80;
      let currentRainDrops = 0;
      let lightningInterval;
      
      function createRainDrop() {
        if (currentRainDrops >= maxRainDrops) return;
        
        const drop = document.createElement('div');
        drop.className = 'szfy-rain-drop';
        
        // Random properties
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 2;
        
        drop.style.left = startX + 'px';
        drop.style.animationDuration = duration + 's';
        drop.style.animationDelay = delay + 's';
        
        container.appendChild(drop);
        currentRainDrops++;
        
        // Remove drop after animation
        setTimeout(() => {
          if (drop.parentNode) {
            drop.parentNode.removeChild(drop);
            currentRainDrops--;
          }
        }, (duration + delay) * 1000);
      }
      
      function createLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'szfy-lightning';
        container.appendChild(lightning);
        
        // Remove lightning after animation
        setTimeout(() => {
          if (lightning.parentNode) {
            lightning.parentNode.removeChild(lightning);
          }
        }, 500);
      }
      
      // Create rain drops periodically
      const rainInterval = setInterval(createRainDrop, 50);
      
      // Create lightning periodically (every 3-8 seconds)
      function startLightning() {
        lightningInterval = setInterval(() => {
          createLightning();
        }, Math.random() * 5000 + 3000);
      }
      startLightning();
      
      // Cleanup function
      window.szfyThunderstormCleanup = function() {
        clearInterval(rainInterval);
        clearInterval(lightningInterval);
        if (container) {
          container.innerHTML = '<div class="szfy-cloud"></div>';
          currentRainDrops = 0;
        }
      };
    })();
  `
};

const thunderstormAudio = {
  name: "Thunderstorm Audio",
  description: "Dramatic thunder and rain sounds",
  icon: "⛈️",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/thunder.mp3",
  loop: true,
  volume: 0.4
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(thunderstormVisual);
  window.SeazonifyController.injectAudioEffect(thunderstormAudio);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: thunderstormVisual, audio: thunderstormAudio };
} 