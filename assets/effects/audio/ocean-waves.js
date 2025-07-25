// Ocean Waves Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(oceanWavesEffect);

const oceanWavesEffect = {
  name: "Ocean Waves",
  description: "Calming ocean sounds with seagulls",
  type: "audio",
  author: "Seazonify",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/ocean-waves.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/mp3/ocean-waves.mp3",
  version: "1.0.0",
  created: "2024-01-15",
  category: "rainy",
  tags: ["rainy", "seasonal", "gentle"],
  loop: true,
  volume: 0.25
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(oceanWavesEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = oceanWavesEffect;
} 
