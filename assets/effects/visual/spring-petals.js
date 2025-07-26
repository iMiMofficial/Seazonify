// Spring Petals Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(springPetalsEffect);

const springPetalsEffect = {
  name: "Spring Petals",
  description: "Floating flower petals and fireflies",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/spring-petals.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-01-15",
  category: "seasonal",
  tags: ["spring", "petals", "flowers", "fireflies", "seasonal"],
  css: `
    .szfy-spring-petals {
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
      font-size: 1.1em;
      animation: szfy-petal-float linear infinite;
      opacity: 0.8;
      filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
    }
    
    .szfy-firefly {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
      animation: szfy-firefly-glow 2s ease-in-out infinite alternate;
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
    }
    
    @keyframes szfy-petal-float {
      0% {
        transform: translateY(100vh) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      50% {
        transform: translateY(50vh) translateX(50px) rotate(180deg);
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-20px) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes szfy-firefly-glow {
      0% { opacity: 0.3; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); }
    }
    
    .szfy-firefly {
      animation: szfy-firefly-float 8s linear infinite, szfy-firefly-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-firefly-float {
      0% {
        transform: translateY(100vh) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-20px) translateX(200px);
        opacity: 0;
      }
    }
  `,
  html: '<div class="szfy-spring-petals" id="szfy-spring-petals-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-spring-petals-container');
      if (!container) return;
      
      const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐'];
      const colors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'];
      const maxPetals = 25;
      const maxFireflies = 15;
      let currentPetals = 0;
      let currentFireflies = 0;
      
      function createPetal() {
        if (currentPetals >= maxPetals) return;
        
        const petal = document.createElement('div');
        petal.className = 'szfy-petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.3 + 0.7;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.left = startX + 'px';
        petal.style.fontSize = size + 'em';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';
        petal.style.color = color;
        
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
      
      function createFirefly() {
        if (currentFireflies >= maxFireflies) return;
        
        const firefly = document.createElement('div');
        firefly.className = 'szfy-firefly';
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;
        
        firefly.style.left = startX + 'px';
        firefly.style.animationDuration = duration + 's';
        firefly.style.animationDelay = delay + 's';
        
        container.appendChild(firefly);
        currentFireflies++;
        
        // Remove firefly after animation
        setTimeout(() => {
          if (firefly.parentNode) {
            firefly.parentNode.removeChild(firefly);
            currentFireflies--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create petals and fireflies periodically
      const petalInterval = setInterval(createPetal, 400);
      const fireflyInterval = setInterval(createFirefly, 600);
      
      // Cleanup function
      window.szfySpringPetalsCleanup = function() {
        clearInterval(petalInterval);
        clearInterval(fireflyInterval);
        if (container) {
          container.innerHTML = '';
          currentPetals = 0;
          currentFireflies = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(springPetalsEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = springPetalsEffect;
} 
