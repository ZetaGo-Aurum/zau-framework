# zau-framework

<div align="center">

```
  ███████╗ █████╗ ██╗   ██╗
  ╚══███╔╝██╔══██╗██║   ██║
    ███╔╝ ███████║██║   ██║
   ███╔╝  ██╔══██║██║   ██║
  ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ 
```

### Core Client Runtime & Native 3D Spatial Canvas for ZAU Framework
**Signals Reactivity &middot; Three.js r160 Spatial Canvas &middot; Server Actions RPC &middot; Progressive Draco LOD**

<p align="center">
  <a href="https://www.npmjs.com/package/zau-framework"><img src="https://img.shields.io/npm/v/zau-framework.svg?color=f59e0b&label=zau-framework&logo=npm" alt="NPM Version" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zau-framework.vercel.app"><img src="https://img.shields.io/badge/live-docs-black.svg?logo=vercel" alt="Live Documentation" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <a href="#installation">Installation</a> &bull;
  <a href="#core-features">Features</a> &bull;
  <a href="#quickstart">Quickstart</a> &bull;
  <a href="#api-reference">API Reference</a> &bull;
  <a href="#deployment">Deployment</a> &bull;
  <a href="#-bahasa-indonesia">Bahasa Indonesia</a>
</p>

<p align="center">
  <strong>Official Atelier:</strong> <a href="https://zetagoaurum.com">zetagoaurum.com</a> &middot;
  <strong>Documentation:</strong> <a href="https://zau-framework.vercel.app">zau-framework.vercel.app</a> &middot;
  <strong>Contact:</strong> <a href="mailto:admin@zetagoaurum.com">admin@zetagoaurum.com</a>
</p>

</div>

---

## Installation

Install the core client runtime and peer dependencies:

```bash
# Using npm
npm install zau-framework three

# Using pnpm
pnpm add zau-framework three

# Using yarn
yarn add zau-framework three

# Using bun
bun add zau-framework three
```

---

## Core Features

- **Fine-Grained Signals Reactivity**: Ultra-lightweight reactive primitives (`useState`, `useEffect`) with zero external runtime overhead.
- **Native 3D Spatial Canvas**: Direct Three.js r160 integration featuring Draco mesh decompression, realistic PBR shading, and interactive orbital controls.
- **Dual-Tier Progressive LOD**: Fast initial render (Frame 0 Draco mesh <700 KB) followed by seamless background texture and buffer hydration without frame drops.
- **Python ASGI Server Actions**: Type-safe client-to-server RPC execution through `callAction()` targeting backend Python handlers.
- **Synchronized Animation Loop**: Native 60fps/120fps `useFrame()` hook with microsecond delta-time precision for spatial and physics simulations.

---

## Quickstart

### 1. Invoking Python ASGI Server Actions

```typescript
import { callAction } from 'zau-framework';

interface CreateProjectPayload {
  title: string;
  category: string;
}

interface ProjectResponse {
  id: number;
  status: string;
}

// Executes an RPC endpoint directly against the Python ASGI kernel
async function submitProject() {
  try {
    const data = await callAction<ProjectResponse>('/api/projects/create', {
      title: 'Spatial Architecture Laboratory',
      category: 'Visualization'
    });
    console.log('Project created:', data.id);
  } catch (error) {
    console.error('Server action failed:', error);
  }
}
```

### 2. Reactive State & Spatial Animation Loop

```typescript
import { useState, useFrame, useEffect } from 'zau-framework';

export function useSpatialRotation(speed = 1.0) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isPaused, setIsPaused] = useState(false);

  // Synchronized render loop hook
  useFrame((state, delta) => {
    if (!isPaused()) {
      setRotation(prev => ({
        ...prev,
        y: prev.y + delta * speed
      }));
    }
  });

  return { rotation, setRotation, isPaused, setIsPaused };
}
```

### 3. High-Poly Progressive LOD Pipeline

```typescript
import { HighPolyMeshPipeline } from 'zau-framework';

const pipeline = new HighPolyMeshPipeline({
  streamTextures: true,
  smoothNormals: true,
  onProgress: (ratio) => {
    console.log(`Loading 3D asset: ${Math.round(ratio * 100)}%`);
  }
});

// Stream and hydrate GLTF/GLB model
pipeline.load('/model/3d/salt_tower_lower_room.glb').then(scene => {
  console.log('3D Scene ready for display:', scene);
});
```

---

## API Reference

### Signals & Component Hooks
- `useState<T>(initialValue: T): [() => T, (val: T | ((prev: T) => T)) => void]`  
  Creates a reactive getter and setter pair.
- `useEffect(callback: () => void | (() => void), deps?: any[]): void`  
  Registers a side effect with optional cleanup callback.
- `useFrame(callback: (state: any, delta: number) => void): void`  
  Binds a function to the browser's `requestAnimationFrame` loop with elapsed delta time in seconds.

### Server Actions Client
- `callAction<T = any>(endpoint: string, payload?: Record<string, any>): Promise<T>`  
  Dispatches an asynchronous POST RPC request to the Python ASGI backend.

### Spatial Engine
- `ZAUSpatialEngine`: Primary controller for WebGL context, camera frustum, shadow maps, and scene rendering.
- `HighPolyMeshPipeline`: Loader pipeline supporting progressive texture streaming, Draco geometry, and normal recomputation.
- `DEFAULT_SHADING_CONFIG`: Default studio lighting and shadow configuration presets.

---

## Deployment

Deploying a ZAU fullstack project is zero-configuration:

### Vercel (Edge Frontend + Serverless Python ASGI)
Create `vercel.json` at your project root:
```json
{
  "framework": "nextjs",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/__zau/(.*)", "destination": "/api/index.py" }
  ]
}
```
Deploy via terminal:
```bash
npx vercel --prod --yes
```

---

## 🇮🇩 Bahasa Indonesia

### Ringkasan Pustaka
`zau-framework` adalah runtime klien resmi untuk **ZAU Framework (ZetaGo-Aurum Unified)**. Paket ini menyediakan reaktivitas Signals ultra-ringan, integrasi Three.js r160 WebGL 3D Spatial Canvas, klien Server Actions RPC untuk backend Python ASGI, serta pipeline kompresi Draco Progressive LOD.

### Pemasangan
```bash
npm install zau-framework three
```

### Penggunaan Dasar
```typescript
import { ZAU, useState, useFrame, callAction } from 'zau-framework';

// 1. Pemanggilan RPC ke Python ASGI backend
const response = await callAction('/api/orders/create', { productId: 101 });

// 2. State reaktif
const [count, setCount] = useState(0);

// 3. Render loop 60fps/120fps
useFrame((state, delta) => {
  // Update rotasi atau koordinat 3D
});
```

---

## License & Governance

- **Chief Architect**: **ZetaGo-Aurum**
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Contact**: `admin@zetagoaurum.com`
- **License**: MIT License
