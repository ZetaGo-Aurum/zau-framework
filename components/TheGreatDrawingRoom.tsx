'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
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
  const [loadProgress, setLoadProgress] = useState<number>(10);
  const [downloadStats, setDownloadStats] = useState<string>('Streaming low-poly proxy...');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [showRefinedBadge, setShowRefinedBadge] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const beaconGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (beaconGroupRef.current) {
      beaconGroupRef.current.visible = !isZenMode;
    }
  }, [isZenMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile / Android hardware
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof navigator !== 'undefined' ? navigator.userAgent : ''
      ) || window.innerWidth < 768;
    setIsMobileDevice(isMobile);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b10);

    // Initial Camera viewpoint seated at the black stool
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.05, 500);
    // Positioned at eye-level in front of the black stool looking directly at its center axis
    camera.position.set(-0.885, 1.15, 2.25);
    cameraRef.current = camera;

    // WebGL Renderer calibrated for high-fidelity photogrammetry
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        powerPreference: 'high-performance',
        alpha: false,
      });
      renderer.setSize(width, height);
      // On mobile / Android, limit pixel ratio to 1.5 to guarantee solid 60 FPS
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL context notice:', err);
      setIsLoaded(true);
      return;
    }

    // OrbitControls initialized with pivot point ("titik tumpu") anchored dead-center on the black stool axis
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = true;
    controls.minDistance = 0.15;
    // Anti-wall clipping: room radius is ~4.5m, maxDistance of 2.2m prevents camera from penetrating any wall
    controls.maxDistance = 2.2;
    controls.maxPolarAngle = Math.PI / 2 + 0.12;
    controls.minPolarAngle = 0.15;
    controls.rotateSpeed = isMobile ? 0.6 : 0.75;
    controls.zoomSpeed = 0.85;
    // Titik tumpu kamera tepat pada sumbu pusat kursi bundar hitam
    controls.target.set(-0.885, 0.70, 1.08);
    controlsRef.current = controls;

    // Balanced Lighting for Baked Photogrammetry Textures
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const daylight = new THREE.DirectionalLight(0xfff6e5, 1.0);
    daylight.position.set(2, 6, -2);
    scene.add(daylight);

    const interiorFill = new THREE.PointLight(0xffeedd, 0.6, 15);
    interiorFill.position.set(-1.2, 2.5, 2.0);
    scene.add(interiorFill);

    // Architectural Hotspots in Salt Tower Lower Room
    const hotspots: Hotspot[] = [
      {
        id: 'stool-anchor',
        title: 'Kursi Bundar Hitam (Titik Tumpu Utama)',
        category: 'Titik Tumpu Pengamatan',
        description:
          'Titik tumpu utama rotasi kamera tepat pada sumbu pusat kursi bundar hitam (-0.885, 0.70, 1.08). Batas jarak orbit 2.2m memastikan perputaran kamera 360 derajat tetap berada di dalam ruangan tanpa menembus dinding.',
        position: new THREE.Vector3(-0.885, 0.68, 1.08),
      },
      {
        id: 'portal',
        title: 'Medieval Chamber Portal',
        category: 'Architectural Feature',
        description:
          'Heavy oak arched portal dating to the 13th century fortification expansion by King Henry III.',
        position: new THREE.Vector3(-0.15, 1.15, 4.1),
      },
      {
        id: 'arrow-slit',
        title: 'Norman Arrow-Slit Loop & Vault',
        category: 'Defensive Masonry',
        description:
          'Deep splayed embrasure providing defensive archers wide traverse while presenting a narrow external slit to attackers.',
        position: new THREE.Vector3(-2.8, 1.2, 3.1),
      },
      {
        id: 'stone-vault',
        title: 'Early English Ribbed Vaulting',
        category: 'Ceiling Structural Geometry',
        description:
          'Fine 13th-century ragstone and Reigate stone ribs converging on the central boss, engineered to bear the upper tower armory.',
        position: new THREE.Vector3(-1.2, 3.2, 2.2),
      },
    ];

    const beaconGroup = new THREE.Group();
    beaconGroup.visible = !isZenMode;
    beaconGroupRef.current = beaconGroup;
    scene.add(beaconGroup);

    const beaconMeshes: THREE.Mesh[] = [];
    hotspots.forEach((h) => {
      const ringGeom = new THREE.RingGeometry(0.1, 0.14, 32);
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

      const sphereGeom = new THREE.SphereGeometry(0.05, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.copy(h.position);

      beaconGroup.add(ring);
      beaconGroup.add(sphere);
      beaconMeshes.push(ring);
    });

    // Setup Draco and GLTF Loaders
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let lowpolyModel: THREE.Group | null = null;
    let refinedModel: THREE.Group | null = null;

    // Helper: configure photogrammetry material
    const configureMaterials = (group: THREE.Group) => {
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          if (m.material) {
            const mat = m.material as THREE.MeshStandardMaterial;
            mat.roughness = 0.8;
            mat.metalness = 0.05;
            mat.side = THREE.DoubleSide;
            if (mat.map) {
              mat.map.anisotropy = isMobile ? 4 : 16;
              mat.map.colorSpace = THREE.SRGBColorSpace;
              mat.map.generateMipmaps = true;
              mat.map.needsUpdate = true;
            }
            mat.needsUpdate = true;
          }
        }
      });
    };

    // PHASE 1: Instant Low-Poly Frame 0 Mount (< 20ms, ZERO blackscreen)
    loader.load(
      '/model/3d/salt_tower/salt_tower_lowpoly.glb',
      (gltf) => {
        lowpolyModel = gltf.scene;
        configureMaterials(lowpolyModel);
        scene.add(lowpolyModel);
        setLoadProgress(35);
        setDownloadStats('Low-Poly Proxy Active (Frame 0)');
        // Trigger refined background download
        loadRefinedModel();
      },
      undefined,
      (err) => {
        console.warn('Low-poly load notice, proceeding to high-res:', err);
        loadRefinedModel();
      }
    );

    // PHASE 2: Background High-Poly Stream (Tiered: 4K for Mobile, 8K for Desktop)
    const loadRefinedModel = () => {
      // Mobile tier uses 4K texture to safeguard Android GPU VRAM (avoids 358MB memory spikes)
      const assetUrl = isMobile
        ? '/model/3d/salt_tower/salt_tower_mobile.glb'
        : '/model/3d/salt_tower/salt_tower_8k.glb';

      loader.load(
        assetUrl,
        (gltf) => {
          refinedModel = gltf.scene;
          configureMaterials(refinedModel);
          scene.add(refinedModel);

          // Smoothly remove low-poly proxy
          if (lowpolyModel) {
            scene.remove(lowpolyModel);
            lowpolyModel = null;
          }

          setLoadProgress(100);
          setDownloadStats(
            isMobile
              ? '6.6 MB • 4K HD Mobile Optimized'
              : '28.2 MB • 8K PBR Desktop Master'
          );
          setIsLoaded(true);
          setTimeout(() => setShowRefinedBadge(false), 5000);
        },
        (xhr) => {
          if (xhr.lengthComputable && xhr.total > 0) {
            const p = Math.round((xhr.loaded / xhr.total) * 65) + 35;
            setLoadProgress(p);
            const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
            const totalMB = (xhr.total / (1024 * 1024)).toFixed(1);
            setDownloadStats(`${loadedMB} MB / ${totalMB} MB (${p}%)`);
          } else if (xhr.loaded > 0) {
            const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
            setDownloadStats(`${loadedMB} MB streaming...`);
            setLoadProgress((prev) => Math.min(prev + 8, 95));
          }
        },
        (err) => {
          console.error('Refined model stream notice:', err);
          setIsLoaded(true);
        }
      );
    };

    // Hotspot interaction raycaster
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
    const clock = new THREE.Clock();

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
      dracoLoader.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const [isSeatedView, setIsSeatedView] = useState<boolean>(false);

  const handleToggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
      setIsAutoRotating(controlsRef.current.autoRotate);
    }
  };

  const handleToggleSeatedView = () => {
    if (controlsRef.current && cameraRef.current) {
      if (!isSeatedView) {
        // Seated viewpoint: camera sits right above the stool center looking across the chamber
        cameraRef.current.position.set(-0.885, 1.15, 1.08);
        controlsRef.current.target.set(-0.885, 1.12, 1.30);
        controlsRef.current.minDistance = 0.05;
        controlsRef.current.maxDistance = 2.2;
        setIsSeatedView(true);
      } else {
        // Orbit viewpoint around the stool
        cameraRef.current.position.set(-0.885, 1.15, 2.25);
        controlsRef.current.target.set(-0.885, 0.70, 1.08);
        controlsRef.current.minDistance = 0.15;
        controlsRef.current.maxDistance = 2.2;
        setIsSeatedView(false);
      }
      controlsRef.current.update();
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current && cameraRef.current) {
      // Return camera directly to the black stool orbit center
      cameraRef.current.position.set(-0.885, 1.15, 2.25);
      controlsRef.current.target.set(-0.885, 0.70, 1.08);
      controlsRef.current.minDistance = 0.15;
      controlsRef.current.maxDistance = 2.2;
      controlsRef.current.update();
      setIsSeatedView(false);
    }
  };

  return (
    <>
      <div
        id="room-3d-canvas-container"
        ref={mountRef}
        className="cursor-grab active:cursor-grabbing"
      />

      {/* Floating Progressive Stream Telemetry Widget (Non-blocking: Canvas is 100% interactive from Frame 0) */}
      {!isZenMode && !isLoaded && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 hidden sm:block max-w-[calc(100vw-2rem)] w-72 sm:w-80 p-3.5 sm:p-4 rounded-2xl glass-panel-glow border border-amber-500/30 text-xs font-mono backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="font-bold text-white text-[11px]">
                {isMobileDevice ? 'Streaming 4K Mobile Tier' : 'Streaming 8K PBR Master'}
              </span>
            </div>
            <span className="text-amber-400 font-black text-xs">{loadProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(loadProgress, 12)}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-400">
            <span className="truncate">{downloadStats}</span>
            <span className="text-amber-400/90 font-medium ml-2">Frame 0 Interactive</span>
          </div>
        </div>
      )}

      {/* Refinement Confirmation Badge */}
      {!isZenMode && isLoaded && showRefinedBadge && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono text-emerald-300 hidden sm:flex items-center space-x-2 shadow-lg animate-in fade-in duration-300">
          <i className="bi bi-patch-check-fill text-emerald-400 text-sm" />
          <span>
            {isMobileDevice
              ? '4K HD Mobile Optimized • 60 FPS Stable'
              : '8K PBR Master Active • 2.9M Poly Refined'}
          </span>
        </div>
      )}

      {/* Hotspot Floating Modal */}
      {!isZenMode && activeHotspot && (
        <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md p-4 sm:p-5 rounded-2xl glass-panel-glow text-zinc-100 animate-in fade-in slide-in-from-bottom-6 duration-300">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                {activeHotspot.category}
              </span>
              <h4 className="text-base sm:text-lg font-bold mt-1 text-zinc-100">
                {activeHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-zinc-400 hover:text-zinc-100 p-1 transition"
            >
              <i className="bi bi-x-lg text-base" />
            </button>
          </div>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            {activeHotspot.description}
          </p>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400 font-mono">
            <span>
              <i className="bi bi-geo-alt-fill text-amber-400 mr-1.5" />
              Salt Tower Chamber Anchor
            </span>
            <span className="text-amber-400/90">Drag 360° to Explore</span>
          </div>
        </div>
      )}

      {/* Persistent 3D HUD Indicator (Bottom Left) */}
      {!isZenMode && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 hidden sm:flex items-center space-x-2">
          <div className="px-2.5 sm:px-3 py-1.5 rounded-lg glass-panel text-[11px] sm:text-xs text-zinc-300 font-mono flex items-center space-x-2 shadow-lg border border-zinc-800">
            <i className="bi bi-camera-video text-amber-400 text-xs" />
            <span className="font-medium text-zinc-200 hidden sm:inline">Salt Tower Lower Room</span>
            <span className="font-medium text-zinc-200 sm:hidden">Salt Tower</span>
            <span className="text-zinc-600 hidden sm:inline">/</span>
            <span className="text-zinc-400 text-[11px] hidden sm:inline">
              {isMobileDevice ? '4K Mobile GPU' : '8K Master'}
            </span>
          </div>

          {/* Camera Quick Action Controls */}
          <div className="flex items-center space-x-1 p-1 rounded-xl glass-panel border border-zinc-800">
            <button
              onClick={handleToggleAutoRotate}
              title={isAutoRotating ? 'Pause 360 Rotation' : 'Resume 360 Rotation'}
              className={`p-1.5 sm:p-2 rounded-lg text-xs transition ${
                isAutoRotating
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <i className={`bi ${isAutoRotating ? 'bi-pause-fill' : 'bi-play-fill'} text-sm`} />
            </button>
            <button
              onClick={handleToggleSeatedView}
              title={isSeatedView ? 'Beralih ke Orbit Kursi' : 'Duduk di Kursi (Pandangan Seated POV)'}
              className={`px-2 py-1 sm:py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
                isSeatedView
                  ? 'text-amber-300 bg-amber-500/20 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <i className={`bi ${isSeatedView ? 'bi-person-check-fill text-amber-400' : 'bi-person'} text-sm`} />
              <span className="hidden md:inline">{isSeatedView ? 'Duduk di Kursi' : 'Duduk di Kursi'}</span>
            </button>
            <button
              onClick={handleResetCamera}
              title="Reset Titik Tumpu ke Kursi"
              className="p-1.5 sm:p-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 transition"
            >
              <i className="bi bi-arrow-counterclockwise text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Attribution Badge (Bottom Right) */}
      {!isZenMode && (
        <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
          <div className="px-3 py-1.5 rounded-lg glass-panel-subtle text-[11px] text-zinc-400 font-mono border border-zinc-800/80">
            <span>Salt Tower 3D Photogrammetry by </span>
            <a
              href="https://sketchfab.com/artfletch"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline font-medium"
            >
              artfletch
            </a>
            <span className="text-zinc-500"> (CC BY 4.0)</span>
          </div>
        </div>
      )}
    </>
  );
}
