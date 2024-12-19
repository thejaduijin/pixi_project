import React, { useState } from "react";
import Reels from "./Reels";
import UiContainer from "../UiContainer";
import {  withPixiApp } from "@pixi/react";

const GameContainer = (props) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [data, setData] = useState(props.data);

    const startSpin = () => {

        setIsSpinning(true);
        const interval = setInterval(() => {
            setData((prevData) => {
              const newSymbols = generateNewSymbols(5); // Add 5 new symbols for each column
              return [...newSymbols, ...prevData.slice(0, prevData.length - 5)];
            });
          }, 100); // Adjust interval for smoothness
          
          setTimeout(() => {
            clearInterval(interval);
            setIsSpinning(false);
          }, 2000);
    };

    const generateNewSymbols = (count) => {
        const newSymbols = [];
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * props.data.length);
          newSymbols.push(props.data[randomIndex]);
        }
        return newSymbols;
      };

    return (
        <>
            <UiContainer startSpin={startSpin} width={props.width} height={props.height} app={props.app} />
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


