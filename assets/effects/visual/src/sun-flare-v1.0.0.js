// Sun Flare Effect for Seazonify Controller
// Warm glowing particles that drift upwards, creating a summer heat shimmer effect
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(sunFlareEffect);

const sunFlareEffect = {
  name: "Sun Flare",
  description: "Warm summer sun flares with golden particles drifting upwards, creating a beautiful heat shimmer effect",
  icon: "☀️",
  type: "visual",
  author: "Md Mim Akhtar",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/sun-flare.webp",
  version: "1.0.0",
  license: "https://seazonify.com/license",
  created: "2026-01-18",
  category: "summer",
  tags: ["sun", "flare", "summer", "heat", "shimmer", "golden", "warm", "glowing", "particles", "atmospheric"],
  css: `
    .szfy-sun-flare-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-sun-flare {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      transform-origin: center;
      filter: blur(0.3px);
      will-change: transform;
    }
    
    .szfy-sun-flare::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, 
        rgba(255, 255, 200, 1) 0%, 
        rgba(255, 248, 180, 0.98) 15%, 
        rgba(255, 240, 160, 0.95) 30%, 
        rgba(255, 230, 140, 0.9) 45%, 
        rgba(255, 220, 120, 0.8) 60%, 
        rgba(255, 210, 100, 0.6) 75%, 
        rgba(255, 200, 80, 0.4) 85%, 
        rgba(255, 190, 60, 0.2) 95%, 
        transparent 100%);
      transform: translate(-50%, -50%);
      animation: szfy-sun-flare-glow 4s ease-in-out infinite;
      animation-delay: var(--glow-delay, 0s);
      filter: drop-shadow(0 0 4px rgba(255, 255, 200, 0.8));
    }
    
    .szfy-sun-flare::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300%;
      height: 300%;
      border-radius: 50%;
      background: radial-gradient(circle, 
        rgba(255, 255, 200, 0.4) 0%, 
        rgba(255, 248, 180, 0.3) 20%, 
        rgba(255, 240, 160, 0.25) 40%, 
        rgba(255, 230, 140, 0.2) 60%, 
        rgba(255, 220, 120, 0.15) 80%, 
        transparent 100%);
      transform: translate(-50%, -50%);
      animation: szfy-sun-flare-aura 4s ease-in-out infinite;
      animation-delay: var(--aura-delay, 0s);
    }
    
    .szfy-sun-flare.tiny {
      width: 2px;
      height: 2px;
    }
    
    .szfy-sun-flare.small {
      width: 3px;
      height: 3px;
    }
    
    .szfy-sun-flare.medium {
      width: 4px;
      height: 4px;
    }
    
    .szfy-sun-flare.large {
      width: 6px;
      height: 6px;
    }
    
    .szfy-sun-flare.flare {
      width: 8px;
      height: 8px;
      border-radius: 0;
      transform: rotate(45deg);
    }
    
    .szfy-sun-flare.giant {
      width: 10px;
      height: 10px;
    }
    
    .szfy-sun-flare.flare::before {
      border-radius: 0;
      background: linear-gradient(45deg, 
        rgba(255, 255, 200, 1) 0%, 
        rgba(255, 248, 180, 0.95) 25%, 
        rgba(255, 240, 160, 0.9) 50%, 
        rgba(255, 230, 140, 0.8) 75%, 
        transparent 100%);
    }
    
    .szfy-sun-flare.flare::after {
      border-radius: 0;
      background: linear-gradient(45deg, 
        rgba(255, 255, 200, 0.3) 0%, 
        rgba(255, 248, 180, 0.25) 50%, 
        transparent 100%);
    }
    
    @keyframes szfy-sun-flare-glow {
      0%, 100% {
        opacity: 0.5;
        transform: translate(-50%, -50%) scale(1);
        filter: drop-shadow(0 0 4px rgba(255, 255, 200, 0.8));
      }
      25% {
        opacity: 0.9;
        transform: translate(-50%, -50%) scale(1.3);
        filter: drop-shadow(0 0 8px rgba(255, 255, 200, 1));
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.5);
        filter: drop-shadow(0 0 12px rgba(255, 255, 200, 1));
      }
      75% {
        opacity: 0.7;
        transform: translate(-50%, -50%) scale(1.2);
        filter: drop-shadow(0 0 6px rgba(255, 255, 200, 0.9));
      }
    }
    
    @keyframes szfy-sun-flare-aura {
      0%, 100% {
        opacity: 0.2;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(1.6);
      }
    }
    

  `,
  html: `
    <div class="szfy-sun-flare-container" id="szfy-sun-flare-container">
      <!-- Sun flare particles will be dynamically created here -->
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-sun-flare-container');
      if (!container) return;
      
      // Configuration
      const maxFlares = 45;
      const flares = [];
      let animationId = null;
      let lastFlareTime = 0;
      
      // Sun flare class
      class SunFlare {
        constructor() {
          this.element = null;
          this.x = 0;
          this.y = 0;
          this.size = 'medium';
          this.life = 1.0;
          this.fadeSpeed = 0.006;
          this.driftX = 0;
          this.driftY = 0;
          this.rotation = 0;
          this.rotationSpeed = 0;
          this.flickerTimer = 0;
          this.flickerInterval = 0;
          this.init();
        }
        
        init() {
          // Create flare element
          this.element = document.createElement('div');
          this.element.className = 'szfy-sun-flare';
          
          // Random size with weighted distribution
          const sizes = ['tiny', 'small', 'medium', 'large', 'flare', 'giant'];
          const weights = [0.25, 0.3, 0.25, 0.15, 0.03, 0.02];
          this.size = this.weightedRandom(sizes, weights);
          this.element.classList.add(this.size);
          
          // Random starting position - start from bottom of screen
          this.x = Math.random() * window.innerWidth;
          this.y = window.innerHeight + 20 + Math.random() * 100;
          
          // Random rise speed for natural upward movement
          this.riseSpeed = Math.random() * 0.4 + 0.2; // 0.2 to 0.6
          
          // Random horizontal drift (gentle swaying)
          this.driftX = (Math.random() - 0.5) * 0.8; // Gentle horizontal drift
          
          // Random rotation for dynamic effect
          this.rotation = Math.random() * 360;
          this.rotationSpeed = (Math.random() - 0.5) * 2; // Moderate rotation
          
          // Random delay for staggered appearance
          const delay = Math.random() * 4; // 0-4 seconds delay
          
          // Add random glow animation delays for varied timing
          const glowDelay = Math.random() * 4; // 0-4 seconds random glow delay
          const auraDelay = Math.random() * 4; // 0-4 seconds random aura delay
          
          // Apply glow delays to pseudo-elements using CSS custom properties
          this.element.style.setProperty('--glow-delay', glowDelay + 's');
          this.element.style.setProperty('--aura-delay', auraDelay + 's');
          
          // Apply initial position
          this.updatePosition();
          
          // Add to container with delay
          setTimeout(() => {
            container.appendChild(this.element);
          }, delay * 1000);
        }
        
        weightedRandom(items, weights) {
          const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
          let random = Math.random() * totalWeight;
          
          for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
              return items[i];
            }
          }
          return items[items.length - 1];
        }
        
        updatePosition() {
          // Use translate3d for GPU acceleration and smoother movement
          let transform = \`translate3d(\${this.x.toFixed(1)}px, \${this.y.toFixed(1)}px, 0)\`;
          
          // Apply rotation for flare particles
          if (this.size === 'flare') {
            transform += \` rotate(\${this.rotation.toFixed(1)}deg)\`;
          }
          
          this.element.style.transform = transform;
        }
        
        update(deltaTime) {
          // Update position with gentle horizontal drift
          this.x += this.driftX * deltaTime * 0.01;
          
          // Update vertical position (move upward)
          this.y -= this.riseSpeed * deltaTime * 0.05;
          
          // Update rotation
          this.rotation += this.rotationSpeed * deltaTime * 0.01;
          
          // Apply position and rotation
          this.updatePosition();
          
          // Check if flare is off screen (risen above viewport)
          if (this.y < -50) {
            this.reset();
          }
          
          return true; // Keep alive
        }
        
        reset() {
          // Reset to bottom of screen for continuous rising effect
          this.y = window.innerHeight + 20 + Math.random() * 100;
          this.x = Math.random() * window.innerWidth;
          this.driftX = (Math.random() - 0.5) * 0.8;
          this.rotationSpeed = (Math.random() - 0.5) * 2;
          
          // New random delay for staggered appearance
          const delay = Math.random() * 4;
          
          // New random glow animation delays for varied timing
          const glowDelay = Math.random() * 4;
          const auraDelay = Math.random() * 4;
          this.element.style.setProperty('--glow-delay', glowDelay + 's');
          this.element.style.setProperty('--aura-delay', auraDelay + 's');
          
          // Reset position and wait for delay before reappearing
          this.updatePosition();
          
          // Hide element temporarily during delay
          this.element.style.opacity = '0';
          
          // Show element after delay
          setTimeout(() => {
            this.element.style.opacity = '1';
          }, delay * 1000);
        }
        
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
        }
      }
      
      // Create a new sun flare
      function createSunFlare() {
        if (flares.length < maxFlares) {
          const flare = new SunFlare();
          flares.push(flare);
        }
      }
      
      // Create initial flares
      function createInitialFlares() {
        const initialCount = Math.min(20, maxFlares);
        for (let i = 0; i < initialCount; i++) {
          setTimeout(() => {
            createSunFlare();
          }, i * 200); // Staggered creation
        }
      }
      
      // Animation loop
      function animate(currentTime) {
        const deltaTime = currentTime - (lastTime || currentTime);
        lastTime = currentTime;
        
        // Update all flares (mainly for drift and rotation)
        flares.forEach(flare => {
          flare.update(deltaTime);
        });
        
        // Create additional flares if needed
        if (flares.length < maxFlares) {
          createSunFlare();
        }
        
        animationId = requestAnimationFrame(animate);
      }
      
      // Handle window resize
      function handleResize() {
        // Update flare positions if needed
        flares.forEach(flare => {
          flare.updatePosition();
        });
      }
      
      // Handle visibility change
      function handleVisibilityChange() {
        if (document.hidden) {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        } else {
          if (!animationId) {
            animationId = requestAnimationFrame(animate);
          }
        }
      }
      
      // Initialize
      let lastTime = 0;
      createInitialFlares();
      animationId = requestAnimationFrame(animate);
      
      // Event listeners
      window.addEventListener('resize', handleResize);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Cleanup function
      window.szfySunFlareCleanup = function() {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        
        // Remove all flares
        flares.forEach(flare => {
          flare.destroy();
        });
        
        flares.length = 0;
        
        if (container) {
          container.innerHTML = '';
        }
        
        // Remove event listeners
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(sunFlareEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: sunFlareEffect };
}