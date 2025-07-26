// Sakura Petals Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(sakuraPetalsEffect);

const sakuraPetalsEffect = {
  name: "Sakura Petals",
  description: "Cherry blossom petals falling in Japanese style",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/sakura-petals.webp",
  type: "visual",
  author: "Seazonify",
  version: "1.0.0",
  created: "2024-03-15",
  category: "cultural",
  tags: ["sakura", "cherry", "blossom", "japanese", "cultural"],
  css: `
      .szfy-sakura-canvas {
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
    `,
    html: '<canvas class="szfy-sakura-canvas" id="szfy-sakura-canvas"></canvas>',
    js: `
      (function() {
        if (window.szfySakuraActive) return;
        window.szfySakuraActive = true;
        const canvas = document.getElementById('szfy-sakura-canvas');
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
        // Wind variation
        let windBase = 0.5;
        let windPhase = 0;
        let windSpeed = 0.002 + Math.random() * 0.002;
        function getWind() {
          windPhase += windSpeed;
          return windBase + Math.sin(windPhase) * 1.2;
        }
        // Petal class
        class Petal {
          constructor() {
            this.reset(true);
          }
          reset(init = false) {
            this.size = Math.random() * 18 + 12;
            this.depth = Math.random(); // 0 (far) to 1 (near)
            this.x = Math.random() * width;
            this.y = init ? Math.random() * height : -this.size;
            this.opacity = 0.5 + this.depth * 0.5;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01 * (0.5 + this.depth);
            this.verticalSpeed = (Math.random() * 0.7 + 0.7) * (0.5 + this.depth);
            this.driftPhase = Math.random() * Math.PI * 2;
            this.driftSpeed = Math.random() * 0.02 + 0.01;
            this.driftAmount = (Math.random() * 18 + 8) * (0.5 + this.depth);
            this.color = this.depth > 0.7 ? 'rgba(255,182,193,0.9)' : 'rgba(255,240,250,0.7)';
          }
          update(wind) {
            this.y += this.verticalSpeed;
            this.x += Math.sin(this.driftPhase) * this.driftAmount * 0.04 + wind * (0.3 + this.depth);
            this.driftPhase += this.driftSpeed;
            this.rotation += this.rotationSpeed;
            if (this.y > height + this.size || this.x < -this.size || this.x > width + this.size) this.reset();
          }
          draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            // Petal shape: ellipse with gradient
            const grad = ctx.createRadialGradient(0, 0, this.size * 0.2, 0, 0, this.size);
            grad.addColorStop(0, 'rgba(255,255,255,0.8)');
            grad.addColorStop(0.7, this.color);
            grad.addColorStop(1, 'rgba(255,182,193,0.3)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.7, this.size, Math.PI / 8, 0, 2 * Math.PI);
            ctx.shadowColor = 'rgba(255,182,193,0.5)';
            ctx.shadowBlur = 8 * this.depth;
            ctx.fill();
            ctx.restore();
          }
        }
        // Create petals
        let petals = [];
        function createPetals() {
          const targetCount = Math.floor(width / 12);
          while (petals.length < targetCount) petals.push(new Petal());
          while (petals.length > targetCount) petals.pop();
        }
        // Animation loop
        function animate() {
          ctx.clearRect(0, 0, width, height);
          createPetals();
          const wind = getWind();
          for (let petal of petals) {
            petal.update(wind);
          }
          for (let petal of petals) {
            petal.draw(ctx);
          }
          animationFrame = requestAnimationFrame(animate);
        }
        animate();
        // Cleanup function
        window.szfySakuraCleanup = function() {
          cancelAnimationFrame(animationFrame);
          window.removeEventListener('resize', resize);
          if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
          window.szfySakuraActive = false;
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(sakuraPetalsEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = sakuraPetalsEffect;
  }
  
