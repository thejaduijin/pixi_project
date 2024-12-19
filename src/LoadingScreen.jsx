import React, { useState, useEffect } from 'react';
import { Container, Sprite, Text, withPixiApp } from '@pixi/react';
import * as PIXI from 'pixi.js';

const LoadingScreen = ({ assets, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadAssets = async () => {
      let loaded = 0;

      for (const asset of assets) {
        console.log(asset)
        try {
          await PIXI.Assets.load(asset);
          loaded += 1;
          setProgress(Math.floor((loaded / assets.length) * 100));
        } catch (error) {
          console.error(`Error loading asset: ${asset}`, error);
        }
      }

      if (onComplete) onComplete();
    };

    loadAssets();
  }, [assets, onComplete]);

  return (
    <Container>
      <Sprite
        position={0}
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
        x={window.innerWidth / 2 + 75}
        y={window.innerHeight - 75}
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
