'use client';

import React, { useState } from 'react';

interface DocumentationProps {
  lang?: 'en' | 'id';
  onToggleLang?: (newLang: 'en' | 'id') => void;
}

export default function Documentation({ lang = 'en', onToggleLang }: DocumentationProps) {
  const [activeInstallTab, setActiveInstallTab] = useState<'npm' | 'pip' | 'cli'>('npm');
  const [activeTemplateTab, setActiveTemplateTab] = useState<'fullstack-3d' | 'minimal' | 'dashboard' | 'portfolio'>('fullstack-3d');
  const [activeDeployTab, setActiveDeployTab] = useState<'vercel' | 'docker' | 'vps' | 'render' | 'flyio'>('vercel');
  const [activeEditorTab, setActiveEditorTab] = useState<'vscode' | 'neovim' | 'zed' | 'sublime' | 'intellij'>('vscode');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isEn = lang === 'en';

  return (
    <div className="space-y-24 py-12">
      {/* On-Page Language Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl glass-panel-subtle border border-amber-500/25 bg-zinc-950/60">
        <div className="flex items-center space-x-2.5 text-xs font-mono">
          <i className="bi bi-translate text-amber-400 text-base" />
          <span className="text-zinc-300 font-semibold">
            {isEn ? 'Documentation Language:' : 'Bahasa Dokumentasi:'}
          </span>
          <span className="text-amber-400 font-bold uppercase">
            {isEn ? 'English (Default)' : 'Bahasa Indonesia'}
          </span>
        </div>
        {onToggleLang && (
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1 rounded-lg transition font-semibold ${
                isEn
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onToggleLang('id')}
              className={`px-3 py-1 rounded-lg transition font-semibold ${
                !isEn
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Bahasa Indonesia
            </button>
          </div>
        )}
      </div>

      {/* SECTION 1: RFC-001 ARCHITECTURE */}
      <section id="architecture" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-diagram-3" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'RFC-001 Unified Architecture Specification' : 'Spesifikasi Arsitektur Terpadu RFC-001'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Enterprise Python-First ASGI Core with Modular Client Code Splitting'
                : 'Inti ASGI Python Enterprise dengan Pemisahan Skrip Klien Modular'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">LAYER 01</span>
              <i className="bi bi-cpu text-xl text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Python ASGI Kernel</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isEn
                ? 'Powered by Starlette and Uvicorn. Implements asynchronous Server Action RPC, dependency injection, and zero-boilerplate JSON serialization.'
                : 'Ditenagai oleh Starlette dan Uvicorn. Mengimplementasikan Server Action RPC asinkron, injeksi dependensi, dan serialisasi JSON nir-boilerplate.'}
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• {isEn ? 'Starlette / FastAPI-grade throughput' : 'Throughput setara Starlette / FastAPI'}</li>
              <li>• {isEn ? 'Async WebSocket multi-client sync' : 'Sinkronisasi multi-klien WebSocket asinkron'}</li>
              <li>• {isEn ? 'Declarative dependency injection' : 'Injeksi dependensi deklaratif'}</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">LAYER 02</span>
              <i className="bi bi-box-seam text-xl text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Next.js Client Chunking</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isEn
                ? 'Client scripts are automatically divided into modular chunks (webpack, main-app, runtime). View-source displays authentic clean script tags.'
                : 'Skrip klien dibagi otomatis ke dalam chunk modular (webpack, main-app, runtime). View-source menampilkan tag skrip bersih dan autentik.'}
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• <code>/_next/static/chunks/</code> bundling</li>
              <li>• {isEn ? 'Zero monolithic HTML clutter' : 'Tanpa kekacauan HTML monolitik'}</li>
              <li>• {isEn ? 'Dynamic hydration & module preload' : 'Hidrasi dinamis & preload modul'}</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">LAYER 03</span>
              <i className="bi bi-compass text-xl text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">3D Spatial Pipeline</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isEn
                ? 'Native ingestion for model/3d/ GLTF, OBJ, and binary buffers with Dual-Tier Progressive LOD and Android GPU memory safety.'
                : 'Ingesti native untuk buffer GLTF, OBJ, dan biner model/3d/ dengan Dual-Tier Progressive LOD dan proteksi memori GPU Android.'}
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• Three.js r160 WebGL engine</li>
              <li>• {isEn ? 'Instant Frame 0 paint (664 KB Draco)' : 'Render kilat Frame 0 (664 KB Draco)'}</li>
              <li>• {isEn ? '8K Desktop / 4K Mobile auto-tiering' : 'Auto-tiering 8K Desktop / 4K Mobile'}</li>
            </ul>
          </div>
        </div>

        {/* INSTALLATION & PROJECT CREATION TUTORIAL */}
        <div className="mt-8 p-6 rounded-3xl glass-panel border border-amber-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <i className="bi bi-play-circle-fill" />
                <span>{isEn ? 'Quickstart & Installation Tutorial' : 'Panduan Cepat & Tutorial Pemasangan'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {isEn ? 'Project Installation & Initialization Guide' : 'Panduan Instalasi & Pembuatan Project Baru'}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              {[
                { id: 'npm', label: 'NPM / NPX (CLI)', icon: 'bi-box-seam' },
                { id: 'pip', label: 'Python Pip', icon: 'bi-filetype-py' },
                { id: 'cli', label: isEn ? 'Git Monorepo' : 'Klon Git', icon: 'bi-git' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInstallTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center space-x-1.5 ${
                    activeInstallTab === tab.id
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-gold-glow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <i className={`bi ${tab.icon}`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Command Box */}
          <div className="relative">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-amber-300 overflow-x-auto">
              {activeInstallTab === 'npm' && (
                <pre>{isEn ? `# 1. Interactive project scaffolding via npm
npm create zau@latest my-app

# 2. Enter project directory & activate Python virtual environment
cd my-app
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 3. Install dependencies & start the development server
pip install -r requirements.txt
npm install
zau dev --port 8000` : `# 1. Scaffolding project interaktif via npm
npm create zau@latest my-app

# 2. Masuk ke direktori project & aktifkan Python venv
cd my-app
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 3. Pasang dependensi & jalankan development server
pip install -r requirements.txt
npm install
zau dev --port 8000`}</pre>
              )}
              {activeInstallTab === 'pip' && (
                <pre>{isEn ? `# 1. Install core ZAU framework via pip
pip install zau-framework

# 2. Bootstrap new project via zau CLI
zau create my-app --template fullstack-3d

# 3. Enter & install client dependencies
cd my-app
npm install
zau dev --port 8000` : `# 1. Pasang paket core ZAU via pip
pip install zau-framework

# 2. Buat project baru melalui zau CLI
zau create my-app --template fullstack-3d

# 3. Masuk & pasang dependensi frontend
cd my-app
npm install
zau dev --port 8000`}</pre>
              )}
              {activeInstallTab === 'cli' && (
                <pre>{isEn ? `# 1. Clone official ZAU Monorepo
git clone https://github.com/ZetaGo-Aurum/zau-framework.git
cd zau-framework

# 2. Install workspace dependencies
python3 -m venv .venv && source .venv/bin/activate
pip install -e .
npm install
npm run dev` : `# 1. Clone repositori resmi ZAU Monorepo
git clone https://github.com/ZetaGo-Aurum/zau-framework.git
cd zau-framework

# 2. Pasang dependensi monorepo
python3 -m venv .venv && source .venv/bin/activate
pip install -e .
npm install
npm run dev`}</pre>
              )}
            </div>
            <button
              onClick={() => copyToClipboard(
                activeInstallTab === 'npm'
                  ? 'npm create zau@latest my-app && cd my-app && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && npm install && zau dev'
                  : activeInstallTab === 'pip'
                  ? 'pip install zau-framework && zau create my-app --template fullstack-3d && cd my-app && npm install && zau dev'
                  : 'git clone https://github.com/ZetaGo-Aurum/zau-framework.git && cd zau-framework && npm install && npm run dev',
                'install-cmd'
              )}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs flex items-center space-x-1 font-mono transition"
            >
              <i className={`bi ${copiedCode === 'install-cmd' ? 'bi-check-lg text-emerald-400' : 'bi-clipboard'}`} />
              <span>{copiedCode === 'install-cmd' ? (isEn ? 'Copied' : 'Tersalin') : (isEn ? 'Copy' : 'Salin')}</span>
            </button>
          </div>

          {/* Template Matrix Selector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                {isEn
                  ? 'Built-In Template Architectures (4 Official Options):'
                  : 'Pilihan Arsitektur Template Bawaan (4 Pilihan Resmi):'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: 'fullstack-3d',
                  title: 'fullstack-3d',
                  badge: isEn ? 'Flagship' : 'Unggulan',
                  badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  desc: isEn
                    ? 'Python ASGI + 3D Spatial Three.js + Async ORM + Tailwind/Bootstrap.'
                    : 'Python ASGI + 3D Spatial Three.js + Async ORM + Tailwind/Bootstrap.',
                  specs: ['WebGL Three.js r160', 'Draco Mesh LOD', 'Starlette/uvloop', 'ZAU DB Studio']
                },
                {
                  id: 'minimal',
                  title: 'minimal',
                  badge: isEn ? 'Ultra-Lean' : 'Ultra-Ringan',
                  badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                  desc: isEn
                    ? 'Lightweight Python Starlette core + Single-File Component with zero 3D overhead.'
                    : 'Python Starlette ringan + Single-File Component tanpa dependensi 3D.',
                  specs: ['Zero overhead', 'Fast cold start', 'REST/RPC Ready', 'Tailwind Atomic']
                },
                {
                  id: 'dashboard',
                  title: 'dashboard',
                  badge: 'Enterprise',
                  badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
                  desc: isEn
                    ? 'Operational analytics control panel, real-time metrics cards, and database integration.'
                    : 'Panel kontrol analitik, kartu metrik real-time, dan integrasi database.',
                  specs: ['Chart telemetry', 'Data table grid', 'Session security', 'Auto migrations']
                },
                {
                  id: 'portfolio',
                  title: 'portfolio',
                  badge: 'Luxury Atelier',
                  badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  desc: isEn
                    ? 'High-end 3D spatial showcase with cinematic camera orbits and Seated POV.'
                    : 'Showcase 3D spasial kelas atas dengan kamera sinematik & Seated POV.',
                  specs: ['3D Room Showcase', 'Seated POV Mode', 'PBR Lighting', 'Audio Ambience']
                }
              ].map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setActiveTemplateTab(tmpl.id as any)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    activeTemplateTab === tmpl.id
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-gold-glow'
                      : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-white">{tmpl.title}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}>
                        {tmpl.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{tmpl.desc}</p>
                  </div>
                  <ul className="text-[10px] font-mono text-zinc-500 space-y-1 pt-2 border-t border-zinc-800/60">
                    {tmpl.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <i className="bi bi-check2 text-amber-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PYTHON ASGI ENGINE */}
      <section id="asgi-core" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-cpu" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Python ASGI Engine & RPC Actions' : 'Engine ASGI Python & RPC Actions'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Type-Safe Communication Between Python Backend and Client Viewports'
                : 'Komunikasi Tipe-Aman Antara Backend Python dan Viewport Klien'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {isEn
              ? <>ZAU eliminates the traditional gap between backend APIs and frontend client components. Using the <code className="text-amber-400 font-mono">@app.action</code> decorator, any asynchronous Python function is exposed as an end-to-end type-safe RPC procedure.</>
              : <>ZAU menjembatani batasan tradisional antara API backend dan komponen klien frontend. Menggunakan dekorator <code className="text-amber-400 font-mono">@app.action</code>, setiap fungsi Python asinkron diekspos sebagai prosedur RPC berorientasi tipe ujung-ke-ujung.</>}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400 font-bold block mb-2">
                {isEn ? 'Backend Implementation (main.py)' : 'Implementasi Backend (main.py)'}
              </span>
              <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`from zau import ZAUApp

app = ZAUApp()

@app.action("analytics.track")
async def track_viewpoint(coords: list[float]):
    # Type-safe execution directly from client
    await app.db.execute(
        "INSERT INTO telemetry (camera_x, camera_y, camera_z) VALUES (?, ?, ?)",
        coords
    )
    return {"status": "recorded", "origin": "web_client"}`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-sky-400 font-bold block mb-2">
                {isEn ? 'Client Dispatch (zau.client.ts)' : 'Pemanggilan Klien (zau.client.ts)'}
              </span>
              <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`import { createClient } from 'zau-framework';

const client = createClient();

// Invokes the Python backend action over ASGI RPC
const result = await client.actions.call('analytics.track', [
  -1.24, 1.18, 1.45
]);

console.log('Telemetry ACK:', result.status);`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ASYNC ORM */}
      <section id="async-orm" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-database" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Declarative Async ORM & State Signals' : 'ORM Asinkron Deklaratif & Sinyal State'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'High-Speed Persistence Layer Supporting SQLite, PostgreSQL, and In-Memory Drivers'
                : 'Lapisan Persistensi Berkecepatan Tinggi Mendukung SQLite, PostgreSQL, dan Driver In-Memory'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {isEn
              ? 'Database models in ZAU are declared with pure Python dataclasses and Pydantic v2 schemas. Migrations are calculated atomically and executed with zero application downtime.'
              : 'Model database dalam ZAU dideklarasikan dengan dataclass Python murni dan skema Pydantic v2. Migrasi dikalkulasi secara atomik dan dieksekusi tanpa downtime aplikasi.'}
          </p>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`from zau.orm import Model, Field

class SpatialHotspot(Model):
    __tablename__ = "spatial_hotspots"

    id: str = Field(primary_key=True)
    title: str = Field(index=True)
    category: str
    coords_x: float
    coords_y: float
    coords_z: float
    is_active: bool = Field(default=True)`}
            </pre>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3D SPATIAL CANVAS & PROGRESSIVE LOD */}
      <section id="spatial-3d" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-box" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? '3D Spatial Canvas & Dual-Tier Progressive LOD' : '3D Spatial Canvas & Dual-Tier Progressive LOD'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Photogrammetry Ingestion with Zero Blackscreen and Android GPU Memory Safety'
                : 'Ingesti Fotogrametri Bebas Blackscreen dengan Proteksi Memori GPU Android'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {isEn
              ? 'The ZAU 3D Spatial Engine resolves two fundamental limitations of WebGL web rendering: first-frame blackscreen latency and mobile GPU memory exhaustion. Rather than forcing clients to wait for multi-megabyte 8K geometry, ZAU renders an ultra-compact Draco low-poly mesh on Frame 0, then background-streams high-poly geometry tailored to the client GPU memory tier.'
              : 'Engine 3D Spatial ZAU menyelesaikan dua keterbatasan mendasar rendering WebGL pada web: latensi blackscreen pada frame pertama dan kehabisan memori GPU perangkat mobile. Dibandingkan memaksa klien menunggu unduhan geometri besar, ZAU merender mesh Draco low-poly ringan pada Frame 0, lalu melakukan streaming geometri high-poly di latar belakang sesuai tier memori GPU perangkat.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400 font-bold">TIER 0: FRAME 0</span>
              <h4 className="font-bold text-sm text-white mt-1">
                {isEn ? 'Instant Low-Poly Paint' : 'Render Kilat Low-Poly'}
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                {isEn
                  ? '664 KB Draco mesh decodes in < 20ms. The 3D chamber is immediately visible and interactive before high-res assets finish downloading.'
                  : 'Mesh Draco 664 KB didekode dalam < 20ms. Ruang 3D langsung terlihat dan interaktif sebelum aset resolusi tinggi selesai diunduh.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-sky-400 font-bold">TIER 1A: ANDROID / MOBILE</span>
              <h4 className="font-bold text-sm text-white mt-1">
                {isEn ? '4K GPU Memory Guard' : 'Proteksi Memori GPU 4K'}
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                {isEn
                  ? '6.67 MB total package with 4096px texture ceiling. Conserves ~270 MB VRAM, preventing mobile browser crashes, GC stalls, and frame stutter.'
                  : 'Total 6.67 MB dengan batas tekstur 4096px. Menghemat ~270 MB VRAM, mencegah crash browser ponsel, GC stall, dan stutter frame.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-emerald-400 font-bold">TIER 1B: DESKTOP MASTER</span>
              <h4 className="font-bold text-sm text-white mt-1">
                {isEn ? '8K PBR Master Render' : 'Render Master 8K PBR'}
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                {isEn
                  ? 'Full 8192x8192 photogrammetry resolution with 16x anisotropic filtering and ACES Filmic tone mapping for workstation GPUs.'
                  : 'Resolusi fotogrametri penuh 8192x8192 dengan filter anisotropik 16x dan pemetaan nada ACES Filmic untuk GPU desktop.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400 font-bold">CAMERA ANCHOR</span>
              <h4 className="font-bold text-sm text-white mt-1">
                {isEn ? 'Seated Viewpoint Pivot' : 'Titik Tumpu Kursi Seated'}
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                {isEn
                  ? 'Seated coordinates (-0.885, 1.15, 2.25) with target (-0.885, 0.70, 1.08), 70° FOV, and orbit clamping to prevent clipping through walls.'
                  : 'Koordinat duduk (-0.885, 1.15, 2.25) dengan target (-0.885, 0.70, 1.08), 70° FOV, dan pembatasan orbit agar kamera tidak menembus dinding.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: .ZAU LANGUAGE ECOSYSTEM & UNIVERSAL TOOLING */}
      <section id="zau-ecosystem" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-code-slash" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? '.zau Language Ecosystem & Universal Tooling' : 'Ekosistem Bahasa .zau & Universal Tooling'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Industry Standards: LSP 3.17, Multi-Editor Grammars, Browser Runtime, IANA Media Type, GitHub Linguist'
                : 'Standar Industri: LSP 3.17, Tata Bahasa Multi-Editor, Runtime Browser, IANA Media Type, GitHub Linguist'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-8">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {isEn
              ? <>The <code className="text-amber-400 font-mono">.zau</code> file format is a modern Single File Component (SFC) uniting 3D spatial WebGL viewport declarations, Python/TypeScript signal reactivity, and scoped styling into a cohesive, high-performance architectural standard.</>
              : <>Format file <code className="text-amber-400 font-mono">.zau</code> adalah Single File Component (SFC) modern yang menggabungkan deklarasi viewport WebGL spasial 3D, reaktivitas sinyal Python/TypeScript, dan styling terisolasi ke dalam satu standar arsitektur terpadu berkinerja tinggi.</>}
          </p>

          {/* Code Showcase .zau */}
          <div className="p-4 sm:p-6 rounded-2xl bg-zinc-950/80 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-mono text-zinc-400 ml-2">ChamberExperience.zau</span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
`<template>
  <div class="viewport-wrapper">
    <zau-canvas id="salt-tower-viewport" shadows>
      <!-- Declarative 3D Camera Configuration with Orbit Controls -->
      <zau-camera
        :position="[-0.885, 1.15, 2.25]"
        :target="[-0.885, 0.70, 1.08]"
        :fov="70"
      />
      <zau-light type="ambient" :intensity="1.25" />
      <zau-light type="directional" :position="[2, 6, -2]" :intensity="1.0" />
      <zau-model
        src="/model/3d/salt_tower/salt_tower_8k.glb"
        progressiveLOD="true"
        tier="auto"
        @load="onModelLoaded"
      />
      <!-- OrbitControls with anti-wall collision clamping: maxDistance 2.2m -->
      <zau-orbit-controls
        :target="[-0.885, 0.70, 1.08]"
        :maxDistance="2.2"
        :minDistance="0.15"
        :maxPolarAngle="1.69"
        enableDamping="true"
        :dampingFactor="0.05"
      />
    </zau-canvas>

    <div class="hud-overlay">
      <h1>{{ chamberTitle }}</h1>
      <button @click="toggleAutoRotate">Toggle Orbit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { signal } from 'zau-framework';

export default {
  setup() {
    const chamberTitle = signal('Tower of London - Salt Tower');
    const isRotating = signal(true);

    function onModelLoaded() {
      console.log('8K photogrammetry model refined successfully.');
    }

    function toggleAutoRotate() {
      isRotating.value = !isRotating.value;
    }

    return { chamberTitle, isRotating, onModelLoaded, toggleAutoRotate };
  }
};
</script>

<style scoped>
.viewport-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0a0b10;
}
.hud-overlay {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
}
</style>`,
                    'zau-sample'
                  )
                }
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 text-zinc-300 hover:text-white transition flex items-center space-x-1.5"
              >
                <i className={`bi ${copiedCode === 'zau-sample' ? 'bi-check2 text-emerald-400' : 'bi-clipboard'}`} />
                <span>{copiedCode === 'zau-sample' ? (isEn ? 'Copied' : 'Tersalin') : (isEn ? 'Copy .zau' : 'Salin .zau')}</span>
              </button>
            </div>

            <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`<template>
  <div class="viewport-wrapper">
    <zau-canvas id="salt-tower-viewport" shadows>
      <!-- ${isEn ? 'Declarative 3D Camera Configuration with Orbit Controls' : 'Konfigurasi Kamera 3D Deklaratif dengan Orbit Controls'} -->
      <zau-camera
        :position="[-0.885, 1.15, 2.25]"
        :target="[-0.885, 0.70, 1.08]"
        :fov="70"
      />
      <zau-light type="ambient" :intensity="1.25" />
      <zau-light type="directional" :position="[2, 6, -2]" :intensity="1.0" />
      <zau-model
        src="/model/3d/salt_tower/salt_tower_8k.glb"
        progressiveLOD="true"
        tier="auto"
        @load="onModelLoaded"
      />
      <!-- ${isEn ? 'OrbitControls with anti-wall collision clamping: maxDistance 2.2m' : 'OrbitControls dengan anti-wall clipping: maxDistance 2.2m'} -->
      <zau-orbit-controls
        :target="[-0.885, 0.70, 1.08]"
        :maxDistance="2.2"
        :minDistance="0.15"
        :maxPolarAngle="1.69"
        enableDamping="true"
        :dampingFactor="0.05"
      />
    </zau-canvas>

    <div class="hud-overlay">
      <h1>{{ chamberTitle }}</h1>
      <button @click="toggleAutoRotate">Toggle Orbit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { signal } from 'zau-framework';

export default {
  setup() {
    const chamberTitle = signal('Tower of London - Salt Tower');
    const isRotating = signal(true);

    function onModelLoaded() {
      console.log('8K photogrammetry model refined successfully.');
    }

    function toggleAutoRotate() {
      isRotating.value = !isRotating.value;
    }

    return { chamberTitle, isRotating, onModelLoaded, toggleAutoRotate };
  }
};
</script>

<style scoped>
.viewport-wrapper { position: relative; width: 100vw; height: 100vh; background: #0a0b10; }
.hud-overlay { position: absolute; top: 2rem; left: 2rem; z-index: 10; }
</style>`}
            </pre>
          </div>

          {/* Sub-Section: Multi-Editor Setup Tabs */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isEn ? 'Multi-Editor Support & Universal LSP (zau-lsp)' : 'Dukungan Multi-Editor & Universal LSP (zau-lsp)'}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {isEn
                ? 'Select your code editor to view industry-standard configuration:'
                : 'Pilih code editor Anda untuk melihat konfigurasi standar industri:'}
            </p>

            {/* Tab navigation */}
            <div className="flex flex-wrap gap-2 mb-4 border-b border-zinc-800 pb-3">
              {[
                { id: 'vscode', label: 'VS Code / VSCodium', icon: 'bi-code' },
                { id: 'neovim', label: 'Neovim (LSP)', icon: 'bi-terminal' },
                { id: 'zed', label: 'Zed Editor', icon: 'bi-lightning' },
                { id: 'sublime', label: 'Sublime Text', icon: 'bi-file-earmark-code' },
                { id: 'intellij', label: 'JetBrains / IntelliJ', icon: 'bi-box' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveEditorTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition flex items-center space-x-1.5 ${
                    activeEditorTab === tab.id
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-gold-glow'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <i className={`bi ${tab.icon}`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab contents */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs text-zinc-300">
              {activeEditorTab === 'vscode' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    {isEn
                      ? <>The official <strong>Zau Language</strong> extension is packaged in standard <code>.vsix</code> format for Visual Studio Code, Cursor, and Open VSX (VSCodium, Eclipse Theia).</>
                      : <>Ekstensi resmi <strong>Zau Language</strong> dipaketkan dalam format standar <code>.vsix</code> untuk Visual Studio Code, Cursor, dan Open VSX (VSCodium, Eclipse Theia).</>}
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{isEn ? `# 1. Install extension from VSIX binary package
code --install-extension dist/extensions/zau-1.0.5.vsix

# 2. Or install via Open-VSX (VSCodium)
codium --install-extension dist/extensions/zau-1.0.5.vsix` : `# 1. Install ekstensi dari binary paket VSIX
code --install-extension dist/extensions/zau-1.0.5.vsix

# 2. Atau install via Open-VSX (VSCodium)
codium --install-extension dist/extensions/zau-1.0.5.vsix`}
                  </pre>
                  <ul className="text-[11px] text-zinc-400 space-y-1">
                    <li>• {isEn ? 'Features: Semantic Tokens, Tag Autocomplete, Diagnostics, Formatter, Hover Cards' : 'Fitur: Semantic Tokens, Tag Autocomplete, Diagnostics, Formatter, Hover Cards'}</li>
                    <li>• Scope: <code>source.zau</code> | {isEn ? 'File Extension:' : 'Ekstensi Berkas:'} <code>.zau</code></li>
                  </ul>
                </div>
              )}

              {activeEditorTab === 'neovim' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    {isEn
                      ? <>Neovim integrates directly with <code>zau-lsp</code> via universal <code>--stdio</code> transport using <code>nvim-lspconfig</code>.</>
                      : <>Neovim terhubung langsung dengan <code>zau-lsp</code> melalui protokol universal <code>--stdio</code> via <code>nvim-lspconfig</code>.</>}
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{`-- ~/.config/nvim/after/plugin/zau.lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.zau_lsp then
  configs.zau_lsp = {
    default_config = {
      cmd = { 'zau-lsp', '--stdio' },
      filetypes = { 'zau' },
      root_dir = lspconfig.util.root_pattern('package.json', 'zau.config.py', '.git'),
    }
  }
end
lspconfig.zau_lsp.setup({})`}
                  </pre>
                </div>
              )}

              {activeEditorTab === 'zed' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    {isEn
                      ? 'Zed Editor configuration for native syntax grammar and language server integration:'
                      : 'Konfigurasi native Zed Editor untuk syntax grammar dan language server:'}
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{`// ~/.config/zed/settings.json
{
  "languages": {
    "ZAU": {
      "language_servers": ["zau-lsp"]
    }
  },
  "lsp": {
    "zau-lsp": {
      "binary": { "path": "zau-lsp", "arguments": ["--stdio"] }
    }
  }
}`}
                  </pre>
                </div>
              )}

              {activeEditorTab === 'sublime' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    {isEn
                      ? <>Sublime Text 3 &amp; 4 supports auto-generated YAML <code>.sublime-syntax</code> and the LSP package:</>
                      : <>Sublime Text 3 &amp; 4 mendukung format YAML <code>.sublime-syntax</code> yang dikonversi otomatis:</>}
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{isEn ? `# Copy syntax definition into Sublime User packages:
cp packages/vscode-zau/syntaxes/zau.sublime-syntax ~/.config/sublime-text/Packages/User/

# LSP Config (Preferences > Package Settings > LSP > Settings):
{
  "clients": {
    "zau-lsp": {
      "enabled": true,
      "command": ["zau-lsp", "--stdio"],
      "selector": "source.zau"
    }
  }
}` : `# Lokasi syntax definition di Sublime Packages:
cp packages/vscode-zau/syntaxes/zau.sublime-syntax ~/.config/sublime-text/Packages/User/

# LSP Config (Preferences > Package Settings > LSP > Settings):
{
  "clients": {
    "zau-lsp": {
      "enabled": true,
      "command": ["zau-lsp", "--stdio"],
      "selector": "source.zau"
    }
  }
}`}
                  </pre>
                </div>
              )}

              {activeEditorTab === 'intellij' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    {isEn
                      ? 'JetBrains ecosystem (IntelliJ IDEA, WebStorm, PyCharm) support via Custom XML Definitions & TextMate Bundles:'
                      : 'Dukungan JetBrains (IntelliJ IDEA, WebStorm, PyCharm) melalui Custom XML Definition & TextMate Bundles:'}
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{isEn ? `# 1. Open Settings > Editor > File Types
# 2. Add TextMate bundle from 'packages/vscode-zau'
# 3. Or import syntax definition: 'packages/vscode-zau/syntaxes/intellij/zau.xml'` : `# 1. Buka Settings > Editor > File Types
# 2. Tambahkan TextMate bundle dari 'packages/vscode-zau'
# 3. Atau import syntax definition: 'packages/vscode-zau/syntaxes/intellij/zau.xml'`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Sub-Section: Browser Runtime & Zero-Build Execution */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isEn ? 'Browser Support & Cross-Platform Runtime' : 'Dukungan Browser & Runtime Lintas Platform'}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {isEn
                ? <>Client-side execution of <code>.zau</code> components with zero complex build overhead:</>
                : <>Eksekusi kode <code>.zau</code> langsung di sisi klien tanpa build step yang rumit:</>}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  {isEn ? '1. In-Browser Autoloader (<script type="text/zau">)' : '1. In-Browser Autoloader (<script type="text/zau">)'}
                </span>
                <p className="text-xs text-zinc-300">
                  {isEn
                    ? <>The <code>/js/zau-browser.js</code> script automatically scans the DOM and mounts all 3D spatial scenes:</>
                    : <>Script <code>/js/zau-browser.js</code> memindai dokumen dan me-mount seluruh scene 3D secara otomatis:</>}
                </p>
                <pre className="p-3 rounded-lg bg-zinc-950 text-zinc-300 overflow-x-auto text-[11px]">
{`<script src="/js/zau-browser.js"></script>
<script type="text/zau">
  <template>
    <zau-canvas id="view">
      <zau-model src="/model/3d/salt_tower/salt_tower_8k.glb" />
    </zau-canvas>
  </template>
</script>`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-sky-400 font-bold block">
                  {isEn ? '2. Web Syntax Highlighters (Prism.js & Monaco)' : '2. Web Syntax Highlighters (Prism.js & Monaco)'}
                </span>
                <p className="text-xs text-zinc-300">
                  {isEn
                    ? 'Instant integration for interactive syntax coloring in documentation pages or online playgrounds:'
                    : 'Integrasi instan untuk pewarnaan sintaks interaktif di situs dokumentasi atau web playground:'}
                </p>
                <pre className="p-3 rounded-lg bg-zinc-950 text-zinc-300 overflow-x-auto text-[11px]">
{`// Prism.js
import './public/js/prism-zau.js';
Prism.highlight(code, Prism.languages.zau, 'zau');

// Monaco Editor
import { register } from './public/js/monaco-zau.js';
register(monaco);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Sub-Section: Global Standards & Registries */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isEn ? 'Global Standardization, IANA Media Type & GitHub Linguist' : 'Standarisasi Global, IANA Media Type & GitHub Linguist'}
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              {isEn
                ? <>Official registration blueprints ensuring the <code>.zau</code> extension is recognized by operating systems, web servers, and global repositories:</>
                : <>Cetak biru registrasi resmi agar ekstensi <code>.zau</code> diakui di level sistem operasi, server web, dan repositori online dunia:</>}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-900/90 text-amber-400">
                    <th className="p-3 border-b border-zinc-800">{isEn ? 'Standard / Registry' : 'Standar / Registri'}</th>
                    <th className="p-3 border-b border-zinc-800">{isEn ? 'Format Identifier' : 'Format Identifier'}</th>
                    <th className="p-3 border-b border-zinc-800">{isEn ? 'Blueprint File Location' : 'Lokasi Blueprint File'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td className="p-3 font-semibold text-white">IANA Media Types (RFC 6838)</td>
                    <td className="p-3 text-amber-300">text/prs.zau | application/prs.zau</td>
                    <td className="p-3 text-zinc-400">iana/media-type-text-prs-zau.txt</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Linux (FreeDesktop.org)</td>
                    <td className="p-3 text-amber-300">text/prs.zau (*.zau glob)</td>
                    <td className="p-3 text-zinc-400">mime/linux/zau.xml</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Windows Registry</td>
                    <td className="p-3 text-amber-300">HKEY_CLASSES_ROOT\.zau</td>
                    <td className="p-3 text-zinc-400">mime/windows/zau.reg</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">macOS LaunchServices (UTI)</td>
                    <td className="p-3 text-amber-300">com.zetagoaurum.zau</td>
                    <td className="p-3 text-zinc-400">mime/macos/Info.plist</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Web Servers (Nginx &amp; Apache)</td>
                    <td className="p-3 text-amber-300">AddType text/prs.zau .zau</td>
                    <td className="p-3 text-zinc-400">mime/nginx/zau.conf &amp; .htaccess</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">GitHub Linguist</td>
                    <td className="p-3 text-amber-300">tm_scope: source.zau (ID: 899321)</td>
                    <td className="p-3 text-zinc-400">linguist/languages.yml</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DUAL STYLING */}
      <section id="dual-styling" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-palette" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Dual-Asset Styling Engine' : 'Mesin Styling Dual-Aset'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Tailwind CSS Utility Classes Combined with Bootstrap 5.3 Iconography'
                : 'Kelas Utilitas Tailwind CSS Dipadukan dengan Ikonografi Bootstrap 5.3'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-sky-400">
              <i className="bi bi-wind text-xl" />
              <h3 className="text-lg font-bold text-white">Tailwind CSS 3.4+</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isEn
                ? 'Atomic utility-first styling with hardware-accelerated backdrop blur, glassmorphism tokens, and responsive breakpoints.'
                : 'Penataan gaya utilitas atomik dengan hardware-accelerated backdrop blur, token glassmorphism, dan breakpoint responsif.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <i className="bi bi-bootstrap text-xl" />
              <h3 className="text-lg font-bold text-white">Bootstrap 5.3 Iconography</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {isEn
                ? '2,000+ vector SVG icons bundled cleanly via font-face, providing crisp iconography without inflating JS bundle weight.'
                : 'Lebih dari 2.000 ikon vektor SVG dipaketkan melalui font-face, menyajikan ikonografi tajam tanpa membebani ukuran bundle JS.'}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: MULTI-CLOUD DEPLOYMENT */}
      <section id="deployment" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-cloud-arrow-up" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Production Multi-Cloud Deployment' : 'Deployment Multi-Cloud Produksi'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {isEn
                ? 'Native Blueprints for Vercel, Docker, Linux VPS, Render, and Fly.io'
                : 'Blueprint Native untuk Vercel, Docker, Linux VPS, Render, dan Fly.io'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
            {[
              { id: 'vercel', label: 'Vercel (Live Edge)', icon: 'bi-triangle-fill' },
              { id: 'docker', label: 'Docker & Compose', icon: 'bi-box' },
              { id: 'vps', label: 'Linux VPS (Nginx + SSL)', icon: 'bi-hdd-rack' },
              { id: 'render', label: 'Render Cloud (IaC)', icon: 'bi-hdd-network' },
              { id: 'flyio', label: 'Fly.io (Global Edge)', icon: 'bi-clouds' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDeployTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition flex items-center space-x-1.5 ${
                  activeDeployTab === tab.id
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-gold-glow'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <i className={`bi ${tab.icon}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* VERCEL PRODUCTION TAB */}
          {activeDeployTab === 'vercel' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isEn ? 'Vercel Edge + Serverless Python ASGI Architecture' : 'Arsitektur Vercel Edge + Serverless Python ASGI'}</span>
                  </h4>
                  <p className="text-xs text-zinc-300 mt-1">
                    {isEn
                      ? <>Static frontend &amp; 3D assets are served directly from Vercel Global CDN. The <code>/api/*</code> endpoints are handled by Python ASGI Serverless Functions (<code>api/index.py</code>) with zero cold-start.</>
                      : <>Frontend statis &amp; aset 3D dilayani langsung dari Vercel CDN Global. Endpoint <code>/api/*</code> dieksekusi oleh Python ASGI Serverless Function (<code>api/index.py</code>) dengan zero cold-start.</>}
                  </p>
                </div>
                <a
                  href="https://zau-framework.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-mono text-xs font-bold whitespace-nowrap hover:bg-amber-400 transition"
                >
                  <i className="bi bi-box-arrow-up-right" />
                  <span>{isEn ? 'View Live Production' : 'Lihat Live Production'}</span>
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      {isEn ? '1. vercel.json (Edge Rewrites)' : '1. vercel.json (Edge Rewrites)'}
                    </span>
                    <button
                      onClick={() => copyToClipboard('{\n  "framework": "nextjs",\n  "cleanUrls": true,\n  "rewrites": [\n    { "source": "/api/(.*)", "destination": "/api/index.py" },\n    { "source": "/__zau/(.*)", "destination": "/api/index.py" }\n  ]\n}', 'v-json')}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white"
                    >
                      {copiedCode === 'v-json' ? (isEn ? '✓ Copied' : '✓ Tersalin') : (isEn ? 'Copy' : 'Salin')}
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`{
  "framework": "nextjs",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.py" },
    { "source": "/__zau/(.*)", "destination": "/api/index.py" }
  ]
}`}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-sky-400 font-bold">
                      {isEn ? '2. api/index.py (ASGI Serverless Bridge)' : '2. api/index.py (ASGI Serverless Bridge)'}
                    </span>
                    <button
                      onClick={() => copyToClipboard('import os\nimport sys\n\ncurrent_dir = os.path.dirname(os.path.abspath(__file__))\nroot_dir = os.path.abspath(os.path.join(current_dir, ".."))\nif root_dir not in sys.path:\n    sys.path.insert(0, root_dir)\n\nfrom backend.app import app\napp = app.get_asgi_app()', 'v-py')}
                      className="text-[11px] font-mono text-zinc-400 hover:text-white"
                    >
                      {copiedCode === 'v-py' ? (isEn ? '✓ Copied' : '✓ Tersalin') : (isEn ? 'Copy' : 'Salin')}
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(current_dir, ".."))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.app import app

# ${isEn ? 'Export standard ASGI application callable' : 'Ekspor objek callable ASGI standar'}
app = app.get_asgi_app()`}
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                  {isEn ? '3. Terminal Production Deployment Commands:' : '3. Perintah Deploy Production Terminal:'}
                </span>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{isEn ? `# 1. Authenticate with Vercel CLI
npx vercel login

# 2. Deploy directly to Production
npx vercel --prod --yes

# 3. Environment Variables (set in Vercel Dashboard):
#    DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname
#    ZAU_ENV=production` : `# 1. Login ke akun Vercel
npx vercel login

# 2. Deploy langsung ke Production Domain
npx vercel --prod --yes

# 3. Environment Variables (di Dashboard Vercel):
#    DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname
#    ZAU_ENV=production`}
                </pre>
              </div>
            </div>
          )}

          {/* DOCKER & COMPOSE TAB */}
          {activeDeployTab === 'docker' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-mono text-amber-400 font-bold block mb-2">
                    {isEn ? 'Dockerfile (Multi-Stage Production Build)' : 'Dockerfile (Multi-Stage Production Build)'}
                  </span>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto max-h-72">
{`FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.12-slim AS runner
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir uvicorn[standard] gunicorn
COPY --from=frontend-builder /app /app
ENV ZAU_ENV=production PORT=8000
EXPOSE 8000
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "backend.app:app", "--bind", "0.0.0.0:8000"]`}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-mono text-sky-400 font-bold block mb-2">
                    {isEn ? 'docker-compose.yml (App + PostgreSQL 16)' : 'docker-compose.yml (App + PostgreSQL 16)'}
                  </span>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto max-h-72">
{`version: '3.8'
services:
  zau-app:
    build: .
    restart: always
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://zau:pass@postgres:5432/zau_db
      - ZAU_ENV=production
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: zau
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: zau_db
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U zau -d zau_db"]
      interval: 5s

volumes:
  pgdata:`}
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                  {isEn ? 'Launch Container Cluster:' : 'Jalankan Container Cluster:'}
                </span>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`docker compose up -d --build
docker compose ps
docker compose logs -f zau-app`}
                </pre>
              </div>
            </div>
          )}

          {/* LINUX VPS (NGINX + SYSTEMD) TAB */}
          {activeDeployTab === 'vps' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-mono text-amber-400 font-bold block mb-2">
                    1. /etc/systemd/system/zau.service
                  </span>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`[Unit]
Description=ZAU Framework High-Performance ASGI Service
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/zau-app
Environment="PATH=/var/www/zau-app/.venv/bin"
Environment="ZAU_ENV=production"
ExecStart=/var/www/zau-app/.venv/bin/gunicorn \
    -w 4 \
    -k uvicorn.workers.UvicornWorker \
    backend.app:app \
    --bind 127.0.0.1:8000

Restart=always

[Install]
WantedBy=multi-user.target`}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-mono text-sky-400 font-bold block mb-2">
                    2. /etc/nginx/sites-available/zau
                  </span>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`server {
    listen 80;
    server_name example.com www.example.com;

    # ${isEn ? 'Aggressive caching for 3D binary assets (30 days)' : 'Caching aset 3D agresif (30 hari)'}
    location ~* \.(glb|gltf|bin|draco)$ {
        root /var/www/zau-app/model/3d;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # ${isEn ? 'Proxy to ASGI Server' : 'Proxy ke ASGI Server'}
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }
}`}
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">
                  {isEn ? '3. Enable Service & Issue Free SSL via Certbot:' : '3. Aktifkan Service & Pasang SSL Gratis Certbot:'}
                </span>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`sudo systemctl daemon-reload && sudo systemctl enable --now zau
sudo ln -s /etc/nginx/sites-available/zau /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d example.com -d www.example.com`}
                </pre>
              </div>
            </div>
          )}

          {/* RENDER CLOUD TAB */}
          {activeDeployTab === 'render' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-amber-400 font-bold block mb-2">
                  render.yaml (Infrastructure-as-Code Blueprint)
                </span>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{`services:
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
    plan: standard`}
                </pre>
              </div>
            </div>
          )}

          {/* FLY.IO TAB */}
          {activeDeployTab === 'flyio' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs font-mono text-sky-400 font-bold block mb-2">
                  {isEn ? 'fly.toml & Global Edge Deployment Commands' : 'fly.toml & Perintah Deploy Global Edge'}
                </span>
                <pre className="text-xs font-mono text-zinc-300 overflow-x-auto">
{isEn ? `# 1. Initialize Fly configuration
fly launch --no-deploy

# 2. Attach persistent storage volume for database and 3D cache
fly volumes create zau_data --size 10 --region sin

# 3. Deploy to Fly.io global edge network
fly deploy` : `# 1. Inisialisasi konfigurasi Fly di direktori project
fly launch --no-deploy

# 2. Pasang volume persisten untuk file database / 3D
fly volumes create zau_data --size 10 --region sin

# 3. Deploy ke jaringan edge global Fly.io
fly deploy`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
