"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Reveals content a short delay after mount (e.g. hero entrance).
 * Renders as already-revealed when the user prefers reduced motion,
 * computed at render time rather than via a synchronous setState in
 * the effect body.
 */
export function useRevealOnMount(delay = 0): boolean {
  const reduced = usePrefersReducedMotion();
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setElapsed(true), delay);
    return () => clearTimeout(t);
  }, [reduced, delay]);

  return reduced || elapsed;
}

/**
 * Reveals content once its element scrolls into view. Renders as
 * already-revealed when the user prefers reduced motion.
 */
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<T>(null);
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, threshold]);

  return { ref, revealed: reduced || intersected };
}
