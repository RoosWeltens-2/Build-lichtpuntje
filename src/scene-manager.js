import * as THREE from 'three';

export class SceneManager {
  constructor(container) {
    this.container = container;
    this.groundY = -0.86;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#101510');
    this.scene.fog = new THREE.Fog('#101510', 8, 32);

    this.camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    this.camera.position.set(3.5, 2.8, 5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    container.append(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight('#ffffff', 1.5));

    const keyLight = new THREE.DirectionalLight('#ffffff', 3);
    keyLight.position.set(3, 5, 4);
    this.scene.add(keyLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: '#315f3d', roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = this.groundY;
    this.scene.add(ground);

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const { clientWidth, clientHeight } = this.container;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
