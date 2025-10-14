// Rainfall Classic Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(rainfallClassicEffect);

const rainfallClassicEffect = {
  name: "Rainfall Classic",
  description: "Realistic raindrops falling steadily across the screen",
  icon: "💧",
  author: "Kousik Chowdhury",
  type: "visual",
  thumbnail:
    "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/rainfall-classic.webp", 
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2025-10-14",
  category: "rain",
  tags: ["rain", "monsoon", "storm", "realistic", "classic"],
  css: `
.szfy-rain {
  position: fixed;
  top:0;
  left:0;
  width: 1.5px;
  height: 120px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.88)
  );
  border-radius: 50%;
  filter: blur(0.5px);
  transform: rotate(5deg);
  animation: szfy-fall 0.8s linear infinite;
  animation-fill-mode: both;
}

@keyframes szfy-fall {
  0% {
    transform: translateY(-100px) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(50px);
    opacity: 0;
  }
}
`,
  js: `
const rainCount = 60; 
for (let i = 0; i < rainCount; i++) {
  const drop = document.createElement("div");
  drop.classList.add("szfy-rain");

  // Random position and animation properties
  drop.style.left = Math.random() * 100 + "vw";
  drop.style.animationDuration = 0.5 + Math.random() * 0.8 + "s";
  drop.style.animationDelay = Math.random() * 2 + "s";
  drop.style.height = 20 + Math.random() * 60 + "px";
  drop.style.opacity = 0.2 + Math.random() * 0.5;

  document.body.appendChild(drop);
}
`,
};

// Auto-inject if SeazonifyController is available
if (typeof window !== "undefined" && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(rainfallClassicEffect);
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = rainfallClassicEffect;
}
