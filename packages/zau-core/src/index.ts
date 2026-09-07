/**
 * @zau/core
 * Client Runtime, Reactivity Signals, and Native 3D Spatial Canvas for ZAU Framework.
 * (c) 2026 ZetaGo-Aurum <admin@zetagoaurum.com> | zetagoaurum.com
 */

export interface ActionResponse<T = any> {
  data?: T;
  error?: string;
  status: string;
}

/**
 * Call a server action RPC endpoint on the ZAU Python backend.
 */
export async function callAction<T = any>(endpoint: string, payload: Record<string, any> = {}): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`ZAU Action failed: ${response.statusText} (${response.status})`);
  }
  return await response.json();
}

/**
 * Minimal lightweight Signal implementation for reactive state.
 */
export function useState<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
  let value = initialValue;
  const subscribers = new Set<() => void>();

  const get = () => value;
  const set = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === 'function') {
      value = (newValue as any)(value);
    } else {
      value = newValue;
    }
    subscribers.forEach(fn => fn());
  };

  return [get, set];
}

/**
 * Effect hook executed on state change.
 */
export function useEffect(callback: () => void | (() => void), deps?: any[]): void {
  // In browser runtime, invoke immediately
  const cleanup = callback();
  if (typeof cleanup === 'function' && typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanup, { once: true });
  }
}

/**
 * Animation loop hook operating at 60fps/120fps with delta time.
 */
export function useFrame(callback: (state: any, delta: number) => void): void {
  if (typeof window === 'undefined') return;
  let last = performance.now();
  function loop(time: number) {
    const delta = (time - last) / 1000;
    last = time;
    callback({}, delta);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/**
 * ZAU Global Runtime Namespace
 */
export const ZAU = {
  callAction,
  useState,
  useEffect,
  useFrame,
  version: '1.0.0'
};

export default ZAU;
