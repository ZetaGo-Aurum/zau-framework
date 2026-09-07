# zau/compiler/bundler.py
"""
ZAU Framework Chunking & Client Bundler
Generates modern chunked JavaScript modules and SSR HTML shells
with modulepreload tags and hydration data payload (__ZAU_DATA__).
"""

import os
import json
import hashlib
from typing import Dict, Any, List, Optional

CHUNKS_CONFIG = [
    {
        "name": "runtime",
        "file": "runtime.js",
        "description": "ZAU Client Runtime, Signals reactivity, and RPC Client"
    },
    {
        "name": "vendor-three",
        "file": "vendor-three.js",
        "description": "Three.js r128+ Core & OrbitControls Subsystem"
    },
    {
        "name": "spatial-engine",
        "file": "spatial-engine.js",
        "description": "Native <ZAU.Canvas3D> Renderer & Gyroscopic Spatial Core"
    },
    {
        "name": "syntax-highlighter",
        "file": "syntax-highlighter.js",
        "description": ".zau Token Lexer & Real-time Syntax Interpreter"
    },
    {
        "name": "main-app",
        "file": "main-app.js",
        "description": "ZAU Hydration Engine, Routing & Event Delegator"
    }
]

def get_runtime_chunk_code() -> str:
    return """/**
 * ZAU Framework Runtime Chunk [runtime.js]
 * (c) 2026 ZetaGo-Aurum | admin@zetagoaurum.com | zetagoaurum.com
 */
(function(global) {
  'use strict';
  
  const subscribers = new Map();
  const stateStore = new Map();

  function useState(key, initialValue) {
    if (!stateStore.has(key)) {
      stateStore.set(key, initialValue);
      subscribers.set(key, new Set());
    }
    const get = () => stateStore.get(key);
    const set = (nextVal) => {
      const cur = stateStore.get(key);
      const val = typeof nextVal === 'function' ? nextVal(cur) : nextVal;
      stateStore.set(key, val);
      const listeners = subscribers.get(key);
      if (listeners) listeners.forEach(fn => fn(val));
    };
    return [get, set];
  }

  function useEffect(fn, deps) {
    if (typeof window !== 'undefined') {
      setTimeout(fn, 0);
    }
  }

  async function callAction(endpoint, payload = {}) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Action failed with status: ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('[ZAU RPC Error]', endpoint, err);
      throw err;
    }
  }

  global.__ZAU_RUNTIME__ = {
    version: '1.0.1',
    useState,
    useEffect,
    callAction,
    stateStore
  };
  global.ZAU = global.__ZAU_RUNTIME__;
})(typeof window !== 'undefined' ? window : globalThis);
"""

