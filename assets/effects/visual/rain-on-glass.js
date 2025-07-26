// Rain on Glass Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(rainOnGlassEffect);

const rainOnGlassEffect = {
  name: "Rain on Glass",
  description: "Raindrops running down a glass surface effect",
  type: "visual",
  author: "Seazonify",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/rain-on-glass.webp",
  version: "1.0.0",
  created: "2024-01-15",
  category: "weather",
  tags: ["rain", "glass", "drops", "weather", "window"],
  css: `
      .szfy-rain-glass-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        display: block;
        background: transparent;
      }
      .szfy-rain-glass-fog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9998;
        background: transparent;
      }
    `,
    html: '<canvas class="szfy-rain-glass-canvas" id="szfy-rain-glass-canvas"></canvas>',
    js: `
      (function() {
        if (window.szfyRainGlassActive) return;
        window.szfyRainGlassActive = true;
        const canvas = document.getElementById('szfy-rain-glass-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrame;
        function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();
        // Raindrop class
        class Raindrop {
          constructor() {
            this.reset(true);
          }
          reset(init = false) {
            this.radius = Math.random() * 10 + 6;
            this.x = Math.random() * width;
            this.y = init ? Math.random() * height : -this.radius;
            this.opacity = Math.random() * 0.3 + 0.5;
            this.speed = Math.random() * 0.7 + 0.5;
            this.wobblePhase = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleAmount = Math.random() * 6 + 2;
            this.shape = Math.random() > 0.5 ? 'teardrop' : 'round';
            this.highlight = Math.random() * 0.5 + 0.5;
          }
          update() {
            this.y += this.speed;
            this.x += Math.sin(this.wobblePhase) * this.wobbleAmount * 0.05;
            this.wobblePhase += this.wobbleSpeed;
            if (this.y > height + this.radius) this.reset();
          }
          draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            if (this.shape === 'teardrop') {
              ctx.ellipse(this.x, this.y, this.radius * 0.7, this.radius, Math.PI / 8, 0, 2 * Math.PI);
            } else {
              ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            }
            ctx.fillStyle = 'rgba(180,200,255,0.5)';
            ctx.shadowColor = 'rgba(200,220,255,0.7)';
            ctx.shadowBlur = 8;
            ctx.fill();
            // highlight
            ctx.globalAlpha = this.opacity * this.highlight;
            ctx.beginPath();
            ctx.arc(this.x + this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.25, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fill();
            ctx.restore();
          }
        }
        // Merge logic
        function tryMerge(drops) {
          for (let i = 0; i < drops.length; i++) {
            for (let j = i + 1; j < drops.length; j++) {
              const a = drops[i], b = drops[j];
              const dx = a.x - b.x, dy = a.y - b.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < (a.radius + b.radius) * 0.7) {
                if (a.radius > b.radius) {
                  a.radius += b.radius * 0.5;
                  a.speed += 0.2;
                  b.reset();
                } else {
                  b.radius += a.radius * 0.5;
                  b.speed += 0.2;
                  a.reset();
                }
              }
            }
          }
        }
        // Create raindrops
        let drops = [];
        function createDrops() {
          const targetCount = Math.floor(width / 18);
          while (drops.length < targetCount) drops.push(new Raindrop());
          while (drops.length > targetCount) drops.pop();
        }
        // Animation loop
        function animate() {
          ctx.clearRect(0, 0, width, height);
          createDrops();
          for (let drop of drops) {
            drop.update();
          }
          tryMerge(drops);
          for (let drop of drops) {
            drop.draw(ctx);
          }
          animationFrame = requestAnimationFrame(animate);
        }
        animate();
        // Cleanup function
        window.szfyRainGlassCleanup = function() {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener('resize', resize);
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          window.szfyRainGlassActive = false;
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(rainOnGlassEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = rainOnGlassEffect;
  }
  
