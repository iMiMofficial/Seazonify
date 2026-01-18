// Thunderstorm Effect for Seazonify Controller
// Canvas-based ultra-realistic thunderstorm with authentic water drop physics
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(thunderstormEffect);

const thunderstormEffect = {
  name: "Thunderstorm",
  description: "Canvas-based ultra-realistic thunderstorm with authentic water drop physics and natural storm dynamics",
  icon: "⛈️",
  type: "visual",
  author: "Md Mim Akhtar",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/thunderstorm.webp",
  license: "https://seazonify.com/license",
  version: "4.0.0",
  created: "2026-01-18",
  category: "weather",
  tags: ["thunderstorm", "lightning", "thunder", "canvas", "ultra-realistic", "water-physics", "atmospheric", "storm", "weather", "natural"],
  css: `
    .szfy-thunderstorm {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
      /* Removed background color - now completely transparent */
    }
    
    .szfy-thunderstorm canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    
    #szfy-canvas1 {
      z-index: 1;
    }
    
    #szfy-canvas2 {
      z-index: 2;
    }
    
    #szfy-canvas3 {
      z-index: 3;
    }
  `,
  html: `
    <div class="szfy-thunderstorm" id="szfy-thunderstorm-container">
      <canvas id="szfy-canvas1"></canvas>
      <canvas id="szfy-canvas2"></canvas>
      <canvas id="szfy-canvas3"></canvas>
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-thunderstorm-container');
      if (!container) return;
      
      // Canvas setup
      const canvas1 = document.getElementById('szfy-canvas1');
      const canvas2 = document.getElementById('szfy-canvas2');
      const canvas3 = document.getElementById('szfy-canvas3');
      
      if (!canvas1 || !canvas2 || !canvas3) return;
      
      const ctx1 = canvas1.getContext('2d');
      const ctx2 = canvas2.getContext('2d');
      const ctx3 = canvas3.getContext('2d');
      
      // Rain configuration
      const rainTroughNum = 80; // Increased from 50 for more real rain drops
      const speedRainTrough = 3; // Very slow movement
      const rainTrough = [];
      
      const rainNum = 20; // Drastically reduced from 50 - those fake line drops
      const rain = [];
      
      // Lightning configuration
      const lightning = [];
      let lightTimeCurrent = 0;
      let lightTimeTotal = 0;
      
      // Canvas dimensions
      let w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
      let h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
      
      // Storm intensity
      let stormIntensity = 0.7;
      let windStrength = 0.5;
      let windDirection = 1;
      
      // Utility functions
      function random(min, max) {
        return Math.random() * (max - min + 1) + min;
      }
      
      function clearCanvas1() {
        ctx1.clearRect(0, 0, w, h);
      }
      
      function clearCanvas2() {
        ctx2.clearRect(0, 0, w, h);
      }
      
      function clearCanvas3() {
        ctx3.globalCompositeOperation = 'destination-out';
        ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 25) / 100 + ')';
        ctx3.fillRect(0, 0, w, h);
        ctx3.globalCompositeOperation = 'source-over';
      }
      
      // Create rain trough (background rain effect)
      function createRainTrough() {
        for (let i = 0; i < rainTroughNum; i++) {
          rainTrough[i] = {
            x: random(0, w),
            y: random(0, h),
            length: Math.floor(random(1, 800)),
            opacity: Math.random() * 0.15,
            xs: random(-1.5, 1.5),
            ys: random(8, 18)
          };
        }
      }
      
      // Create individual rain drops
      function createRain() {
        for (let i = 0; i < rainNum; i++) {
          rain[i] = {
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 1.5 + 0.5,
            xs: -3 + Math.random() * 6 + windDirection * windStrength * 2,
            ys: Math.random() * 3 + 2 // Reduced from 8 + 12 to 3 + 2 for much slower falling
          };
        }
      }
      
      // Create lightning
      function createLightning() {
        const x = random(100, w - 100);
        const y = random(0, h / 3);
        
        const createCount = random(1, 3);
        for (let i = 0; i < createCount; i++) {
          const single = {
            x: x,
            y: y,
            xRange: random(8, 35),
            yRange: random(12, 30),
            path: [{
              x: x,
              y: y
            }],
            pathLimit: random(45, 60),
            intensity: random(0.8, 1.2)
          };
          lightning.push(single);
        }
      }
      
      // Draw rain trough
      function drawRainTrough(i) {
        ctx1.beginPath();
        const grd = ctx1.createLinearGradient(0, rainTrough[i].y, 0, rainTrough[i].y + rainTrough[i].length);
        grd.addColorStop(0, "rgba(255,255,255,0)");
        grd.addColorStop(1, "rgba(255,255,255," + rainTrough[i].opacity + ")");
        
        ctx1.fillStyle = grd;
        ctx1.fillRect(rainTrough[i].x, rainTrough[i].y, 1, rainTrough[i].length);
        ctx1.fill();
      }
      
      // Draw individual rain drops
      function drawRain(i) {
        ctx2.beginPath();
        ctx2.moveTo(rain[i].x, rain[i].y);
        ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
        
        // Realistic water drop colors
        const opacity = random(0.3, 0.7);
        ctx2.strokeStyle = \`rgba(174, 194, 224, \${opacity})\`;
        ctx2.lineWidth = 1;
        ctx2.lineCap = 'round';
        ctx2.stroke();
      }
      
      // Draw lightning
      function drawLightning() {
        for (let i = 0; i < lightning.length; i++) {
          const light = lightning[i];
          
          light.path.push({
            x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
            y: light.path[light.path.length - 1].y + (random(0, light.yRange))
          });
          
          if (light.path.length > light.pathLimit) {
            lightning.splice(i, 1);
            continue;
          }
          
          // Lightning appearance
          ctx3.strokeStyle = \`rgba(255, 255, 255, \${0.15 * light.intensity})\`;
          
          // Variable lightning thickness
          let lineWidth = 3;
          if (random(0, 20) === 0) {
            lineWidth = 6;
          }
          if (random(0, 40) === 0) {
            lineWidth = 8;
          }
          ctx3.lineWidth = lineWidth;
          
          // Draw lightning path
          ctx3.beginPath();
          ctx3.moveTo(light.x, light.y);
          for (let pc = 0; pc < light.path.length; pc++) {
            ctx3.lineTo(light.path[pc].x, light.path[pc].y);
          }
          
          // Lightning flash effect
          if (Math.floor(random(0, 25)) === 1) {
            ctx3.fillStyle = \`rgba(255, 255, 255, \${random(1, 4) / 100})\`;
            ctx3.fillRect(0, 0, w, h);
          }
          
          ctx3.lineJoin = 'miter';
          ctx3.stroke();
        }
      }
      
      // Animate rain trough
      function animateRainTrough() {
        clearCanvas1();
        for (let i = 0; i < rainTroughNum; i++) {
          if (rainTrough[i].y >= h) {
            rainTrough[i].y = h - rainTrough[i].y - rainTrough[i].length * 5;
          } else {
            rainTrough[i].y += speedRainTrough;
          }
          drawRainTrough(i);
        }
      }
      
      // Animate individual rain drops
      function animateRain() {
        clearCanvas2();
        for (let i = 0; i < rainNum; i++) {
          rain[i].x += rain[i].xs;
          rain[i].y += rain[i].ys;
          
          // Reset rain drops that go off screen
          if (rain[i].x > w || rain[i].y > h) {
            rain[i].x = Math.random() * w;
            rain[i].y = -20;
          }
          drawRain(i);
        }
      }
      
      // Animate lightning
      function animateLightning() {
        clearCanvas3();
        lightTimeCurrent++;
        
        if (lightTimeCurrent >= lightTimeTotal) {
          createLightning();
          lightTimeCurrent = 0;
          lightTimeTotal = random(150, 250);
        }
        
        drawLightning();
      }
      
      // Update storm dynamics
      function updateStormDynamics() {
        // Dynamic wind changes
        if (Math.random() < 0.001) {
          windDirection *= -1;
        }
        
        // Wind strength variation
        windStrength = Math.max(0.2, Math.min(1, windStrength + (Math.random() - 0.5) * 0.01));
        
        // Update rain movement based on wind
        for (let i = 0; i < rainNum; i++) {
          rain[i].xs = -3 + Math.random() * 6 + windDirection * windStrength * 2;
        }
      }
      
      // Handle window resize
      function handleResize() {
        w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
        h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
        createRainTrough();
        createRain();
      }
      
      // Initialize
      function init() {
        createRainTrough();
        createRain();
        window.addEventListener('resize', handleResize);
      }
      
      // Animation loop
      function animloop() {
        updateStormDynamics();
        animateRainTrough();
        animateRain();
        animateLightning();
        requestAnimationFrame(animloop);
      }
      
      // Start the effect
      init();
      animloop();
      
      // Cleanup function
      window.szfyThunderstormCleanup = function() {
        if (container) {
          container.innerHTML = '';
        }
        window.removeEventListener('resize', handleResize);
      };
    })();
  `
};

const thunderstormAudio = {
  name: "Thunderstorm Audio",
  description: "Ultra-realistic thunder and rain sounds with authentic atmospheric effects",
  icon: "⛈️",
  type: "audio",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1768748529242.mp3",
  loop: true,
  volume: 0.4
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(thunderstormEffect);
  window.SeazonifyController.injectAudioEffect(thunderstormAudio);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: thunderstormEffect, audio: thunderstormAudio };
}