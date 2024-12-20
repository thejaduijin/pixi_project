import { Container, withPixiApp } from '@pixi/react';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import * as PIXI from 'pixi.js';
import { AssetManager } from '../assetManager/AssetManager';

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
        // animation: [
        //     { name: 'BaseGame_BG', url: '/assets/Animation/background/BaseGame_BG.json' },
        // ],
    };

    // const assets = [
    //     { name: 'Loading_Screen_Background', url: '/assets/loading-screen/Loading_Screen_Background.png' },
    //     { name: 'Game_Logo', url: '/assets/loading-screen/Game_Logo.png' },
    //     { name: 'music_main', url: '/assets/sounds/music_main.wav' },
    // ];

    async function preloadAssets() {
        const promises = [];
        let loaded = 0;

        // for (const asset of assets) {
        //     const texture = await PIXI.Assets.load({ src: asset.url, alias: asset.name });
        //     AssetManager.set(asset.name, texture);
        //     loaded += 1;
        // }

        // Load images
        assetList.images.forEach(asset => {
            promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
            // const texture = PIXI.Assets.load({ src: asset.url, alias: asset.name });
            // AssetManager.set(asset.name, texture);
            loaded += 1;
        });

        // Load sounds
        assetList.sounds.forEach(asset => {
            promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
            // AssetManager.set(asset.name, p1);
            loaded += 1;
        });

        // Load animations
        // assetList.animation.forEach(asset => {
        //     promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
        //     loaded += 1;
        // });

        setProgress(Math.floor((loaded / promises.length) * 100));
        await Promise.all(promises);

        console.log('All assets loaded!', AssetManager);
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
