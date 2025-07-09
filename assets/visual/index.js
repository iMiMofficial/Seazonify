// Seazonify Effects Index
// Complete collection of all available effects for the Seazonify Controller
// Load this file to get access to all effects

// Visual Effects
const visualEffects = {
  'winter-snowfall': {
    name: "Winter Snowfall",
    description: "Gentle snowflakes falling across the screen",
    icon: "❄️",
    file: "winter-snowfall.js"
  },
  'autumn-leaves': {
    name: "Autumn Leaves", 
    description: "Falling autumn leaves with seasonal colors",
    icon: "🍂",
    file: "autumn-leaves.js"
  },
  'spring-petals': {
    name: "Spring Petals",
    description: "Floating flower petals and fireflies",
    icon: "🌸",
    file: "spring-petals.js"
  },
  'confetti': {
    name: "Confetti",
    description: "Colorful falling confetti for celebrations",
    icon: "🎊",
    file: "confetti.js"
  },
  'floating-bubbles': {
    name: "Floating Bubbles",
    description: "Rising soap bubbles with rainbow colors",
    icon: "🫧",
    file: "floating-bubbles.js"
  }
};

// Audio Effects
const audioEffects = {
  'rain-ambience': {
    name: "Rain Ambience",
    description: "Soothing rain sounds for relaxation",
    icon: "🌧️",
    file: "rain-ambience.js",
    url: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7c2.mp3" // Rain sound (Pixabay)
  },
  'ocean-waves': {
    name: "Ocean Waves",
    description: "Calming ocean sounds with seagulls",
    icon: "🌊",
    file: "ocean-waves.js",
    url: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7c2.mp3" // Ocean waves (Pixabay)
  },
  'forest-sounds': {
    name: "Forest Sounds",
    description: "Birds and nature ambience",
    icon: "🌲",
    file: "forest-sounds.js",
    url: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b4e3b.mp3" // Forest birds (Pixabay)
  },
  'fireplace': {
    name: "Cozy Fireplace",
    description: "Crackling fire sounds for warmth",
    icon: "🔥",
    file: "fireplace.js",
    url: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae7c2.mp3" // Fireplace crackling (Pixabay)
  }
};

// Combo Effects (Visual + Audio)
const comboEffects = {
  'snow-fireplace': {
    name: "Snow & Fireplace",
    description: "Winter Snowfall with Cozy Fireplace sounds",
    icon: "❄️🔥",
    visualFile: "winter-snowfall.js",
    audioFile: "fireplace.js"
  },
  'leaves-forest': {
    name: "Leaves & Forest",
    description: "Autumn Leaves with Forest Sounds",
    icon: "🍂🌲",
    visualFile: "autumn-leaves.js",
    audioFile: "forest-sounds.js"
  },
  'petals-birds': {
    name: "Petals & Birds",
    description: "Spring Petals with Forest Birds",
    icon: "🌸🌲",
    visualFile: "spring-petals.js",
    audioFile: "forest-sounds.js"
  },
  'confetti-ocean': {
    name: "Confetti & Ocean",
    description: "Confetti with Ocean Waves",
    icon: "🎊🌊",
    visualFile: "confetti.js",
    audioFile: "ocean-waves.js"
  },
  'bubbles-rain': {
    name: "Bubbles & Rain",
    description: "Floating Bubbles with Rain Ambience",
    icon: "🫧🌧️",
    visualFile: "floating-bubbles.js",
    audioFile: "rain-ambience.js"
  }
};

// All Effects Combined
const allEffects = {
  visual: visualEffects,
  audio: audioEffects,
  combo: comboEffects
};

// Loading Functions
const SeazonifyEffects = {
  // Load a single effect by name
  loadEffect: function(effectName, type = 'visual') {
    if (!window.SeazonifyController) {
      console.error('SeazonifyController not found. Make sure to load the controller first.');
      return false;
    }

    const effects = allEffects[type];
    if (!effects || !effects[effectName]) {
      console.error(`Effect "${effectName}" not found in type "${type}"`);
      return false;
    }

    const effect = effects[effectName];
    const script = document.createElement('script');
    script.src = `https://cdn.seazonify.com/effects/${effect.file}`;
    script.onload = () => console.log(`Loaded ${effect.name}`);
    script.onerror = () => console.error(`Failed to load ${effect.name}`);
    document.head.appendChild(script);
    
    return true;
  },

  // Load a combo effect
  loadComboEffect: function(comboName) {
    if (!window.SeazonifyController) {
      console.error('SeazonifyController not found. Make sure to load the controller first.');
      return false;
    }

    const combo = comboEffects[comboName];
    if (!combo) {
      console.error(`Combo effect "${comboName}" not found`);
      return false;
    }

    // Load visual component
    if (combo.visualFile) {
      const visualScript = document.createElement('script');
      visualScript.src = `https://cdn.seazonify.com/effects/${combo.visualFile}`;
      document.head.appendChild(visualScript);
    }

    // Load audio component
    if (combo.audioFile) {
      const audioScript = document.createElement('script');
      audioScript.src = `https://cdn.seazonify.com/effects/${combo.audioFile}`;
      document.head.appendChild(audioScript);
    }

    console.log(`Loaded combo effect: ${combo.name}`);
    return true;
  },

  // Load multiple effects
  loadEffects: function(effectList) {
    effectList.forEach(effect => {
      if (typeof effect === 'string') {
        // Try to auto-detect type
        if (visualEffects[effect]) {
          this.loadEffect(effect, 'visual');
        } else if (audioEffects[effect]) {
          this.loadEffect(effect, 'audio');
        } else if (comboEffects[effect]) {
          this.loadComboEffect(effect);
        } else {
          console.error(`Effect "${effect}" not found`);
        }
      } else if (effect.name && effect.type) {
        this.loadEffect(effect.name, effect.type);
      }
    });
  },

  // Get all available effects
  getAllEffects: function() {
    return allEffects;
  },

  // Get effects by type
  getVisualEffects: function() {
    return visualEffects;
  },

  getAudioEffects: function() {
    return audioEffects;
  },

  getComboEffects: function() {
    return comboEffects;
  }
};

// Auto-load popular effects if controller is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  // Load a few popular effects by default
  setTimeout(() => {
    SeazonifyEffects.loadEffect('winter-snowfall', 'visual');
    SeazonifyEffects.loadEffect('rain-ambience', 'audio');
  }, 100);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SeazonifyEffects;
}

// Make available globally
if (typeof window !== 'undefined') {
  window.SeazonifyEffects = SeazonifyEffects;
} 