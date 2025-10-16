// Diwali Fireworks Effect for Seazonify Controller
// Compatible with SeazonifyController.injectVisualEffect()
// Usage: SeazonifyController.injectVisualEffect(diwaliFireworksEffect);

const diwaliFireworksEffect = {
    name: "Diwali Fireworks",
    description: "Continuous Diwali fireworks celebration with beautiful particle effects",
    author: "Md Mim Akhtar",
    type: "visual",
    icon: "🎆",
    thumbnail: "https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/thumbnails/diwali-fireworks.webp",
    version: "1.0.1",
    license: "https://seazonify.com/license",
    created: "2025-01-14",
    category: "festival",
    tags: ["diwali", "fireworks", "festival", "celebration", "lights"],
    css: `
      .szfy-diwali-fireworks {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
        background-color: transparent;
      }
  
      .szfy-diwali-fireworks * {
        position: relative;
        box-sizing: border-box; 
      }
  
  
      .szfy-diwali-fireworks .remove {
        display: none !important;
      }
  
  
  
      .szfy-diwali-fireworks .stage-container {
        overflow: hidden;
        box-sizing: initial;
        border: none;
        margin: 0;
        background: transparent;
      }
  
  
      .szfy-diwali-fireworks .canvas-container {
        width: 100%;
        height: 100%;
        background: transparent;
      }
  
      .szfy-diwali-fireworks .canvas-container canvas {
        position: absolute;
        mix-blend-mode: normal;
        transform: translateZ(0);
      }
  
  
  
    `,
    html: `
      <div class="szfy-diwali-fireworks" id="szfy-diwali-fireworks-container">
        <div class="stage-container">
          <div class="canvas-container">
            <canvas id="trails-canvas"></canvas>
            <canvas id="main-canvas"></canvas>
          </div>
        </div>
      </div>
    `,
    js: `
      (function() {
        'use strict';
  
        class Stage {
          constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.dpr = window.devicePixelRatio || 1;
            this.width = 0;
            this.height = 0;
          }
  
          resize(width, height) {
            this.width = width;
            this.height = height;
            this.canvas.width = width * this.dpr;
            this.canvas.height = height * this.dpr;
            this.canvas.style.width = width + 'px';
            this.canvas.style.height = height + 'px';
            this.ctx.scale(this.dpr, this.dpr);
          }
  
          addEventListener(event, handler) {
            this.canvas.addEventListener(event, handler);
          }
        }
  
        const MyMath = {
          clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
          },
  
          random(min, max) {
            return Math.random() * (max - min) + min;
          },
  
          randomChoice(array) {
            return array[Math.floor(Math.random() * array.length)];
          },
  
          pointDist(x1, y1, x2, y2) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            return Math.sqrt(dx * dx + dy * dy);
          },
  
          pointAngle(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
          },
          
          randomChoice(array) {
            return array[Math.random() * array.length | 0];
          }
        };
  
        const IS_DESKTOP = window.innerWidth > 800;
        const IS_HEADER = IS_DESKTOP && window.innerHeight < 300;
        const IS_HIGH_END_DEVICE = (() => {
          const hwConcurrency = navigator.hardwareConcurrency;
          if (!hwConcurrency) {
            return false;
          }
          const minCount = window.innerWidth <= 1024 ? 4 : 8;
          return hwConcurrency >= minCount;
        })();
        const MAX_WIDTH = 7680;
        const MAX_HEIGHT = 4320;
        const GRAVITY = 0.9;
        let simSpeed = 1;
  
        function getDefaultScaleFactor() {
          if (IS_HEADER) return 0.75;
          return 1;
        }
  
        let stageW, stageH;
  
        let quality = 1;
        let isLowQuality = false;
        let isNormalQuality = true;
        let isHighQuality = false;
  
        const QUALITY_LOW = 1;
        const QUALITY_NORMAL = 2;
        const QUALITY_HIGH = 3;
  
  
        const COLOR = {
          Red: '#ff0043',
          Green: '#14fc56',
          Blue: '#1e7fff',
          Purple: '#e60aff',
          Gold: '#ffbf36',
          White: '#ffffff'
        };
  
        const INVISIBLE = '_INVISIBLE_';
  
        const PI_2 = Math.PI * 2;
        const PI_HALF = Math.PI * 0.5;
  
        const trailsStage = new Stage('trails-canvas');
        const mainStage = new Stage('main-canvas');
        const stages = [
          trailsStage,
          mainStage
        ];
  
  
        const store = {
          _listeners: new Set(),
          _dispatch(prevState) {
            this._listeners.forEach(listener => listener(this.state, prevState))
          },
          
          state: {
            paused: false,
            soundEnabled: true,
            config: {
              quality: String(IS_HIGH_END_DEVICE ? QUALITY_HIGH : QUALITY_NORMAL),
              shell: 'Random',
              size: IS_DESKTOP ? '3' : IS_HEADER ? '1.2' : '2',
              autoLaunch: true,
              finale: false,
              longExposure: false,
              scaleFactor: getDefaultScaleFactor()
            }
          },
          
          setState(nextState) {
            const prevState = this.state;
            this.state = Object.assign({}, this.state, nextState);
            this._dispatch(prevState);
          },
          
          subscribe(listener) {
            this._listeners.add(listener);
            return () => this._listeners.remove(listener);
          },
          
        };
  
  
  
  
        function configDidUpdate() {
          const config = store.state.config;
          
          quality = qualitySelector();
          isLowQuality = quality === QUALITY_LOW;
          isNormalQuality = quality === QUALITY_NORMAL;
          isHighQuality = quality === QUALITY_HIGH;
          
          if (appNodes.canvasContainer) {
            appNodes.canvasContainer.style.backgroundColor = 'transparent';
          }
          
          Spark.drawWidth = quality === QUALITY_HIGH ? 0.75 : 1;
        }
  
  
        const isRunning = (state=store.state) => !state.paused;
        const soundEnabledSelector = (state=store.state) => state.soundEnabled;
        const canPlaySoundSelector = (state=store.state) => isRunning(state) && soundEnabledSelector(state);
        const qualitySelector = () => +store.state.config.quality;
        const shellNameSelector = () => store.state.config.shell;
        const shellSizeSelector = () => +store.state.config.size;
        const finaleSelector = () => store.state.config.finale;
        const scaleFactorSelector = () => store.state.config.scaleFactor;
  
  
        const appNodes = {
          stageContainer: '.stage-container',
          canvasContainer: '.canvas-container'
        };
  
        Object.keys(appNodes).forEach(key => {
          appNodes[key] = document.querySelector(appNodes[key]);
        });
  
        const COLOR_CODES = Object.values(COLOR);
        const COLOR_CODES_W_INVIS = [...COLOR_CODES, INVISIBLE];
  
        function randomColorSimple() {
          return COLOR_CODES[Math.random() * COLOR_CODES.length | 0];
        }
  
        let lastColor;
        function randomColor(options) {
          const notSame = options && options.notSame;
          const notColor = options && options.notColor;
          const limitWhite = options && options.limitWhite;
          let color = randomColorSimple();
          
          if (limitWhite && color === COLOR.White && Math.random() < 0.6) {
            color = randomColorSimple();
          }
          
          if (notSame) {
            while (color === lastColor) {
              color = randomColorSimple();
            }
          }
          else if (notColor) {
            while (color === notColor) {
              color = randomColorSimple();
            }
          }
          
          lastColor = color;
          return color;
        }
  
        function whiteOrGold() {
          return Math.random() < 0.5 ? COLOR.Gold : COLOR.White;
        }
  
        function makePistilColor(shellColor) {
          return (shellColor === COLOR.White || shellColor === COLOR.Gold) ? randomColor({ notColor: shellColor }) : whiteOrGold();
        }
  
        const crysanthemumShell = (size=1) => {
          const glitter = Math.random() < 0.25;
          const singleColor = Math.random() < 0.72;
          const color = singleColor ? randomColor({ limitWhite: true }) : [randomColor(), randomColor({ notSame: true })];
          const pistil = singleColor && Math.random() < 0.42;
          const pistilColor = pistil && makePistilColor(color);
          const secondColor = singleColor && (Math.random() < 0.2 || color === COLOR.White) ? pistilColor || randomColor({ notColor: color, limitWhite: true }) : null;
          const streamers = !pistil && color !== COLOR.White && Math.random() < 0.42;
          let starDensity = glitter ? 1.1 : 1.25;
          if (isLowQuality) starDensity *= 0.8;
          if (isHighQuality) starDensity = 1.2;
          return {
            shellSize: size,
            spreadSize: 300 + size * 100,
            starLife: 900 + size * 200,
            starDensity,
            color,
            secondColor,
            glitter: glitter ? 'light' : '',
            glitterColor: whiteOrGold(),
            pistil,
            pistilColor,
            streamers
          };
        };
  
        const ghostShell = (size=1) => {
          const shell = crysanthemumShell(size);
          shell.starLife *= 1.5;
          let ghostColor = randomColor({ notColor: COLOR.White });
          shell.streamers = true;
          const pistil = Math.random() < 0.42;
          const pistilColor = pistil && makePistilColor(ghostColor);
          shell.color = INVISIBLE;
          shell.secondColor = ghostColor;
          shell.glitter = '';
          
          return shell;
        };
  
        const strobeShell = (size=1) => {
          const color = randomColor({ limitWhite: true });
          return {
            shellSize: size,
            spreadSize: 280 + size * 92,
            starLife: 1100 + size * 200,
            starLifeVariation: 0.40,
            starDensity: 1.1,
            color,
            glitter: 'light',
            glitterColor: COLOR.White,
            strobe: true,
            strobeColor: Math.random() < 0.5 ? COLOR.White : null,
            pistil: Math.random() < 0.5,
            pistilColor: makePistilColor(color)
          };
        };
  
        const palmShell = (size=1) => {
          const color = randomColor();
          const thick = Math.random() < 0.5;
          return {
            shellSize: size,
            color,
            spreadSize: 250 + size * 75,
            starDensity: thick ? 0.15 : 0.4,
            starLife: 1800 + size * 200,
            glitter: thick ? 'thick' : 'heavy'
          };
        };
  
        const ringShell = (size=1) => {
          const color = randomColor();
          const pistil = Math.random() < 0.75;
          return {
            shellSize: size,
            ring: true,
            color,
            spreadSize: 300 + size * 100,
            starLife: 900 + size * 200,
            starCount: 2.2 * PI_2 * (size+1),
            pistil,
            pistilColor: makePistilColor(color),
            glitter: !pistil ? 'light' : '',
            glitterColor: color === COLOR.Gold ? COLOR.Gold : COLOR.White,
            streamers: Math.random() < 0.3
          };
        };
  
        const crossetteShell = (size=1) => {
          const color = randomColor({ limitWhite: true });
          return {
            shellSize: size,
            spreadSize: 300 + size * 100,
            starLife: 750 + size * 160,
            starLifeVariation: 0.4,
            starDensity: 0.85,
            color,
            crossette: true,
            pistil: Math.random() < 0.5,
            pistilColor: makePistilColor(color)
          };
        };
  
  
  
        const crackleShell = (size=1) => {
          const color = Math.random() < 0.75 ? COLOR.Gold : randomColor();
          return {
            shellSize: size,
            spreadSize: 380 + size * 75,
            starDensity: isLowQuality ? 0.65 : 1,
            starLife: 600 + size * 100,
            starLifeVariation: 0.32,
            glitter: 'light',
            glitterColor: COLOR.Gold,
            color,
            crackle: true,
            pistil: Math.random() < 0.65,
            pistilColor: makePistilColor(color)
          };
        };
  
        const horsetailShell = (size=1) => {
          const color = randomColor();
          return {
            shellSize: size,
            horsetail: true,
            color,
            spreadSize: 250 + size * 38,
            starDensity: 0.9,
            starLife: 2500 + size * 300,
            glitter: 'medium',
            glitterColor: Math.random() < 0.5 ? whiteOrGold() : color,
            // Add strobe effect to white horsetails, to make them more interesting
            strobe: color === COLOR.White
          };
        };
  
        function randomShellName() {
          return Math.random() < 0.5 ? 'Crysanthemum' : shellNames[(Math.random() * (shellNames.length - 1) + 1) | 0 ];
        }
  
        function randomShell(size) {
          return shellTypes[randomShellName()](size);
        }
  
        function shellFromConfig(size) {
          return shellTypes[shellNameSelector()](size);
        }
  
        function randomFastShell() {
          const isRandom = shellNameSelector() === 'Random';
          let shellName = isRandom ? randomShellName() : shellNameSelector();
          return shellTypes[shellName];
        }
  
        const shellTypes = {
          'Random': randomShell,
          'Crackle': crackleShell,
          'Crossette': crossetteShell,
          'Crysanthemum': crysanthemumShell,
          'Ghost': ghostShell,
          'Horse Tail': horsetailShell,
          'Palm': palmShell,
          'Ring': ringShell,
          'Strobe': strobeShell
        };
  
        const shellNames = Object.keys(shellTypes);
  
        function init() {
          configDidUpdate();
        }
  
        function fitShellPositionInBoundsH(position) {
          const edge = 0.18;
          return (1 - edge*2) * position + edge;
        }
  
        function fitShellPositionInBoundsV(position) {
          return position * 0.75;
        }
  
        function getRandomShellPositionH() {
          return fitShellPositionInBoundsH(Math.random());
        }
  
        function getRandomShellPositionV() {
          return fitShellPositionInBoundsV(Math.random());
        }
  
        function getRandomShellSize() {
          const baseSize = shellSizeSelector();
          const maxVariance = Math.min(2.5, baseSize);
          const variance = Math.random() * maxVariance;
          const size = baseSize - variance;
          const height = maxVariance === 0 ? Math.random() : 1 - (variance / maxVariance);
          const centerOffset = Math.random() * (1 - height * 0.65) * 0.5;
          const x = Math.random() < 0.5 ? 0.5 - centerOffset : 0.5 + centerOffset;
          return {
            size,
            x: fitShellPositionInBoundsH(x),
            height: fitShellPositionInBoundsV(height)
          };
        }
  
  
  
        function seqRandomShell() {
          const size = getRandomShellSize();
          const shell = new Shell(shellFromConfig(size.size));
          shell.launch(size.x, size.height);
          
          let extraDelay = shell.starLife;
          if (shell.fallingLeaves) {
            extraDelay = 4600;
          }
          
          return 900 + Math.random() * 600 + extraDelay;
        }
  
        function seqRandomFastShell() {
          const shellType = randomFastShell();
          const size = getRandomShellSize();
          const shell = new Shell(shellType(size.size));
          shell.launch(size.x, size.height);
          
          let extraDelay = shell.starLife;
          
          return 900 + Math.random() * 600 + extraDelay;
        }
  
        function seqTwoRandom() {
          const size1 = getRandomShellSize();
          const size2 = getRandomShellSize();
          const shell1 = new Shell(shellFromConfig(size1.size));
          const shell2 = new Shell(shellFromConfig(size2.size));
          const leftOffset = Math.random() * 0.2 - 0.1;
          const rightOffset = Math.random() * 0.2 - 0.1;
          shell1.launch(0.3 + leftOffset, size1.height);
          setTimeout(() => {
            shell2.launch(0.7 + rightOffset, size2.height);
          }, 100);
          
          let extraDelay = Math.max(shell1.starLife, shell2.starLife);
          if (shell1.fallingLeaves || shell2.fallingLeaves) {
            extraDelay = 4600;
          }
          
          return 900 + Math.random() * 600 + extraDelay;
        }
  
        function seqTriple() {
          const shellType = randomFastShell();
          const baseSize = shellSizeSelector();
          const smallSize = Math.max(0, baseSize - 1.25);
          
          const offset = Math.random() * 0.08 - 0.04;
          const shell1 = new Shell(shellType(baseSize));
          shell1.launch(0.5 + offset, 0.7);
          
          const leftDelay = 1000 + Math.random() * 400;
          const rightDelay = 1000 + Math.random() * 400;
          
          setTimeout(() => {
            const offset = Math.random() * 0.08 - 0.04;
            const shell2 = new Shell(shellType(smallSize));
            shell2.launch(0.2 + offset, 0.1);
          }, leftDelay);
          
          setTimeout(() => {
            const offset = Math.random() * 0.08 - 0.04;
            const shell3 = new Shell(shellType(smallSize));
            shell3.launch(0.8 + offset, 0.1);
          }, rightDelay);
          
          return 4000;
        }
  
        function seqPyramid() {
          const barrageCountHalf = IS_DESKTOP ? 7 : 4;
          const largeSize = shellSizeSelector();
          const smallSize = Math.max(0, largeSize - 3);
          const randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
          const randomSpecialShell = randomShell;
  
          function launchShell(x, useSpecial) {
            const isRandom = shellNameSelector() === 'Random';
            let shellType = isRandom
              ? useSpecial ? randomSpecialShell : randomMainShell
              : shellTypes[shellNameSelector()];
            const shell = new Shell(shellType(useSpecial ? largeSize : smallSize));
            const height = x <= 0.5 ? x / 0.5 : (1 - x) / 0.5;
            shell.launch(x, useSpecial ? 0.75 : height * 0.42);
          }
          
          let count = 0;
          let delay = 0;
          while(count <= barrageCountHalf) {
            if (count === barrageCountHalf) {
              setTimeout(() => {
                launchShell(0.5, true);
              }, delay);
            } else {
              const offset = count / barrageCountHalf * 0.5;
              const delayOffset = Math.random() * 30 + 30;
              setTimeout(() => {
                launchShell(offset, false);
              }, delay);
              setTimeout(() => {
                launchShell(1 - offset, false);
              }, delay + delayOffset);
            }
            
            count++;
            delay += 200;
          }
          
          return 3400 + barrageCountHalf * 250;
        }
  
        function seqSmallBarrage() {
          seqSmallBarrage.lastCalled = Date.now();
          const barrageCount = IS_DESKTOP ? 11 : 5;
          const specialIndex = IS_DESKTOP ? 3 : 1;
          const shellSize = Math.max(0, shellSizeSelector() - 2);
          const randomMainShell = Math.random() < 0.78 ? crysanthemumShell : ringShell;
          const randomSpecialShell = randomFastShell();
          
          // (cos(x*5π+0.5π)+1)/2 is a custom wave bounded by 0 and 1 used to set varying launch heights
          function launchShell(x, useSpecial) {
            const isRandom = shellNameSelector() === 'Random';
            let shellType = isRandom
              ? useSpecial ? randomSpecialShell : randomMainShell
              : shellTypes[shellNameSelector()];
            const shell = new Shell(shellType(shellSize));
            const height = (Math.cos(x*5*Math.PI + PI_HALF) + 1) / 2;
            shell.launch(x, height * 0.75);
          }
          
          let count = 0;
          let delay = 0;
          while(count < barrageCount) {
            if (count === 0) {
              launchShell(0.5, false)
              count += 1;
            }
            else {
              const offset = (count + 1) / barrageCount / 2;
              const delayOffset = Math.random() * 30 + 30;
              const useSpecial = count === specialIndex;
              setTimeout(() => {
                launchShell(0.5 + offset, useSpecial);
              }, delay);
              setTimeout(() => {
                launchShell(0.5 - offset, useSpecial);
              }, delay + delayOffset);
              count += 2;
            }
            delay += 200;
          }
          
          return 3400 + barrageCount * 120;
        }
        seqSmallBarrage.cooldown = 15000;
        seqSmallBarrage.lastCalled = Date.now();
  
        const sequences = [
          seqRandomShell,
          seqTwoRandom,
          seqTriple,
          seqPyramid,
          seqSmallBarrage
        ];
  
        let isFirstSeq = true;
        const finaleCount = 32;
        let currentFinaleCount = 0;
        function startSequence() {
          if (isFirstSeq) {
            isFirstSeq = false;
            if (IS_HEADER) {
              return seqTwoRandom();
            }
            else {
              const shell = new Shell(crysanthemumShell(shellSizeSelector()));
              shell.launch(0.5, 0.5);
              return 2400;
            }
          }
          
          if (finaleSelector()) {
            seqRandomFastShell();
            if (currentFinaleCount < finaleCount) {
              currentFinaleCount++;
              return 170;
            }
            else {
              currentFinaleCount = 0;
              return 6000;
            }
          }
          
          const rand = Math.random();
          
          if (rand < 0.08 && Date.now() - seqSmallBarrage.lastCalled > seqSmallBarrage.cooldown) {
            return seqSmallBarrage();
          }
          
          if (rand < 0.1) {
            return seqPyramid();
          }
          
          if (rand < 0.6 && !IS_HEADER) {
            return seqRandomShell();
          }
          else if (rand < 0.8) {
            return seqTwoRandom();
          }
          else if (rand < 1) {
            return seqTriple();
          }
        }
  
  
        function handleResize() {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const containerW = Math.min(w, MAX_WIDTH);
          const containerH = w <= 420 ? h : Math.min(h, MAX_HEIGHT);
          appNodes.stageContainer.style.width = containerW + 'px';
          appNodes.stageContainer.style.height = containerH + 'px';
          stages.forEach(stage => stage.resize(containerW, containerH));
          const scaleFactor = scaleFactorSelector();
          stageW = containerW / scaleFactor;
          stageH = containerH / scaleFactor;
        }
  
        handleResize();
  
        window.addEventListener('resize', handleResize);
  
        let currentFrame = 0;
        let autoLaunchTime = 0;
  
  
        function updateGlobals(timeStep, lag) {
          currentFrame++;
          
          if (store.state.config.autoLaunch) {
            autoLaunchTime -= timeStep;
            if (autoLaunchTime <= 0) {
              autoLaunchTime = startSequence() * 1.25;
            }
          }
        }
  
        function update(frameTime, lag) {
          if (!isRunning()) {
            return;
          }
          
          const width = stageW;
          const height = stageH;
          const timeStep = frameTime * simSpeed;
          const speed = simSpeed * lag;
          
          updateGlobals(timeStep, lag);
          
          const starDrag = 1 - (1 - Star.airDrag) * speed;
          const starDragHeavy = 1 - (1 - Star.airDragHeavy) * speed;
          const sparkDrag = 1 - (1 - Spark.airDrag) * speed;
          const gAcc = timeStep / 1000 * GRAVITY;
          COLOR_CODES_W_INVIS.forEach(color => {
            // Stars
            const stars = Star.active[color];
            for (let i=stars.length-1; i>=0; i=i-1) {
              const star = stars[i];
              // Only update each star once per frame. Since color can change, it's possible a star could update twice without this, leading to a "jump".
              if (star.updateFrame === currentFrame) {
                continue;
              }
              star.updateFrame = currentFrame;
              
              star.life -= timeStep;
              if (star.life <= 0) {
                stars.splice(i, 1);
                Star.returnInstance(star);
              } else {
                const burnRate = Math.pow(star.life / star.fullLife, 0.5);
                const burnRateInverse = 1 - burnRate;
  
                star.prevX = star.x;
                star.prevY = star.y;
                star.x += star.speedX * speed;
                star.y += star.speedY * speed;
                // Apply air drag if star isn't "heavy". The heavy property is used for the shell comets.
                if (!star.heavy) {
                  star.speedX *= starDrag;
                  star.speedY *= starDrag;
                }
                else {
                  star.speedX *= starDragHeavy;
                  star.speedY *= starDragHeavy;
                }
                star.speedY += gAcc;
                
                if (star.spinRadius) {
                  star.spinAngle += star.spinSpeed * speed;
                  star.x += Math.sin(star.spinAngle) * star.spinRadius * speed;
                  star.y += Math.cos(star.spinAngle) * star.spinRadius * speed;
                }
                
                if (star.sparkFreq) {
                  star.sparkTimer -= timeStep;
                  while (star.sparkTimer < 0) {
                    star.sparkTimer += star.sparkFreq * 0.75 + star.sparkFreq * burnRateInverse * 4;
                    Spark.add(
                      star.x,
                      star.y,
                      star.sparkColor,
                      Math.random() * PI_2,
                      Math.random() * star.sparkSpeed * burnRate,
                      star.sparkLife * 0.8 + Math.random() * star.sparkLifeVariation * star.sparkLife
                    );
                  }
                }
                
                // Handle star transitions
                if (star.life < star.transitionTime) {
                  if (star.secondColor && !star.colorChanged) {
                    star.colorChanged = true;
                    star.color = star.secondColor;
                    stars.splice(i, 1);
                    Star.active[star.secondColor].push(star);
                    if (star.secondColor === INVISIBLE) {
                      star.sparkFreq = 0;
                    }
                  }
                  
                  if (star.strobe) {
                    // Strobes in the following pattern: on:off:off:on:off:off in increments of \`strobeFreq\` ms.
                    star.visible = Math.floor(star.life / star.strobeFreq) % 3 === 0;
                  }
                }
              }
            }
                                        
            // Sparks
            const sparks = Spark.active[color];
            for (let i=sparks.length-1; i>=0; i=i-1) {
              const spark = sparks[i];
              spark.life -= timeStep;
              if (spark.life <= 0) {
                sparks.splice(i, 1);
                Spark.returnInstance(spark);
              } else {
                spark.prevX = spark.x;
                spark.prevY = spark.y;
                spark.x += spark.speedX * speed;
                spark.y += spark.speedY * speed;
                spark.speedX *= sparkDrag;
                spark.speedY *= sparkDrag;
                spark.speedY += gAcc;
              }
            }
          });
          
          render(speed);
        }
  
        function render(speed) {
          const { dpr } = mainStage;
          const width = stageW;
          const height = stageH;
          const trailsCtx = trailsStage.ctx;
          const mainCtx = mainStage.ctx;
          
          // Use stronger fade to completely remove old trails without leaving marks
          trailsCtx.globalCompositeOperation = 'destination-out';
          // Higher alpha = faster fade. Keep dynamic with speed for realism.
          trailsCtx.fillStyle = \`rgba(0, 0, 0, \${store.state.config.longExposure ? 0.02 : 0.08 * speed})\`;
          trailsCtx.fillRect(0, 0, width, height);
          
          mainCtx.clearRect(0, 0, width, height);
          
          // Draw queued burst flashes
          // These must also be drawn using source-over due to Safari. Seems rendering the gradients using lighten draws large black boxes instead.
          // Thankfully, these burst flashes look pretty much the same either way.
          while (BurstFlash.active.length) {
            const bf = BurstFlash.active.pop();
            
            const burstGradient = trailsCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);
            burstGradient.addColorStop(0.024, 'rgba(255, 255, 255, 1)');
            burstGradient.addColorStop(0.125, 'rgba(255, 160, 20, 0.2)');
            burstGradient.addColorStop(0.32, 'rgba(255, 140, 20, 0.11)');
            burstGradient.addColorStop(1, 'rgba(255, 120, 20, 0)');
            trailsCtx.fillStyle = burstGradient;
            trailsCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);
            
            BurstFlash.returnInstance(bf);
          }
          
          // Use additive blending for new trails
          trailsCtx.globalCompositeOperation = 'lighter';
          
          // Draw stars
          trailsCtx.lineWidth = Star.drawWidth;
          trailsCtx.lineCap = isLowQuality ? 'square' : 'round';
          COLOR_CODES.forEach(color => {
            const stars = Star.active[color];
            trailsCtx.strokeStyle = color;
            trailsCtx.beginPath();
            stars.forEach(star => {
              if (star.visible) {
                trailsCtx.moveTo(star.x, star.y);
                trailsCtx.lineTo(star.prevX, star.prevY);
              }
            });
            trailsCtx.stroke();
          });
  
          // Draw sparks
          trailsCtx.lineWidth = Spark.drawWidth;
          trailsCtx.lineCap = 'butt';
          COLOR_CODES.forEach(color => {
            const sparks = Spark.active[color];
            trailsCtx.strokeStyle = color;
            trailsCtx.beginPath();
            sparks.forEach(spark => {
              trailsCtx.moveTo(spark.x, spark.y);
              trailsCtx.lineTo(spark.prevX, spark.prevY);
            });
            trailsCtx.stroke();
          });
          
          
          trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
          mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        }
  
  
        // Start animation loop manually since we don't have a ticker system
        let lastTime = 0;
        function animationLoop(currentTime) {
          const deltaTime = currentTime - lastTime;
          lastTime = currentTime;
          
          update(deltaTime, 1);
          requestAnimationFrame(animationLoop);
        }
        
        requestAnimationFrame(animationLoop);
  
        function createParticleArc(start, arcLength, count, randomness, particleFactory) {
          const angleDelta = arcLength / count;
          const end = start + arcLength - (angleDelta * 0.5);
          
          if (end > start) {
            for (let angle=start; angle<end; angle=angle+angleDelta) {
              particleFactory(angle + Math.random() * angleDelta * randomness);
            }
          } else {
            for (let angle=start; angle>end; angle=angle+angleDelta) {
              particleFactory(angle + Math.random() * angleDelta * randomness);
            }
          }
        }
  
        function createBurst(count, particleFactory, startAngle=0, arcLength=PI_2) {
          const R = 0.5 * Math.sqrt(count/Math.PI);
          const C = 2 * R * Math.PI;
          const C_HALF = C / 2;
          
          for (let i=0; i<=C_HALF; i++) {
            const ringAngle = i / C_HALF * PI_HALF;
            const ringSize = Math.cos(ringAngle);
            const partsPerFullRing = C * ringSize;
            const partsPerArc = partsPerFullRing * (arcLength / PI_2);
            
            const angleInc = PI_2 / partsPerFullRing;
            const angleOffset = Math.random() * angleInc + startAngle;
            const maxRandomAngleOffset = angleInc * 0.33;
            
            for (let i=0; i<partsPerArc; i++) {
              const randomAngleOffset = Math.random() * maxRandomAngleOffset;
              let angle = angleInc * i + angleOffset + randomAngleOffset;
              particleFactory(angle, ringSize);
            }
          }
        }
  
  
        function crossetteEffect(star) {
          const startAngle = Math.random() * PI_HALF;
          createParticleArc(startAngle, PI_2, 4, 0.5, (angle) => {
            Star.add(
              star.x,
              star.y,
              star.color,
              angle,
              Math.random() * 0.6 + 0.75,
              600
            );
          });
        }
  
        function floralEffect(star) {
          const count = 12 + 6 * quality;
          createBurst(count, (angle, speedMult) => {
            Star.add(
              star.x,
              star.y,
              star.color,
              angle,
              speedMult * 2.4,
              1000 + Math.random() * 300,
              star.speedX,
              star.speedY
            );
          });
          // Queue burst flash render
          BurstFlash.add(star.x, star.y, 46);
          soundManager.playSound('burstSmall');
        }
  
  
        function crackleEffect(star) {
          const count = isHighQuality ? 32 : 16;
          createParticleArc(0, PI_2, count, 1.8, (angle) => {
            Spark.add(
              star.x,
              star.y,
              COLOR.Gold,
              angle,
              // apply near cubic falloff to speed (places more particles towards outside)
              Math.pow(Math.random(), 0.45) * 2.4,
              300 + Math.random() * 200
            );
          });
        }
  
        /**
         * Shell can be constructed with options:
         *
         * spreadSize:      Size of the burst.
         * starCount: Number of stars to create. This is optional, and will be set to a reasonable quantity for size if omitted.
         * starLife:
         * starLifeVariation:
         * color:
         * glitterColor:
         * glitter: One of: 'light', 'medium', 'heavy', 'streamer', 'willow'
         * pistil:
         * pistilColor:
         * streamers:
         * crossette:
         * floral:
         * crackle:
         */
        class Shell {
          constructor(options) {
            Object.assign(this, options);
            this.starLifeVariation = options.starLifeVariation || 0.125;
            this.color = options.color || randomColor();
            this.glitterColor = options.glitterColor || this.color;
                    
            // Set default starCount if needed, will be based on shell size and scale exponentially, like a sphere's surface area.
            if (!this.starCount) {
              const density = options.starDensity || 1;
              const scaledSize = this.spreadSize / 54;
              this.starCount = Math.max(6, scaledSize * scaledSize * density);
            }
          }
          
          launch(position, launchHeight) {
            const width = stageW;
            const height = stageH;
            // Distance from sides of screen to keep shells.
            const hpad = 60;
            // Distance from top of screen to keep shell bursts.
            const vpad = 50;
            // Minimum burst height, as a percentage of stage height
            const minHeightPercent = 0.45;
            // Minimum burst height in px
            const minHeight = height - height * minHeightPercent;
            
            const launchX = position * (width - hpad * 2) + hpad;
            const launchY = height;
            const burstY = minHeight - (launchHeight * (minHeight - vpad));
            
            const launchDistance = launchY - burstY;
            // Using a custom power curve to approximate Vi needed to reach launchDistance under gravity and air drag.
            // Magic numbers came from testing.
            const launchVelocity = Math.pow(launchDistance * 0.04, 0.64);
            
            const comet = this.comet = Star.add(
              launchX,
              launchY,
              typeof this.color === 'string' && this.color !== 'random' ? this.color : COLOR.White,
              Math.PI,
              launchVelocity * (this.horsetail ? 1.2 : 1),
              // Hang time is derived linearly from Vi; exact number came from testing
              launchVelocity * (this.horsetail ? 100 : 400)
            );
            
            // making comet "heavy" limits air drag
            comet.heavy = true;
            // comet spark trail
            comet.spinRadius = MyMath.random(0.32, 0.85);
            comet.sparkFreq = 32 / quality;
            if (isHighQuality) comet.sparkFreq = 8;
            comet.sparkLife = 320;
            comet.sparkLifeVariation = 3;
            if (this.glitter === 'willow' || this.fallingLeaves) {
              comet.sparkFreq = 20 / quality;
              comet.sparkSpeed = 0.5;
              comet.sparkLife = 500;
            }
            if (this.color === INVISIBLE) {
              comet.sparkColor = COLOR.Gold;
            }
            
            // Randomly make comet "burn out" a bit early.
            // This is disabled for horsetail shells, due to their very short airtime.
            if (Math.random() > 0.4 && !this.horsetail) {
              comet.secondColor = INVISIBLE;
              comet.transitionTime = Math.pow(Math.random(), 1.5) * 700 + 500;
            }
            
            comet.onDeath = comet => this.burst(comet.x, comet.y);
            
            soundManager.playSound('lift');
          }
          
          burst(x, y) {
            // Set burst speed so overall burst grows to set size. This specific formula was derived from testing, and is affected by simulated air drag.
            const speed = this.spreadSize / 96;
  
            let color, onDeath, sparkFreq, sparkSpeed, sparkLife;
            let sparkLifeVariation = 0.25;
            // Some death effects, like crackle, play a sound, but should only be played once.
            let playedDeathSound = false;
            
            if (this.crossette) onDeath = (star) => {
              if (!playedDeathSound) {
                soundManager.playSound('crackleSmall');
                playedDeathSound = true;
              }
              crossetteEffect(star);
            }
            if (this.crackle) onDeath = (star) => {
              if (!playedDeathSound) {
                soundManager.playSound('crackle');
                playedDeathSound = true;
              }
              crackleEffect(star);
            }
            if (this.floral) onDeath = floralEffect;
            if (this.fallingLeaves) onDeath = fallingLeavesEffect;
            
            if (this.glitter === 'light') {
              sparkFreq = 400;
              sparkSpeed = 0.3;
              sparkLife = 300;
              sparkLifeVariation = 2;
            }
            else if (this.glitter === 'medium') {
              sparkFreq = 200;
              sparkSpeed = 0.44;
              sparkLife = 700;
              sparkLifeVariation = 2;
            }
            else if (this.glitter === 'heavy') {
              sparkFreq = 80;
              sparkSpeed = 0.8;
              sparkLife = 1400;
              sparkLifeVariation = 2;
            }
            else if (this.glitter === 'thick') {
              sparkFreq = 16;
              sparkSpeed = isHighQuality ? 1.65 : 1.5;
              sparkLife = 1400;
              sparkLifeVariation = 3;
            }
            else if (this.glitter === 'streamer') {
              sparkFreq = 32;
              sparkSpeed = 1.05;
              sparkLife = 620;
              sparkLifeVariation = 2;
            }
            else if (this.glitter === 'willow') {
              sparkFreq = 120;
              sparkSpeed = 0.34;
              sparkLife = 1400;
              sparkLifeVariation = 3.8;
            }
            
            // Apply quality to spark count
            sparkFreq = sparkFreq / quality;
            
            // Star factory for primary burst, pistils, and streamers.
            let firstStar = true;
            const starFactory = (angle, speedMult) => {
              // For non-horsetail shells, compute an initial vertical speed to add to star burst.
              // The magic number comes from testing what looks best. The ideal is that all shell
              // bursts appear visually centered for the majority of the star life (excl. willows etc.)
              const standardInitialSpeed = this.spreadSize / 1800;
              
              const star = Star.add(
                x,
                y,
                color || randomColor(),
                angle,
                speedMult * speed,
                // add minor variation to star life
                this.starLife + Math.random() * this.starLife * this.starLifeVariation,
                this.horsetail ? this.comet && this.comet.speedX : 0,
                this.horsetail ? this.comet && this.comet.speedY : -standardInitialSpeed
              );
      
              if (this.secondColor) {
                star.transitionTime = this.starLife * (Math.random() * 0.05 + 0.32);
                star.secondColor = this.secondColor;
              }
  
              if (this.strobe) {
                star.transitionTime = this.starLife * (Math.random() * 0.08 + 0.46);
                star.strobe = true;
                // How many milliseconds between switch of strobe state "tick". Note that the strobe pattern
                // is on:off:off, so this is the "on" duration, while the "off" duration is twice as long.
                star.strobeFreq = Math.random() * 20 + 40;
                if (this.strobeColor) {
                  star.secondColor = this.strobeColor;
                }
              }
              
              star.onDeath = onDeath;
  
              if (this.glitter) {
                star.sparkFreq = sparkFreq;
                star.sparkSpeed = sparkSpeed;
                star.sparkLife = sparkLife;
                star.sparkLifeVariation = sparkLifeVariation;
                star.sparkColor = this.glitterColor;
                star.sparkTimer = Math.random() * star.sparkFreq;
              }
            };
            
            if (typeof this.color === 'string') {
              if (this.color === 'random') {
                color = null; // falsey value creates random color in starFactory
              } else {
                color = this.color;
              }
              
              // Rings have positional randomness, but are rotated randomly
              if (this.ring) {
                const ringStartAngle = Math.random() * Math.PI;
                const ringSquash = Math.pow(Math.random(), 2) * 0.85 + 0.15;;
                
                createParticleArc(0, PI_2, this.starCount, 0, angle => {
                  // Create a ring, squashed horizontally
                  const initSpeedX = Math.sin(angle) * speed * ringSquash;
                  const initSpeedY = Math.cos(angle) * speed;
                  // Rotate ring
                  const newSpeed = MyMath.pointDist(0, 0, initSpeedX, initSpeedY);
                  const newAngle = MyMath.pointAngle(0, 0, initSpeedX, initSpeedY) + ringStartAngle;
                  const star = Star.add(
                    x,
                    y,
                    color,
                    newAngle,
                    // apply near cubic falloff to speed (places more particles towards outside)
                    newSpeed,//speed,
                    // add minor variation to star life
                    this.starLife + Math.random() * this.starLife * this.starLifeVariation
                  );
                  
                  if (this.glitter) {
                    star.sparkFreq = sparkFreq;
                    star.sparkSpeed = sparkSpeed;
                    star.sparkLife = sparkLife;
                    star.sparkLifeVariation = sparkLifeVariation;
                    star.sparkColor = this.glitterColor;
                    star.sparkTimer = Math.random() * star.sparkFreq;
                  }
                });
              }
              // Normal burst
              else {
                createBurst(this.starCount, starFactory);
              }
            }
            else if (Array.isArray(this.color)) {
              if (Math.random() < 0.5) {
                const start = Math.random() * Math.PI;
                const start2 = start + Math.PI;
                const arc = Math.PI;
                color = this.color[0];
                // Not creating a full arc automatically reduces star count.
                createBurst(this.starCount, starFactory, start, arc);
                color = this.color[1];
                createBurst(this.starCount, starFactory, start2, arc);
              } else {
                color = this.color[0];
                createBurst(this.starCount / 2, starFactory);
                color = this.color[1];
                createBurst(this.starCount / 2, starFactory);
              }
            }
            else {
              throw new Error('Invalid shell color. Expected string or array of strings, but got: ' + this.color);
            }
            
            if (this.pistil) {
              const innerShell = new Shell({
                spreadSize: this.spreadSize * 0.5,
                starLife: this.starLife * 0.6,
                starLifeVariation: this.starLifeVariation,
                starDensity: 1.4,
                color: this.pistilColor,
                glitter: 'light',
                glitterColor: this.pistilColor === COLOR.Gold ? COLOR.Gold : COLOR.White
              });
              innerShell.burst(x, y);
            }
            
            if (this.streamers) {
              const innerShell = new Shell({
                spreadSize: this.spreadSize * 0.9,
                starLife: this.starLife * 0.8,
                starLifeVariation: this.starLifeVariation,
                starCount: Math.floor(Math.max(6, this.spreadSize / 45)),
                color: COLOR.White,
                glitter: 'streamer'
              });
              innerShell.burst(x, y);
            }
            
            // Queue burst flash render
            BurstFlash.add(x, y, this.spreadSize / 4);
  
            // Play sound, but only for "original" shell, the one that was launched.
            // We don't want multiple sounds from pistil or streamer "sub-shells".
            // This can be detected by the presence of a comet.
            if (this.comet) {
              // Scale explosion sound based on current shell size and selected (max) shell size.
              // Shooting selected shell size will always sound the same no matter the selected size,
              // but when smaller shells are auto-fired, they will sound smaller. It doesn't sound great
              // when a value too small is given though, so instead of basing it on proportions, we just
              // look at the difference in size and map it to a range known to sound good.
              const maxDiff = 2;
              const sizeDifferenceFromMaxSize = Math.min(maxDiff, shellSizeSelector() - this.shellSize);
              const soundScale = (1 - sizeDifferenceFromMaxSize / maxDiff) * 0.3 + 0.7;
              soundManager.playSound('burst', soundScale);
            }
          }
        }
  
        const BurstFlash = {
          active: [],
          _pool: [],
          
          _new() {
            return {}
          },
          
          add(x, y, radius) {
            const instance = this._pool.pop() || this._new();
            
            instance.x = x;
            instance.y = y;
            instance.radius = radius;
            
            this.active.push(instance);
            return instance;
          },
          
          returnInstance(instance) {
            this._pool.push(instance);
          }
        };
  
        // Helper to generate objects for storing active particles.
        // Particles are stored in arrays keyed by color (code, not name) for improved rendering performance.
        function createParticleCollection() {
          const collection = {};
          COLOR_CODES_W_INVIS.forEach(color => {
            collection[color] = [];
          });
          return collection;
        }
  
        // Star properties (WIP)
        // -----------------------
        // transitionTime - how close to end of life that star transition happens
  
        const Star = {
          // Visual properties
          drawWidth: 3,
          airDrag: 0.98,
          airDragHeavy: 0.992,
          
          // Star particles will be keyed by color
          active: createParticleCollection(),
          _pool: [],
          
          _new() {
            return {};
          },
  
          add(x, y, color, angle, speed, life, speedOffX, speedOffY) {
            const instance = this._pool.pop() || this._new();
            
            instance.visible = true;
            instance.heavy = false;
            instance.x = x;
            instance.y = y;
            instance.prevX = x;
            instance.prevY = y;
            instance.color = color;
            instance.speedX = Math.sin(angle) * speed + (speedOffX || 0);
            instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);
            instance.life = life;
            instance.fullLife = life;
            instance.spinAngle = Math.random() * PI_2;
            instance.spinSpeed = 0.8;
            instance.spinRadius = 0;
            instance.sparkFreq = 0; // ms between spark emissions
            instance.sparkSpeed = 1;
            instance.sparkTimer = 0;
            instance.sparkColor = color;
            instance.sparkLife = 750;
            instance.sparkLifeVariation = 0.25;
            instance.strobe = false;
            
            this.active[color].push(instance);
            return instance;
          },
  
          // Public method for cleaning up and returning an instance back to the pool.
          returnInstance(instance) {
            // Call onDeath handler if available (and pass it current star instance)
            instance.onDeath && instance.onDeath(instance);
            // Clean up
            instance.onDeath = null;
            instance.secondColor = null;
            instance.transitionTime = 0;
            instance.colorChanged = false;
            // Add back to the pool.
            this._pool.push(instance);
          }
        };
  
        const Spark = {
          // Visual properties
          drawWidth: 0, // set in \`configDidUpdate()\`
          airDrag: 0.9,
          
          // Star particles will be keyed by color
          active: createParticleCollection(),
          _pool: [],
          
          _new() {
            return {};
          },
  
          add(x, y, color, angle, speed, life) {
            const instance = this._pool.pop() || this._new();
            
            instance.x = x;
            instance.y = y;
            instance.prevX = x;
            instance.prevY = y;
            instance.color = color;
            instance.speedX = Math.sin(angle) * speed;
            instance.speedY = Math.cos(angle) * speed;
            instance.life = life;
            
            this.active[color].push(instance);
            return instance;
          },
  
          // Public method for cleaning up and returning an instance back to the pool.
          returnInstance(instance) {
            // Add back to the pool.
            this._pool.push(instance);
          }
        };
  
        const soundManager = {
          ctx: new (window.AudioContext || window.webkitAudioContext),
          sources: {
            lift: {
              volume: 1,
              playbackRateMin: 0.85,
              playbackRateMax: 0.95,
              fileNames: [
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646269942.mp3',
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646271435.mp3',
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646272689.mp3'
              ]
            },
            burst: {
              volume: 1,
              playbackRateMin: 0.8,
              playbackRateMax: 0.9,
              fileNames: [
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646274094.mp3',
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646275866.mp3'
              ]
            },
            burstSmall: {
              volume: 0.25,
              playbackRateMin: 0.8,
              playbackRateMax: 1,
              fileNames: [
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646277640.mp3',
                'https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646279499.mp3'
              ]
            },
            crackle: {
              volume: 0.2,
              playbackRateMin: 1,
              playbackRateMax: 1,
              fileNames: ['https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646280988.mp3']
            },
            crackleSmall: {
              volume: 0.3,
              playbackRateMin: 1,
              playbackRateMax: 1,
              fileNames: ['https://cdn.jsdelivr.net/gh/iMiMofficial/Seazonify@main/assets/effects/visual/assets/mp3/asset-1760646283088.mp3']
            }
          },
  
          preload() {
            const allFilePromises = [];
  
            function checkStatus(response) {
              if (response.status >= 200 && response.status < 300) {
                return response;
              }
              const customError = new Error(response.statusText);
              customError.response = response;
              throw customError;
            }
  
            const types = Object.keys(this.sources);
            types.forEach(type => {
              const source = this.sources[type];
              const { fileNames } = source;
              const filePromises = [];
              fileNames.forEach(fileURL => {
                // Promise will resolve with decoded audio buffer.
                const promise = fetch(fileURL)
                  .then(checkStatus)
                  .then(response => response.arrayBuffer())
                  .then(data => new Promise(resolve => {
                    this.ctx.decodeAudioData(data, resolve);
                  }));

                filePromises.push(promise);
                allFilePromises.push(promise);
              });
  
              Promise.all(filePromises)
                .then(buffers => {
                  source.buffers = buffers;
                });
            });
  
            return Promise.all(allFilePromises);
          },
          
          
          // Private property used to throttle small burst sounds.
          _lastSmallBurstTime: 0,
  
          /**
           * Play a sound of \`type\`. Will randomly pick a file associated with type, and play it at the specified volume
           * and play speed, with a bit of random variance in play speed. This is all based on \`sources\` config.
           *
           * @param  {string} type - The type of sound to play.
           * @param  {?number} scale=1 - Value between 0 and 1 (values outside range will be clamped). Scales less than one
           *                             descrease volume and increase playback speed. This is because large explosions are
           *                             louder, deeper, and reverberate longer than small explosions.
           *                             Note that a scale of 0 will mute the sound.
           */
          playSound(type, scale=1) {
            // Ensure \`scale\` is within valid range.
            scale = MyMath.clamp(scale, 0, 1);
  
            // Disallow starting new sounds if sound is disabled, app is running in slow motion, or paused.
            // Slow motion check has some wiggle room in case user doesn't finish dragging the speed bar
            // *all* the way back.
            if (!canPlaySoundSelector() || simSpeed < 0.95) {
              return;
            }
            
            // Throttle small bursts, since floral/falling leaves shells have a lot of them.
            if (type === 'burstSmall') {
              const now = Date.now();
              if (now - this._lastSmallBurstTime < 20) {
                return;
              }
              this._lastSmallBurstTime = now;
            }
            
            const source = this.sources[type];
  
            if (!source) {
              throw new Error(\`Sound of type "\${type}" doesn't exist.\`);
            }
            
            const initialVolume = source.volume;
            const initialPlaybackRate = MyMath.random(
              source.playbackRateMin,
              source.playbackRateMax
            );
            
            // Volume descreases with scale.
            const scaledVolume = initialVolume * scale;
            // Playback rate increases with scale. For this, we map the scale of 0-1 to a scale of 2-1.
            // So at a scale of 1, sound plays normally, but as scale approaches 0 speed approaches double.
            const scaledPlaybackRate = initialPlaybackRate * (2 - scale);
            
            const gainNode = this.ctx.createGain();
            gainNode.gain.value = scaledVolume;
  
            if (!source.buffers || source.buffers.length === 0) {
            return;
          }
          const buffer = MyMath.randomChoice(source.buffers);
            const bufferSource = this.ctx.createBufferSource();
            bufferSource.playbackRate.value = scaledPlaybackRate;
            bufferSource.buffer = buffer;
            bufferSource.connect(gainNode);
            gainNode.connect(this.ctx.destination);
            bufferSource.start(0);
          }
        };
  
        // Kick things off.
  
        // Initialize with sound preloading
        soundManager.preload().then(() => {
          init();
        }).catch(() => {
          // If sound fails to load, still initialize without sound
          init();
        });
  
  
        // Cleanup function
        window.szfyDiwaliFireworksCleanup = function() {
          const container = document.getElementById('szfy-diwali-fireworks-container');
          if (container) {
            container.innerHTML = '';
          }
        };
      })();
    `
  };
  
  // Auto-inject if SeazonifyController is available
  if (typeof window !== 'undefined' && window.SeazonifyController) {
    window.SeazonifyController.injectVisualEffect(diwaliFireworksEffect);
  }
  
  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = diwaliFireworksEffect;
  }

