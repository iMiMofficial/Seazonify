// Volcanic Ash Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(volcanicAshEffect);

const volcanicAshEffect = {
  name: "Volcanic Ash",
  description: "Ash particles floating and drifting through volcanic atmosphere",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "🌋",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/volcanic-ash.webp",
  version: "1.0.1",
  license: "https://seazonify.com/license",
  created: "2025-10-14",
  category: "volcanic",
  tags: ["volcanic", "ash", "particles", "drifting", "atmospheric"],
  css: `
    .szfy-volcanic-ash {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-ash-particle {
      position: absolute;
      background: radial-gradient(circle, 
        rgba(64, 64, 64, 0.8), 
        rgba(128, 128, 128, 0.6), 
        rgba(192, 192, 192, 0.4), 
        transparent);
      border-radius: 50%;
      animation: szfy-ash-drift ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-ash-particle::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, 
        rgba(96, 96, 96, 0.7), 
        rgba(128, 128, 128, 0.5), 
        transparent);
      border-radius: 50%;
      animation: szfy-ash-shimmer 3s ease-in-out infinite;
    }
    
    @keyframes szfy-ash-drift {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      25% {
        opacity: 0.8;
        transform: translateY(-30px) translateX(20px) rotate(45deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-60px) translateX(40px) rotate(90deg);
      }
      75% {
        opacity: 0.8;
        transform: translateY(-90px) translateX(60px) rotate(135deg);
      }
    }
    
    @keyframes szfy-ash-shimmer {
      0%, 100% {
        opacity: 0.5;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.1);
      }
    }
    
    .szfy-ash-cloud {
      position: absolute;
      width: 120px;
      height: 80px;
      background: radial-gradient(ellipse, 
        rgba(64, 64, 64, 0.4), 
        rgba(128, 128, 128, 0.3), 
        rgba(192, 192, 192, 0.2), 
        transparent);
      border-radius: 50%;
      filter: blur(8px);
      animation: szfy-cloud-float ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-ash-cloud::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      width: 80px;
      height: 40px;
      background: radial-gradient(ellipse, 
        rgba(96, 96, 96, 0.3), 
        rgba(128, 128, 128, 0.2), 
        transparent);
      border-radius: 50%;
      animation: szfy-cloud-inner 5s ease-in-out infinite;
    }
    
    @keyframes szfy-cloud-float {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      25% {
        opacity: 0.4;
        transform: translateY(-20px) translateX(15px) scale(1.1);
      }
      50% {
        opacity: 0.6;
        transform: translateY(-40px) translateX(30px) scale(1.2);
      }
      75% {
        opacity: 0.4;
        transform: translateY(-60px) translateX(45px) scale(1.1);
      }
    }
    
    @keyframes szfy-cloud-inner {
      0%, 100% {
        opacity: 0.2;
        transform: scale(1);
      }
      50% {
        opacity: 0.3;
        transform: scale(1.05);
      }
    }
    
    .szfy-ash-ember {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, 
        rgba(255, 69, 0, 0.9), 
        rgba(255, 140, 0, 0.7), 
        rgba(255, 165, 0, 0.5), 
        transparent);
      border-radius: 50%;
      animation: szfy-ember-glow ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-ash-ember::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, 
        rgba(255, 255, 255, 0.8), 
        rgba(255, 69, 0, 0.6), 
        transparent);
      border-radius: 50%;
      animation: szfy-ember-sparkle 2s ease-in-out infinite;
    }
    
    @keyframes szfy-ember-glow {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      25% {
        opacity: 0.9;
        transform: translateY(-25px) translateX(15px) scale(1.1);
      }
      50% {
        opacity: 1;
        transform: translateY(-50px) translateX(30px) scale(1.2);
      }
      75% {
        opacity: 0.9;
        transform: translateY(-75px) translateX(45px) scale(1.1);
      }
    }
    
    @keyframes szfy-ember-sparkle {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
    }
    
    .szfy-volcanic-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, 
        rgba(64, 64, 64, 0.03) 0%, 
        rgba(128, 128, 128, 0.02) 40%, 
        transparent 70%);
      pointer-events: none;
      animation: szfy-volcanic-shift 40s ease-in-out infinite;
    }
    
    @keyframes szfy-volcanic-shift {
      0%, 100% {
        opacity: 1;
        transform: translateX(0) translateY(0);
      }
      50% {
        opacity: 1.1;
        transform: translateX(-5px) translateY(-3px);
      }
    }
  `,
  html: '<div class="szfy-volcanic-ash" id="szfy-volcanic-ash-container"><div class="szfy-volcanic-background"></div></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-volcanic-ash-container');
      if (!container) return;
      
      const maxAshParticles = 100;
      const maxAshClouds = 8;
      const maxAshEmbers = 25;
      let currentAshParticles = 0;
      let currentAshClouds = 0;
      let currentAshEmbers = 0;
      let particleInterval;
      let cloudInterval;
      let emberInterval;
      
      function createAshParticle() {
        if (currentAshParticles >= maxAshParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'szfy-ash-particle';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.7) + 30;
        const size = Math.random() * 4 + 3; // 3-7px
        const duration = Math.random() * 4 + 6; // 6-10 seconds
        const delay = Math.random() * 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        currentAshParticles++;
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            currentAshParticles--;
          }
        }, (duration + delay) * 1000);
      }
      
      function createAshCloud() {
        if (currentAshClouds >= maxAshClouds) return;
        
        const cloud = document.createElement('div');
        cloud.className = 'szfy-ash-cloud';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + 40;
        const width = Math.random() * 60 + 80; // 80-140px
        const height = Math.random() * 40 + 60; // 60-100px
        const duration = Math.random() * 5 + 8; // 8-13 seconds
        const delay = Math.random() * 3;
        
        cloud.style.left = x + 'px';
        cloud.style.top = y + 'px';
        cloud.style.width = width + 'px';
        cloud.style.height = height + 'px';
        cloud.style.animationDuration = duration + 's';
        cloud.style.animationDelay = delay + 's';
        
        container.appendChild(cloud);
        currentAshClouds++;
        
        // Remove cloud after animation
        setTimeout(() => {
          if (cloud.parentNode) {
            cloud.parentNode.removeChild(cloud);
            currentAshClouds--;
          }
        }, (duration + delay) * 1000);
      }
      
      function createAshEmber() {
        if (currentAshEmbers >= maxAshEmbers) return;
        
        const ember = document.createElement('div');
        ember.className = 'szfy-ash-ember';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + 40;
        const size = Math.random() * 4 + 4; // 4-8px
        const duration = Math.random() * 3 + 4; // 4-7 seconds
        const delay = Math.random() * 2;
        
        ember.style.left = x + 'px';
        ember.style.top = y + 'px';
        ember.style.width = size + 'px';
        ember.style.height = size + 'px';
        ember.style.animationDuration = duration + 's';
        ember.style.animationDelay = delay + 's';
        
        container.appendChild(ember);
        currentAshEmbers++;
        
        // Remove ember after animation
        setTimeout(() => {
          if (ember.parentNode) {
            ember.parentNode.removeChild(ember);
            currentAshEmbers--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create volcanic ash elements periodically
      particleInterval = setInterval(createAshParticle, 200 + Math.random() * 150);
      cloudInterval = setInterval(createAshCloud, 3000 + Math.random() * 2000);
      emberInterval = setInterval(createAshEmber, 1000 + Math.random() * 800);
      
      // Add some initial volcanic ash elements
      setTimeout(() => {
        for (let i = 0; i < 50; i++) {
          setTimeout(createAshParticle, i * 150);
        }
        for (let i = 0; i < 4; i++) {
          setTimeout(createAshCloud, i * 1500);
        }
        for (let i = 0; i < 12; i++) {
          setTimeout(createAshEmber, i * 600);
        }
      }, 500);
      
      // Cleanup function
      window.szfyVolcanicAshCleanup = function() {
        clearInterval(particleInterval);
        clearInterval(cloudInterval);
        clearInterval(emberInterval);
        if (container) {
          container.innerHTML = '';
          currentAshParticles = 0;
          currentAshClouds = 0;
          currentAshEmbers = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(volcanicAshEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = volcanicAshEffect;
}