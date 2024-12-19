import './App.css';
import { Container, Stage, } from '@pixi/react';
import MainPage from './MainPage';
import LoadingScreen from './LoadingScreen';
import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js'

const App = () => {
  const app = PIXI.Application;
  globalThis.__PIXI_APP__ = app;

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const assets = [
    '/assets/loading-screen/Game_Logo.png',
    '/assets/loading-screen/Loading_bar_empty_1.png',
    "/assets/loading-screen/Loading_Screen_Background.png",
    "/assets/loading-screen/Game_Logo.png",
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
    "/assets/loading-screen/Loading_bar_empty_1.png",
    "/assets/loading-screen/Loading_bar_fill_2.png",
    "/assets/loading-screen/Loading_bar_design_3.png"
  ];

  useEffect(() => {
    const preloadAssets = async () => {
      let loaded = 0;
      for (const asset of assets) {
        try {
          await PIXI.Assets.load(asset);
          loaded += 1;
          setProgress(Math.floor((loaded / assets.length) * 100));
        } catch (error) {
          console.error(`Error loading asset: ${asset}`, error);
        }
      }
      // setIsLoaded(true);
      setTimeout(() => setIsLoaded(true), 1000);
    };

    preloadAssets();
  }, [assets]);

  return (
    <Stage id={"mainCanvas"} width={window.innerWidth} height={window.innerHeight - 5}  options={{ resizeTo: window }}>
      <Container name={"mainContainer"}>
        {!isLoaded ? (
          <LoadingScreen progress={progress} />
        ) : (
          <MainPage width={window.innerWidth} height={window.innerHeight} app={app}></MainPage>
        )}
      </Container>
    </Stage>
  );
};

export default App;