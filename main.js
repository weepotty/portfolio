import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(
  `\r\n#                 _  _        \r\n#    \/\\  \/\\  ___ | || |  ___  \r\n#   \/ \/_\/ \/ \/ _ \\| || | \/ _ \\ \r\n#  \/ __  \/ |  __\/| || || (_) |\r\n#  \\\/ \/_\/   \\___||_||_| \\___\/ \r\n#                             \r\n\nThanks for stopping by! 'Tell me, did you sail across the sun? Did you make it to the milky way to see the lights all faded, and that heaven is overrated?'`
);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(60, 10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 3, 3);
  const material = new THREE.MeshStandardMaterial({
    color: 0xc6c6c6,
  });
  const star = new THREE.Mesh(geometry, material);

  // map each value to the three JS helper function to generate number between -100 and +100
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// face

const faceTexture = new THREE.TextureLoader().load("images/my-face.png");
const face = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: faceTexture })
);

face.position.x = -6.5;
face.position.y = 1.2;
scene.add(face);

// moon

const moonTexture = new THREE.TextureLoader().load("images/moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("images/normal.jpeg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.x = 40;
moon.position.y = 10;
scene.add(moon);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  face.rotation.y += 0.01;
  face.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.005;
  moon.rotation.z += 0.005;

  face.rotation.x += 0.01;
  face.rotation.y += 0.005;
  face.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
