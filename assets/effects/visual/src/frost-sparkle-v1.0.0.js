// Frost Sparkle Effect for Seazonify Controller
// Tiny icy sparkles that appear randomly across the screen, creating a frozen/glittery look
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(frostSparkleEffect);

const frostSparkleEffect = {
  name: "Frost Sparkle",
  description: "Magical frost sparkles that randomly appear across the screen, creating a frozen, glittery winter atmosphere",
  icon: "❄️",
  type: "visual",
  author: "Md Mim Akhtar",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/frost-sparkle.webp",
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2026-01-18",
  category: "winter",
  tags: ["frost", "sparkles", "ice", "winter", "glitter", "crystalline", "frozen", "magical", "atmospheric", "sparkle"],
  css: `
    .szfy-frost-sparkle-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-frost-sparkle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      transform-origin: center;
      filter: blur(0.2px);
      animation: szfy-frost-sparkle-fall linear infinite;
    }
    
    .szfy-frost-sparkle::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(circle, 
        rgba(255, 255, 255, 1) 0%, 
        rgba(240, 248, 255, 0.98) 10%, 
        rgba(220, 240, 255, 0.95) 25%, 
        rgba(200, 230, 255, 0.9) 40%, 
        rgba(180, 220, 255, 0.8) 55%, 
        rgba(160, 210, 255, 0.6) 70%, 
        rgba(140, 200, 255, 0.4) 80%, 
        rgba(120, 190, 255, 0.2) 90%, 
        transparent 100%);
      transform: translate(-50%, -50%);
      animation: szfy-frost-sparkle-glow 3s ease-in-out infinite;
      animation-delay: var(--glow-delay, 0s);
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8)); // Added glow shadow
    }
    
    .szfy-frost-sparkle::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 250%; // Increased from 200% to 250% for more dramatic aura
      height: 250%;
      border-radius: 50%;
      background: radial-gradient(circle, 
        rgba(255, 255, 255, 0.3) 0%, 
        rgba(240, 248, 255, 0.25) 15%, 
        rgba(220, 240, 255, 0.2) 30%, 
        rgba(200, 230, 255, 0.15) 45%, 
        rgba(180, 220, 255, 0.1) 60%, 
        rgba(160, 210, 255, 0.05) 75%, 
        transparent 100%);
      transform: translate(-50%, -50%);
      animation: szfy-frost-sparkle-aura 3s ease-in-out infinite;
      animation-delay: var(--aura-delay, 0s);
    }
    
    .szfy-frost-sparkle.tiny {
      width: 1px;
      height: 1px;
    }
    
    .szfy-frost-sparkle.small {
      width: 2px;
      height: 2px;
    }
    
    .szfy-frost-sparkle.medium {
      width: 3px;
      height: 3px;
    }
    
    .szfy-frost-sparkle.large {
      width: 4px;
      height: 4px;
    }
    
    .szfy-frost-sparkle.crystal {
      width: 5px;
      height: 5px;
      border-radius: 0;
      transform: rotate(45deg);
    }
    
    .szfy-frost-sparkle.giant {
      width: 6px;
      height: 6px;
    }
    
    .szfy-frost-sparkle.crystal::before {
      border-radius: 0;
      background: linear-gradient(45deg, 
        rgba(255, 255, 255, 1) 0%, 
        rgba(240, 248, 255, 0.95) 25%, 
        rgba(220, 240, 255, 0.9) 50%, 
        rgba(200, 230, 255, 0.8) 75%, 
        transparent 100%);
    }
    
    .szfy-frost-sparkle.crystal::after {
      border-radius: 0;
      background: linear-gradient(45deg, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(240, 248, 255, 0.15) 50%, 
        transparent 100%);
    }
    
    @keyframes szfy-frost-sparkle-glow {
      0%, 100% {
        opacity: 0.4;
        transform: translate(-50%, -50%) scale(1);
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
      }
      25% {
        opacity: 0.9;
        transform: translate(-50%, -50%) scale(1.4);
        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 1));
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.6);
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1));
      }
      75% {
        opacity: 0.7;
        transform: translate(-50%, -50%) scale(1.3);
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9));
      }
    }
    
    @keyframes szfy-frost-sparkle-aura {
      0%, 100% {
        opacity: 0.1;
        transform: translate(-50%, -50%) scale(1);
      }
      50% {
        opacity: 0.3;
        transform: translate(-50%, -50%) scale(1.5);
      }
    }
    
    @keyframes szfy-frost-sparkle-flicker {
      0%, 100% {
        opacity: 1;
      }
      20% {
        opacity: 0.3;
      }
      40% {
        opacity: 0.8;
      }
      60% {
        opacity: 0.4;
      }
      80% {
        opacity: 0.9;
      }
    }
    
    @keyframes szfy-frost-sparkle-fall {
      0% {
        transform: translateY(-20px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `,
  html: `
    <div class="szfy-frost-sparkle-container" id="szfy-frost-sparkle-container">
      <!-- Frost sparkles will be dynamically created here -->
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-frost-sparkle-container');
      if (!container) return;
      
      // Configuration
      const maxSparkles = 60; // Increased from 40 for more density
      const sparkles = [];
      let animationId = null;
      let lastSparkleTime = 0;
      
      // Frost sparkle class
      class FrostSparkle {
        constructor() {
          this.element = null;
          this.x = 0;
          this.y = 0;
          this.size = 'medium';
          this.life = 1.0;
          this.fadeSpeed = 0.008; // Slower fade for longer-lasting crystals
          this.driftX = 0;
          this.driftY = 0;
          this.rotation = 0;
          this.rotationSpeed = 0;
          this.flickerTimer = 0;
          this.flickerInterval = 0;
          this.init();
        }
        
        init() {
          // Create sparkle element
          this.element = document.createElement('div');
          this.element.className = 'szfy-frost-sparkle';
          
          // Random size with weighted distribution - favoring smaller, realistic crystals
          const sizes = ['small', 'medium', 'large', 'crystal', 'giant'];
          const weights = [0.3, 0.3, 0.2, 0.15, 0.05]; // More small/medium, fewer large
          this.size = this.weightedRandom(sizes, weights);
          this.element.classList.add(this.size);
          
          // Random starting position - start from top of screen
          this.x = Math.random() * window.innerWidth;
          this.y = -20 - Math.random() * 100; // Start above screen
          
          // Random fall speed for natural movement
          this.fallSpeed = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
          
          // Random horizontal drift (very subtle)
          this.driftX = (Math.random() - 0.5) * 0.3; // Very gentle horizontal drift
          
          // Random rotation for crystal effect
          this.rotation = Math.random() * 360;
          this.rotationSpeed = (Math.random() - 0.5) * 1; // Slower rotation
          
          // Random animation duration for varied fall speeds
          const fallDuration = 8 + Math.random() * 6; // 8-14 seconds
          this.element.style.animationDuration = fallDuration + 's';
          
          // Random delay for staggered appearance
          const delay = Math.random() * 3; // 0-3 seconds delay
          this.element.style.animationDelay = delay + 's';
          
          // Add random glow animation delays for varied timing
          const glowDelay = Math.random() * 3; // 0-3 seconds random glow delay
          const auraDelay = Math.random() * 3; // 0-3 seconds random aura delay
          
          // Apply glow delays to pseudo-elements using CSS custom properties
          this.element.style.setProperty('--glow-delay', glowDelay + 's');
          this.element.style.setProperty('--aura-delay', auraDelay + 's');
          
          // Apply initial position
          this.updatePosition();
          
          // Add to container
          container.appendChild(this.element);
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
          this.element.style.left = this.x + 'px';
          this.element.style.top = this.y + 'px';
          
          // Apply rotation for crystal sparkles
          if (this.size === 'crystal') {
            this.element.style.transform = \`rotate(\${this.rotation}deg)\`;
          }
        }
        
        update(deltaTime) {
          // Update position with very subtle horizontal drift
          this.x += this.driftX * deltaTime * 0.01;
          
          // Update rotation
          this.rotation += this.rotationSpeed * deltaTime * 0.01;
          
          // Apply position and rotation
          this.updatePosition();
          
          // Check if sparkle is off screen (fallen below viewport)
          if (this.y > window.innerHeight + 50) {
            this.reset();
          }
          
          return true; // Keep alive
        }
        
        reset() {
          // Reset to top of screen for continuous falling effect
          this.y = -20 - Math.random() * 100;
          this.x = Math.random() * window.innerWidth;
          this.driftX = (Math.random() - 0.5) * 0.3;
          this.rotationSpeed = (Math.random() - 0.5) * 1;
          
          // New random animation duration and delay
          const fallDuration = 8 + Math.random() * 6;
          const delay = Math.random() * 3;
          this.element.style.animationDuration = fallDuration + 's';
          this.element.style.animationDelay = delay + 's';
          
          // New random glow animation delays for varied timing
          const glowDelay = Math.random() * 3;
          const auraDelay = Math.random() * 3;
          this.element.style.setProperty('--glow-delay', glowDelay + 's');
          this.element.style.setProperty('--aura-delay', auraDelay + 's');
          
          this.updatePosition();
        }
        
        destroy() {
          if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
          }
        }
      }
      
      // Create a new frost sparkle
      function createFrostSparkle() {
        if (sparkles.length < maxSparkles) {
          const sparkle = new FrostSparkle();
          sparkles.push(sparkle);
        }
      }
      
      // Create initial sparkles
      function createInitialSparkles() {
        const initialCount = Math.min(25, maxSparkles); // Reduced for better performance
        for (let i = 0; i < initialCount; i++) {
          setTimeout(() => {
            createFrostSparkle();
          }, i * 200); // Staggered creation
        }
      }
      
      // Animation loop
      function animate(currentTime) {
        const deltaTime = currentTime - (lastTime || currentTime);
        lastTime = currentTime;
        
        // Update all sparkles (mainly for drift and rotation)
        sparkles.forEach(sparkle => {
          sparkle.update(deltaTime);
        });
        
        // Create additional sparkles if needed
        if (sparkles.length < maxSparkles) {
          createFrostSparkle();
        }
        
        animationId = requestAnimationFrame(animate);
      }
      
      // Handle window resize
      function handleResize() {
        // Update sparkle positions if needed
        sparkles.forEach(sparkle => {
          sparkle.updatePosition();
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
      createInitialSparkles();
      animationId = requestAnimationFrame(animate);
      
      // Event listeners
      window.addEventListener('resize', handleResize);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Cleanup function
      window.szfyFrostSparkleCleanup = function() {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        
        // Remove all sparkles
        sparkles.forEach(sparkle => {
          sparkle.destroy();
        });
        
        sparkles.length = 0;
        
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
  window.SeazonifyController.injectVisualEffect(frostSparkleEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: frostSparkleEffect };
}