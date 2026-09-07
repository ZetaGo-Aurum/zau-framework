# create-zau

<div align="center">

```
  ███████╗ █████╗ ██╗   ██╗
  ╚══███╔╝██╔══██╗██║   ██║
    ███╔╝ ███████║██║   ██║
   ███╔╝  ██╔══██║██║   ██║
  ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ 
```

### Official Project Scaffolding CLI for ZAU Framework
**Python ASGI Backend &middot; Native 3D Spatial Canvas &middot; Async ORM &middot; Dual-Asset Engine**

<p align="center">
  <a href="https://www.npmjs.com/package/create-zau"><img src="https://img.shields.io/npm/v/create-zau.svg?color=38bdf8&label=create-zau&logo=npm" alt="NPM Version" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zau-framework.vercel.app"><img src="https://img.shields.io/badge/live-docs-black.svg?logo=vercel" alt="Live Documentation" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> &bull;
  <a href="#templates">Templates</a> &bull;
  <a href="#project-structure">Structure</a> &bull;
  <a href="#workflow">Workflow</a> &bull;
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

## Quickstart

Bootstrap a new fullstack ZAU application in seconds:

```bash
# Using npm
npm create zau@latest my-app

# Using npx
npx create-zau my-app

# Using pnpm
pnpm create zau my-app

# Using yarn
yarn create zau my-app

# Using bun
bun create zau my-app
```

---

## Templates

`create-zau` includes 4 production-grade templates tailored for diverse engineering workloads:

| Template | Architecture & Included Stack | Recommended Use Cases |
| :--- | :--- | :--- |
| **`fullstack-3d`** *(Default)* | Python ASGI (Starlette/uvloop) + Native Three.js r160 3D Canvas + Async ORM + Tailwind CSS & Bootstrap tokens. | 3D e-commerce, digital twins, spatial showrooms, WebGL games, interactive product viewers. |
| **`minimal`** | Lightweight Python ASGI service with minimal Single-File Component frontend and zero 3D dependencies. | Microservices, rapid proof-of-concepts, REST/RPC endpoints with lightweight UI. |
| **`dashboard`** | Tabular data grids, real-time metrics telemetry, charting integration, and built-in ZAU DB Studio. | Enterprise administrative portals, observability hubs, telemetry dashboards. |
| **`portfolio`** | Spatial showroom with cinematic orbital controls, PBR illumination, and Seated POV camera presets. | Architecture atelier, virtual gallery, personal engineering showcase. |

---

## Project Structure

A scaffolded ZAU project follows an organized, modular topology:

```
my-app/
├── api/
│   └── index.py             # Serverless ASGI bridge (Vercel / Cloud Functions)
├── backend/
│   ├── app.py               # ZAUApp instantiation, ASGI routes & Server Actions
│   └── database/            # Declarative ORM models & database migrations
├── frontend/
│   ├── components/          # UI and 3D spatial components (.zau / .tsx)
│   ├── pages/               # Application routes and views
│   └── styles/              # Tailwind CSS and Bootstrap style configurations
├── model/
│   └── 3d/                  # 3D spatial assets (GLTF/GLB Draco & textures)
├── public/                  # Public static browser assets
├── Dockerfile               # Production multi-stage OCI container
├── docker-compose.yml       # Local development cluster (App + Postgres + Redis)
├── package.json             # Node.js dependencies and workspace scripts
├── pyproject.toml           # Python package configuration
├── render.yaml              # Render Cloud deployment blueprint
├── requirements.txt         # Python dependencies (Starlette, uvicorn, pydantic)
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel serverless edge rewrite rules
└── zau.config.py            # Master ZAU server configuration (Port, CORS, DB)
```

---

## Workflow

After project creation:

```bash
# 1. Navigate into project
cd my-app

# 2. Setup Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# 3. Install dependencies
pip install -r requirements.txt
npm install

# 4. Start local development server (ASGI + HMR)
zau dev --port 8000
```

Access the application at `http://localhost:8000`.

---

## Deployment

- **Vercel (Serverless Edge + ASGI)**: `npx vercel --prod --yes`
- **Docker Production Container**: `docker compose up -d --build`
- **Render Cloud**: Connect GitHub repository (automatically detected via `render.yaml`).

---

## 🇮🇩 Bahasa Indonesia

### Panduan Singkat Scaffolding
`create-zau` adalah alat baris perintah (CLI) resmi untuk menginisialisasi project baru berbasis **ZAU Framework**.

### Menjalankan Scaffolding
```bash
npm create zau@latest my-app
cd my-app
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
npm install
zau dev --port 8000
```

### 4 Template Resmi
1. **`fullstack-3d`**: Python ASGI + Three.js 3D Spatial Canvas + Async ORM + Tailwind & Bootstrap.
2. **`minimal`**: Backend ASGI ringan + komponen UI minimal tanpa dependensi 3D.
3. **`dashboard`**: Panel admin enterprise dengan data grid dan integrasi ZAU DB Studio.
4. **`portfolio`**: Showcase atelier mewah dengan kamera 3D interaktif.

---

## License & Governance

- **Chief Architect**: **ZetaGo-Aurum**
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Contact**: `admin@zetagoaurum.com`
- **License**: MIT License
