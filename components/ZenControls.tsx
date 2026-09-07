'use client';

import React, { useEffect } from 'react';

interface ZenControlsProps {
  isZenMode: boolean;
  onToggleZen: () => void;
}

export default function ZenControls({ isZenMode, onToggleZen }: ZenControlsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.code === 'Space' && e.target === document.body)) {
        onToggleZen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleZen]);

  if (!isZenMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6">
      {/* Top Banner with Restore Button */}
      <div className="flex justify-between items-center pointer-events-auto">
        <div className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-zinc-200 flex items-center space-x-3 shadow-2xl border border-zinc-800">
          <i className="bi bi-compass text-amber-400 text-sm" />
          <span className="font-semibold text-amber-400">360° Spatial Immersion</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">Scene Unobstructed</span>
        </div>

        <button
          onClick={onToggleZen}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs tracking-wide shadow-gold-glow transition active:scale-95 cursor-pointer"
        >
          <i className="bi bi-eye-fill text-base" />
          <span>RESTORE UI</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-950/20 text-[10px] font-mono border border-zinc-950/30">
            ESC
          </kbd>
        </button>
      </div>

      {/* Center Guidance Hint */}
      <div className="self-center text-center opacity-80">
        <div className="px-4 py-2 rounded-xl glass-panel-subtle border border-zinc-800 text-xs text-zinc-300 font-mono flex items-center space-x-2">
          <i className="bi bi-arrows-move text-amber-400" />
          <span>Click and drag to rotate 360° canvas</span>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="flex justify-between items-end pointer-events-auto">
        <div className="max-w-md p-4 rounded-2xl glass-panel-glow border border-amber-500/30 text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <i className="bi bi-shield-check text-amber-400" />
            <h4 className="font-bold text-zinc-100">The Great Drawing Room</h4>
          </div>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            The Hallwyl Museum (Stockholm, Sweden). Historic Rococo &amp; Baroque interior photogrammetry rendered natively via ZAU Three.js Spatial Engine.
          </p>
          <div className="pt-2 flex items-center space-x-3 text-[10px] font-mono text-zinc-500">
            <span>License: CC BY 4.0</span>
            <span>•</span>
            <a
              href="https://hallwylskamuseet.se"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline"
            >
              The Hallwyl Collection
            </a>
          </div>
        </div>

        <button
          onClick={onToggleZen}
          className="p-3.5 rounded-2xl glass-panel-glow text-amber-400 hover:text-amber-300 hover:border-amber-400 transition active:scale-95"
          title="Return to Documentation"
        >
          <i className="bi bi-arrow-up-left-circle-fill text-2xl" />
        </button>
      </div>
    </div>
  );
}
