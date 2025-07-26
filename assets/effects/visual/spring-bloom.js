// Spring Bloom Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(springBloomEffect);

const springBloomEffect = {
  name: "Spring Bloom",
  description: "Flowers blooming and growing animation",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/spring-bloom.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-03-15",
  category: "seasonal",
  tags: ["spring", "bloom", "flowers", "growth", "seasonal"],
  css: `
    .szfy-spring-bloom {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-bloom-petal {
      position: absolute;
      font-size: 1.1em;
      animation: szfy-bloom-float linear infinite;
      opacity: 0.8;
      filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
    }
    
    .szfy-bloom-firefly {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
      animation: szfy-bloom-firefly-glow 2s ease-in-out infinite alternate;
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
    }
    
    .szfy-bloom-butterfly {
      position: absolute;
      font-size: 1.2em;
      animation: szfy-bloom-butterfly-fly linear infinite;
      opacity: 0.9;
    }
    
    @keyframes szfy-bloom-float {
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
    
    @keyframes szfy-bloom-firefly-glow {
      0% { opacity: 0.3; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1.2); }
    }
    
    .szfy-bloom-firefly {
      animation: szfy-bloom-firefly-float 8s linear infinite, szfy-bloom-firefly-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-bloom-firefly-float {
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
    
    @keyframes szfy-bloom-butterfly-fly {
      0% {
        transform: translateY(100vh) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.9;
      }
      50% {
        transform: translateY(50vh) translateX(100px) rotate(180deg);
      }
      90% {
        opacity: 0.9;
      }
      100% {
        transform: translateY(-20px) translateX(200px) rotate(360deg);
        opacity: 0;
      }
    }
  `,
  html: '<div class="szfy-spring-bloom" id="szfy-spring-bloom-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-spring-bloom-container');
      if (!container) return;
      
      const petals = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐'];
      const butterflies = ['🦋', '🦋'];
      const colors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB'];
      const maxPetals = 20;
      const maxFireflies = 12;
      const maxButterflies = 8;
      let currentPetals = 0;
      let currentFireflies = 0;
      let currentButterflies = 0;
      
      function createPetal() {
        if (currentPetals >= maxPetals) return;
        
        const petal = document.createElement('div');
        petal.className = 'szfy-bloom-petal';
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
        firefly.className = 'szfy-bloom-firefly';
        
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
      
      function createButterfly() {
        if (currentButterflies >= maxButterflies) return;
        
        const butterfly = document.createElement('div');
        butterfly.className = 'szfy-bloom-butterfly';
        butterfly.textContent = butterflies[Math.floor(Math.random() * butterflies.length)];
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 25 + 20;
        const delay = Math.random() * 15;
        
        butterfly.style.left = startX + 'px';
        butterfly.style.fontSize = size + 'em';
        butterfly.style.animationDuration = duration + 's';
        butterfly.style.animationDelay = delay + 's';
        
        container.appendChild(butterfly);
        currentButterflies++;
        
        // Remove butterfly after animation
        setTimeout(() => {
          if (butterfly.parentNode) {
            butterfly.parentNode.removeChild(butterfly);
            currentButterflies--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create elements periodically
      const petalInterval = setInterval(createPetal, 500);
      const fireflyInterval = setInterval(createFirefly, 700);
      const butterflyInterval = setInterval(createButterfly, 2000);
      
      // Cleanup function
      window.szfySpringBloomCleanup = function() {
        clearInterval(petalInterval);
        clearInterval(fireflyInterval);
        clearInterval(butterflyInterval);
        if (container) {
          container.innerHTML = '';
          currentPetals = 0;
          currentFireflies = 0;
          currentButterflies = 0;
        }
      };
    })();
  `
};

const springBloomAudio = {
  name: "Spring Bloom Audio",
  description: "Birds and nature ambience",
  icon: "🌲",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/forest-sounds.mp3",
  loop: true,
  volume: 0.25
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(springBloomEffect);
  window.SeazonifyController.injectAudioEffect(springBloomAudio);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: springBloomEffect, audio: springBloomAudio };
} 
