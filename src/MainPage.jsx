import React, { useMemo } from 'react'
import { Container, Sprite, Text } from '@pixi/react';
import * as PIXI from 'pixi.js'
import { TextStyle } from 'pixi.js';
import { withPixiApp } from '@pixi/react';
import { BlurFilter } from 'pixi.js';
// import JsonAnimation from './JsonAnimation';

function MainPage(props) {
    const app = PIXI.Application;
    globalThis.__PIXI_APP__ = app;
    const blurFilter = useMemo(() => new BlurFilter(2), []);


    // const handleAnimationComplete = () => {
    //     console.log('Animation loaded!');
    // };

    return (
        <Container width={props.width} height={props.height} x={50} y={-50} >
            <Sprite
                position={0}
                image="/assets/loading-screen/Loading_Screen_Background.png"
            />

            {/* <JsonAnimation
                jsonPath="/assets/Animations/background/BaseGame_BG.json"
                onComplete={handleAnimationComplete}
                position={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }}
            /> */}
            <Text
                text=""
                anchor={0.5}
                x={220}
                y={150}
                filters={[blurFilter]}
                style={
                    new TextStyle({
                        align: 'center',
                        fill: '0xffffff',
                        fontSize: 50,
                        letterSpacing: 20,
                        dropShadow: true,
                        dropShadowColor: '#E72264',
                        dropShadowDistance: 6,
                    })
                }
            />
            <Sprite
                x={165}
                y={0}
                image="/assets/reelFrame.png"
                scale={0.9}
            />
            <Sprite
                x={700}
                y={0}
                image="/assets/logo.png"
            />
            <Sprite
                x={390}
                y={740}
                width={1050}

                image="/assets/Game UI/desktop/Frame.png"
            />
            <Sprite
                x={470}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            <Sprite
                x={720}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            <Sprite
                x={970}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            <Sprite
                x={400}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Info_Idle.png"
            />
            <Sprite
                x={960}
                y={845}
                scale={0.6}
                image="/assets/Game UI/desktop/Arrow_L_Idle.png"
            />
            <Sprite
                x={1150}
                y={845}
                scale={0.6}
                image="/assets/Game UI/desktop/Arrow_R_Idle.png"
            />
            <Sprite
                x={1230}
                y={775}
                image="/assets/Game UI/desktop/Spin_Idle.png"
            />
            <Sprite
                x={535}
                y={860}
                scale={0.5}
                image="/assets/Game UI/desktop/Balance_Text.png"
            />
            <Sprite
                x={780}
                y={860}
                scale={0.5}
                image="/assets/Game UI/desktop/Win_Text.png"
            />

            <Sprite
                x={1035}
                y={860}
                scale={0.5}
                image="/assets/Game UI/desktop/Bet_Text.png"
            />
        </Container>

    )
}


export default withPixiApp(MainPage);


