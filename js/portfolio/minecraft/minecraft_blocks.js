import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
import Cube from "./cube.js";
import * as blocksList from "./blocks_list.js";

export default class BlockGrid {
  constructor()
  {
    var cubes = []
    // Generate cubes
    const blocks_list = blocksList.full_blocks;
    const x_length = blocks_list[0].length
    for (let y = 0; y < blocks_list.length; y++) {
    	for (let x = 0; x < blocks_list[y].length; x++) {
        var cube;

        cube = new Cube(1, 1, 1, '../../assets/portfolio/minecraft/textures/block/'+blocks_list[y][x]);
    		createTween(cube.material.uniforms.vOpacity, {value: 1}, 500);
    		cube.position.y = 2;
    		createTween(cube.position, {y: 0}, 500+(x*100)+(Math.pow(y, 1.5)*blocks_list[y].length));
        cube.position.x = (x-(x_length/2.0));
        cube.position.z = (y-(blocks_list.length/2.0));
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
