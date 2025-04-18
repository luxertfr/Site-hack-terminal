import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 *  Textures
 */
const loadingManager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader(loadingManager);
const grassTexture = textureLoader.load("../static/textures/Poliigon_GrassPatchyGround_4585_BaseColor.jpg");
const background = textureLoader.load("../static/textures/background2.jpeg");
background.mapping = THREE.EquirectangularReflectionMapping;
scene.background = background

grassTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * Object
 */
// Floor
const floorGeometry = new THREE.PlaneGeometry(5, 5);
const floorMaterial = new THREE.MeshBasicMaterial({color:0xffffff, side: THREE.DoubleSide, map: grassTexture});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.rotation.x =  Math.PI / 2;

scene.add(floor);

scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};
  
window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
  
    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  
    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
  


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
