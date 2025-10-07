// Fireflies Effect for Seazonify Controller
// Soft glowing particles that drift slowly with random flickers
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(firefliesEffect);

const firefliesEffect = {
    name: "Fireflies Classic",
    description: "Classic magical fireflies with enhanced soft glowing particles, natural flight patterns, and realistic flickering that creates an enchanting night atmosphere",
    icon: "✨",
    type: "visual",
    author: "Seazonify",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/fireflies-classic.webp",
    version: "1.0.0",
    created: "2025-10-07",
    updated: "2025-10-07",
    category: "nature",
    tags: ["fireflies", "classic", "glow", "particles", "magical", "atmospheric", "soft", "flicker", "drift", "enchanting", "night", "natural", "enhanced"],
    css: `
      .szfy-fireflies {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
      }
      
      .szfy-firefly {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        animation: szfy-firefly-drift linear infinite;
      }
      
      .szfy-firefly::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 120%;
        height: 120%;
        border-radius: 50%;
        background: radial-gradient(circle, 
          rgba(255, 255, 180, 1) 0%, 
          rgba(255, 255, 140, 0.8) 25%, 
          rgba(255, 255, 100, 0.6) 50%, 
          rgba(255, 255, 60, 0.4) 75%, 
          rgba(255, 255, 20, 0.2) 90%,
          transparent 100%);
        transform: translate(-50%, -50%);
        animation: szfy-firefly-glow 2.5s ease-in-out infinite;
        filter: blur(0.5px);
      }
      
      .szfy-firefly::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        border-radius: 50%;
        background: radial-gradient(circle, 
          rgba(255, 255, 180, 0.15) 0%, 
          rgba(255, 255, 140, 0.08) 30%, 
          rgba(255, 255, 100, 0.04) 60%, 
          transparent 100%);
        transform: translate(-50%, -50%);
        animation: szfy-firefly-aura 3.5s ease-in-out infinite;
        filter: blur(1px);
      }
      
      .szfy-firefly.small {
        width: 3px;
        height: 3px;
      }
      
      .szfy-firefly.medium {
        width: 4px;
        height: 4px;
      }
      
      .szfy-firefly.large {
        width: 6px;
        height: 6px;
      }
      
      @keyframes szfy-firefly-drift {
        0% {
          transform: translateY(100vh) translateX(0px) rotate(0deg);
          opacity: 0;
        }
        8% {
          opacity: 0.7;
        }
        15% {
          opacity: 1;
          transform: translateY(90vh) translateX(15px) rotate(2deg);
        }
        30% {
          transform: translateY(70vh) translateX(-10px) rotate(-1deg);
        }
        50% {
          transform: translateY(50vh) translateX(20px) rotate(1deg);
        }
        70% {
          transform: translateY(30vh) translateX(-15px) rotate(-0.5deg);
        }
        85% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) translateX(30px) rotate(0deg);
          opacity: 0;
        }
      }
      
      @keyframes szfy-firefly-glow {
        0%, 100% {
          opacity: 0.4;
          transform: translate(-50%, -50%) scale(1);
          filter: brightness(0.8);
        }
        15% {
          opacity: 0.9;
          transform: translate(-50%, -50%) scale(1.15);
          filter: brightness(1.1);
        }
        30% {
          opacity: 0.6;
          transform: translate(-50%, -50%) scale(1.05);
          filter: brightness(0.9);
        }
        45% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.25);
          filter: brightness(1.2);
        }
        60% {
          opacity: 0.7;
          transform: translate(-50%, -50%) scale(1.1);
          filter: brightness(1.0);
        }
        75% {
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(1.2);
          filter: brightness(1.05);
        }
        90% {
          opacity: 0.5;
          transform: translate(-50%, -50%) scale(1.05);
          filter: brightness(0.85);
        }
      }
      
      @keyframes szfy-firefly-aura {
        0%, 100% {
          opacity: 0.05;
          transform: translate(-50%, -50%) scale(1);
        }
        50% {
          opacity: 0.15;
          transform: translate(-50%, -50%) scale(1.3);
        }
      }
      
      @keyframes szfy-firefly-flicker {
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
    `,
    html: `
      <div class="szfy-fireflies" id="szfy-fireflies-container">
        <!-- Fireflies will be dynamically created here -->
      </div>
    `,
    js: `
      (function() {
        const container = document.getElementById('szfy-fireflies-container');
        if (!container) return;
        
        // Configuration
        const maxFireflies = 40;
        const fireflies = [];
        let animationId = null;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let lastMouseMove = 0;
        
        // Firefly class
        class Firefly {
          constructor() {
            this.element = null;
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.size = 'medium';
            this.flickerTimer = 0;
            this.flickerInterval = 0;
            this.driftSpeed = 0;
            this.driftDirection = 0;
            this.opacity = 1;
            this.brightness = 1;
            this.attractionStrength = Math.random() * 0.3 + 0.1;
            this.flightPath = [];
            this.pathIndex = 0;
            this.init();
          }
          
          init() {
            // Create firefly element
            this.element = document.createElement('div');
            this.element.className = 'szfy-firefly';
            
            // Random size
            const sizes = ['small', 'medium', 'large'];
            this.size = sizes[Math.floor(Math.random() * sizes.length)];
            this.element.classList.add(this.size);
            
            // Random starting position
            this.x = Math.random() * window.innerWidth;
            this.y = window.innerHeight + Math.random() * 100;
            
            // Random drift movement with more natural patterns
            this.driftSpeed = Math.random() * 0.4 + 0.2; // Slower, more graceful drift
            this.driftDirection = (Math.random() - 0.5) * 0.6; // More subtle horizontal drift
            
            // Generate natural flight path
            this.generateFlightPath();
            
            // Random flicker pattern - more realistic timing
            this.flickerInterval = Math.random() * 1500 + 800; // 0.8-2.3 seconds
            this.flickerTimer = Math.random() * this.flickerInterval;
            
            // Apply initial position
            this.updatePosition();
            
            // Add to container
            container.appendChild(this.element);
          }
          
          generateFlightPath() {
            // Create a more natural curved flight path
            const pathPoints = 8;
            const startX = this.x;
            const startY = this.y;
            const endX = startX + (Math.random() - 0.5) * 200;
            const endY = -100;
            
            this.flightPath = [];
            for (let i = 0; i <= pathPoints; i++) {
              const t = i / pathPoints;
              const curveX = startX + (endX - startX) * t + Math.sin(t * Math.PI) * (Math.random() - 0.5) * 50;
              const curveY = startY + (endY - startY) * t + Math.cos(t * Math.PI * 2) * (Math.random() - 0.5) * 30;
              this.flightPath.push({ x: curveX, y: curveY });
            }
          }
          
          updatePosition() {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
          }
          
          update(deltaTime) {
            // Follow flight path for more natural movement
            if (this.flightPath.length > 0 && this.pathIndex < this.flightPath.length) {
              const targetPoint = this.flightPath[this.pathIndex];
              const dx = targetPoint.x - this.x;
              const dy = targetPoint.y - this.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance > 5) {
                const moveSpeed = this.driftSpeed * deltaTime * 0.08;
                this.x += (dx / distance) * moveSpeed;
                this.y += (dy / distance) * moveSpeed;
              } else {
                this.pathIndex++;
              }
            }
            
            // Subtle mouse attraction (only if mouse has moved recently)
            const timeSinceMouseMove = Date.now() - lastMouseMove;
            if (timeSinceMouseMove < 2000) { // Within 2 seconds
              const mouseDx = mouseX - this.x;
              const mouseDy = mouseY - this.y;
              const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
              
              if (mouseDistance < 150 && mouseDistance > 20) {
                const attraction = this.attractionStrength * deltaTime * 0.01;
                this.x += (mouseDx / mouseDistance) * attraction;
                this.y += (mouseDy / mouseDistance) * attraction;
              }
            }
            
            // Enhanced flicker with more realistic patterns
            this.flickerTimer += deltaTime;
            if (this.flickerTimer >= this.flickerInterval) {
              this.flickerTimer = 0;
              this.flickerInterval = Math.random() * 1500 + 800; // New random interval
              this.element.style.animation = 'szfy-firefly-flicker 0.4s ease-in-out';
              setTimeout(() => {
                this.element.style.animation = '';
              }, 400);
            }
            
            // Update position
            this.updatePosition();
            
            // Check if firefly is off screen
            if (this.y < -100 || this.pathIndex >= this.flightPath.length) {
              this.reset();
            }
          }
          
          reset() {
            // Reset to bottom of screen with new flight path
            this.y = window.innerHeight + Math.random() * 100;
            this.x = Math.random() * window.innerWidth;
            this.driftDirection = (Math.random() - 0.5) * 0.6;
            this.flickerInterval = Math.random() * 1500 + 800;
            this.flickerTimer = Math.random() * this.flickerInterval;
            this.pathIndex = 0;
            this.generateFlightPath();
            this.updatePosition();
          }
          
          destroy() {
            if (this.element && this.element.parentNode) {
              this.element.parentNode.removeChild(this.element);
            }
          }
        }
        
        // Create initial fireflies
        function createFireflies() {
          for (let i = 0; i < maxFireflies; i++) {
            setTimeout(() => {
              fireflies.push(new Firefly());
            }, i * 200); // Stagger creation
          }
        }
        
        // Animation loop
        function animate(currentTime) {
          const deltaTime = currentTime - (lastTime || currentTime);
          lastTime = currentTime;
          
          // Update all fireflies
          fireflies.forEach(firefly => {
            firefly.update(deltaTime);
          });
          
          animationId = requestAnimationFrame(animate);
        }
        
        // Handle window resize
        function handleResize() {
          fireflies.forEach(firefly => {
            firefly.updatePosition();
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
        createFireflies();
        animationId = requestAnimationFrame(animate);
        
        // Mouse tracking for subtle attraction effect
        function handleMouseMove(event) {
          mouseX = event.clientX;
          mouseY = event.clientY;
          lastMouseMove = Date.now();
        }
        
        // Event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Cleanup function
        window.szfyFirefliesCleanup = function() {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          
          fireflies.forEach(firefly => {
            firefly.destroy();
          });
          
          fireflies.length = 0;
          
          if (container) {
            container.innerHTML = '';
          }
          
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(firefliesEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { visual: firefliesEffect };
  }
  
