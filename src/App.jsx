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
    // Create and expose the PIXI.Application instance
    const app = new PIXI.Application({
      width: dimensions.width,
      height: dimensions.height,
      resizeTo: window,
    });
    globalThis.__PIXI_APP__ = app; // Expose for Pixi.js DevTools
    setAppInstance(app);

    // Resize event listener
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 5,
      });
      app.renderer.resize(window.innerWidth, window.innerHeight - 5);
    };

    // window.addEventListener('resize', handleResize);

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
      app={appInstance}
      id="mainCanvas"
      width={dimensions.width}
      height={dimensions.height}
      options={{ resizeTo: window }}
    >
      <Container name="mainContainer">
        {!isLoaded ? (
          <AssetLoader onAssetsLoaded={handleAssetsLoaded} />
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
