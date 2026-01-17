// Autumn Ambient Effect for Seazonify Controller
// Compatible with SeazonifyController.injectAudioEffect()
// Usage: SeazonifyController.injectAudioEffect(autumnAmbientEffect);

const autumnAmbientEffect = {
    name: "Autumn Ambient",
    description: "Autumn ambient sound effect for your website. Perfect for an ambient environment in autumn season.",
    type: "audio",
    author: "Seazonify",
    icon: "🍁",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/thumbnails/autumn-ambient.webp",
    url: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/audio/assets/mp3/asset-1768677297769.mp3",
    version: "1.0.0",
    license: "https://seazonify.com/license",
    created: "2026-01-15",
    category: "autumn",
    tags: ["autumn", "leaves", "seasonal", "ambient"],
    loop: true,
    volume: 0.50
};

// Auto-inject if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectAudioEffect(autumnAmbientEffect);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = autumnAmbientEffect;
}