import React from 'react'
import { Container, Text } from '@pixi/react';
import { useApp } from '@pixi/react';
import * as PIXI from 'pixi.js'
import { TextStyle } from 'pixi.js';
import { withPixiApp } from '@pixi/react';
import { BlurFilter } from 'pixi.js';
import { useMemo } from 'react';


function MainPage(props) {
    const app = PIXI.Application;
    globalThis.__PIXI_APP__ = app;

    const blurFilter = useMemo(() => new BlurFilter(2), []);
    return (
        
        <Container width={props.width} height={props.height} x={200} y={200} >
            <Text
                text="Hello World"
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
        </Container>

    )
}

// const MyComponent = withPixiApp(MainPage);
export default withPixiApp(MainPage);
