/**
 * ZAU Hydration & Main App Chunk [main-app.js]
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  function hydrate() {
    const dataEl = document.getElementById('__ZAU_DATA__');
    let zauData = {};
    if (dataEl) {
      try { zauData = JSON.parse(dataEl.textContent); }
      catch (e) { console.error('Failed to parse __ZAU_DATA__', e); }
    }
    console.log('%c[ZAU Framework v1.0.1]%c Chunk Hydration Completed cleanly.', 'color:#f59e0b; font-weight:bold;', 'color:#38bdf8;');

    // Initialize 3D Spatial Canvas if container present
    if (global.__ZAUSpatialRenderer__ && document.getElementById('hero-3d-mount')) {
      new global.__ZAUSpatialRenderer__('hero-3d-mount');
    }

    // Code Tab Switcher
    if (global.switchTab) {
      global.switchTab('component');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
})(typeof window !== 'undefined' ? window : globalThis);
