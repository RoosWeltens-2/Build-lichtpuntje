import * as THREE from 'three';
import './style.css';

const container = document.querySelector('#scene');

if (!(container instanceof HTMLElement)) {
  throw new Error('Could not find the scene container.');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color('#101510');

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  100,
);
camera.position.set(3.5, 2.8, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.append(renderer.domElement);

scene.add(new THREE.AmbientLight('#ffffff', 1.5));

const keyLight = new THREE.DirectionalLight('#ffffff', 3);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.7, 1.7, 1.7),
  new THREE.MeshStandardMaterial({ color: '#39e75f', roughness: 0.35 }),
);
scene.add(cube);

function resize() {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', resize);

function animate() {
  cube.rotation.x += 0.004;
  cube.rotation.y += 0.006;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
