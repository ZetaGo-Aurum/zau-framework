# ZAU Framework

<div align="center">

```
  ███████╗ █████╗ ██╗   ██╗
  ╚══███╔╝██╔══██╗██║   ██║
    ███╔╝ ███████║██║   ██║
   ███╔╝  ██╔══██║██║   ██║
  ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ 
```

### ZetaGo-Aurum Unified Fullstack Web Framework
**Python-First ASGI Core &middot; Native 3D Spatial Canvas &middot; Dual-Asset Engine &middot; .zau SFC**

<p align="center">
  <a href="https://www.npmjs.com/package/zau-framework"><img src="https://img.shields.io/npm/v/zau-framework.svg?color=f59e0b&label=zau-framework&logo=npm" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/create-zau"><img src="https://img.shields.io/npm/v/create-zau.svg?color=38bdf8&label=create-zau&logo=npm" alt="NPM CLI" /></a>
  <a href="https://pypi.org/project/zau-framework/"><img src="https://img.shields.io/badge/python-3.11%20%7C%203.12%20%7C%203.13-blue.svg?logo=python" alt="Python Versions" /></a>
  <a href="https://zau.zetagoaurum.com"><img src="https://img.shields.io/badge/live-zau.zetagoaurum.com-000000.svg?logo=vercel" alt="Vercel Deployment" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <a href="#-daftar-isi--table-of-contents">Daftar Isi</a> &bull;
  <a href="#-arsitektur-utama-rfc-001-specification">Arsitektur</a> &bull;
  <a href="#-tutorial-pemasangan-installation">Pemasangan</a> &bull;
  <a href="#-tutorial-pembuatan-project-project-creation">Pembuatan Project</a> &bull;
  <a href="#-tutorial-deploy-ke-production">Panduan Deploy</a> &bull;
  <a href="#-dukungan-multi-editor--lsp">Editor & LSP</a>
</p>

<p align="center">
  <strong>Web Atelier Resmi:</strong> <a href="https://zetagoaurum.com">zetagoaurum.com</a> &middot;
  <strong>Dokumentasi Live:</strong> <a href="https://zau.zetagoaurum.com">zau.zetagoaurum.com</a> &middot;
  <strong>Email Kontak:</strong> <a href="mailto:admin@zetagoaurum.com">admin@zetagoaurum.com</a>
</p>

</div>

---

## 📑 Daftar Isi / Table of Contents

