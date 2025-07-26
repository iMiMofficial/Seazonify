// Forest Sounds Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(forestSoundsEffect);

const forestSoundsEffect = {
  name: "Forest Sounds",
  description: "Birds and nature ambience",
  type: "audio",
  author: "Seazonify",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/forest-sounds.webp",
  url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/mp3/forest-sounds-1.mp3",
  version: "1.0.0",
  created: "2024-01-15",
  category: "winter",
  tags: ["winter", "snow", "seasonal", "gentle"],
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
