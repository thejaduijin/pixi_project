import React from "react";
import { Container, Sprite, withPixiApp } from "@pixi/react";

const Reels = ({ data, gridSize, symbolSize, position }) => {
    const { rows, columns } = gridSize; // 3x5 grid

    return (
        <Container position={position}>
            {data.map((symbol, index) => {
                const col = index % columns; // Column index
                const row = Math.floor(index / columns); // Row index

                const x = col * symbolSize.width; // X position
                const y = row * symbolSize.height; // Y position

                return (
                    <Sprite
                        x={x}
                        y={y}
                        width={symbolSize.width}
                        height={symbolSize.height}
                        image={symbol.textureCacheIds[0]}
                    />
                );
            })}
        </Container>
    );
};

export default withPixiApp(Reels);

