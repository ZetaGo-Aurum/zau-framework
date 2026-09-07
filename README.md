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
  <a href="https://zau-framework.vercel.app"><img src="https://img.shields.io/badge/live-zau--framework.vercel.app-000000.svg?logo=vercel" alt="Vercel Deployment" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <strong>Language / Bahasa:</strong>
  <strong>English (Default)</strong> &bull;
  <a href="README.id.md">Bahasa Indonesia</a>
</p>

<p align="center">
  <a href="#table-of-contents">Table of Contents</a> &bull;
  <a href="#architecture-specification-rfc-001">Architecture</a> &bull;
  <a href="#installation-tutorial">Installation</a> &bull;
  <a href="#project-creation-tutorial">Project Creation</a> &bull;
  <a href="#production-deployment-guide">Deployment</a> &bull;
  <a href="#multi-editor--lsp-support">Editor & LSP</a>
</p>

<p align="center">
  <strong>Official Atelier:</strong> <a href="https://zetagoaurum.com">zetagoaurum.com</a> &middot;
  <strong>Live Documentation:</strong> <a href="https://zau-framework.vercel.app">zau-framework.vercel.app</a> &middot;
  <strong>Contact Email:</strong> <a href="mailto:admin@zetagoaurum.com">admin@zetagoaurum.com</a>
</p>

</div>

