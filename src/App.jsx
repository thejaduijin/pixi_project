import './App.css';
import { Container, Stage, } from '@pixi/react';
import MainPage from './MainPage';
import { useState } from 'react';
import * as PIXI from 'pixi.js';
import AssetLoader from './components/AssetLoader';

const App = () => {
  const app = PIXI.Application;
  globalThis.__PIXI_APP__ = app;


  const [isLoaded, setIsLoaded] = useState(false);
  const handleAssetsLoaded = () => {
    console.log('Assets are loaded. Proceed to next step.');
    setTimeout(() => setIsLoaded(true), 1000);
  };

  return (
    <Stage id={"mainCanvas"} width={window.innerWidth} height={window.innerHeight - 5} options={{ resizeTo: window }}>
      <Container name={"mainContainer"}>
        {!isLoaded ? (
          <AssetLoader onAssetsLoaded={handleAssetsLoaded} />
        ) : (
          <MainPage width={window.innerWidth} height={window.innerHeight} app={app}></MainPage>
        )}
      </Container>
    </Stage>
  );
};

export default App;