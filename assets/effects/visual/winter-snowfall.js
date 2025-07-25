// Winter Snowfall Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(winterSnowfallEffect);

const winterSnowfallEffect = {
  name: "Winter Snowfall",
  description: "Gentle snowflakes falling across the screen",
  author: "Seazonify",
  type: "visual",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/winter-snowfall.webp",
  version: "1.0.0",
  created: "2024-01-15",
  category: "winter",
  tags: ["winter", "snow", "seasonal", "gentle"],
  css: `
    .szfy-snowfall {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-snowflake {
      position: absolute;
      color: #fff;
      font-size: 1em;
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
      animation: szfy-fall linear infinite;
      opacity: 0.8;
    }
    
    @keyframes szfy-fall {
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
  `,
  html: '<div class="szfy-snowfall" id="szfy-snowfall-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-snowfall-container');
      if (!container) return;
      
      const snowflakes = ['❄', '❅', '❆', '•', '·'];
      const maxSnowflakes = 50;
      let currentSnowflakes = 0;
      
      function createSnowflake() {
        if (currentSnowflakes >= maxSnowflakes) return;
        
        const snowflake = document.createElement('div');
        snowflake.className = 'szfy-snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 10 + 10;
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
      const createInterval = setInterval(createSnowflake, 200);
      
      // Cleanup function
      window.szfySnowfallCleanup = function() {
        clearInterval(createInterval);
        if (container) {
          container.innerHTML = '';
          currentSnowflakes = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(winterSnowfallEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = winterSnowfallEffect;
} 
