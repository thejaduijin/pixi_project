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
        src: ['/assets/sounds/reels_spin.wav'], // Replace with the correct file path
        volume: 1.0, // Adjust volume as needed
    });

    const handleSpinClick = () => {
        spinAudio.play(); // Play the audio
        props.startSpin(); // Start the spin
        setShowStopButton(true); // Show the stop button
    };

    const handleStopClick = () => {
        props.setIsSpinning(false)
        setShowStopButton(false);
        spinAudio.stop(); // Stop the audio
    };

    useEffect(() => {
        if (!props.isSpinning) {
            setShowStopButton(false); // Automatically hide the stop button
        }
    }, [props.isSpinning]);


    return (
        <Container width={props.width} height={props.height} x={0} y={-50} >
            <Sprite
                position={0}
                texture={backgroundTexture}
            />
            <Sprite
                x={window.innerWidth / 3}
                y={window.innerHeight / 2}
                scale={0.9}
                texture={ReelFrameTexture}
            />
            {/*  Bottom Bar Frame */}

            <Sprite
                x={800}
                y={350}
                texture={logoTexture}
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={500}
                y={1080}
                width={1050}
                texture={FrameTexture}
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={550}
                y={1200}
                scale={0.6}
                texture={FrameTexture}
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={800}
                y={1200}
                scale={0.6}
                texture={FrameTexture}
            />
            {/*  Bottom Bar Frame */}
            <Sprite
                x={1050}
                y={1200}
                scale={0.6}
                texture={FrameTexture}
            />
            {/* Info Button */}
            <Sprite
                x={400}
                y={850}
                scale={0.6}
                texture={Info_IdleTexture}
            />
            {/* Left Bet Button */}
            <Sprite
                x={960}
                y={845}
                scale={0.6}
                texture={Arrow_L_IdleTexture}
            />
            {/* Right Bet Button */}
            <Sprite
                x={1150}
                y={845}
                scale={0.6}
                texture={Arrow_R_IdleTexture}
            />
            {/* Spin Button */}
            <Sprite
                x={1230}
                y={775}
                texture={Spin_IdleTexture}
                interactive={true}
                pointerdown={handleSpinClick}
                cursor="pointer"
                visible={!showStopButton}
            />

            {/* Stop Button */}
            <Sprite
                x={1230}
                y={775}
                texture={Stop_IdleTexture}
                interactive={true}
                pointerdown={handleStopClick}
                cursor="pointer"
                visible={showStopButton}
            />
            <Sprite
                x={535}
                y={1150}
                scale={0.5}
                texture={Balance_TextTexture}
            />
            <Sprite
                x={780}
                y={1150}
                scale={0.5}
                texture={Win_TextTexture}
            />

            <Sprite
                x={1035}
                y={1150}
                scale={0.5}
                texture={Bet_TextTexture}
            />
        </Container>

    )
}

export default withPixiApp(UiContainer)
