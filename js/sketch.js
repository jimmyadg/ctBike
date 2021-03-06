
function getElm(e){
  var arr =e ;
  arr.shift();
  return arr;
}

var date = getElm(data.date);
var trips24 = getElm(data.trips24);
var cTrips = getElm(data.cmlTrips);
var mToday = getElm(data.mToday);
var mToDate = getElm(data.mToDate);
var yMemeber = getElm(data.yMemeber);
var p24 = getElm(data.p24);
var p3d = getElm(data.p3d);
var selector = 0;


var container;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;
var speed = trips24[selector];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  document.title = "ctBike " + date[selector]
  document.getElementById("d").innerHTML = trips24[selector] + " trips" + "</br>" + mToday[selector] + " miles"+"</br>"+ "traveled today";
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.z = 500;

  scene = new THREE.Scene();

  var material = new THREE.SpriteMaterial( {
    map: new THREE.TextureLoader().load("./asset/logo.png"), //new THREE.CanvasTexture( generateSprite() ),
    //blending: THREE.AdditiveBlending
  } );

  for ( var i = 0; i <mToday[selector]/100; i++ ) {

    particle = new THREE.Sprite( material );

    initParticle( particle, i * 20 );

    scene.add( particle );
  }

  renderer = new THREE.CanvasRenderer();
  renderer.setClearColor( 0x000000 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );


  //container.appendChild( div );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function generateSprite() {

  var canvas = document.createElement( 'canvas' );
  canvas.width = 100;
  canvas.height = 1;

  var context = canvas.getContext( '2d' );
  //sphere gradient
  var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
  gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
  gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
  gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
  gradient.addColorStop( 0.8, 'rgba(0,0,0,1)' );

  context.fillStyle = gradient;
  context.fillRect( 0, 0, canvas.width, canvas.height );

  return canvas;

}

function initParticle( particle, delay ) {

  var particle = this instanceof THREE.Sprite ? this : particle;
  var delay = delay !== undefined ? delay : 0;

  //console.log(delay); //debug



  particle.position.set( 0, 0, 0 );
  particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

  new TWEEN.Tween( particle )
  .delay( delay )
  .to( {}, speed/2.5 )
  .onComplete( initParticle )
  .start();

  new TWEEN.Tween( particle.position )
  .delay( delay )
  .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, speed ) //speed
  .start();

  new TWEEN.Tween( particle.scale )
  .delay( delay )
  .to( { x: 0.01, y: 0.01 }, speed*20 ) //speed
  .start();

}

//

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length == 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }
}

//

function animate() {
  requestAnimationFrame( animate );
  render();
}


function render() {
  TWEEN.update();
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  camera.lookAt( scene.position );
  renderer.render( scene, camera );

}
