// import React, { useState } from "react";
// import Reels from "./Reels";
// import UiContainer from "./UiContainer";
// import { withPixiApp } from "@pixi/react";
// import * as PIXI from "pixi.js";
// import { Container, Graphics, Sprite, } from 'pixi.js';

// const GameContainer = (props) => {
//     const [isSpinning, setIsSpinning] = useState(false);

//     const initialData = Array(5).fill(0).map(() => {
//         const index = Math.floor(Math.random() * props.data.length);
//         return props.data[index] || PIXI.Texture.WHITE;
//     });

//     const reels = [];
//     const reelContainer = new Container();
//     const ticker = new PIXI.Ticker();

//     const REEL_WIDTH = 160;
//     const SYMBOL_SIZE = 150;


//     for (let i = 0; i < 5; i++) {
//         const rc = new Container();

//         rc.x = i * REEL_WIDTH;
//         reelContainer.addChild(rc);

//         const reel = {
//             container: rc,
//             symbols: [],
//             position: 0,
//             previousPosition: 0,
//             blur: new PIXI.BlurFilter(),
//         };

//         reel.blur.blurY = Math.abs(reel.position - reel.previousPosition) * 2; // Adjust multiplier as needed
//         reel.previousPosition = reel.position;

//         reel.blur.blurX = 0;
//         rc.filters = [reel.blur];

//         // Build the symbols
//         for (let j = 0; j < 4; j++) {
//             const symbol = new Sprite(initialData[Math.floor(Math.random() * initialData.length)]);
//             // Scale the symbol to fit symbol area.

//             symbol.y = j * SYMBOL_SIZE + 70;
//             symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
//             symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2 + 320);
//             reel.symbols.push(symbol);
//             rc.addChild(symbol);
//         }
//         reels.push(reel);
//     }
//     props.app.stage.addChild(reelContainer);
//     console.log("Reel container children:", reelContainer.children);

//     const tweening = [];

//     function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
//         const tween = {
//             object,
//             property,
//             propertyBeginValue: object[property],
//             target,
//             easing,
//             time,
//             change: onchange,
//             complete: oncomplete,
//             start: Date.now(),
//         };

//         tweening.push(tween);

//         return tween;
//     }

//     ticker.add(() => {
//         const now = Date.now();
//         const remove = [];

//         for (let i = 0; i < tweening.length; i++) {
//             const t = tweening[i];
//             const phase = Math.min(1, (now - t.start) / t.time);

//             t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));

//             if (t.object === reels[t.object.index]) {
//                 updateReelSymbols(reels[t.object.index]);
//             }

//             if (t.change) t.change(t);
//             if (phase === 1) {
//                 t.object[t.property] = t.target;
//                 if (t.complete) t.complete(t);
//                 remove.push(t);
//             }
//         }
//         for (let i = 0; i < remove.length; i++) {
//             tweening.splice(tweening.indexOf(remove[i]), 1);
//         }
//     });

//     function updateReelSymbols(reel) {
//         for (let j = 0; j < reel.symbols.length; j++) {
//             const symbol = reel.symbols[j];
//             symbol.y = ((reel.position + j) % reel.symbols.length) * SYMBOL_SIZE;
//         }
//     }


//     function lerp(a1, a2, t) {
//         return a1 * (1 - t) + a2 * t;
//     }

//     function backout(amount) {
//         return (t) => --t * t * ((amount + 1) * t + amount) + 1;
//     }

//     function startPlay() {
//         if (isSpinning) {
//             console.warn("Animation already running");
//             return;
//         }
//         console.log("Starting animation...");
//         setIsSpinning(true);
//         for (let i = 0; i < reels.length; i++) {
//             const r = reels[i];
//             if (!r || typeof r.position === 'undefined') {
//                 console.error(`Invalid reel at index ${i}`);
//                 continue;
//             }
//             const extra = Math.floor(Math.random() * 3);
//             const target = r.position + 10 + i * 5 + extra;
//             const time = 2500 + i * 600 + extra * 600;

//             console.log(`Reel ${i}:`, { target, time });
//             tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
//         }
//     }

//     function reelsComplete() {
//         console.log("Reels animation complete!");
//         setIsSpinning(false);
//     }


//     return (
//         <>
//             <UiContainer startSpin={startPlay} setIsSpinning={setIsSpinning} width={props.width} height={props.height} app={props.app} />
//         </>
//     );
// };

// export default withPixiApp(GameContainer);


