// Rain Ambience Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(rainAmbienceEffect);

const rainAmbienceEffect = {
  name: "Rain Ambience",
  description: "Soothing rain sounds for relaxation",
  type: "audio",
  author: "Seazonify",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/rain-ambience.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/mp3/rain-ambience.mp3",
  version: "1.0.0",
  created: "2024-01-15",
  category: "summer",
  tags: ["summer", "rain", "seasonal", "ambience"],
  loop: true,
  volume: 0.3
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(rainAmbienceEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rainAmbienceEffect;
} 
