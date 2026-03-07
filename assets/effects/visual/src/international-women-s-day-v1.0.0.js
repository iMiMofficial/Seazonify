// International Women's Day Effect v1.0.0 for Seazonify Controller
// Breathtaking Fairy Silhouette floating gracefully leaving a trail of love!
// Triggers randomly every 30-60 seconds across the screen.
// Performance-optimized with device detection
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(internationalWomensDayEffect);

const internationalWomensDayEffect = {
  name: "International Women's Day",
  description: "A breathtaking silhouette of a majestic fairy woman floating gracefully across the screen, leaving behind a beautiful trail of glowing hearts, petals, and sparkles. Triggers dynamically every 30-60 seconds for an impactful, mesmerizing experience.",
  author: "Md Mim Akhtar",
  type: "visual",
  icon: "🦋",
  thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/international-women.webp",
  license: "https://seazonify.com/license",
  version: "1.0.0",
  created: "2026-03-01",
  category: "celebration",
  tags: ["women", "fairy", "silhouette", "hearts", "floating", "dynamic", "international womens day", "beautiful"],
  css: `
    .szfy-iwd-container {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    /* ── Edge Blossoms ── */
    .szfy-iwd-edge-flower {
      position: fixed;
      pointer-events: none;
      will-change: transform, opacity;
      filter: drop-shadow(0 6px 15px rgba(0, 0, 0, 0.25)) drop-shadow(0 2px 5px rgba(255, 64, 129, 0.4));
      z-index: 9990;
      opacity: 0;
      /* Smooth fade in and out */
      transition: opacity 2s ease, transform 4s ease-out;
    }
    .szfy-iwd-edge-flower svg {
      display: block;
      width: 100%; height: 100%;
    }

    /* ── Trail Particles ── */
    .szfy-iwd-trail-particle {
      position: absolute;
      pointer-events: none;
      animation: szfy-iwd-trail-drift var(--tdur) ease-out forwards;
      will-change: transform, opacity;
      z-index: 90;
    }
    .szfy-iwd-trail-particle svg {
      width: 100%; height: 100%;
      filter: drop-shadow(0 2px 8px rgba(255, 64, 129, 0.4));
    }

    @keyframes szfy-iwd-trail-drift {
      0% { 
        transform: translate(0, 0) scale(var(--s1)) rotate(0deg); 
        opacity: 0; 
      }
      15% { 
        opacity: var(--topa); 
      }
      100% { 
        transform: translate(var(--tx), var(--ty)) scale(var(--s2)) rotate(var(--tspin)); 
        opacity: 0; 
      }
    }

    /* ── Butterflies ── */
    .szfy-iwd-butterfly {
      position: absolute;
      top: 0; left: 0;
      pointer-events: none;
      will-change: transform;
      filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2)) drop-shadow(0 1px 3px rgba(255, 64, 129, 0.3));
      z-index: 110;
    }
    .szfy-iwd-butterfly svg {
      display: block;
      width: 100%; height: 100%;
    }

    /* ── Background Particles ── */
    .szfy-iwd-bg-particle {
      position: fixed;
      pointer-events: none;
      z-index: 9991;
      filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.2));
    }

    /* ── Shimmer Pulse ── */
    @keyframes szfyHeroPulse {
      0% { transform: scale(0.9); opacity: 0.3; filter: brightness(1) drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)); }
      100% { transform: scale(1.15); opacity: 0.9; filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)); }
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      .szfy-iwd-hero, .szfy-iwd-trail-particle, .szfy-iwd-butterfly {
        display: none !important;
      }
    }
  `,
  html: '<div class="szfy-iwd-container" id="szfy-iwd-container"></div>',
  js: `
    (function() {
      var container = document.getElementById('szfy-iwd-container');
      if (!container) return;

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      /* Minimalist Blooming Effect Variables */
      var edgeTimer;
      var activeEdgeBlossoms = 0;
      var MAX_EDGE_BLOSSOMS = window.innerWidth < 768 ? 6 : 15;

      var paused = false;
      var activeParticles = 0;
      var MAX_PARTICLES = window.innerWidth < 768 ? 40 : 80;

      // Butterfly config
      var butterflies = [];
      var BUTTERFLY_COUNT = window.innerWidth < 768 ? 6 : (window.innerWidth < 1200 ? 12 : 18);
      var LANDING_CHANCE = 0.002; // Chance per frame to seek an element
      var possibleElements = [];

  var btTemplates = [
    // Type 0: Classic (Spring Bloom)
    function (c, v) {
      return '<svg viewBox="-20 -20 40 40">' +
        '<g class="szfy-wings">' +
        '<path d="M 0 -8 Q -2 -12 -4 -14" fill="none" stroke="#222" stroke-width="0.8"/>' +
        '<path d="M 0 -8 Q 2 -12 4 -14" fill="none" stroke="#222" stroke-width="0.8"/>' +
        '<path d="M -2 -4 Q -15 -15 -18 -2 Q -15 8 -2 2 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 2 -4 Q 15 -15 18 -2 Q 15 8 2 2 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M -2 2 Q -12 6 -8 14 Q -2 12 -1 4 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 2 2 Q 12 6 8 14 Q 2 12 1 4 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '</g>' +
        '<ellipse cx="0" cy="0" rx="1.8" ry="7" fill="#222"/>' +
        '</svg>';
    },
    // Type 1: Swallowtail (Precision)
    function (c, v) {
      return '<svg viewBox="-25 -25 50 50">' +
        '<g class="szfy-wings">' +
        '<path d="M 0 -8 Q -3 -15 -6 -18" fill="none" stroke="#222" stroke-width="0.8"/>' +
        '<path d="M 0 -8 Q 3 -15 6 -18" fill="none" stroke="#222" stroke-width="0.8"/>' +
        '<path d="M -2 -4 Q -18 -18 -22 -2 Q -15 10 -2 3 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 2 -4 Q 18 -18 22 -2 Q 15 10 2 3 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M -2 3 Q -15 8 -12 18 Q -4 15 -1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 2 3 Q 15 8 12 18 Q 4 15 1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '</g>' +
        '<ellipse cx="0" cy="2" rx="1.5" ry="9" fill="#222"/>' +
        '</svg>';
    },
    // Type 2: Broad/Rounded (Precision)
    function (c, v) {
      return '<svg viewBox="-20 -20 40 40">' +
        '<g class="szfy-wings">' +
        '<path d="M 0 -6 Q -1 -10 -2 -12" fill="none" stroke="#222" stroke-width="0.6"/>' +
        '<path d="M 0 -6 Q 1 -10 2 -12" fill="none" stroke="#222" stroke-width="0.6"/>' +
        '<path d="M -1 -2 C -15 -15 -25 5 -1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 1 -2 C 15 -15 25 5 1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M -1 5 C -15 15 -5 20 -1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '<path d="M 1 5 C 15 15 5 20 1 5 Z" fill="' + c + '" stroke="' + v + '" stroke-width="0.3"/>' +
        '</g>' +
        '<ellipse cx="0" cy="4" rx="1.2" ry="6" fill="#111"/>' +
        '</svg>';
    }
  ];

  var particlePals = [
    '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B',
    '#F48FB1', '#FF80AB', '#FF4081', '#F50057', '#FFFFFF', '#FFF9C4'
  ];

  var maxSeating = (window.innerWidth < 768) ? 2 : (window.innerWidth < 1024) ? 3 : 5;
  var MAX_ON_SCREEN = (window.innerWidth < 768) ? 4 : (window.innerWidth < 1024) ? 7 : 10;
  var BUTTERFLY_POOL = MAX_ON_SCREEN; // Hard cap on total spawned population

  var activeSittingCount = 0;
  var occupiedElements = new Set();

  function isElementNearby(bt, el) {
    var r = el.getBoundingClientRect();
var ex = r.left + r.width / 2;
var ey = r.top + r.height / 2;
var dist = Math.sqrt(Math.pow(bt.x - ex, 2) + Math.pow(bt.y - ey, 2));
return dist < 200; // 200px proximity radius
      }

function getPetalSVG(c) {
  var types = [
    // Standard petal
    '<path fill="' + c + '" d="M50 15 C55 35 65 45 85 50 C65 55 55 65 50 85 C45 65 35 55 15 50 C35 45 45 35 50 15 Z"/>',
    // Rounded Rose petal
    '<path fill="' + c + '" d="M50 20 C70 20 80 40 80 60 C80 80 60 90 50 90 C40 90 20 80 20 60 C20 40 30 20 50 20 Z"/>',
    // Long Cherry blossom petal
    '<path fill="' + c + '" d="M50 10 C60 20 70 40 70 60 C70 80 60 90 50 85 C40 90 30 80 30 60 C30 40 40 20 50 10 Z"/>'
  ];
  return '<svg viewBox="0 0 100 100">' + pick(types) + '</svg>';
}
function getDandelionSVG(c) {
  return '<svg viewBox="0 0 100 100">' +
    '<circle cx="50" cy="50" r="2" fill="' + c + '"/>' +
    '<path d="M50 50 L50 20 M50 50 L71 29 M50 50 L80 50 M50 50 L71 71 M50 50 L50 80 M50 50 L29 71 M50 50 L20 50 M50 50 L29 29" stroke="' + c + '" stroke-width="1" stroke-linecap="round"/>' +
    '<circle cx="50" cy="20" r="1.5" fill="' + c + '"/><circle cx="71" cy="29" r="1.5" fill="' + c + '"/>' +
    '<circle cx="80" cy="50" r="1.5" fill="' + c + '"/><circle cx="71" cy="71" r="1.5" fill="' + c + '"/>' +
    '</svg>';
}
function getHeartSVG(c) {
  return '<svg viewBox="0 0 24 24"><path fill="' + c + '" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
}
function getBlossomSVG(c) {
  var id = Math.random().toString(36).substr(2, 9);
  var dur = (Math.random() * 2 + 3).toFixed(1);
  var animScale = '<animateTransform attributeName="transform" type="scale" values="0.95;1.05;0.95" dur="' + dur + 's" repeatCount="indefinite" additive="sum"/>';
  var animRot = '<animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="' + (parseFloat(dur)+1).toFixed(1) + 's" repeatCount="indefinite" additive="sum"/>';
  var animInner = '<animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="' + dur + 's" repeatCount="indefinite" additive="sum"/>';

  function j(val, amt) { return val + (Math.random() * amt * 2 - amt); }
  function pt(r, a) { var rad = a * Math.PI/180; return (Math.cos(rad)*r).toFixed(1) + ',' + (Math.sin(rad)*r).toFixed(1); }

  var types = [
    // 1. Organic Realistic Rose (Layered, overlapping, wavy petals)
    function() {
      var p = pick([
        { m: '#D32F2F', d: '#880E4F', h: '#ff8a80' },
        { m: '#C2185B', d: '#4A148C', h: '#F8BBD0' },
        { m: '#F57C00', d: '#BF360C', h: '#FFCC80' },
        { m: '#FFB300', d: '#E65100', h: '#FFF9C4' }
      ]);
      var str = '<defs>' +
        '<radialGradient id="r1_'+id+'" cx="30%" cy="30%" r="70%">' +
          '<stop offset="0%" stop-color="'+p.h+'"/><stop offset="60%" stop-color="'+p.m+'"/><stop offset="100%" stop-color="'+p.d+'"/>' +
        '</radialGradient>' +
        '<radialGradient id="r2_'+id+'" cx="70%" cy="70%" r="70%">' +
          '<stop offset="0%" stop-color="'+p.h+'"/><stop offset="60%" stop-color="'+p.m+'"/><stop offset="100%" stop-color="'+p.d+'"/>' +
        '</radialGradient></defs><g transform="translate(50,50) scale(0.95)">' + animScale + animRot;
      
      var layers = 6;
      for (var l = 0; l < layers; l++) {
        var num = 6 - Math.floor(l/2); 
        var radius = 45 - l * 7.5;
        var rotOffset = rand(0, 360);
        var g = '<g><animateTransform attributeName="transform" type="rotate" values="'+rotOffset+';'+(rotOffset+4)+';'+rotOffset+'" dur="'+(3+l*0.5)+'s" repeatCount="indefinite" />';
        for(var i=0; i<num; i++) {
           var ang = (360/num)*i;
           var over = (360/num)*1.6; // High overlap
           var p1 = pt(j(radius, 4), ang + over*0.1);
           var p2 = pt(j(radius, 4), ang + over*0.9);
           var p3 = pt(j(10, 2), ang + over);
           var p0 = pt(j(10, 2), ang);
           var fill = (i%2===0)? 'url(#r1_'+id+')' : 'url(#r2_'+id+')';
           var d = 'M'+p0+' C'+p1+' '+p2+' '+p3+' C0,0 0,0 '+p0+' Z';
           g += '<path fill="'+fill+'" d="'+d+'" stroke="'+p.d+'" stroke-width="0.3"/>';
        }
        g += '</g>';
        str += g;
      }
      return str + '</g>';
    },
    // 2. Lotus
    function() {
      var p = { m: '#F48FB1', d: '#AD1457', h: '#FFFFFF' };
      return '<defs>' +
        '<linearGradient id="lotus_' + id + '" x1="0%" y1="100%" x2="0%" y2="0%">' +
          '<stop offset="0%" stop-color="' + p.d + '"/>' +
          '<stop offset="60%" stop-color="' + p.m + '"/>' +
          '<stop offset="100%" stop-color="' + p.h + '"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<g transform="translate(50,50) scale(0.9)">' + animScale +
        '<g>' + animInner + 
          [0, 45, 90, 135, 180, 225, 270, 315].map(function(a) { return '<path fill="url(#lotus_' + id + ')" transform="rotate(' + a + ')" d="M0,10 C20,10 40,-15 0,-45 C-40,-15 -20,10 0,10 Z"/>'; }).join('') +
        '</g>' +
        '<g>' + animRot +
          [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(function(a) { return '<path fill="url(#lotus_' + id + ')" transform="rotate(' + a + ') scale(0.7)" d="M0,10 C20,10 40,-15 0,-45 C-40,-15 -20,10 0,10 Z"/>'; }).join('') +
        '</g>' +
        '<circle cx="0" cy="0" r="8" fill="#FBC02D"/>' +
        '<circle cx="0" cy="0" r="4" fill="#FFF59D"/>' +
      '</g>';
    },
    // 3. Daisy
    function() {
      return '<defs>' +
        '<radialGradient id="daisy_center_' + id + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#FFEB3B"/>' +
          '<stop offset="70%" stop-color="#FBC02D"/>' +
          '<stop offset="100%" stop-color="#F57C00"/>' +
        '</radialGradient>' +
        '<linearGradient id="daisy_petal_' + id + '" x1="0%" y1="100%" x2="0%" y2="0%">' +
          '<stop offset="0%" stop-color="#E0E0E0"/>' +
          '<stop offset="30%" stop-color="#FFFFFF"/>' +
          '<stop offset="100%" stop-color="#FFFFFF"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<g transform="translate(50,50)">' + animRot + animScale +
        [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(function(a) { return '<path fill="url(#daisy_petal_' + id + ')" transform="rotate(' + a + ')" d="M-3,10 C-5,-10 -6,-35 0,-45 C6,-35 5,-10 3,10 Z"/>'; }).join('') +
        '<g>' + animInner + 
          '<circle cx="0" cy="0" r="12" fill="url(#daisy_center_' + id + ')"/>' +
          [0, 60, 120, 180, 240, 300].map(function(a) { var rad = a * Math.PI / 180; return '<circle cx="' + (Math.cos(rad) * 6) + '" cy="' + (Math.sin(rad) * 6) + '" r="1.5" fill="#FF9800" opacity="0.6"/>'; }).join('') +
        '</g>' +
      '</g>';
    },
    // 4. Magnolia
    function() {
      return '<defs>' +
        '<radialGradient id="mag_' + id + '" cx="50%" cy="80%" r="80%">' +
          '<stop offset="0%" stop-color="#F8BBD0"/>' +
          '<stop offset="40%" stop-color="#FFFFFF"/>' +
          '<stop offset="100%" stop-color="#FFFFFF"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<g transform="translate(50,50) scale(1)">' + animScale +
        '<g>' + animInner + 
          [0, 60, 120, 180, 240, 300].map(function(a) { return '<path fill="url(#mag_' + id + ')" transform="rotate(' + a + ')" d="M0,5 C25,5 30,-25 0,-45 C-30,-25 -25,5 0,5 Z"/>'; }).join('') +
        '</g>' +
        [30, 90, 150, 210, 270, 330].map(function(a) { return '<path fill="url(#mag_' + id + ')" transform="rotate(' + a + ') scale(0.8)" d="M0,5 C25,5 30,-25 0,-45 C-30,-25 -25,5 0,5 Z"/>'; }).join('') +
        '<path fill="#E91E63" d="M-3,0 L3,0 L0,-10 Z"/>' +
      '</g>';
    },
    // 5. Jasmine
    function() {
      return '<defs>' +
        '<linearGradient id="jasmine_' + id + '" x1="0%" y1="100%" x2="0%" y2="0%">' +
          '<stop offset="0%" stop-color="#F1F8E9"/>' +
          '<stop offset="100%" stop-color="#FFFFFF"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<g transform="translate(50,50) scale(0.9)">' + animScale + animRot +
        [0, 72, 144, 216, 288].map(function(a) { return '<path fill="url(#jasmine_' + id + ')" transform="rotate(' + a + ')" d="M0,2 C10,-10 15,-30 0,-45 C-10,-25 -5,-5 0,2 Z"/>'; }).join('') +
        '<circle cx="0" cy="0" r="3" fill="#AED581"/>' +
      '</g>';
    },
    // 6. Narcissus
    function() {
      var p = pick([
        { pet: '#FFFFFF', cupEnd: '#FFB300', cupStart: '#FF6F00' },
        { pet: '#FFF59D', cupEnd: '#FBC02D', cupStart: '#F57C00' }
      ]);
      return '<defs>' +
        '<linearGradient id="narcissus_pet_' + id + '" x1="0%" y1="100%" x2="0%" y2="0%">' +
          '<stop offset="0%" stop-color="#E0E0E0"/>' +
          '<stop offset="20%" stop-color="' + p.pet + '"/>' +
          '<stop offset="100%" stop-color="' + p.pet + '"/>' +
        '</linearGradient>' +
        '<radialGradient id="narcissus_cup_' + id + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + p.cupStart + '"/>' +
          '<stop offset="70%" stop-color="' + p.cupEnd + '"/>' +
          '<stop offset="100%" stop-color="' + p.cupStart + '"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<g transform="translate(50,50) scale(0.9)">' + animRot +
        '<g>' + animScale +
          [0, 60, 120, 180, 240, 300].map(function(a) { return '<path fill="url(#narcissus_pet_' + id + ')" transform="rotate(' + a + ')" d="M0,5 C15,-5 20,-35 0,-45 C-20,-35 -15,-5 0,5 Z"/>'; }).join('') +
        '</g>' +
        '<g>' + animInner +
          '<circle cx="0" cy="0" r="12" fill="url(#narcissus_cup_' + id + ')" stroke="' + p.cupStart + '" stroke-width="1.5" stroke-dasharray="2,2"/>' +
          '<circle cx="0" cy="0" r="3" fill="#FFE082"/>' +
        '</g>' +
      '</g>';
    }
  ];
  return '<svg viewBox="0 0 100 100">' + pick(types)() + '</svg>';
}
function getSparkleSVG(c) {
  return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="10" fill="' + c + '" filter="blur(2px)"/><path fill="' + c + '" d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z"/></svg>';
}

function rand(a, b) { return Math.random() * (b - a) + a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

/* ── Butterfly Class ── */
function Butterfly() {
  this.el = document.createElement('div');
  this.el.className = 'szfy-iwd-butterfly';
  this.init();
}
Butterfly.prototype.init = function () {
  this.type = Math.floor(Math.random() * btTemplates.length);

  // Randomize colors - pinks, purples, and rare golds
  var randVal = Math.random();
  if (randVal < 0.6) this.hue = rand(320, 360); // Pinks
  else if (randVal < 0.9) this.hue = rand(240, 300); // Purples/Blues
  else this.hue = rand(20, 60); // Golds/Oranges

  this.color = 'hsl(' + this.hue + ', ' + rand(70, 95) + '%, ' + rand(80, 95) + '%)';
  this.veinColor = 'hsl(' + this.hue + ', ' + rand(50, 70) + '%, ' + rand(30, 50) + '%)';

  this.el.innerHTML = btTemplates[this.type](this.color, this.veinColor);
  this.wingEl = this.el.querySelector('.szfy-wings');

  this.updateSize();

  // Start off-screen at random positions
  var side = Math.floor(Math.random() * 4);
  if (side === 0) { this.x = rand(0, window.innerWidth); this.y = -50; }
  else if (side === 1) { this.x = window.innerWidth + 50; this.y = rand(0, window.innerHeight); }
  else if (side === 2) { this.x = rand(0, window.innerWidth); this.y = window.innerHeight + 50; }
  else { this.x = -50; this.y = rand(0, window.innerHeight); }

  this.vx = 0; this.vy = 0;
  // Physics constants - Reverted to realistic speeds
  // Responsive physics: Scale speeds based on screen size
  var screenScale = Math.max(0.8, window.innerWidth / 1200);
  this.speedMult = rand(0.6, 1.0) * screenScale;
  this.speedMax = rand(1.5, 2.5) * this.speedMult; // Boosted for big screens
  this.accel = rand(0.04, 0.08) * this.speedMult;
  this.flapRate = rand(0.15, 0.22) * this.speedMult;
  this.jitterFactor = rand(0.03, 0.07);
  this.turnFactor = rand(0.04, 0.07);

  this.wingPhase = Math.random() * Math.PI * 2;
  this.state = 'flying';
  this.pickNewTarget();
  this.angle = Math.random() * Math.PI * 2;
  this.sitTimer = 0;
  this.targetElement = null;
  container.appendChild(this.el);
}
Butterfly.prototype.update = function () {
  if (paused) return;

  var wasOnScreen = this.onScreen;
  var margin = 50;
  this.onScreen = (this.x > -margin && this.x < window.innerWidth + margin && this.y > -margin && this.y < window.innerHeight + margin);

  if (this.state === 'sitting') {
    this.sitTimer--;
    if (this.sitTimer <= 0) {
      this.state = 'flying';
      if (this.targetElement) occupiedElements.delete(this.targetElement);
      this.targetElement = null;
      activeSittingCount--;
      this.pickNewTarget();
      this.vx += (Math.random() - 0.5) * 5;
      this.vy += (Math.random() - 0.5) * 5;
    }
    if (this.targetElement) {
      var r = this.targetElement.getBoundingClientRect();
      this.x = r.left + r.width * this.offX;
      this.y = r.top + r.height * this.offY;
    }
  } else {
    if (this.timer <= 0) {
      this.pickNewTarget();
    }
    this.timer--;

    var tx, ty;
    if (this.state === 'seeking' && this.targetElement) {
      var r = this.targetElement.getBoundingClientRect();
      tx = r.left + r.width * this.offX;
      ty = r.top + r.height * this.offY;
    } else {
      tx = this.targetX;
      ty = this.targetY;
    }

    var dx = tx - this.x;
    var dy = ty - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 20) {
      if (this.state === 'seeking') {
        this.state = 'sitting';
        activeSittingCount++;
        this.sitTimer = rand(100, 900); // Highly variable sitting duration
        this.isFlipping = Math.random() < 0.4; // Randomize initial state on landing
      } else {
        this.pickNewTarget();
      }
    } else {
      this.vx += (dx / dist) * this.accel;
      this.vy += (dy / dist) * this.accel;
      this.vx *= 0.98; // Smoother, more fluid movement on all screens
      this.vy *= 0.98;

      // Randomized Jitter
      this.vx += (Math.random() - 0.5) * (this.jitterFactor * 1.5);
      this.vy += (Math.random() - 0.5) * (this.jitterFactor * 1.5);

      var s = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (s > this.speedMax) {
        this.vx = (this.vx / s) * this.speedMax;
        this.vy = (this.vy / s) * this.speedMax;
      }

      this.x += this.vx;
      this.y += this.vy;
    }

    // World Wrapping / Flow logic
    var boundary = 400;
    if (this.x < -boundary) { this.x = window.innerWidth + boundary - 100; this.pickNewTarget(); }
    if (this.x > window.innerWidth + boundary) { this.x = -boundary + 100; this.pickNewTarget(); }
    if (this.y < -boundary) { this.y = window.innerHeight + boundary - 100; this.pickNewTarget(); }
    if (this.y > window.innerHeight + boundary) { this.y = -boundary + 100; this.pickNewTarget(); }

    var moveAngle = Math.atan2(this.vy, this.vx) + Math.PI / 2;
    var diff = moveAngle - this.angle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.angle += diff * this.turnFactor;

    // Seeking check (only if on screen and space in limits)
    if (this.onScreen && this.state === 'flying' && activeSittingCount < maxSeating && Math.random() < LANDING_CHANCE && possibleElements.length > 0) {
      for (var i = 0; i < 5; i++) {
        var el = pick(possibleElements);
        if (!occupiedElements.has(el) && isElementNearby(this, el)) {
          this.targetElement = el;
          occupiedElements.add(el);
          this.state = 'seeking';
          this.offX = rand(0.1, 0.9);
          this.offY = rand(0.1, 0.9);
          break;
        }
      }
    }
  }

  if (this.state === 'sitting') {
    // Occasionally toggle flipping while sitting
    if (Math.random() < 0.01) this.isFlipping = !this.isFlipping;
    if (this.isFlipping) this.wingPhase += 0.04; 
  } else {
    this.wingPhase += this.flapRate;
  }
  this.draw();
}
Butterfly.prototype.pickNewTarget = function () {
  var onScreenCount = butterflies.filter(b => b.onScreen).length;
  var forceExit = onScreenCount >= MAX_ON_SCREEN && this.onScreen && Math.random() < 0.7;
  var forceEntry = onScreenCount < MAX_ON_SCREEN && !this.onScreen && Math.random() < 0.8;

  var spread = 400;
  if (forceExit) {
    // Target far off-screen
    var side = Math.floor(Math.random() * 4);
    if (side === 0) { this.targetX = rand(-spread, window.innerWidth + spread); this.targetY = -spread; }
    else if (side === 1) { this.targetX = window.innerWidth + spread; this.targetY = rand(-spread, window.innerHeight + spread); }
    else if (side === 2) { this.targetX = rand(-spread, window.innerWidth + spread); this.targetY = window.innerHeight + spread; }
    else { this.targetX = -spread; this.targetY = rand(-spread, window.innerHeight + spread); }
  } else if (forceEntry || (onScreenCount < MAX_ON_SCREEN && Math.random() < 0.4)) {
    // Target on-screen - Favour opposite side for longer travel
    var midX = window.innerWidth / 2;
    var midY = window.innerHeight / 2;
    if (this.x < midX) this.targetX = rand(midX, window.innerWidth - 100);
    else this.targetX = rand(100, midX);

    if (this.y < midY) this.targetY = rand(midY, window.innerHeight - 100);
    else this.targetY = rand(100, midY);
  } else {
    // Scatter randomly with large spread
    this.targetX = rand(-spread, window.innerWidth + spread);
    this.targetY = rand(-spread, window.innerHeight + spread);
  }
  // Long commitment timers (doubled)
  this.timer = rand(400, 1000);
}
Butterfly.prototype.draw = function () {
  var wScale;
  if (this.state === 'sitting') {
    if (this.isFlipping) {
      wScale = 0.4 + Math.sin(this.wingPhase) * 0.2; 
    } else {
      // Elegant static resting pose (varies slightly per landing)
      wScale = 0.35; 
    }
  } else {
    // Energetic flight flapping
    wScale = Math.abs(Math.sin(this.wingPhase));
  }

  this.el.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0) rotate(' + (this.angle * 180 / Math.PI) + 'deg)';
  if (this.wingEl) this.wingEl.style.transform = 'scaleX(' + wScale + ')';
}

/* ── Background Constant Particles ── */
// Adds a subtle layer of hearts & petals constantly floating up
var bgInterval, blossomInterval;
var BG_MAX_PARTICLES = window.innerWidth < 768 ? 15 : 30;
var activeBgParticles = 0;

function spawnBgParticle() {
  if (activeBgParticles >= BG_MAX_PARTICLES || paused) return;
  activeBgParticles++;
  var p = document.createElement('div');
  p.className = 'szfy-iwd-bg-particle';
  
  var c = pick(particlePals);
  var type = Math.random();
  if (type < 0.4) p.innerHTML = getPetalSVG(c);
  else if (type < 0.7) p.innerHTML = getDandelionSVG('#fff');
  else if (type < 0.85) p.innerHTML = getHeartSVG(pick(['#FFCDD2', '#F8BBD0', '#E1BEE7']));
  else p.innerHTML = getSparkleSVG('#FFF9C4');

  var isMobile = window.innerWidth < 768;
  var size = isMobile ? rand(15, 28) : (window.innerWidth < 1024 ? rand(22, 35) : rand(28, 48));
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.opacity = '1';
  
  var curX = rand(0, window.innerWidth);
  var curY = -50;
  p.style.left = '0px';
  p.style.top = '0px';
  container.appendChild(p);

  // Responsive falling speed based on screen height
  var screenH = window.innerHeight;
  var speedBase = screenH / 1000;
  var speed = rand(0.8, 1.8) * speedBase; 
  var wind = rand(-0.3, 0.3) * speedBase;
  var angle = 0;
  var driftFreq = rand(0.01, 0.02);
  var driftAmp = rand(0.2, 0.6);
  var curRot = rand(0, 360);
  var rotSpeed = rand(-0.5, 0.5);

  function updateP() {
    if (paused) {
      requestAnimationFrame(updateP);
      return;
    }
    angle += driftFreq;
    curY += speed;
    curX += wind + Math.sin(angle) * driftAmp;
    curRot += rotSpeed;

    p.style.transform = 'translate3d(' + curX + 'px, ' + curY + 'px, 0) rotate(' + curRot + 'deg)';

    if (curY > window.innerHeight + 30) {
      if (p.parentNode) p.parentNode.removeChild(p);
      activeBgParticles--;
    } else {
      requestAnimationFrame(updateP);
    }
  }
  requestAnimationFrame(updateP);
}

/* ── Edge Blossoms Logic ── */
function spawnEdgeBlossom() {
  if (activeEdgeBlossoms >= MAX_EDGE_BLOSSOMS || paused) return;
  activeEdgeBlossoms++;
  var b = document.createElement('div');
  b.className = 'szfy-iwd-edge-flower';

  // Random edge placement: 0=Left, 1=Right, 2=Bottom
  var edge = Math.floor(rand(0, 3));
  if (edge === 0) { // Left edge
    b.style.left = rand(-10, 15) + 'px';
    b.style.top = rand(10, 85) + '%';
  } else if (edge === 1) { // Right edge
    b.style.right = rand(-10, 15) + 'px';
    b.style.top = rand(10, 85) + '%';
  } else { // Bottom edge
    b.style.bottom = rand(-10, 15) + 'px';
    b.style.left = rand(5, 95) + '%';
  }

  var c = pick(['#F48FB1', '#F06292', '#EC407A', '#F8BBD0', '#E1BEE7']);
  b.innerHTML = getBlossomSVG(c);
  
  // Responsive sizes: Mobile, Tablet, Desktop (Reduced max sizes for elegance)
  var isMobile = window.innerWidth < 768;
  var isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  var size = isMobile ? rand(26, 42) : (isTablet ? rand(45, 68) : rand(70, 98));
  
  b.style.width = size + 'px';
  b.style.height = size + 'px';
  
  container.appendChild(b);

  // Force reflow for transitions
  b.offsetHeight;
  b.style.opacity = '1';
  
  // Base rotation and minor sway
  var baseRot = rand(-60, 60);
  var swayAngle = 0;
  var swaySpeed = rand(0.01, 0.03);
  var swayAmp = rand(2, 6);
  b.style.transform = 'scale(1.1) rotate(' + baseRot + 'deg)';

  var lifetime = rand(6000, 12000);
  var swayTimer = setInterval(function () {
    if (paused) return;
    swayAngle += swaySpeed;
    b.style.transform = 'scale(1.1) rotate(' + (baseRot + (Math.sin(swayAngle) * swayAmp)) + 'deg)';
  }, 50);

  setTimeout(function () {
    b.style.opacity = '0'; // Disappear after a while
    setTimeout(function () {
      clearInterval(swayTimer);
      if (b.parentNode) b.parentNode.removeChild(b);
      activeEdgeBlossoms--;
    }, 2000); // Wait for CSS transition to finish
  }, lifetime);
}

/* ── Butterfly Management ── */
var bAnimFrame;
var elUpdateTimer;

function updatePossibleElements() {
  var els = document.querySelectorAll('a, button, h1, h2, h3, p, span, img');
  possibleElements = Array.from(els).slice(0, 150).filter(function (el) {
    if (el.classList.contains('szfy-iwd-butterfly')) return false;
    var rect = el.getBoundingClientRect();
    return rect.width > 20 && rect.height > 20 && rect.top < window.innerHeight && rect.bottom > 0;
  });
}

function loopButterflies() {
  if (!paused) {
    for (var i = 0; i < butterflies.length; i++) {
      butterflies[i].update();
    }
  }
  bAnimFrame = requestAnimationFrame(loopButterflies);
}

/* ── Idle Message System ── */
var msgContainer;
var msgHideTimer, msgCycleTimer;
var idleTimer;
var isIdle = false;

var msgs = [
  "Celebrating her strength & grace.",
  "To the women who inspire us everyday.",
  "Empowered women empower the world.",
  "Here's to strong women: may we know them, may we be them.",
  "A woman is the full circle. Within her is the power to create, nurture and transform.",
  "There is no limit to what we, as women, can accomplish."
];

function setupIdleMessage() {
  msgContainer = document.createElement('div');
  msgContainer.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%); opacity:0; transition:opacity 1.5s ease-in-out; z-index:9995; pointer-events:none;';
  
  var isMobile = window.innerWidth < 768;
  var isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  var cardWidth = isMobile ? '92%' : (isTablet ? '85%' : '75%');
  var cardMaxWidth = isMobile ? '400px' : (isTablet ? '600px' : '850px');
  var cardPadding = isMobile ? '45px 30px' : (isTablet ? '60px 45px' : '80px 60px');
  
  // Add Premium Canvas Backdrop Flowers (High texture, Low resource)
  var canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; z-index:1;';
  msgContainer.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  // Create High-Texture Flower Buffers (Pre-rendered for performance)
  var flowerTemplates = [];
  function createFlowerTemplate(color, size, type) {
    var b = document.createElement('canvas');
    b.width = size; b.height = size;
    var c = b.getContext('2d');
    var cx = size/2, cy = size/2;
    
    // Flower Shape Definitions
    var shapes = {
      'peony': { petals: 8, layers: 4, curve: 0.6, width: 0.4 },
      'dahlia': { petals: 16, layers: 5, curve: 0.3, width: 0.2 },
      'daisy': { petals: 12, layers: 2, curve: 0.1, width: 0.15 },
      'lotus': { petals: 10, layers: 3, curve: 0.8, width: 0.35 },
      'hibiscus': { petals: 5, layers: 2, curve: 1.0, width: 0.6 }
    };
    var s = shapes[type] || shapes['peony'];

    for (var l = 0; l < s.layers; l++) {
      var layerRadius = (size * 0.45) - (l * size * 0.07);
      c.save();
      c.translate(cx, cy);
      for (var i = 0; i < s.petals; i++) {
        c.save();
        c.rotate((i * Math.PI * 2) / s.petals + (l * 0.3));
        
        var grad = c.createRadialGradient(0, 0, 0, 0, 0, layerRadius);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.2, color);
        grad.addColorStop(0.8, color);
        grad.addColorStop(1, 'rgba(0,0,0,0.12)'); 
        
        c.fillStyle = grad;
        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(-layerRadius*s.curve, -layerRadius*s.width, -layerRadius*s.width, -layerRadius, 0, -layerRadius);
        c.bezierCurveTo(layerRadius*s.width, -layerRadius, layerRadius*s.curve, -layerRadius*s.width, 0, 0);
        c.fill();
        
        // Realistic Texture Veining
        c.strokeStyle = 'rgba(255,255,255,0.22)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(0, 0); c.lineTo(0, -layerRadius*0.85);
        c.stroke();
        c.restore();
      }
      c.restore();
    }
    // Center detail
    c.beginPath();
    c.arc(cx, cy, size*0.06, 0, Math.PI*2);
    c.fillStyle = type === 'daisy' ? '#FFEB3B' : '#FFD54F';
    c.fill();
    return b;
  }

  var floralPals = [
    { c: '#F06292', t: 'peony' }, { c: '#EC407A', t: 'dahlia' }, 
    { c: '#FFFFFF', t: 'daisy' }, { c: '#F8BBD0', t: 'lotus' },
    { c: '#FF80AB', t: 'hibiscus' }, { c: '#FFEB3B', t: 'daisy' },
    { c: '#F48FB1', t: 'peony' }, { c: '#D81B60', t: 'lotus' },
    { c: '#FFFFFF', t: 'hibiscus' }, { c: '#CE93D8', t: 'dahlia' }
  ];
  for (var i = 0; i < floralPals.length; i++) {
    flowerTemplates.push(createFlowerTemplate(floralPals[i].c, 400, floralPals[i].t));
  }

  var bgFlowers = [];
  // Jittered Grid Distribution to "fill gaps" without messy overlaps
  var cols = isMobile ? 5 : 9;
  var rows = isMobile ? 8 : 10;
  var cellW = canvas.width / cols;
  var cellH = canvas.height / rows;

  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var centerX = c * cellW + cellW / 2;
      var centerY = r * cellH + cellH / 2;
      
      bgFlowers.push({
        x: centerX + rand(-cellW * 0.4, cellW * 0.4), // Jitter within cell
        y: centerY + rand(-cellH * 0.4, cellH * 0.4),
        size: isMobile ? rand(100, 180) : rand(180, 350), 
        template: pick(flowerTemplates),
        rot: rand(0, Math.PI * 2),
        speed: rand(0.001, 0.0025),
        phase: Math.random() * Math.PI,
        op: 1.0 // Prominently clear, no opacity reduction
      });
    }
  }

  function drawBg() {
    if (paused) {
      requestAnimationFrame(drawBg);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bgFlowers.length; i++) {
      var f = bgFlowers[i];
      f.rot += f.speed;
      f.phase += 0.01;
      var orbitX = Math.sin(f.phase) * 20;
      var orbitY = Math.cos(f.phase) * 15;
      
      ctx.save();
      ctx.globalAlpha = 1.0; // 100% Opaque, genuine natural look
      ctx.translate(f.x + orbitX, f.y + orbitY);
      ctx.rotate(f.rot);
      ctx.drawImage(f.template, -f.size/2, -f.size/2, f.size, f.size);
      ctx.restore();
    }
    requestAnimationFrame(drawBg);
  }
  
  // Start canvas loop
  drawBg();

  var innerCard = document.createElement('div');
  innerCard.style.cssText = 'position:relative; max-width:' + cardMaxWidth + '; width:' + cardWidth + '; text-align:center; padding:' + cardPadding + '; border-radius:32px; background:#fefefe; box-shadow:0 15px 60px rgba(0,0,0,0.12); transform:scale(0.95) translateY(20px); transition:transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1); overflow:hidden; z-index:10;';

  // Watermark removed to ensure background color #fefefe is perfectly solid and matches the abstract image.

  // Decorative Corners
  var isMobile = window.innerWidth < 768;
  var isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  var cornerSize = isMobile ? 40 : (isTablet ? 65 : 85);
  var cornerStyle = 'position:absolute; width:' + cornerSize + 'px; height:' + cornerSize + 'px; z-index:1; opacity:1.0; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.25)) drop-shadow(0 1px 3px rgba(233,30,99,0.35));';
  var tl = document.createElement('div'); tl.style.cssText = cornerStyle + 'top:-10px; left:-10px; transform:rotate(-45deg);'; tl.innerHTML = getBlossomSVG('#EC407A');
  var tr = document.createElement('div'); tr.style.cssText = cornerStyle + 'top:-10px; right:-10px; transform:rotate(45deg);'; tr.innerHTML = getBlossomSVG('#F06292');
  var bl = document.createElement('div'); bl.style.cssText = cornerStyle + 'bottom:-10px; left:-10px; transform:rotate(-135deg);'; bl.innerHTML = getBlossomSVG('#F8BBD0');
  var br = document.createElement('div'); br.style.cssText = cornerStyle + 'bottom:-10px; right:-10px; transform:rotate(135deg);'; br.innerHTML = getBlossomSVG('#E91E63');
  innerCard.appendChild(tl); innerCard.appendChild(tr); innerCard.appendChild(bl); innerCard.appendChild(br);

  var decoTop = document.createElement('div');
  var b1Size = isMobile ? 25 : (isTablet ? 40 : 55);
  var b2Size = isMobile ? 36 : (isTablet ? 55 : 85);
  var b1 = '<div style="width:' + b1Size + 'px;height:' + b1Size + 'px;">' + getBlossomSVG('#E91E63') + '</div>';
  var b2 = '<div style="width:' + b2Size + 'px;height:' + b2Size + 'px;margin-top:-' + (b2Size*0.2) + 'px;">' + getBlossomSVG('#F06292') + '</div>';
  var b3 = '<div style="width:' + b1Size + 'px;height:' + b1Size + 'px;">' + getBlossomSVG('#EC407A') + '</div>';
  decoTop.innerHTML = b1 + b2 + b3;
  decoTop.style.cssText = 'position:absolute; top:-' + (b2Size*0.55) + 'px; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:5px; filter:drop-shadow(0 8px 15px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(233,30,99,0.45)); z-index:2;';
  
  var decoBottom = document.createElement('div');
  decoBottom.innerHTML = b1 + b2 + b3;
  decoBottom.style.cssText = 'position:absolute; bottom:-' + (b2Size*0.55) + 'px; left:50%; transform:translateX(-50%) rotate(180deg); display:flex; align-items:center; gap:5px; filter:drop-shadow(0 8px 15px rgba(0,0,0,0.25)) drop-shadow(0 4px 8px rgba(233,30,99,0.45)); z-index:2;';
  
  // Content Container for z-index above watermark
  var contentBlock = document.createElement('div');
  contentBlock.style.cssText = 'position:relative; z-index:10;';

  // Abstract Decoration Image
  var abstractImg = document.createElement('img');
  abstractImg.src = 'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/img/asset-1772899556655.webp?updatedAt=1772880567103';
  var imgSize = isMobile ? 190 : (isTablet ? 250 : 330);
  abstractImg.style.cssText = 'width:' + imgSize + 'px; height:auto; margin:0 auto 20px auto; display:block;';
  contentBlock.appendChild(abstractImg);

  var headerEl = document.createElement('h1');
  headerEl.innerText = "Happy Women's Day ✨";
  headerEl.style.cssText = 'margin:0 0 12px 0; font-family:"Playfair Display", "Times New Roman", serif; font-size:clamp(26px, 4.5vw, 42px); font-weight:800; color:#880E4F; line-height:1.2; letter-spacing:0.5px; text-shadow:0 2px 4px rgba(255,255,255,0.8);';
  
  var descEl = document.createElement('p');
  descEl.style.cssText = 'margin:0; font-family:system-ui,-apple-system,sans-serif; font-size:clamp(16px, 2vw, 22px); font-weight:500; color:#C2185B; line-height:1.6; max-width:600px; margin-left:auto; margin-right:auto;';
  
  contentBlock.appendChild(headerEl);
  contentBlock.appendChild(descEl);

  innerCard.appendChild(decoTop);
  innerCard.appendChild(contentBlock);
  innerCard.appendChild(decoBottom);
  msgContainer.appendChild(innerCard);
  container.appendChild(msgContainer);

  function showMessage(persist) {
    if (paused) return;
    descEl.innerHTML = pick(msgs); // Update only the description
    msgContainer.style.opacity = '1';
    innerCard.style.transform = 'scale(1) translateY(0)';
    
    clearTimeout(msgHideTimer);
    if (!persist) {
      msgHideTimer = setTimeout(function() {
        if (!isIdle) {
          msgContainer.style.opacity = '0';
          innerCard.style.transform = 'scale(0.95) translateY(20px)';
        }
      }, 7000); // Show for 7s then fade out
    }
  }

  // Initial show
  setTimeout(function() { showMessage(false); }, 2000);

  // Cycle interval
  msgCycleTimer = setInterval(function() {
    if (!isIdle) showMessage(false);
  }, rand(60000, 120000));

  // Idle Detection
  function resetIdle() {
    isIdle = false;
    msgContainer.style.opacity = '0';
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function() {
      isIdle = true;
      showMessage(true); // Persist
    }, 60000); // 1 minute idle
  }

  window.addEventListener('mousemove', resetIdle, {passive: true});
  window.addEventListener('keydown', resetIdle, {passive: true});
  window.addEventListener('touchstart', resetIdle, {passive: true});
  window.addEventListener('scroll', resetIdle, {passive: true});
  
  resetIdle();
}

/* ── Init ── */
function init() {
  setupIdleMessage();

  // Init Butterflies with staggered entry
  updatePossibleElements();
  for (var i = 0; i < BUTTERFLY_POOL; i++) {
    (function (index) {
      setTimeout(function () {
        if (!paused) butterflies.push(new Butterfly());
      }, index * 800);
    })(i);
  }
  loopButterflies();
  elUpdateTimer = setInterval(updatePossibleElements, 5000);

  // Start subtle background particles
  bgInterval = setInterval(spawnBgParticle, 800);
  // Start edge blossoms (faster interval, since they phase in/out frequently)
  edgeTimer = setInterval(spawnEdgeBlossom, 1200);

  // Pre-fill a few background particles
  for (var i = 0; i < 10; i++) setTimeout(spawnBgParticle, i * 200);
  // Pre-fill a few blossoms randomly
  for (var i = 0; i < 4; i++) setTimeout(spawnEdgeBlossom, i * 400);
}

/* ── Visibility ── */
function onVis() {
  if (document.hidden) {
    paused = true;
    clearInterval(bgInterval);
    clearInterval(edgeTimer);
    clearInterval(msgCycleTimer);
    clearTimeout(idleTimer);
  } else {
    paused = false;
    bgInterval = setInterval(spawnBgParticle, 800);
    edgeTimer = setInterval(spawnEdgeBlossom, 1200);
    msgCycleTimer = setInterval(function() {
      if (!isIdle) {
        msgContainer.innerHTML = pick(msgs);
        msgContainer.style.opacity = '1';
        clearTimeout(msgHideTimer);
        msgHideTimer = setTimeout(function() {
          if (!isIdle) msgContainer.style.opacity = '0';
        }, 6000);
      }
    }, rand(60000, 120000));
  }
}
document.addEventListener('visibilitychange', onVis);

/* ── Resize ── */
var resizeT;
function onResize() {
  clearTimeout(resizeT);
  resizeT = setTimeout(function () {
    BG_MAX_PARTICLES = window.innerWidth < 768 ? 15 : 30;
    MAX_EDGE_BLOSSOMS = window.innerWidth < 768 ? 6 : 15;
    MAX_ON_SCREEN = (window.innerWidth < 768) ? 4 : (window.innerWidth < 1024) ? 7 : 10;
    maxSeating = (window.innerWidth < 768) ? 2 : (window.innerWidth < 1024) ? 3 : 5;
    butterflies.forEach(function(bt) { if(bt.updateSize) bt.updateSize(); });
    // Update Backdrop Canvas if it exists
    if (msgContainer && msgContainer.querySelector('canvas')) {
      var c = msgContainer.querySelector('canvas');
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
  }, 300);
}

Butterfly.prototype.updateSize = function() {
  var isMobile = window.innerWidth < 768;
  var isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  this.z = isMobile ? rand(0.65, 0.95) : (isTablet ? rand(0.9, 1.25) : rand(1.1, 1.6));
  this.size = 45 * this.z;
  this.el.style.width = this.size + 'px';
  this.el.style.height = this.size + 'px';
  
  // Also recalibrate physics for new screen size
  var screenScale = Math.max(0.8, window.innerWidth / 1200);
  this.speedMult = rand(0.6, 1.0) * screenScale;
  this.speedMax = rand(1.5, 2.5) * this.speedMult;
  this.accel = rand(0.04, 0.08) * this.speedMult;
};
window.addEventListener('resize', onResize);

/* ── Cleanup ── */
window.szfyInternationalWomensDayCleanup = function () {
  paused = true;
  clearInterval(edgeTimer);
  clearTimeout(resizeT);
  clearInterval(bgInterval);
  clearInterval(elUpdateTimer);
  clearInterval(msgCycleTimer);
  clearTimeout(msgHideTimer);
  clearTimeout(idleTimer);
  cancelAnimationFrame(bAnimFrame);
  document.removeEventListener('visibilitychange', onVis);
  window.removeEventListener('resize', onResize);
  
  if (container) container.innerHTML = '';
  activeBgParticles = 0;
  butterflies = [];
  activeSittingCount = 0;
  occupiedElements.clear();
};

init();
    }) ();
`
};

if (typeof window !== 'undefined' && window.SeazonifyController) {
  window.SeazonifyController.injectVisualEffect(internationalWomensDayEffect);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = internationalWomensDayEffect;
}
