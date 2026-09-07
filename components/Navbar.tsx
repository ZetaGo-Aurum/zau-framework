'use client';

import React, { useState } from 'react';

interface NavbarProps {
  isZenMode: boolean;
  onToggleZen: () => void;
}

export default function Navbar({ isZenMode, onToggleZen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full px-4 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto rounded-2xl glass-panel px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl border border-amber-500/20">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="flex items-center space-x-3 group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-gold-glow">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center font-black text-amber-400 text-xl group-hover:text-amber-300 transition">
                Z
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-amber-400 transition">
                  ZAU
                </span>
                <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  v1.0.2
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
                ZetaGo-Aurum Unified Framework
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-zinc-300">
          <a
            href="#architecture"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-diagram-3 text-amber-400/80" />
            <span>Architecture</span>
          </a>
          <a
            href="#asgi-core"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-cpu text-amber-400/80" />
            <span>Python ASGI</span>
          </a>
          <a
            href="#async-orm"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-database text-amber-400/80" />
            <span>Async ORM</span>
          </a>
          <a
            href="#spatial-3d"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-box text-amber-400/80" />
            <span>3D Spatial</span>
          </a>
          <a
            href="#dual-styling"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-palette text-amber-400/80" />
            <span>Dual Styling</span>
          </a>
          <a
            href="#deployment"
            className="hover:text-amber-400 transition flex items-center space-x-1.5"
          >
            <i className="bi bi-cloud-arrow-up text-amber-400/80" />
            <span>Deploy</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Zen Mode / Hide UI Button */}
          <button
            onClick={onToggleZen}
            title="Hide UI to inspect full 360° The Great Drawing Room"
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 transition active:scale-95 shadow-sm"
          >
            <i className="bi bi-eye-slash-fill text-sm text-amber-400" />
            <span className="hidden md:inline">360° Immersion</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 hidden lg:inline">
              ESC
            </span>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/ZetaGo-Aurum/zau-framework"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl glass-panel-subtle text-zinc-300 hover:text-white hover:border-zinc-600 transition"
            title="GitHub Repository"
          >
            <i className="bi bi-github text-lg" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl glass-panel-subtle text-zinc-300 hover:text-white lg:hidden transition"
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-lg`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel-glow p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-zinc-300">
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-diagram-3 text-amber-400" />
              <span>Architecture (RFC-001)</span>
            </a>
            <a
              href="#asgi-core"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-cpu text-amber-400" />
              <span>Python ASGI Engine</span>
            </a>
            <a
              href="#async-orm"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-database text-amber-400" />
              <span>Async Database ORM</span>
            </a>
            <a
              href="#spatial-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-box text-amber-400" />
              <span>3D Spatial Canvas (model/3d/)</span>
            </a>
            <a
              href="#dual-styling"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-palette text-amber-400" />
              <span>Dual Styling (Tailwind + Bootstrap)</span>
            </a>
            <a
              href="#deployment"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-zinc-800/60 flex items-center space-x-2"
            >
              <i className="bi bi-cloud-arrow-up text-amber-400" />
              <span>Deployment Matrix</span>
            </a>
          </nav>
          <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>Contact: admin@zetagoaurum.com</span>
            <span className="text-amber-400">zetagoaurum.com</span>
          </div>
        </div>
      )}
    </header>
  );
}
