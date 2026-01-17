// Cozy Fireplace Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(cozyFireplaceEffect);

const cozyFireplaceEffect = {
  name: "Cozy Fireplace",
  description: "Crackling fire sounds for warmth in the winter season. Perfect for creating a cozy atmosphere.",
  type: "audio",
  author: "Seazonify",
  icon: "🔥",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/cozy-fireplace.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/assets/misc/asset-1768678870426.mp3?updatedat=1768678651715",
  version: "1.0.0",
  license: "https://seazonify.com/license",
  created: "2026-01-18",
  category: "winter",
  tags: ["fireplace", "winter", "snow", "seasonal", "cozy"],
  loop: true,
  volume: 0.50
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(cozyFireplaceEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cozyFireplaceEffect;
}