import { Container, withPixiApp } from '@pixi/react';
import React, { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import * as PIXI from 'pixi.js';


function AssetLoader({ onAssetsLoaded, app }) {
    const [progress, setProgress] = useState(0);
    const sounds = {}; // Store sounds here


    const assetList = {
        images: [
            { name: 'Loading_Screen_Background', url: '/assets/loading-screen/Loading_Screen_Background.png' },
            { name: 'Game_Logo', url: '/assets/loading-screen/Game_Logo.png' },
            { name: 'Autoplay_btn', url: '/assets/Game UI/Autoplay.png' },
            { name: 'Balance', url: '/assets/Game UI/Balance.png' },
            { name: 'Bet', url: '/assets/Game UI/Bet.png' },
            { name: 'ReelFrame', url: '/assets/reelFrame.png' },
            { name: 'Win_Text', url: '/assets/Game UI/desktop/Win_Text.png' },
            { name: 'Bet_Text', url: '/assets/Game UI/desktop/Bet_Text.png' },
            { name: 'Balance_Text', url: '/assets/Game UI/desktop/Balance_Text.png' },
            { name: 'Stop_Idle', url: '/assets/Game UI/desktop/Stop_Idle.png' },
            { name: 'Spin_Idle', url: '/assets/Game UI/desktop/Spin_Idle.png' },
            { name: 'Arrow_R_Idle', url: '/assets/Game UI/desktop/Arrow_R_Idle.png' },
            { name: 'Arrow_L_Idle', url: '/assets/Game UI/desktop/Arrow_L_Idle.png' },
            { name: 'Info_Idle', url: '/assets/Game UI/desktop/Info_Idle.png' },
            { name: 'Frame', url: '/assets/Game UI/desktop/Frame.png' },
            { name: 'logo', url: '/assets/logo.png' },
            { name: 'H1', url: '/assets/symbols/H1.png' },
            { name: 'H2', url: '/assets/symbols/H2.png' },
            { name: 'H3', url: '/assets/symbols/H3.png' },
            { name: 'H4', url: '/assets/symbols/H4.png' },
            { name: 'L1', url: '/assets/symbols/L1.png' },
            { name: 'L2', url: '/assets/symbols/L2.png' },
            { name: 'L3', url: '/assets/symbols/L3.png' },
            { name: 'L4', url: '/assets/symbols/L4.png' },
            { name: 'L5', url: '/assets/symbols/L5.png' },
            { name: 'WILD', url: '/assets/symbols/WILD.png' },
            { name: 'SCATTER', url: '/assets/symbols/SCATTER.png' },
            { name: 'BONUS', url: '/assets/symbols/BONUS.png' },

        ],
        animation: [
            { name: 'bgAnimation', url: '/assets/Animations/background/BaseGame_BG.json' },
            { name: 'paylineAnimation', url: '/assets/Animations/payline/paylines.json' },
            { name: 'popupAnimation', url: '/assets/Animations/popup/Popups.json' },
        ]
    };

    async function preloadAssets() {
        const promises = [];
        let loaded = 0;

        // Load images
        assetList.images.forEach(asset => {
            promises.push(PIXI.Assets.load({ src: asset.url, alias: asset.name }));
            loaded += 1;
        });

        // Load animations
        assetList.animation.forEach(animation => {
            promises.push(
                PIXI.Assets.load({ src: animation.url, alias: animation.name }).then(() => {
                    loaded += 1;
                    setProgress(Math.floor((loaded / (assetList.images.length + assetList.animation.length)) * 100));
                })
            );
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
    }, []);

    return (
        <Container name="LoadingContainer">
            <LoadingScreen progress={progress} loadedSounds={sounds} app={app} />
        </Container>
    );
}

export default withPixiApp(AssetLoader);
