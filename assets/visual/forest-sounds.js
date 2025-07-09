// Forest Sounds Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(forestSoundsEffect);

const forestSoundsEffect = {
  name: "Forest Sounds",
  description: "Birds and nature ambience",
  icon: "🌲",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/forest-sounds.mp3",
  loop: true,
  volume: 0.3
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(forestSoundsEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = forestSoundsEffect;
} 