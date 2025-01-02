import React from 'react';
import { Container, Sprite, Text, withPixiApp } from '@pixi/react';
import * as PIXI from 'pixi.js';

const LoadingScreen = ({ progress, app }) => {
  console.log(app);
  // const uiContainer = new PIXI.Container({
  //   x: 0,
  //   y: 0,
  // });
  // uiContainer.name = "UiContainer";
  // PIXI.Assets.load('/assets/loading-screen/Loading_Screen_Background.png');
  // const bg = PIXI.Sprite.from('/assets/loading-screen/Loading_Screen_Background.png');
  // bg.width = app.screen.width ;
  // bg.height = app.screen.height;
  // bg.x = 0;
  // bg.y = 0;
  // bg.zIndex=-2

  // uiContainer.addChild(bg)
  // app.stage.addChild(uiContainer);

  return (
    <Container width={window.innerWidth} height={window.innerHeight} x={-50} y={-50} scale={0.8}>
      <Sprite
        x={0}
        y={0}
        image="/assets/loading-screen/Loading_Screen_Background.png"
      />
      <Sprite
        x={500}
        y={20}
        width={1080}
        height={720}
        image="/assets/loading-screen/Game_Logo.png"
      />
      <Sprite
        x={550}
        y={730}
        image="/assets/loading-screen/Loading_bar_empty_1.png"
      />
      <Sprite
        x={550}
        y={730}
        width={(1029 * progress) / 100}
        height={105}
        image="/assets/loading-screen/Loading_bar_fill_2.png"
      />
      <Sprite
        x={550}
        y={730}
        image="/assets/loading-screen/Loading_bar_design_3.png"
      />
      <Text
        text={`Loading... ${progress}%`}
        anchor={0.5}
        x={1050}
        y={880}
        style={
          new PIXI.TextStyle({
            fill: '#ffffff',
            fontSize: 24,
          })
        }
      />
    </Container>
  );
};

export default withPixiApp(LoadingScreen);
