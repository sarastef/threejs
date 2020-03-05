/*SCENE*/
function mix(){
let scene = new THREE.Scene();
scene.background = new THREE.Color('#080e24');

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*CAMERA*/
const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 25;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z =3;
camera.updateProjectionMatrix();
const controls =new THREE.OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0);
controls.update();


/*Create a simple cube*/
  const material2 = new THREE.MeshPhongMaterial({
    color: hsl(5.4 / 8, 1, .5),
    opacity: 0.5,
    transparent: true,
  });
  let geometry2 = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  // let material2 = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
  let cube2 = new THREE.Mesh( geometry2, material2 );
  cube2.position.x = 0.02;
  cube2.position.y = 0.02;
  scene.add( cube2 );


/*color*/
function hsl(h, s, l) {
  return (new THREE.Color()).setHSL(h, s, l);
}

/* light*/
function addLight(x, y, z) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(x, y, z);
  scene.add(light);
}
addLight(-1,  2,  4);
addLight( 1, -1, -2);


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
    let geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    // cube.position.z = -0.08;

  });

}
/* GRID OF CUBES */
let createGride=(width,height,spacing)=>{
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let x= (j-(width-1)/2)*spacing
      let y= (i-(height-1)/2)*spacing
      createCube(x,y,hsl(j/ 8, 1, .5));
    }
  }
}
createGride(10,10,.3)


/***** TORUS ******/
let createTorus = (color, radius) => {
  let torus = new THREE.Mesh(
    new THREE.TorusGeometry(radius, .01, 12, 96),
    new THREE.MeshBasicMaterial({ color:color }),
  )
  scene.add( torus );
  torus.rotation.x = Math.PI / 1.7
  torus.rotation.y = Math.PI / 6

  let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(Math.floor(Math.random() * (.3 - .1 +.1)) + .1, 32, 32),
    new THREE.MeshBasicMaterial({ color:color }),
  )
  sphere.position.x = radius
  torus.add(sphere)

  let sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(.1 + (.3 - .1) * Math.random(), 36, 36),
    new THREE.MeshBasicMaterial({ color:color }),
  )
  sphere2.position.x = -radius
  torus.add(sphere2)
}
createTorus("#aa4200", 2)
createTorus('#7982ce', 2.5)
createTorus('#313977', 1.5)

/***PRIMITIVE***/
let primitive = new THREE.Group();
function createPrimitive() {

  var mesh_geo = new THREE.IcosahedronBufferGeometry(1,1);
  var mesh_mat = new THREE.MeshStandardMaterial({color:"#fc3", flatShading:true});
  //---
  var mesh_pri = new THREE.Mesh(mesh_geo, mesh_mat);
  primitive.add(mesh_pri);
  scene.add(primitive);
}
createPrimitive()
/*******************Render*******************/
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
   cube2.rotation.x += 0.02;
   cube2.rotation.y += 0.02;
   cube2.rotation.z += 0.02;
   primitive.rotation.y += 0.003;



 }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);

 render();

}
mix()
