// import React, { useState } from "react";
// import Reels from "./Reels";
// import UiContainer from "../UiContainer";
// import { withPixiApp } from "@pixi/react";
// import * as PIXI from "pixi.js";
// import { Container,Graphics, Sprite, } from 'pixi.js';

// const GameContainer = (props) => {
//   const [isSpinning, setIsSpinning] = useState(false);
//   const initialData = Array(5) // 3x5 grid
//     .fill(0)
//     .map(() => props.data[Math.floor(Math.random() * props.data.length)]);
//   const [data, setData] = useState(initialData);

//   let running = false;
//   // const ticker = new PIXI.Ticker();
//   const reels = [];
//   const reelContainer = new Container();

//   const REEL_WIDTH = 160;
//   const SYMBOL_SIZE = 150;


//   for (let i = 0; i < 5; i++) {
//     const rc = new Container();

//     rc.x = i * REEL_WIDTH;
//     reelContainer.addChild(rc);

//     const reel = {
//       container: rc,
//       symbols: [],
//       position: 0,
//       previousPosition: 0,
//       blur: new PIXI.BlurFilter(),
//     };

//     reel.blur.blurX = 0;
//     reel.blur.blurY = 0;
//     rc.filters = [reel.blur];

//     // Build the symbols
//     for (let j = 0; j < 4; j++) {
//       const symbol = new Sprite(initialData[Math.floor(Math.random() * initialData.length)]);
//       // Scale the symbol to fit symbol area.

//       symbol.y = j * SYMBOL_SIZE;
//       symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
//       symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
//       reel.symbols.push(symbol);
//       rc.addChild(symbol);
//     }
//     reels.push(reel);
//   }
//   props.app.stage.addChild(reelContainer);

//   const tweening = [];

//   function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
//     const tween = {
//       object,
//       property,
//       propertyBeginValue: object[property],
//       target,
//       easing,
//       time,
//       change: onchange,
//       complete: oncomplete,
//       start: Date.now(),
//     };
  
//     console.log("Creating tween:", tween);
  
//     tweening.push(tween);
  
//     return tween;
//   }
  
//   props.app.ticker.add(() => {
//     const now = Date.now();
//     const remove = [];
  
//     for (let i = 0; i < tweening.length; i++) {
//       const t = tweening[i];
//       const phase = Math.min(1, (now - t.start) / t.time);
  
//       // Log current tween and phase.
//       console.log("Updating tween:", t, "Phase:", phase);
  
//       t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
//       if (t.change) t.change(t);
//       if (phase === 1) {
//         t.object[t.property] = t.target;
//         if (t.complete) t.complete(t);
//         remove.push(t);
//       }
//     }
  
//     // Remove completed tweens.
//     for (let i = 0; i < remove.length; i++) {
//       console.log("Removing tween:", remove[i]);
//       tweening.splice(tweening.indexOf(remove[i]), 1);
//     }
//   });
  
//   // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
//   // const tweening = [];

//   // function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
//   //   const tween = {
//   //     object,
//   //     property,
//   //     propertyBeginValue: object[property],
//   //     target,
//   //     easing,
//   //     time,
//   //     change: onchange,
//   //     complete: oncomplete,
//   //     start: Date.now(),
//   //   };

//   //   tweening.push(tween);

//   //   return tween;
//   // }

//   // props.app.ticker.add(() => {
//   //   const now = Date.now();
//   //   const remove = [];

//   //   for (let i = 0; i < tweening.length; i++) {
//   //     const t = tweening[i];
//   //     const phase = Math.min(1, (now - t.start) / t.time);

//   //     t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
//   //     if (t.change) t.change(t);
//   //     if (phase === 1) {
//   //       t.object[t.property] = t.target;
//   //       if (t.complete) t.complete(t);
//   //       remove.push(t);
//   //     }
//   //   }
//   //   for (let i = 0; i < remove.length; i++) {
//   //     tweening.splice(tweening.indexOf(remove[i]), 1);
//   //   }
//   // });

//   function lerp(a1, a2, t) {
//     return a1 * (1 - t) + a2 * t;
//   }

//   function backout(amount) {
//     return (t) => --t * t * ((amount + 1) * t + amount) + 1;
//   }

//   function startPlay() {
//     if (running) {
//       console.warn("Animation already running");
//       return;
//     }
//     running = true;
  
//     console.log("Starting animation...");
//     for (let i = 0; i < reels.length; i++) {
//       const r = reels[i];
//       if (!r || typeof r.position === 'undefined') {
//         console.error(`Invalid reel at index ${i}`);
//         continue;
//       }
//       const extra = Math.floor(Math.random() * 3);
//       const target = r.position + 10 + i * 5 + extra;
//       const time = 2500 + i * 600 + extra * 600;
  
//       console.log(`Reel ${i}:`, { target, time });
//       tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
//     }
//   }
  

//   function reelsComplete() {
//     running = false;
//   }

//   // const startSpin = () => {
//   //   setIsSpinning(true);
//   //   const interval = setInterval(() => {
//   //     setData((prevData) => {
//   //       const updatedData = [...prevData];
//   //       for (let col = 0; col < 5; col++) {
//   //         // Determine the last symbol in the column
//   //         const lastSymbolIndex = col + 10; // Index of the bottom row symbol in the column
//   //         const newSymbol = props.data[Math.floor(Math.random() * props.data.length)];

//   //         // Move the last symbol to the top and assign a new symbol at the bottom
//   //         updatedData.splice(col, 0, newSymbol); // Add a new symbol at the top of the column
//   //         updatedData.splice(lastSymbolIndex + 1, 1); // Remove the old bottom symbol
//   //       }
//   //       return updatedData;
//   //     });
//   //   }, 100); // Adjust interval for smoothness


//   //   setTimeout(() => {
//   //     clearInterval(interval);
//   //     setIsSpinning(false);
//   //   }, 2000);
//   // };


//   // const margin = (props.app.screen.height - SYMBOL_SIZE * 3) / 2;

//   // reelContainer.y = margin;
//   // reelContainer.x = Math.round(props.app.screen.width - REEL_WIDTH * 5);
//   // const top = new Graphics().rect(0, 0, props.app.screen.width, margin).fill({ color: 0x0 });
//   // const bottom = new Graphics().rect(0, SYMBOL_SIZE * 3 + margin, props.app.screen.width, margin).fill({ color: 0x0 });

//   // Create gradient fill
//   // const fill = new FillGradient(0, 0, 0, 36 * 1.7);

//   // const colors = [0xffffff, 0x00ff99].map((color) => Color.shared.setValue(color).toNumber());

//   // colors.forEach((number, index) => {
//   //   const ratio = index / colors.length;

//   //   fill.addColorStop(ratio, number);
//   // });

//   // props.app.stage.addChild(top);
//   // props.app.stage.addChild(bottom);

//   return (
//     <>
//       <UiContainer startSpin={startPlay} width={props.width} height={props.height} app={props.app} />
//       {/* <Reels
//         data={data}
//         gridSize={{ rows: 3, columns: 5 }}
//         symbolSize={{ width: 200, height: 200 }}
//         position={{ x: 445, y: 100 }}
//         isSpinning={isSpinning}
//       /> */}
//     </>
//   );
// };

// export default withPixiApp(GameContainer);


