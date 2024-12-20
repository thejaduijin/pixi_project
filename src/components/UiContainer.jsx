import { Container, Sprite, withPixiApp } from '@pixi/react'
import React, { useState } from 'react'

function UiContainer(props) {
    console.log(props.texture)

    const [showStopButton, setShowStopButton] = useState(false);

    const handleSpinClick = () => {
        props.startSpin();
        setShowStopButton(true);
    };

    const handleStopClick = () => {
        props.setIsSpinning(false)
        setShowStopButton(false);
    };


    return (
        <Container width={props.width} height={props.height} x={0} y={-50} >
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
            {/*  Bottom Bar Frame */}

            <Sprite
                x={700}
                y={0}
                image="/assets/logo.png"
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={390}
                y={740}
                width={1050}

                image="/assets/Game UI/desktop/Frame.png"
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={470}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={720}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={970}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Frame.png"
            />
            {/* Info Button */}
            <Sprite
                x={400}
                y={850}
                scale={0.6}
                image="/assets/Game UI/desktop/Info_Idle.png"
            />
            {/* Left Bet Button */}
            <Sprite
                x={960}
                y={845}
                scale={0.6}
                image="/assets/Game UI/desktop/Arrow_L_Idle.png"
            />
            {/* Right Bet Button */}
            <Sprite
                x={1150}
                y={845}
                scale={0.6}
                image="/assets/Game UI/desktop/Arrow_R_Idle.png"
            />
            {/* Spin Button */}
            <Sprite
                x={1230}
                y={775}
                image="/assets/Game UI/desktop/Spin_Idle.png"
                interactive={true}
                pointerdown={handleSpinClick}
                cursor="pointer"
                visible={!showStopButton}
            />

            {/* Stop Button */}
            <Sprite
                x={1230}
                y={775}
                image="/assets/Game UI/desktop/Stop_Idle.png"
                interactive={true}
                pointerdown={handleStopClick}
                cursor="pointer"
                visible={showStopButton}
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
