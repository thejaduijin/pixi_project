import React, { useState } from "react";
import Reels from "./Reels";
import UiContainer from "./UiContainer";
import { withPixiApp } from "@pixi/react";

const GameContainer = (props) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const initialData = Array(15)
    .fill(0)
    .map(() => props.data[Math.floor(Math.random() * props.data.length)]);
  const [data, setData] = useState(initialData);

  const startSpin = () => {
    setIsSpinning(true);
    const interval = setInterval(() => {
      setData((prevData) => {
        const updatedData = [...prevData];
        for (let col = 0; col < 5; col++) {
          // Determine the last symbol in the column
          const lastSymbolIndex = col + 10; // Index of the bottom row symbol in the column
          const newSymbol = props.data[Math.floor(Math.random() * props.data.length)];

          // Move the last symbol to the top and assign a new symbol at the bottom
          updatedData.splice(col, 0, newSymbol); // Add a new symbol at the top of the column
          updatedData.splice(lastSymbolIndex + 1, 1); // Remove the old bottom symbol
        }
        return updatedData;
      });
    }, 100); // Adjusted interval for smoothness

    setTimeout(() => {
      clearInterval(interval);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <>
      <UiContainer isSpinning={isSpinning} scale={0.8} startSpin={startSpin} setIsSpinning={setIsSpinning}  width={props.width} height={props.height} app={props.app} texture={props.data} />
      <Reels
        data={data}
        gridSize={{ rows: 3, columns: 5 }}
        symbolSize={{ width: 200, height: 200 }}
        position={{ x: 445, y: 100 }}
        isSpinning={isSpinning}
      />
    </>
  );
};

 export default withPixiApp(GameContainer);