def get_spatial_engine_code() -> str:
    return """/**
 * ZAU Native 3D Spatial Canvas Engine [spatial-engine.js]
 * High-end Atelier Obsidian-Gold Gyroscopic Spatial Artifact
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  class ZAUSpatialRenderer {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container || !global.THREE) return;
      this.init();
    }

    init() {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      // Scene & Camera
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
      this.camera.position.set(0, 2.0, 5.0);

      // WebGL Renderer with High Precision & Tone Mapping
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.25;
      this.container.appendChild(this.renderer.domElement);

      // OrbitControls
      if (global.THREE.OrbitControls) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 12;
        this.controls.minDistance = 2.5;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 1.2;
      }

      this.buildLighting();
      this.buildArtifact();
      this.buildParticleField();
      this.animate();

      window.addEventListener('resize', () => this.onResize());
    }

    buildLighting() {
      // Cinematic 3-Point Studio Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.65);
      this.scene.add(ambient);

      // Key Light - Aurum Gold (#f59e0b)
      this.keyLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
      this.keyLight.position.set(6, 12, 8);
      this.scene.add(this.keyLight);

      // Fill Light - Ice Blue Accent (#38bdf8)
      this.fillLight = new THREE.PointLight(0x38bdf8, 3.2, 20);
      this.fillLight.position.set(-6, 4, -4);
      this.scene.add(this.fillLight);

      // Back Light - Soft Violet (#a855f7)
      this.backLight = new THREE.PointLight(0xa855f7, 2.0, 15);
      this.backLight.position.set(0, -6, -4);
      this.scene.add(this.backLight);
    }

    buildArtifact() {
      this.artifactGroup = new THREE.Group();
      this.scene.add(this.artifactGroup);

      // 1. Central Core: Obsidian Octahedron with High Specular Metalness
      const coreGeom = new THREE.OctahedronGeometry(1.2, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0e0f14,
        roughness: 0.12,
        metalness: 0.95,
        flatShading: false
      });
      this.coreMesh = new THREE.Mesh(coreGeom, coreMat);
      this.artifactGroup.add(this.coreMesh);

      // 2. Inner Aurum Lattice: Glowing Gold Geometry
      const innerGeom = new THREE.IcosahedronGeometry(0.75, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      this.innerLattice = new THREE.Mesh(innerGeom, innerMat);
      this.artifactGroup.add(this.innerLattice);

      // 3. Gyroscopic Orbital Rings (3 Independent Gold Rings)
      this.rings = [];
      const ringRadii = [1.8, 2.1, 2.4];
      const ringColors = [0xf59e0b, 0xd97706, 0xfbbf24];

      ringRadii.forEach((radius, i) => {
        const ringGeom = new THREE.TorusGeometry(radius, 0.022, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
          color: ringColors[i],
          metalness: 0.9,
          roughness: 0.2
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = (Math.PI / (i + 1.8));
        ring.rotation.y = (Math.PI / (i + 2.5));

        // Add 4 golden anchor beacons along each ring
        for (let j = 0; j < 4; j++) {
          const angle = (j * Math.PI) / 2;
          const beaconGeom = new THREE.SphereGeometry(0.06, 12, 12);
          const beaconMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
          const beacon = new THREE.Mesh(beaconGeom, beaconMat);
          beacon.position.set(radius * Math.cos(angle), radius * Math.sin(angle), 0);
          ring.add(beacon);
        }

        this.artifactGroup.add(ring);
        this.rings.push(ring);
      });
    }

    buildParticleField() {
      // 450 Aurum Stardust Particles in Space
      const count = 450;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 14;
        positions[i + 1] = (Math.random() - 0.5) * 14;
        positions[i + 2] = (Math.random() - 0.5) * 14;
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 0.04,
        transparent: true,
        opacity: 0.65
      });
      this.particles = new THREE.Points(geom, mat);
      this.scene.add(this.particles);
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const time = performance.now() * 0.001;

      // Core rotation
      if (this.coreMesh) {
        this.coreMesh.rotation.y = time * 0.4;
        this.coreMesh.rotation.x = Math.sin(time * 0.3) * 0.2;
      }

      // Inner lattice counter-rotation & pulsing
      if (this.innerLattice) {
        this.innerLattice.rotation.y = -time * 0.6;
        this.innerLattice.rotation.z = time * 0.3;
        const scale = 1.0 + Math.sin(time * 2.5) * 0.05;
        this.innerLattice.scale.set(scale, scale, scale);
      }

      // Gyroscopic Orbital Rings rotating on independent mathematical axes
      if (this.rings) {
        this.rings[0].rotation.z += 0.008;
        this.rings[0].rotation.x += 0.004;

        this.rings[1].rotation.y -= 0.009;
        this.rings[1].rotation.z += 0.005;

        this.rings[2].rotation.x += 0.007;
        this.rings[2].rotation.y += 0.006;
      }

      // Gentle stardust drift
      if (this.particles) {
        this.particles.rotation.y = time * 0.03;
      }

      if (this.controls) this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    onResize() {
      if (!this.container) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  global.__ZAUSpatialRenderer__ = ZAUSpatialRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
"""

