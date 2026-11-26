# Project info

Start via `npm run dev`

Place the taxi model at `public/models/taxi.glb`. Its fallback texture is at
`public/models/Textures/colormap.png`. Drive with Z/S and steer with Q/D, or
use the arrow keys.

## Source structure

- `src/main.js` wires the app together and runs the animation loop.
- `src/scene-manager.js` sets up the scene, renderer, lights, ground, and resize handling.
- `src/taxi.js` loads and scales the taxi model.
- `src/driving-controller.js` handles keyboard input and vehicle movement.
- `src/follow-camera.js` keeps the camera behind the taxi.
