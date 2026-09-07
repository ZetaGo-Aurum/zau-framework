'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Hotspot {
  id: string;
  title: string;
  category: string;
  description: string;
  position: THREE.Vector3;
}

export default function TheGreatDrawingRoom({
  isZenMode,
  onToggleZen,
}: {
  isZenMode: boolean;
  onToggleZen: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [downloadStats, setDownloadStats] = useState<string>('Initializing 3D buffer...');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090a0f);

    // Camera at eye level
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.4);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // OrbitControls for 360-degree room navigation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.enableZoom = true;
    controls.minDistance = 0.05;
    controls.maxDistance = 14;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.9;
    controls.target.set(0, 0, -1.2);
    controlsRef.current = controls;

    // Ambient architectural shell to prevent any blackscreen while assets stream
    const ambientShellGeo = new THREE.SphereGeometry(18, 32, 32);
    const ambientShellMat = new THREE.MeshBasicMaterial({
      color: 0x1a1612,
      side: THREE.BackSide,
    });
    const ambientShell = new THREE.Mesh(ambientShellGeo, ambientShellMat);
    scene.add(ambientShell);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e5, 2.2);
    scene.add(ambientLight);

    const chandelierLight = new THREE.PointLight(0xffb74d, 3.8, 30);
    chandelierLight.position.set(0, 2.8, 0);
    scene.add(chandelierLight);

    const windowLight = new THREE.DirectionalLight(0xfff9e6, 2.5);
    windowLight.position.set(8, 6, 4);
    scene.add(windowLight);

    const fillLight = new THREE.PointLight(0x7dd3fc, 1.6, 20);
    fillLight.position.set(-6, 2, -5);
    scene.add(fillLight);

    // Hotspots
    const hotspots: Hotspot[] = [
      {
        id: 'piano',
        title: 'Grand Concert Piano',
        category: 'Acoustic / Spatial Node',
        description:
          'Steinway & Bechstein acoustic spatial resonance anchor mapped via ZAU.SpatialAudio pipeline.',
        position: new THREE.Vector3(-1.8, -0.6, -2.2),
      },
      {
        id: 'tapestry',
        title: 'Flemish Baroque Tapestry',
        category: 'High-Res Texture Subsystem',
        description:
          'Historic woven wool & silk tapestry demonstrating ZAU 4K PBR normal mapping and texture streaming.',
        position: new THREE.Vector3(2.4, 0.4, -2.8),
      },
      {
        id: 'chandelier',
        title: 'Ormolu Gilt Chandelier',
        category: 'Dynamic Raytracing Source',
        description:
          '19th-century gilded bronze chandelier serving as focal point for ACES Filmic ambient irradiance.',
        position: new THREE.Vector3(0, 1.8, -0.8),
      },
      {
        id: 'salon',
        title: 'Rococo Salon Architecture',
        category: 'Full 360 Spatial Canvas',
        description:
          'The Great Drawing Room interior captured by The Hallwyl Museum (Stockholm), rendered natively in ZAU.',
        position: new THREE.Vector3(0.2, -0.4, 1.8),
      },
    ];

    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    const beaconMeshes: THREE.Mesh[] = [];
    hotspots.forEach((h) => {
      const ringGeom = new THREE.RingGeometry(0.12, 0.16, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(h.position);
      ring.lookAt(camera.position);
      ring.userData = { hotspot: h };

      const sphereGeom = new THREE.SphereGeometry(0.06, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.copy(h.position);

      beaconGroup.add(ring);
      beaconGroup.add(sphere);
      beaconMeshes.push(ring);
    });

    // Loading Manager for Robust Multi-Asset Tracking
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = (itemUrl, itemsLoaded, itemsTotal) => {
      const p = Math.round((itemsLoaded / itemsTotal) * 100);
      setLoadProgress((prev) => Math.max(prev, p));
    };

    loadingManager.onLoad = () => {
      setLoadProgress(100);
      setTimeout(() => setIsLoaded(true), 300);
    };

    loadingManager.onError = (itemUrl) => {
      console.warn('Non-fatal asset notice:', itemUrl);
    };

    // Explicitly load 4K HD texture for guaranteed binding
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const hdTexture = textureLoader.load(
      '/model/3d/the_great_drawing_room/textures/texture_4k.jpeg',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.flipY = false;
        tex.generateMipmaps = true;
        tex.needsUpdate = true;
      }
    );

    const loader = new GLTFLoader(loadingManager);
    loader.setPath('/model/3d/the_great_drawing_room/');
    loader.setResourcePath('/model/3d/the_great_drawing_room/');

    const applyModelTransform = (model: THREE.Group) => {
      // Remove temporary ambient shell
      scene.remove(ambientShell);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());

      model.position.x = -center.x;
      model.position.y = -center.y;
      model.position.z = -center.z;

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const tex = (mesh.material as any)?.map || hdTexture;
          if (tex) {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.flipY = false;
            tex.needsUpdate = true;
          }

          mesh.material = new THREE.MeshStandardMaterial({
            map: tex,
            side: THREE.DoubleSide,
            roughness: 0.55,
            metalness: 0.15,
            color: 0xffffff,
          });
          mesh.material.needsUpdate = true;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      scene.add(model);
      setIsLoaded(true);
    };

    // Primary: Load optimized web binary GLB (13MB, fast streaming)
    loader.load(
      'room_web.glb',
      (gltf) => {
        applyModelTransform(gltf.scene);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
          const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
          const totalMB = (xhr.total / (1024 * 1024)).toFixed(1);
          setDownloadStats(`${loadedMB} MB / ${totalMB} MB (${percent}%)`);
        } else if (xhr.loaded > 0) {
          const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
          setDownloadStats(`${loadedMB} MB streamed...`);
          setLoadProgress((prev) => Math.min(prev + 10, 96));
        }
      },
      (err) => {
        console.warn('room_web.glb notice, trying scene.glb:', err);
        loader.load(
          'scene.glb',
          (gltf) => {
            applyModelTransform(gltf.scene);
          },
          undefined,
          (err2) => {
            console.error('Model fallback error, applying HD texture to architectural shell:', err2);
            scene.remove(ambientShell);
            const roomBoxGeo = new THREE.BoxGeometry(20, 10, 20);
            const roomBoxMat = new THREE.MeshStandardMaterial({
              map: hdTexture,
              side: THREE.BackSide,
              roughness: 0.5,
              metalness: 0.1,
              color: 0xffffff,
            });
            const roomBox = new THREE.Mesh(roomBoxGeo, roomBoxMat);
            scene.add(roomBox);
            setIsLoaded(true);
          }
        );
      }
    );

    // Raycaster for Hotspot clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(beaconMeshes);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.hotspot) {
          setActiveHotspot(hit.userData.hotspot);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      beaconGroup.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          child.lookAt(camera.position);
          const s = 1.0 + Math.sin(elapsed * 3 + i) * 0.12;
          child.scale.set(s, s, 1);
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleToggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
      setIsAutoRotating(controlsRef.current.autoRotate);
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(0, 0.2, 0.1);
      controlsRef.current.target.set(0, 0, -1.5);
      controlsRef.current.update();
    }
  };

  return (
    <>
      <div
        id="room-3d-canvas-container"
        ref={mountRef}
        className="cursor-grab active:cursor-grabbing"
      />

      {/* Loading HUD with Real-Time Byte Telemetry & Skip Button */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md transition-opacity duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-2xl shadow-gold-glow">
              Z
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-zinc-100">
                ZAU Spatial Engine
              </span>
              <p className="text-[10px] text-zinc-500 font-mono">
                Streaming 360° The Great Drawing Room
              </p>
            </div>
          </div>

          <div className="w-84 max-w-[90vw] space-y-3.5">
            <div className="flex justify-between text-xs text-zinc-400 font-mono">
              <span className="truncate pr-2">{downloadStats}</span>
              <span className="text-amber-400 font-bold ml-auto">{loadProgress}%</span>
            </div>

            <div className="w-full h-2 bg-zinc-900 rounded-md overflow-hidden border border-zinc-800 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-300 rounded-md"
                style={{ width: `${Math.max(loadProgress, 6)}%` }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-zinc-500 font-mono">
                The Hallwyl Museum • CC BY 4.0
              </p>
              <button
                onClick={() => setIsLoaded(true)}
                className="text-[11px] font-mono text-amber-400/90 hover:text-amber-300 hover:underline flex items-center space-x-1"
              >
                <span>Enter Canvas</span>
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hotspot Floating Modal */}
      {activeHotspot && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md p-5 rounded-2xl glass-panel-glow text-zinc-100 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                {activeHotspot.category}
              </span>
              <h4 className="text-lg font-bold mt-1 text-zinc-100">
                {activeHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-zinc-400 hover:text-zinc-100 p-1 transition"
            >
              <i className="bi bi-x-lg text-lg" />
            </button>
          </div>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            {activeHotspot.description}
          </p>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>
              <i className="bi bi-geo-alt-fill text-amber-400 mr-1.5" />
              Interactive 3D Anchor
            </span>
            <span className="text-amber-400/90">Drag 360° to Explore</span>
          </div>
        </div>
      )}

      {/* Persistent 3D HUD Indicator (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center space-x-2">
        <div className="px-3 py-1.5 rounded-lg glass-panel text-xs text-zinc-300 font-mono flex items-center space-x-2 shadow-lg border border-zinc-800">
          <i className="bi bi-camera-video text-amber-400 text-xs" />
          <span className="font-medium text-zinc-200">The Great Drawing Room</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 text-[11px]">360° WebGL</span>
        </div>

        {/* Camera Quick Action Controls */}
        <div className="flex items-center space-x-1 p-1 rounded-xl glass-panel border border-zinc-800">
          <button
            onClick={handleToggleAutoRotate}
            title={isAutoRotating ? 'Pause 360 Rotation' : 'Resume 360 Rotation'}
            className={`p-2 rounded-lg text-xs transition ${
              isAutoRotating
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <i className={`bi ${isAutoRotating ? 'bi-pause-fill' : 'bi-play-fill'} text-sm`} />
          </button>
          <button
            onClick={handleResetCamera}
            title="Reset 360 Camera View"
            className="p-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 transition"
          >
            <i className="bi bi-arrow-counterclockwise text-sm" />
          </button>
        </div>
      </div>

      {/* Attribution Badge (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 hidden sm:block">
        <div className="px-3 py-1.5 rounded-lg glass-panel-subtle text-[11px] text-zinc-400 font-mono border border-zinc-800/80">
          <span>3D Room by </span>
          <a
            href="https://sketchfab.com/TheHallwylMuseum"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:underline font-medium"
          >
            The Hallwyl Museum
          </a>
          <span className="text-zinc-500"> (CC BY 4.0)</span>
        </div>
      </div>
    </>
  );
}
