import React, { useEffect, useRef } from "react";
import { Container, Sprite, withPixiApp } from "@pixi/react";
import * as PIXI from "pixi.js";


const Reels = ({ data, gridSize, symbolSize, position, isSpinning, randomImages }) => {
  const { rows, columns } = gridSize; // 3x5 grid
  const containerRef = useRef(null);
  console.log(randomImages)

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

  const mask = new PIXI.Graphics();
  mask.beginFill(0xffffff);
  mask.drawRect(100, 100, 1250, 430);
  mask.endFill();

  return (
    <Container position={position} ref={containerRef} scale={0.8} mask={mask}>
      {randomImages.map((symbol, index) => {
        const col = index % columns; // Column index
        const row = Math.floor(index / columns); // Row index

        let x = col * symbolSize.width; // X position
        let y = row * symbolSize.height; // Y position

        if (col == 2) {
          x = x + 15;
        } else if (col == 3) {
          x = x + 25;
        } else if (col == 4) {
          x = x + 35;
        }

        return (
          <Sprite
            x={x - 165}
            y={y - 50}
            width={symbolSize.width}
            height={symbolSize.height}
            image={symbol.textureCacheIds[0]}
            // texture={symbol.textureCacheIds[1]}
            key={index}
          />
        );
      })}
    </Container>
  );
};

export default withPixiApp(Reels);

