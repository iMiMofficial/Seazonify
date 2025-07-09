// Fireplace Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(fireplaceEffect);

const fireplaceEffect = {
  name: "Cozy Fireplace",
  description: "Crackling fire sounds for warmth",
  icon: "🔥",
  type: "audio",
  url: "https://cdn.seazonify.com/audio/fireplace.mp3",
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