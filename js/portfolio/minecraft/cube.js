import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';

export default class Cube {
  constructor(height, width, depth, texture_path='../../assets/portfolio/minecraft/textures/block/adobe_bricks.png') {
    var geometry = new THREE.BoxGeometry( height, width, depth );
    const texture = new THREE.TextureLoader().load( texture_path );
    texture.magFilter = THREE.NearestFilter

    const vertShader = /*glsl*/`
    varying vec2 vUv;
    varying vec4 vTexCoords;
    varying vec3 vNormal;
    void main() {
      vNormal = normal;
      vTexCoords = projectionMatrix * modelViewMatrix * vec4(position, 1);
      gl_Position = vTexCoords;
      vUv = uv;
    }
    `;

    const fragShader = /*glsl*/`
    uniform sampler2D texture1;
    uniform float vOpacity;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      mediump vec3 light = vec3(0.4, 0.6, 0.3);
      light = normalize(light);
      vec4 new_color = texture2D(texture1, vUv);
      mediump float dProd = max(0.0, dot(vNormal, light));
      dProd = max(dProd, dot(vNormal, -light)-0.1);
      new_color.r *= dProd;
      new_color.g *= dProd;
      new_color.b *= dProd;
      new_color.a *= vOpacity;
      gl_FragColor = new_color;
    }
    `;
    var uniforms = {
        texture1: { type: "texture", value: texture },
        vOpacity: { type: "float", value: 0.0 }
    };

    var material = new THREE.ShaderMaterial(
      { uniforms:uniforms,
        vertexShader:vertShader,
        fragmentShader: fragShader,
        transparent: false} );

    var cube = new THREE.Mesh( geometry, material );
    cube["drop"] = function() {
      createTween(this.position, { y:0 }, 2000)
      this.picked = false;
    }
    cube["pick"] = function() {
      createTween(this.position, { y:3 }, 2000)
      this.picked = true;
    }
    return cube;

    function createTween(property, value, time) {
      new TWEEN.Tween(property)
      .to( value, time)
      .repeat(false)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
    }
  }

}
