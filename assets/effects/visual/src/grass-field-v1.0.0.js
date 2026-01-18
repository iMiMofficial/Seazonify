// Grass Field Effect for Seazonify Controller
// Advanced field grass with wind physics, daisies, and dandelions
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(grassFieldEffect);

const grassFieldEffect = {
  name: "Grass Field",
  description: "Advanced field grass with realistic wind physics, daisies, and dandelions. Perfect for creating a natural atmosphere.",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "🌾",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/grass-field.webp",
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2026-01-18",
  category: "nature",
  tags: ["grass", "field", "wind", "physics", "daisies", "dandelions", "realistic", "sophisticated"],
  css: `
    .szfy-grass-field {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
      background: linear-gradient(to top, transparent, rgba(135, 206, 235, 0.1));
    }
    
    .szfy-grass-field .canvas-container {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 150px;
    }
    
    .szfy-grass-field canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `,
  html: `
    <div class="szfy-grass-field" id="szfy-grass-field-container">
      <div class="canvas-container">
        <canvas id="szfy-grass-field-canvas"></canvas>
      </div>
    </div>
  `,
  js: `
    (function() {
      const container = document.getElementById('szfy-grass-field-container');
      if (!container) return;
      
      const canvas = document.getElementById('szfy-grass-field-canvas');
      if (!canvas) return;
      
      // Daisy Path2D definitions
      const daisyP1 = new Path2D("m -1.829031,-3.4426 c 2.503845,1.109686 2.9913,2.290752 1.21864001,2.95266399 C -3.114236,-1.599621 -3.601691,-2.780687 -1.829031,-3.4426 Z");
      const daisyP2 = new Path2D("m 2.300026,-3.484848 c -2.503845,1.109686 -2.99129999,2.290752 -1.21864,2.95266399 C 3.585231,-1.641869 4.072686,-2.822935 2.300026,-3.484848 Z");
      const daisyP3 = new Path2D("M 0.816802,-0.26458301 C 3.51306,-0.14178401 5.726339,-0.98493001 6.35,-2.372448 3.653744,-2.495247 1.440465,-1.652101 0.816802,-0.26458301 Z");
      const daisyP4 = new Path2D("M 0,-0.01181901 C -2.696258,0.11097999 -4.909537,-0.73216601 -5.533198,-2.119684 -2.836942,-2.242483 -0.62366299,-1.399337 0,-0.01181901 Z");
      const daisyP6 = new Path2D("m 1.875136,-0.00301701 c 2.645834,-1.32291699 5.291668,-1.32291699 6.614583,0 -2.645832,1.32291701 -5.291665,1.32291701 -6.614583,0 z");
      const daisyP7 = new Path2D("m -1.829031,-0.00301701 c -2.645834,-1.32291699 -5.291668,-1.32291699 -6.614583,0 2.645832,1.32291701 5.291665,1.32291701 6.614583,0 z");
      const daisyP8 = new Path2D("M 1.369021,0.52614899 C 4.323135,0.37200999 6.748081,1.430343 7.431386,3.171983 4.477274,3.326123 2.052328,2.26779 1.369021,0.52614899 Z");
      const daisyP9 = new Path2D("M -1.299864,0.51131299 C -4.253978,0.35717399 -6.678925,1.415507 -7.36223,3.157147 c 2.954112,0.15414 5.379058,-0.904193 6.062366,-2.64583401 z");
      const daisyP10 = new Path2D("M 2.139719,3.70115 C -0.364126,2.591464 -0.85158099,1.410398 0.921079,0.74848599 3.424924,1.858171 3.912379,3.039237 2.139719,3.70115 Z");
      const daisyP11 = new Path2D("M -1.989338,3.743397 C 0.514507,2.633711 1.001962,1.452645 -0.77069799,0.79073299 -3.274543,1.900418 -3.761998,3.081484 -1.989338,3.743397 Z");
      
      // Dandelion Path2D definitions (simplified)
      const dandelionP1 = new Path2D("m -15,2 c -0.5,-1 -0.7,-1.8 0.7,-1.7 -0.7,-1.3 -0.8,-2.1 1,-2 -0.5,-1.6 0.04,-2.2 1.3,-2 -0.1,-1.4 0.7,-1.8 1.7,-1.7 -0.2,-1.4 0.5,-1.7 1.7,-1.3 0.2,-1.6 1,-1.7 2.3,-1 0.6,-2.3 1.9,-1.1 3,-0.7 1,-1 2,-1.6 3.3,0 1.2,-1.1 2,-0.9 3,0.7 1.4,-0.8 2.2,-0.4 2.3,0.7 1.1,-0.7 1.8,-0.6 1.7,1 1,-0.01 1.8,0.2 1.7,1.7 1.3,0.2 1.8,0.9 1.3,2 1.4,0.2 1.8,0.8 1,2 0.9,-0.02 1.5,0.2 0.7,1.7 1.1,0.5 1.8,0.9 0.3,2 1.4,0.2 1.8,0.8 1,2 0.9,-0.02 1.5,0.2 0.7,1.7 1.1,0.5 1.8,0.9 0.3,2 0.7,0.5 0.3,1.2 0.3,1.7 0.7,0.9 0.3,1.4 -0.3,1.7 0.2,1.6 -0.8,1.7 -1.7,1.7 -0.3,0.9 -1.2,1.4 -3,1 -0.6,1.1 -1.8,1.3 -3.7,0.7 -1,0.7 -2.1,1 -3.3,0.3 -1,0.7 -2,1.2 -3.3,0 -1,0.7 -2,1.1 -3.3,0 -1.2,1 -2.3,0.7 -3.3,0 -1.1,0.6 -2.3,0.4 -3.3,-0.3 -1.3,0.5 -2.5,0.6 -3.7,-0.7 -1.8,0.4 -2.5,-0.1 -3,-1 -1.2,0.1 -1.8,-0.4 -1.7,-1.7 -0.8,-0.3 -0.9,-0.9 -0.3,-1.7 -0.4,-0.7 -0.6,-1.3 0.3,-1.7 z");
      
      // Constants
      const WIND_MAX = 4.0;
      const DAMPING_THRESHOLD = 0.6;
      const MAX_BEND_ANGLE_DEG = 90;
      const MAX_BEND_ANGLE_RADS = (Math.PI / 180) * MAX_BEND_ANGLE_DEG;
      const MAX_BEND_ANGLE_DAISIES_RADS = (Math.PI / 180) * 45;
      const MAX_BEND_ANGLE_DANDELION_RADS = (Math.PI / 180) * 60;
      
      // State variables
      let ctx = null;
      let canvasWidth = 0;
      let canvasHeight = 0;
      let requestAnimationFrameId = 0;
      let lastAnimationTimeStamp = 0;
      let currentWinds = [];
      
      // Grass layers configuration
      const layers = [
        {
          grassBlades: null,
          offset: 2,
          color: "#6dab1b",
          pixelPerGrass: 15,
          grassHeight: 90,
          grassWidth: 10,
          angleVarianceDeg: 10,
          sizeVariance: 0.2,
        },
        {
          grassBlades: null,
          offset: 20,
          color: "#24750c",
          pixelPerGrass: 90,
          grassHeight: 70,
          grassWidth: 3,
          angleVarianceDeg: 20,
          sizeVariance: 0.2,
          type: "daisy",
        },
        {
          grassBlades: null,
          offset: 10,
          color: "#6dab1b",
          pixelPerGrass: 300,
          grassHeight: 90,
          grassWidth: 4,
          angleVarianceDeg: 20,
          sizeVariance: 0.2,
          type: "dandelion",
        },
        {
          grassBlades: null,
          offset: 0,
          color: "#24750ccc",
          pixelPerGrass: 3,
          grassHeight: 100,
          grassWidth: 7,
          angleVarianceDeg: 6,
          sizeVariance: 0.1,
        },
      ];
      
      // Initialize the effect
      function init() {
        ctx = canvas.getContext("2d");
        resizeCanvas();
        setupGrass();
        
        // Add initial winds
        setTimeout(() => {
          currentWinds.push({
            wind: 0.6,
            posX: 0,
            speed: 1000 / 1000,
            speedUp: 2 / 1000,
            powerUp: 0.9 / 1000,
          });
          startAnimation();
        }, 1000);
        
        setTimeout(() => {
          currentWinds.push({
            wind: -0.8,
            posX: canvasWidth + 10,
            speed: -500 / 1000,
            speedUp: -2 / 1000,
            powerUp: -0.5 / 1000,
          });
          startAnimation();
        }, 3000);
        
        // Event listeners
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", onMouseMove);
      }
      
      // Resize canvas
      function resizeCanvas() {
        canvasWidth = canvas.clientWidth;
        canvasHeight = canvas.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        for (const layer of layers) {
          layer.grassBlades = resizeGrassBlades(layer.grassBlades, canvasWidth, layer);
        }
        startAnimation();
      }
      
      // Setup grass
      function setupGrass() {
        for (const layer of layers) {
          layer.grassBlades = resizeGrassBlades(null, canvasWidth, layer);
        }
      }
      
      // Resize grass blades
      function resizeGrassBlades(grassBlades = null, canvasWidth, layer) {
        const newSize = Math.ceil(canvasWidth / layer.pixelPerGrass);
        if (grassBlades == null) {
          grassBlades = {
            length: 0,
            spacing: layer.pixelPerGrass,
            offset: layer.offset,
            getIndexRangeForPixel: () => ({ minIndex: 0, maxIndex: 0 }),
            posX: new Float32Array(0),
            rotate: new Float32Array(0),
            scale: new Float32Array(0),
            targetWind: new Float32Array(0),
            currentWind: new Float32Array(0),
          };
        }
        
        const sizeDiff = newSize - grassBlades.length;
        if (sizeDiff > 0) {
          const posX = new Float32Array(newSize);
          const rotate = new Float32Array(newSize);
          const scale = new Float32Array(newSize);
          const targetWind = new Float32Array(newSize);
          const currentWind = new Float32Array(newSize);
          
          posX.set(grassBlades.posX, 0);
          rotate.set(grassBlades.rotate, 0);
          scale.set(grassBlades.scale, 0);
          targetWind.set(grassBlades.targetWind, 0);
          currentWind.set(grassBlades.currentWind, 0);
          
          const degToRad = Math.PI / 180;
          for (let i = grassBlades.length; i < newSize; i++) {
            const posXV = Math.floor(i * grassBlades.spacing + grassBlades.offset);
            const rotateV = (Math.random() - 0.5) * 2 * layer.angleVarianceDeg * degToRad;
            const scaleV = 1 + (Math.random() - 0.5) * 2 * layer.sizeVariance;
            posX[i] = posXV;
            rotate[i] = rotateV;
            scale[i] = scaleV;
            targetWind[i] = 0;
            currentWind[i] = 0;
          }
          
          grassBlades.posX = posX;
          grassBlades.rotate = rotate;
          grassBlades.scale = scale;
          grassBlades.targetWind = targetWind;
          grassBlades.currentWind = currentWind;
          grassBlades.length = newSize;
          
          if (layer.type === "dandelion" || layer.type === "daisy") {
            setIndexRangeFunctionForFlowers(grassBlades);
          } else {
            setIndexRangeFunctionForGrassBlades(grassBlades);
          }
        }
        
        return grassBlades;
      }
      
      // Index range functions
      function setIndexRangeFunctionForGrassBlades(grassBlades) {
        grassBlades.getIndexRangeForPixel = (startPixel, endPixel) => {
          if (startPixel > endPixel) {
            [startPixel, endPixel] = [endPixel, startPixel];
          }
          const minIndex = Math.max(0, Math.min(grassBlades.length - 1, Math.floor((startPixel + grassBlades.offset) / grassBlades.spacing)));
          const maxIndex = Math.max(0, Math.min(grassBlades.length, Math.ceil((endPixel + grassBlades.offset) / grassBlades.spacing) - 1));
          return { minIndex, maxIndex };
        };
      }
      
      function setIndexRangeFunctionForFlowers(grassBlades) {
        grassBlades.getIndexRangeForPixel = (startPixel, endPixel) => {
          if (startPixel > endPixel) {
            [startPixel, endPixel] = [endPixel, startPixel];
          }
          let minIndex = grassBlades.length;
          let maxIndex = 0;
          for (let i = 0; i < grassBlades.length; i++) {
            if (grassBlades.posX[i] >= startPixel && grassBlades.posX[i] <= endPixel) {
              minIndex = Math.min(minIndex, i);
              maxIndex = Math.max(maxIndex, i + 1);
            }
          }
          return { minIndex, maxIndex };
        };
      }
      
      // Mouse move handler
      function onMouseMove(event) {
        const inRange = event.clientY > window.innerHeight - canvasHeight;
        if (inRange) {
          const x = event.clientX;
          const dx = event.movementX;
          for (const gl of layers) {
            const grassBlades = gl.grassBlades;
            const delta = dx < 0 ? 2 : -2;
            const { minIndex, maxIndex } = grassBlades.getIndexRangeForPixel(x - dx + delta, x - delta);
            const factor = 1 / 15;
            const targetWind = dx >= 0 ? Math.min(dx * factor, WIND_MAX) : Math.max(dx * factor, -WIND_MAX);
            for (let i = minIndex; i < maxIndex; i++) {
              grassBlades.targetWind[i] = Math.max(-5, Math.min(5, (1 + (Math.random() - 0.5) * 0.2) * targetWind));
            }
          }
          startAnimation();
        }
      }
      
      // Animation functions
      function startAnimation() {
        if (requestAnimationFrameId) {
          cancelAnimationFrame(requestAnimationFrameId);
          requestAnimationFrameId = 0;
        }
        lastAnimationTimeStamp = 0;
        requestAnimationFrameId = requestAnimationFrame(onAnimationFrame);
      }
      
      function onAnimationFrame(timestamp) {
        if (!lastAnimationTimeStamp) {
          lastAnimationTimeStamp = timestamp;
          requestAnimationFrameId = requestAnimationFrame(onAnimationFrame);
          return;
        }
        
        const delta = timestamp - lastAnimationTimeStamp;
        let noChange = applyWinds(delta);
        clearCanvas();
        
        for (const gl of layers) {
          const noGlChange = updateWinds(gl.grassBlades, delta);
          noChange = noChange && noGlChange;
          
          if (gl.type === "daisy") {
            drawDaisies(ctx, gl);
          } else if (gl.type === "dandelion") {
            drawDandelions(ctx, gl);
          } else {
            drawGrassBlades(ctx, gl);
          }
        }
        
        lastAnimationTimeStamp = timestamp;
        if (noChange) {
          requestAnimationFrameId = 0;
        } else {
          requestAnimationFrameId = requestAnimationFrame(onAnimationFrame);
        }
      }
      
      // Wind functions
      function applyWinds(deltaTime) {
        currentWinds = currentWinds.filter(x => x.wind !== 0);
        for (const wind of currentWinds) {
          const oldPos = wind.posX;
          const newPos = wind.posX + deltaTime * wind.speed;
          
          for (const layer of layers) {
            const gbs = layer.grassBlades;
            const { minIndex, maxIndex } = gbs.getIndexRangeForPixel(oldPos, newPos);
            for (let i = minIndex; i < maxIndex; i++) {
              gbs.targetWind[i] += wind.wind;
            }
          }
          
          wind.posX = newPos;
          wind.speed += wind.speedUp * deltaTime;
          wind.wind += wind.powerUp * deltaTime;
          
          if ((wind.speed >= 0 && wind.posX >= canvasWidth) || (wind.speed <= 0 && wind.posX < 0)) {
            wind.wind = 0;
          }
        }
        return currentWinds.length <= 0;
      }
      
      function updateWinds(grassBlades, timeDelta) {
        let noChange = true;
        for (let i = 0; i < grassBlades.length; i++) {
          let targetWind = grassBlades.targetWind[i];
          if (targetWind >= 0) {
            targetWind = Math.max(0, targetWind - (timeDelta / 1000) * 1);
            grassBlades.targetWind[i] = targetWind;
          } else {
            targetWind = Math.min(0, targetWind + (timeDelta / 1000) * 1);
            grassBlades.targetWind[i] = targetWind;
          }
          
          const windDiff = targetWind - grassBlades.currentWind[i];
          const windDelta = windDiff * (timeDelta / 700);
          grassBlades.currentWind[i] += windDelta;
          
          const currentWind = grassBlades.currentWind[i];
          let currentWindAroundZero = false;
          if (currentWind > -0.001 && currentWind < 0) {
            grassBlades.currentWind[i] = -0.001;
            currentWindAroundZero = true;
          } else if (currentWind < 0.001 && currentWind >= 0) {
            grassBlades.currentWind[i] = 0.001;
            currentWindAroundZero = true;
          }
          
          noChange = noChange && targetWind == 0 && currentWindAroundZero;
        }
        return noChange;
      }
      
      // Drawing functions
      function clearCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      }
      
      function drawBlade(ctx, state, gbWidth, gbHeight) {
        const h = gbHeight;
        const w = 2 * gbWidth;
        const angle = state * -MAX_BEND_ANGLE_RADS;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const toX = cos * w - sin * h;
        const toY = sin * w + cos * h;
        const tangX = cos * -w;
        const tangY = sin * -w;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(0, -w, toX + tangX, -(toY + tangY), toX, -toY);
        ctx.bezierCurveTo(toX + tangX, -(toY + tangY), w / 2, -w, w / 2, 0);
        ctx.fill();
      }
      
      function drawGrassBlades(ctx, gl) {
        const gbs = gl.grassBlades;
        ctx.strokeStyle = gl.color;
        ctx.fillStyle = gl.color;
        const midOffset = gl.grassWidth / 2;
        
        for (let i = 0; i < gbs.length; i++) {
          const scaleX = gbs.currentWind[i] < 0 ? -1 : 1;
          const state = currentWindToState(gbs.currentWind[i]);
          ctx.save();
          ctx.translate(gbs.posX[i], 150);
          ctx.translate(-midOffset, 0);
          ctx.rotate(gbs.rotate[i]);
          ctx.scale(scaleX, gbs.scale[i]);
          drawBlade(ctx, state, gl.grassWidth, gl.grassHeight);
          ctx.restore();
        }
      }
      
      function drawDaisies(ctx, gl) {
        const height = gl.grassHeight;
        const width = gl.grassWidth;
        const das = gl.grassBlades;
        
        for (let i = 0; i < das.length; i++) {
          const scaleX = das.currentWind[i] < 0 ? -1 : 1;
          const state = currentWindToState(das.currentWind[i]);
          ctx.save();
          ctx.translate(das.posX[i], 150);
          ctx.rotate(das.rotate[i]);
          ctx.scale(scaleX * das.scale[i], das.scale[i]);
          drawDaisy(ctx, state, height, width, gl.color);
          ctx.restore();
        }
      }
      
      function drawDaisy(ctx, state, height, width, color) {
        const h = height;
        const angle = state * MAX_BEND_ANGLE_DAISIES_RADS;
        const curve = (angle * 20) / 1.5708;
        
        ctx.rotate(angle);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-curve, -h / 3, -curve, -h + h / 3, 0, -h);
        ctx.stroke();
        ctx.translate(0, -h);
        ctx.scale(2, 2);
        drawDaisyHead(ctx);
      }
      
      function drawDaisyHead(ctx) {
        ctx.strokeStyle = "#183601";
        ctx.lineWidth = 0.2;
        
        const blattGrd1 = ctx.createRadialGradient(0, 0, 5, 0, 0, 8);
        blattGrd1.addColorStop(0, "#ffffff");
        blattGrd1.addColorStop(1, "#a844b8");
        
        const blattGrd2 = ctx.createRadialGradient(0, 0, 6, 0, 0, 8);
        blattGrd2.addColorStop(0, "#ececec");
        blattGrd2.addColorStop(1, "#a844b8");
        
        ctx.fillStyle = blattGrd1;
        ctx.fill(daisyP1);
        ctx.stroke(daisyP1);
        ctx.fill(daisyP2);
        ctx.stroke(daisyP2);
        
        ctx.fillStyle = blattGrd2;
        ctx.fill(daisyP3);
        ctx.stroke(daisyP3);
        ctx.fill(daisyP4);
        ctx.stroke(daisyP4);
        
        ctx.fillStyle = "#ffc803";
        ctx.beginPath();
        ctx.ellipse(0, 0, 2.65, 1.32, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = blattGrd1;
        ctx.fill(daisyP6);
        ctx.stroke(daisyP6);
        ctx.fill(daisyP7);
        ctx.stroke(daisyP7);
        
        ctx.fillStyle = blattGrd2;
        ctx.fill(daisyP8);
        ctx.stroke(daisyP8);
        ctx.fill(daisyP9);
        ctx.stroke(daisyP9);
        
        ctx.fillStyle = blattGrd1;
        ctx.fill(daisyP10);
        ctx.stroke(daisyP10);
        ctx.fill(daisyP11);
        ctx.stroke(daisyP11);
      }
      
      function drawDandelions(ctx, gl) {
        const height = gl.grassHeight;
        const width = gl.grassWidth;
        const das = gl.grassBlades;
        
        for (let i = 0; i < das.length; i++) {
          const scaleX = das.currentWind[i] < 0 ? -1 : 1;
          const state = currentWindToState(das.currentWind[i]);
          ctx.save();
          ctx.translate(das.posX[i], 150);
          ctx.rotate(das.rotate[i]);
          ctx.scale(scaleX * das.scale[i], das.scale[i]);
          drawDandelion(ctx, state, height, width, gl.color);
          ctx.restore();
        }
      }
      
      function drawDandelion(ctx, state, height, width, color) {
        const h = height;
        const angle = state * MAX_BEND_ANGLE_DANDELION_RADS;
        const curve = (angle * 20) / 1.5708;
        
        ctx.rotate(angle);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-curve, -h / 3, -curve, -h + h / 3, 0, -h);
        ctx.stroke();
        ctx.translate(0, -h + 10);
        ctx.scale(0.5, 0.5);
        drawDandelionHead(ctx);
      }
      
      function drawDandelionHead(ctx) {
        ctx.strokeStyle = "#ffffff88";
        ctx.lineWidth = 0.8;
        
        ctx.fillStyle = "#f6e200";
        ctx.fill(dandelionP1);
        
        ctx.strokeStyle = "#dccc00";
        ctx.stroke(dandelionP1);
      }
      
      function currentWindToState(currentWind) {
        let state = Math.abs(currentWind);
        if (state > DAMPING_THRESHOLD) {
          state = 1 - (1 - DAMPING_THRESHOLD) / (1 * (state - DAMPING_THRESHOLD) + 1);
        }
        return state;
      }
      
      // Cleanup function
      window.szfyGrassFieldCleanup = function() {
        if (requestAnimationFrameId) {
          cancelAnimationFrame(requestAnimationFrameId);
          requestAnimationFrameId = 0;
        }
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("mousemove", onMouseMove);
        if (container) {
          container.innerHTML = '';
        }
      };
      
      // Initialize
      init();
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(grassFieldEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = grassFieldEffect;
}