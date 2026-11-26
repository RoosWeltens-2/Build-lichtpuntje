import * as THREE from 'three';

export class DrivingController {
  constructor(taxi) {
    this.taxi = taxi;
    this.heldKeys = new Set();
    this.controlKeys = new Set([
      'KeyZ',
      'KeyS',
      'KeyQ',
      'KeyD',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ]);
    this.speed = 0;
    this.forward = new THREE.Vector3();

    window.addEventListener('keydown', (event) => {
      if (this.controlKeys.has(event.code)) {
        event.preventDefault();
        this.heldKeys.add(event.code);
      }
    });

    window.addEventListener('keyup', (event) => {
      this.heldKeys.delete(event.code);
    });

    window.addEventListener('blur', () => {
      this.heldKeys.clear();
    });
  }

  isHeld(...keys) {
    return keys.some((key) => this.heldKeys.has(key));
  }

  update(delta) {
    const throttle =
      Number(this.isHeld('KeyZ', 'ArrowUp')) -
      Number(this.isHeld('KeyS', 'ArrowDown'));

    if (throttle !== 0) {
      this.speed += throttle * 5 * delta;
    } else {
      this.speed = THREE.MathUtils.damp(this.speed, 0, 1.8, delta);
    }

    this.speed = THREE.MathUtils.clamp(this.speed, -2.5, 5);

    const steering =
      Number(this.isHeld('KeyQ', 'ArrowLeft')) -
      Number(this.isHeld('KeyD', 'ArrowRight'));

    if (steering !== 0 && Math.abs(this.speed) > 0.05) {
      this.taxi.root.rotation.y +=
        steering * 1.8 * Math.sign(this.speed) * delta;
    }

    this.forward
      .set(0, 0, -1)
      .applyQuaternion(this.taxi.root.quaternion);
    this.taxi.root.position.addScaledVector(this.forward, this.speed * delta);
  }
}
