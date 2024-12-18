import './App.css';
// import { useMemo } from 'react';
// import { BlurFilter, } from 'pixi.js';
import { Stage, } from '@pixi/react';
import MainPage from './MainPage';
import { Renderer } from 'pixi.js';
// import MyContainer from './MyContainer';


const App = () => {
  const width = 800;
  const height = 600;
  // globalThis.__PIXI_STAGE__ = Stage;
  // globalThis.__PIXI_RENDERER__ = Renderer;
  // const blurFilter = useMemo(() => new BlurFilter(2), []);
  // const bunnyUrl = 'https://pixijs.io/pixi-react/img/bunny.png';
  return (
    <Stage width={900} height={700} options={{ background: 0x1099bb }}>
      <MainPage width={width} height={height}></MainPage>
      {/* <MyContainer width={width} height={height} /> */}
    </Stage>
  );
};

export default App;