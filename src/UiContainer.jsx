import { Container, Sprite, Text, withPixiApp } from '@pixi/react'
import React from 'react'

function UiContainer(props) {
   
    const handleClick = () => {
       props.startSpin();
    };

    return (
        <Container width={props.width} height={props.height} x={0} y={-50} scale={0.8}>
            <Sprite
                position={0}
                image="/assets/loading-screen/Loading_Screen_Background.png"
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
                interactive={true}
                pointerdown={handleClick} 
                cursor="pointer" 
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

export default withPixiApp(UiContainer)
