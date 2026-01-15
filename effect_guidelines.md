# Seazonify Effect Creation Guidelines

<div align="center">

**Complete guide for creating visual, audio, and combo effects**

[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da.svg)](https://discord.gg/seazonify)
[![Lab](https://img.shields.io/badge/Lab-Test%20Effects-blue.svg)](https://app.seazonify.com/lab)

[🏠 Back to Main README](README.md) • [🧪 Open Lab](https://app.seazonify.com/lab) • [💬 Join Discord](https://discord.gg/seazonify)

</div>

---

## 📖 Introduction

This guide will teach you how to create custom effects for the Seazonify platform. Whether you're building visual animations, audio ambiences, or combined experiences, this document has everything you need.

**What You'll Learn:**
- ✅ How to structure effect files
- ✅ Templates for all three effect types
- ✅ Performance optimization techniques
- ✅ How to test and submit your effects
- ✅ Review process and point system

---

## 🎨 Effect Creation Guide

Complete guide for creating visual, audio, and combo effects for the Seazonify platform.

### Table of Contents

- [Effect Types](#effect-types)
- [Requirements](#requirements)
- [Templates](#templates)
  - [Visual Effect Template](#visual-effect-template)
  - [Audio Effect Template](#audio-effect-template)
  - [Combo Effect Template](#combo-effect-template)
- [Hard Rules](#hard-rules)
- [Performance Guidelines](#performance-guidelines)
- [Accessibility](#accessibility)
- [Compatibility](#compatibility)
- [Packaging](#packaging)
- [Quality Standards](#quality-standards)
- [Testing Your Effect](#testing-your-effect)
- [Submission Process](#submission-process)
- [Submission Checklist](#submission-checklist)
- [Review Process](#review-process)
- [Leaderboard & Points System](#leaderboard--points-system)
- [Categories Reference](#categories-reference)
- [Resources](#resources)

---

## Introduction

Seazonify allows you to create three types of effects that can be integrated into any website:

1. **Visual Effects** - DOM-based animations (CSS + HTML + JS)
2. **Audio Effects** - Background music and ambient sounds
3. **Combo Effects** - Combined visual and audio experiences

All effects plug into the `SeazonifyController` and follow a standard structure for easy integration.

---

## Effect Types

### Visual Effects
DOM-based animations using CSS, HTML, and JavaScript. Examples: snowflakes, autumn leaves, fireflies, confetti.

**Properties:** `css`, `html`, `js`

### Audio Effects
Background music or ambient sounds. Examples: rain sounds, ocean waves, forest birds, fireplace crackling.

**Properties:** `url`, `loop`, `volume`

### Combo Effects
Combined visual and audio effects for immersive experiences. Examples: Spring Bloom (flowers + birds), Winter Magic (snowfall + wind).

**Properties:** Separate `visual` and `audio` objects

---

## Requirements

- **Object Shape:** Must follow the exact structure shown in templates
- **Prefixing:** All classes/ids/data attributes must use `szfy-` prefix (visual effects only)
- **Thumbnail:** Provide a `.webp` thumbnail (recommended 150×150 px)
- **Export Format:** Use proper export format for Seazonify to load your effect
- **File Size:** Maximum 100KB (recommended < 50KB)
- **File Type:** Only `.js` files
- **License:** Keep the license field present and unchanged

---

## Templates

### Visual Effect Template

```javascript
// Seazonify Visual Effect Template
// You control the css, html, and js properties completely

const myVisualEffect = {
  // ==================== METADATA ====================
  name: "Effect Name",
  description: "Short description within 50 characters.",
  icon: "✨",              // Emoji that represents your effect
  type: "visual",          // Must be "visual"
  author: "Your Name",
  thumbnail: "https://your-cdn.com/path/to/thumbnail.webp",
  license: "https://seazonify.com/license", // Don't change this
  version: "1.0.0",
  created: "2025-01-15",
  updated: "2025-01-15",
  category: "seasonal",    // See categories reference below
  tags: ["winter", "snow", "seasonal"], // Up to 5 tags recommended

  // ==================== IMPLEMENTATION ====================
  // IMPORTANT: All selectors, IDs, and data attributes MUST use 'szfy-' prefix
  
  css: `
    .szfy-my-effect {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }
    
    .szfy-my-effect-particle {
      position: absolute;
      opacity: 0.8;
      animation: szfy-my-effect-float linear infinite;
    }
    
    @keyframes szfy-my-effect-float {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        transform: translateY(-20px) rotate(360deg);
        opacity: 0;
      }
    }
  `,
  
  html: `
    <div class="szfy-my-effect" id="szfy-my-effect-container" aria-hidden="true"></div>
  `,
  
  js: `
    (function() {
      const container = document.getElementById('szfy-my-effect-container');
      if (!container) return;
      
      // Your effect logic here
      const particles = [];
      const maxParticles = 50;
      
      function createParticle() {
        if (particles.length >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'szfy-my-effect-particle';
        particle.textContent = '❄️';
        
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        
        container.appendChild(particle);
        particles.push(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            const index = particles.indexOf(particle);
            if (index > -1) particles.splice(index, 1);
          }
        }, duration * 1000);
      }
      
      const interval = setInterval(createParticle, 300);
      
      // IMPORTANT: Cleanup function to prevent memory leaks
      container._szfyDestroy = function() {
        clearInterval(interval);
        particles.forEach(p => {
          if (p.parentNode) p.parentNode.removeChild(p);
        });
        particles.length = 0;
      };
    })();
  `
};

// Auto-inject if SeazonifyController is available (for CDN builds)
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(myVisualEffect);
}

// Export for module systems (required)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: myVisualEffect };
}
```

### Audio Effect Template

```javascript
// Seazonify Audio Effect Template

const myAudioEffect = {
  // ==================== METADATA ====================
  name: "Effect Name",
  description: "Short description within 50 characters.",
  icon: "🔊",
  type: "audio",          // Must be "audio"
  author: "Your Name",
  thumbnail: "https://your-cdn.com/path/to/thumbnail.webp",
  license: "https://seazonify.com/license", // Don't change this
  version: "1.0.0",
  created: "2025-01-15",
  category: "ambient",
  tags: ["nature", "relaxing", "ambience"],
  
  // ==================== AUDIO PROPERTIES ====================
  url: "https://your-cdn.com/path/to/audio.mp3", // Required: MP3 file URL
  loop: true,      // Optional: whether to loop (default: false)
  volume: 0.5      // Optional: volume level 0.0-1.0 (default: 1.0)
};

// Auto-inject if SeazonifyController is available (for CDN builds)
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectAudioEffect(myAudioEffect);
}

// Export for module systems (required)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { audio: myAudioEffect };
}
```

### Combo Effect Template

```javascript
// Seazonify Combo Effect Template (Visual + Audio)

// Define the visual component
const myVisualEffect = {
  name: "Spring Bloom Visual",
  description: "Flowers blooming and growing animation",
  icon: "🌸",
  type: "visual",
  author: "Your Name",
  thumbnail: "https://your-cdn.com/path/to/thumbnail.webp",
  license: "https://seazonify.com/license", // Don't change this
  version: "1.0.0",
  created: "2025-01-15",
  category: "seasonal",
  tags: ["spring", "bloom", "flowers"],
  
  css: `
    .szfy-spring-bloom {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    }
    /* Your CSS here */
  `,
  html: `<div class="szfy-spring-bloom" id="szfy-spring-bloom-container"></div>`,
  js: `
    const container = document.getElementById('szfy-spring-bloom-container');
    // Your JS here
    
    // Cleanup
    container._szfyDestroy = () => {
      // Clear intervals, remove listeners
    };
  `
};

// Define the audio component
const myAudioEffect = {
  name: "Spring Birds Audio",
  description: "Birds chirping and nature sounds",
  icon: "🐦",
  type: "audio",
  url: "https://your-cdn.com/path/to/birds.mp3",
  loop: true,
  volume: 0.3
};

// Auto-inject both if SeazonifyController is available
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(myVisualEffect);
  window.SeazonifyController.injectAudioEffect(myAudioEffect);
}

// Export both components (required)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    visual: myVisualEffect, 
    audio: myAudioEffect 
  };
}
```

---

## Hard Rules

These rules are enforced during validation and must be followed:

### For All Effects

1. **Prefixing** (Visual Effects Only)
   - All CSS classes, IDs, and data attributes **must** start with `szfy-`
   - Example: `.szfy-snowflake`, `#szfy-container`, `data-szfy-state`
   - This prevents conflicts with the host website's styles

2. **Thumbnail**
   - Must be `.webp` format
   - Recommended size: 150×150 pixels
   - Must be publicly accessible via HTTPS
   - Should visually represent your effect

3. **License Field**
   - Must include: `license: "https://seazonify.com/license"`
   - Do not modify or remove this field

4. **File Size**
   - Maximum: 100KB
   - Recommended: < 50KB
   - No large inlined assets (images, audio)

5. **File Type**
   - Only `.js` (JavaScript) files
   - Must be valid, parseable JavaScript

6. **Security**
   - No remote code execution (`eval()` of untrusted sources)
   - Only use trusted asset URLs (your own CDN or reputable sources)
   - No accessing `localStorage`, `sessionStorage`, or cookies without user consent

### For Visual Effects

7. **Cleanup Function** (Recommended)
   - If you use timers, `requestAnimationFrame`, or event listeners, expose:
   ```javascript
   container._szfyDestroy = function() {
     clearInterval(myInterval);
     clearTimeout(myTimeout);
     cancelAnimationFrame(myRaf);
     window.removeEventListener('resize', myHandler);
   };
   ```

8. **No Globals**
   - Do not pollute global scope with unprefixed variables
   - Wrap your code in IIFE: `(function() { /* your code */ })();`

9. **Z-index**
   - Use `z-index: 9999` for effect containers
   - Do not hijack pointer events unless your effect is interactive
   - Set `pointer-events: none` on overlay containers

---

## Performance Guidelines

### Visual Effects

1. **CSS Performance**
   - **Prefer** `transform` and `opacity` for animations (GPU-accelerated)
   - **Avoid** animating `width`, `height`, `top`, `left` (causes layout reflow)
   - **Avoid** large `box-shadow` or extreme `blur` (expensive to render)
   - Use `will-change: transform` sparingly and only on actively animating elements

2. **DOM Operations**
   - Batch DOM reads and writes
   - Avoid per-element `getBoundingClientRect()` calls in loops
   - Reuse elements when possible instead of creating/destroying
   - Limit the number of active particles (50-100 max for most effects)

3. **Animations**
   - Use `requestAnimationFrame` for smooth 60fps animations
   - Throttle or pause animations when tab is hidden:
   ```javascript
   document.addEventListener('visibilitychange', () => {
     if (document.hidden) {
       // Pause animations
     } else {
       // Resume animations
     }
   });
   ```

4. **Frame Budget**
   - Target: 60fps (16.67ms per frame)
   - No main-thread tasks > 50ms
   - Test on mid-range devices, not just high-end

### Audio Effects

1. **File Format**
   - Use MP3 for best compatibility
   - Compress audio files (target: < 1MB per file)
   - Bitrate: 128kbps is usually sufficient for ambient sounds

2. **Volume**
   - Default volume should be moderate (0.3-0.5)
   - Allow users to control volume
   - Respect browser autoplay policies

---

## Accessibility

1. **Decorative Elements**
   - Add `aria-hidden="true"` to purely decorative containers
   ```html
   <div class="szfy-snowfall" aria-hidden="true"></div>
   ```

2. **Keyboard Navigation**
   - Do not trap focus or intercept keyboard events unless your effect is intentionally interactive
   - Do not prevent default browser shortcuts

3. **Motion Sensitivity**
   - Respect `prefers-reduced-motion` for users with motion sensitivity:
   ```css
   @media (prefers-reduced-motion: reduce) {
     .szfy-my-effect {
       animation: none;
       opacity: 0.3;
     }
   }
   ```

4. **Screen Readers**
   - Effects should not interfere with screen reader navigation
   - Do not dynamically inject text content that would be read aloud

---

## Compatibility

1. **Browser Support**
   - Test on Chromium (Chrome, Edge)
   - Test on Firefox
   - Test on Safari (WebKit)
   - Verify mobile touch performance on iOS and Android

2. **Feature Detection**
   - Avoid vendor-specific APIs without feature detection
   - Provide graceful fallbacks:
   ```javascript
   if ('IntersectionObserver' in window) {
     // Use IntersectionObserver
   } else {
     // Fallback to scroll events
   }
   ```

3. **Responsiveness**
   - Test on mobile (320px - 480px)
   - Test on tablet (768px - 1024px)
   - Test on desktop (1280px+)
   - Use responsive units (`vw`, `vh`, `%`) where appropriate

---

## Packaging

1. **Dependencies**
   - **No external runtime dependencies**
   - All code must be self-contained in your `.js` file
   - If you absolutely need a library, namespace it to avoid conflicts

2. **Assets**
   - Host thumbnails and assets on a stable, public CDN
   - Ensure HTTPS for all asset URLs
   - Test asset URLs before submission

3. **Licensing**
   - Ensure you own or have license to use all assets
   - Include attribution in code comments if required by license:
   ```javascript
   // Audio: "Forest Ambience" by Artist Name (CC BY 4.0)
   // https://example.com/attribution-link
   ```

---

## Quality Standards

1. **Naming**
   - Names must be descriptive and unique
   - Avoid generic names like "Effect 1" or "Test"
   - Use title case: "Autumn Leaves Classic"

2. **Code Quality**
   - Use clear, self-explanatory variable names
   - Add comments only for non-obvious logic
   - Follow consistent indentation (2 or 4 spaces)

3. **Public API**
   - Keep the object shape unchanged
   - Do not add custom properties that break the template
   - Seazonify Controller depends on this structure

---

## Testing Your Effect

### Using Seazonify Lab

1. **Access the Lab**
   - Go to: `https://app.seazonify.com/lab`
   - You must be logged in

2. **Upload Your Effect**
   - Click "Choose File" or drag your `.js` file
   - File must be under 100KB
   - Validation runs automatically

3. **Test in Preview**
   - Click the effect card to activate it
   - Preview will show your effect in action
   - Test on different device modes (mobile, tablet, desktop)

4. **Verify Functionality**
   - ✅ Visuals render as expected; no layout shifts
   - ✅ Console has no errors or warnings
   - ✅ Performance is smooth (60fps on mid-range devices)
   - ✅ Cleanup works: stopping the effect removes all DOM nodes and clears timers
   - ✅ Responsiveness: scales properly on mobile, tablet, desktop
   - ✅ No conflicts with website content

5. **Submit for Review**
   - Once tested, click "Submit Effect"
   - Add optional notes for reviewers
   - You'll receive email notification when reviewed

---

## Submission Process

### Step 1: Test Your Effect

1. Upload your `.js` file in the Lab
2. Click the effect card to activate it in the preview
3. Test thoroughly across different scenarios

### Step 2: Submit

1. Click "Submit Effect" button
2. Add any notes for reviewers (optional)
3. Confirm submission

### Step 3: What Happens Next

1. **Submission Recorded**
   - Your submission is saved
   - You earn +10 points immediately
   - Admin receives email notification

2. **Review Process**
   - Admin reviews your effect file
   - Checks code quality, performance, security
   - Tests on multiple devices/browsers

3. **Notification**
   - You receive email when review is complete
   - Check "Submissions" tab in Lab for status

---

## Submission Checklist

Before submitting, ensure all items are checked:

### Required Checks

- [ ] **Prefixing:** All classes/ids/data attributes use `szfy-` prefix (visual effects)
- [ ] **Thumbnail:** `.webp` format, ~150×150 px, representative. Host anywhere, just give publicly accessible URL.
- [ ] **Responsiveness:** Scales properly for mobile, tablet, desktop
- [ ] **Performance:** Uses CSS transforms/opacity; avoids heavy paints
- [ ] **Frame Budget:** Steady 60fps on mid-range devices; no long tasks (>50ms)
- [ ] **Memory:** No leaked timers/listeners; observers detached on destroy
- [ ] **Cleanup:** Implements `container._szfyDestroy` if using timers/RAF/listeners
- [ ] **No Globals:** No unprefixed global CSS or window-scoped variables
- [ ] **Z-index:** Respects host UI; doesn't hijack pointer events (unless intended)
- [ ] **Accessibility:** Decorative containers use `aria-hidden="true"`
- [ ] **Metadata:** Complete name, description, author, version, dates
- [ ] **Category/Tags:** One category selected; up to 5 concise tags
- [ ] **File Size:** Source < 100KB (recommended < 50KB)
- [ ] **File Type:** Only `.js` file
- [ ] **Security:** No remote code eval; only trusted asset URLs
- [ ] **Attribution:** Includes attribution in comments if license requires it

### Testing Checks

- [ ] Tested on Chrome/Edge (Chromium)
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile device or mobile viewport
- [ ] Console shows no errors or warnings
- [ ] Effect can be toggled on/off without issues
- [ ] No visual artifacts or layout shifts
- [ ] Smooth performance (no frame drops)

---

## Review Process

### Review Criteria

Your effect will be evaluated on:

1. **Code Quality**
   - Clean, readable code
   - Proper error handling
   - Follows best practices

2. **Performance**
   - 60fps on mid-range devices
   - No memory leaks
   - Efficient DOM operations

3. **Creativity**
   - Unique concept
   - Visual appeal
   - Smooth animations

4. **Compatibility**
   - Works across browsers
   - Responsive design
   - No conflicts

5. **Security**
   - No security vulnerabilities
   - Trusted asset sources
   - Proper cleanup

### Review Outcomes

1. **Approved ✅**
   - Your effect is added to the library
   - You earn points
   - Production URL provided
   - Effect becomes publicly available

2. **Needs Changes ⚠️**
   - Reviewer provides specific feedback
   - You can resubmit after fixes
   - No point deduction

3. **Rejected ❌**
   - Effect doesn't meet quality standards
   - Points deducted
   - Reviewer explains reasons
   - You can create a new, improved version

### Review Timeline

- **Pending Review:** 1-3 business days
- **Email Notification:** Sent immediately upon review
- **Check Status:** Visit Lab → Submissions tab

---

## Leaderboard & Points System at Seazonify Leaderboard

### Points Breakdown

| Action | Points |
|--------|--------|
| Submit Effect | +10 |
| Effect Approved | +50 |
| Effect Rejected | -5 |

### Ranking at Seazonify Leaderboard

Contributors are ranked by:
1. **Primary:** Contribution Score (total points)
2. **Tiebreaker:** Last Submission Date (earlier = higher rank)

### Contribution Score Formula

```
Contribution Score = 
  (Submissions × 10) + 
  (Approved Effects × 50) - 
  (Rejected Effects × 5)
```

### Leaderboard Display

View top contributors at: `https://seazonify.com/contributors?tab=leaderboard` → Leaderboard tab

Shows:
- Rank (top 3 get special badges)
- User name and avatar
- Total submissions
- Approved effects
- Pending effects
- Contribution score

---

## Categories Reference

Choose **one** category that best fits your effect:

**Weather & Nature:**
- Rain Effects
- Snow Effects
- Storm Effects
- Sunny Effects
- Cloudy Effects
- Wind Effects

**Environment:**
- Ocean Effects
- Forest Effects
- Desert Effects
- Mountain Effects
- Jungle Effects
- Arctic Effects
- Tropical Effects

**Seasonal:**
- Seasonal Effects
- Flower Effects

**Time of Day:**
- Night Effects
- Morning Effects
- Evening Effects

**Mood & Atmosphere:**
- Relaxation Effects
- Energetic Effects
- Ambient Effects
- Mystical Effects
- Romantic Effects

**Events & Occasions:**
- Party Effects
- Cultural Effects
- Religious Effects
- Holiday Effects
- Wedding Effects
- Occasional Effects

**Visual Styles:**
- Neon Effects
- Vintage Effects
- Minimal Effects
- Vibrant Effects
- Monochrome Effects
- Gothic Effects
- Artistic Effects
- Abstract Effects

**Interactive:**
- Interactive Effects
- Background Effects

**Themed:**
- Space Effects
- Urban Effects
- Fire Effects
- Crystal Effects
- Liquid Effects

**Industry:**
- Business Effects
- Gaming Effects
- Music Effects
- Sports Effects
- Food Effects
- Travel Effects
- Health Effects
- Education Effects
- Fashion Effects
- Technology Effects

**Special:**
- Special Effects

---

## Resources

### Community & Support

- **Discord Community:** https://discord.gg/HknBRy9h46
- **GitHub Examples:** https://github.com/iMiMofficial/Seazonify/tree/main/assets/effects
- **Documentation:** https://seazonify.com/aura/docs/
- **Status:** https://seazonify.com/status

### Development Tools

- **Lab (Testing):** https://app.seazonify.com/lab
- **Workspace (Preview):** https://app.seazonify.com/workspace

### Example Effects

Browse our GitHub repository to see production-ready effects:

- **Visual Effects:** `/assets/effects/visual/src/`
- **Audio Effects:** `/assets/effects/audio/src/`
- **Combo Effects:** `/assets/effects/combo/src/`

### Contact

- **Email:** support@seazonify.com
- **Discord:** https://discord.gg/HknBRy9h46
- **Twitter:** https://twitter.com/seazonify

---

## Frequently Asked Questions

### Can I use external libraries?

No. All effects must be self-contained. External dependencies can cause conflicts and increase file size.

### What audio formats are supported?

MP3 is required. Ensure your audio file is hosted on a reliable CDN with HTTPS.

### Can I update my submitted effect?

Not directly. If your effect needs changes, submit a new version with an updated version number (e.g., `v1.0.0` → `v1.1.0`).

### How long before my effect is reviewed?

Typically 1-3 business days. You'll receive an email when it's reviewed.

### Can I see my rejected effect's feedback?

Yes! Go to Lab → Submissions tab. Click on your submission to see reviewer notes.

### Do I retain copyright of my effect?

Yes! You retain copyright. By submitting, you grant Seazonify a license to distribute your effect under the Seazonify License.

### Can I monetize my effect?

Not directly. However, high-quality contributors may be invited to join our partner program or offered partnership.

### What happens to approved effects?

They are:
- Added to the Seazonify Effects Library
- Available to all users
- Hosted on our CDN
- Credited to you (author name displayed)

---

## Best Practices

### Visual Effects

1. **Start Simple**
   - Begin with a basic particle system
   - Add complexity gradually
   - Test performance at each step

2. **Optimize for Mobile**
   - Reduce particle count on small screens
   - Simplify animations on low-end devices
   ```javascript
   const isMobile = window.innerWidth < 768;
   const maxParticles = isMobile ? 20 : 50;
   ```

3. **Use CSS Animations When Possible**
   - CSS animations are GPU-accelerated
   - JavaScript should only update positions occasionally
   - Let CSS handle the smooth transitions

### Audio Effects

1. **Loop Seamlessly**
   - Ensure your audio file loops without clicks or pops
   - Use audio editing software to create perfect loops
   - Test the loop in the Lab preview

2. **Appropriate Volume**
   - Ambient sounds: 0.2-0.4
   - Music: 0.3-0.5
   - Sound effects: 0.5-0.7
   - Avoid volumes > 0.8 (too loud)

3. **File Optimization**
   - Trim silence from start/end
   - Normalize audio levels
   - Use appropriate bitrate (128kbps for most ambient sounds)

### Combo Effects

1. **Synchronization**
   - Visual and audio should complement each other
   - Match animation intensity to audio dynamics
   - Example: Heavy snowfall = louder wind sounds

2. **Performance**
   - Combo effects use more resources
   - Keep both components lightweight
   - Test combined effect thoroughly

---

## Common Mistakes to Avoid

### ❌ Don't Do This

```javascript
// Missing szfy- prefix
.snowflake { /* BAD */ }

// Animating layout properties
.particle {
  animation: move 2s infinite;
}
@keyframes move {
  to { top: 100vh; } /* BAD - causes reflow */
}

// No cleanup
setInterval(() => createParticle(), 100); /* BAD - leaks memory */

// Accessing host page directly
document.body.style.background = 'red'; /* BAD - modifies host page */
```

### ✅ Do This Instead

```javascript
// Proper szfy- prefix
.szfy-snowflake { /* GOOD */ }

// Animating transform
.szfy-particle {
  animation: szfy-move 2s infinite;
}
@keyframes szfy-move {
  to { transform: translateY(100vh); } /* GOOD - GPU accelerated */
}

// Proper cleanup
const interval = setInterval(() => createParticle(), 100);
container._szfyDestroy = () => {
  clearInterval(interval); /* GOOD - prevents leaks */
};

// Keep effect isolated
const container = document.getElementById('szfy-my-effect-container');
// Work only within your container /* GOOD */
```

---

## Advanced Techniques

### 1. Object Pooling

Reuse particles instead of creating/destroying:

```javascript
const particlePool = [];
const activeParticles = [];

function getParticle() {
  return particlePool.pop() || createNewParticle();
}

function recycleParticle(particle) {
  particle.style.display = 'none';
  particlePool.push(particle);
}
```

### 2. Throttling Based on Performance

```javascript
let lastFrameTime = performance.now();
let fps = 60;

function update(currentTime) {
  const delta = currentTime - lastFrameTime;
  fps = 1000 / delta;
  lastFrameTime = currentTime;
  
  // Reduce particle creation if FPS drops
  if (fps < 30) {
    maxParticles = Math.max(10, maxParticles - 5);
  }
  
  requestAnimationFrame(update);
}
```

### 3. Lazy Initialization

```javascript
let initialized = false;

function init() {
  if (initialized) return;
  initialized = true;
  
  // Heavy initialization here
  createParticles();
  setupEventListeners();
}

// Only initialize when effect is visible
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    init();
  }
});
observer.observe(container);
```

---

## Version Control

### Semantic Versioning

Use semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes to effect behavior
- **MINOR:** New features, improvements
- **PATCH:** Bug fixes, small tweaks

Examples:
- `1.0.0` - Initial release
- `1.1.0` - Added new particle types
- `1.1.1` - Fixed performance issue
- `2.0.0` - Complete rewrite with different behavior

### Updating Effects

To submit an updated version:
1. Increment version number in metadata
2. Update `updated` field to current date
3. Submit as new effect with updated version
4. Previous version remains in library (unless deprecated)

---

## Troubleshooting

### Effect not showing in preview?

1. Check browser console for errors
2. Verify all required fields are present
3. Ensure `szfy-` prefixes are used in CSS selectors
4. Check that container element is created in HTML

### Validation errors?

1. **"Effect must have a 'name' property"**
   - Ensure your effect object has a `name` field

2. **"File size exceeds 100KB"**
   - Compress your code
   - Remove unnecessary comments
   - Minify if needed

3. **"Invalid thumbnail format"**
   - Use `.webp` format only
   - Ensure URL is publicly accessible

### Performance issues?

1. Tweak your code as you need
2. Use CSS animations instead of JavaScript
3. Implement object pooling
4. Add throttling based on FPS
5. Pause animations when tab is hidden

### Effect conflicts with website?

1. Ensure all selectors use `szfy-` prefix
2. Don't modify host page elements
3. Use high z-index (9999) to stay on top
4. Set `pointer-events: none` if not interactive

---

## Support

Need help? We're here for you!

- **Discord:** https://discord.gg/HknBRy9h46 (fastest response)
- **Email:** support@seazonify.com
- **Docs:** https://seazonify.com/aura/docs/

---

## License

By submitting an effect to Seazonify, you agree that:

1. You retain copyright of your work
2. You grant Seazonify a non-exclusive, worldwide license to distribute your effect
3. Your effect will be licensed under the Seazonify License
4. You will be credited as the author
5. You confirm you have rights to all assets used

Full license: https://seazonify.com/license

---

## Credits

Thank you to all our contributors who make Seazonify magical! 🍁

**Top Contributors:** View the leaderboard at https://seazonify.com/contributors?tab=leaderboard

**Featured Effects:** Check out the best effects in our library at https://app.seazonify.com/workspace

---

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Create Effects**
   - Design visual effects
   - Compose audio ambiences
   - Build combo experiences
   - Submit via [Lab](https://app.seazonify.com/lab)

2. **Report Bugs**
   - Found a bug? [Report it on Discord](https://discord.gg/HknBRy9h46)
   - Include steps to reproduce
   - Screenshots/videos help!

3. **Suggest Features**
   - Have an idea? Share it on [Discord](https://discord.gg/HknBRy9h46)
   - Or create a feature request

4. **Improve Documentation**
   - Fix typos
   - Add examples
   - Clarify instructions
   - Submit pull requests

5. **Spread the Word**
   - Star the repo ⭐
   - Share on social media
   - Write a blog post
   - Recommend to friends

### Contribution Guidelines

- Follow the coding standards in this document
- Test your changes thoroughly
- Write clear commit messages
- Update documentation if needed
- Be respectful and constructive

---

## 📜 License

This project is licensed under the Seazonify License.

- **Effects:** Community contributions under Seazonify License
- **Assets:** Respective creator licenses (see attribution in files)

See [LICENSE](https://seazonify.com/license) for full details.

---

## 🌟 Acknowledgments

### Special Thanks

- 🎨 All effect contributors
- 🐛 Bug reporters and testers
- 💡 Feature idea contributors
- 📖 Documentation improvers
- ❤️ Our amazing community

---

## 📞 Contact & Support

### Get Help

- **Discord Community:** https://discord.gg/HknBRy9h46 (fastest)
- **Email:** support@seazonify.com
- **Documentation:** https://seazonify.com/aura/docs/

### Social Media

- **Twitter:** https://twitter.com/seazonify
- **Facebook:** https://facebook.com/seazonify
- **LinkedIn:** https://linkedin.com/company/seazonify
- **GitHub:** https://github.com/iMiMofficial/Seazonify

### All Inquiries

- **Email:** social@seazonify.com

---

## 🎓 Learn More

### Resources

- **Documentation:** https://seazonify.com/aura/docs/
- **Blog:** https://seazonify.com/aura/blogs/
- **Examples:** https://github.com/iMiMofficial/Seazonify/tree/main/assets/effects
- **API Docs:** https://seazonify.com/aura/docs/api/
- **Video Tutorials:** Coming soon

### Tutorials

- [Getting Started Guide](https://seazonify.com/aura/docs/getting-started)
- [Creating Your First Effect](https://seazonify.com/aura/docs/first-effect)
- [Advanced Effect Techniques](https://seazonify.com/aura/docs/advanced)
- [API Integration Guide](https://seazonify.com/aura/docs/api-guide)

---

## 📊 Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/iMiMofficial/Seazonify?style=for-the-badge)
![GitHub Forks](https://img.shields.io/github/forks/iMiMofficial/Seazonify?style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues/iMiMofficial/Seazonify?style=for-the-badge)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/iMiMofficial/Seazonify?style=for-the-badge)

**Join our growing community of creators!**

[🚀 Start Creating Effects](https://app.seazonify.com/lab) • [👥 Join Discord](https://discord.gg/HknBRy9h46)

</div>

---

## 🗺️ Roadmap

### Current Features ✅

- [x] Effect library with 50+ effects
- [x] Live workspace preview
- [x] Effect Lab for testing
- [x] Submission & review system
- [x] Analytics dashboard
- [x] Scheduling system
- [x] API access (Pro)
- [x] Leaderboard system for contributors

### Coming Soon 🚀

- [ ] Revenue sharing for creators
- [ ] Advanced effect editor (visual UI)
- [ ] Effect versioning system
- [ ] A/B testing for effects
- [ ] Webhooks for effect events
- [ ] WordPress plugin
- [ ] Shopify integration
- [ ] Other platform integration

### Long-term Vision 🌟

- AI-powered effect generation
- Real-time collaboration on effects
- Effect analytics per-effect
- Custom branding options
- White-label solution
- Enterprise self-hosted option

---

## 🏆 Top Contributors

View our leaderboard at: [https://seazonify.com/contributors?tab=leaderboard](https://seazonify.com/contributors?tab=leaderboard)

**Hall of Fame:**
- 🥇 Top contributors earn special badges
- 🎖️ Featured in our community spotlight
- 💎 Early access to new features
- 🎁 Potential partnership opportunities

---

## 📄 Documentation Files

- **README.md** - This file (project overview & setup)
- **VISUAL_EFFECT_TEMPLATE.md** - Visual effect template guide

---

**Last Updated:** October 8, 2025  
**Version:** 2.0.0  
**Maintained by:** Seazonify Team

<div align="center">

---

Made with ❤️ by the Seazonify Team

[Website](https://seazonify.com) • [App](https://app.seazonify.com) • [Discord](https://discord.gg/HknBRy9h46) • [GitHub](https://github.com/iMiMofficial/Seazonify)

**⭐ Star us on GitHub if you find Seazonify helpful!**

</div>

