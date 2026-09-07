'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CodeViewer from '@/components/CodeViewer';
import Documentation from '@/components/Documentation';
import ZenControls from '@/components/ZenControls';

// Dynamically import Three.js Canvas to guarantee pure client-side WebGL rendering
const TheGreatDrawingRoom = dynamic(
  () => import('@/components/TheGreatDrawingRoom'),
  { ssr: false }
);

export default function Home() {
  const [isZenMode, setIsZenMode] = useState(false);
  const [lang, setLang] = useState<'en' | 'id'>('en');

  // Load language preference if available, default to English
  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem('zau_lang') as 'en' | 'id' | null;
      if (savedLang === 'en' || savedLang === 'id') {
        setLang(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSetLang = (newLang: 'en' | 'id') => {
    setLang(newLang);
    try {
      localStorage.setItem('zau_lang', newLang);
    } catch {
      // ignore
    }
  };

  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev);
  };

  return (
    <main className="relative min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
      {/* 3D Background Canvas - The Great Drawing Room */}
      <TheGreatDrawingRoom
        isZenMode={isZenMode}
        onToggleZen={toggleZenMode}
      />

      {/* Zen Mode Overlay Controls (appears only when UI is hidden) */}
      <ZenControls
        isZenMode={isZenMode}
        onToggleZen={toggleZenMode}
        lang={lang}
      />

      {/* Main Documentation UI Overlaid on 3D Background */}
      <div
        className={`relative z-10 transition-all duration-500 ${
          isZenMode
            ? 'opacity-0 pointer-events-none scale-95 translate-y-4'
            : 'opacity-100 pointer-events-auto scale-100 translate-y-0'
        }`}
      >
        <Navbar
          isZenMode={isZenMode}
          onToggleZen={toggleZenMode}
          lang={lang}
          onToggleLang={handleSetLang}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <Hero onToggleZen={toggleZenMode} lang={lang} />
          
          <div className="pt-2">
            <CodeViewer lang={lang} />
          </div>

          <Documentation lang={lang} onToggleLang={handleSetLang} />
        </div>
      </div>
    </main>
  );
}
