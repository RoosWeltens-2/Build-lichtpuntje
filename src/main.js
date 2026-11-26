import * as THREE from 'three';
import './style.css';
import { DrivingController } from './driving-controller.js';
import { FollowCamera } from './follow-camera.js';
import { SceneManager } from './scene-manager.js';
import { Taxi } from './taxi.js';

const container = document.querySelector('#scene');
const modelError = document.querySelector('#model-error');

if (!(container instanceof HTMLElement)) {
  throw new Error('Could not find the scene container.');
}

if (!(modelError instanceof HTMLElement)) {
  throw new Error('Could not find the model error message.');
}

const world = new SceneManager(container);
const taxi = new Taxi(world.scene, world.groundY);
const drivingController = new DrivingController(taxi);
const followCamera = new FollowCamera(world.camera, taxi);
const clock = new THREE.Clock();

async function loadTaxi() {
  try {
    await taxi.load('/models/taxi.glb');
    followCamera.update(0);
  } catch (error) {
    console.error('Could not load /models/taxi.glb.', error);
    modelError.textContent =
      'Could not load taxi.glb. Check that it is in public/models/.';
    modelError.hidden = false;
  }
}

function animate() {
  const delta = Math.min(clock.getDelta(), 0.05);

  if (taxi.loaded) {
    drivingController.update(delta);
    followCamera.update(delta);
  }

  world.render();
}

void loadTaxi();
world.renderer.setAnimationLoop(animate);