---

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Architecture Specification (RFC-001)](#2-architecture-specification-rfc-001)
  - [Dual-Tier Unified Topology](#dual-tier-unified-topology)
  - [Architectural Decision Matrix](#architectural-decision-matrix)
- [3. Installation Tutorial](#3-installation-tutorial)
  - [System Prerequisites](#system-prerequisites)
  - [Method 1: Using NPM / NPX (Recommended)](#method-1-using-npm--npx-recommended)
  - [Method 2: Using Python Pip & CLI](#method-2-using-python-pip--cli)
  - [Installation Verification](#installation-verification)
- [4. Project Creation Tutorial](#4-project-creation-tutorial)
  - [Step 1: Interactive Scaffolding](#step-1-interactive-scaffolding)
  - [Step 2: Official Templates Comparison](#step-2-official-templates-comparison)
  - [Step 3: Directory Structure Overview](#step-3-directory-structure-overview)
  - [Step 4: Writing Your First `.zau` Component](#step-4-writing-your-first-zau-component)
  - [Step 5: Authoring Python ASGI Server Actions](#step-5-authoring-python-asgi-server-actions)
  - [Step 6: Async Database ORM & ZAU DB Studio](#step-6-async-database-orm--zau-db-studio)
  - [Step 7: Starting the Development Server](#step-7-starting-the-development-server)
- [5. Native 3D Spatial Canvas](#5-native-3d-spatial-canvas)
  - [Declarative Spatial Syntax](#declarative-spatial-syntax)
  - [Dual-Tier Progressive LOD Pipeline](#dual-tier-progressive-lod-pipeline)
  - [Camera Controls, Orbit Clamping & Boundary Safety](#camera-controls-orbit-clamping--boundary-safety)
- [6. Production Deployment Guide](#6-production-deployment-guide)
  - [Target 1: Vercel (Production Edge + Serverless Python ASGI)](#target-1-vercel-production-edge--serverless-python-asgi)
  - [Target 2: Docker & Docker Compose](#target-2-docker--docker-compose)
  - [Target 3: Linux / Bare-Metal VPS (Ubuntu/Debian + Nginx + Systemd)](#target-3-linux--bare-metal-vps-ubuntudebian--nginx--systemd)
  - [Target 4: Render Cloud (Infrastructure-as-Code)](#target-4-render-cloud-infrastructure-as-code)
  - [Target 5: Fly.io](#target-5-flyio)
- [7. CLI Command Reference](#7-cli-command-reference)
- [8. Multi-Editor & LSP Support](#8-multi-editor--lsp-support)
- [9. Governance, License & Acknowledgements](#9-governance-license--acknowledgements)

---

## 1. Executive Summary

Modern web software engineering suffers from acute fragmentation: disconnected backend runtimes, bloated bundlers, complex client state synchronization layers, conflicting CSS abstractions, and deep runtime boundaries separating Python numerical computing from WebGL interactive client viewports.

**ZAU (ZetaGo-Aurum Unified)** resolves this dichotomy through an industrial-grade fullstack architecture:

1. **Python ASGI Core**: High-throughput asynchronous kernel powered by Starlette and uvloop, automated Pydantic v2 data validation, and declarative Server Action RPC procedures.
2. **Native 3D Spatial Canvas**: First-class Three.js r160 WebGL integration embedded directly in component lifecycles (`<ZAU.Canvas3D>`), featuring Draco geometry decompression, PBR materials, and mobile GPU memory protection.
3. **Interoperable Dual-Asset Styling**: Combines the precision micro-layout velocity of **Tailwind CSS** with the design system consistency of **Bootstrap 5.3** component tokens with zero class collisions.
4. **Isomorphic Single-File Components (`.zau`)**: A single file format consolidating `<template>` markup, `<script lang="ts">` reactive logic driven by micro-signals, and isolated `<style>` rules.
5. **Universal Tooling & LSP Ecosystem**: Backed by an official VS Code extension, an industry-standard Language Server Protocol (`zau-lsp`) daemon, and syntax grammar converters for Neovim, Zed, Sublime Text, and IntelliJ IDEA.

---

## 2. Architecture Specification (RFC-001)

### Dual-Tier Unified Topology

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

### Architectural Decision Matrix

| Architectural Layer | Implementation Engine | Technical Rationale |
| :--- | :--- | :--- |
| **Server Engine** | **Python ASGI (Starlette + uvloop)** | Asynchronous event loop, sub-millisecond execution, automated Pydantic v2 validation. |
| **3D Spatial Canvas** | **Native `<ZAU.Canvas3D>`** | Three.js r160 WebGL engine, Draco GLTF compression, progressive LOD Frame 0 rendering. |
| **Database Subsystem** | **Async ORM + Migrations** | Embedded SQLite for zero-config local prototyping, one-line connection to PostgreSQL/MySQL. |
| **Styling Pipeline** | **Tailwind CSS + Bootstrap 5.3** | JIT utility classes for micro-layout paired with Bootstrap component tokens. |
| **Component Format** | **`.zau` Single File Components** | Unified `<template>`, `<script lang="ts">`, and `<style>` with native parser & LSP daemon. |
| **Deployment Model** | **Serverless Edge / OCI Docker** | Vercel Serverless Python edge routing, multi-stage OCI containers, Nginx reverse proxy. |

---

## 3. Installation Tutorial

### System Prerequisites

Verify that your local development workstation satisfies the following requirements:
- **Node.js**: `v18.0.0` or higher (`v20.x` / `v22.x` LTS recommended).
- **Python**: `3.11`, `3.12`, or `3.13` (with standard `venv` and `pip` modules).
- **Git**: `2.30+` for version control and CI/CD integration.
- **Operating Systems**: Linux (Ubuntu, Debian, Fedora, Arch), macOS (Apple Silicon / Intel), or Windows (via WSL2 or native PowerShell).

### Method 1: Using NPM / NPX (Recommended)

Initialize a new ZAU project directly without prior global installations:

```bash
# Interactive scaffolding via npm
npm create zau@latest my-app

# Or using npx
npx create-zau my-app

# Using pnpm
pnpm create zau my-app

# Using yarn
yarn create zau my-app

# Using bun
bun create zau my-app
```

After scaffolding completes, enter the directory and install backend and frontend dependencies:

```bash
cd my-app

# 1. Initialize and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Linux / macOS
# .venv\Scriptsctivate   # Windows PowerShell

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Install Node.js runtime dependencies
npm install
```

### Method 2: Using Python Pip & CLI

Install the core framework package from PyPI:

```bash
# Install ZAU framework core
pip install zau-framework

# Scaffold a project using the zau CLI
zau create my-app --template fullstack-3d

cd my-app
pip install -r requirements.txt
npm install
```

### Installation Verification

Run the verification commands to confirm environment integrity:

```bash
# Verify ZAU CLI
python3 -m zau.cli --version
# or: zau --version

# Verify Node.js & NPM
node -v
npm -v

# Verify Python runtime
python3 -V
```

---

## 4. Project Creation Tutorial

### Step 1: Interactive Scaffolding

Run the scaffolding CLI:

```bash
npm create zau@latest my-project
```

The terminal displays the banner and prompts for project configuration:

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

### Step 2: Official Templates Comparison

| Template | Architecture & Included Modules | Recommended Use Cases |
| :--- | :--- | :--- |
| **`fullstack-3d`** | Python ASGI + Three.js 3D Canvas + Async ORM + Tailwind & Bootstrap | Commercial 3D applications, WebGL games, interactive digital twins, spatial e-commerce. |
| **`minimal`** | Python Starlette service + minimal Single-File Component frontend | Microservices, API gateways, rapid prototyping with lightweight UI. |
| **`dashboard`** | Tabular Data Grid + Telemetry Charts + ZAU DB Studio + Metric Cards | Enterprise admin portals, infrastructure monitoring, data visualization. |
| **`portfolio`** | Spatial Room Model + Cinematic Camera + Seated POV + Atelier Showroom | Creative portfolios, virtual exhibitions, 3D architectural showcases. |

### Step 3: Directory Structure Overview

A scaffolded ZAU project follows a clean, modular hierarchy:

```
my-project/
├── api/
│   └── index.py             # Serverless ASGI bridge (Vercel / Cloud Functions)
├── backend/
│   ├── app.py               # ZAUApp instantiation, ASGI routes & Server Actions
│   └── database/
│       ├── models/          # Declarative async ORM models
│       └── migrations/      # SQL migration versions
├── frontend/
│   ├── components/          # UI and 3D spatial components (.zau / .tsx)
│   ├── pages/               # Application routes and views
│   └── styles/              # Tailwind CSS and Bootstrap style configurations
├── model/
│   └── 3d/                  # 3D spatial models (GLTF/GLB Draco & textures)
├── public/
│   └── favicon.ico          # Browser static assets
├── Dockerfile               # Production multi-stage OCI container
├── docker-compose.yml       # Local development cluster (App + Postgres + Redis)
├── package.json             # Node.js manifest and scripts
├── pyproject.toml           # Python package configuration
├── render.yaml              # Render Cloud deployment blueprint
├── requirements.txt         # Python dependencies
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel serverless edge rewrite configuration
└── zau.config.py            # Master ZAU server configuration (Port, CORS, DB)
```

### Step 4: Writing Your First `.zau` Component

The `.zau` format consolidates `<template>`, `<script lang="ts">`, and `<style>` in one file.

Create `frontend/components/ProductCard.zau`:

```html
<template>
  <div class="card shadow-lg rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 backdrop-blur">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <span class="badge bg-warning text-dark font-mono font-bold">SPATIAL ASSET</span>
      <span class="text-xs text-zinc-400 font-mono">ID: #{{ productId }}</span>
    </div>

    <!-- 3D Spatial Viewport -->
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

    <!-- Information & Actions -->
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
      alert(`Order confirmed: ${response.order_id}`);
    } catch (err) {
      alert(`Order failed: ${err.message}`);
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

### Step 5: Authoring Python ASGI Server Actions

Open `backend/app.py` and register an RPC action endpoint:

```python
from zau import ZAUApp, Depends
from zau.db import get_session, AsyncSession, select
from backend.database.models.order import Order
from pydantic import BaseModel
from typing import Dict, Any

app = ZAUApp(
    title="ZAU Production Suite",
    version="1.0.5",
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
    new_order = Order(product_id=req.productId, status="CONFIRMED")
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
        await app.broadcast_json({"user": data["user"], "position": data["position"]})
```

### Step 6: Async Database ORM & ZAU DB Studio

Define a declarative database model in `backend/database/models/order.py`:

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

Manage migrations and inspect data via CLI:

```bash
# 1. Generate schema migration
zau db migrate -m "create_order_table"

# 2. Apply migrations to database
zau db upgrade

# 3. Launch visual ZAU DB Studio inspector
zau db studio --port 8010
```

### Step 7: Starting the Development Server

Execute the development command:

```bash
zau dev --port 8000
```

Open `http://localhost:8000` in your browser. Changes across `.zau` components, TypeScript logic, and Python backend handlers update with instant Hot Module Replacement.

---

## 5. Native 3D Spatial Canvas

ZAU provides declarative WebGL 3D computing without custom bundler configuration.

### Declarative Spatial Syntax

```html
<ZAU.Canvas3D
  shadows={true}
  camera={{ position: [-0.885, 1.15, 2.25], fov: 55 }}
  className="w-full h-[600px] rounded-3xl"
>
  <!-- Lighting -->
  <ZAU.AmbientLight intensity={0.5} />
  <ZAU.DirectionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
  
  <!-- Orbit Controls with Boundary Clamping -->
  <ZAU.OrbitControls 
    enableDamping={true}
    minDistance={0.5}
    maxDistance={2.2}
    maxPolarAngle={Math.PI / 2 + 0.1}
  />
  
  <!-- 3D Spatial Model -->
  <ZAU.Model
    src="/model/3d/salt_tower_lower_room.glb"
    position={[-0.885, 0.70, 1.08]}
    fallback={<ZAU.Spinner3D label="Loading Spatial Chamber..." />}
  />
</ZAU.Canvas3D>
```

### Dual-Tier Progressive LOD Pipeline

High-resolution 3D interior scans often introduce high initial payload latencies. ZAU implements a **Dual-Tier Progressive LOD** engine:
1. **Tier 1 (Instant Frame 0)**: Lightweight compressed Draco mesh (~664 KB) loads and renders in sub-100ms.
2. **Tier 2 (High-Poly Background Stream)**: Full-resolution 4K/8K PBR textures and geometry buffers stream in a background worker and swap smoothly without dropping animation frames.

### Camera Controls, Orbit Clamping & Boundary Safety

ZAU includes declarative camera configuration with `minDistance` and `maxDistance` clamping to prevent the camera from clipping outside room walls (*anti-wall clipping*), as well as vertical polar angle damping to keep the viewport above virtual floor planes.

---

## 6. Production Deployment Guide

ZAU is engineered for zero-friction deployment across modern cloud platforms.

---

### Target 1: Vercel (Production Edge + Serverless Python ASGI)

Vercel provides a zero-cold-start frontend edge coupled with serverless Python execution.

#### Step 1: `vercel.json` Configuration

Ensure `vercel.json` is configured at the project root:

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

*Mechanism*: Requests targeting `/api/*` or `/__zau/*` route to the Python ASGI serverless function (`api/index.py`), while static frontend assets and 3D models serve from Vercel's Global CDN.

#### Step 2: Python Serverless Entrypoint (`api/index.py`)

Verify that `api/index.py` exports standard ASGI application instance:

```python
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.app import app

# Export standard ASGI application object
app = app.get_asgi_app()
```

#### Step 3: Deploy via Vercel CLI

```bash
# 1. Authenticate with Vercel
npx vercel login

# 2. Deploy directly to production
npx vercel --prod --yes
```

#### Step 4: Environment Variables

Configure the following in the Vercel Project Dashboard:
- `DATABASE_URL`: Production PostgreSQL URI (`postgresql+asyncpg://...`)
- `ZAU_ENV`: `production`
- `ZAU_SECRET_KEY`: Cryptographic session key

---

### Target 2: Docker & Docker Compose

For containerized cloud environments or Kubernetes clusters:

#### `Dockerfile` (Multi-Stage Production Build)

```dockerfile
# STAGE 1: Frontend Build
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2: Python ASGI Production Runner
FROM python:3.12-slim AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends     curl     && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt     && pip install --no-cache-dir uvicorn[standard] gunicorn

COPY --from=frontend-builder /app /app

ENV PYTHONUNBUFFERED=1     PYTHONDONTWRITEBYTECODE=1     ZAU_ENV=production     PORT=8000

EXPOSE 8000

CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "backend.app:app", "--bind", "0.0.0.0:8000"]
```

#### `docker-compose.yml` (App + PostgreSQL 16 + Redis)

```yaml
version: '3.8'

services:
  zau-app:
    build: .
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

  postgres:
    image: postgres:16-alpine
    container_name: zau_postgres
    restart: always
    environment:
      POSTGRES_USER: zau_user
      POSTGRES_PASSWORD: zau_password
      POSTGRES_DB: zau_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U zau_user -d zau_db"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

#### Run Container Cluster:

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f zau-app
```

---

### Target 3: Linux / Bare-Metal VPS (Ubuntu/Debian + Nginx + Systemd)

For raw hardware throughput on dedicated virtual private servers:

#### Step 1: System Provisioning

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-venv nodejs npm nginx certbot python3-certbot-nginx git

cd /var/www
sudo git clone https://github.com/username/my-project.git zau-app
cd zau-app
sudo chown -R $USER:$USER /var/www/zau-app

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install uvicorn[standard] gunicorn
npm ci && npm run build
```

#### Step 2: Systemd Service Unit (`/etc/systemd/system/zau.service`)

```ini
[Unit]
Description=ZAU Framework ASGI Production Cluster
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/zau-app
Environment="PATH=/var/www/zau-app/.venv/bin"
Environment="ZAU_ENV=production"
ExecStart=/var/www/zau-app/.venv/bin/gunicorn     -w 4     -k uvicorn.workers.UvicornWorker     backend.app:app     --bind 127.0.0.1:8000

Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now zau
sudo systemctl status zau
```

#### Step 3: Nginx Reverse Proxy (`/etc/nginx/sites-available/zau`)

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    # Aggressive 3D asset caching (30 days)
    location ~* \.(glb|gltf|bin|draco)$ {
        root /var/www/zau-app/model/3d;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Proxy to ASGI Server with WebSocket support
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
        proxy_read_timeout 86400;
    }
}
```

Enable site and acquire SSL certificate:

```bash
sudo ln -s /etc/nginx/sites-available/zau /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d example.com -d www.example.com
```

---

### Target 4: Render Cloud (Infrastructure-as-Code)

Deploy seamlessly using `render.yaml`:

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

### Target 5: Fly.io

Global edge deployment with persistent volumes:

```bash
fly launch --no-deploy
fly volumes create zau_data --size 10 --region sin
fly deploy
```

---

## 7. CLI Command Reference

```bash
# Project Management
zau create <app-name> --template <template>   # Scaffold new project
zau dev --port 8000                         # Start dev server with HMR
zau build                                   # Compile production bundle
zau start --workers 4 --port 8000           # Launch multi-worker cluster

# Database ORM & Migrations
zau db init                                 # Initialize migration repository
zau db migrate -m "migration_name"          # Detect models & generate migration
zau db upgrade                              # Apply pending migrations
zau db downgrade                            # Roll back single migration step
zau db studio --port 8010                   # Launch ZAU DB Studio inspector

# 3D Spatial Asset Pipeline
zau 3d list                                 # List 3D models and vertex metrics
zau 3d optimize path/to/model.glb           # Compress geometry using Draco
zau 3d inspect path/to/model.glb            # Inspect node graph & materials

# Syntax & Highlighting
zau highlight path/to/file.zau --ansi       # Colorized terminal output
zau highlight path/to/file.zau --html       # Generate semantic HTML tokens
```

---

## 8. Multi-Editor & LSP Support

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
Install the `.vsix` package:
```bash
code --install-extension dist/extensions/zau-1.0.5.vsix
```

### 2. Neovim
Add to `init.lua`:
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

### 3. Zed Editor, Sublime Text, & IntelliJ
Grammar bundles are automatically compiled in `packages/vscode-zau/syntaxes/`.

---

## 9. Governance, License & Acknowledgements

- **Chief Architect & Project Lead**: **ZetaGo-Aurum**
- **Official Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Contact**: `admin@zetagoaurum.com`
- **License**: [MIT License](LICENSE)
- **3D Spatial Showcase Model**: *The Great Drawing Room* by **The Hallwyl Museum** ([Sketchfab](https://sketchfab.com/TheHallwylMuseum)), licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

---

<div align="center">
  <p><strong>ZAU Framework</strong> &mdash; Built by ZetaGo-Aurum.</p>
  <p><small>&copy; 2026 ZetaGo-Aurum. All rights reserved.</small></p>
</div>
