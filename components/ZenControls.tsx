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
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top Floating Exit Pill (Sleek, Unobtrusive, Zero Center Distraction) */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300">
        <button
          onClick={onToggleZen}
          className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-zinc-950/85 hover:bg-zinc-900 text-amber-400 hover:text-amber-300 font-mono text-xs font-semibold border border-amber-500/40 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer group"
          title="Keluar dari Mode Bersih (ESC)"
        >
          <i className="bi bi-x-circle-fill text-sm group-hover:rotate-90 transition-transform duration-200" />
          <span>Keluar Mode Bersih</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-zinc-700/80">
            ESC
          </kbd>
        </button>
      </div>
    </div>
  );
}
