// // import React, { useState, useEffect, useRef } from "react";
// // import { Container, Sprite, withPixiApp } from "@pixi/react";
// // import * as PIXI from "pixi.js";

// // const Reels = ({ data, gridSize, symbolSize, position }) => {
// //   const { rows, columns } = gridSize; // 3x5 grid
// //   const [isSpinning, setIsSpinning] = useState(false);
// //   const containerRef = useRef(null);

// //   const startSpin = () => {
// //     setIsSpinning(true);
// //   };

// //   useEffect(() => {
// //     if (!isSpinning) return;

// //     const ticker = new PIXI.Ticker();
// //     let offset = 0;

// //     ticker.add(() => {
// //       offset += 5; // Adjust speed of the spin
// //       if (containerRef.current) {
// //         containerRef.current.y = position.y + offset;

// //         // Reset the position to create a loop
// //         if (offset >= symbolSize.height * rows) {
// //           offset = 0;
// //         }
// //       }
// //     });

// //     ticker.start();

// //     // Stop the spin after 2 seconds
// //     const timeout = setTimeout(() => {
// //       ticker.stop();
// //       setIsSpinning(false);
// //     }, 2000);

// //     return () => {
// //       ticker.destroy();
// //       clearTimeout(timeout);
// //     };
// //   }, [isSpinning, rows, symbolSize.height, position.y]);

// //   return (
// //     <Container position={position} scale={0.8} ref={containerRef}>
// //       {data.map((symbol, index) => {
// //         const col = index % columns; // Column index
// //         const row = Math.floor(index / columns); // Row index

// //         const x = col * symbolSize.width; // X position
// //         const y = row * symbolSize.height; // Y position
// //         return (
// //           <Sprite
// //             x={x - 165}
// //             y={y - 50}
// //             width={symbolSize.width}
// //             height={symbolSize.height}
// //             image={symbol.textureCacheIds[0]}
// //             key={index}
// //           />
// //         );
// //       })}
// //     </Container>
// //   );
// // };

// // export default withPixiApp(Reels);


// import React, { useEffect, useRef } from "react";
// import { Container, Sprite, withPixiApp } from "@pixi/react";
// import * as PIXI from "pixi.js";

// const Reels = ({ data, gridSize, symbolSize, position, isSpinning }) => {
//   const { rows, columns } = gridSize; // 3x5 grid
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (!isSpinning) return;

//     const ticker = new PIXI.Ticker();
//     let offset = 0;

//     ticker.add(() => {
//       offset += 5; // Adjust speed of the spin
//       if (containerRef.current) {
//         containerRef.current.y = position.y + offset;

//         // Reset the position to create a loop
//         if (offset >= symbolSize.height * rows) {
//           offset = 0;
//         }
//       }
//     });

//     ticker.start();

//     return () => {
//       ticker.destroy();
//     };
//   }, [isSpinning, rows, symbolSize.height, position.y]);

//   return (
//     <Container position={position} scale={0.8} ref={containerRef}>
//       {data.map((symbol, index) => {
//         console.log(symbol.textureCacheIds[0]);

//         const col = index % columns; // Column index
//         const row = Math.floor(index / columns); // Row index

//         const x = col * symbolSize.width; // X position
//         const y = row * symbolSize.height; // Y position
//         return (
//           <Sprite
//             x={x - 165}
//             y={y - 50}
//             width={symbolSize.width}
//             height={symbolSize.height}
//             image={symbol.textureCacheIds[0]}
//             key={index}
//           />
//         );
//       })}
//     </Container>
//   );
// };

// export default withPixiApp(Reels);



import React, { useEffect, useRef } from "react";
import { Container, Sprite, withPixiApp } from "@pixi/react";
import * as PIXI from "pixi.js";

const Reels = ({ data, gridSize, symbolSize, position, isSpinning }) => {
  const { rows, columns } = gridSize; // 3x5 grid
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isSpinning) return;

    const ticker = new PIXI.Ticker();
    let offset = 0;

    ticker.add(() => {
      offset += 10; // Adjust speed of the spin
      if (containerRef.current) {
        containerRef.current.children.forEach((child) => {
          child.y += 10; // Move symbols down

          // Reset the position if the symbol goes out of bounds
          if (child.y >= symbolSize.height * rows) {
            child.y -= symbolSize.height * rows + symbolSize.height; // Move to the top
          }
        });
      }
    });

    ticker.start();

    return () => {
      ticker.destroy();
    };
  }, [isSpinning, rows, symbolSize.height]);

  return (
    <Container position={position} scale={0.8} ref={containerRef}>
      {data.map((symbol, index) => {
        const col = index % columns; // Column index
        const row = Math.floor(index / columns); // Row index

        const x = col * symbolSize.width; // X position
        const y = row * symbolSize.height; // Y position
        return (
          <Sprite
            x={x - 165}
            y={y - 50}
            width={symbolSize.width}
            height={symbolSize.height}
            image={symbol.textureCacheIds[0]}
            key={index}
          />
        );
      })}
    </Container>
  );
};

export default withPixiApp(Reels);

