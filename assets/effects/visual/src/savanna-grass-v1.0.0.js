// Savanna Grass Effect for Seazonify Controller
// Advanced realistic grass simulation with natural wind physics
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(savannaGrassEffect);

const savannaGrassEffect = {
    name: "Savanna Grass",
    description: "Advanced realistic savanna grass with natural wind physics, varied grass types, and sophisticated movement patterns",
    author: "Seazonify",
    type: "visual",
    icon: "🌿",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/savanna-grass.webp",
    license: "https://seazonify.com/license",
    version: "2.1.0",
    created: "2025-10-11",
    category: "desert",
    tags: ["savanna", "desert", "wind", "physics", "natural"],
    css: `
      .szfy-savanna-grass {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
        background: radial-gradient(ellipse at center, 
          rgba(34, 139, 34, 0.02) 0%, 
          rgba(0, 100, 0, 0.015) 40%, 
          rgba(50, 205, 50, 0.008) 70%, 
          transparent 100%);
      }
      
      /* Advanced Grass Blade System - Smaller & More Realistic */
      .szfy-grass-blade {
        position: absolute;
        bottom: 0;
        background: linear-gradient(to top, 
          rgba(34, 139, 34, 0.95), 
          rgba(0, 100, 0, 0.85), 
          rgba(50, 205, 50, 0.75), 
          rgba(144, 238, 144, 0.6), 
          rgba(255, 255, 255, 0.4), 
          transparent);
        border-radius: 0.5px;
        animation: szfy-grass-sway ease-in-out infinite;
        opacity: 0;
        filter: blur(0.2px);
        transform-origin: bottom center;
      }
      
      .szfy-grass-blade::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, 
          rgba(50, 205, 50, 0.8), 
          rgba(34, 139, 34, 0.6), 
          rgba(0, 100, 0, 0.4), 
          rgba(144, 238, 144, 0.2), 
          transparent);
        border-radius: 0.5px;
        animation: szfy-grass-shimmer 5s ease-in-out infinite;
      }
      
      .szfy-grass-blade::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, 
          rgba(255, 255, 255, 0.5), 
          rgba(144, 238, 144, 0.3), 
          rgba(50, 205, 50, 0.2), 
          transparent);
        border-radius: 0.5px;
        animation: szfy-grass-highlight 7s ease-in-out infinite;
      }
      
      /* Grass Blade Types - Smaller & More Proportionate */
      .szfy-grass-blade.tall {
        width: 1.8px;
        background: linear-gradient(to top, 
          rgba(0, 100, 0, 0.98), 
          rgba(34, 139, 34, 0.92), 
          rgba(50, 205, 50, 0.85), 
          rgba(144, 238, 144, 0.7), 
          rgba(255, 255, 255, 0.5), 
          transparent);
      }
      
      .szfy-grass-blade.medium {
        width: 1.2px;
        background: linear-gradient(to top, 
          rgba(34, 139, 34, 0.92), 
          rgba(50, 205, 50, 0.85), 
          rgba(144, 238, 144, 0.7), 
          rgba(255, 255, 255, 0.5), 
          transparent);
      }
      
      .szfy-grass-blade.short {
        width: 0.8px;
        background: linear-gradient(to top, 
          rgba(50, 205, 50, 0.92), 
          rgba(144, 238, 144, 0.8), 
          rgba(255, 255, 255, 0.6), 
          transparent);
      }
      
      /* Enhanced Grass Sway Animation - More Natural */
      @keyframes szfy-grass-sway {
        0%, 100% {
          transform: translateX(0) rotate(0deg) scaleY(1);
          opacity: 0;
        }
        15% {
          opacity: 0.85;
          transform: translateX(-3px) rotate(-4deg) scaleY(0.99);
        }
        35% {
          opacity: 1;
          transform: translateX(-6px) rotate(-8deg) scaleY(0.97);
        }
        50% {
          opacity: 1;
          transform: translateX(-4px) rotate(-5deg) scaleY(0.98);
        }
        65% {
          opacity: 1;
          transform: translateX(4px) rotate(5deg) scaleY(0.98);
        }
        85% {
          opacity: 0.85;
          transform: translateX(6px) rotate(8deg) scaleY(0.97);
        }
      }
      
      @keyframes szfy-grass-shimmer {
        0%, 100% {
          opacity: 0.7;
          transform: scaleY(1);
        }
        50% {
          opacity: 0.95;
          transform: scaleY(1.01);
        }
      }
      
      @keyframes szfy-grass-highlight {
        0%, 100% {
          opacity: 0.4;
          transform: scaleY(1);
        }
        50% {
          opacity: 0.7;
          transform: scaleY(1.005);
        }
      }
      
      /* Advanced Grass Clusters - Smaller & More Realistic */
      .szfy-grass-cluster {
        position: absolute;
        bottom: 0;
        background: 
          radial-gradient(ellipse at center, 
            rgba(34, 139, 34, 0.75) 0%, 
            rgba(0, 100, 0, 0.6) 40%, 
            rgba(50, 205, 50, 0.4) 70%, 
            transparent 100%);
        border-radius: 8px 8px 0 0;
        animation: szfy-cluster-wave ease-in-out infinite;
        opacity: 0;
        filter: blur(0.3px);
        transform-origin: bottom center;
      }
      
      .szfy-grass-cluster::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(ellipse at center, 
            rgba(50, 205, 50, 0.65), 
            rgba(34, 139, 34, 0.45), 
            rgba(144, 238, 144, 0.25), 
            transparent);
        border-radius: 8px 8px 0 0;
        animation: szfy-cluster-inner 6s ease-in-out infinite;
      }
      
      .szfy-grass-cluster::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(ellipse at center, 
            rgba(255, 255, 255, 0.35), 
            rgba(144, 238, 144, 0.25), 
            transparent);
        border-radius: 8px 8px 0 0;
        animation: szfy-cluster-highlight 8s ease-in-out infinite;
      }
      
      @keyframes szfy-cluster-wave {
        0%, 100% {
          transform: translateX(0) scaleY(1) rotate(0deg);
          opacity: 0;
        }
        25% {
          opacity: 0.75;
          transform: translateX(-4px) scaleY(0.98) rotate(-2deg);
        }
        50% {
          opacity: 0.9;
          transform: translateX(-8px) scaleY(0.95) rotate(-4deg);
        }
        75% {
          opacity: 0.75;
          transform: translateX(4px) scaleY(0.98) rotate(2deg);
        }
      }
      
      @keyframes szfy-cluster-inner {
        0%, 100% {
          opacity: 0.45;
          transform: scale(1);
        }
        50% {
          opacity: 0.75;
          transform: scale(1.02);
        }
      }
      
      @keyframes szfy-cluster-highlight {
        0%, 100% {
          opacity: 0.25;
          transform: scale(1);
        }
        50% {
          opacity: 0.55;
          transform: scale(1.01);
        }
      }
      
      /* Enhanced Grass Seeds - Smaller & More Realistic */
      .szfy-grass-seed {
        position: absolute;
        background: radial-gradient(circle, 
          rgba(255, 215, 0, 0.95), 
          rgba(255, 255, 0, 0.8), 
          rgba(255, 215, 0, 0.6), 
          rgba(255, 255, 0, 0.4), 
          transparent);
        border-radius: 50%;
        animation: szfy-seed-float ease-in-out infinite;
        opacity: 0;
        filter: blur(0.15px);
      }
      
      .szfy-grass-seed::before {
        content: '';
        position: absolute;
        top: 20%;
        left: 20%;
        width: 60%;
        height: 60%;
        background: radial-gradient(circle, 
          rgba(255, 255, 0, 0.85), 
          rgba(255, 215, 0, 0.65), 
          transparent);
        border-radius: 50%;
        animation: szfy-seed-sparkle 4s ease-in-out infinite;
      }
      
      .szfy-grass-seed::after {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        background: radial-gradient(circle, 
          rgba(255, 255, 255, 0.45), 
          rgba(255, 215, 0, 0.25), 
          transparent);
        border-radius: 50%;
        animation: szfy-seed-glow 5s ease-in-out infinite;
      }
      
      @keyframes szfy-seed-float {
        0%, 100% {
          transform: translateY(0) translateX(0) rotate(0deg) scale(1);
          opacity: 0;
        }
        20% {
          opacity: 0.85;
          transform: translateY(-8px) translateX(4px) rotate(20deg) scale(1.05);
        }
        40% {
          opacity: 1;
          transform: translateY(-16px) translateX(8px) rotate(40deg) scale(1.1);
        }
        60% {
          opacity: 1;
          transform: translateY(-24px) translateX(12px) rotate(60deg) scale(1.05);
        }
        80% {
          opacity: 0.85;
          transform: translateY(-32px) translateX(16px) rotate(80deg) scale(1);
        }
      }
      
      @keyframes szfy-seed-sparkle {
        0%, 100% {
          opacity: 0.65;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }
      
      @keyframes szfy-seed-glow {
        0%, 100% {
          opacity: 0.35;
          transform: scale(1);
        }
        50% {
          opacity: 0.75;
          transform: scale(1.05);
        }
      }
      
      /* Wind Gust Effects - More Subtle */
      .szfy-wind-gust {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.015) 20%, 
          rgba(144, 238, 144, 0.02) 50%, 
          rgba(255, 255, 255, 0.015) 80%, 
          transparent 100%);
        opacity: 0;
        animation: szfy-wind-gust-flow 10s ease-in-out infinite;
        pointer-events: none;
        filter: blur(1.5px);
      }
      
      @keyframes szfy-wind-gust-flow {
        0%, 100% {
          opacity: 0;
          transform: translateX(-100%) skewX(-8deg);
        }
        20% {
          opacity: 0.02;
          transform: translateX(-50%) skewX(-6deg);
        }
        50% {
          opacity: 0.035;
          transform: translateX(0%) skewX(-4deg);
        }
        80% {
          opacity: 0.02;
          transform: translateX(50%) skewX(-2deg);
        }
      }
      
      /* Enhanced Savanna Background - More Subtle */
      .szfy-savanna-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(circle at 20% 30%, rgba(34, 139, 34, 0.02) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(0, 100, 0, 0.015) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(50, 205, 50, 0.02) 1px, transparent 1px),
          radial-gradient(ellipse at center, 
            rgba(34, 139, 34, 0.015) 0%, 
            rgba(0, 100, 0, 0.01) 40%, 
            rgba(50, 205, 50, 0.008) 70%, 
            transparent 100%);
        background-size: 60px 60px, 90px 90px, 45px 45px, 100% 100%;
        animation: szfy-savanna-shift 50s ease-in-out infinite;
        pointer-events: none;
      }
      
      @keyframes szfy-savanna-shift {
        0%, 100% {
          opacity: 1;
          transform: translateX(0) translateY(0) scale(1);
        }
        25% {
          opacity: 1.05;
          transform: translateX(1px) translateY(-0.5px) scale(1.005);
        }
        50% {
          opacity: 1.1;
          transform: translateX(2px) translateY(-1px) scale(1.01);
        }
        75% {
          opacity: 1.05;
          transform: translateX(1px) translateY(-0.5px) scale(1.005);
        }
      }
      
      /* Responsive Design - Smaller on Mobile */
      @media (max-width: 768px) {
        .szfy-grass-blade {
          width: 0.6px;
        }
        
        .szfy-grass-blade.tall {
          width: 1.2px;
        }
        
        .szfy-grass-blade.medium {
          width: 0.8px;
        }
        
        .szfy-grass-cluster {
          border-radius: 6px 6px 0 0;
        }
      }
    `,
    html: `
      <div class="szfy-savanna-grass" id="szfy-savanna-grass-container">
        <div class="szfy-savanna-background"></div>
        <div class="szfy-wind-gust"></div>
      </div>
    `,
    js: `
      (function() {
        const container = document.getElementById('szfy-savanna-grass-container');
        if (!container) return;
        
        // Enhanced configuration - More elements for density
        const maxGrassBlades = 180;
        const maxGrassClusters = 25;
        const maxGrassSeeds = 40;
        let currentGrassBlades = 0;
        let currentGrassClusters = 0;
        let currentGrassSeeds = 0;
        
        // Performance optimization
        let lastTime = 0;
        let frameCount = 0;
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;
        
        // Wind simulation - More realistic
        let windStrength = 0.5;
        let windDirection = 1;
        let windChangeTimer = 0;
        
        function createGrassBlade() {
          if (currentGrassBlades >= maxGrassBlades) return;
          
          const blade = document.createElement('div');
          blade.className = 'szfy-grass-blade';
          
          // Random grass type with more variety
          const grassType = Math.random();
          if (grassType < 0.25) {
            blade.classList.add('tall');
          } else if (grassType < 0.65) {
            blade.classList.add('medium');
          } else {
            blade.classList.add('short');
          }
          
          // Random position and timing - Smaller heights for realism
          const x = Math.random() * window.innerWidth;
          const height = Math.random() * 50 + 40; // 40-90px (smaller)
          const duration = Math.random() * 3 + 5; // 5-8 seconds (faster)
          const delay = Math.random() * 2;
          
          // Wind-influenced timing - More subtle
          const windInfluence = 1 + (windStrength - 0.5) * 0.2;
          const adjustedDuration = duration * windInfluence;
          
          blade.style.left = x + 'px';
          blade.style.height = height + 'px';
          blade.style.animationDuration = adjustedDuration + 's';
          blade.style.animationDelay = delay + 's';
          
          container.appendChild(blade);
          currentGrassBlades++;
          
          // Remove blade after animation
          setTimeout(() => {
            if (blade.parentNode) {
              blade.parentNode.removeChild(blade);
              currentGrassBlades--;
            }
          }, (adjustedDuration + delay) * 1000);
        }
        
        function createGrassCluster() {
          if (currentGrassClusters >= maxGrassClusters) return;
          
          const cluster = document.createElement('div');
          cluster.className = 'szfy-grass-cluster';
          
          // Random position and timing - Smaller sizes for realism
          const x = Math.random() * window.innerWidth;
          const height = Math.random() * 35 + 50; // 50-85px (smaller)
          const width = Math.random() * 15 + 12; // 12-27px (smaller)
          const duration = Math.random() * 4 + 7; // 7-11 seconds
          const delay = Math.random() * 3;
          
          // Wind-influenced timing - More subtle
          const windInfluence = 1 + (windStrength - 0.5) * 0.15;
          const adjustedDuration = duration * windInfluence;
          
          cluster.style.left = x + 'px';
          cluster.style.height = height + 'px';
          cluster.style.width = width + 'px';
          cluster.style.animationDuration = adjustedDuration + 's';
          cluster.style.animationDelay = delay + 's';
          
          container.appendChild(cluster);
          currentGrassClusters++;
          
          // Remove cluster after animation
          setTimeout(() => {
            if (cluster.parentNode) {
              cluster.parentNode.removeChild(cluster);
              currentGrassClusters--;
            }
          }, (adjustedDuration + delay) * 1000);
        }
        
        function createGrassSeed() {
          if (currentGrassSeeds >= maxGrassSeeds) return;
          
          const seed = document.createElement('div');
          seed.className = 'szfy-grass-seed';
          
          // Random position and timing - Smaller sizes for realism
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * (window.innerHeight * 0.6) + 20;
          const size = Math.random() * 2 + 2; // 2-4px (smaller)
          const duration = Math.random() * 4 + 7; // 7-11 seconds
          const delay = Math.random() * 2;
          
          // Wind-influenced movement - More subtle
          const windInfluence = 1 + (windStrength - 0.5) * 0.25;
          const adjustedDuration = duration * windInfluence;
          
          seed.style.left = x + 'px';
          seed.style.top = y + 'px';
          seed.style.width = size + 'px';
          seed.style.height = size + 'px';
          seed.style.animationDuration = adjustedDuration + 's';
          seed.style.animationDelay = delay + 's';
          
          container.appendChild(seed);
          currentGrassSeeds++;
          
          // Remove seed after animation
          setTimeout(() => {
            if (seed.parentNode) {
              seed.parentNode.removeChild(seed);
              currentGrassSeeds--;
            }
          }, (adjustedDuration + delay) * 1000);
        }
        
        // Wind simulation update - More gradual changes
        function updateWind() {
          windChangeTimer += 0.016;
          
          if (windChangeTimer > 15) {
            // Change wind strength and direction more gradually
            windStrength = Math.max(0.3, Math.min(0.7, windStrength + (Math.random() - 0.5) * 0.2));
            windDirection = Math.random() < 0.5 ? 1 : -1;
            windChangeTimer = 0;
          }
        }
        
        // Main animation loop
        function animate(currentTime) {
          const deltaTime = currentTime - lastTime;
          
          if (deltaTime >= frameInterval) {
            frameCount++;
            lastTime = currentTime;
            
            // Update wind simulation
            updateWind();
            
            // Create elements based on wind conditions - More frequent for density
            if (frameCount % Math.max(8, Math.floor(15 - windStrength * 15)) === 0) {
              createGrassBlade();
            }
            
            if (frameCount % Math.max(20, Math.floor(35 - windStrength * 25)) === 0) {
              createGrassCluster();
            }
            
            if (frameCount % Math.max(25, Math.floor(45 - windStrength * 35)) === 0) {
              createGrassSeed();
            }
          }
          
          requestAnimationFrame(animate);
        }
        
        // Start animation
        animate(0);
        
        // Initial elements - More initial elements for immediate density
        setTimeout(() => {
          // Create initial grass blades
          for (let i = 0; i < 90; i++) {
            setTimeout(createGrassBlade, i * 80);
          }
          
          // Create initial grass clusters
          for (let i = 0; i < 18; i++) {
            setTimeout(createGrassCluster, i * 600);
          }
          
          // Create initial grass seeds
          for (let i = 0; i < 20; i++) {
            setTimeout(createGrassSeed, i * 400);
          }
        }, 300);
        
        // Performance optimization
        let visibilityChangeHandler = () => {
          if (document.hidden) {
            // Pause animations when tab is not visible
          } else {
            // Resume animations when tab becomes visible
          }
        };
        
        document.addEventListener('visibilitychange', visibilityChangeHandler);
        
        // Cleanup function
        window.szfySavannaGrassCleanup = function() {
          if (container) {
            container.innerHTML = '';
            currentGrassBlades = 0;
            currentGrassClusters = 0;
            currentGrassSeeds = 0;
          }
          
          document.removeEventListener('visibilitychange', visibilityChangeHandler);
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(savannaGrassEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = savannaGrassEffect;
  }
  
