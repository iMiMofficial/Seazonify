// Cherry Blossom Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(cherryBlossomEffect);

const cherryBlossomEffect = {
  name: "Cherry Blossom",
  description: "Gentle falling cherry blossom petals for a peaceful spring atmosphere",
  author: "Seazonify Team",
  type: "visual",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/cherry-blossoms.webp",
  version: "1.0.0",
  created: "2024-03-15",
  category: "seasonal",
  tags: ["cherry", "blossom", "spring", "peaceful", "gentle"],
  css: `
    .szfy-cherry-blossom {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-petal {
      position: absolute;
      font-size: 1.2em;
      animation: szfy-petal-fall linear infinite;
      opacity: 0.8;
      filter: drop-shadow(0 1px 3px rgba(255, 182, 193, 0.3));
    }
    
    .szfy-petal.small {
      font-size: 0.8em;
      opacity: 0.6;
    }
    
    .szfy-petal.large {
      font-size: 1.5em;
      opacity: 0.9;
    }
    
    @keyframes szfy-petal-fall {
      0% {
        transform: translateY(-20px) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      50% {
        transform: translateY(50vh) translateX(30px) rotate(180deg);
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(100vh) translateX(60px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .szfy-petal.swing {
      animation: szfy-petal-fall, szfy-petal-swing 2s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-petal-swing {
      0% { transform: translateX(-15px) rotate(-5deg); }
      100% { transform: translateX(15px) rotate(5deg); }
    }
    
    .szfy-petal.spin {
      animation: szfy-petal-fall, szfy-petal-spin 3s linear infinite;
    }
    
    @keyframes szfy-petal-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
  html: '<div class="szfy-cherry-blossom" id="szfy-cherry-blossom-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-cherry-blossom-container');
      if (!container) return;
      
      const petals = ['🌸', '🌸', '🌸'];
      const maxPetals = 30;
      let currentPetals = 0;
      
      function createPetal() {
        if (currentPetals >= maxPetals) return;
        
        const petal = document.createElement('div');
        petal.className = 'szfy-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        
        // Random properties
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 12 + 8;
        const delay = Math.random() * 5;
        
        // Add size classes
        if (size < 1.0) {
          petal.classList.add('small');
        } else if (size > 1.3) {
          petal.classList.add('large');
        }
        
        // Add movement variations
        if (Math.random() > 0.6) {
          petal.classList.add('swing');
        } else if (Math.random() > 0.8) {
          petal.classList.add('spin');
        }
        
        petal.style.left = startX + 'px';
        petal.style.fontSize = size + 'em';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';
        
        container.appendChild(petal);
        currentPetals++;
        
        // Remove petal after animation
        setTimeout(() => {
          if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
            currentPetals--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create petals periodically
      const petalInterval = setInterval(createPetal, 400);
      
      // Cleanup function
      window.szfyCherryBlossomCleanup = function() {
        clearInterval(petalInterval);
        if (container) {
          container.innerHTML = '';
          currentPetals = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(cherryBlossomEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cherryBlossomEffect;
} 
