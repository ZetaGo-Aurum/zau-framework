/**
 * ZAU Framework Runtime Chunk [runtime.js]
 * (c) 2026 ZetaGo-Aurum | admin@zetagoaurum.com | zetagoaurum.com
 */
(function(global) {
  'use strict';
  
  const subscribers = new Map();
  const stateStore = new Map();

  function useState(key, initialValue) {
    if (!stateStore.has(key)) {
      stateStore.set(key, initialValue);
      subscribers.set(key, new Set());
    }
    const get = () => stateStore.get(key);
    const set = (nextVal) => {
      const cur = stateStore.get(key);
      const val = typeof nextVal === 'function' ? nextVal(cur) : nextVal;
      stateStore.set(key, val);
      const listeners = subscribers.get(key);
      if (listeners) listeners.forEach(fn => fn(val));
    };
    return [get, set];
  }

  function useEffect(fn, deps) {
    if (typeof window !== 'undefined') {
      setTimeout(fn, 0);
    }
  }

  async function callAction(endpoint, payload = {}) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Action failed with status: ' + res.status);
      return await res.json();
    } catch (err) {
      console.error('[ZAU RPC Error]', endpoint, err);
      throw err;
    }
  }

  global.__ZAU_RUNTIME__ = {
    version: '1.0.2',
    useState,
    useEffect,
    callAction,
    stateStore
  };
  global.ZAU = global.__ZAU_RUNTIME__;
})(typeof window !== 'undefined' ? window : globalThis);
