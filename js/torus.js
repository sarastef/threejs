let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('#eee')
document.body.appendChild( renderer.domElement );
camera.position.z= 5;


/*Create a simple cube*/
let geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
let material2 = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
let cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );

/*Function createTorus
  params: color, radius
*/
// let createTorus = (color, radius) => {

	let torus = new THREE.Mesh(
		new THREE.TorusGeometry(3, .01, 12, 96),
		new THREE.MeshBasicMaterial({ color:"#fd3" }),
	)
  scene.add( torus );
	torus.rotation.x = Math.PI / 1.7
	torus.rotation.y = Math.PI / 6

	let sphere = new THREE.Mesh(
		new THREE.SphereGeometry(Math.floor(Math.random() * (.3 - .1 +.1)) + .1, 32, 32),
		new THREE.MeshBasicMaterial({ color:"#fd3" }),
	)
	sphere.position.x = 3
	torus.add(sphere)

	let sphere2 = new THREE.Mesh(
		new THREE.SphereGeometry(.1 + (.3 - .1) * Math.random(), 36, 36),
		new THREE.MeshBasicMaterial({ color:"#fd3" }),
	)
	sphere2.position.x = -3
	torus.add(sphere2)
  //



// }

// createTorus('#fd3', 3)
// createTorus('#ff6', 2)
// createTorus('#00f', 1.5)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  /*rotation*/
  cube2.rotation.x += 0.02;
  cube2.rotation.y += 0.02;

  let speed = Math.random(3)
  torus.rotation.z += .01 * speed


}

animate();
