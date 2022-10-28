import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
import Cube from "./cube.js";
import * as blocksList from "./blocks_list.js";

export default class CanvasGrid {
  constructor()
  {
    var cubes = []
    // Generate cubes
    const blocks_list = blocksList.full_blocks;
    var random_colours = blocks_list[Math.floor(Math.random() * blocks_list.length)];
    const x_length = blocks_list[0].length
    for (let y = 0; y < 16; y++) {
    	for (let x = 0; x < 16; x++) {
        var cube;
        cube = new Cube(1, 1, 1, '../../assets/portfolio/minecraft/textures/block/'+random_colours[Math.floor(Math.random() * random_colours.length)]);
    		createTween(cube.material.uniforms.vOpacity, {value: 1}, 500);
    		cube.position.y = 2;
    		createTween(cube.position, {y: 0}, 500+(x*100)+(Math.pow(y, 2)*blocks_list[y].length));
        cube.position.x = (x-(8));
        cube.position.z = (y-(8));
        cubes.push(cube)
    	}
    }
  return cubes
  function createTween(property, value, time) {
    new TWEEN.Tween(property)
    .to( value, time)
    .repeat(false)
    .easing(TWEEN.Easing.Cubic.InOut)
    .start();
  }
  }
}
