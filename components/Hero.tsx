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
        {/* Release Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel-glow text-xs font-mono text-amber-300 border border-amber-500/30 shadow-gold-glow">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-semibold">ZAU 1.0.1 Released</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">Next.js Chunks + 360° Spatial Room</span>
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
          ZetaGo-Aurum Unified Web Framework. Industrial ASGI speed, declarative async ORM, and Three.js 360° photogrammetry background—compiled with genuine Next.js script chunks.
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
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-950/20 text-zinc-900 border border-zinc-950/30">
              ESC
            </span>
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
            <span>GitHub Stars</span>
          </a>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
          <div className="p-4 rounded-2xl glass-panel-subtle border border-zinc-800 text-center">
            <div className="text-2xl font-black text-amber-400 font-mono">0.8ms</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono mt-1">
              ASGI RPC Latency
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-subtle border border-zinc-800 text-center">
            <div className="text-2xl font-black text-sky-400 font-mono">360° HD</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono mt-1">
              Photogrammetry Room
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-subtle border border-zinc-800 text-center">
            <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono mt-1">
              Next.js Chunks
            </div>
          </div>
          <div className="p-4 rounded-2xl glass-panel-subtle border border-zinc-800 text-center">
            <div className="text-2xl font-black text-purple-400 font-mono">Dual</div>
            <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-mono mt-1">
              Tailwind + Bootstrap
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
