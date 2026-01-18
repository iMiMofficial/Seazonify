// Confetti Celebration Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(confettiCelebrationEffect);

const confettiCelebrationEffect = {
  name: "Confetti Celebration",
  description: "Colorful falling confetti for celebrations and parties. Perfect for creating a festive atmosphere.",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "🎉",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/confetti-celebration.webp",
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2026-01-18",
  category: "celebration",
  tags: ["confetti", "celebration", "party", "colorful"],
  css: `
    .szfy-confetti {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-confetti-piece {
      position: absolute;
      width: 10px;
      height: 10px;
      animation: szfy-confetti-fall linear infinite;
      opacity: 0;
    }
    
    .szfy-confetti-piece.square {
      border-radius: 2px;
    }
    
    .szfy-confetti-piece.circle {
      border-radius: 50%;
    }
    
    .szfy-confetti-piece.triangle {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 10px solid;
      background: transparent !important;
    }
    
    @keyframes szfy-confetti-fall {
      0% {
        transform: translateY(-10px) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.9;
      }
      90% {
        opacity: 0.9;
      }
      100% {
        transform: translateY(100vh) translateX(100px) rotate(720deg);
        opacity: 0;
      }
    }
    

  `,
  html: '<div class="szfy-confetti" id="szfy-confetti-container"></div>',
  js: `
    (function() {
      const container = document.getElementById('szfy-confetti-container');
      if (!container) return;
      
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
      const shapes = ['square', 'circle', 'triangle'];
      const maxPieces = 70;
      let currentPieces = 0;
      
      function createConfettiPiece() {
        if (currentPieces >= maxPieces) return;
        
        const piece = document.createElement('div');
        piece.className = 'szfy-confetti-piece';
        
        // Random properties
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 15 + 8;
        const duration = Math.random() * 8 + 4;
        const delay = Math.random() * 3;
        
        piece.classList.add(shape);
        piece.style.left = startX + 'px';
        piece.style.backgroundColor = color;
        piece.style.borderBottomColor = color;
        piece.style.width = size + 'px';
        piece.style.height = shape === 'triangle' ? '0' : size + 'px';
        piece.style.animationDuration = duration + 's';
        piece.style.animationDelay = delay + 's';
        

        
        container.appendChild(piece);
        currentPieces++;
        
        // Remove piece after animation
        setTimeout(() => {
          if (piece.parentNode) {
            piece.parentNode.removeChild(piece);
            currentPieces--;
          }
        }, (duration + delay) * 1000);
      }
      
      // Create confetti pieces periodically
      const createInterval = setInterval(createConfettiPiece, 50);
      
      // Cleanup function
      window.szfyConfettiCleanup = function() {
        clearInterval(createInterval);
        if (container) {
          container.innerHTML = '';
          currentPieces = 0;
        }
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(confettiCelebrationEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = confettiCelebrationEffect;
}