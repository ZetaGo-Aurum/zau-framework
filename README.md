# ZAU Framework

<div align="center">
  <h3>ZetaGo-Aurum Unified Fullstack Web Framework</h3>
  <p><strong>Python-First ASGI Core &middot; Native 3D Spatial Canvas &middot; Dual-Asset Engine</strong></p>
  <p>
    <a href="https://zetagoaurum.com">Web Atelier: zetagoaurum.com</a> &middot;
    <a href="mailto:admin@zetagoaurum.com">Contact: admin@zetagoaurum.com</a>
  </p>
</div>

---

## Executive Summary

Modern web development has suffered from extreme toolchain fragmentation: disparate bundlers, convoluted state managers, conflicting CSS abstractions, and high runtime latency. **ZAU (ZetaGo-Aurum Unified)** introduces an integrated, industrial-grade architecture that bridges high-performance asynchronous Python on the server with a reactive client runtime, native declarative WebGL 3D spatial primitives, and an effortless dual-styling pipeline.

### Architectural Core Decisions (RFC-001)

| Dimension | Engine | Specification & Rationale |
| :--- | :--- | :--- |
| **Server Engine** | **Python ASGI (FastAPI / Starlette)** | Asynchronous uvloop kernel, Pydantic v2 validation, zero-config Server Actions RPC. |
| **3D Spatial Canvas** | **Native `<ZAU.Canvas3D>`** | Declarative WebGL/Three.js render loop embedded directly in component lifecycles. |
| **Database Subsystem** | **Async ORM + Migrations** | Embedded SQLite for instant development, 1-line connection string for PostgreSQL / MySQL. |
| **Dual Asset Pipeline**| **Tailwind CSS + Bootstrap 5.3** | Atomic utility classes for precision micro-layout paired with Bootstrap component tokens. |
| **Component Format** | **`.zau` Single File Components**| Unified `<template>`, `<script lang="ts">`, `<style>`, with native syntax interpreter. |

---

## Architecture Topology

```
// ZAU DUAL-TIER UNIFIED ARCHITECTURE
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

---

## Quick Start

### 1. Scaffolding via NPM / NPX
```bash
# Initialize a new project with interactive template selector
npm create zau@latest my-app

cd my-app
zau dev --port 8000
```

### 2. Scaffolding via Python / Pip
```bash
# Install ZAU framework core
pip install zau-framework

# Scaffold project
zau create my-app --template fullstack-3d

