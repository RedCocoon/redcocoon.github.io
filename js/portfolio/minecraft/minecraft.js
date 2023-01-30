import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";
import "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
import "https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.110.3/OrbitControls.min.js";
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';
import Cube from "./cube.js";
import PickHelper from "../../three/pickhelper.js";
import HitboxCursor from "./hitbox_cursor.js";
import * as blocksList from "./blocks_list.js";
import BlockGrid from "./minecraft_blocks.js";
import MobGrid from "./minecraft_mobs.js";
import CanvasGrid from "./minecraft_canvas.js";

var states = [{title:"Blocks"},{title:"Items"},{title:"Mobs"},{title:"Canvas"}]
var currentState = 0

var scene = new THREE.Scene();
var vw = window.innerWidth
var vh = window.innerHeight

var sceneObjects = [];

var aspect = vw / vh;
var frustum_size = 20;
var camera = new THREE.OrthographicCamera(
	aspect * frustum_size / - 2,
	aspect * frustum_size / 2,
	frustum_size / 2,
	frustum_size / - 2, 1, 1000 );
var grid = [];
var grid_size = [16, 16];
var size = [1, 1];

var renderer = new THREE.WebGLRenderer();
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.minZoom = 0.8;
controls.target = new THREE.Vector3( 0, 1, 0 );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.ROTATE,
	RIGHT: THREE.MOUSE.ROTATE
}
//setPolarAngle(45)
window.addEventListener('resize', onWindowUpdated, false);

renderer.setSize( vw, vh );
document.body.appendChild( renderer.domElement );
const canvas = renderer.domElement;
scene.background = new THREE.Color( 0x291d2b )

function onWindowUpdated() {
  vw = window.innerWidth;
  vh = window.innerHeight;

  aspect = vw / vh;

  camera.aspect = aspect;
  camera.left = aspect * frustum_size / - 2;
  camera.right = aspect * frustum_size / 2;
  camera.top = frustum_size / 2;
  camera.bottom = frustum_size / - 2;
  camera.updateProjectionMatrix();
  renderer.setSize(vw, vh);
}

$(document).ready(function() {
      $(".button_left").click(function(){
         currentState -= 1
				 if (currentState < 0) {
	 				currentState = states.length-1
	 			}
				setState(currentState)
      });
			$(".button_right").click(function(){
         currentState += 1
				 if (currentState >= states.length) {
	 				currentState = 0
	 			}
				setState(currentState)
      });
			$(".title .text").click(function(){
				setState(currentState)
      });
   });

function setState(state) {
	$(".title .text").text(states[state].title)
	for (let i = 0; i < sceneObjects.length; i++) {
		scene.remove(sceneObjects[i]);
	}
	switch(state) {
		case 1:
			var mobs = new MobGrid();
			for (let i = 0; i < mobs.length; i++) {
				sceneObjects.push(mobs[i])
				scene.add(mobs[i]);
			}
	    break;
	  case 2:
			var mobs = new MobGrid();
			for (let i = 0; i < mobs.length; i++) {
				sceneObjects.push(mobs[i])
				scene.add(mobs[i]);
			}
	    break;
		case 3:
			var canvas = new CanvasGrid();
			for (let i = 0; i < canvas.length; i++) {
				sceneObjects.push(canvas[i])
				scene.add(canvas[i]);
			}
	    break;
	  default:
			var blocks = new BlockGrid();
			for (let i = 0; i < blocks.length; i++) {
				sceneObjects.push(blocks[i])
				scene.add(blocks[i]);
			}
		}
	}

setState(0);

// Picker code from https://threejs.org/manual/?q=mo#en/picking
const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();

var outline = new HitboxCursor(1.05, 1.05, 1.05);
outline.transparent = true;
scene.add(outline);

var selectedObject;
var raisedObject;
function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}

function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}

function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
  deselectObject()
}

function deselectObject() {
  selectedObject = undefined;
  if (outline != null && outline.show){
    createTween(outline.material, { opacity : 0 }, 150)
    //outline.visible = false
    outline.show = false
  }
}

function selectObject() {
  selectedObject = pickHelper.pick(pickPosition, scene, camera)
  if (!selectedObject) {
    deselectObject()
    return
  }
  outline.visible = true
  if (outline.visible && !outline.show) {
    createTween(outline.material, { opacity: 1 }, 150)
    outline.show = true
  }
  outline.position.set(selectedObject.position.x, selectedObject.position.y, selectedObject.position.z);
}

function pickObject() {
  if (!selectedObject) {
    return
  }
  if (selectedObject.picked) {
			selectedObject.drop()
			// If this is the one that was just selected, reset the origin
			if (currentState == states.length-1) {
				return;
			}
	   controls.target = new THREE.Vector3( 0, 1, 0 )
  }
  else
  {
    	selectedObject.pick()
			if (currentState == states.length-1) {
				return;
			}
    	controls.target = new THREE.Vector3(selectedObject.position.x, 3, selectedObject.position.z)
  }
}

function createTween(property, value, time) {
  new TWEEN.Tween(property)
  .to( value, time)
  .repeat(false)
  .easing(TWEEN.Easing.Cubic.InOut)
  .start();
}

function setPolarAngle(value) {
	value = degrees_to_radians(value)
	controls.maxPolarAngle = value;
	controls.minPolarAngle = value;
}

window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);
window.addEventListener('click', pickObject);

window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});

window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});

window.addEventListener('touchend', clearPickPosition);

camera.position.set( -50, 40, -50 );
//var last_camera_position = camera.position.clone();

//camera.rotation = (0, 30, 20);
//cube.rotation.z = 65;
var animate = function () {
  requestAnimationFrame( animate );
  if (controls != null) {
    controls.update();
  }
  TWEEN.update();
  selectObject();

  renderer.render( scene, camera );
};

animate();

function degrees_to_radians(degrees) {
  return degrees * (Math.PI / 180);
}
