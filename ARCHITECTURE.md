# ZAU Framework: System Architecture & Engineering Internals

## Architectural Overview

ZAU Framework is architected around the **Dual-Tier Unified Engine** model, combining high-throughput asynchronous Python (ASGI) on the server tier with a declarative reactive runtime and native WebGL 3D spatial subsystem on the client tier.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Tier                            │
│  - Reactivity Signals Runtime (@zau/core)                   │
│  - Native 3D Spatial Canvas (<ZAU.Canvas3D> / Three.js)     │
│  - Dual Asset Pipeline (Tailwind Atomic + Bootstrap Grid)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
               High-Speed JSON-RPC & WebSocket
                               │
┌──────────────────────────────┴──────────────────────────────┐
│                      Server Tier                            │
│  - ASGI Micro-kernel (Starlette / uvloop)                   │
│  - Server Actions Dispatcher (@app.action)                  │
│  - Type Generation Bridge (Python hints -> zau-api.d.ts)    │
│  - Native Asynchronous ORM (SQLAlchemy 2.0 / aiosqlite)     │
│  - Built-in Schema Studio & Inspector                       │
└─────────────────────────────────────────────────────────────┘
```

## 1. Asynchronous ASGI Micro-kernel

The server is powered by `zau.core.ZAUApp`. Built directly atop Starlette and uvloop:
- **Server Actions**: `@app.action(path)` registers RPC endpoints that auto-resolve dependency injection (`Depends(get_session)`), type-validate request bodies, and automatically serialize Python dicts, Pydantic objects, and ZAU ORM `Model` instances into JSON.
- **WebSocket Spatial Sync**: `@app.websocket(path)` provides bidirectional synchronization for real-time 3D camera transforms, object rotation, and multi-user spatial presence.
- **Live Bridge**: Exposes `/__zau/types.d.ts` directly over HTTP, allowing frontend builds to consume strongly-typed API contracts generated directly from Python function signatures.

## 2. Native Database Layer (ZAU ORM)

Located in `zau.db`, the database engine provides:
- **Zero-Config Development**: Defaults to `sqlite+aiosqlite:///dev.db` with connection pooling and asynchronous thread safety.
- **One-Line Production Switch**: Switching to PostgreSQL or MySQL requires only changing `DATABASE_URL` (`postgresql+asyncpg://user:pass@host/db`).
- **Intuitive Declarative Models**:
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
      projects: List["Project"] = Relationship(back_populates="owner")
  ```
- **ZAU DB Studio**: Built-in interactive database inspector at `/__zau/studio` offering real-time table queries, record inspection, and SQL execution.

## 3. Native 3D Spatial Canvas

Unlike frameworks that treat 3D rendering as third-party wrappers requiring extensive boilerplate:
- `<ZAU.Canvas3D>` is a first-class declarative component in `.zau` Single File Components.
- Integrates Three.js WebGL/WebGPU render loops with delta time tracking and automatic canvas resizing.
- Includes built-in `<ZAU.AmbientLight>`, `<ZAU.DirectionalLight>`, `<ZAU.OrbitControls>`, and `<ZAU.Model>` loaders for `.gltf` and `.glb` assets.

## 4. Dual-Asset Styling Pipeline

ZAU solves frontend design fragmentation by providing a unified adapter:
- **Tailwind CSS**: Instant atomic utility classes for micro-layout, typography, and hover transitions.
- **Bootstrap 5.3**: Grid layout (`container`, `row`, `col-*`), badges, and structural components.
- Zero bundle collision: Utility classes and Bootstrap CSS namespaces operate harmoniously.

## 5. Deployment Topology

ZAU produces unified production artifacts:
- **Vercel**: Native serverless routing through `vercel.json` and ASGI handlers.
- **Render**: Infrastructure-as-code via `render.yaml`.
- **Replit**: Cloud development and deployment configuration via `.replit`.
- **Docker**: Multi-stage lightweight production container (`python:3.12-slim`).