cd my-app
zau dev
```

---

## Core Modules & Code Examples

### 1. Native Database ORM (`backend/database/models/user.py`)
```python
from zau.db import Model, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(Model, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, max_length=50)
    email: str = Field(unique=True, index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Automatic relationship resolution
    projects: List["Project"] = Relationship(back_populates="owner")

class Project(Model, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=100)
    model_3d_url: str = Field(description="Path to GLTF 3D Asset")
    owner_id: int = Field(foreign_key="users.id")
    owner: Optional[User] = Relationship(back_populates="projects")
```

### 2. Server Action RPC & WebSocket (`backend/app.py`)
```python
from zau import ZAUApp, Depends
from zau.db import get_session, AsyncSession, select
from backend.database.models.user import Project, User
from typing import List

app = ZAUApp(
    title="ZAU Production Suite",
    version="1.0.0",
    client_dir="../frontend"
)

# RPC action directly invokable by client runtime
@app.action("/api/projects/list")
async def list_projects(
    limit: int = 10, 
    session: AsyncSession = Depends(get_session)
) -> List[dict]:
    statement = select(Project).limit(limit)
    result = await session.execute(statement)
    projects = result.scalars().all()
    return [p.to_dict() for p in projects]

# Bidirectional real-time spatial transforms
@app.websocket("/ws/spatial-sync")
async def spatial_sync(ws):
    await ws.accept()
    while True:
        data = await ws.receive_json()
        await app.broadcast_json({"user": data["user"], "transform": data["transform"]})
```

### 3. Native 3D Spatial Canvas (`frontend/components/spatial/Viewer3D.zau`)
```html
<template>
  <ZAU.Canvas3D 
     shadows 
     camera={{ position: [0, 2, 5], fov: 60 }} 
     className="w-full h-96 rounded-2xl bg-neutral-900 border border-neutral-800"
  >
    <ZAU.AmbientLight intensity={0.6} />
    <ZAU.DirectionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
    <ZAU.OrbitControls enableZoom={true} autoRotate={!hovered} />
    
    <ZAU.Model 
       src={modelPath} 
       position={[0, 0, 0]} 
       rotation={[rotation.x, rotation.y, rotation.z]} 
       scale={hovered ? 1.1 : 1.0}
       onPointerEnter={() => setHovered(true)}
       onPointerLeave={() => setHovered(false)}
       fallback={<ZAU.Spinner3D label="Loading 3D Object..." />}
    />
  </ZAU.Canvas3D>
</template>

<script lang="ts">
import { ZAU, useState, useFrame } from '@zau/core';

export default function Viewer3D({ modelPath, initialSpeed = 1.0 }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [hovered, setHovered] = useState(false);

  // Native 60FPS / 120FPS animation frame hook
  useFrame((state, delta) => {
    setRotation(prev => ({ ...prev, y: prev.y + (delta * initialSpeed) }));
  });

  return { rotation, hovered, setHovered };
}
</script>
```

### 4. Dual Asset Styling Interoperability (`frontend/pages/index.zau`)
```html
<template>
  <!-- Bootstrap container and grid + Tailwind atomic utility classes -->
  <div class="container py-5">
    <header class="row mb-4 items-center">
      <div class="col-md-8">
        <h1 class="display-4 font-bold tracking-tight text-gray-900 dark:text-white">
          ZAU Unified Dashboard
        </h1>
        <p class="lead text-muted">
          Spatial web computing & database server control center.
        </p>
      </div>
      <div class="col-md-4 text-md-end">
        <button class="btn btn-dark px-4 py-2 hover:scale-105 transition-transform shadow-md"
                @click="refreshData">
          Sync Database
        </button>
      </div>
    </header>

    <main class="row g-4">
      <div class="col-lg-7">
        <Viewer3D modelPath="/models/cyber_core.glb" />
      </div>
      <div class="col-lg-5">
        <div class="card shadow-sm border-0 rounded-2xl p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
          <h3 class="text-xl font-semibold mb-3 border-b pb-2">Status Server</h3>
          <div class="flex items-center justify-between py-2">
            <span class="badge bg-success">Python ASGI Active</span>
            <span class="text-sm text-gray-500 font-mono">Latency: 3.8ms</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
```

---

## .zau Syntax Highlighter & Interpreter

The ZAU Framework includes a custom lexical analyzer and token-level interpreter for `.zau` files. Rather than displaying monochromatic text, `.zau` components are colorized with semantically mapped token classes:
- **Spatial Primitives**: `<ZAU.Canvas3D>`, `<ZAU.Model>`, `<ZAU.AmbientLight>`
- **Directives**: `@click`, `:bind`, `v-model`
- **Script Keywords & Functions**: `useState`, `useFrame`, `import`, `export`, `async`, `await`
- **Output Formats**: Rich HTML with semantic CSS and high-contrast terminal ANSI escape codes (`zau highlight <file.zau>`).

VS Code language support is packaged in `packages/vscode-zau/`.

---

## ZAU DB Studio

Run `zau db studio` to launch the built-in database inspector:
- Inspect tables, column schemas, and foreign keys.
- Real-time row querying and JSON data inspection.
- Execute raw SQL queries directly inside an obsidian-and-gold interface.
- Mountable inside any ZAU application at `/__zau/studio`.

---

## CLI Command Reference

```bash
# Scaffold application
zau create <app-name> --template [fullstack-3d | minimal | dashboard | portfolio]

# Development server (Python ASGI + Hot Reload + 3D Preview)
zau dev --port 8000

# Database migrations & studio
zau db migrate -m "add_user_table"
zau db upgrade
zau db studio --port 8010

# Production build & multi-worker cluster
zau build
zau start --workers 4

# 3D spatial asset pipeline
zau 3d list

# Syntax highlighter
zau highlight path/to/component.zau --ansi
zau highlight path/to/component.zau --html
```

---

## Multi-Platform Cloud Deployment

ZAU provides zero-configuration deployment templates for leading platforms:

- **Vercel**: Native serverless routing through `vercel.json` and ASGI handlers (`api/index.py`).
- **Render**: Infrastructure-as-code via `render.yaml` with managed PostgreSQL databases.
- **Replit**: Rapid cloud development via `.replit`.
- **Docker**: Multi-stage production container (`python:3.12-slim`).

---

## Project Governance & Author

- **Chief Architect & Project Lead**: **ZetaGo-Aurum**
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Contact**: `admin@zetagoaurum.com`
- **License**: MIT License (see `LICENSE`)
- **3D Spatial Showcase Model**: The Great Drawing Room by **The Hallwyl Museum** ([Sketchfab](https://sketchfab.com/TheHallwylMuseum)), licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

