import React from 'react'
import { withPixiApp } from '@pixi/react';
import * as PIXI from 'pixi.js';
import UiContainer from './UiContainer';
import Reels from './components/Reels';
import { Texture } from "pixi.js";

function MainPage(props) {
    const app = PIXI.Application;
    globalThis.__PIXI_APP__ = app;

    PIXI.Assets.load([
        '/assets/symbols/H1.png',
        '/assets/symbols/H2.png',
        '/assets/symbols/H3.png',
        '/assets/symbols/H4.png',
        '/assets/symbols/L1.png',
        '/assets/symbols/L2.png',
        '/assets/symbols/L3.png',
        '/assets/symbols/L4.png',
        '/assets/symbols/L5.png',
        '/assets/symbols/WILD.png',
        '/assets/symbols/SCATTER.png',
        '/assets/symbols/BONUS.png',
    ]);

    const slotTextures = [
        Texture.from('/assets/symbols/H1.png'),
        Texture.from('/assets/symbols/H2.png'),
        Texture.from('/assets/symbols/H3.png'),
        Texture.from('/assets/symbols/H4.png'),
        Texture.from('/assets/symbols/L1.png'),
        Texture.from('/assets/symbols/L2.png'),
        Texture.from('/assets/symbols/L3.png'),
        Texture.from('/assets/symbols/L4.png'),
        Texture.from('/assets/symbols/L5.png'),
        Texture.from('/assets/symbols/WILD.png'),
        Texture.from('/assets/symbols/SCATTER.png'),
        Texture.from('/assets/symbols/BONUS.png'),
    ];

    // const fakeData = ["🍒", "🍋", "⭐", "🔔", "💎", "🍎", "🍇", "🍊", "🍌", "7️⃣", "🍒", "🍋", "⭐", "🔔", "💎"];


    return (
        <React.Fragment>
            <UiContainer width={props.width} height={props.height} app={app}></UiContainer>
            <Reels
                data={slotTextures}
                gridSize={{ columns: 3, rows: 5 }}
                symbolSize={{ width: 200, height: 200 }} // Size of each symbol
                position={{ x: 445, y: 100 }} // Position of the reel on screen
            />
        </React.Fragment>

    )
}


export default withPixiApp(MainPage);


