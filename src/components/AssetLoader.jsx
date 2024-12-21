import { Container, withPixiApp } from '@pixi/react';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import * as PIXI from 'pixi.js';


function AssetLoader({ onAssetsLoaded }) {
    const [progress, setProgress] = useState(0);

    const assetList = {
        images: [
            { name: 'Loading_Screen_Background', url: '/assets/loading-screen/Loading_Screen_Background.png' },
            { name: 'Game_Logo', url: '/assets/loading-screen/Game_Logo.png' },
            
        ],
        sounds: [
            { name: 'music_main', url: '/assets/sounds/music_main.wav' },
        ],
    };

    async function preloadAssets() {
        const promises = [];
        let loaded = 0;

        // Load images
        assetList.images.forEach(asset => {
            promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
            loaded += 1;
        });

        // Load sounds
        assetList.sounds.forEach(asset => {
            promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
            loaded += 1;
        });

        setProgress(Math.floor((loaded / promises.length) * 100));
        await Promise.all(promises);

        // Notify parent when assets are loaded
        if (onAssetsLoaded) {
            onAssetsLoaded();
        }
    }

    // Start preloading assets when the component mounts
    useEffect(() => {
        preloadAssets();
    }, []); // Empty dependency array ensures it runs only once

    return (
        <Container name="LoadingContainer">
            <LoadingScreen progress={progress} />
        </Container>
    );
}

export default withPixiApp(AssetLoader);
