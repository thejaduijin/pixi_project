import React, { useEffect, useRef } from "react";
import { Container, Sprite, withPixiApp } from "@pixi/react";
import * as PIXI from "pixi.js";
const Reels = ({ data, gridSize, symbolSize, position, isSpinning }) => {
  const { rows, columns } = gridSize; // 3x5 grid
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isSpinning) return;

    const ticker = new PIXI.Ticker();
    const reelSpeed = 50; // Speed of the reel movement in pixels

    ticker.add(() => {
      if (containerRef.current) {
        containerRef.current.children.forEach((child, index) => {
          child.y += reelSpeed; // Move each symbol down

          // Reset the position if the symbol goes out of bounds
          if (child.y >= symbolSize.height * rows) {
            child.y -= symbolSize.height * rows; // Move to the top
          }
        });
      }
    });

    ticker.start();

    return () => {
      ticker.stop();
      ticker.destroy();
    };
  }, [isSpinning, rows, symbolSize.height]);

  return (
    <Container position={position}  ref={containerRef} scale={0.8} >
      {data.map((symbol, index) => {
        const col = index % columns; // Column index
        const row = Math.floor(index / columns); // Row index

        const x = col * symbolSize.width; // X position
        const y = row * symbolSize.height; // Y position
        return (
          <Sprite
            x={x - 165}
            y={y - 50}
            width={symbolSize.width}
            height={symbolSize.height}
            image={symbol.textureCacheIds[0]}
            key={index}
          />
        );
      })}
    </Container>
  );
};

export default withPixiApp(Reels);

