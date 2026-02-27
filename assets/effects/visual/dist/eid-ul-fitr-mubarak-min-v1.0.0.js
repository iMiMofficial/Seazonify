const eidUlFitrEffect = {
name: "Eid-ul-Fitr Mubarak",
description: "Celebrate Eid ul Fitr on your website with this beautiful and elegant effect. Featuring lanterns, Islamic geometric patterns, and a peaceful atmosphere.",
author: "Md Mim Akhtar",
type: "visual",
icon: "🌙",
thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/eid-ul-fitr-mubarak.webp",
license: "https://seazonify.com/license",
version: "1.0.0",
created: "2026-02-28",
category: "celebration",
tags: ["eid", "eid ul fitr", "religious", "classic", "lantern-only"],
css: `@import url('https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;700&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cinzel+Decorative:wght@400;700&display=swap');.szfy-eid-root{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;overflow:hidden;background:transparent;}.szfy-eid-portal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#05070a;z-index:1000000;display:flex;align-items:center;justify-content:center;transition:opacity 1.5s ease-in-out,visibility 1.5s;visibility:visible;}.szfy-eid-portal-overlay.szfy-fade-out{opacity:0;visibility:hidden;pointer-events:none;}.szfy-eid-portal-overlay.szfy-screensaver-active{opacity:1;visibility:visible;pointer-events:auto;}.szfy-eid-portal-star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;box-shadow:0 0 10px 2px #fff,0 0 20px 5px #ffd700;opacity:0;animation:szfy-eid-star-bloom 4s 2s cubic-bezier(0.7,0,0.3,1) forwards;will-change:transform,opacity;transform:translateZ(0);}.szfy-eid-portal-mandala{position:absolute;width:250vmax;height:250vmax;opacity:0;transform:rotate(0deg) scale(0) translateZ(0);animation:szfy-eid-mandala-expand 6s 2s cubic-bezier(0.7,0,0.3,1) forwards;pointer-events:none;will-change:transform,opacity;}@keyframes szfy-eid-star-bloom{0%{transform:scale(0.1) translateZ(0);opacity:0;}10%{opacity:1;transform:scale(1) translateZ(0);}30%{transform:scale(3) translateZ(0);opacity:1;filter:blur(0px);}60%{transform:scale(30) translateZ(0);opacity:0.8;filter:blur(4px);}85%{transform:scale(150) translateZ(0);opacity:0.4;filter:blur(8px);}100%{transform:scale(300) translateZ(0);opacity:0;}}@keyframes szfy-eid-mandala-expand{0%{transform:rotate(0deg) scale(0) translateZ(0);opacity:0;}40%{opacity:0.4;}100%{transform:rotate(180deg) scale(1.2) translateZ(0);opacity:0;}}.szfy-eid-portal-overlay.szfy-fade-out{opacity:0;visibility:hidden;pointer-events:none;}.szfy-eid-crescent{position:absolute;top:1.5%;right:1.5%;width:20vmax;height:20vmax;background:radial-gradient(circle at 70% 30%,transparent 58%,#fff 60%);border-radius:50%;opacity:0;filter:blur(25px);transform:rotate(-15deg) translateZ(0);pointer-events:none;z-index:1000000;will-change:opacity;animation:szfy-eid-crescent-fade 2s 0s forwards;}@keyframes szfy-eid-crescent-fade{from{opacity:0;}to{opacity:0.03;}}.szfy-eid-bottom-ground{position:absolute;bottom:0;left:0;width:100%;height:30vh;background:linear-gradient(to top,rgba(212,175,55,0.08),transparent);z-index:1000000;pointer-events:none;display:flex;justify-content:center;opacity:0;will-change:opacity;animation:szfy-eid-fade-in 2s 0s forwards;}.szfy-eid-pattern-overlay{width:100%;height:100%;opacity:0.12;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 0l9 25 25 9-25 9-9 25-9-25-25-9 25-9z" fill="%23ffd700"/><path d="M40 10l6 18 18 6-18 6-6 18-6-18-18-6 18-6z" fill="white" opacity="0.3"/><circle cx="40" cy="40" r="2" fill="%23ffd700"/></svg>');background-size:80px 80px;mask-image:linear-gradient(to top,black,transparent);-webkit-mask-image:linear-gradient(to top,black,transparent);}.szfy-eid-unity-container{position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);width:400px;height:220px;display:flex;justify-content:center;align-items:flex-end;z-index:1000002;opacity:0;animation:szfy-eid-fade-in 1.5s 1s forwards;pointer-events:none;}.szfy-eid-person{width:120px;height:180px;fill:url(#szfy-eid-unity-grad);filter:drop-shadow(0 0 15px rgba(255,215,0,0.3));position:absolute;bottom:0;transform-origin:bottom center;}.szfy-eid-person-muslim{left:10%;animation:szfy-eid-muslim-action 15s 0.5s ease-in-out infinite;}.szfy-eid-person-friend{right:10%;animation:szfy-eid-friend-action 15s 0.5s ease-in-out infinite;}@keyframes szfy-eid-muslim-action{0%,5%{left:10%;transform:rotate(0deg) scale(1);}20%{left:32%;transform:rotate(2deg) translateY(-5px);}30%,60%{left:32%;transform:rotate(5deg) translateY(0);}80%,100%{left:10%;transform:rotate(0deg);}}@keyframes szfy-eid-friend-action{0%,5%{right:10%;transform:rotate(0deg) scale(1);}20%{right:32%;transform:rotate(-2deg) translateY(-5px);}30%,60%{right:32%;transform:rotate(-5deg) translateY(0);}80%,100%{right:10%;transform:rotate(0deg);}}.szfy-eid-arm{transform-origin:50% 30%;transition:transform 1s ease-in-out;}.szfy-eid-person-muslim .szfy-eid-arm-right{animation:szfy-eid-arm-cycle-right 15s 1s ease-out infinite;}.szfy-eid-person-friend .szfy-eid-arm-left{animation:szfy-eid-arm-cycle-left 15s 1s ease-out infinite;}@keyframes szfy-eid-arm-cycle-right{0%,10%{transform:rotate(0);}30%,65%{transform:rotate(-65deg) translateX(10px);}85%,100%{transform:rotate(0);}}@keyframes szfy-eid-arm-cycle-left{0%,10%{transform:rotate(0);}30%,65%{transform:rotate(65deg) translateX(-10px);}85%,100%{transform:rotate(0);}}.szfy-eid-pulse{position:fixed;top:50%;left:50%;width:10px;height:10px;background:radial-gradient(circle,#fff 0%,#ffd700 50%,transparent 100%);border-radius:50%;transform:translate(-50%,-50%) scale(0);z-index:1000001;pointer-events:none;opacity:0;}.szfy-eid-pulse.szfy-active{animation:szfy-eid-shockwave 1.5s cubic-bezier(0.165,0.84,0.44,1) forwards;}@keyframes szfy-eid-shockwave{0%{transform:translate(-50%,-50%) scale(0);opacity:1;}100%{transform:translate(-50%,-50%) scale(400);opacity:0;}}.szfy-eid-lantern-wrapper{position:absolute;top:-10px;z-index:1000002;opacity:0;animation:szfy-eid-lantern-fade-in 2s 0s forwards;transform-origin:top center;transition:transform 1.5s cubic-bezier(0.34,1.56,0.64,1),opacity 1s;}.szfy-eid-lantern-wrapper.szfy-actively-browsing{transform:translateY(-100px) scale(0);opacity:0;pointer-events:none;}.szfy-eid-lantern-wrapper.szfy-idle-reveal{transform:translateY(0) scale(1);opacity:1;}.szfy-eid-lantern-cinematic{transform-origin:top center;transition:transform 1.5s cubic-bezier(0.34,1.56,0.64,1);}.szfy-eid-lantern-cinematic.szfy-shrinking{transform:scale(0.6);}.szfy-eid-lantern-sway{transform-origin:top center;animation:szfy-eid-sway var(--sw-dur) ease-in-out infinite alternate;--sw-dur:var(--sway-dur);}@keyframes szfy-eid-lantern-fade-in{from{opacity:0;transform:translateY(-20px);}to{opacity:1;transform:translateY(0);}}.szfy-eid-lantern-string{width:2px;background:linear-gradient(180deg,rgba(255,255,255,0.1),#d4af37);height:var(--string-len);margin:0 auto;animation:szfy-eid-string-yo-yo var(--yoyo-dur) ease-in-out infinite;}.szfy-eid-lantern-svg{width:var(--size);height:auto;filter:drop-shadow(0 0 15px var(--glow-color));display:block;}.szfy-eid-lantern-light{animation:szfy-eid-flicker 4000ms infinite alternate;}@keyframes szfy-eid-sway{0%{transform:rotate(var(--sway-ang));}100%{transform:rotate(calc(var(--sway-ang) * -1));}}@keyframes szfy-eid-flicker{0%,100%{opacity:0.8;}50%{opacity:1;filter:brightness(1.2);}}@keyframes szfy-eid-string-yo-yo{0%,100%{height:var(--string-len);}50%{height:calc(var(--string-len) * 0.8);}}.szfy-eid-proclamation{position:absolute;top:70%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:1000001;width:95vw;max-width:900px;line-height:1.2;}.szfy-eid-text-glow{font-family:'Reem Kufi',sans-serif;font-size:clamp(2.5rem,7.5vw,7.5rem);font-weight:700;background:linear-gradient(135deg,#ffd700 0%,#fff 40%,#ffd700 60%,#b8860b 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:szfy-eid-gold-shimmer 4s infinite linear,szfy-eid-fade-in 2s 0.5s forwards;filter:drop-shadow(0 0 25px rgba(255,215,0,0.4));letter-spacing:0.05em;opacity:0;}@keyframes szfy-eid-fade-in{to{opacity:1;}}@keyframes szfy-eid-gold-shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}.szfy-eid-subtext{font-family:'Amiri',serif;font-size:clamp(0.9rem,1.8vw,1.5rem);color:#e0c080;font-style:italic;margin-top:10px;opacity:0;letter-spacing:0.5px;line-height:1.5;padding:0 5%;animation:szfy-eid-text-reveal 2s 1.5s forwards;}@keyframes szfy-eid-text-reveal{to{opacity:1;transform:translateY(-10px);}}#szfy-eid-canvas-bg,#szfy-eid-canvas-fg{position:absolute;top:0;left:0;width:100%;height:100%;display:block;}#szfy-eid-canvas-bg{z-index:999999;}#szfy-eid-canvas-fg{z-index:1000005;}`,
html: `<div class="szfy-eid-root" id="szfy-eid-root"><div class="szfy-eid-portal-overlay" id="szfy-eid-portal-overlay"><svg class="szfy-eid-portal-mandala" viewBox="0 0 100 100"><defs><linearGradient id="portalGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffd700" /><stop offset="100%" stop-color="#4A148C" /></linearGradient></defs><g fill="none" stroke="url(#portalGrad)" stroke-width="0.15" opacity="0.5"><circle cx="50" cy="50" r="48" /><circle cx="50" cy="50" r="38" /><path d="M50,2 L50,98 M2,50 L98,50 M15,15 L85,85 M85,15 L15,85"/><rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)"/><path d="M50,10 L90,50 L50,90 L10,50 Z" /></g></svg><div class="szfy-eid-portal-star"></div><div class="szfy-eid-crescent"></div><div class="szfy-eid-unity-container"><svg style="width:0;height:0;position:absolute;"><defs><linearGradient id="szfy-eid-unity-grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff" /><stop offset="100%" stop-color="#ffd700" /></linearGradient></defs></svg><svg class="szfy-eid-person szfy-eid-person-muslim" viewBox="0 0 100 160"><defs><clipPath id="szfy-muslim-body-mask"><path d="M20,160 Q20,60 50,60 Q80,60 80,160 Z" /></clipPath></defs><rect x="35" y="8" width="30" height="9" rx="2" /><circle cx="50" cy="35" r="16" /><path d="M34,35 Q50,65 66,35" stroke="white" stroke-width="1.5" fill="none" opacity="0.6" /><path d="M20,160 Q20,60 50,60 Q80,60 80,160 Z" /><path class="szfy-eid-arm szfy-eid-arm-right" d="M70,75 Q95,90 85,140" fill="none" stroke="url(#szfy-eid-unity-grad)" stroke-width="15" stroke-linecap="round" /></svg><svg class="szfy-eid-person szfy-eid-person-friend" viewBox="0 0 100 160"><circle cx="50" cy="35" r="16" /><path d="M20,160 Q20,60 50,60 Q80,60 80,160 Z" /><path class="szfy-eid-arm szfy-eid-arm-left" d="M30,75 Q5,90 15,140" fill="none" stroke="url(#szfy-eid-unity-grad)" stroke-width="15" stroke-linecap="round" /></svg></div><div class="szfy-eid-proclamation"><h1 class="szfy-eid-text-glow" id="szfy-eid-greeting">Eid Mubarak</h1><div class="szfy-eid-subtext" id="szfy-eid-subtext">Peace, Joy, and Eternal Togetherness</div></div><div class="szfy-eid-bottom-ground"><div class="szfy-eid-pattern-overlay"></div></div></div><canvas id="szfy-eid-canvas-bg"></canvas><canvas id="szfy-eid-canvas-fg"></canvas><div id="szfy-eid-lanterns"></div><div class="szfy-eid-pulse" id="szfy-eid-pulse"></div></div>`,
js: `(function() {
const root = document.getElementById('szfy-eid-root');
if (!root || root.getAttribute('data-szfy-init')) return;
document.querySelectorAll('.szfy-eid-root').forEach(el => {
if (el !== root) el.remove();
});
root.setAttribute('data-szfy-init', 'true');
const bgCanvas = document.getElementById('szfy-eid-canvas-bg');
const fgCanvas = document.getElementById('szfy-eid-canvas-fg');
const bgCtx = bgCanvas.getContext('2d');
const fgCtx = fgCanvas.getContext('2d');
const portal = document.getElementById('szfy-eid-portal-overlay');
const lanternsContainer = document.getElementById('szfy-eid-lanterns');
let width, height, animationId;
let stars = [], joyousDust = [], sparkles = [];
let mouseX = 0, mouseY = 0;
let isRevealed = false;
let isScreensaverActive = false;
let isIdleRevealed = false;
let idleTimer1m, idleTimer5m;
function getBrandName() {
try {
if (window.SeazonifyBrand) return window.SeazonifyBrand;
const ogSite = document.querySelector('meta[property="og:site_name"]');
if (ogSite && ogSite.content) return ogSite.content;
let title = document.title || "";
if (title) {
title = title.split(/[|\-–—]/)[0].trim();
if (title.length > 3 && title.length < 25) return title;
}
return null;
} catch(e) { return null; }
}
function resize() {
width = window.innerWidth;
height = window.innerHeight;
bgCanvas.width = fgCanvas.width = width;
bgCanvas.height = fgCanvas.height = height;
}
function initParticles() {
stars = [];
for(let i=0; i<120; i++) {
stars.push({
x: Math.random() * width,
y: Math.random() * height * 0.8,
z: Math.random() * 0.4 + 0.1,
o: Math.random()
});
}
joyousDust = [];
for(let i=0; i<50; i++) {
joyousDust.push({
x: Math.random() * width,
y: Math.random() * height,
s: Math.random() * 2 + 1,
v: Math.random() * 0.4 + 0.2,
a: Math.random() * Math.PI * 2
});
}
}
function createSparkles(x, y) {
for(let i=0; i<15; i++) {
const angle = Math.random() * Math.PI * 2;
const speed = Math.random() * 4 + 2;
sparkles.push({
x: x,
y: y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
s: Math.random() * 3 + 1,
o: 1,
c: Math.random() > 0.5 ? "#ffd700" : "#fff"
});
}
}
function createLanterns() {
const w = window.innerWidth;
const h_px = window.innerHeight;
const baseScale = Math.min(w, h_px) / 1000; // Balanced scaling factor
let lanternConfig = [];
if (w < 768) {
lanternConfig = [
{x: 12, h: 14, s: 55 * baseScale + 45},
{x: 50, h: 18, s: 65 * baseScale + 50},
{x: 88, h: 10, s: 58 * baseScale + 48}
];
} else if (w < 1024) {
lanternConfig = [
{x: 10, h: 18, s: 80 * baseScale + 50},
{x: 30, h: 10, s: 64 * baseScale + 45},
{x: 50, h: 20, s: 88 * baseScale + 55},
{x: 70, h: 14, s: 72 * baseScale + 48},
{x: 90, h: 16, s: 76 * baseScale + 50}
];
} else {
lanternConfig = [
{x: 4, h: 22, s: 104 * baseScale + 65}, {x: 16, h: 12, s: 72 * baseScale + 55},
{x: 28, h: 28, s: 96 * baseScale + 60}, {x: 40, h: 10, s: 68 * baseScale + 50},
{x: 60, h: 18, s: 88 * baseScale + 58}, {x: 72, h: 24, s: 100 * baseScale + 62},
{x: 84, h: 15, s: 76 * baseScale + 52}, {x: 96, h: 20, s: 80 * baseScale + 55}
];
}
lanternsContainer.innerHTML = '';
const lanternPath = "M20,60 L80,60 L90,40 L10,40 Z M15,40 L15,140 L85,140 L85,40 M15,140 L25,160 L75,160 L85,140 M50,0 L50,40";
const complexPath = "M50,10 L70,30 L80,50 L80,120 L50,150 L20,120 L20,50 L30,30 Z M50,10 L50,0 M40,0 L60,0 M30,50 L70,50 M30,120 L70,120 M50,150 L50,170 L45,175 L55,175 L50,170";
lanternConfig.forEach((l, i) => {
const wrapper = document.createElement('div');
wrapper.className = 'szfy-eid-lantern-wrapper';
wrapper.style.left = l.x + '%';
const cinematic = document.createElement('div');
cinematic.className = 'szfy-eid-lantern-cinematic';
if (isRevealed || isIdleRevealed || isScreensaverActive) {
cinematic.classList.add('szfy-shrinking');
}
if (isIdleRevealed) {
wrapper.classList.remove('szfy-actively-browsing');
wrapper.classList.add('szfy-idle-reveal');
} else if (isRevealed && !isScreensaverActive) {
wrapper.classList.add('szfy-actively-browsing');
}
const swayDiv = document.createElement('div');
swayDiv.className = 'szfy-eid-lantern-sway';
swayDiv.style.setProperty('--string-len', l.h + 'vh');
swayDiv.style.setProperty('--size', l.s + 'px');
swayDiv.style.setProperty('--sway-dur', (3 + Math.random() * 2) + 's');
swayDiv.style.setProperty('--yoyo-dur', (4 + Math.random() * 4) + 's');
swayDiv.style.setProperty('--sway-ang', (2 + Math.random() * 3) + 'deg');
swayDiv.style.setProperty('--glow-color', 'rgba(255, 170, 0, 0.5)');
const isComplex = i % 2 === 0;
swayDiv.innerHTML = \`
            <div class="szfy-eid-lantern-string"></div>
            <svg class="szfy-eid-lantern-svg" viewBox="0 0 100 200" fill="none" stroke="#d4af37" stroke-width="2">
              <defs>
                <filter id="lGlow\${i}">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <linearGradient id="lGrad\${i}" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#b8860b;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#ffd700;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="\${isComplex ? 'M30,50 L70,50 L70,120 L30,120 Z' : 'M25,50 L75,50 L75,130 L25,130 Z'}" 
                fill="rgba(255, 200, 50, 0.15)" stroke="none" />
              <circle cx="50" cy="90" r="15" fill="#fff" class="szfy-eid-lantern-light" filter="url(#lGlow\${i})" opacity="0.8" />
              <path d="\${isComplex ? complexPath : lanternPath}" stroke="url(#lGrad\${i})" fill="none" stroke-linejoin="round" />
            </svg>
          \`;
cinematic.appendChild(swayDiv);
wrapper.appendChild(cinematic);
lanternsContainer.appendChild(wrapper);
});
}
function draw() {
bgCtx.clearRect(0, 0, width, height);
fgCtx.clearRect(0, 0, width, height);
if (!isRevealed) {
const grad = bgCtx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.8);
grad.addColorStop(0, '#0a0e1a');
grad.addColorStop(1, '#05070a');
bgCtx.fillStyle = grad;
bgCtx.fillRect(0, 0, width, height);
}
bgCtx.fillStyle = "#fff";
stars.forEach(s => {
s.o += 0.004;
bgCtx.globalAlpha = 0.2 + Math.abs(Math.sin(s.o)) * 0.5;
bgCtx.beginPath();
bgCtx.arc(s.x, s.y, s.z * 2.2, 0, Math.PI*2);
bgCtx.fill();
});
fgCtx.fillStyle = "#ffd700";
joyousDust.forEach(d => {
d.y -= d.v;
d.x += Math.sin(d.a += 0.015) * 0.6;
if(d.y < -10) { d.y = height + 10; d.x = Math.random() * width; }
fgCtx.globalAlpha = 0.55;
fgCtx.beginPath();
fgCtx.arc(d.x, d.y, d.s, 0, Math.PI*2);
fgCtx.fill();
});
sparkles.forEach((p, i) => {
p.x += p.vx;
p.y += p.vy;
p.o -= 0.02;
p.vx *= 0.96;
p.vy *= 0.96;
if(p.o <= 0) {
sparkles.splice(i, 1);
} else {
fgCtx.globalAlpha = p.o;
fgCtx.fillStyle = p.c;
fgCtx.beginPath();
fgCtx.arc(p.x, p.y, p.s, 0, Math.PI*2);
fgCtx.fill();
if (p.c === "#fff") {
fgCtx.shadowBlur = 10;
fgCtx.shadowColor = "#fff";
fgCtx.fill();
fgCtx.shadowBlur = 0;
}
}
});
const wrappers = document.querySelectorAll('.szfy-eid-lantern-wrapper');
wrappers.forEach(w => {
const rect = w.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const dx = (mouseX - centerX) * 0.04;
w.style.transform = \`skewX(\${dx}deg)\`;
});
animationId = requestAnimationFrame(draw);
}
function triggerReveal() {
isRevealed = true;
isScreensaverActive = false;
portal.classList.remove('szfy-screensaver-active');
portal.classList.add('szfy-fade-out');
const pulse = document.getElementById('szfy-eid-pulse') || createPulse();
pulse.classList.add('szfy-active');
const kinematics = document.querySelectorAll('.szfy-eid-lantern-cinematic');
kinematics.forEach(k => k.classList.add('szfy-shrinking'));
setTimeout(() => {
pulse.remove();
}, 2500);
}
function createPulse() {
const p = document.createElement('div');
p.className = 'szfy-eid-pulse';
p.id = 'szfy-eid-pulse';
root.appendChild(p);
return p;
}
function hideLanterns() {
isIdleRevealed = false;
const wrappers = document.querySelectorAll('.szfy-eid-lantern-wrapper');
const kinematics = document.querySelectorAll('.szfy-eid-lantern-cinematic');
wrappers.forEach(w => {
w.classList.remove('szfy-idle-reveal');
w.classList.add('szfy-actively-browsing');
});
kinematics.forEach(k => k.classList.add('szfy-shrinking'));
}
function showLanterns() {
isIdleRevealed = true;
const wrappers = document.querySelectorAll('.szfy-eid-lantern-wrapper');
const kinematics = document.querySelectorAll('.szfy-eid-lantern-cinematic');
wrappers.forEach(w => {
w.classList.remove('szfy-actively-browsing');
w.classList.add('szfy-idle-reveal');
});
kinematics.forEach(k => k.classList.add('szfy-shrinking'));
}
function goScreensaver() {
if (isScreensaverActive) return;
isScreensaverActive = true;
isRevealed = false;
const kinematics = document.querySelectorAll('.szfy-eid-lantern-cinematic');
kinematics.forEach(k => k.classList.remove('szfy-shrinking'));
portal.classList.remove('szfy-fade-out');
portal.classList.add('szfy-screensaver-active');
const star = portal.querySelector('.szfy-eid-portal-star');
const mandala = portal.querySelector('.szfy-eid-portal-mandala');
const crescent = portal.querySelector('.szfy-eid-crescent');
const unity = portal.querySelector('.szfy-eid-unity-container');
const bottomGround = portal.querySelector('.szfy-eid-bottom-ground');
const proclamation = portal.querySelector('.szfy-eid-proclamation');
[star, mandala, crescent, unity, bottomGround, proclamation].forEach(el => {
if (el) {
const clone = el.cloneNode(true);
el.parentNode.replaceChild(clone, el);
}
});
}
function resetIdleTimers() {
clearTimeout(idleTimer1m);
clearTimeout(idleTimer5m);
if (isScreensaverActive) {
triggerReveal();
hideLanterns();
} else if (isIdleRevealed) {
hideLanterns();
}
idleTimer1m = setTimeout(showLanterns, 60000);
idleTimer5m = setTimeout(goScreensaver, 300000);
}
function init() {
resize();
initParticles();
createLanterns();
const brand = getBrandName();
const greetingEl = document.getElementById('szfy-eid-greeting');
const subtextEl = document.getElementById('szfy-eid-subtext');
if (greetingEl) {
greetingEl.textContent = brand ? 'Eid Mubarak from ' + brand : "Eid Mubarak";
if (brand && brand.length > 12) {
greetingEl.style.fontSize = 'clamp(2rem, 6vw, 6rem)';
}
}
if (subtextEl) {
subtextEl.textContent = "May this blessed occasion bring peace, prosperity, and eternal happiness to you and your loved ones.";
}
draw();
setTimeout(() => {
triggerReveal();
resetIdleTimers();
}, 8500);
}
window.addEventListener('resize', () => { resize(); createLanterns(); });
window.addEventListener('mousemove', (e) => {
mouseX = e.clientX; mouseY = e.clientY;
if (isRevealed) resetIdleTimers();
});
window.addEventListener('scroll', () => { if (isRevealed) resetIdleTimers(); });
window.addEventListener('click', (e) => {
createSparkles(e.clientX, e.clientY);
if (isRevealed) resetIdleTimers();
});
window.addEventListener('keydown', () => { if (isRevealed) resetIdleTimers(); });
window.szfyEidCleanup = function() {
cancelAnimationFrame(animationId);
if(root) root.remove();
};
init();
})();`
};
if (typeof window !== 'undefined' && window.SeazonifyController) {
window.SeazonifyController.injectVisualEffect(eidUlFitrEffect);
}
if (typeof module !== 'undefined' && module.exports) {
module.exports = eidUlFitrEffect;
}