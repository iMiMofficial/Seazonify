// Republic Day of India Effect for Seazonify Controller
// Version 1.1.2: Polish & Motion
// - Concept: Rising Tricolor Balloons & Realistic Peace Doves.
// - Vibe: Freedom, Peace, Height.
// - Interaction: click-through (pointer-events: none).
// - Badge: Large, horizontally scrolling typography.

const republicDayEffect = {
    name: "Republic Day of India",
    description: "Soaring high with the spirit of freedom. Features rising tricolor balloons, gentle peace doves, and a majestic scrolling Republic Day tribute.",
    icon: "🇮🇳",
    type: "visual",
    author: "Md Mim Akhtar",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/republic-day-of-india.webp",
    version: "1.1.5",
    license: "https://seazonify.com/license",
    created: "2026-01-24",
    category: "patriotic",
    tags: ["republic day", "india", "26 january", "balloons", "doves", "peace", "freedom"],
    css: `
    .szfy-republic-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
      font-family: 'Cinzel', serif;
    }
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
    #szfy-republic-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    `,
    html: `
    <div class="szfy-republic-container" id="szfy-republic-container">
      <canvas id="szfy-republic-canvas"></canvas>
    </div>
    `,
    js: `
    (function() {
      if (typeof window.szfyRepublicCleanup === 'function') {
          window.szfyRepublicCleanup();
      }

      const container = document.getElementById('szfy-republic-container');
      const canvas = document.getElementById('szfy-republic-canvas');
      if (!container || !canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      let width, height;
      let animationId = null;
      let time = 0;

      // === Configuration ===
      const config = {
          balloonCount: 5, // Decreased for cleaner look
          doveInterval: 500, // Frames between dove flocks
          colors: ['#FF9933', '#FFFFFF', '#138808'], // Saffron, White, Green
          badgeText: "26 JANUARY — WE WISH YOU A HAPPY REPUBLIC DAY",
      };

      // === Resize ===
      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
      }
      window.addEventListener('resize', resize);
      resize();

      // === Classes ===
      
      class Balloon {
          constructor() { this.reset(true); }
          
          reset(init = false) {
              this.x = Math.random() * width;
              // Start below screen or random if init
              this.y = init ? Math.random() * height : height + 50 + Math.random() * 100;
              
              this.size = Math.random() * 15 + 20; // 20-35px radius
              
              const type = Math.random();
              if (type < 0.33) this.color = config.colors[0]; 
              else if (type < 0.66) this.color = config.colors[1];
              else this.color = config.colors[2];
              
              // Rising Speed
              this.speedY = -(Math.random() * 0.8 + 0.4); // Upward
              
              // Sway
              this.sway = Math.random() * Math.PI * 2;
              this.swaySpeed = Math.random() * 0.02 + 0.01;
              this.swayAmp = Math.random() * 0.5;
              
              // String
              this.stringLen = this.size * 2.5;
          }

          update() {
              this.y += this.speedY;
              this.x += Math.sin(time * this.swaySpeed + this.sway) * this.swayAmp;
              
              if (this.y < -100) this.reset();
          }

          draw() {
              ctx.save();
              ctx.translate(this.x, this.y);
              
              // Gentle rotation based on sway
              const rot = Math.sin(time * this.swaySpeed + this.sway) * 0.1;
              ctx.rotate(rot);

              // 1. String
              ctx.beginPath();
              ctx.moveTo(0, this.size);
              // Curved string logic
              ctx.bezierCurveTo(5, this.size + 10, -5, this.size + 30, 0, this.stringLen);
              ctx.strokeStyle = "rgba(200,200,200,0.6)";
              ctx.lineWidth = 1.5;
              ctx.stroke();

              // 2. Balloon Body (Oval)
              ctx.beginPath();
              ctx.ellipse(0, 0, this.size * 0.8, this.size, 0, 0, Math.PI * 2);
              ctx.fillStyle = this.color;
              
              // Shadow/Glow
              ctx.shadowColor = "rgba(0,0,0,0.1)";
              ctx.shadowBlur = 5;
              ctx.fill();
              ctx.shadowBlur = 0;

              // 3. Shine (Reflection)
              ctx.beginPath();
              ctx.ellipse(-this.size*0.3, -this.size*0.3, this.size*0.15, this.size*0.25, -0.5, 0, Math.PI*2);
              ctx.fillStyle = "rgba(255,255,255,0.3)";
              ctx.fill();

              // 4. Knot
              ctx.beginPath();
              ctx.moveTo(-2, this.size - 1);
              ctx.lineTo(2, this.size - 1);
              ctx.lineTo(0, this.size + 4);
              ctx.fillStyle = this.color;
              ctx.fill();

              ctx.restore();
          }
      }

      class Dove {
          constructor() {
              this.active = false;
              this.x = -100;
              this.y = Math.random() * (height * 0.4);
              this.size = 1; 
              this.speed = 3;
              this.wingPhase = 0;
              // Randomized flight params
              this.yOffset = 0;
              this.waviness = 1;
              this.waveSpeed = 0.05;
          }

          spawn() {
              this.active = true;
              this.y = 50 + Math.random() * (height * 0.5);
              if (Math.random() < 0.5) {
                  this.direction = 1;
                  this.x = -100;
              } else {
                  this.direction = -1;
                  this.x = width + 100;
              }
              // Slower speed request
              this.speed = (0.6 + Math.random() * 0.6) * this.direction;
              this.wingSpeed = 0.1 + Math.random() * 0.05; 
              this.size = 0.6 + Math.random() * 0.4; 
              
              // Natural flight variation
              this.yOffset = Math.random() * 1000;
              this.waviness = 0.5 + Math.random() * 1.5; // Amplitude of sine
              this.waveSpeed = 0.02 + Math.random() * 0.04; // Frequency
          }

          update() {
              if (!this.active) return;
              this.x += this.speed;
              // Unique sine wave for each bird
              this.y += Math.sin(time * this.waveSpeed + this.yOffset) * this.waviness; 
              this.wingPhase += this.wingSpeed;

              if (this.x > width + 150 || this.x < -150) {
                  this.active = false;
              }
          }

          draw() {
              if (!this.active) return;
              ctx.save();
              ctx.translate(this.x, this.y);
              ctx.scale(this.size, this.size);
              if (this.direction === -1) ctx.scale(-1, 1);
              
              // Realistic Dove Path
              const flap = Math.sin(this.wingPhase); 
              
              ctx.fillStyle = "#fff";
              // Soft glow/shadow
              ctx.shadowColor = "rgba(255,255,255,0.8)";
              ctx.shadowBlur = 10;
              
              // Body
              ctx.beginPath();
              // Head
              ctx.arc(15, -5, 5, 0, Math.PI*2);
              // Body sweep
              ctx.moveTo(12, -2);
              ctx.quadraticCurveTo(0, 5, -15, 0); // Belly
              ctx.lineTo(-20, -5); // Tail tip
              ctx.lineTo(-10, -5); // Back
              ctx.quadraticCurveTo(5, -8, 12, -8); // Neck
              ctx.fill();
              
              // Beak
              ctx.fillStyle = "#ffcc00";
              ctx.beginPath();
              ctx.moveTo(19, -3);
              ctx.lineTo(24, -1);
              ctx.lineTo(19, 1);
              ctx.fill();
              
              // Wings (Animated)
              ctx.fillStyle = "rgba(255,255,255,0.95)";
              ctx.beginPath();
              const wy = -10 - (flap * 15); // Flap range
              const wx = -5; // Wing join point
              
              ctx.moveTo(5, -5); // Front shoulder
              ctx.quadraticCurveTo(15, wy - 5, wx + 10, wy); // Wing tip path (curved)
              ctx.quadraticCurveTo(wx - 10, wy + 5, -5, -5); // Back shoulder
              ctx.fill();
              
              // Far wing (darker)
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = "rgba(230,230,230,0.9)";
              ctx.beginPath();
              const wy2 = -12 + (flap * 12); // Opposite phaseish
              ctx.moveTo(8, -8); 
              ctx.quadraticCurveTo(18, wy2 - 8, wx + 8, wy2 - 5); 
              ctx.quadraticCurveTo(wx - 5, wy2, -2, -8); 
              ctx.fill();
              ctx.restore();

              ctx.restore();
          }
      }

      class Badge {
          constructor() {
              this.x = width;
              this.speed = 0.5; 
          }

          update() {
              // Scroll Left
              this.x -= this.speed;
          }

          draw() {
              ctx.save();
              
              // "Floating in big text (responsive)" - Moving
              
              // Base size on width
              const fontSize = Math.max(40, Math.min(100, width * 0.08)); 
              // Larger text as requested
              
              const y = height - (fontSize * 0.5); // Padding from bottom
              
              ctx.textAlign = "left"; // Draw from x
              ctx.textBaseline = "alphabetic";
              
              // Fancy shadow/glow
              ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
              ctx.shadowBlur = 15;
              
              // Main Text: "26 JANUARY — REPUBLIC DAY"
              ctx.font = "900 " + fontSize + "px 'Cinzel', serif";
              
              const text = config.badgeText; // "26 JANUARY — REPUBLIC DAY"
              
              // Gradient Text
              const textWidth = ctx.measureText(text).width;
              // Reset logic needs text width
              if (this.x < -textWidth - 50) {
                   this.x = width + 50;
              }

              const grad = ctx.createLinearGradient(this.x, y, this.x + textWidth, y);
              grad.addColorStop(0, "#FF9933");
              grad.addColorStop(0.5, "#fff");
              grad.addColorStop(1, "#138808");
              ctx.fillStyle = grad;
              ctx.fillText(text, this.x, y);
              
              // Floating Animation (Vertical Bob only)
              // We already translate in next steps? No, let's just modify Y for bob
              // Actually straightforward draw is fine, the motion is horizontal
              
              // Chakra Icon: Floating next to text
              ctx.globalAlpha = 0.15;
              const iconSize = fontSize * 1.5;
              ctx.font = iconSize + "px serif";
              ctx.fillStyle = "#fff";
              
              // Spin behind the text center
              // Let's place it at the center of the text block
              const centerX = this.x + textWidth / 2;
              const centerY = y - fontSize * 0.3;
              
              ctx.translate(centerX, centerY);
              ctx.rotate(time * 0.005);
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText("☸", 0, 0);

              ctx.restore();
          }
      }

      // === Init ===
      let balloons = [];
      let doves = [];
      let badge = new Badge();
      let doveTimer = 100;

      function init() {
          balloons = [];
          doves = [];
          for (let i = 0; i < config.balloonCount; i++) {
              balloons.push(new Balloon());
          }
          // Pool of doves
          for(let i=0; i<5; i++) doves.push(new Dove());
      }

      function animateFrame() {
          time++;
          ctx.clearRect(0, 0, width, height);
          
          // 1. Atmosphere (Optional: Very subtle gradient/clouds?)
          // Keeping it clean for now as requested "Not intrusive"

          // 2. Balloons (Background layer)
          balloons.forEach(b => {
              b.update();
              b.draw();
          });

          // 3. Doves (Mid layer)
          doveTimer--;
          if (doveTimer <= 0) {
              // Find inactive dove
              const d = doves.find(dove => !dove.active);
              if (d) d.spawn();
              doveTimer = config.doveInterval + Math.random() * 300;
          }
          doves.forEach(d => {
              d.update();
              d.draw();
          });
          
          // 4. Badge (UI Overlay)
          badge.update();
          badge.draw();

          animationId = requestAnimationFrame(animateFrame);
      }

      init();
      animateFrame();

      window.szfyRepublicCleanup = function() {
          if (animationId) cancelAnimationFrame(animationId);
          window.removeEventListener('resize', resize);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (container) container.innerHTML = '';
      };
    })();
    `
};

if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(republicDayEffect);
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { visual: republicDayEffect };
}