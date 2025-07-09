// Floating Bubbles Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(floatingBubblesEffect);

const floatingBubblesEffect = {
  name: "Floating Bubbles",
  description: "Rising soap bubbles with rainbow colors",
  icon: "🫧",
  type: "visual",
  css: `
    .szfy-floating-bubbles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%);
      border: 2px solid rgba(255, 255, 255, 0.6);
      animation: szfy-bubble-rise linear infinite;
      opacity: 0.7;
      filter: blur(0.5px);
    }
    
    .szfy-bubble::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 25%;
      width: 20%;
      height: 20%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
      border-radius: 50%;
    }
    
    @keyframes szfy-bubble-rise {
      0% {
        transform: translateY(100vh) translateX(0px) scale(0.5);
        opacity: 0;
      }
      10% {
        opacity: 0.7;
        transform: translateY(90vh) translateX(10px) scale(0.6);
      }
      50% {
        transform: translateY(50vh) translateX(50px) scale(1);
      }
      90% {
        opacity: 0.7;
        transform: translateY(10vh) translateX(100px) scale(1.2);
      }
      100% {
        transform: translateY(-20px) translateX(150px) scale(1.5);
        opacity: 0;
      }
    }
    
    .szfy-bubble.swing {
      animation: szfy-bubble-rise, szfy-bubble-sway 3s ease-in-out infinite alternate;
    }
    
    @keyframes szfy-bubble-sway {
      0% { transform: translateX(-20px) rotate(-5deg); }
      100% { transform: translateX(20px) rotate(5deg); }
    }
  `,
  html: '<div class="szfy-floating-bubbles" id="szfy-floating-bubbles-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-floating-bubbles-container');
      if (!container) return;
      
      const maxBubbles = 35;
      let currentBubbles = 0;
      
      function createBubble() {
        if (currentBubbles >= maxBubbles) return;
        
        const bubble = document.createElement('div');
        bubble.className = 'szfy-bubble';
        
        // Random properties
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 40 + 20;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        bubble.style.left = startX + 'px';
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.animationDuration = duration + 's';
        bubble.style.animationDelay = delay + 's';
        
        // Add rainbow colors randomly
        const colors = [
          'rgba(255, 182, 193, 0.3)', // pink
          'rgba(173, 216, 230, 0.3)', // light blue
          'rgba(144, 238, 144, 0.3)', // light green
          'rgba(255, 218, 185, 0.3)', // peach
          'rgba(221, 160, 221, 0.3)', // plum
          'rgba(255, 255, 224, 0.3)'  // light yellow
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.background = bubble.style.background.replace('rgba(255, 255, 255, 0.3)', randomColor);
        
        // Add swing effect randomly
        if (Math.random() > 0.4) {
          bubble.classList.add('swing');
        }
        
        container.appendChild(bubble);
        currentBubbles++;
        
        // Remove bubble after animation
        setTimeout(() => {
          if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
            currentBubbles--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create bubbles periodically
      const createInterval = setInterval(createBubble, 300);
      
      // Cleanup function
      window.szfyFloatingBubblesCleanup = function() {
        clearInterval(createInterval);
        if (container) {
          container.innerHTML = '';
          currentBubbles = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(floatingBubblesEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = floatingBubblesEffect;
} 