import './App.css';
import { Container, Stage } from '@pixi/react';
import MainPage from './components/MainPage';
import { useState, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import AssetLoader from './components/AssetLoader';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [appInstance, setAppInstance] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 5,
  });

  useEffect(() => {
    const app = new PIXI.Application({
      width: dimensions.width,
      height: dimensions.height,
      resizeTo: window,
    });

    setAppInstance(app);
    globalThis.__PIXI_APP__ = app;

    // const uiContainer = new PIXI.Container({
    //   x: 0,
    //   y: 0,
    // });
    // uiContainer.name = "UiContainer";
    // app.stage.addChild(uiContainer);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight - 5;
      setDimensions({ width: newWidth, height: newHeight });
      app.renderer.resize(newWidth, newHeight);
    };
    handleResize(); //for initial sizing

    window.addEventListener('resize', handleResize);

    return () => {
      app.destroy(true, true); // Cleanup on unmount
      globalThis.__PIXI_APP__ = null; // Remove reference
      window.removeEventListener('resize', handleResize); // Cleanup event listener
    };
  }, []);

  const handleAssetsLoaded = () => {
    console.log('Assets are loaded. Proceed to next step.');
    setTimeout(() => setIsLoaded(true), 1000);
  };

  if (!appInstance) {
    return null; // Wait for app instance to be created
  }

  return (
    <Stage
      // app={appInstance}
      id="mainCanvas"
      width={dimensions.width}
      height={dimensions.height}
      options={{ resizeTo: window }}
    >
      <Container name="mainContainer">
        {!isLoaded ? (
          <AssetLoader onAssetsLoaded={handleAssetsLoaded} app={appInstance} />
        ) : (
          <MainPage
            width={dimensions.width}
            height={dimensions.height}
            app={appInstance}
          />
        )}
      </Container>
    </Stage>
  );
};

export default App;
