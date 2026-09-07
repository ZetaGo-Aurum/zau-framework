# zau-framework

<div align="center">

### Core Client Runtime & Native 3D Spatial Canvas for ZAU Framework
**Signals Reactivity &middot; Three.js r160 Spatial Canvas &middot; Server Actions RPC &middot; Draco Mesh Pipeline**

<p align="center">
  <a href="https://www.npmjs.com/package/zau-framework"><img src="https://img.shields.io/npm/v/zau-framework.svg?color=f59e0b&label=zau-framework&logo=npm" alt="NPM Version" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <a href="https://zetagoaurum.com">Web Atelier: zetagoaurum.com</a> &middot;
  <a href="https://zau-framework.vercel.app">Dokumentasi Live: zau-framework.vercel.app</a> &middot;
  <a href="mailto:admin@zetagoaurum.com">Kontak: admin@zetagoaurum.com</a>
</p>

</div>

---

## 📦 Pemasangan / Installation

Pasang paket runtime inti ke dalam project Anda:

```bash
# Menggunakan npm
npm install zau-framework three

# Menggunakan pnpm
pnpm add zau-framework three

# Menggunakan yarn
yarn add zau-framework three

# Menggunakan bun
bun add zau-framework three
```

---

## ⚡ Fitur Utama

- **Signals-based Micro-Reactivity**: Sistem state reaktif `useState` dan `useEffect` ultra-ringan dengan nol dependensi eksternal.
- **Native 3D Spatial Canvas**: Integrasi Three.js r160 WebGL dengan pipeline kompresi Draco, bayangan realistik, dan kontrol orbit interaktif.
- **Dual-Tier Progressive LOD**: Rendering kilat Frame 0 menggunakan mesh terkompresi (~664 KB) yang bertransisi mulus ke tekstur 4K/8K resolusi tinggi di background.
- **Server Actions RPC Client**: Pemanggilan fungsi serverless backend Python ASGI secara langsung melalui fungsi `callAction()`.
- **High-FPS Animation Loop**: Hook `useFrame()` native 60fps/120fps dengan kalkulasi delta-time presisi tinggi untuk animasi objek 3D.

---

## 🚀 Panduan Penggunaan / Quickstart

### 1. Memanggil Server Action Python Backend

```typescript
import { callAction } from 'zau-framework';

// Panggil RPC endpoint pada Python ASGI Core
async function createProject() {
  try {
    const result = await callAction('/api/projects/create', {
      title: 'Monolith 3D Gallery',
      category: 'Architecture'
    });
    console.log('Project created successfully:', result);
  } catch (error) {
    console.error('Server Action failed:', error);
  }
}
```

### 2. State Reaktif & Hook Animasi 3D

```typescript
import { useState, useFrame, useEffect } from 'zau-framework';

export function useModelRotation(initialSpeed = 1.0) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Hook siklus frame 60FPS / 120FPS
  useFrame((state, delta) => {
    if (!isHovered()) {
      setRotation(prev => ({
        ...prev,
        y: prev.y + delta * initialSpeed
      }));
    }
  });

  return { rotation, setRotation, isHovered, setIsHovered };
}
```

### 3. Progressive 3D HighPoly Mesh Pipeline

```typescript
import { HighPolyMeshPipeline } from 'zau-framework';

const pipeline = new HighPolyMeshPipeline({
  streamTextures: true,
  smoothNormals: true,
  onProgress: (ratio) => console.log(`Progress muat model: ${Math.round(ratio * 100)}%`)
});

// Stream dan load model 3D
pipeline.load('/model/3d/salt_tower_lower_room.glb').then(scene => {
  console.log('3D Scene siap ditampilkan:', scene);
});
```

---

## 🛠️ API Reference

### Signals & Lifecycle
- `useState<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void]`  
  Membuat reaktif getter dan setter.
- `useEffect(callback: () => void | (() => void), deps?: any[]): void`  
  Mengeksekusi efek samping dan mendaftarkan fungsi pembersih (*cleanup*).
- `useFrame(callback: (state: any, delta: number) => void): void`  
  Mendaftarkan callback render loop `requestAnimationFrame` dengan delta waktu dalam detik.

### Server Actions
- `callAction<T = any>(endpoint: string, payload?: Record<string, any>): Promise<T>`  
  Mengirim request HTTP POST JSON berkecepatan tinggi ke backend ASGI ZAU.

### Spatial Engine
- `ZAUSpatialEngine`: Driver inti WebGL, kamera, rendering, dan scene graph.
- `HighPolyMeshPipeline`: Pipeline pemroses aset 3D resolusi tinggi dengan streaming PBR textures dan smoothing normal.
- `DEFAULT_SHADING_CONFIG`: Konfigurasi bayangan dan pencahayaan studio bawaan.

---

## 🌐 Tutorial Deploy Cepat (Vercel)

1. Buat file `vercel.json`:
```json
{
  "framework": "nextjs",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/__zau/(.*)", "destination": "/api/index.py" }
  ]
}
```
2. Jalankan:
```bash
npx vercel --prod --yes
```

---

## ⚖️ Lisensi & Arsitek

- **Arsitek Utama**: **ZetaGo-Aurum**
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Kontak**: `admin@zetagoaurum.com`
- **Lisensi**: MIT License
