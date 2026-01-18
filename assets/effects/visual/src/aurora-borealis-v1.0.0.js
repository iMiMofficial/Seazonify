// Aurora Borealis Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(auroraBorealisEffect);

const auroraBorealisEffect = {
  name: "Aurora Borealis",
  description: "Northern lights dancing across the sky with ethereal beauty. Perfect for creating a magical atmosphere.",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "🌌",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/aurora-borealis.webp",
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2026-01-18",
  category: "aurora",
  tags: ["aurora", "borealis", "northern", "lights", "ethereal", "dancing", "beautiful"],
  css: `
    .szfy-aurora-borealis {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-aurora-curve {
      position: absolute;
      width: 200px;
      height: 100px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(0, 255, 127, 0.6) 25%, 
        rgba(0, 255, 255, 0.8) 50%, 
        rgba(138, 43, 226, 0.6) 75%, 
        transparent 100%);
      border-radius: 50px;
      filter: blur(8px);
      animation: szfy-curve-dance ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-aurora-curve::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      width: 180px;
      height: 80px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(0, 255, 127, 0.4) 25%, 
        rgba(0, 255, 255, 0.6) 50%, 
        rgba(138, 43, 226, 0.4) 75%, 
        transparent 100%);
      border-radius: 40px;
      animation: szfy-curve-inner 8s ease-in-out infinite;
    }
    
    .szfy-aurora-curve:nth-child(2) {
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 0, 255, 0.6) 25%, 
        rgba(0, 191, 255, 0.8) 50%, 
        rgba(255, 20, 147, 0.6) 75%, 
        transparent 100%);
      animation-delay: -3s;
      animation-duration: 12s;
    }
    
    .szfy-aurora-curve:nth-child(3) {
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(50, 205, 50, 0.6) 25%, 
        rgba(255, 215, 0, 0.8) 50%, 
        rgba(255, 69, 0, 0.6) 75%, 
        transparent 100%);
      animation-delay: -6s;
      animation-duration: 15s;
    }
    
    @keyframes szfy-curve-dance {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0deg) scale(1);
        opacity: 0;
      }
      25% {
        opacity: 0.6;
        transform: translateY(-30px) translateX(20px) rotate(15deg) scale(1.1);
      }
      50% {
        opacity: 0.8;
        transform: translateY(-60px) translateX(40px) rotate(30deg) scale(1.2);
      }
      75% {
        opacity: 0.6;
        transform: translateY(-30px) translateX(60px) rotate(45deg) scale(1.1);
      }
    }
    
    @keyframes szfy-curve-inner {
      0%, 100% {
        opacity: 0.4;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.05);
      }
    }
    
    .szfy-aurora-wisp {
      position: absolute;
      width: 60px;
      height: 30px;
      background: radial-gradient(ellipse, 
        rgba(0, 255, 127, 0.7), 
        rgba(0, 255, 255, 0.5), 
        rgba(138, 43, 226, 0.3), 
        transparent);
      border-radius: 50%;
      filter: blur(4px);
      animation: szfy-wisp-float ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-aurora-wisp::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(ellipse, 
        rgba(0, 255, 255, 0.6), 
        rgba(138, 43, 226, 0.4), 
        transparent);
      border-radius: 50%;
      animation: szfy-wisp-shimmer 4s ease-in-out infinite;
    }
    
    .szfy-aurora-wisp:nth-child(2) {
      background: radial-gradient(ellipse, 
        rgba(255, 0, 255, 0.7), 
        rgba(0, 191, 255, 0.5), 
        rgba(255, 20, 147, 0.3), 
        transparent);
      animation-delay: -2s;
      animation-duration: 10s;
    }
    
    @keyframes szfy-wisp-float {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      25% {
        opacity: 0.7;
        transform: translateY(-20px) translateX(15px) scale(1.1);
      }
      50% {
        opacity: 1;
        transform: translateY(-40px) translateX(30px) scale(1.2);
      }
      75% {
        opacity: 0.7;
        transform: translateY(-20px) translateX(45px) scale(1.1);
      }
    }
    
    @keyframes szfy-wisp-shimmer {
      0%, 100% {
        opacity: 0.4;
        transform: scale(1);
      }
      50% {
        opacity: 0.6;
        transform: scale(1.1);
      }
    }
    
    .szfy-aurora-particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: radial-gradient(circle, 
        rgba(0, 255, 127, 0.9), 
        rgba(0, 255, 255, 0.7), 
        rgba(138, 43, 226, 0.5), 
        transparent);
      border-radius: 50%;
      animation: szfy-particle-sparkle ease-in-out infinite;
      opacity: 0;
    }
    
    .szfy-aurora-particle::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 20%;
      width: 60%;
      height: 60%;
      background: radial-gradient(circle, 
        rgba(0, 255, 255, 0.8), 
        rgba(138, 43, 226, 0.6), 
        transparent);
      border-radius: 50%;
      animation: szfy-particle-glow 2s ease-in-out infinite;
    }
    
    @keyframes szfy-particle-sparkle {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      25% {
        opacity: 0.9;
        transform: translateY(-15px) translateX(10px) scale(1.1);
      }
      50% {
        opacity: 1;
        transform: translateY(-30px) translateX(20px) scale(1.2);
      }
      75% {
        opacity: 0.9;
        transform: translateY(-15px) translateX(30px) scale(1.1);
      }
    }
    
    @keyframes szfy-particle-glow {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 0.9;
        transform: scale(1.2);
      }
    }
    
    .szfy-aurora-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, 
        rgba(0, 255, 127, 0.02) 0%, 
        rgba(0, 255, 255, 0.01) 40%, 
        transparent 70%);
      pointer-events: none;
      animation: szfy-aurora-shift 50s ease-in-out infinite;
    }
    
    @keyframes szfy-aurora-shift {
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
  html: '<div class="szfy-aurora-borealis" id="szfy-aurora-borealis-container"><div class="szfy-aurora-background"></div></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-aurora-borealis-container');
      if (!container) return;
      
      const maxAuroraCurves = 6;
      const maxAuroraWisps = 15;
      const maxAuroraParticles = 30;
      let currentAuroraCurves = 0;
      let currentAuroraWisps = 0;
      let currentAuroraParticles = 0;
      let curveInterval;
      let wispInterval;
      let particleInterval;
      
      function createAuroraCurve() {
        if (currentAuroraCurves >= maxAuroraCurves) return;
        
        const curve = document.createElement('div');
        curve.className = 'szfy-aurora-curve';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + 20;
        const width = Math.random() * 100 + 150; // 150-250px
        const height = Math.random() * 50 + 80; // 80-130px
        const duration = Math.random() * 4 + 8; // 8-12 seconds
        const delay = Math.random() * 3;
        
        curve.style.left = x + 'px';
        curve.style.top = y + 'px';
        curve.style.width = width + 'px';
        curve.style.height = height + 'px';
        curve.style.animationDuration = duration + 's';
        curve.style.animationDelay = delay + 's';
        
        container.appendChild(curve);
        currentAuroraCurves++;
        
        // Remove curve after animation
        setTimeout(() => {
          if (curve.parentNode) {
            curve.parentNode.removeChild(curve);
            currentAuroraCurves--;
          }
        }, (duration + delay) * 1000);
      }
      
      function createAuroraWisp() {
        if (currentAuroraWisps >= maxAuroraWisps) return;
        
        const wisp = document.createElement('div');
        wisp.className = 'szfy-aurora-wisp';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.7) + 30;
        const width = Math.random() * 30 + 50; // 50-80px
        const height = Math.random() * 20 + 25; // 25-45px
        const duration = Math.random() * 6 + 8; // 8-14 seconds
        const delay = Math.random() * 4;
        
        wisp.style.left = x + 'px';
        wisp.style.top = y + 'px';
        wisp.style.width = width + 'px';
        wisp.style.height = height + 'px';
        wisp.style.animationDuration = duration + 's';
        wisp.style.animationDelay = delay + 's';
        
        container.appendChild(wisp);
        currentAuroraWisps++;
        
        // Remove wisp after animation
        setTimeout(() => {
          if (wisp.parentNode) {
            wisp.parentNode.removeChild(wisp);
            currentAuroraWisps--;
          }
        }, (duration + delay) * 1000);
      }
      
      function createAuroraParticle() {
        if (currentAuroraParticles >= maxAuroraParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'szfy-aurora-particle';
        
        // Random position and timing
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + 40;
        const size = Math.random() * 2 + 2; // 2-4px
        const duration = Math.random() * 3 + 4; // 4-7 seconds
        const delay = Math.random() * 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
        currentAuroraParticles++;
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            currentAuroraParticles--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create aurora borealis elements periodically
      curveInterval = setInterval(createAuroraCurve, 3000 + Math.random() * 2000);
      wispInterval = setInterval(createAuroraWisp, 2000 + Math.random() * 1500);
      particleInterval = setInterval(createAuroraParticle, 1000 + Math.random() * 800);
      
      // Add some initial aurora borealis elements
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          setTimeout(createAuroraCurve, i * 1500);
        }
        for (let i = 0; i < 8; i++) {
          setTimeout(createAuroraWisp, i * 1000);
        }
        for (let i = 0; i < 15; i++) {
          setTimeout(createAuroraParticle, i * 600);
        }
      }, 500);
      
      // Cleanup function
      window.szfyAuroraBorealisCleanup = function() {
        clearInterval(curveInterval);
        clearInterval(wispInterval);
        clearInterval(particleInterval);
        if (container) {
          container.innerHTML = '';
          currentAuroraCurves = 0;
          currentAuroraWisps = 0;
          currentAuroraParticles = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(auroraBorealisEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = auroraBorealisEffect;
}