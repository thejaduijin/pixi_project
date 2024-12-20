import React, { useEffect, useState, useRef } from 'react';
import { AnimatedSprite, useApp, withPixiApp } from '@pixi/react';
import * as PIXI from 'pixi.js';

const JsonAnimation = ({ jsonPath, onComplete, position = { x: 0, y: 0 } }) => {
    const [textures, setTextures] = useState([]);
    const app = useApp();
    const animatedSpriteRef = useRef();

    useEffect(() => {
        const loadAnimation = async () => {
            try {
                // Load the JSON file and associated textures
                const spritesheet = await PIXI.Assets.load(jsonPath);
                console.log(spritesheet);
                const animationTextures = Object.values(spritesheet.textures);
                setTextures(animationTextures);

                if (onComplete) onComplete();
            } catch (error) {
                console.error(`Error loading animation: ${jsonPath}`, error);
            }
        };

        loadAnimation();
    }, [jsonPath, onComplete]);

    if (textures.length === 0) return null; // Render nothing until textures are loaded

    return (
        <AnimatedSprite
            ref={animatedSpriteRef}
            textures={textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.5}
            position={position}
            anchor={0.5}
        />
    );
};

export default withPixiApp(JsonAnimation);
