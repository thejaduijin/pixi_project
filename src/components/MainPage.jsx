import React, { useEffect } from 'react'
import { withPixiApp } from '@pixi/react';
import GameContainer from './GameContainer';
import { Howl } from 'howler';

function MainPage(props) {
    const mainMusic = new Howl({
        src: ['/assets/sounds/music_main.wav'],
        volume: 1.0,
    });

    const handleMusic = () => {
        mainMusic.play();
    };

    useEffect(() => {
        handleMusic();
        console.log("music is playing")
    }, []);

    return (
        <React.Fragment>
            <GameContainer width={props.width} height={props.height} app={props.app} ></GameContainer>
        </React.Fragment>
    )
}


export default withPixiApp(MainPage);


