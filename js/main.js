/*SCENE*/
function grid_cubes(){
let scene = new THREE.Scene();
scene.background = new THREE.Color('white');

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

/*CAMERA*/
const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 25;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;
camera.fov = 30
camera.updateProjectionMatrix();

const controls =new THREE.OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0);
controls.update();

// let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


document.body.appendChild( renderer.domElement );

/*Create a simple cube*/
// let geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
// let material2 = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
// let cube2 = new THREE.Mesh( geometry2, material2 );
// scene.add( cube2 );

/*color*/
function hsl(h, s, l) {
  return (new THREE.Color()).setHSL(h, s, l);
}


/* function: createCube()
Permet de créer un cube
params:x,y positions cube
*/
let createCube=(x,y,color)=>{
  [THREE.BackSide, THREE.FrontSide].forEach((side) => {
    const material = new THREE.MeshPhongMaterial({
      color,
      opacity: 0.5,
      transparent: true,
      side,
    });
    let geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = 0.08;

  });

}

let createGride=(width,height,spacing)=>{
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let x= (j-(width-1)/2)*spacing
      let y= (i-(height-1)/2)*spacing
      createCube(x,y,hsl(j / 8, 1, .5));
    }
  }
}
// createGride(0.2,0.6,1)
createGride(10,10,.3)

function addLight(x, y, z) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}
addLight(-1,  2,  4);
addLight( 1, -1, -2);


// function animate() {
	// requestAnimationFrame( animate );
	// renderer.render( scene, camera );

  /*rotation*/
  // cube2.rotation.x += 0.02;
  // cube2.rotation.y += 0.02;
// }
// animate();



 let renderRequested = false;

 function requestRenderIfNotRequested() {
   if (!renderRequested) {
     renderRequested = true;
     requestAnimationFrame(render);
   }
 }
/*Render objets*/
 function render() {
   renderRequested = undefined;
   renderer.render(scene, camera);
 }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);

 render();
}
grid_cubes()
