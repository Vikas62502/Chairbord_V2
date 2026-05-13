import { useEffect, useRef } from 'react';

/**
 * Runs once after mount (stable even if parent re-renders).
 * In React 18 StrictMode (dev), effects may run twice — keep callbacks idempotent.
 */
export function useMountEffect(effect: () => void | (() => void)): void {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    return effectRef.current();
  }, []);
}
