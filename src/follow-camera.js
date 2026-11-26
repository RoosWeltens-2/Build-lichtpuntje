import * as THREE from 'three';

export class FollowCamera {
  constructor(camera, taxi) {
    this.camera = camera;
    this.taxi = taxi;
    this.offset = new THREE.Vector3(0, 3.2, 6.5);
    this.target = new THREE.Vector3();
    this.desiredPosition = new THREE.Vector3();
  }

  update(delta) {
    this.desiredPosition
      .copy(this.offset)
      .applyQuaternion(this.taxi.root.quaternion)
      .add(this.taxi.root.position);

    if (delta === 0) {
      this.camera.position.copy(this.desiredPosition);
    } else {
      this.camera.position.lerp(
        this.desiredPosition,
        1 - Math.exp(-5 * delta),
      );
    }

    this.target.copy(this.taxi.root.position);
    this.target.y += 0.75;
    this.camera.lookAt(this.target);
  }
}
