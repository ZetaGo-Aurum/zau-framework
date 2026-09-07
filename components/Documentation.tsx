'use client';

import React, { useState } from 'react';

export default function Documentation() {
  const [activeDeployTab, setActiveDeployTab] = useState<'vercel' | 'render' | 'replit' | 'docker'>('vercel');

  return (
    <div className="space-y-24 py-12">
      {/* SECTION 1: RFC-001 ARCHITECTURE */}
      <section id="architecture" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-diagram-3" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              RFC-001 Unified Architecture Specification
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Enterprise Python-First ASGI Core with Modular Client Code Splitting
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
              Powered by Starlette and Uvicorn. Implements asynchronous Server Action RPC, dependency injection, and zero-boilerplate JSON serialization.
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• Starlette / FastAPI-grade speed</li>
              <li>• Async WebSocket multi-client sync</li>
              <li>• Declarative dependency injection</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">LAYER 02</span>
              <i className="bi bi-box-seam text-xl text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Next.js Client Chunking</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Client scripts are automatically divided into modular chunks (<code>webpack</code>, <code>main-app</code>, <code>runtime</code>). View-source displays authentic clean script tags.
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• <code>/_next/static/chunks/</code> bundling</li>
              <li>• Zero monolithic HTML clutter</li>
              <li>• Dynamic hydration &amp; module preload</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">LAYER 03</span>
              <i className="bi bi-compass text-xl text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">3D Spatial Pipeline</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Native ingestion for <code>model/3d/</code> GLTF, OBJ, and binary buffers. Ships with The Great Drawing Room photogrammetric environment.
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• Three.js r160 WebGL engine</li>
              <li>• ACES Filmic tone mapping</li>
              <li>• Full 360° desktop &amp; mobile orbit</li>
            </ul>
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
              Python ASGI Engine &amp; RPC Actions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Type-Safe Communication Between Python Backend and Client Viewports
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            ZAU eliminates the traditional gap between backend APIs and frontend client components. Using the <code className="text-amber-400 font-mono">@app.action</code> decorator, any asynchronous Python function is exposed as an end-to-end type-safe RPC procedure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-100 flex items-center space-x-2">
                <i className="bi bi-lightning-charge-fill text-amber-400" />
                <span>Zero Serialization Friction</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Return SQLAlchemy models, Pydantic objects, or native dictionaries. ZAU automatically translates objects and manages HTTP headers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-100 flex items-center space-x-2">
                <i className="bi bi-broadcast text-sky-400" />
                <span>Spatial WebSocket Synchronization</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Connect multiple viewports via <code>app.broadcast_json()</code>. Changes in 3D scene state, lighting, or annotations broadcast in under 4ms.
              </p>
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
              Native Asynchronous ORM &amp; ZAU Studio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              High-Performance Connection Pooling and Visual Schema Management
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Built on modern SQLAlchemy 2.0 async engine, ZAU provides a clean, declarative Model syntax. You can switch between SQLite (with <code>aiosqlite</code>) for development and PostgreSQL (with <code>asyncpg</code>) for production with zero changes to your query code.
          </p>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <i className="bi bi-window-sidebar text-3xl text-amber-400" />
              <div>
                <h4 className="font-bold text-white text-base">ZAU Studio Inspector</h4>
                <p className="text-xs text-zinc-300">
                  Visual GUI for real-time table queries, schema migrations, and spatial anchor editing.
                </p>
              </div>
            </div>
            <code className="px-3 py-1.5 rounded-xl bg-zinc-950 font-mono text-xs text-amber-400 border border-zinc-800">
              http://localhost:8000/__zau/studio
            </code>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3D SPATIAL CANVAS & MODEL/3D/ */}
      <section id="spatial-3d" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-box" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3D Spatial Canvas &amp; model/3d/ Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Photogrammetry Ingestion, Dynamic PBR Materials, and Gyroscopic Navigation
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">The Great Drawing Room Showcase</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              ZAU natively integrates photogrammetric 3D models into its build and serving pipeline. This documentation site features <strong>The Great Drawing Room</strong> from <em>The Hallwyl Museum</em> in Stockholm, Sweden, licensed under Creative Commons Attribution 4.0.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400">01. Direct Ingestion</span>
              <h4 className="font-bold text-sm text-white mt-1">model/3d/ Directory</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Drop <code>.gltf</code>, <code>.bin</code>, and textures directly into <code>model/3d/</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400">02. Web Optimization</span>
              <h4 className="font-bold text-sm text-white mt-1">Adaptive Textures</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Serves 4K/8K PBR maps tuned to mobile and desktop GPU limits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400">03. 360° Navigation</span>
              <h4 className="font-bold text-sm text-white mt-1">Smooth Damping</h4>
              <p className="text-xs text-zinc-400 mt-1">
                OrbitControls with touch gesture support, damping, and auto-rotation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400">04. 3D Hotspot Nodes</span>
              <h4 className="font-bold text-sm text-white mt-1">Raycaster Anchors</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Interactive spatial beacons mapped to acoustic and architectural nodes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DUAL STYLING */}
      <section id="dual-styling" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-palette" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dual-Asset Styling Engine
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Tailwind CSS Utility Classes Combined with Bootstrap 5.3 Iconography
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-sky-400">
              <i className="bi bi-wind text-xl" />
              <h3 className="font-bold text-white text-base">Tailwind CSS 3.4 JIT</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Provides modern utility classes for responsive layouts, obsidian palettes, subtle borders, and glassmorphic backdrop filters.
            </p>
            <div className="p-3 rounded-xl bg-zinc-900/80 font-mono text-xs text-zinc-300">
              <code>class="glass-panel p-6 rounded-3xl border border-amber-500/20"</code>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-purple-400">
              <i className="bi bi-bootstrap-fill text-xl" />
              <h3 className="font-bold text-white text-base">Bootstrap 5.3 Icons</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Over 2,000 vector glyphs embedded natively for clean UI signals, telemetry indicators, navigation arrows, and server actions.
            </p>
            <div className="p-3 rounded-xl bg-zinc-900/80 font-mono text-xs text-zinc-300">
              <code>&lt;i class="bi bi-compass-fill text-amber-400"&gt;&lt;/i&gt;</code>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DEPLOYMENT MATRIX */}
      <section id="deployment" className="scroll-mt-24">
        <div className="flex items-center space-x-3 mb-4">
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-lg">
            <i className="bi bi-cloud-arrow-up" />
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Production Deployment Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Deploy to Vercel, Render, Replit, or Docker with Turnkey Presets
            </p>
          </div>
        </div>

        <div className="rounded-3xl glass-panel-glow border border-amber-500/30 overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800 bg-zinc-950/60 px-4 pt-3 space-x-2">
            {[
              { id: 'vercel', label: 'Vercel', icon: 'bi-triangle-fill' },
              { id: 'render', label: 'Render', icon: 'bi-cloud-fill' },
              { id: 'replit', label: 'Replit', icon: 'bi-terminal-fill' },
              { id: 'docker', label: 'Docker', icon: 'bi-box-fill' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDeployTab(tab.id as any)}
                className={`px-4 py-2 rounded-t-xl text-xs font-mono font-bold flex items-center space-x-2 transition ${
                  activeDeployTab === tab.id
                    ? 'bg-amber-500/10 text-amber-400 border-t-2 border-amber-500'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <i className={`bi ${tab.icon}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeDeployTab === 'vercel' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Vercel Deployment (Next.js Chunks + Python Serverless)</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Vercel builds the Next.js frontend with <code>next build</code>, producing modular chunks at <code>/_next/static/chunks/</code>. Backend API routes in <code>/api</code> are automatically executed by Vercel Python Serverless Runtime.
                </p>
                <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  <p className="text-zinc-500"># Deploy to Vercel production</p>
                  <p className="text-amber-400 font-bold">npx vercel --prod</p>
                </div>
              </div>
            )}

            {activeDeployTab === 'render' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Render Web Service (render.yaml)</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Deploys as an ASGI Web Service managed by Gunicorn and Uvicorn workers. Native support for persistent SQLite volumes or managed PostgreSQL.
                </p>
                <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  <p className="text-zinc-500"># Start command</p>
                  <p className="text-amber-400 font-bold">uvicorn apps.docs.backend.app:app.get_asgi_app() --host 0.0.0.0 --port 10000</p>
                </div>
              </div>
            )}

            {activeDeployTab === 'replit' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Replit Interactive Environment (.replit)</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Zero-configuration interactive sandbox with integrated webview, terminal, and hot-reload.
                </p>
                <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  <p className="text-zinc-500"># Run in Replit</p>
                  <p className="text-amber-400 font-bold">python3 -m zau.cli dev</p>
                </div>
              </div>
            )}

            {activeDeployTab === 'docker' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white">Docker Containerization</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Multi-stage Docker build producing a secure, unprivileged alpine container (~120MB) ready for Kubernetes, AWS ECS, or Fly.io.
                </p>
                <div className="p-4 rounded-xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800">
                  <p className="text-zinc-500"># Build and run Docker container</p>
                  <p className="text-amber-400 font-bold">docker-compose up -d --build</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-12 border-t border-zinc-800 text-xs text-zinc-400 font-mono flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="font-bold text-zinc-200">ZAU Framework v1.0.1</span>
          <span>•</span>
          <span>© 2026 ZetaGo-Aurum</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="mailto:admin@zetagoaurum.com"
            className="hover:text-amber-400 transition flex items-center space-x-1"
          >
            <i className="bi bi-envelope-fill text-amber-400" />
            <span>admin@zetagoaurum.com</span>
          </a>
          <span>•</span>
          <a
            href="https://zetagoaurum.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition"
          >
            zetagoaurum.com
          </a>
        </div>
      </footer>
    </div>
  );
}
