// Parakram Diwas Effect for Seazonify Controller
// Version 1.1.9: Final Polish (Text)
// - Confetti: More realistic paper physics (flipping, swaying, slower).
// - Typography: "Cinzel" font for a patriotic feel.
// - Banner: Fixed timing, Hardcoded "23rd January" date.
// - Clean up: Removed random slogans for less visual noise.

const parakramDiwasEffect = {
    name: "Parakram Diwas",
    description: "A respectful tribute to Netaji Subhas Chandra Bose. Features gentle tricolor confetti, cinematic slogans, and a periodic scrolling salute.",
    icon: "🇮🇳",
    type: "visual",
    author: "Md Mim Akhtar",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/parakram-diwas.webp",
    version: "1.1.10",
    license: "https://seazonify.com/license",
    created: "2026-01-23",
    category: "patriotic",
    tags: ["parakram", "diwas", "netaji", "bose", "india", "patriotic", "tricolor", "jai hind", "salute"],
    css: `
    .szfy-parakram-container {
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
    #szfy-parakram-canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
    .szfy-parakram-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 153, 51, 0.05) 0%, rgba(255, 255, 255, 0) 50%, rgba(19, 136, 8, 0.05) 100%);
      pointer-events: none;
      mix-blend-mode: multiply;
    }
    `,
    html: `
    <div class="szfy-parakram-container" id="szfy-parakram-container">
      <div class="szfy-parakram-overlay"></div>
      <canvas id="szfy-parakram-canvas"></canvas>
    </div>
    `,
    js: `
    (function() {
      if (typeof window.szfyParakramCleanup === 'function') {
          window.szfyParakramCleanup();
      }

      const container = document.getElementById('szfy-parakram-container');
      const canvas = document.getElementById('szfy-parakram-canvas');
      if (!container || !canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      let width, height;
      let animationId = null;
      let time = 0;

      // Netaji Image Asset (Preload)
      const netajiImg = new Image();
      // Placeholder: Using a reliable public URL or solid fallback logic
      // In a real app, this should be a local asset. 
      // Using a high-quality SVG/PNG of Netaji silhouette or sketch would be ideal.
      // For now, drawing a stylized placeholder if image fails or using a generic patriotic symbol.
      netajiImg.src = "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/img/asset-1769230824076.webp"; 
      // Note: If this URL doesn't exist, we fallback to text drawing logic in the class.

      // === Configuration ===
    const config = {
          confettiCount: 40, // Further reduced for cleaner look
          colors: ['#FF9933', '#FFFFFF', '#138808'], // Saffron, White, Green
          baseBannerText: "Saluting the Legend: Netaji Subhas Chandra Bose — Parakram Diwas",
          scrollInterval: 3600, // ~60 seconds at 60fps
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
      
      class Confetti {
          constructor() { this.reset(true); }
          
          reset(init = false) {
              this.x = Math.random() * width;
              this.y = init ? Math.random() * height : -20;
              this.size = Math.random() * 4 + 4; // Varied sizes (4-8px)
              
              const type = Math.random();
              if (type < 0.33) this.color = config.colors[0]; 
              else if (type < 0.66) this.color = config.colors[1];
              else this.color = config.colors[2];
              
              // Realistic Physics
              // Slower fall speed mimicking air resistance
              this.speedY = Math.random() * 0.6 + 0.3; 
              this.speedX = (Math.random() - 0.5) * 0.3; // Gentle drift
              
              // 3D Rotation simulation
              this.rotation = Math.random() * Math.PI * 2;
              this.rotationSpeed = (Math.random() - 0.5) * 0.05;
              
              // Flip rotation (spinning around axis)
              this.flip = Math.random() * Math.PI;
              this.flipSpeed = Math.random() * 0.1 + 0.05;
              
              this.sway = Math.random() * 0.1;
              this.swaySpeed = Math.random() * 0.02 + 0.01;
          }

          update() {
              this.y += this.speedY;
              this.x += this.speedX + Math.sin(time * this.swaySpeed + this.sway) * 0.3;
              
              this.rotation += this.rotationSpeed;
              this.flip += this.flipSpeed; // Rotate for flip effect
              
              if (this.y > height + 20) this.reset();
              if (this.x > width + 20) this.x = -20;
              if (this.x < -20) this.x = width + 20;
          }

          draw() {
              ctx.save();
              ctx.translate(this.x, this.y);
              ctx.rotate(this.rotation);
              
              // Simulate 3D flip by scaling Y based on cosine of flip angle
              const scaleY = Math.cos(this.flip);
              ctx.scale(1, scaleY);
              
              ctx.fillStyle = this.color;
              ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
              ctx.restore();
          }
      }



      class ScrollingBanner {
          constructor() {
              this.active = false;
              this.x = width;
              this.speed = 1.0; 
              this.timer = 600; 
              this.opacity = 0;
              this.phase = 'hidden'; // hidden, in, scroll, out
              this.contentWidth = 0; // To track when to end scroll
          }

          update() {
              if (this.phase === 'hidden') {
                  this.timer--;
                  if (this.timer <= 0) {
                      this.phase = 'in';
                      this.active = true;
                      this.x = width; 
                  }
              } else if (this.phase === 'in') {
                  this.opacity += 0.02;
                  if (this.opacity >= 1) {
                      this.opacity = 1;
                      this.phase = 'scroll';
                  }
              } else if (this.phase === 'scroll') {
                  this.x -= this.speed;
                  // Dynamic check: End when text is fully off screen
                  // Content width + safety margin + screen width
                  const limit = -(this.contentWidth + width * 0.5); 
                  if (this.x < limit) { 
                      this.phase = 'out';
                  }
              } else if (this.phase === 'out') {
                  this.opacity -= 0.02;
                  if (this.opacity <= 0) {
                      this.opacity = 0;
                      this.active = false;
                      this.phase = 'hidden';
                      this.timer = config.scrollInterval; 
                      this.x = width; // Reset x for next time
                  }
              }
          }

          draw() {
              if (!this.active) return;
              
              ctx.save();
              
              // Responsive Calculations
              // Font size based on width, clamped betwen 18px and 48px
              const fontSize = Math.max(18, Math.min(48, width * 0.04));
              const stripHeight = fontSize * 1.8; // Increased slightly for image space
              const y = height - (stripHeight * 1.5); 
              
              ctx.globalAlpha = this.opacity;

              // Gradient Strip background
              const grad = ctx.createLinearGradient(0, y, width, y);
              grad.addColorStop(0, "rgba(255, 153, 51, 0.9)"); // Saffron
              grad.addColorStop(0.5, "rgba(255, 255, 255, 0.9)"); // White
              grad.addColorStop(1, "rgba(19, 136, 8, 0.9)"); // Green
              
              ctx.fillStyle = grad;
              // Add shadow/glow
              ctx.shadowColor = "rgba(0,0,0,0.5)";
              ctx.shadowBlur = 15;
              ctx.fillRect(0, y - stripHeight/2, width, stripHeight);
              
              ctx.shadowBlur = 0; // Reset for text

              // Text - Using Cinzel font
              ctx.font = "bold " + fontSize + "px 'Cinzel', serif";
              ctx.fillStyle = "#000080"; // Navy Blue (Chakra color)
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              
              // Draw Text
              // Dynamic Time Display - REMOVED per request
              // Hardcoded text: "23RD JANUARY"
              const fullText = config.baseBannerText.toUpperCase() + " — 23RD JANUARY";
              
              // Measure text for scrolling logic
              this.contentWidth = ctx.measureText(fullText).width;

              ctx.fillText(fullText, this.x, y);
              
              // --- Image Attachment Logic ---
              // Text: "SALUTING THE LEGEND: NETAJI SUBHAS CHANDRA BOSE — ..."
              // We want to place image over "NETAJI SUBHAS CHANDRA BOSE"
              // 1. Measure prefix "SALUTING THE LEGEND: "
              const prefix = "SALUTING THE LEGEND: ";
              const name = "NETAJI SUBHAS CHANDRA BOSE";
              
              const prefixWidth = ctx.measureText(prefix).width;
              const nameWidth = ctx.measureText(name).width;
              
              // Image Position
              // Center of name segment
              const imgX = this.x + prefixWidth + (nameWidth / 2);
              // Position: Float above the strip. 
              // Adjusted to float HIGHER as requested.
              const imgSize = stripHeight * 2.5; // Larger, prominent
              
              // Previous calculation was: (y - stripHeight * 0.5) - imgSize/2 + (imgSize * 0.1);
              // REQUEST: "slightly take the image of netaji upward"
              // Moves it further up. Negative Y moves up.
              // Center of image relative to y (text center):
              const imgCenterY = (y - stripHeight * 0.8) - (imgSize / 2); 
              
              if (netajiImg.complete && netajiImg.naturalHeight !== 0) {
                 ctx.save();
                 const size = imgSize;
                 const ix = imgX - size/2;
                 const iy = imgCenterY - size/2; // Top-left corner based on center
                 const r = 12; // Border radius

                 ctx.beginPath();
                 ctx.roundRect(ix, iy, size, size, r);
                 
                 // Background (White card)
                 ctx.fillStyle = "#fff";
                 ctx.shadowColor = "rgba(0,0,0,0.3)";
                 ctx.shadowBlur = 10;
                 ctx.shadowOffsetY = 4;
                 ctx.fill();
                 
                 // Clip & Draw Image (with padding inside card)
                 ctx.save();
                 const pad = 4;
                 ctx.beginPath();
                 ctx.roundRect(ix + pad, iy + pad, size - pad*2, size - pad*2, r - 2);
                 ctx.clip();
                 ctx.drawImage(netajiImg, ix + pad, iy + pad, size - pad*2, size - pad*2);
                 ctx.restore();
                 
                 // Border
                 ctx.lineWidth = 2;
                 ctx.strokeStyle = "#e0e0e0";
                 ctx.stroke();
                 
                 ctx.restore();
              }

              // Icon at Start
              ctx.font = fontSize + "px serif";
              ctx.fillText("🫡", this.x - (fontSize * 1.5), y);

              ctx.restore();
          }
      }

      class NetajiTribute {
          constructor() {
              this.active = false;
              this.timer = 1200; // Show after 20s
              this.opacity = 0;
              this.scale = 1;
          }

          update() {
              if (!this.active) {
                  this.timer--;
                  if (this.timer <= 0) {
                      this.active = true;
                      this.phase = 'in';
                      this.opacity = 0;
                  }
              } else {
                  if (this.phase === 'in') {
                      this.opacity += 0.005; // Slow fade in
                      if (this.opacity >= 0.15) { // Max opacity (Watermark style)
                          this.phase = 'hold';
                          this.holdTimer = 300; // 5s
                      }
                  } else if (this.phase === 'hold') {
                      this.holdTimer--;
                      if (this.holdTimer <= 0) this.phase = 'out';
                  } else if (this.phase === 'out') {
                      this.opacity -= 0.005;
                      if (this.opacity <= 0) {
                          this.active = false;
                          this.timer = 3000 + Math.random() * 2000; // Random long interval
                      }
                  }
              }
          }

          draw() {
              if (!this.active) return;
              ctx.save();
              ctx.globalAlpha = this.opacity;
              
              // If image loaded, draw it
              if (netajiImg.complete && netajiImg.naturalHeight !== 0) {
                  const s = Math.min(width, height) * 0.6;
                  const x = width / 2 - s / 2;
                  const y = height / 2 - s / 2;
                  ctx.drawImage(netajiImg, x, y, s, s);
              } else {
                  // Fallback: Responsive Text Watermark with Cinzel Font
                  const mainSize = Math.min(width, height) * 0.15;
                  const subSize = mainSize * 0.4;
                  
                  ctx.font = "900 " + mainSize + "px 'Cinzel', serif"; // Updated font
                  ctx.fillStyle = "#333";
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillText("NETAJI", width/2, height/2 - subSize);
                  
                  ctx.font = "bold " + subSize + "px 'Cinzel', serif"; // Updated font
                  ctx.fillText("23rd Jan", width/2, height/2 + subSize); // Updated text to date
              }
              
              ctx.restore();
          }
      }

      // === Init ===
      let particles = [];
      let banner = new ScrollingBanner();
      let netaji = new NetajiTribute();

      function init() {
          particles = [];
          for (let i = 0; i < config.confettiCount; i++) {
              particles.push(new Confetti());
          }
      }

      function animateFrame() {
          time++;
          ctx.clearRect(0, 0, width, height);

          // Update Logic
          banner.update();
          netaji.update();

          // Draw Layering
          // 1. Netaji (Background Watermark)
          netaji.draw();

          // 2. Confetti (Midground)
          particles.forEach(p => {
              p.update();
              p.draw();
          });

          // 3. Banner (UI Overlay)
          banner.draw();

          animationId = requestAnimationFrame(animateFrame);
      }

      init();
      animateFrame();

      window.szfyParakramCleanup = function() {
          if (animationId) cancelAnimationFrame(animationId);
          window.removeEventListener('resize', resize);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (container) container.innerHTML = '';
      };
    })();
    `
};

if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(parakramDiwasEffect);
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { visual: parakramDiwasEffect };
}