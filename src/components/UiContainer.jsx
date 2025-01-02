import { Container, Sprite, withPixiApp } from '@pixi/react'
import React, { useEffect, useState } from 'react'
import { Howl } from 'howler';
import * as PIXI from 'pixi.js';

function UiContainer(props) {
    const [showStopButton, setShowStopButton] = useState(false);
    const backgroundTexture = PIXI.Assets.get('Loading_Screen_Background');
    const ReelFrameTexture = PIXI.Assets.get('ReelFrame');
    const Info_IdleTexture = PIXI.Assets.get('Info_Idle');
    const Arrow_R_IdleTexture = PIXI.Assets.get('Arrow_R_Idle');
    const Arrow_L_IdleTexture = PIXI.Assets.get('Arrow_L_Idle');
    const FrameTexture = PIXI.Assets.get('Frame');
    const logoTexture = PIXI.Assets.get('logo');
    const Spin_IdleTexture = PIXI.Assets.get('Spin_Idle');
    const Stop_IdleTexture = PIXI.Assets.get('Stop_Idle');
    const Balance_TextTexture = PIXI.Assets.get('Balance_Text');
    const Win_TextTexture = PIXI.Assets.get('Win_Text');
    const Bet_TextTexture = PIXI.Assets.get('Bet_Text');

    const spinAudio = new Howl({
        src: ['/assets/sounds/reels_spin.wav'],
        volume: 1.0,
    });

    const handleSpinClick = () => {
        spinAudio.play();
        props.startSpin();
        setShowStopButton(true);
    };

    const handleStopClick = () => {
        props.setIsSpinning(false)
        setShowStopButton(false);
        spinAudio.stop();
    };

    useEffect(() => {
        if (!props.isSpinning) {
            setShowStopButton(false);
        }
    }, [props.isSpinning]);


    return (
        <Container width={props.width} height={props.height} >
            <Sprite
                position={0}
                texture={backgroundTexture}
            />
            <Container>
                <Sprite
                    x={200}
                    y={40}
                    scale={0.8}
                    texture={ReelFrameTexture}
                />
                {/*  Bottom Bar Frame */}

                <Sprite
                    x={600}
                    y={0}
                    texture={logoTexture}
                />
                {/*  Bottom Bar Frame */}
                <Sprite
                    x={410}
                    y={680}
                    width={900}
                    texture={FrameTexture}
                />
                {/*  Bottom Bar Frame */}
                <Sprite
                    x={450}
                    y={780}
                    scale={0.6}
                    texture={FrameTexture}
                />
                {/*  Bottom Bar Frame */}
                <Sprite
                    x={700}
                    y={780}
                    scale={0.6}
                    texture={FrameTexture}
                />
                {/*  Bottom Bar Frame */}
                <Sprite
                    x={950}
                    y={780}
                    scale={0.6}
                    texture={FrameTexture}
                />
                {/* Info Button */}
                <Sprite
                    x={370}
                    y={780}
                    scale={0.6}
                    texture={Info_IdleTexture}
                />
                {/* Left Bet Button */}
                <Sprite
                    x={940}
                    y={775}
                    scale={0.6}
                    texture={Arrow_L_IdleTexture}
                />
                {/* Right Bet Button */}
                <Sprite
                    x={1120}
                    y={775}
                    scale={0.6}
                    texture={Arrow_R_IdleTexture}
                />
                {/* Spin Button */}
                <Sprite
                    x={1200}
                    y={720}
                    texture={Spin_IdleTexture}
                    interactive={true}
                    pointerdown={handleSpinClick}
                    cursor="pointer"
                    visible={!showStopButton}
                />

                {/* Stop Button */}
                <Sprite
                    x={1200}
                    y={720}
                    texture={Stop_IdleTexture}
                    interactive={true}
                    pointerdown={handleStopClick}
                    cursor="pointer"
                    visible={showStopButton}
                />
                <Sprite
                    x={520}
                    y={790}
                    scale={0.5}
                    texture={Balance_TextTexture}
                />
                <Sprite
                    x={760}
                    y={790}
                    scale={0.5}
                    texture={Win_TextTexture}
                />

                <Sprite
                    x={1015}
                    y={790}
                    scale={0.5}
                    texture={Bet_TextTexture}
                />
            </Container>
        </Container>

    )
}

export default withPixiApp(UiContainer)
