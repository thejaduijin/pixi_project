// import React, { useEffect } from 'react';
// import * as PIXI from 'pixi.js';
// import { withPixiApp } from '@pixi/react';

// const PixiLoader = ({ config, onResourcesLoaded }) => {
//   useEffect(() => {
//     const loadResources = async () => {
//       const resources = {};

//       for (const asset of config.loader) {
//         const key = extractKeyFromAsset(asset.key);

//         try {
//           console.log(`Loading asset: ${asset.data.default}`);
//           resources[key] = await PIXI.Assets.load(asset.data.default);
//           console.log(`Successfully loaded: ${asset.data.default}`);
//         } catch (error) {
//           console.error(`Error loading asset: ${asset.data.default}`, error);
//         }
//       }

//       if (onResourcesLoaded) {
//         onResourcesLoaded(resources);
//       }
//     };

//     loadResources();
//   }, [config, onResourcesLoaded]);

//   const extractKeyFromAsset = (key) => {
//     let filename = key.substring(key.lastIndexOf('/') + 1);
//     return filename.split('.')[0];
//   };

//   return null;
// };


// export default withPixiApp(PixiLoader);