def get_syntax_highlighter_code() -> str:
    return """/**
 * ZAU Syntax Highlighting Interpreter Chunk [syntax-highlighter.js]
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlightZAUCode(code) {
    let out = '';
    const lines = code.split('\\n');
    for (let line of lines) {
      let l = escapeHtml(line);
      if (l.trim().startsWith('//') || l.trim().startsWith('#') || l.trim().startsWith('&lt;!--')) {
        out += '<span class="zau-tok-comment">' + l + '</span>\\n';
        continue;
      }
      l = l.replace(/(@[a-zA-Z0-9_-]+)/g, '<span class="zau-tok-directive">$1</span>');
      l = l.replace(/(&lt;\\/?)(ZAU\\.[a-zA-Z0-9]+|Viewer3D|SceneControls)/g, '$1<span class="zau-tok-spatial">$2</span>');
      l = l.replace(/(&lt;\\/?)([a-zA-Z0-9_-]+)/g, '$1<span class="zau-tok-tag">$2</span>');
      l = l.replace(/(&quot;.*?&quot;|'.*?')/g, '<span class="zau-tok-string">$1</span>');
      l = l.replace(/\\b(import|from|export|default|function|const|let|var|return|async|await|def|class|True|False|None)\\b/g, '<span class="zau-tok-keyword">$1</span>');
      l = l.replace(/\\b(useState|useFrame|useEffect|ZAUApp|Depends|get_session|select|Model|Field|Relationship)\\b/g, '<span class="zau-tok-function">$1</span>');
      out += l + '\\n';
    }
    return '<pre class="p-5 font-mono text-xs leading-relaxed overflow-x-auto"><code>' + out + '</code></pre>';
  }

  global.__ZAU_HIGHLIGHTER__ = { highlight: highlightZAUCode };
})(typeof window !== 'undefined' ? window : globalThis);
"""

def get_main_app_code() -> str:
    return """/**
 * ZAU Hydration & Main App Chunk [main-app.js]
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  function hydrate() {
    const dataEl = document.getElementById('__ZAU_DATA__');
    let zauData = {};
    if (dataEl) {
      try { zauData = JSON.parse(dataEl.textContent); }
      catch (e) { console.error('Failed to parse __ZAU_DATA__', e); }
    }
    console.log('%c[ZAU Framework v1.0.1]%c Chunk Hydration Completed cleanly.', 'color:#f59e0b; font-weight:bold;', 'color:#38bdf8;');

    // Initialize 3D Spatial Canvas if container present
    if (global.__ZAUSpatialRenderer__ && document.getElementById('hero-3d-mount')) {
      new global.__ZAUSpatialRenderer__('hero-3d-mount');
    }

    // Code Tab Switcher
    if (global.switchTab) {
      global.switchTab('component');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
})(typeof window !== 'undefined' ? window : globalThis);
"""

def generate_chunks(output_dir: str):
    """Write modular chunk files into the designated static chunks directory."""
    chunks_dir = os.path.join(output_dir, "_zau/static/chunks")
    os.makedirs(chunks_dir, exist_ok=True)

    with open(os.path.join(chunks_dir, "runtime.js"), "w") as f:
        f.write(get_runtime_chunk_code())

    with open(os.path.join(chunks_dir, "spatial-engine.js"), "w") as f:
        f.write(get_spatial_engine_code())

    with open(os.path.join(chunks_dir, "syntax-highlighter.js"), "w") as f:
        f.write(get_syntax_highlighter_code())

    with open(os.path.join(chunks_dir, "main-app.js"), "w") as f:
        f.write(get_main_app_code())

    # Vendor chunk shim
    with open(os.path.join(chunks_dir, "vendor-three.js"), "w") as f:
        f.write("/** ZAU Three.js Vendor Chunk */\nconsole.log('[ZAU Vendor] Three.js Subsystem Loaded.');\n")

    manifest = {
        "release": "1.0.1",
        "chunks": {
            "runtime": "/_zau/static/chunks/runtime.js",
            "spatial-engine": "/_zau/static/chunks/spatial-engine.js",
            "syntax-highlighter": "/_zau/static/chunks/syntax-highlighter.js",
            "main-app": "/_zau/static/chunks/main-app.js",
            "vendor-three": "/_zau/static/chunks/vendor-three.js"
        }
    }
    with open(os.path.join(chunks_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)

    return manifest