- [1. Mengapa ZAU Framework? (Ringkasan Eksekutif)](#-mengapa-zau-framework-ringkasan-eksekutif)
- [2. Arsitektur Utama (RFC-001 Specification)](#-arsitektur-utama-rfc-001-specification)
  - [Topologi Dual-Tier ZAU](#topologi-dual-tier-zau)
  - [Matriks Desain Arsitektur](#matriks-desain-arsitektur)
- [3. Tutorial Pemasangan (Installation)](#-tutorial-pemasangan-installation)
  - [Persyaratan Sistem (Prerequisites)](#persyaratan-sistem-prerequisites)
  - [Metode 1: Menggunakan NPM / NPX (Rekomendasi Cepat)](#metode-1-menggunakan-npm--npx-rekomendasi-cepat)
  - [Metode 2: Menggunakan Python Pip & CLI](#metode-2-menggunakan-python-pip--cli)
  - [Verifikasi Instalasi](#verifikasi-instalasi)
- [4. Tutorial Pembuatan Project (Project Creation)](#-tutorial-pembuatan-project-project-creation)
  - [Langkah 1: Scaffolding Interaktif](#langkah-1-scaffolding-interaktif)
  - [Langkah 2: Memilih Template Resmi](#langkah-2-memilih-template-resmi)
  - [Langkah 3: Memahami Struktur Direktori Project](#langkah-3-memahami-struktur-direktori-project)
  - [Langkah 4: Menulis Komponen Pertama `.zau`](#langkah-4-menulis-komponen-pertama-zau)
  - [Langkah 5: Membuat Backend Server Action Python ASGI](#langkah-5-membuat-backend-server-action-python-asgi)
  - [Langkah 6: Database Async ORM & ZAU DB Studio](#langkah-6-database-async-orm--zau-db-studio)
  - [Langkah 7: Menjalankan Server Development](#langkah-7-menjalankan-server-development)
- [5. Native 3D Spatial Canvas](#-native-3d-spatial-canvas)
  - [Sintaks Primitif 3D](#sintaks-primitif-3d)
  - [Pipeline Progressive Level of Detail (LOD)](#pipeline-progressive-level-of-detail-lod)
  - [Kontrol Kamera & Orbit Clamping](#kontrol-kamera--orbit-clamping)
- [6. Tutorial Deploy ke Production](#-tutorial-deploy-ke-production)
  - [Deploy 1: Vercel (Production Edge + Serverless Python ASGI)](#deploy-1-vercel-production-edge--serverless-python-asgi)
  - [Deploy 2: Docker & Docker Compose](#deploy-2-docker--docker-compose)
  - [Deploy 3: Linux / Bare-Metal VPS (Ubuntu/Debian + Nginx + Systemd)](#deploy-3-linux--bare-metal-vps-ubuntudebian--nginx--systemd)
  - [Deploy 4: Render Cloud (Infrastructure-as-Code)](#deploy-4-render-cloud-infrastructure-as-code)
  - [Deploy 5: Fly.io](#deploy-5-flyio)
- [7. CLI Command Reference](#-cli-command-reference)
- [8. Dukungan Multi-Editor & LSP](#-dukungan-multi-editor--lsp)
- [9. Tata Kelola, Lisensi & Hak Cipta](#-tata-kelola-lisensi--hak-cipta)

---

## 🌟 Mengapa ZAU Framework? (Ringkasan Eksekutif)

Pengembangan web modern mengalami fragmentasi ekstrem: bundler yang membengkak, orkestrasi state management yang rumit, dependensi antar-CSS yang saling konflik, serta jurang pemisah antara komputasi numerik Python dan interaktivitas frontend JavaScript/TypeScript.

**ZAU (ZetaGo-Aurum Unified)** menyatukan seluruh spektrum tersebut ke dalam satu framework fullstack terpadu berstandar industri:

1. **Python ASGI Core**: Menggunakan kernel asynchronous Starlette/uvloop berkemampuan jutaan request per detik, Pydantic v2 untuk validasi skema otomatis, dan Server Action RPC tanpa boilerplate REST manual.
2. **Native 3D Spatial Canvas**: Menghadirkan WebGL/Three.js ke dalam siklus hidup komponen deklaratif (`<ZAU.Canvas3D>`), lengkap dengan Progressive LOD (Level of Detail), sistem material PBR, tata cahaya terintegrasi, dan proteksi memori GPU mobile.
3. **Dual-Asset Engine Interoperable**: Menggabungkan kecepatan utilitas atomik **Tailwind CSS** dengan konsistensi token komponen **Bootstrap 5.3** tanpa tabrakan nama kelas.
4. **Isomorphic Single-File Components (`.zau`)**: Format file tunggal revolusioner yang menyatukan template markup, skrip TypeScript berbasis Signals reactivity, dan gaya terisolasi.
5. **Universal Tooling & LSP**: Didukung ekstensi VS Code resmi, server LSP berbasis standar Microsoft Language Server Protocol, konverter tata bahasa untuk Neovim, Zed, Sublime Text, dan IntelliJ.

---

## 🏛️ Arsitektur Utama (RFC-001 Specification)

### Topologi Dual-Tier ZAU

```
+-----------------------------------------------------------------------------------+
|                                 ZAU BROWSER CLIENT                                |
|  +-----------------------------------------------------------------------------+  |
|  | [ZAU Client Runtime] (Signals-based Reactivity / Virtual DOM Hydration)     |  |
|  | - Native 3D Canvas (<ZAU.Canvas3D> / WebGL & WebGPU Renderer)               |  |
|  | - Dual Asset System (Tailwind Atomic JIT + Bootstrap Component Tokens)      |  |
|  +-----------------------------------------------------------------------------+  |
+------------------------------------------^----------------------------------------+
                                           |
                    High-Speed Binary/JSON WebSocket & SSE Stream
                           + HTTP/2 REST Auto-Generated Endpoints
                                           |
+------------------------------------------v----------------------------------------+
|                                 ZAU PYTHON CORE                                   |
|  +-----------------------------------------------------------------------------+  |
|  | ASGI Asynchronous Core (Starlette / uvloop / AnyIO Event Loop)              |  |
|  | - Server Actions & Reactive RPC Handler                                      |  |
|  | - Type-Safe Route Dispatcher (FastAPI Syntax Style)                          |  |
|  | - Pydantic v2 Serialization & Schema Validation Engine                       |  |
|  +-----------------------------------------------------------------------------+  |
|  | Native Database Layer (ZAU ORM / Async Engine / Migration Coordinator)       |  |
|  | - SQLite (Zero-Config Embedded) | PostgreSQL | MySQL                         |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### Matriks Desain Arsitektur

| Dimensi | Mesin / Pustaka | Spesifikasi & Rationale Teknis |
| :--- | :--- | :--- |
| **Server Engine** | **Python ASGI (Starlette + uvloop)** | Asynchronous non-blocking I/O kernel, Pydantic v2 deserialization, Server Actions RPC. |
| **3D Spatial Canvas** | **Native `<ZAU.Canvas3D>`** | Three.js r160 WebGL engine, Draco GLTF compression, progressive LOD Frame 0 loading. |
| **Database Subsystem** | **Async ORM + Migrations** | Zero-config embedded SQLite bawaan, koneksi 1 baris ke PostgreSQL / MySQL, ZAU DB Studio visual. |
| **Styling Pipeline** | **Tailwind CSS + Bootstrap 5.3** | Atomic layout utilities berkecepatan JIT dipadukan dengan token komponen Bootstrap. |
| **Format Komponen** | **`.zau` Single File Components** | Penyatuan `<template>`, `<script lang="ts">`, dan `<style>` dengan lexical analyzer & LSP. |
| **Deployment Model** | **Serverless Edge / OCI Docker** | Vercel Edge Serverless Python, Docker multi-stage container, Nginx reverse proxy. |

---

## 🚀 Tutorial Pemasangan (Installation)

### Persyaratan Sistem (Prerequisites)

Pastikan lingkungan komputer Anda telah terpasang perangkat lunak berikut:
- **Node.js**: `v18.0.0` atau versi LTS yang lebih baru (`v20.x` / `v22.x` direkomendasikan).
- **Python**: `3.11`, `3.12`, atau `3.13` (dengan modul `venv` dan `pip`).
- **Git**: `2.30+` untuk clone dan integrasi CI/CD.
- **Sistem Operasi**: Linux (Ubuntu, Debian, Fedora, Arch), macOS, atau Windows (dengan WSL2 atau PowerShell).

### Metode 1: Menggunakan NPM / NPX (Rekomendasi Cepat)

Scaffolding project ZAU baru dapat dilakukan langsung tanpa instalasi global:

```bash
# Inisialisasi interaktif via npm
npm create zau@latest my-app

# Atau menggunakan npx
npx create-zau my-app

# Pengguna pnpm
pnpm create zau my-app

# Pengguna yarn
yarn create zau my-app

# Pengguna bun
bun create zau my-app
```

Setelah scaffolding selesai, masuk ke direktori dan pasang dependensi backend & frontend:

```bash
cd my-app

# 1. Siapkan Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Untuk Linux/macOS
# .venv\Scriptsctivate   # Untuk Windows PowerShell

# 2. Pasang dependensi Python
pip install -r requirements.txt

# 3. Pasang dependensi Node.js
npm install
```

### Metode 2: Menggunakan Python Pip & CLI

Anda juga dapat memasang core framework ZAU secara langsung melalui ekosistem Python:

```bash
# Pasang paket core ZAU dari PyPI / Wheel
pip install zau-framework

# Buat project baru melalui CLI zau
zau create my-app --template fullstack-3d

cd my-app
pip install -r requirements.txt
npm install
```

### Verifikasi Instalasi

Jalankan perintah pengujian untuk memastikan seluruh runtime terpasang dengan sempurna:

```bash
# Cek versi runtime ZAU
python3 -m zau.cli --version
# atau: zau --version

# Cek Node.js & NPM
node -v
npm -v

# Cek Python interpreter
python3 -V
```

---

## 🛠️ Tutorial Pembuatan Project (Project Creation)

### Langkah 1: Scaffolding Interaktif

Jalankan generator CLI:

```bash
npm create zau@latest my-project
```

Terminal akan menampilkan banner resmi dan mengajukan pertanyaan konfigurasi:

```
  ███████╗ █████╗ ██╗   ██╗
  ╚══███╔╝██╔══██╗██║   ██║
    ███╔╝ ███████║██║   ██║
   ███╔╝  ██╔══██║██║   ██║
  ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ 

  ZAU Framework - Python-first Fullstack & Native 3D Spatial Canvas
  Chief Architect: ZetaGo-Aurum | zetagoaurum.com

? Project name: my-project
? Select a template:
  1) fullstack-3d  - Python ASGI + 3D Canvas + DB ORM + Tailwind/Bootstrap (Default)
  2) minimal       - Lightweight minimal starting point
  3) dashboard     - Administrative data dashboard with charts & metrics
  4) portfolio     - Atelier showcase with interactive 3D viewer
```

### Langkah 2: Memilih Template Resmi

Pilihlah salah satu dari 4 template produksi:

| Template | Komponen Inti | Kasus Penggunaan Ideal |
| :--- | :--- | :--- |
| **`fullstack-3d`** | Python ASGI + Three.js 3D Canvas + Async ORM + Tailwind + Bootstrap | Aplikasi 3D spasial komersial, game web, visualisasi arsitektur & produk. |
| **`minimal`** | Python Starlette ringan + Single-File Components minimalis | Microservice, prototipe kilat, API endpoint dengan antarmuka sederhana. |
| **`dashboard`** | Tabular Data Grid + Chart.js + ZAU DB Studio + Realtime Metrics | Panel kontrol enterprise, monitoring server, sistem manajemen analitik. |
| **`portfolio`** | Spatial Room Model + Cinematic Camera + Seated POV + Atelier Showroom | Portofolio kreatif kelas atas, galeri seni virtual, presentasi profil 3D. |

### Langkah 3: Memahami Struktur Direktori Project

Project ZAU terstruktur secara bersih dan modular:

```
my-project/
├── api/
│   └── index.py             # Serverless ASGI bridge untuk Vercel / Cloud Functions
├── backend/
│   ├── app.py               # Instansiasi ZAUApp, rute ASGI & Server Actions
│   └── database/
│       ├── models/          # Model data deklaratif ZAU ORM
│       └── migrations/      # Riwayat migrasi skema SQL
├── frontend/
│   ├── components/          # Komponen UI dan 3D (.zau / .tsx)
│   ├── pages/               # Halaman aplikasi dan routing tampilan
│   └── styles/              # Integrasi Tailwind CSS & Bootstrap
├── model/
│   └── 3d/                  # Aset 3D (GLTF/GLB Draco, tekstur, material)
├── public/
│   └── favicon.ico          # Aset statis browser publik
├── Dockerfile               # Multi-stage container siap produksi
├── docker-compose.yml       # Orkestrasi container lokal (App + Postgres + Redis)
├── package.json             # Manifest paket Node.js
├── pyproject.toml           # Manifest paket Python
├── render.yaml              # Konfigurasi deploy Render
├── requirements.txt         # Daftar dependensi Python
├── tsconfig.json            # Konfigurasi TypeScript
├── vercel.json              # Konfigurasi routing serverless Vercel
└── zau.config.py            # Konfigurasi master server ZAU (Port, CORS, DB)
```

### Langkah 4: Menulis Komponen Pertama `.zau`

File `.zau` menyatukan tiga blok fundamental: `<template>`, `<script lang="ts">`, dan `<style>`.

Buat file `frontend/components/ProductCard.zau`:

```html
<template>
  <div class="card shadow-lg rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 backdrop-blur">
    <!-- Header Produk -->
    <div class="flex items-center justify-between mb-4">
      <span class="badge bg-warning text-dark font-mono font-bold">SPATIAL ASSET</span>
      <span class="text-xs text-zinc-400 font-mono">ID: #{{ productId }}</span>
    </div>

    <!-- 3D Spatial Canvas Viewport -->
    <div class="w-full h-64 rounded-xl overflow-hidden bg-black/40 border border-zinc-800">
      <ZAU.Canvas3D camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ZAU.AmbientLight intensity={0.7} />
        <ZAU.DirectionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <ZAU.OrbitControls enableZoom={true} autoRotate={isRotating} />
        
        <ZAU.Model 
          src={assetUrl} 
          position={[0, 0, 0]} 
          scale={isHovered ? 1.05 : 1.0}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        />
      </ZAU.Canvas3D>
    </div>

    <!-- Informasi Produk & Aksi -->
    <div class="mt-4 flex items-center justify-between">
      <div>
        <h4 class="text-lg font-bold text-white">{{ title }}</h4>
        <p class="text-xs text-zinc-400 font-mono">{{ price }} ZAU Credits</p>
      </div>
      <button 
        class="btn btn-warning btn-sm font-semibold px-4 py-2 hover:scale-105 transition-transform"
        @click="handleOrder"
      >
        Order Now
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ZAU, useState, callAction } from 'zau-framework';

export default function ProductCard({ productId, title, price, assetUrl }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  const handleOrder = async () => {
    try {
      const response = await callAction('/api/orders/create', { productId });
      alert(`Pesanan berhasil: ${response.order_id}`);
    } catch (err) {
      alert(`Gagal membuat pesanan: ${err.message}`);
    }
  };

  return { isHovered, setIsHovered, isRotating, setIsRotating, handleOrder };
}
</script>

<style>
.card {
  transition: border-color 0.2s ease-in-out;
}
.card:hover {
  border-color: rgba(245, 158, 11, 0.4);
}
</style>
```

### Langkah 5: Membuat Backend Server Action Python ASGI

Buka `backend/app.py` dan buat endpoint aksi yang dapat dipanggil langsung oleh frontend:

```python
from zau import ZAUApp, Depends
from zau.db import get_session, AsyncSession, select
from backend.database.models.order import Order
from pydantic import BaseModel
from typing import Dict, Any

app = ZAUApp(
    title="ZAU Commercial Application",
    version="1.0.4",
    client_dir="../frontend"
)

class OrderRequest(BaseModel):
    productId: int

# Server Action RPC Endpoint
@app.action("/api/orders/create")
async def create_order(
    req: OrderRequest, 
    session: AsyncSession = Depends(get_session)
) -> Dict[str, Any]:
    new_order = Order(product_id=req.productId, status="PENDING")
    session.add(new_order)
    await session.commit()
    await session.refresh(new_order)
    
    return {
        "status": "success",
        "order_id": new_order.id,
        "message": f"Order #{new_order.id} registered on Python ASGI kernel"
    }

# Realtime WebSocket Stream
@app.websocket("/ws/telemetry")
async def telemetry_stream(ws):
    await ws.accept()
    while True:
        data = await ws.receive_json()
        # Broadcast koordinat kamera atau status 3D ke seluruh klien yang terhubung
        await app.broadcast_json({"user": data["user"], "position": data["position"]})
```

### Langkah 6: Database Async ORM & ZAU DB Studio

Definisikan model data di `backend/database/models/order.py`:

```python
from zau.db import Model, Field
from typing import Optional
from datetime import datetime

class Order(Model, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(index=True)
    status: str = Field(default="PENDING")
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

Jalankan perintah database CLI:

```bash
# 1. Generate skema migrasi otomatis
zau db migrate -m "create_order_table"

# 2. Terapkan migrasi ke database (SQLite/PostgreSQL)
zau db upgrade

# 3. Buka ZAU DB Studio visual di browser
zau db studio --port 8010
```

### Langkah 7: Menjalankan Server Development

Cukup jalankan satu perintah untuk memutar server Python ASGI dan live reload frontend:

```bash
zau dev --port 8000
```

Buka `http://localhost:8000` di browser Anda. Seluruh perubahan pada file `.zau`, skrip TypeScript, dan modul Python akan terkompilasi secara instan (Hot Module Replacement).

---

## 🌌 Native 3D Spatial Canvas

ZAU menyediakan dukungan kelas utama (first-class support) untuk komputasi spasial 3D WebGL tanpa konfigurasi bundler manual.

### Sintaks Primitif 3D

```html
<ZAU.Canvas3D
  shadows={true}
  camera={{ position: [-0.885, 1.15, 2.25], fov: 55 }}
  className="w-full h-[600px] rounded-3xl"
>
  <!-- Pencahayaan Realistik -->
  <ZAU.AmbientLight intensity={0.5} />
  <ZAU.DirectionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
  
  <!-- Kontrol Orbit & Batasan Rotasi -->
  <ZAU.OrbitControls 
    enableDamping={true}
    minDistance={0.5}
    maxDistance={2.2}
    maxPolarAngle={Math.PI / 2 + 0.1}
  />
  
  <!-- Aset 3D dengan Fallback Spinner -->
  <ZAU.Model
    src="/model/3d/salt_tower_lower_room.glb"
    position={[-0.885, 0.70, 1.08]}
    fallback={<ZAU.Spinner3D label="Memuat Aula Spasial..." />}
  />
</ZAU.Canvas3D>
```

### Pipeline Progressive Level of Detail (LOD)

Untuk mengatasi waktu muat awal pada aset 3D beresolusi tinggi, ZAU mengimplementasikan **Dual-Tier Progressive LOD**:
1. **Tier 1 (Instant Frame 0)**: Geometri mesh Draco terkompresi super-ringan (~664 KB) dimuat dan dirender dalam waktu <100ms.
2. **Tier 2 (High-Poly Background Stream)**: Tekstur resolusi penuh 4K/8K dan buffer material PBR dialirkan di latar belakang (background worker) lalu ditukar secara mulus tanpa frame drop.

### Kontrol Kamera & Orbit Clamping

ZAU menyediakan konfigurasi kamera deklaratif lengkap dengan pembatasan jarak orbit (*OrbitControls Clamping* `minDistance` dan `maxDistance`) untuk menjaga kamera tetap berada di dalam viewport ruangan (*anti-wall clipping*), serta klem sudut elevasi vertikal (*polar angle damping*) agar kamera tidak jatuh ke bawah lantai virtual.

---

## 🌐 Tutorial Deploy ke Production

ZAU dirancang dengan prinsip deploy anywhere: dari serverless edge hingga bare-metal dedicated server. Berikut panduan langkah demi langkah yang lengkap.

---

### Deploy 1: Vercel (Production Edge + Serverless Python ASGI)

Vercel adalah platform hosting yang ideal untuk ZAU berkat kombinasi *static edge caching* untuk aset 3D dan *serverless Python functions* untuk backend ASGI.

#### Langkah 1: Pastikan Konfigurasi `vercel.json` Tersedia

Di root project ZAU Anda, buat atau periksa file `vercel.json`:

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

*Penjelasan*: Setiap request yang diawali `/api/` atau `/__zau/` akan diarahkan secara otomatis ke serverless function Python `api/index.py`, sementara seluruh halaman statis dan aset 3D dilayani langsung dari Vercel Global Edge Network.

#### Langkah 2: Buat Entrypoint Serverless Python (`api/index.py`)

Pastikan file `api/index.py` mengimpor instance `ZAUApp` dan mengekspor objek ASGI:

```python
import os
import sys

# Tambahkan root direktori ke PYTHONPATH agar modul internal dapat diimpor
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.app import app

# Ekspor objek ASGI application standar yang didukung runtime Vercel Python
app = app.get_asgi_app()
```

#### Langkah 3: Siapkan `.vercelignore`

Pastikan file virtual environment lokal dan cache tidak ikut terunggah:

```
.venv/
__pycache__/
*.pyc
.git/
.next/
dist/
node_modules/
```

#### Langkah 4: Jalankan Deploy melalui Vercel CLI

Buka terminal di root project dan jalankan:

```bash
# 1. Login ke akun Vercel (jika belum)
npx vercel login

# 2. Deploy preview untuk verifikasi
npx vercel

# 3. Deploy langsung ke Production
npx vercel --prod --yes
```

#### Langkah 5: Hubungkan ke GitHub untuk Otomasi CI/CD

1. Push repositori project Anda ke GitHub:
   ```bash
   git add .
   git commit -m "feat: release production v1.0.4"
   git push origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/dashboard).
3. Klik **Add New...** -> **Project**, lalu pilih repositori GitHub Anda.
4. Masukkan variabel lingkungan produksi di bagian **Environment Variables**:
   - `DATABASE_URL`: URL PostgreSQL produksi (contoh: Neon, Supabase, atau Vercel Postgres).
   - `ZAU_ENV`: `production`
   - `ZAU_SECRET_KEY`: Kunci enkripsi token sesi.
5. Klik **Deploy**. Setiap kali Anda melakukan `git push origin main`, Vercel akan mem-build dan men-deploy pembaruan secara otomatis.

---

### Deploy 2: Docker & Docker Compose

Untuk deployment berbasis container mandiri atau Kubernetes:

#### File `Dockerfile` (Multi-Stage Production Build)

```dockerfile
# -------------------------------------------------------------------
# STAGE 1: Build Frontend Assets
# -------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# -------------------------------------------------------------------
# STAGE 2: Python ASGI Production Runner
# -------------------------------------------------------------------
FROM python:3.12-slim AS runner
WORKDIR /app

# Install dependensi sistem dasar
RUN apt-get update && apt-get install -y --no-install-recommends     curl     && rm -rf /var/lib/apt/lists/*

# Copy dan install dependensi Python
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt     && pip install --no-cache-dir uvicorn[standard] gunicorn

# Copy artefak dari stage 1 dan kode sumber
COPY --from=frontend-builder /app /app

# Variabel Lingkungan Produksi
ENV PYTHONUNBUFFERED=1     PYTHONDONTWRITEBYTECODE=1     ZAU_ENV=production     PORT=8000

EXPOSE 8000

# Jalankan Uvicorn multi-worker di belakang Gunicorn
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "backend.app:app", "--bind", "0.0.0.0:8000"]
```

#### File `docker-compose.yml` (App + PostgreSQL + Redis)

```yaml
version: '3.8'

services:
  zau-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: zau_production_app
    restart: always
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://zau_user:zau_password@postgres:5432/zau_db
      - REDIS_URL=redis://redis:6379/0
      - ZAU_ENV=production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - ./model/3d:/app/model/3d:ro

  postgres:
    image: postgres:16-alpine
    container_name: zau_postgres
    restart: always
    environment:
      POSTGRES_USER: zau_user
      POSTGRES_PASSWORD: zau_password
      POSTGRES_DB: zau_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U zau_user -d zau_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: zau_redis
    restart: always
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

#### Menjalankan Container:

```bash
# Build dan jalankan cluster di background
docker compose up -d --build

# Periksa status container
docker compose ps

# Periksa logs aplikasi
docker compose logs -f zau-app
```

---

### Deploy 3: Linux / Bare-Metal VPS (Ubuntu/Debian + Nginx + Systemd)

Untuk performa puncak tanpa overhead container pada server VPS (DigitalOcean, AWS EC2, Hetzner, Linode):

#### Langkah 1: Persiapan Server VPS

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nodejs npm nginx certbot python3-certbot-nginx git

# Clone project Anda
cd /var/www
sudo git clone https://github.com/username/my-project.git zau-app
cd zau-app
sudo chown -R $USER:$USER /var/www/zau-app
```

#### Langkah 2: Setup Python Virtual Environment & Build Frontend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install uvicorn[standard] gunicorn

npm ci
npm run build
```

#### Langkah 3: Konfigurasi Systemd Service Unit

Buat file `/etc/systemd/system/zau.service`:

```ini
[Unit]
Description=ZAU Framework High-Performance ASGI Service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/zau-app
Environment="PATH=/var/www/zau-app/.venv/bin"
Environment="ZAU_ENV=production"
ExecStart=/var/www/zau-app/.venv/bin/gunicorn     -w 4     -k uvicorn.workers.UvicornWorker     backend.app:app     --bind 127.0.0.1:8000     --access-logfile /var/log/zau_access.log     --error-logfile /var/log/zau_error.log

Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Aktifkan dan jalankan service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable zau
sudo systemctl start zau
sudo systemctl status zau
```

#### Langkah 4: Konfigurasi Nginx Reverse Proxy dengan Dukungan WebSocket & 3D Caching

Buat file `/etc/nginx/sites-available/zau`:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Caching agresif untuk Aset 3D (.glb, .gltf, .bin)
    location ~* \.(glb|gltf|bin|draco)$ {
        root /var/www/zau-app/model/3d;
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # Proxy ke ASGI Application Core
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Buffer streaming untuk real-time data
        proxy_buffering off;
        proxy_read_timeout 86400;
    }
}
```

Aktifkan konfigurasi Nginx dan pasang SSL gratis Let's Encrypt:

```bash
sudo ln -s /etc/nginx/sites-available/zau /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Pasang sertifikat HTTPS otomatis
sudo certbot --nginx -d example.com -d www.example.com
```

---

### Deploy 4: Render Cloud (Infrastructure-as-Code)

ZAU menyediakan file `render.yaml` siap pakai:

```yaml
services:
  - type: web
    name: zau-app
    env: python
    region: singapore
    plan: standard
    buildCommand: pip install -r requirements.txt && npm install && npm run build
    startCommand: gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.app:app --bind 0.0.0.0:$PORT
    envVars:
      - key: ZAU_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: zau-postgres
          property: connectionString

databases:
  - name: zau-postgres
    databaseName: zau_db
    user: zau_user
    plan: standard
```

---

### Deploy 5: Fly.io

Jalankan deploy kilat ke 30+ region dengan Fly.io:

```bash
# 1. Inisialisasi konfigurasi Fly
fly launch --no-deploy

# 2. Pasang volume persisten untuk SQLite atau file 3D (opsional)
fly volumes create zau_data --size 10

# 3. Deploy
fly deploy
```

---

## ⚡ CLI Command Reference

Framework ZAU dilengkapi antarmuka CLI yang tangguh:

```bash
# ===================================================================
# 1. MANAJEMEN PROJECT
# ===================================================================
zau create <app-name> --template <template>   # Scaffold project baru
zau dev --port 8000                         # Jalankan development server dengan HMR
zau build                                   # Kompilasi bundel produksi
zau start --workers 4 --port 8000           # Jalankan cluster Uvicorn multi-worker

# ===================================================================
# 2. DATABASE ORM & STUDIO
# ===================================================================
zau db init                                 # Inisialisasi direktori migrasi
zau db migrate -m "nama_migrasi"            # Deteksi model & buat file migrasi
zau db upgrade                              # Terapkan migrasi tertunda
zau db downgrade                            # Rollback 1 langkah migrasi
zau db studio --port 8010                   # Buka antarmuka ZAU DB Studio

# ===================================================================
# 3. PIPELINE ASET 3D SPASIAL
# ===================================================================
zau 3d list                                 # Tampilkan daftar model & metadata ukuran
zau 3d optimize path/to/model.glb           # Kompresi mesh menggunakan Draco
zau 3d inspect path/to/model.glb            # Cek node hierarchy, vertex & material

# ===================================================================
# 4. SINTAKS & INTERPRETER .ZAU
# ===================================================================
zau highlight path/to/component.zau --ansi   # Cetak kode berwarna di terminal
zau highlight path/to/component.zau --html   # Generate token HTML ber-CSS
```

---

## 🎨 Dukungan Multi-Editor & LSP

Ekosistem bahasa `.zau` didesain untuk berjalan di semua code editor modern melalui standar industri Language Server Protocol (LSP) dan TextMate grammar:

```
                  +--------------------------+
                  |  source.zau Grammar      |
                  |  (syntaxes/zau.tmLanguage)
                  +------------+-------------+
                               |
        +----------------------+----------------------+
        |                      |                      |
        v                      v                      v
+---------------+      +---------------+      +---------------+
|    VS Code    |      |  Sublime Text |      | JetBrains /   |
|   Extension   |      | .sublime-syntax|      | IntelliJ IDEA |
+---------------+      +---------------+      +---------------+
        |                      |                      |
        +----------------------+----------------------+
                               |
                               v
                  +--------------------------+
                  | zau-language-server (LSP)|
                  | - Tag IntelliSense       |
                  | - Signals Autocomplete   |
                  | - Real-time Diagnostics  |
                  | - Formatting & Hover     |
                  +--------------------------+
```

### 1. Visual Studio Code & Open-VSX
Pasang paket ekstensi `.vsix` resmi:
```bash
code --install-extension dist/extensions/zau-1.0.4.vsix
```
*Fitur*: Penyorotan sintaks komprehensif, autokompresi tag `<ZAU.*>`, autocomplete atribut 3D, hover docs, dan validasi skema.

### 2. Neovim
Tambahkan konfigurasi ke `init.lua`:
```lua
vim.filetype.add({ extension = { zau = 'zau' } })

require('lspconfig.configs').zau = {
  default_config = {
    cmd = { 'zau-language-server', '--stdio' },
    filetypes = { 'zau' },
    root_dir = require('lspconfig.util').root_pattern('package.json', 'zau.config.py', '.git'),
  }
}
require('lspconfig').zau.setup({})
```

### 3. Zed Editor
Cukup daftarkan ekstensi yang telah digenerate pada direktori `packages/vscode-zau/syntaxes/zed`.

### 4. Sublime Text & IntelliJ
Gunakan grammar `.sublime-syntax` di `packages/vscode-zau/syntaxes/zau.sublime-syntax` dan konfigurasi XML IntelliJ di `packages/vscode-zau/syntaxes/intellij/zau.xml`.

---

## ⚖️ Tata Kelola, Lisensi & Hak Cipta

- **Chief Architect & Project Lead**: **ZetaGo-Aurum**
- **Situs Web Resmi**: [zetagoaurum.com](https://zetagoaurum.com)
- **Email Dukungan Komersial**: `admin@zetagoaurum.com`
- **Lisensi Perangkat Lunak**: [MIT License](LICENSE)
- **Model 3D Spatial Showcase**: *The Great Drawing Room* dibuat oleh **The Hallwyl Museum** ([Sketchfab](https://sketchfab.com/TheHallwylMuseum)), dilisensikan di bawah [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

<div align="center">
  <p><strong>ZAU Framework</strong> &mdash; Built with pride by ZetaGo-Aurum.</p>
  <p><small>&copy; 2026 ZetaGo-Aurum. All rights reserved.</small></p>
</div>
