'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isZenMode: boolean;
  onToggleZen: () => void;
}

export default function Navbar({ isZenMode, onToggleZen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full px-2.5 sm:px-4 lg:px-8 pt-3 sm:pt-4 pb-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto rounded-2xl glass-panel bg-zinc-950/80 backdrop-blur-xl px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between shadow-2xl border border-amber-500/20">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
          <a
            href="#"
            className="flex items-center space-x-2.5 sm:space-x-3 group transition-transform active:scale-95"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-gold-glow flex-shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center font-black text-amber-400 text-lg sm:text-xl group-hover:text-amber-300 transition">
                Z
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-400 transition leading-none">
                  ZAU
                </span>
                <span className="text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 font-semibold leading-none">
                  v1.0.3
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono hidden 2xl:block truncate max-w-[200px] mt-0.5 leading-none">
                ZetaGo-Aurum Unified Framework
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links - Guaranteed single-line, zero wrapping */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 text-xs xl:text-sm font-medium text-zinc-300">
          <a
            href="#architecture"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-diagram-3 text-amber-400 text-xs xl:text-sm" />
            <span>Architecture</span>
          </a>
          <a
            href="#asgi-core"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-cpu text-amber-400 text-xs xl:text-sm" />
            <span>ASGI</span>
          </a>
          <a
            href="#async-orm"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-database text-amber-400 text-xs xl:text-sm" />
            <span>ORM</span>
          </a>
          <a
            href="#spatial-3d"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-box text-amber-400 text-xs xl:text-sm" />
            <span>3D Spatial</span>
          </a>
          <a
            href="#zau-ecosystem"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-code-slash text-amber-400 text-xs xl:text-sm" />
            <span>.zau</span>
          </a>
          <a
            href="#dual-styling"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-palette text-amber-400 text-xs xl:text-sm" />
            <span>Styling</span>
          </a>
          <a
            href="#deployment"
            className="px-2.5 py-1.5 rounded-xl hover:bg-zinc-800/60 hover:text-amber-300 text-zinc-300 transition-all flex items-center space-x-1.5 whitespace-nowrap"
          >
            <i className="bi bi-cloud-arrow-up text-amber-400 text-xs xl:text-sm" />
            <span>Deploy</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
          {/* Mode Bersih Button */}
          <button
            onClick={onToggleZen}
            title="Mode Bersih 360° Spatial Canvas (ESC)"
            className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/35 transition active:scale-95 shadow-sm flex-shrink-0 whitespace-nowrap"
          >
            <i className="bi bi-eye-slash-fill text-xs sm:text-sm text-amber-400" />
            <span className="hidden sm:inline">Mode Bersih</span>
            <span className="sm:hidden text-[11px] font-mono">Zen</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30 hidden 2xl:inline">
              ESC
            </kbd>
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/ZetaGo-Aurum/zau-framework"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:p-2 rounded-xl glass-panel-subtle text-zinc-300 hover:text-white hover:border-zinc-600 transition flex-shrink-0 flex items-center justify-center"
            title="GitHub Repository"
          >
            <i className="bi bi-github text-base sm:text-lg" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu Navigasi"
            className={`p-1.5 sm:p-2 rounded-xl glass-panel-subtle lg:hidden transition flex-shrink-0 flex items-center justify-center ${
              mobileMenuOpen
                ? 'text-amber-400 border border-amber-500/40 bg-amber-500/10'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-base sm:text-lg`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel-glow bg-zinc-950/95 backdrop-blur-2xl p-3.5 sm:p-4 border border-amber-500/30 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-5.5rem)] overflow-y-auto overscroll-contain">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold px-2 py-1 border-b border-zinc-800/80 flex items-center justify-between">
            <span>Daftar Navigasi Dokumentasi</span>
            <span className="text-[10px] text-zinc-500">v1.0.3</span>
          </div>
          <nav className="flex flex-col space-y-1 text-xs sm:text-sm font-medium text-zinc-200">
            {[
              { href: '#architecture', icon: 'bi-diagram-3', title: 'Architecture RFC-001', desc: 'Hybrid Python-JS Unified Spec' },
              { href: '#asgi-core', icon: 'bi-cpu', title: 'Python ASGI Engine', desc: 'Zero-overhead async core' },
              { href: '#async-orm', icon: 'bi-database', title: 'Async Database ORM', desc: 'Declarative async schemas' },
              { href: '#spatial-3d', icon: 'bi-box', title: '3D Spatial Canvas', desc: 'Salt Tower Photogrammetry' },
              { href: '#zau-ecosystem', icon: 'bi-code-slash', title: 'Ekosistem .zau & LSP', desc: 'VS Code, Neovim, Zed, Helix' },
              { href: '#dual-styling', icon: 'bi-palette', title: 'Dual Styling Engine', desc: 'Tailwind + Bootstrap CSS' },
              { href: '#deployment', icon: 'bi-cloud-arrow-up', title: 'Deployment Matrix', desc: 'Vercel, Docker, Bare Metal' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-zinc-800/70 active:bg-amber-500/20 flex items-center justify-between transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <i className={`bi ${item.icon} text-sm`} />
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-100 group-hover:text-amber-300 transition block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono block">
                      {item.desc}
                    </span>
                  </div>
                </div>
                <i className="bi bi-chevron-right text-xs text-zinc-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </nav>
          <div className="pt-2.5 border-t border-zinc-800/80 flex justify-between items-center text-[10px] sm:text-xs font-mono text-zinc-400 px-2">
            <span className="truncate">admin@zetagoaurum.com</span>
            <a
              href="https://zetagoaurum.com"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline flex-shrink-0"
            >
              zetagoaurum.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
