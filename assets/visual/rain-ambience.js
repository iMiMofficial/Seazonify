// Rain Ambience Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(rainAmbienceEffect);

const rainAmbienceEffect = {
  name: "Rain Ambience",
  description: "Soothing rain sounds for relaxation",
  icon: "🌧️",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/rain-ambience.mp3",
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