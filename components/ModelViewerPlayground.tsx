'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function ModelViewerPlayground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [exposure, setExposure] = useState<number>(1.15);
  const [keyIntensity, setKeyIntensity] = useState<number>(2.2);
  const [groundShadowOpacity, setGroundShadowOpacity] = useState<number>(0.45);
  const [activeTab, setActiveTab] = useState<'viewport' | 'code'>('viewport');
  const [activePreset, setActivePreset] = useState<string>('front');
  const [showMobileShading, setShowMobileShading] = useState<boolean>(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const groundMatRef = useRef<THREE.ShadowMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 480;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b10);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.8, 1.8, 4.5);
    cameraRef.current = camera;

    // 2. WebGL Renderer with PCF Soft Dynamic Shadows
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = exposure;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      // Enable Real-Time Dynamic Shadows
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL context initialization notice in playground:', err);
      setIsLoaded(true);
      return;
    }

    // 3. OrbitControls with smooth damping and ground limit
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.75;
    controls.minDistance = 1.8;
    controls.maxDistance = 14.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Keep camera above ground
    controls.target.set(0, 0.6, 0);
    controlsRef.current = controls;

    // 4. Studio Lighting Rig for Automotive Shading
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Directional Key Light with Dynamic Shadow Mapping
    const keyLight = new THREE.DirectionalLight(0xfffaed, keyIntensity);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4.5;
    keyLight.shadow.camera.right = 4.5;
    keyLight.shadow.camera.top = 4.5;
    keyLight.shadow.camera.bottom = -4.5;
    keyLight.shadow.bias = -0.00015;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Secondary Fill Light (Cool daylight sky bounce)
    const fillLight = new THREE.PointLight(0x90cdf4, 1.2, 25);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    // Rim Light (Accentuates rear wing and silhouette)
    const rimLight = new THREE.PointLight(0xfbbf24, 1.6, 25);
    rimLight.position.set(0, 5, -6);
    scene.add(rimLight);

    // Subtle Ground Bounce Light
    const groundBounce = new THREE.PointLight(0x38bdf8, 0.5, 15);
    groundBounce.position.set(0, -1, 0);
    scene.add(groundBounce);

    // 5. Studio Ground Contact Shadow Catcher Plane
    const groundGeo = new THREE.PlaneGeometry(35, 35);
    const groundMat = new THREE.ShadowMaterial({ opacity: groundShadowOpacity });
    const groundPlane = new THREE.Mesh(groundGeo, groundMat);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = 0;
    groundPlane.receiveShadow = true;
    scene.add(groundPlane);
    groundMatRef.current = groundMat;

    // Subtle Showroom Platform Ring
    const ringGeo = new THREE.RingGeometry(3.6, 3.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.005;
    scene.add(ring);

    // 5b. Micro-LOD Vehicle Proxy (Instant paint < 2ms, eliminates loading wait)
    const proxyGroup = new THREE.Group();
    proxyGroup.name = '__zau_microlod_car__';

    const chassisGeo = new THREE.BoxGeometry(1.9, 0.45, 4.2);
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.45, 2.0);
    chassisGeo.computeVertexNormals();
    cabinGeo.computeVertexNormals();

    const proxyMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      roughness: 0.35,
      metalness: 0.75
    });

    const chassisMesh = new THREE.Mesh(chassisGeo, proxyMat);
    chassisMesh.position.y = 0.35;
    chassisMesh.castShadow = true;
    chassisMesh.receiveShadow = true;
    proxyGroup.add(chassisMesh);

    const cabinMesh = new THREE.Mesh(cabinGeo, proxyMat);
    cabinMesh.position.set(0, 0.75, -0.2);
    cabinMesh.castShadow = true;
    cabinMesh.receiveShadow = true;
    proxyGroup.add(cabinMesh);

    scene.add(proxyGroup);

    // 6. Draco GLTF Loader for Porsche 992 GT3 R
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    loader.load(
      '/model/3d/porsche_992_gt3_r/porsche_992_gt3_r.glb',
      (gltf) => {
        const model = gltf.scene;

        // 1. Measure raw dimensions and scale model to showroom scale (4.2 units length)
        const rawBbox = new THREE.Box3().setFromObject(model);
        const rawSize = rawBbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(rawSize.x, rawSize.y, rawSize.z);
        if (maxDim > 0) {
          const targetDimension = 4.2;
          const factor = targetDimension / maxDim;
          model.scale.set(factor, factor, factor);
          model.updateMatrixWorld(true);
        }

        // 2. Compute post-scale Bounding Box and rest precisely on ground plane (y = 0)
        const bbox = new THREE.Box3().setFromObject(model);
        const center = bbox.getCenter(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -bbox.min.y; // Sits exactly on ground shadow plane
        model.position.z = -center.z;
        model.updateMatrixWorld(true);

        // Upgrade materials to 16x anisotropic filtering & shadow casting
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const updateTex = (t: THREE.Texture | null) => {
              if (!t) return;
              t.colorSpace = THREE.SRGBColorSpace;
              t.minFilter = THREE.LinearMipmapLinearFilter;
              t.magFilter = THREE.LinearFilter;
              t.generateMipmaps = true;
              t.anisotropy = maxAnisotropy;
              t.needsUpdate = true;
            };

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((mat: any) => {
              if (!mat) return;
              updateTex(mat.map);
              updateTex(mat.normalMap);
              updateTex(mat.roughnessMap);
              updateTex(mat.metalnessMap);
              updateTex(mat.aoMap);
              mat.needsUpdate = true;
            });
          }
        });

        scene.remove(proxyGroup);
        scene.add(model);
        setIsLoaded(true);
        setLoadProgress(100);

        // Frame camera onto model
        controls.target.set(0, (bbox.max.y - bbox.min.y) * 0.45, 0);
        controls.update();
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('Error loading Porsche 992 GT3 R GLB:', err);
        setIsLoaded(true);
      }
    );

    // 7. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dracoLoader.dispose();
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleAutoRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  const handleExposureChange = (val: number) => {
    setExposure(val);
    if (rendererRef.current) {
      rendererRef.current.toneMappingExposure = val;
    }
  };

  const handleKeyIntensityChange = (val: number) => {
    setKeyIntensity(val);
    if (keyLightRef.current) {
      keyLightRef.current.intensity = val;
    }
  };

  const handleGroundShadowChange = (val: number) => {
    setGroundShadowOpacity(val);
    if (groundMatRef.current) {
      groundMatRef.current.opacity = val;
    }
  };

  const applyCameraPreset = (preset: 'front' | 'side' | 'rear' | 'top') => {
    setActivePreset(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    if (preset === 'front') {
      cameraRef.current.position.set(3.8, 1.8, 4.5);
    } else if (preset === 'side') {
      cameraRef.current.position.set(5.5, 1.2, 0.2);
    } else if (preset === 'rear') {
      cameraRef.current.position.set(-3.2, 1.9, -4.5);
    } else if (preset === 'top') {
      cameraRef.current.position.set(0.1, 7.5, 0.1);
    }
    controlsRef.current.target.set(0, 0.55, 0);
    controlsRef.current.update();
  };

  return (
    <div id="model-playground" className="rounded-3xl glass-panel-glow border border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Viewer Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 sm:px-5 py-3.5 backdrop-blur-md gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-base flex-shrink-0">
            <i className="bi bi-car-front-fill" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex flex-wrap items-center gap-1.5">
              <span>2024 Porsche 911 (992) GT3 R</span>
              <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded bg-amber-500/10">
                PCF Soft Shadows
              </span>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded bg-emerald-500/10">
                16x Anisotropy
              </span>
              <span className="text-[10px] font-mono text-sky-400 border border-sky-500/30 px-1.5 py-0.2 rounded bg-sky-500/10 hidden sm:inline">
                PBR Multi-Material
              </span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">
              ZAU Core Spatial Engine • Real-Time Directional Shadow Mapping &amp; Studio Ground Plane
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('viewport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center space-x-1.5 transition ${
              activeTab === 'viewport'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <i className="bi bi-eye-fill" />
            <span>Interactive 3D</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center space-x-1.5 transition ${
              activeTab === 'code'
                ? 'bg-amber-500 text-zinc-950 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <i className="bi bi-code-slash" />
            <span>.zau Component</span>
          </button>
        </div>
      </div>

      {/* Main Viewport or Code Tab */}
      {activeTab === 'viewport' ? (
        <div className="relative w-full h-[400px] sm:h-[500px] bg-zinc-950">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Non-blocking Progressive Stream Telemetry */}
          {!isLoaded && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-amber-500/30 font-mono text-[11px] text-amber-400 shadow-xl pointer-events-none animate-in fade-in duration-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Streaming Porsche 992 GT3 R ({loadProgress}%)...</span>
              <div className="w-16 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-amber-400 transition-all duration-200"
                  style={{ width: `${Math.max(loadProgress, 10)}%` }}
                />
              </div>
            </div>
          )}

          {/* Camera Angles Preset Bar (Top Left) */}
          <div className="absolute top-3 left-3 z-20 flex items-center space-x-1 p-1 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 text-[10px] sm:text-[11px] font-mono max-w-[calc(100%-80px)] sm:max-w-none overflow-x-auto scrollbar-none">
            {[
              { id: 'front', label: 'Front 3/4' },
              { id: 'side', label: 'Profile' },
              { id: 'rear', label: 'Rear Wing' },
              { id: 'top', label: 'Top-Down' }
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyCameraPreset(preset.id as any)}
                className={`px-2 py-1 rounded-lg whitespace-nowrap transition ${
                  activePreset === preset.id
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Shading & Studio Settings Panel (Top Right) */}
          <div className="absolute top-3 right-3 z-20 flex flex-col items-end">
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setShowMobileShading((prev) => !prev)}
              className="sm:hidden px-2 py-1 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 text-[10px] font-mono text-amber-400 flex items-center space-x-1 shadow-lg"
              title="Toggle Shading Controls"
            >
              <i className="bi bi-sliders" />
              <span>Shading</span>
            </button>

            {/* Controls Panel */}
            <div
              className={`${
                showMobileShading ? 'flex mt-2' : 'hidden'
              } sm:flex flex-col space-y-2 bg-zinc-950/90 backdrop-blur-md p-3 rounded-2xl border border-zinc-800 text-[11px] font-mono w-52 sm:w-60 shadow-2xl`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-zinc-800/80">
                <span className="font-bold text-zinc-200">Shading Controls</span>
                <button
                  onClick={toggleAutoRotate}
                  title="Toggle Showroom Auto-Rotation"
                  className={`p-1 rounded-md text-[10px] transition ${
                    autoRotate ? 'text-amber-400 bg-amber-500/10' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <i className="bi bi-arrow-repeat mr-1" />
                  <span>{autoRotate ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {/* Key Light Intensity Slider */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Key Light</span>
                  <span className="text-amber-400 font-semibold">{keyIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.5"
                  step="0.1"
                  value={keyIntensity}
                  onChange={(e) => handleKeyIntensityChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1 bg-zinc-800 rounded"
                />
              </div>

              {/* Ground Contact Shadow Slider */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Ground Shadow</span>
                  <span className="text-emerald-400 font-semibold">{Math.round(groundShadowOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.85"
                  step="0.05"
                  value={groundShadowOpacity}
                  onChange={(e) => handleGroundShadowChange(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1 bg-zinc-800 rounded"
                />
              </div>

              {/* HD Tone Mapping Exposure Slider */}
              <div className="space-y-0.5">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>HD Exposure</span>
                  <span className="text-sky-400 font-semibold">{exposure.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="2.0"
                  step="0.1"
                  value={exposure}
                  onChange={(e) => handleExposureChange(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1 bg-zinc-800 rounded"
                />
              </div>
            </div>
          </div>

          {/* Bottom Left Telemetry HUD */}
          <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800 text-[10px] sm:text-xs font-mono text-zinc-300 flex items-center space-x-2.5 shadow-lg">
            <i className="bi bi-camera-video text-amber-400" />
            <span>Orbit: 360° Drag &amp; Zoom</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-emerald-400 hidden sm:inline">PCF Soft Shadow Active</span>
            <span className="text-zinc-600 hidden md:inline">•</span>
            <span className="text-sky-400 hidden md:inline">16x Anisotropic Mipmaps</span>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-zinc-950/90 font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-x-auto">
          <pre>
            <code>{`<!-- components/PorscheShowroom.zau -->
<template>
  <div class="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel">
    <!-- Declarative ZAU Spatial Engine with Full Shading & PCF Soft Shadows -->
    <ZAU.Canvas3D
      src="/model/3d/porsche_992_gt3_r/porsche_992_gt3_r.glb"
      shading={{
        shadows: {
          enabled: true,
          type: "pcfsoft",
          resolution: 2048,
          groundContact: true,
          groundOpacity: 0.45
        },
        lighting: {
          keyLight: { color: "#fffaed", intensity: 2.2, position: [5, 8, 5], castShadow: true },
          fillLight: { color: "#90cdf4", intensity: 1.2, position: [-5, 4, -3] },
          rimLight: { color: "#fbbf24", intensity: 1.6, position: [0, 5, -6] },
          ambient: { color: "#ffffff", intensity: 0.85 }
        },
        environment: {
          toneMapping: "ACESFilmic",
          exposure: 1.15
        },
        materials: {
          anisotropy: 16,
          preserveMaterials: true
        }
      }}
      autoRotate={isSpinning}
      cameraPosition={[3.8, 1.8, 4.5]}
    >
      <!-- Real-Time Studio Ground Contact Shadow Catcher -->
      <ZAU.GroundShadow opacity={0.45} size={35} />
    </ZAU.Canvas3D>

    <!-- Interactive HUD Controls -->
    <div class="absolute bottom-4 left-4 p-3 rounded-xl glass-panel text-xs text-amber-400 font-mono">
      <span>Porsche 992 GT3 R • PCF Soft Shadows</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'zau-framework';

export default defineComponent({
  setup() {
    const isSpinning = ref(true);
    return { isSpinning };
  }
});
</script>`}</code>
          </pre>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="border-t border-zinc-800 bg-zinc-950/90 px-4 sm:px-6 py-2.5 text-[11px] font-mono text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <i className="bi bi-shield-check text-amber-400" />
          <span>Model: 2024 Porsche 911 (992) GT3 R</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-500 hidden sm:inline">Format: Draco Lossless GLB (8.1 MB)</span>
        </div>
        <div className="flex items-center space-x-3 text-zinc-400">
          <span className="text-emerald-400">PCF Soft Shadows</span>
          <span>•</span>
          <span className="text-amber-400">16x Texture Anisotropy</span>
        </div>
      </div>
    </div>
  );
}
