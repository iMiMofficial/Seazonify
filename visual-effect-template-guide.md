## Seazonify Visual Effect Template

Create visual effects that plug into the Seazonify Controller. You fully control the contents of `css`, `html`, and `js`. This guide only enforces structure, naming, and export format.

### Table of Contents
- [Requirements](#requirements)
- [Template (copy-paste)](#template-copy-paste)
- [Hard Rules](#hard-rules)
- [Categories (reference)](#categories-reference)
- [Usage](#usage)
- [Test your effect (Seazonify Lab)](#test-your-effect-seazonify-lab)
- [How to submit](#how-to-submit)
- [Checklist](#checklist)
- [Guidelines](#guidelines)

### Requirements
- Keep the object shape as shown below
- Prefix all classes/ids/data attributes with `szfy-`
- Provide a `.webp` thumbnail (recommended 150×150 px)
- Export in a way Seazonify can load; auto-inject for CDN builds

### Template (copy-paste)
```javascript

// Seazonify Visual Effect (Template) — you control css/html/js

// You can name the below const as per your effect name
// While naming the effect, keep it unique and descriptive

const myEffect = {
  // — Metadata —
  name: "Effect Name",
  description: "Short description within 50 characters.",
  icon: "✨",              // Emoji that represents your effect
  type: "visual",          // Do not change
  author: "Your Name",
  thumbnail: "https://your-cdn/path/to/150x150.webp", // host publicly or include with submission
  license: "https://seazonify.com/license", // don't change this
  version: "1.0.0",
  created: "YYYY-MM-DD",
  updated: "YYYY-MM-DD",
  category: "effect-category", // See Categories (reference) below and pick one
  tags: ["tag1", "tag2"], // up to 5 tags recommended

  // — Implementation —
  // IMPORTANT: Prefix all selectors/ids/data keys with 'szfy-'
  css: `
    /* Your CSS (prefixed) */
  `,
  html: `
    <!-- Your HTML (prefixed) -->
  `,
  js: `
    // Your JS. If you set timers/listeners/RAF, also expose cleanup:
    // container._szfyDestroy = () => { /* cleanup */ }
  `
};

// Auto-inject if SeazonifyController is available (for CDN builds). Don't remove this code.
if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(myEffect);
}

// Export for module systems. Don't remove this code.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { visual: myEffect };
}
```

Check production ready effect files here: [visual effects folder](assets/effects/visual/src/)

### Hard Rules
- **Prefixing**: use `szfy-` for all classes/ids/data attributes
- **Thumbnail**: must be `.webp` (recommended 150×150 px)
- **Cleanup (recommended)**: if you add timers, RAF, or listeners, expose `container._szfyDestroy`
- **License**: keep the `license` field present and unchanged

### Categories (reference)
- Rain Effects
- Snow Effects
- Storm Effects
- Sunny Effects
- Cloudy Effects
- Ocean Effects
- Forest Effects
- Flower Effects
- Fire Effects
- Wind Effects
- Night Effects
- Morning Effects
- Evening Effects
- Party Effects
- Cultural Effects
- Relaxation Effects
- Energetic Effects
- Seasonal Effects
- Background Effects
- Special Effects
- Space Effects
- Urban Effects
- Space Effects
- Urban Effects
- Desert Effects
- Mountain Effects
- Jungle Effects
- Arctic Effects
- Tropical Effects
- Mystical Effects
- Neon Effects
- Vintage Effects
- Minimal Effects
- Vibrant Effects
- Monochrome Effects
- Crystal Effects
- Liquid Effects
- Gothic Effects
- Artistic Effects
- Interactive Effects
- Ambient Effects
- Abstract Effects
- Religious Effects
- Romantic Effects
- Occasional Effects
- Holiday Effects
- Wedding Effects
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
- Space Effects
- Urban Effects
- Vintage Effects
- Abstract Effects
- Interactive Effects

Choose the single category that best fits your effect.

### Usage
- Programmatic: `SeazonifyController.injectVisualEffect(myEffect)`
- CDN builds can self-inject via the template’s auto-inject block

### Test your effect (Seazonify Lab)
- Open the Lab: `https://app.seazonify.com/lab` (you need to have an account at Seazonify).
- Click "Choose effect" and select your effect `.js` file from your machine.
- The Lab will preview the effect and expose controls to inspect behavior.
- Verify:
  - Visuals render as expected; no layout shifts.
  - Console has no errors/warnings.
  - Performance is smooth (target 60fps on mid-range devices).
  - Cleanup works: stopping/removing the effect frees timers/listeners and DOM nodes.
  - Responsiveness across viewport sizes (mobile, tablet, desktop).

### How to submit
- From the Lab (`https://app.seazonify.com/lab`), after testing, click "Submit".
- Fill the submission form (name, email, effect name, category, tags, description).
- Upload your `.js` file (must follow the template) and `.webp` thumbnail (~150×150 px).
- Confirm license/attribution. The license field in your file must remain unchanged.
- Our validator checks: object shape, `szfy-` prefixes, size limits, thumbnail format, and category.
- Once approved by maintainers, we will place the file under `/assets/effects/visual/src/` and publish it.

### Checklist
- **Prefixing**: all classes/ids/data attributes use `szfy-`
- **Thumbnail**: `.webp`, ~150×150 px, representative
- **Responsiveness**: scales for mobile, tablet, desktop
- **Performance**: uses CSS transforms/opacity when possible; avoids heavy paints
- **Frame budget**: steady 60fps on mid-range devices; no long main-thread tasks (>50ms)
- **Memory**: no leaked timers/listeners; detach observers on destroy
- **Cleanup**: implements `container._szfyDestroy` if timers/RAF/listeners are used
- **No globals**: no unprefixed global CSS or window-scoped vars
- **Z-index**: respect host UI; avoid hijacking pointer events unless intended
- **Accessibility**: decorative containers use `aria-hidden="true"`
- **Metadata**: set `name`, `description`, `author`, dates, and `version`
- **Category/Tags**: choose one category; up to 5 concise tags
- **Effect File size**: keep source smaller than 100kb max, recommended < 50kb; no large inlined assets
- **Effect File type**: only .js file.
- **Security**: no remote code eval; only trusted asset URLs
 - **Attribution**: include attribution in code/comments if a license requires it

### Guidelines
- **Performance**
  - Prefer `transform` and `opacity`; avoid large `box-shadow`, huge `blur`, or layout thrash.
  - Batch DOM writes/reads; avoid per-element `getBoundingClientRect()` in hot loops.
  - Use `requestAnimationFrame` for animations; throttle work when tab is hidden.

- **Accessibility**
  - Mark purely decorative wrappers with `aria-hidden="true"`.
  - Do not trap focus or intercept keyboard unless your effect is interactive by design.

- **Compatibility**
  - Avoid vendor-specific APIs unless you feature-detect with fallbacks.
  - Test on Chromium, Firefox, Safari; verify mobile touch performance.

- **Packaging**
  - No external runtime dependencies. If absolutely needed, namespace them and avoid globals.
  - Host thumbnails/assets on a stable public path or include them in your submission.
  - Ensure you own or have a license to use all thumbnails/assets; include attribution and license details in your code if required.

- **Quality**
  - Names are descriptive and unique.
  - Comments explain non-obvious logic and invariants only.
  - Keep the public shape unchanged so Seazonify can load your effect reliably.

## Thanks for your love and support 🍁
