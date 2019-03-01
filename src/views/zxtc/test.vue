<template>
  <div id="test1">
      <header>
        <canvas id="canvas"></canvas>
          <div>
              <img src="" alt="">
          </div>
          <div>
              <div>threejs test </div>
              <p></p>
              <p></p>
              <p></p>
          </div>
      </header>
  </div>
</template>

<script>
import GLTLOADER from 'three-gltf-loader';
import { Mesh } from 'three';
import * as dat from 'dat.gui';

export default {

  data() {
    return {
      mousePos: { x: 0, y: 0 },
      Colors: {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xF5986E,
        brownDark: 0x23190f,
        blue: 0x68c3c0,
      },

    };
  },

  components: {},

  computed: {},

  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.context.fillRect(0, 0, 100, 100);
    // ctx.strokeRect(120, 0, 100, 100);
    ctx.context.fillStyle = 'pink';
    for (let i = 0; i < 6; i++) {
      let x = Math.sin(i * 1)
    }
    // this.threeinit();
  },

  methods: {
    threeinit() {
      const gui = new dat.GUI();
      function Controld() {
        this.rotationspeed = 0.02;
        this.bouncingspeed = 0.03;
      }
      const controld1 = new Controld();
      gui.add(controld1, 'rotationspeed', 0, 0.5);
      gui.add(controld1, 'bouncingspeed', 0, 0.5);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerHeight / window.innerWidth, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xeeee);
      renderer.setSize(window.innerHeight, window.innerWidth);
      const axes = new THREE.AxesHelper(20);
      scene.add(axes);
      const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
      const planeMaterail = new THREE.MeshBasicMaterial({ color: 'red' });
      const plane = new THREE.Mesh(planeGeometry, planeMaterail);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
      scene.add(plane);
      const cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
      const cube = new Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      scene.add(cube);
      const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'yellow', wireframe: true });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = 20;
      sphere.position.y = 4;
      sphere.position.z = 2;
      camera.position.x = -30;
      camera.position.y = 40;
      camera.position.z = 30;
      let step = 0;
      setInterval(() => {
        requestAnimationFrame((() => {
          step += controld1.bouncingspeed;
          sphere.position.x = 20 + (10 * Math.cos(step));
          sphere.position.y = 4 + (10 * Math.abs(Math.sin(step)));
          sphere.rotation.x += controld1.rotationspeed;
          sphere.rotation.y += controld1.rotationspeed;
          sphere.rotation.z += controld1.rotationspeed;
          scene.add(sphere);
          camera.lookAt(scene.position);
          document.getElementById('test1').appendChild(renderer.domElement);
          renderer.render(scene, camera);
        }));
      }, 50);
      function addcube() {
        const cubesize = Math.ceil((Math.random() * 3));
        const cubeGeometry1 = new THREE.BoxGeometry(cubesize, cubesize, cubesize);
        const cubeMaterial1 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        const cube1 = new Mesh(cubeGeometry1, cubeMaterial1);
        cube1.name = `cube-${scene.children.length}`;
        cube1.position.x = 30 + Math.round(Math.random() * 10);
        cube1.position.y = Math.round((Math.random() * 5));
        cube1.position.z = -30 + Math.round((Math.random() * 10));
        scene.add(cube1);
        console.log(scene);
        // this.numberobject = scene.children.length;
      }
      for (let i = 0; i < 30; i++) {
        addcube();
      }
    },
  },
};

</script>
<style lang='scss' scoped>
canvas{
    width:100%;
    height: 100%;
}
</style>
