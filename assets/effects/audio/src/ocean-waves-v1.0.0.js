// Ocean Waves Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(oceanWavesEffect);

const oceanWavesEffect = {
  name: "Ocean Waves",
  description: "Calming ocean sounds with seagulls for beach atmosphere. Perfect for relaxing and meditating.",
  type: "audio",
  author: "Md Mim Akhtar",
  icon: "🌊",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/ocean-waves.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/assets/mp3/asset-1768741074658.mp3",
  version: "1.0.0",
  license: "https://seazonify.com/license",
  created: "2026-01-18",
  category: "summer",
  tags: ["summer", "ocean", "waves", "seagulls", "beach", "ambience"],
  loop: true,
  volume: 0.5
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(oceanWavesEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = oceanWavesEffect;
}