// Fireplace Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(fireplaceEffect);

const fireplaceEffect = {
  name: "Cozy Fireplace",
  description: "Crackling fire sounds for warmth",
  type: "audio",
  author: "Seazonify",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/fireplace.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/mp3/fireplace-1.mp3",
  version: "1.0.0",
  created: "2024-01-15",
  category: "winter",
  tags: ["winter", "snow", "seasonal", "gentle"],
  loop: true,
  volume: 0.35
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(fireplaceEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = fireplaceEffect;
} 
