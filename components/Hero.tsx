'use client';

import React, { useState } from 'react';

interface HeroProps {
  onToggleZen: () => void;
  lang?: 'en' | 'id';
}

export default function Hero({ onToggleZen, lang = 'en' }: HeroProps) {
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
          {lang === 'en'
            ? 'Architecture RFC-001 • Python-First Fullstack'
            : 'Arsitektur RFC-001 • Fullstack Berbasis Python'}
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
          {lang === 'en' ? 'Modern Python-First Fullstack &' : 'Fullstack Modern Berbasis Python &'}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 drop-shadow-sm">
            Native 3D Spatial Canvas
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          {lang === 'en'
            ? 'ZetaGo-Aurum Unified Web Framework. Industrial ASGI speed, declarative async ORM, and Three.js 360° photogrammetry background, compiled with genuine Next.js script chunks.'
            : 'Kerangka Kerja Web Terpadu ZetaGo-Aurum. Kecepatan ASGI industrial, ORM asinkron deklaratif, dan latar fotogrametri 360° Three.js, terkompilasi dengan pembagian skrip modular Next.js.'}
        </p>

        {/* Install Commands */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2 max-w-xl mx-auto w-full px-2 sm:px-0">
          <div className="w-full sm:w-1/2 px-4 py-3 rounded-2xl glass-panel-glow border border-amber-500/30 flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-zinc-200 truncate">
              <span className="text-amber-400 font-bold">$</span>
              <span className="truncate">npm create zau@latest</span>
            </div>
            <button
              onClick={() => copyCommand('npm create zau@latest')}
              className="text-zinc-400 hover:text-white transition p-1 flex-shrink-0"
              title={lang === 'en' ? 'Copy to clipboard' : 'Salin perintah'}
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

          <div className="w-full sm:w-1/2 px-4 py-3 rounded-2xl glass-panel-subtle border border-zinc-700/60 flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2 font-mono text-xs sm:text-sm text-zinc-200 truncate">
              <span className="text-sky-400 font-bold">$</span>
              <span className="truncate">pip install zau-framework</span>
            </div>
            <button
              onClick={() => copyCommand('pip install zau-framework')}
              className="text-zinc-400 hover:text-white transition p-1 flex-shrink-0"
              title={lang === 'en' ? 'Copy to clipboard' : 'Salin perintah'}
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 max-w-lg sm:max-w-none mx-auto px-2 sm:px-0">
          <button
            onClick={onToggleZen}
            className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-sm tracking-wide shadow-gold-glow flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer"
          >
            <i className="bi bi-eye-slash-fill text-base" />
            <span>{lang === 'en' ? 'Zen 360° Mode' : 'Mode Bersih 360°'}</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950/20 text-zinc-900 border border-zinc-950/30">
              ESC
            </kbd>
          </button>

          <a
            href="#architecture"
            className="px-5 sm:px-6 py-3.5 rounded-2xl glass-panel hover:bg-zinc-800/80 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition active:scale-95 border border-zinc-700"
          >
            <i className="bi bi-book-half text-amber-400" />
            <span>{lang === 'en' ? 'Explore Architecture' : 'Jelajahi Arsitektur'}</span>
          </a>

          <a
            href="https://github.com/ZetaGo-Aurum/zau-framework"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3.5 rounded-2xl glass-panel-subtle text-zinc-300 hover:text-white font-semibold text-sm flex items-center justify-center space-x-2 transition active:scale-95"
          >
            <i className="bi bi-github" />
            <span>{lang === 'en' ? 'GitHub Repository' : 'Repositori GitHub'}</span>
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
              {lang === 'en'
                ? 'Starlette-backed event loop with type-safe async RPC procedures.'
                : 'Event loop bertenaga Starlette dengan prosedur RPC asinkron berorientasi tipe.'}
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-sky-400 flex items-center space-x-2">
              <i className="bi bi-box" />
              <span>3D Spatial Canvas</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {lang === 'en'
                ? 'WebGL photogrammetry ingestion with interactive raycast anchors.'
                : 'Ingesti fotogrametri WebGL dengan anchor raycast interaktif.'}
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-emerald-400 flex items-center space-x-2">
              <i className="bi bi-code-square" />
              <span>Chunked Runtime</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {lang === 'en'
                ? 'Modular Next.js script splitting with zero monolithic HTML output.'
                : 'Pemisahan skrip modular Next.js tanpa keluaran HTML monolitik.'}
            </p>
          </div>
          <div className="p-4 rounded-xl glass-panel-subtle border border-zinc-800/80">
            <div className="text-xs font-mono font-semibold text-purple-400 flex items-center space-x-2">
              <i className="bi bi-palette" />
              <span>Dual Styling</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              {lang === 'en'
                ? 'Tailwind CSS utility engine combined with Bootstrap icons.'
                : 'Mesin utilitas Tailwind CSS dipadukan dengan ikon Bootstrap.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
