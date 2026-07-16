'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

import styles from './Hero3DScene.module.css';

const panelImages = [
  '/hero-bg.jpg',
  '/slide-2.jpg',
  '/slide-4.jpg',
  '/sathya-founders.png',
  '/community-new-1.jpg',
];

function buildDepthGrid() {
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const rows = 15;
  const cols = 16;
  const zStart = -7;
  const zEnd = 2.4;

  for (let i = 0; i <= rows; i += 1) {
    const z = zStart + ((zEnd - zStart) / rows) * i;
    vertices.push(-7.2, -2, z, 7.2, -2, z);
  }

  for (let i = 0; i <= cols; i += 1) {
    const x = -7.2 + (14.4 / cols) * i;
    vertices.push(x, -2, zStart, x, -2, zEnd);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0xd4b978,
    transparent: true,
    opacity: 0.16,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.LineSegments(geometry, material);
}

function buildStarField() {
  const geometry = new THREE.BufferGeometry();
  const vertices: number[] = [];

  for (let i = 0; i < 460; i += 1) {
    vertices.push(
      (Math.random() - 0.5) * 11,
      (Math.random() - 0.1) * 5.6,
      -Math.random() * 8.5,
    );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({
    color: 0xf3d995,
    size: 0.022,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

function buildCross() {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: 0xd4b978,
    emissive: 0x8d6726,
    emissiveIntensity: 0.95,
    metalness: 0.62,
    roughness: 0.24,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: 0xffedbd,
    transparent: true,
    opacity: 0.55,
  });

  const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.65, 0.16), material);
  const horizontal = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.22, 0.16), material);
  horizontal.position.y = 0.42;

  [vertical, horizontal].forEach((mesh) => {
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMaterial);
    mesh.add(edges);
    group.add(mesh);
  });

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xe8d4a8,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  [1.2, 1.62, 2.06].forEach((radius, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.006, 10, 160), ringMaterial);
    ring.rotation.set(Math.PI / 2.2, index * 0.35, index * 0.28);
    group.add(ring);
  });

  group.position.set(1.8, 0.34, -1.2);
  group.rotation.set(0.06, -0.42, 0.02);
  return group;
}

function addImagePanels(root: THREE.Group, renderer: THREE.WebGLRenderer) {
  const loader = new THREE.TextureLoader();
  const panelGeometry = new THREE.PlaneGeometry(1.45, 0.92, 1, 1);
  const frameMaterial = new THREE.LineBasicMaterial({
    color: 0xe8d4a8,
    transparent: true,
    opacity: 0.36,
  });
  const placements = [
    { position: new THREE.Vector3(3.35, 1.35, -2.5), rotation: new THREE.Euler(-0.05, -0.5, 0.08), scale: 1.04 },
    { position: new THREE.Vector3(3.88, -0.05, -3.2), rotation: new THREE.Euler(0.08, -0.64, -0.03), scale: 0.86 },
    { position: new THREE.Vector3(2.58, -1.16, -2.05), rotation: new THREE.Euler(0.1, -0.34, -0.08), scale: 0.76 },
    { position: new THREE.Vector3(0.58, 1.3, -3.55), rotation: new THREE.Euler(-0.06, -0.1, -0.05), scale: 0.72 },
    { position: new THREE.Vector3(1.06, -0.76, -4.2), rotation: new THREE.Euler(0.1, 0.1, 0.05), scale: 0.68 },
  ];

  panelImages.forEach((src, index) => {
    const placement = placements[index];
    loader.load(src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const panel = new THREE.Mesh(panelGeometry, material);
      panel.position.copy(placement.position);
      panel.rotation.copy(placement.rotation);
      panel.scale.setScalar(placement.scale);

      const frame = new THREE.LineSegments(new THREE.EdgesGeometry(panelGeometry), frameMaterial);
      panel.add(frame);
      root.add(panel);
    });
  });
}

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    // Skip WebGL on low-end devices
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    if (cores <= 2 || mem <= 2) {
      setIsStatic(true);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setIsStatic(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060e, 0.065);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.6);

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.0 : 1.65));
    mount.appendChild(renderer.domElement);
    renderer.domElement.className = styles.canvas;

    const root = new THREE.Group();
    scene.add(root);

    const grid = buildDepthGrid();
    const stars = buildStarField();
    const cross = buildCross();
    root.add(grid, stars, cross);
    addImagePanels(root, renderer);

    const ambient = new THREE.AmbientLight(0xb7c1ff, 0.52);
    const key = new THREE.PointLight(0xf3d995, 7.5, 10);
    key.position.set(1.8, 1.3, 2.7);
    const side = new THREE.DirectionalLight(0x91a2ff, 1.5);
    side.position.set(-3, 2.4, 4.8);
    scene.add(ambient, key, side);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let frameId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = Math.max(1, mount.clientWidth);
      height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.fov = width < 768 ? 52 : 44;
      camera.updateProjectionMatrix();
      root.scale.setScalar(width < 768 ? 0.78 : 1);
      root.position.x = width < 768 ? 0.72 : 0;
      root.position.y = width < 768 ? -0.05 : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      pointer.x += (target.x - pointer.x) * 0.045;
      pointer.y += (target.y - pointer.y) * 0.045;

      const time = performance.now() * 0.001;
      cross.rotation.y = -0.42 + Math.sin(time * 0.45) * 0.035;
      cross.position.y = 0.34 + Math.sin(time * 0.72) * 0.045;
      stars.rotation.y = time * 0.025;
      grid.position.z = Math.sin(time * 0.28) * 0.08;

      root.rotation.y = pointer.x * 0.055;
      root.rotation.x = -pointer.y * 0.025;
      camera.position.x = pointer.x * 0.18;
      camera.position.y = 0.1 - pointer.y * 0.08;
      camera.lookAt(0.15, -0.05, -1.6);

      renderer.render(scene, camera);

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // IntersectionObserver — pause render loop when off-screen
    let isVisible = true;
    const visObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reducedMotion) {
          frameId = window.requestAnimationFrame(renderLoop);
        } else if (!isVisible && frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      { threshold: 0.05 }
    );
    visObserver.observe(mount);

    const renderLoop = () => {
      if (!isVisible) return;
      render();
    };
    renderLoop();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      observer.disconnect();
      visObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return (
    <div className={styles.scene} aria-hidden="true">
      <div ref={mountRef} className={styles.canvas} />
      <div className={`${styles.fallback} ${isStatic ? styles.static : ''}`}>
        <div className={styles.lightBeams} />
        <div className={styles.depthGrid} />
        <div className={styles.crossMark} />
      </div>
    </div>
  );
}
