import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";

export default class HitboxCursor {

  constructor(height, width, depth) {
    var geometry = new THREE.BoxGeometry( height, width, depth );
    const texture = new THREE.TextureLoader().load( '../../assets/portfolio/minecraft/textures/block/cursor.png' );
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
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec4 new_color = texture2D(texture1, vUv);
      new_color.a = new_color.r;
      gl_FragColor = new_color;
    }
    `;
    var uniforms = {
        texture1: { type: "t", value: texture }
    };

    // var material = new THREE.ShaderMaterial(
    //   { uniforms:uniforms,
    //     vertexShader:vertShader,
    //     fragmentShader: fragShader,
    //     transparent: true} );
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      opacity: 0,
      transparent: true,
    })
    var cube = new THREE.Mesh( geometry, material );
    cube.pick_ignore = true;
    return cube;
  }
}
