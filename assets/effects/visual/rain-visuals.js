// Rain Visuals Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(rainVisualsEffect);

const rainVisualsEffect = {
  name: "Rain Visuals",
  description: "Visual raindrops falling on the screen",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/rain-visuals.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-01-15",
  category: "weather",
  tags: ["rain", "drops", "weather", "visual"],
  css: `
      .szfy-rain-canvas {
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
      .szfy-rain-blur {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9998;
        backdrop-filter: blur(2px);
        transition: opacity 0.5s;
        opacity: 0.3;
      }
    `,
    html: '<canvas class="szfy-rain-canvas" id="szfy-rain-canvas"></canvas><div class="szfy-rain-blur" id="szfy-rain-blur"></div>',
    js: `
      (function() {
        // DOM-safe: only run if not already present
        if (window.szfyRainActive) return;
        window.szfyRainActive = true;
        const canvas = document.getElementById('szfy-rain-canvas');
        const blurDiv = document.getElementById('szfy-rain-blur');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrame;
        // Responsive resize
        function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          blurDiv.style.width = width + 'px';
          blurDiv.style.height = height + 'px';
        }
        window.addEventListener('resize', resize);
        resize();
  
        // Raindrop class
        class Raindrop {
          constructor() {
            this.reset(true);
          }
          reset(init = false) {
            this.x = Math.random() * width;
            this.y = init ? Math.random() * height : -20;
            this.length = Math.random() * 18 + 12;
            this.thickness = Math.random() * 1.5 + 1.2;
            this.speed = Math.random() * 4 + 6;
            this.opacity = Math.random() * 0.3 + 0.4;
            this.wind = (Math.random() - 0.5) * 0.8; // wind drift
            this.swayPhase = Math.random() * Math.PI * 2;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
          }
          update() {
            this.y += this.speed;
            this.x += this.wind + Math.sin(this.swayPhase) * 0.5;
            this.swayPhase += this.swaySpeed;
            if (this.y > height + 20) this.reset();
          }
          draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = 'rgba(120,200,255,0.7)';
            ctx.lineWidth = this.thickness;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
            ctx.restore();
          }
        }
  
        // Rain density logic
        let baseDensity = 0.7; // 0.3 to 1.2
        let density = baseDensity;
        let densityDirection = 1;
        function updateDensity() {
          density += densityDirection * (Math.random() * 0.003);
          if (density > 1.2) densityDirection = -1;
          if (density < 0.3) densityDirection = 1;
        }
  
        // Create raindrops
        let drops = [];
        function createDrops() {
          const targetCount = Math.floor(width * density / 12);
          while (drops.length < targetCount) drops.push(new Raindrop());
          while (drops.length > targetCount) drops.pop();
        }
  
        // Animation loop
        function animate() {
          ctx.clearRect(0, 0, width, height);
          updateDensity();
          createDrops();
          for (let drop of drops) {
            drop.update();
            drop.draw(ctx);
          }
          animationFrame = requestAnimationFrame(animate);
        }
        animate();
  
        // Cleanup function
        window.szfyRainCleanup = function() {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener('resize', resize);
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          if (blurDiv.parentNode) blurDiv.parentNode.removeChild(blurDiv);
          window.szfyRainActive = false;
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(rainVisualsEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = rainVisualsEffect;
  }
