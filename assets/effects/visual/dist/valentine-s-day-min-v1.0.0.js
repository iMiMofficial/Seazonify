const valentinesDayEffect = {
name: "Valentine's Day",
description: "An immersive romantic atmosphere with drifting rose petals, pulsing hearts, dreamy warm bokeh, and love letters — making any website breathe with love.",
author: "Md Mim Akhtar",
type: "visual",
icon: "💝",
thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/valentine.webp",
license: "https://seazonify.com/license",
version: "1.0.0",
created: "2026-02-19",
category: "celebration",
tags: ["valentine", "love", "romance", "hearts", "roses", "petals", "romantic", "february", "warm"],
css: `.szfy-val-container{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;}.szfy-val-vignette{position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(ellipse at center,transparent 45%,rgba(160,20,40,0.04) 70%,rgba(100,10,20,0.08) 100%);animation:szfy-val-vig-breathe 6s ease-in-out infinite alternate;}@keyframes szfy-val-vig-breathe{0%{opacity:0.5;}100%{opacity:1;}}.szfy-val-petal{position:absolute;top:-50px;pointer-events:none;will-change:transform,opacity;opacity:0;animation:szfy-val-petal-fall var(--vp-dur) ease-in-out forwards;}.szfy-val-petal-inner{width:100%;height:100%;border-radius:62% 2% 48% 50% / 55% 2% 48% 52%;background:var(--vp-bg);position:relative;animation:szfy-val-petal-spin var(--vp-spin-dur) linear infinite;}.szfy-val-petal-inner::after{content:'';position:absolute;top:35%;left:20%;width:45%;height:1px;background:linear-gradient(90deg,transparent,var(--vp-vein),transparent);transform:rotate(-12deg);opacity:0.4;}@keyframes szfy-val-petal-fall{0%{transform:translateY(0) translateX(0);opacity:0;}5%{opacity:var(--vp-opa);}30%{transform:translateY(30vh) translateX(var(--vp-drift1));}60%{transform:translateY(60vh) translateX(var(--vp-drift2));}90%{opacity:var(--vp-opa);}100%{transform:translateY(calc(100vh + 60px)) translateX(var(--vp-drift3));opacity:0;}}@keyframes szfy-val-petal-spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.szfy-val-heart{position:absolute;bottom:-50px;pointer-events:none;will-change:transform,opacity;opacity:0;animation:szfy-val-heart-rise var(--vh-dur) ease-in-out forwards,szfy-val-heart-sway var(--vh-sway-dur) ease-in-out infinite alternate;}.szfy-val-heart svg{display:block;width:100%;height:100%;filter:drop-shadow(0 0 var(--vh-glow-r) var(--vh-glow));}.szfy-val-heart-beat{animation:szfy-val-heartbeat 1.1s ease-in-out infinite;}@keyframes szfy-val-heart-rise{0%{transform:translateY(0) scale(0.5);opacity:0;}7%{opacity:var(--vh-opa);}50%{transform:translateY(calc(var(--vh-travel) * 0.5)) scale(1.05);}88%{opacity:var(--vh-opa);}100%{transform:translateY(var(--vh-travel)) scale(0.4);opacity:0;}}@keyframes szfy-val-heart-sway{0%{margin-left:calc(var(--vh-sway) * -1);}100%{margin-left:var(--vh-sway);}}@keyframes szfy-val-heartbeat{0%{transform:scale(1);}12%{transform:scale(1.18);}24%{transform:scale(1);}36%{transform:scale(1.1);}48%{transform:scale(1);}100%{transform:scale(1);}}.szfy-val-bokeh{position:absolute;pointer-events:none;border-radius:50%;will-change:transform,opacity;opacity:0;background:var(--vbk-bg);filter:blur(var(--vbk-blur));animation:szfy-val-bokeh-appear var(--vbk-dur) ease-in-out forwards;}@keyframes szfy-val-bokeh-appear{0%{transform:scale(0.3);opacity:0;}12%{opacity:var(--vbk-opa);}50%{transform:scale(1);}80%{opacity:var(--vbk-opa);}100%{transform:scale(0.4);opacity:0;}}.szfy-val-letter-wrap{position:fixed;pointer-events:none;z-index:10000;opacity:0;}.szfy-val-letter-wrap.szfy-active{animation:szfy-val-letter-anim 10s ease-in-out forwards;}.szfy-val-envelope{position:relative;width:clamp(220px,44vw,380px);padding:22px 24px 18px;background:linear-gradient(165deg,rgba(255,248,248,0.93),rgba(255,238,240,0.89));border-radius:6px;border-top:3px solid #D42145;box-shadow:0 4px 20px rgba(160,20,40,0.08);}.szfy-val-seal{position:absolute;top:-12px;right:18px;width:24px;height:24px;background:radial-gradient(circle,#E63946 35%,#B81D3A);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;box-shadow:0 2px 6px rgba(200,30,50,0.3);}.szfy-val-letter-quote{font-family:'Georgia','Palatino Linotype',serif;font-size:clamp(15px,2.4vw,21px);font-style:italic;font-weight:600;line-height:1.55;color:#7A1528;text-align:center;margin-bottom:6px;}.szfy-val-letter-line{width:36px;height:1px;background:linear-gradient(90deg,transparent,rgba(180,25,50,0.25),transparent);margin:7px auto 9px;}.szfy-val-letter-attr{font-family:'Georgia',serif;font-size:clamp(9px,1.2vw,12px);color:rgba(122,21,40,0.5);text-align:center;letter-spacing:1.5px;text-transform:uppercase;}.szfy-val-letter-wrap.szfy-pos-bl{bottom:5vh;left:3vw;}.szfy-val-letter-wrap.szfy-pos-br{bottom:5vh;right:3vw;}.szfy-val-letter-wrap.szfy-pos-tl{top:5vh;left:3vw;}.szfy-val-letter-wrap.szfy-pos-tr{top:5vh;right:3vw;}.szfy-val-letter-wrap.szfy-pos-bc{bottom:5vh;left:50%;transform:translateX(-50%);}.szfy-val-letter-wrap.szfy-pos-tc{top:5vh;left:50%;transform:translateX(-50%);}@keyframes szfy-val-letter-anim{0%{opacity:0;transform:var(--vl-enter);}10%{opacity:1;transform:var(--vl-rest);}85%{opacity:1;transform:var(--vl-rest);}100%{opacity:0;transform:var(--vl-exit);}}.szfy-val-letter-wrap.szfy-pos-bc.szfy-active,.szfy-val-letter-wrap.szfy-pos-tc.szfy-active{animation:szfy-val-letter-anim-c 10s ease-in-out forwards;}@keyframes szfy-val-letter-anim-c{0%{opacity:0;transform:translateX(-50%) translateY(20px);}10%{opacity:1;transform:translateX(-50%) translateY(0);}85%{opacity:1;transform:translateX(-50%) translateY(0);}100%{opacity:0;transform:translateX(-50%) translateY(-15px);}}@media (prefers-reduced-motion:reduce){.szfy-val-petal,.szfy-val-petal-inner,.szfy-val-heart,.szfy-val-heart-beat,.szfy-val-bokeh,.szfy-val-vignette,.szfy-val-letter-wrap.szfy-active,.szfy-val-letter-wrap.szfy-pos-bc.szfy-active,.szfy-val-letter-wrap.szfy-pos-tc.szfy-active{animation:none !important;opacity:0 !important;}.szfy-val-vignette{opacity:0.75 !important;}}`,
html: '<div class="szfy-val-container" id="szfy-val-container"><div class="szfy-val-vignette"></div></div>',
js: `(function() {
var container = document.getElementById('szfy-val-container');
if (!container) return;
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
function getDeviceTier() {
var w = window.innerWidth;
var h = window.innerHeight;
var dpr = window.devicePixelRatio || 1;
var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var pixels = w * h;
if (w < 480 || (isTouch && pixels < 400000) || (isTouch && dpr < 2 && w < 768))
return 'small';
if (w < 1024 || (isTouch && w < 1200))
return 'medium';
return 'large';
}
var tier = getDeviceTier();
var configs = {
small:  { petals: 6,  hearts: 4,  bokeh: 2, petalInt: 2200, heartInt: 3200, bokehInt: 5000, burstP: 3, burstH: 2, burstB: 1, bokehMaxSize: 90,  bokehBlur: 8,  heartMax: 32, petalMax: 22 },
medium: { petals: 10, hearts: 7,  bokeh: 4, petalInt: 1400, heartInt: 2200, bokehInt: 3500, burstP: 4, burstH: 3, burstB: 2, bokehMaxSize: 130, bokehBlur: 11, heartMax: 38, petalMax: 26 },
large:  { petals: 16, hearts: 12, bokeh: 7, petalInt: 800,  heartInt: 1400, bokehInt: 2400, burstP: 7, burstH: 5, burstB: 3, bokehMaxSize: 170, bokehBlur: 14, heartMax: 44, petalMax: 30 }
};
var cfg = configs[tier];
var MAX_PETALS = cfg.petals;
var MAX_HEARTS = cfg.hearts;
var MAX_BOKEH  = cfg.bokeh;
var PETAL_INT  = cfg.petalInt;
var HEART_INT  = cfg.heartInt;
var BOKEH_INT  = cfg.bokehInt;
var activePetals = 0, activeHearts = 0, activeBokeh = 0;
var petalTimer, heartTimer, bokehTimer, wishTimeout;
var paused = false;
var petalPals = [
{ bg:'linear-gradient(135deg,#FFDDE5,#E8567F)', vein:'rgba(255,180,200,0.6)' },
{ bg:'linear-gradient(135deg,#FFD0DA,#D4405A)', vein:'rgba(255,160,180,0.6)' },
{ bg:'linear-gradient(135deg,#FFC8D6,#C93756)', vein:'rgba(255,150,170,0.5)' },
{ bg:'linear-gradient(135deg,#FFF0F3,#F28DA0)', vein:'rgba(255,200,210,0.5)' },
{ bg:'linear-gradient(135deg,#FFE8EE,#E06C8E)', vein:'rgba(255,190,200,0.5)' },
{ bg:'linear-gradient(135deg,#FFBCC8,#A02040)', vein:'rgba(255,140,160,0.5)' },
{ bg:'linear-gradient(135deg,#FFF5F7,#F0A0B0)', vein:'rgba(255,210,220,0.5)' },
{ bg:'linear-gradient(140deg,#FFD6EC,#D44068)', vein:'rgba(255,175,200,0.5)' }
];
var heartPals = [
{ fill:'#D42145', glow:'rgba(212,33,69,0.6)' },
{ fill:'#E63950', glow:'rgba(230,57,80,0.55)' },
{ fill:'#B81D3A', glow:'rgba(184,29,58,0.55)' },
{ fill:'#FF4D6D', glow:'rgba(255,77,109,0.5)' },
{ fill:'#C71F37', glow:'rgba(199,31,55,0.55)' },
{ fill:'#FF2D55', glow:'rgba(255,45,85,0.55)' },
{ fill:'#A01030', glow:'rgba(160,16,48,0.5)' }
];
var bokehPals = [
'radial-gradient(circle at 35% 35%,rgba(255,90,120,0.3),rgba(255,90,120,0.08) 60%,transparent)',
'radial-gradient(circle at 35% 35%,rgba(255,60,90,0.25),rgba(255,60,90,0.06) 60%,transparent)',
'radial-gradient(circle at 35% 35%,rgba(255,160,185,0.28),rgba(255,160,185,0.07) 60%,transparent)',
'radial-gradient(circle at 35% 35%,rgba(200,40,65,0.22),rgba(200,40,65,0.05) 60%,transparent)',
'radial-gradient(circle at 35% 35%,rgba(255,130,160,0.28),rgba(255,130,160,0.07) 60%,transparent)',
'radial-gradient(circle at 35% 35%,rgba(255,200,215,0.25),rgba(255,200,215,0.06) 60%,transparent)'
];
function rand(a,b){ return Math.random()*(b-a)+a; }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function heartSVG(c){
return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
+'<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 '
+'2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 '
+'14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86'
+'-8.55 11.54L12 21.35z" fill="'+c+'"/></svg>';
}
function createPetal(){
if(paused||activePetals>=MAX_PETALS) return;
var el=document.createElement('div');
el.className='szfy-val-petal';
var p=pick(petalPals);
var w=rand(14,cfg.petalMax);
var h=w*rand(1.2,1.6);
var dur=rand(9,16);
var spinDur=rand(4,10);
var opa=rand(0.5,0.8);
var d1=rand(-60,60),d2=rand(-90,90),d3=rand(-110,110);
el.style.cssText='left:'+rand(0,96)+'%;width:'+w+'px;height:'+h+'px;'
+'--vp-dur:'+dur+'s;--vp-opa:'+opa+';'
+'--vp-drift1:'+d1+'px;--vp-drift2:'+d2+'px;--vp-drift3:'+d3+'px;'
+'--vp-spin-dur:'+spinDur+'s;'
+'--vp-bg:'+p.bg+';--vp-vein:'+p.vein+';';
el.innerHTML='<div class="szfy-val-petal-inner"></div>';
container.appendChild(el);
activePetals++;
setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);activePetals--;},(dur+1)*1000);
}
function createHeart(){
if(paused||activeHearts>=MAX_HEARTS) return;
var el=document.createElement('div');
el.className='szfy-val-heart';
var p=pick(heartPals);
var size=rand(22,cfg.heartMax);
var dur=rand(11,18);
var swayDur=rand(3,6);
var sway=rand(14,36);
var opa=rand(0.45,0.75);
var travel=-1*(window.innerHeight+100);
el.style.cssText='left:'+rand(2,95)+'%;width:'+size+'px;height:'+size+'px;'
+'--vh-dur:'+dur+'s;--vh-sway-dur:'+swayDur+'s;--vh-sway:'+sway+'px;'
+'--vh-opa:'+opa+';--vh-travel:'+travel+'px;'
+'--vh-glow:'+p.glow+';--vh-glow-r:'+rand(8,16)+'px;';
el.innerHTML='<div class="szfy-val-heart-beat">'+heartSVG(p.fill)+'</div>';
container.appendChild(el);
activeHearts++;
setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);activeHearts--;},(dur+1)*1000);
}
function createBokeh(){
if(paused||activeBokeh>=MAX_BOKEH) return;
var el=document.createElement('div');
el.className='szfy-val-bokeh';
var size=rand(50,cfg.bokehMaxSize);
var dur=rand(14,24);
var opa=rand(0.3,0.55);
var blur=rand(4,cfg.bokehBlur);
el.style.cssText='left:'+rand(0,90)+'%;top:'+rand(0,85)+'%;'
+'width:'+size+'px;height:'+size+'px;'
+'--vbk-bg:'+pick(bokehPals)+';'
+'--vbk-dur:'+dur+'s;--vbk-opa:'+opa+';--vbk-blur:'+blur+'px;';
container.appendChild(el);
activeBokeh++;
setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);activeBokeh--;},(dur+1)*1000);
}
var wishes=[
{q:'Happy Valentine\\'s Day!', a:'Let love be the light that guides your way'},
{q:'Love is not something you find.\\nLove is something that finds you.', a:'Lorraine Hansberry'},
{q:'You are someone\\'s reason\\nto smile today.', a:'Happy Valentine\\'s Day'},
{q:'In all the world, there is no heart\\nfor me like yours.', a:'Maya Angelou'},
{q:'Love is the greatest\\nrefreshment in life.', a:'Pablo Picasso'},
{q:'Wherever you go,\\ngo with all your heart.', a:'Confucius'},
{q:'The best thing to hold onto\\nin life is each other.', a:'Audrey Hepburn'},
{q:'Love recognizes no barriers.', a:'Maya Angelou'}
];
var wishIdx=0;
var positions=[
{cls:'szfy-pos-bl',enter:'translateY(30px)', rest:'translateY(0)',exit:'translateY(-20px)'},
{cls:'szfy-pos-br',enter:'translateY(30px)', rest:'translateY(0)',exit:'translateY(-20px)'},
{cls:'szfy-pos-tl',enter:'translateY(-30px)',rest:'translateY(0)',exit:'translateY(20px)'},
{cls:'szfy-pos-tr',enter:'translateY(-30px)',rest:'translateY(0)',exit:'translateY(20px)'},
{cls:'szfy-pos-bc',enter:'translateX(-50%) translateY(30px)', rest:'translateX(-50%)',exit:'translateX(-50%) translateY(-20px)'},
{cls:'szfy-pos-tc',enter:'translateX(-50%) translateY(-30px)',rest:'translateX(-50%)',exit:'translateX(-50%) translateY(20px)'}
];
var lastPos=-1;
function showWish(){
if(paused) return;
var msg=wishes[wishIdx];
wishIdx=(wishIdx+1)%wishes.length;
var posIdx;
do{posIdx=Math.floor(rand(0,positions.length));}while(posIdx===lastPos&&positions.length>1);
lastPos=posIdx;
var pos=positions[posIdx];
var textHtml=msg.q.split('\\\\n').join('<br>');
var el=document.createElement('div');
el.className='szfy-val-letter-wrap '+pos.cls;
var isC=pos.cls==='szfy-pos-bc'||pos.cls==='szfy-pos-tc';
if(!isC){
el.style.setProperty('--vl-enter',pos.enter);
el.style.setProperty('--vl-rest',pos.rest);
el.style.setProperty('--vl-exit',pos.exit);
}
el.innerHTML='<div class="szfy-val-envelope">'
+'<div class="szfy-val-seal">\u2764\uFE0F</div>'
+'<div class="szfy-val-letter-quote">'+textHtml+'</div>'
+'<div class="szfy-val-letter-line"></div>'
+'<div class="szfy-val-letter-attr">'+msg.a+'</div></div>';
container.appendChild(el);
requestAnimationFrame(function(){requestAnimationFrame(function(){el.classList.add('szfy-active');});});
setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);},11500);
scheduleWish();
}
function scheduleWish(){
wishTimeout=setTimeout(showWish,rand(60,180)*1000);
}
function start(){
petalTimer=setInterval(createPetal,PETAL_INT);
heartTimer=setInterval(createHeart,HEART_INT);
bokehTimer=setInterval(createBokeh,BOKEH_INT);
}
function stop(){
clearInterval(petalTimer);
clearInterval(heartTimer);
clearInterval(bokehTimer);
}
function init(){
for(var i=0;i<cfg.burstP;i++)(function(x){setTimeout(createPetal,x*400+rand(0,300));})(i);
for(var j=0;j<cfg.burstH;j++)(function(x){setTimeout(createHeart,x*550+rand(0,350));})(j);
for(var k=0;k<cfg.burstB;k++)(function(x){setTimeout(createBokeh,x*800+rand(50,400));})(k);
start();
setTimeout(showWish,4000);
}
function onVis(){
if(document.hidden){paused=true;stop();}
else{paused=false;start();}
}
document.addEventListener('visibilitychange',onVis);
var resizeT;
function onResize(){
clearTimeout(resizeT);
resizeT=setTimeout(function(){
var newTier=getDeviceTier();
if(newTier!==tier){
tier=newTier;
cfg=configs[tier];
}
MAX_PETALS=cfg.petals; MAX_HEARTS=cfg.hearts; MAX_BOKEH=cfg.bokeh;
PETAL_INT=cfg.petalInt; HEART_INT=cfg.heartInt; BOKEH_INT=cfg.bokehInt;
stop(); start();
},300);
}
window.addEventListener('resize',onResize);
window.szfyValentinesDayCleanup=function(){
stop();
clearTimeout(resizeT);
clearTimeout(wishTimeout);
document.removeEventListener('visibilitychange',onVis);
window.removeEventListener('resize',onResize);
if(container) container.innerHTML='';
activePetals=0;activeHearts=0;activeBokeh=0;
};
init();
})();`
};
if (typeof window !== 'undefined' && window.SeazonifyController) {
window.SeazonifyController.injectVisualEffect(valentinesDayEffect);
}
if (typeof module !== 'undefined' && module.exports) {
module.exports = valentinesDayEffect;
}