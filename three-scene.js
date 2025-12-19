let scene, camera, renderer;

function initScene(surface, obstacles) {
  const canvas = document.getElementById("scene");
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / 300, 0.1, 100);
  camera.position.set(5, 8, 8);
  camera.lookAt(0,0,0);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, 300);

  scene.clear();

  // السطح
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(surface.length, surface.width),
    new THREE.MeshBasicMaterial({ color: 0x0a2a44, wireframe: true })
  );
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);

  // العوائق
  obstacles.forEach(o => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(o.l, o.h, o.w),
      new THREE.MeshBasicMaterial({ color: 0x6a5cff, opacity: 0.6, transparent: true })
    );
    box.position.set(o.x, o.h/2, o.y);
    scene.add(box);
  });

  renderer.render(scene, camera);
}

function highlightPoint(x,y){
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.15),
    new THREE.MeshBasicMaterial({ color: 0x00ffcc })
  );
  sphere.position.set(x, 0.1, y);
  scene.add(sphere);
  renderer.render(scene, camera);
}
