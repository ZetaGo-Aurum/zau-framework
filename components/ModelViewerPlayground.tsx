'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ModelViewerPlayground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [exposure, setExposure] = useState(1.2);
  const [activeTab, setActiveTab] = useState<'viewport' | 'code'>('viewport');
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (customElements.get('model-viewer')) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  const toggleAutoRotate = () => {
    setAutoRotate((prev) => !prev);
    if (viewerRef.current) {
      if (!autoRotate) {
        viewerRef.current.setAttribute('auto-rotate', '');
      } else {
        viewerRef.current.removeAttribute('auto-rotate');
      }
    }
  };

  const handleExposureChange = (val: number) => {
    setExposure(val);
    if (viewerRef.current) {
      viewerRef.current.setAttribute('exposure', val.toString());
    }
  };

  return (
    <div className="rounded-3xl glass-panel-glow border border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Viewer Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-5 py-3.5 backdrop-blur-md gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-sm">
            <i className="bi bi-box" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>ZAU Open-Source 3D Model Engine</span>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded bg-emerald-500/10">
                1M High-Poly
              </span>
              <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded bg-amber-500/10">
                WebGL PBR
              </span>
            </h4>
            <p className="text-[11px] text-zinc-400 font-mono">
              1,000,000 Triangles • Smooth Vertex Normals • Instant Progressive Draco Stream
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
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
        <div className="relative w-full h-[460px] bg-zinc-950">
          {/* Controls Overlay (Top Right) */}
          <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 bg-zinc-950/80 backdrop-blur-md p-2 rounded-xl border border-zinc-800 text-xs font-mono">
            <button
              onClick={toggleAutoRotate}
              className={`px-2.5 py-1.5 rounded-lg flex items-center space-x-2 transition ${
                autoRotate
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-white bg-zinc-900'
              }`}
            >
              <i className="bi bi-arrow-repeat" />
              <span>{autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}</span>
            </button>

            <div className="px-2 py-1 space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>HD Exposure</span>
                <span className="text-amber-400 font-bold">{exposure.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="2.2"
                step="0.1"
                value={exposure}
                onChange={(e) => handleExposureChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
              />
            </div>
          </div>

          {/* Bottom Left Telemetry HUD */}
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center space-x-2.5 shadow-lg">
            <i className="bi bi-camera-video text-amber-400" />
            <span>Orbit: Click &amp; Drag 360°</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400">PBR Double-Sided</span>
          </div>

          {/* Model Viewer Web Component */}
          {isLoaded ? (
            React.createElement(
              'model-viewer',
              {
                ref: viewerRef,
                src: '/model/3d/the_great_drawing_room/room_web.glb',
                'camera-controls': '',
                'auto-rotate': autoRotate ? '' : undefined,
                'rotation-per-second': '18deg',
                'shadow-intensity': '1',
                exposure: exposure.toString(),
                'touch-action': 'pan-y',
                style: { width: '100%', height: '100%', backgroundColor: '#090a0f' },
                alt: 'The Great Drawing Room 3D Interior',
              },
              <div
                slot="poster"
                className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 font-mono text-xs text-amber-400 space-y-2"
              >
                <i className="bi bi-box text-3xl animate-bounce text-amber-400" />
                <span>Initializing 3D Engine &amp; 4K Texture...</span>
              </div>
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 font-mono text-xs text-amber-400 space-y-2">
              <i className="bi bi-cpu text-2xl animate-spin text-amber-400" />
              <span>Mounting Open-Source 3D Engine...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 bg-zinc-950/90 font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-x-auto">
          <pre>
            <code>{`<!-- components/SpatialInterior.zau -->
<template>
  <div class="relative w-full h-[500px] rounded-2xl overflow-hidden">
    <!-- Declarative ZAU High-Poly Spatial Engine -->
    <ZAU.ModelViewer
      src="model/3d/the_great_drawing_room/room_web.glb"
      poly-standard="high"
      smooth-normals="true"
      streaming="progressive"
      instant-proxy="true"
      draco-decoder="wasm-worker"
      pbr-material="double-sided"
      exposure="1.2"
      tone-mapping="aces-filmic"
      shadow-intensity="1.0"
      @load="onModelReady"
      @cameraChange="onCameraMoved"
    />

    <!-- Live High-Poly Telemetry Layer -->
    <div class="absolute bottom-4 left-4 p-2 bg-black/60 rounded text-xs font-mono">
      <span class="text-emerald-400">1M High-Poly Standard:</span> Smooth Normals Active
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    onModelReady(event: CustomEvent) {
      console.log('1M High-Poly Mesh & 4K Texture Mounted Successfully');
    },
    onCameraMoved(event: CustomEvent) {
      // Stream camera rotation vectors to spatial audio bus
    }
  }
}
</script>`}</code>
          </pre>
        </div>
      )}

      {/* Footer Info Strip */}
      <div className="px-5 py-2.5 bg-zinc-950 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 gap-2">
        <div className="flex items-center space-x-2">
          <i className="bi bi-shield-check text-amber-400" />
          <span>CC BY 4.0 Photogrammetry • The Hallwyl Museum (Stockholm)</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>Format: Standalone Binary GLB</span>
          <span className="text-zinc-600">•</span>
          <span className="text-emerald-400">11 MB • 1,000,000 Triangles</span>
        </div>
      </div>
    </div>
  );
}
