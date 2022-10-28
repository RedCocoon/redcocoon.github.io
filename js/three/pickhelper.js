import "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.146.0/three.js";

// Picker code from https://threejs.org/manual/?q=mo#en/picking
export default class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  pick(normalizedPosition, scene, camera) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject = undefined;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length > 0) {
      for (let i = 0; i < intersectedObjects.length; i++) {
        const new_object = intersectedObjects[i].object;
        if (!new_object.pick_ignore) {
          this.pickedObject = new_object;
          return this.pickedObject;
        }
      }
    }
    return this.pickedObject;
  }
}
