import React, { useState } from "react";
import Reels from "./Reels";
import UiContainer from "./UiContainer";
import { withPixiApp } from "@pixi/react";
import * as PIXI from 'pixi.js';

const GameContainer = (props) => {
  const H1 = PIXI.Assets.get('H1');
  const H2 = PIXI.Assets.get('H2');
  const H3 = PIXI.Assets.get('H3');
  const H4 = PIXI.Assets.get('H4');
  const L1 = PIXI.Assets.get('L1');
  const L2 = PIXI.Assets.get('L2');
  const L3 = PIXI.Assets.get('L3');
  const L4 = PIXI.Assets.get('L4');
  const L5 = PIXI.Assets.get('L5');
  const WILD = PIXI.Assets.get('WILD');
  const BONUS = PIXI.Assets.get('BONUS');
  const SCATTER = PIXI.Assets.get('SCATTER');

  function getRandomImage() {
    const images = [H1, H2, H3, H4, L1, L2, L3, L4, L5, WILD, BONUS, SCATTER];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  const randomImages = [];
  for (let i = 0; i < 15; i++) {
    randomImages.push(getRandomImage());
  }

  const [isSpinning, setIsSpinning] = useState(false);
  const [data, setData] = useState(randomImages);


  const startSpin = () => {
    setIsSpinning(true);
    const interval = setInterval(() => {
      setData((prevData) => {
        const updatedData = [...prevData];
        for (let col = 0; col < 5; col++) {
          // Determine the last symbol in the column
          const lastSymbolIndex = col + 10; // Index of the bottom row symbol in the column
          const newSymbol = randomImages[Math.floor(Math.random() * randomImages.length)];

          // Move the last symbol to the top and assign a new symbol at the bottom
          updatedData.splice(col, 0, newSymbol); // Add a new symbol at the top of the column
          updatedData.splice(lastSymbolIndex + 1, 1); // Remove the old bottom symbol
        }
        return updatedData;
      });
    }, 200); // Adjusted interval for smoothness

    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <>
      <UiContainer isSpinning={isSpinning} startSpin={startSpin} setIsSpinning={setIsSpinning} width={props.width} height={props.height} app={props.app} />
      <Reels
        randomImages={randomImages}
        gridSize={{ rows: 3, columns: 5 }}
        symbolSize={{ width: 180, height: 180 }}
        position={{ x: 550, y: 140 }}
        isSpinning={isSpinning}
      />
    </>
  );
};

export default withPixiApp(GameContainer);


