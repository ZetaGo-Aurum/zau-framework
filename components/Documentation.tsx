'use client';

import React, { useState } from 'react';

export default function Documentation() {
  const [activeDeployTab, setActiveDeployTab] = useState<'vercel' | 'render' | 'replit' | 'docker'>('vercel');
  const [activeEditorTab, setActiveEditorTab] = useState<'vscode' | 'neovim' | 'zed' | 'sublime' | 'intellij'>('vscode');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
              <li>• Starlette / FastAPI-grade throughput</li>
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
              Native ingestion for <code>model/3d/</code> GLTF, OBJ, and binary buffers with Dual-Tier Progressive LOD and Android GPU memory safety.
            </p>
            <ul className="text-[11px] font-mono text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800">
              <li>• Three.js r160 WebGL engine</li>
              <li>• Instant Frame 0 paint (664 KB Draco)</li>
              <li>• 8K Desktop / 4K Mobile auto-tiering</li>
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
              <span className="text-xs font-mono text-amber-400 font-bold block mb-2">Backend Implementation (main.py)</span>
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
    return {"status": "recorded", "origin": "black_stool"}`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-sky-400 font-bold block mb-2">Client Dispatch (zau.client.ts)</span>
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
              Declarative Async ORM &amp; State Signals
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              High-Speed Persistence Layer Supporting SQLite, PostgreSQL, and In-Memory Drivers
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Database models in ZAU are declared with pure Python dataclasses and Pydantic v2 schemas. Migrations are calculated atomically and executed with zero application downtime.
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
              3D Spatial Canvas &amp; Dual-Tier Progressive LOD
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Salt Tower Lower Room 8K Photogrammetry with Zero Blackscreen and Android GPU Safety
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            The ZAU 3D Spatial Engine solves two fundamental limitations of WebGL web rendering: first-frame blackscreen latency and mobile GPU memory exhaustion. Rather than forcing clients to wait for a 28 MB 8K model, ZAU serves an ultra-lightweight Draco low-poly mesh on Frame 0, then background-streams high-poly geometry tailored to the device GPU tier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400 font-bold">TIER 0: FRAME 0</span>
              <h4 className="font-bold text-sm text-white mt-1">Instant Low-Poly Paint</h4>
              <p className="text-xs text-zinc-400 mt-1">
                664 KB Draco mesh decodes in &lt; 20ms. The 3D chamber is immediately visible and interactive before high-res assets finish downloading.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-sky-400 font-bold">TIER 1A: ANDROID / MOBILE</span>
              <h4 className="font-bold text-sm text-white mt-1">4K GPU Memory Guard</h4>
              <p className="text-xs text-zinc-400 mt-1">
                6.67 MB total size with 4096 texture cap. Saves ~270 MB VRAM, preventing mobile browser crashes, GC stalls, and frame stutter.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-emerald-400 font-bold">TIER 1B: DESKTOP MASTER</span>
              <h4 className="font-bold text-sm text-white mt-1">8K PBR Master Render</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Full 8192x8192 photogrammetry resolution with 16x anisotropic filtering and ACES Filmic tone mapping for workstation GPUs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-xs font-mono text-amber-400 font-bold">CAMERA ANCHOR</span>
              <h4 className="font-bold text-sm text-white mt-1">Black Stool Viewpoint</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Seated coordinate (-1.24, 1.18, 1.45) with 70° FOV looking across the medieval archways, portals, and arrow-slits.
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
              Ekosistem Bahasa .zau &amp; Universal Tooling
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Standar Industri: LSP 3.17, Multi-Editor Grammars, Browser Runtime, IANA Media Type, GitHub Linguist
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-8">
          <p className="text-sm text-zinc-300 leading-relaxed">
            Format file <code className="text-amber-400 font-mono">.zau</code> adalah Single File Component (SFC) modern yang menggabungkan deklarasi antarmuka WebGL spasial 3D, reaktivitas sinyal Python/TypeScript, dan styling terisolasi ke dalam satu kesatuan kode yang elegan.
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
      <!-- Kamera dengan titik tumpu terkunci tepat di kursi bundar hitam -->
      <zau-camera
        :position="[-1.05, 1.15, 2.50]"
        :target="[-1.05, 0.70, 1.38]"
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
      <!-- OrbitControls dengan anti-wall clipping: maxDistance 2.2m -->
      <zau-orbit-controls
        :target="[-1.05, 0.70, 1.38]"
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
                <span>{copiedCode === 'zau-sample' ? 'Copied' : 'Copy .zau'}</span>
              </button>
            </div>

            <pre className="text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`<template>
  <div class="viewport-wrapper">
    <zau-canvas id="salt-tower-viewport" shadows>
      <!-- Kamera dengan titik tumpu terkunci tepat di kursi bundar hitam -->
      <zau-camera
        :position="[-1.05, 1.15, 2.50]"
        :target="[-1.05, 0.70, 1.38]"
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
      <!-- OrbitControls dengan anti-wall clipping: maxDistance 2.2m -->
      <zau-orbit-controls
        :target="[-1.05, 0.70, 1.38]"
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

          {/* Sub-Section: Spatial Camera Pivot & Anti-Wall Clipping */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/20 shadow-xl space-y-4">
            <div className="flex items-center space-x-2.5 text-amber-400">
              <i className="bi bi-camera-reels-fill text-lg" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Fisika Kamera 3D: Titik Tumpu Kursi Bundar &amp; Anti-Wall Clipping
              </h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Pada lingkungan 3D interior (seperti <em>Salt Tower Lower Room</em> dengan diameter chamber ~9 meter), penentuan <strong>titik tumpu rotasi (Orbit Target / Pivot Point)</strong> adalah faktor penentu apakah perputaran kamera terasa natural atau justru menembus dinding keluar ruangan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                <span className="text-red-400 font-bold flex items-center space-x-1.5">
                  <i className="bi bi-x-octagon-fill" />
                  <span>Masalah: Titik Tumpu di Pinggir Tembok</span>
                </span>
                <p className="text-zinc-400 text-[11px] leading-normal font-sans">
                  Jika target rotasi diletakkan di pinggir dinding (misal <code className="text-red-300">Z = 3.5</code>), maka saat kamera mengitari target dengan radius 2 meter, separuh lintasan bola kamera akan mengayun ke <code className="text-red-300">Z = 5.5</code> yang berada di luar dinding batu (tembus keluar ruangan / void hitam).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                  <i className="bi bi-check-circle-fill" />
                  <span>Solusi ZAU: Titik Tumpu di Kursi Bundar</span>
                </span>
                <p className="text-zinc-400 text-[11px] leading-normal font-sans">
                  Mengunci target rotasi tepat pada koordinat bangku hitam <code className="text-emerald-300">[-1.05, 0.70, 1.38]</code> di tengah ruangan. Dikombinasikan dengan <code className="text-emerald-300">maxDistance = 2.2m</code>, kamera memiliki margin aman 1.75m - 4.2m dari dinding terdekat, sehingga <strong>secara fisik mustahil menembus tembok</strong>.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-950 text-amber-400">
                    <th className="p-2.5 border-b border-zinc-800">Parameter</th>
                    <th className="p-2.5 border-b border-zinc-800">Nilai Optimal</th>
                    <th className="p-2.5 border-b border-zinc-800">Fungsi &amp; Penjelasan Fisika</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-300 text-[11px]">
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">controls.target</td>
                    <td className="p-2.5 text-zinc-200">[-1.05, 0.70, 1.38]</td>
                    <td className="p-2.5 font-sans">Titik tumpu rotasi utama tepat di permukaan bangku duduk kayu hitam.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">camera.position</td>
                    <td className="p-2.5 text-zinc-200">[-1.05, 1.15, 2.50]</td>
                    <td className="p-2.5 font-sans">Posisi awal sejajar pandangan mata (height 1.15m) menghadap bangku dan pintu lengkung Norman.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">controls.maxDistance</td>
                    <td className="p-2.5 text-zinc-200">2.2 meter</td>
                    <td className="p-2.5 font-sans">Batas jarak zoom keluar terjauh. Mencegah kamera terseret melewati radius dinding terdekat (2.82m).</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">controls.minDistance</td>
                    <td className="p-2.5 text-zinc-200">0.05 - 0.15 meter</td>
                    <td className="p-2.5 font-sans">Batas zoom terdekat untuk beralih ke mode pengamatan duduk di kursi (Seated POV).</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-amber-300">controls.maxPolarAngle</td>
                    <td className="p-2.5 text-zinc-200">Math.PI / 2 + 0.12 (~97°)</td>
                    <td className="p-2.5 font-sans">Klem sudut elevasi vertikal untuk mencegah kamera tenggelam ke bawah ubin lantai batu.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-Section: Multi-Editor Setup Tabs */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Dukungan Multi-Editor &amp; Universal LSP (`zau-lsp`)
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Pilih code editor Anda untuk melihat konfigurasi standar industri:
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
                    Ekstensi resmi <strong>Zau Language</strong> dipaketkan dalam format standar <code>.vsix</code> untuk Visual Studio Code dan Open VSX (VSCodium, Eclipse Theia).
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{`# 1. Install ekstensi dari binary paket VSIX
code --install-extension dist/extensions/zau-1.0.3.vsix

# 2. Atau install via Open-VSX (VSCodium)
codium --install-extension dist/extensions/zau-1.0.3.vsix`}
                  </pre>
                  <ul className="text-[11px] text-zinc-400 space-y-1">
                    <li>• Fitur: Semantic Tokens, Tag Autocomplete, Diagnostics, Formatter, Hover Cards</li>
                    <li>• Scope: <code>source.zau</code> | Ekstensi: <code>.zau</code></li>
                  </ul>
                </div>
              )}

              {activeEditorTab === 'neovim' && (
                <div className="space-y-3">
                  <p className="text-zinc-300">
                    Neovim terhubung langsung dengan <code>zau-lsp</code> melalui protokol universal <code>--stdio</code> via <code>nvim-lspconfig</code>.
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
                    Konfigurasi native Zed Editor untuk syntax grammar dan language server:
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
                    Sublime Text 3 &amp; 4 mendukung format YAML <code>.sublime-syntax</code> yang dikonversi otomatis:
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{`# Lokasi syntax definition di Sublime Packages:
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
                    Dukungan JetBrains (IntelliJ IDEA, WebStorm, PyCharm) melalui Custom XML Definition &amp; TextMate Bundles:
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-amber-300 overflow-x-auto">
{`# 1. Buka Settings > Editor > File Types
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
              Dukungan Browser &amp; Runtime Lintas Platform
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Eksekusi kode <code>.zau</code> langsung di sisi klien tanpa build step yang rumit:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  1. In-Browser Autoloader (&lt;script type="text/zau"&gt;)
                </span>
                <p className="text-xs text-zinc-300">
                  Script <code>/js/zau-browser.js</code> memindai dokumen dan me-mount seluruh scene 3D secara otomatis:
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
                  2. Web Syntax Highlighters (Prism.js &amp; Monaco)
                </span>
                <p className="text-xs text-zinc-300">
                  Integrasi instan untuk pewarnaan sintaks interaktif di situs dokumentasi atau web playground:
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
              Standarisasi Global, IANA Media Type &amp; GitHub Linguist
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Cetak biru registrasi resmi agar ekstensi <code>.zau</code> diakui di level sistem operasi, server web, dan repositori online dunia:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-800 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-zinc-900/90 text-amber-400">
                    <th className="p-3 border-b border-zinc-800">Standar / Registri</th>
                    <th className="p-3 border-b border-zinc-800">Format Identifier</th>
                    <th className="p-3 border-b border-zinc-800">Lokasi Blueprint File</th>
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
              <h3 className="text-lg font-bold text-white">Tailwind CSS 3.4+</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Atomic utility-first styling with hardware-accelerated backdrop blur, glassmorphism tokens, and responsive breakpoints.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <i className="bi bi-bootstrap text-xl" />
              <h3 className="text-lg font-bold text-white">Bootstrap 5.3 Iconography</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              2,000+ vector SVG icons bundled cleanly via font-face, providing crisp iconography without inflating JS bundle weight.
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
              Production Multi-Cloud Deployment
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              Native Blueprints for Vercel, Render, Replit, and Docker
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
            {[
              { id: 'vercel', label: 'Vercel (Live Edge)', icon: 'bi-triangle-fill' },
              { id: 'render', label: 'Render (ASGI Container)', icon: 'bi-hdd-network' },
              { id: 'replit', label: 'Replit Cloud', icon: 'bi-terminal-split' },
              { id: 'docker', label: 'Docker (OCI Image)', icon: 'bi-box' },
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

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
            {activeDeployTab === 'vercel' && (
              <pre>
{`# Deploying to Vercel Production
npx vercel --prod --yes

# Live URL: https://zau-framework.vercel.app
# Zero cold start: Chunked static HTML + Serverless edge routing`}
              </pre>
            )}
            {activeDeployTab === 'render' && (
              <pre>
{`# Deploying on Render via render.yaml
services:
  - type: web
    name: zau-app
    env: python
    buildCommand: pip install -r requirements.txt && npm run build
    startCommand: python3 -m zau.cli run --host 0.0.0.0 --port 10000`}
              </pre>
            )}
            {activeDeployTab === 'replit' && (
              <pre>
{`# Replit .replit config
run = "python3 -m zau.cli dev"
entrypoint = "main.py"

[nix]
channel = "stable-23_11"`}
              </pre>
            )}
            {activeDeployTab === 'docker' && (
              <pre>
{`# Build & Run OCI Container
docker build -t zau-app .
docker run -d -p 8000:8000 --name zau-live zau-app`}
              </pre>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
