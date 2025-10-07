// Maple Leaves 3D Effect for Seazonify Controller
// 3D perspective maple leaves with realistic physics and beautiful visuals
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(mapleLeaves3DEffect);

const mapleLeaves3DEffect = {
    name: "Maple Leaves 3D",
    description: "Stunning 3D maple leaves floating with realistic physics, wind effects, and immersive perspective depth creating a magical autumn atmosphere",
    icon: "🍁",
    type: "visual",
    author: "Seazonify",
    license: "https://seazonify.com/license",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/maple-leaves-3d.webp",
    version: "1.0.0",
    created: "2025-10-07",
    category: "seasonal",
    tags: ["maple", "leaves", "3d", "autumn", "floating"],
    css: `
      .szfy-maple-leaves-3d {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
        perspective: 800px;
        background: linear-gradient(180deg, 
          rgba(135, 206, 235, 0.05) 0%, 
          rgba(255, 140, 0, 0.02) 50%, 
          rgba(139, 69, 19, 0.03) 100%);
      }
      
      .szfy-maple-leaf-3d {
        position: absolute;
        width: 28px;
        height: 28px;
        background-image: url('https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/img/maple-leaf.webp');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
        transform-style: preserve-3d;
        opacity: 0.9;
      }
    `,
    html: `
      <div class="szfy-maple-leaves-3d" id="szfy-maple-leaves-3d-container">
        <!-- 3D maple leaves will be dynamically created here -->
      </div>
    `,
    js: `
      (function() {
        const container = document.getElementById('szfy-maple-leaves-3d-container');
        if (!container) return;
        
        // Configuration
        const maxLeaves = 35;
        const leaves = [];
        let animationId = null;
        
        // Utility function for random values
        function random(min, max) {
          return min + Math.random() * (max - min);
        }
        
        // Enhanced maple leaf class with 3D physics
        class MapleLeaf3D {
          constructor() {
            this.element = null;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.rotationX = 0;
            this.rotationY = 0;
            this.rotationZ = 0;
            this.scale = 1;
            this.velocityX = 0;
            this.velocityY = 0;
            this.velocityZ = 0;
            this.rotationSpeedX = 0;
            this.rotationSpeedY = 0;
            this.rotationSpeedZ = 0;
            this.life = 1.0;
            this.age = 0;
            this.windTimer = 0;
            this.init();
          }
          
          init() {
            // Create maple leaf element
            this.element = document.createElement('div');
            this.element.className = 'szfy-maple-leaf-3d';
            
            // Random starting position
            this.x = random(0, window.innerWidth);
            this.y = random(-200, -100);
            this.z = random(-200, 200);
            
            // Random properties
            this.scale = random(0.7, 1.3);
            this.velocityX = random(-0.3, 0.3);
            this.velocityY = random(0.5, 1.2);
            this.velocityZ = random(-0.1, 0.1);
            
            // Rotation speeds
            this.rotationSpeedX = random(-2, 2);
            this.rotationSpeedY = random(-2, 2);
            this.rotationSpeedZ = random(-1, 1);
            
            // Apply initial transform
            this.updateTransform();
            
            // Add to container
            container.appendChild(this.element);
          }
          
          updateTransform() {
            const transform = \`translate3d(\${this.x}px, \${this.y}px, \${this.z}px) rotateX(\${this.rotationX}deg) rotateY(\${this.rotationY}deg) rotateZ(\${this.rotationZ}deg) scale(\${this.scale})\`;
            this.element.style.transform = transform;
          }
          
          update(deltaTime) {
            this.age += deltaTime;
            this.windTimer += deltaTime;
            
            // Wind effect - changes over time
            const windStrength = Math.sin(this.windTimer * 0.001) * 0.5 + Math.sin(this.windTimer * 0.003) * 0.3;
            const windDirection = Math.sin(this.windTimer * 0.002) * 0.4;
            
            // Apply wind to horizontal movement
            this.velocityX += windStrength * 0.0005;
            this.velocityY += windDirection * 0.0002;
            
            // Gravity effect
            this.velocityY += 0.0008;
            
            // Air resistance
            this.velocityX *= 0.998;
            this.velocityY *= 0.999;
            this.velocityZ *= 0.995;
            
            // Random turbulence
            if (Math.random() < 0.01) {
              this.velocityX += random(-0.2, 0.2);
              this.velocityY += random(-0.1, 0.1);
            }
            
            // Update position
            this.x += this.velocityX * deltaTime * 0.1;
            this.y += this.velocityY * deltaTime * 0.1;
            this.z += this.velocityZ * deltaTime * 0.1;
            
            // Update rotation
            this.rotationX += this.rotationSpeedX * deltaTime * 0.05;
            this.rotationY += this.rotationSpeedY * deltaTime * 0.05;
            this.rotationZ += this.rotationSpeedZ * deltaTime * 0.05;
            
            // Add wind-based rotation
            this.rotationZ += windStrength * 0.1;
            
            // Scale variation for depth effect
            this.scale = 1 + (this.z / 1000);
            
            // Life decay
            this.life -= deltaTime * 0.00008;
            this.element.style.opacity = Math.max(0, this.life);
            
            // Update transform
            this.updateTransform();
            
            // Check if leaf should be removed
            if (this.y > window.innerHeight + 100 || this.life <= 0 || 
                this.x < -100 || this.x > window.innerWidth + 100 ||
                this.z < -500 || this.z > 500) {
              this.destroy();
              return false;
            }
            
            return true;
          }
          
          destroy() {
            if (this.element && this.element.parentNode) {
              this.element.parentNode.removeChild(this.element);
            }
          }
        }
        
        // Create new maple leaves
        function createLeaf() {
          if (leaves.length < maxLeaves) {
            leaves.push(new MapleLeaf3D());
          }
        }
        
        // Animation loop
        function animate(currentTime) {
          const deltaTime = currentTime - (lastTime || currentTime);
          lastTime = currentTime;
          
          // Update all leaves
          for (let i = leaves.length - 1; i >= 0; i--) {
            if (!leaves[i].update(deltaTime)) {
              leaves.splice(i, 1);
            }
          }
          
          // Create new leaves occasionally
          if (Math.random() < 0.015 && leaves.length < maxLeaves) {
            createLeaf();
          }
          
          animationId = requestAnimationFrame(animate);
        }
        
        // Handle window resize
        function handleResize() {
          // Remove leaves that are now off-screen
          for (let i = leaves.length - 1; i >= 0; i--) {
            const leaf = leaves[i];
            if (leaf.x < -100 || leaf.x > window.innerWidth + 100) {
              leaf.destroy();
              leaves.splice(i, 1);
            }
          }
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
        
        // Create initial leaves
        for (let i = 0; i < Math.min(12, maxLeaves); i++) {
          setTimeout(() => createLeaf(), i * 150);
        }
        
        animationId = requestAnimationFrame(animate);
        
        // Event listeners
        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Cleanup function
        window.szfyMapleLeaves3DCleanup = function() {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          
          leaves.forEach(leaf => {
            leaf.destroy();
          });
          
          leaves.length = 0;
          
          if (container) {
            container.innerHTML = '';
          }
          
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(mapleLeaves3DEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = mapleLeaves3DEffect;
  }
  
  
