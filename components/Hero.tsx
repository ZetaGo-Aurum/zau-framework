'use client';

import React, { useState } from 'react';

interface HeroProps {
  onToggleZen: () => void;
}

export default function Hero({ onToggleZen }: HeroProps) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Header Tag */}
        <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
          Architecture RFC-001 • Python-First Fullstack
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          Modern Python-First Fullstack &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 drop-shadow-sm">
            Native 3D Spatial Canvas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          ZetaGo-Aurum Unified Web Framework. Industrial ASGI speed, declarative async ORM, and Three.js 360° photogrammetry background, compiled with genuine Next.js script chunks.
        </p>

        {/* Install Commands */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <div className="w-full sm:w-auto px-4 py-3 rounded-2xl glass-panel-glow border border-amber-500/30 flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-zinc-200">
              <span className="text-amber-400 font-bold">$</span>
              <span>npm create zau@latest</span>
            </div>
            <button
              onClick={() => copyCommand('npm create zau@latest')}
              className="text-zinc-400 hover:text-white transition p-1"
              title="Copy to clipboard"
            >
              <i
                className={`bi ${
                  copiedCmd === 'npm create zau@latest'
                    ? 'bi-check2 text-emerald-400'
                    : 'bi-clipboard text-amber-400'
                }`}
              />
            </button>
          </div>

          <div className="w-full sm:w-auto px-4 py-3 rounded-2xl glass-panel-subtle border border-zinc-700/60 flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-zinc-200">
              <span className="text-sky-400 font-bold">$</span>
              <span>pip install zau-framework</span>
            </div>
            <button
              onClick={() => copyCommand('pip install zau-framework')}
              className="text-zinc-400 hover:text-white transition p-1"
              title="Copy to clipboard"
            >
              <i
                className={`bi ${
                  copiedCmd === 'pip install zau-framework'
                    ? 'bi-check2 text-emerald-400'
                    : 'bi-clipboard text-sky-400'
                }`}
              />
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onToggleZen}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-sm tracking-wide shadow-gold-glow flex items-center space-x-2 transition active:scale-95"
          >
            <i className="bi bi-eye-slash-fill text-base" />
            <span>360° Immersion Mode</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950/20 text-zinc-900 border border-zinc-950/30">
              ESC
            </kbd>
          </button>

          <a
            href="#architecture"
            className="px-6 py-3.5 rounded-2xl glass-panel hover:bg-zinc-800/80 text-white font-semibold text-sm flex items-center space-x-2 transition active:scale-95 border border-zinc-700"
          >
            <i className="bi bi-book-half text-amber-400" />
            <span>Explore Architecture</span>
          </a>

          <a
            href="https://github.com/ZetaGo-Aurum/zau-framework"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3.5 rounded-2xl glass-panel-subtle text-zinc-300 hover:text-white font-semibold text-sm flex items-center space-x-2 transition active:scale-95"
          >
            <i className="bi bi-github" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Technical Architecture Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-8 text-left">
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-amber-400 flex items-center space-x-2">
              <i className="bi bi-cpu" />
              <span>Python ASGI Core</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Starlette-backed event loop with type-safe async RPC procedures.
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-sky-400 flex items-center space-x-2">
              <i className="bi bi-box" />
              <span>3D Spatial Canvas</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              WebGL photogrammetry ingestion with interactive raycast anchors.
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-emerald-400 flex items-center space-x-2">
              <i className="bi bi-code-square" />
              <span>Chunked Runtime</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Modular Next.js script splitting with zero monolithic HTML output.
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-purple-400 flex items-center space-x-2">
              <i className="bi bi-palette" />
              <span>Dual Styling</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Tailwind CSS utility engine combined with Bootstrap icons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
