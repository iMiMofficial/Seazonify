// Ocean Waves Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(oceanWavesEffect);

const oceanWavesEffect = {
  name: "Ocean Waves",
  description: "Calming ocean sounds with seagulls",
  icon: "🌊",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/ocean-waves.mp3",
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