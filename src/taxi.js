import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Taxi {
  constructor(scene, groundY) {
    this.root = new THREE.Group();
    this.root.position.y = groundY;
    this.loaded = false;
    scene.add(this.root);
  }

  async load(path) {
    const { scene: model } = await new GLTFLoader().loadAsync(path);
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z);

    if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
      throw new Error('The taxi model has no measurable dimensions.');
    }

    model.scale.setScalar(2.4 / largestDimension);
    model.updateMatrixWorld(true);
    bounds.setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());

    model.position.x -= center.x;
    model.position.y -= bounds.min.y;
    model.position.z -= center.z;
    this.root.add(model);
    this.loaded = true;
  }
}
