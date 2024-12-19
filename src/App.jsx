import './App.css';
import { Stage, } from '@pixi/react';
import MainPage from './MainPage';
import LoadingScreen from './LoadingScreen';
import { useState } from 'react';
import * as PIXI from 'pixi.js'


const App = () => {
  const app = PIXI.Application;
  globalThis.__PIXI_APP__ = app;

  console.log(window.innerWidth)
  const [isLoaded, setIsLoaded] = useState(false);

  const assets = [
    '/assets/loading-screen/Game_Logo.png',
    '/assets/loading-screen/Loading_bar_empty_1.png',
  ];

  const handleLoadingComplete = () => {
    setTimeout(() => setIsLoaded(true), 1000);
  };

  return (
    <Stage width={window.innerWidth } height={window.innerHeight - 5 } resizeTo={window} options={{ background: 0x000000 }} app={app}>
      {!isLoaded ? (
        <LoadingScreen assets={assets} onComplete={handleLoadingComplete} />
      ) : (
        <MainPage width={window.innerWidth} height={window.innerHeight}></MainPage>
      )}
    </Stage>
  );
};

export default App;