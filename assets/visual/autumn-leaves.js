// Autumn Leaves Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(autumnLeavesEffect);

const autumnLeavesEffect = {
  name: "Autumn Leaves",
  description: "Falling autumn leaves with seasonal colors",
  icon: "🍂",
  type: "visual",
  css: `
    .szfy-autumn-leaves {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-leaf {
      position: absolute;
      font-size: 1.2em;
      animation: szfy-leaf-fall linear infinite;
      opacity: 0.9;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
    
    @keyframes szfy-leaf-fall {
      0% {
        transform: translateY(-20px) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.9;
      }
      50% {
        transform: translateY(50vh) translateX(100px) rotate(180deg);
      }
      90% {
        opacity: 0.9;
      }
      100% {
        transform: translateY(100vh) translateX(200px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .szfy-leaf.swing {
      animation: szfy-leaf-fall, szfy-leaf-swing 2s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-leaf-swing {
      0% { transform: translateX(-10px) rotate(-5deg); }
      100% { transform: translateX(10px) rotate(5deg); }
    }
  `,
  html: '<div class="szfy-autumn-leaves" id="szfy-autumn-leaves-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-autumn-leaves-container');
      if (!container) return;
      
      const leaves = ['🍂', '🍁', '🍃', '🌿'];
      const colors = ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'];
      const maxLeaves = 30;
      let currentLeaves = 0;
      
      function createLeaf() {
        if (currentLeaves >= maxLeaves) return;
        
        const leaf = document.createElement('div');
        leaf.className = 'szfy-leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        
        // Random position and animation
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.8;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 8;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        leaf.style.left = startX + 'px';
        leaf.style.fontSize = size + 'em';
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        leaf.style.color = color;
        
        // Add swing effect randomly
        if (Math.random() > 0.5) {
          leaf.classList.add('swing');
        }
        
        container.appendChild(leaf);
        currentLeaves++;
        
        // Remove leaf after animation
        setTimeout(() => {
          if (leaf.parentNode) {
            leaf.parentNode.removeChild(leaf);
            currentLeaves--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create leaves periodically
      const createInterval = setInterval(createLeaf, 300);
      
      // Cleanup function
      window.szfyAutumnLeavesCleanup = function() {
        clearInterval(createInterval);
        if (container) {
          container.innerHTML = '';
          currentLeaves = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(autumnLeavesEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = autumnLeavesEffect;
} 