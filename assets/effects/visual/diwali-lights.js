// Diwali Lights Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(diwaliLightsEffect);

const diwaliLightsEffect = {
  name: "Diwali Diyas",
  description: "Traditional diyas at the bottom and glowing fireflies at the top for authentic Diwali celebration",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/diwali-lights.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-11-15",
  category: "cultural",
  tags: ["diwali", "diyas", "fireflies", "cultural", "festival"],
  css: `
    .szfy-diwali-diyas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-diya {
      position: absolute;
      font-size: 1.8em;
      animation: szfy-diya-glow 2s ease-in-out infinite alternate;
      opacity: 0.9;
      filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    }
    
    .szfy-firefly {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #FFD700;
      border-radius: 50%;
      animation: szfy-firefly-glow 1.5s ease-in-out infinite alternate;
      box-shadow: 0 0 8px #FFD700, 0 0 16px #FFD700, 0 0 24px #FFD700;
    }
    
    @keyframes szfy-diya-glow {
      0% {
        opacity: 0.7;
        filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
      }
      100% {
        opacity: 1;
        filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1));
      }
    }
    
    @keyframes szfy-firefly-glow {
      0% {
        opacity: 0.4;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1.2);
      }
    }
    
    /* Diya flame effect */
    .szfy-diya::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 12px;
      background: linear-gradient(to top, #FFD700, #FFA500, #FF4500);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      animation: szfy-flame-flicker 1.2s ease-in-out infinite alternate;
      box-shadow: 0 0 15px #FFD700, 0 0 30px #FFA500;
    }
    
    @keyframes szfy-flame-flicker {
      0% {
        transform: translateX(-50%) scale(1) rotate(-3deg);
        opacity: 0.8;
      }
      100% {
        transform: translateX(-50%) scale(1.2) rotate(3deg);
        opacity: 1;
      }
    }
  `,
  html: '<div class="szfy-diwali-diyas" id="szfy-diwali-diyas-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-diwali-diyas-container');
      if (!container) return;
      
      const diyas = ['🪔'];
      const maxFireflies = 15;
      let currentFireflies = 0;
      
      function createDiyasRow() {
        // Clear any existing diyas
        const existingDiyas = container.querySelectorAll('.szfy-diya');
        existingDiyas.forEach(diya => diya.remove());
        
        // Calculate spacing for diyas across the bottom
        const diyaCount = Math.floor(window.innerWidth / 60); // One diya every 60px
        const spacing = window.innerWidth / (diyaCount + 1);
        const bottomY = window.innerHeight - 40; // 40px from bottom
        
        // Create diyas in a single row at the bottom
        for (let i = 1; i <= diyaCount; i++) {
          const diya = document.createElement('div');
          diya.className = 'szfy-diya';
          diya.textContent = diyas[0];
          
          const x = spacing * i;
          const size = 0.8 + Math.random() * 0.4; // Slight size variation
          
          diya.style.left = x + 'px';
          diya.style.top = bottomY + 'px';
          diya.style.fontSize = size + 'em';
          diya.style.position = 'absolute';
          
          container.appendChild(diya);
        }
      }
      
      function createFirefly() {
        if (currentFireflies >= maxFireflies) return;
        
        const firefly = document.createElement('div');
        firefly.className = 'szfy-firefly';
        
        // Position fireflies only in top 10% of viewport
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.1);
        
        firefly.style.left = startX + 'px';
        firefly.style.top = startY + 'px';
        
        container.appendChild(firefly);
        currentFireflies++;
        
        // Remove firefly after some time and create new one
        setTimeout(() => {
          if (firefly.parentNode) {
            firefly.parentNode.removeChild(firefly);
            currentFireflies--;
          }
        }, 8000 + Math.random() * 4000);
      }
      
      // Create initial diyas row
      createDiyasRow();
      
      // Create fireflies periodically in the top area
      const fireflyInterval = setInterval(createFirefly, 800);
      
      // Recreate diyas row when window resizes
      window.addEventListener('resize', () => {
        setTimeout(createDiyasRow, 100);
      });
      
      // Cleanup function
      window.szfyDiwaliDiyasCleanup = function() {
        clearInterval(fireflyInterval);
        if (container) {
          container.innerHTML = '';
          currentFireflies = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(diwaliLightsEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = diwaliLightsEffect;
} 
