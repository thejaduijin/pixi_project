import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { withPixiApp } from '@pixi/react';

const Loader = () => {
    const appRef = useRef(null);
    const spritesRef = useRef({});

    useEffect(() => {
        // Create a PIXI application
        const app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb,
        });
        appRef.current = app;

        // Append the PIXI view to the DOM
        document.body.appendChild(app.view);

        // Initialize loader
        const loader = PIXI.Loader ? new PIXI.Loader() : PIXI.loaders.Loader.shared;

        // Add resources
        loader
            .add('bunny', 'data/bunny.png')
            .add('spaceship', 'assets/spritesheet.json')
            .add('scoreFont', 'assets/score.fnt');

        // Middleware for caching and parsing
        loader.pre((resource, next) => {
            console.log(`Preloading: ${resource.url}`);
            next();
        });

        loader.use((resource, next) => {
            console.log(`Parsing: ${resource.url}`);
            next();
        });

        // Load resources
        loader.load((loader, resources) => {
            const sprites = spritesRef.current;

            // Create sprites and add them to the stage
            sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
            sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
            sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);

            // Add sprites to the PIXI stage
            app.stage.addChild(sprites.bunny);
            app.stage.addChild(sprites.spaceship);
            app.stage.addChild(sprites.scoreFont);

            // Position the sprites
            sprites.bunny.position.set(100, 100);
            sprites.spaceship.position.set(300, 100);
            sprites.scoreFont.position.set(500, 100);
        });

        // Handle loader signals
        loader.onProgress.add(() => console.log('Loading progress...'));
        loader.onError.add((err) => console.error('Error loading resource:', err));
        loader.onLoad.add(() => console.log('Resource loaded'));
        loader.onComplete.add(() => console.log('All resources loaded'));

        // Cleanup on unmount
        return () => {
            app.destroy(true, { children: true });
            if (app.view && app.view.parentNode) {
                app.view.parentNode.removeChild(app.view);
            }
        };
    }, []);

    return null; // No direct DOM rendering, PIXI handles the canvas
};




export default withPixiApp(Loader);