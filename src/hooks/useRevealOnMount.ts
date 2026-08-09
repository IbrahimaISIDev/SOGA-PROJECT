"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Reveals content once its element scrolls into view. Renders as
 * already-revealed when the user prefers reduced motion.
 *
 * Elements observed at the default threshold (used by every call site
 * today) share a single IntersectionObserver instead of each mounting
 * its own — dozens of ScrollReveal instances on a page would otherwise
 * mean dozens of observers doing the same job.
 */
const DEFAULT_THRESHOLD = 0.2;
let sharedObserver: IntersectionObserver | null = null;
const sharedCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = sharedCallbacks.get(entry.target);
          if (cb) {
            cb();
            sharedObserver!.unobserve(entry.target);
            sharedCallbacks.delete(entry.target);
          }
        }
      },
      { threshold: DEFAULT_THRESHOLD }
    );
  }
  return sharedObserver;
}

export function useRevealOnScroll<T extends HTMLElement>(threshold = DEFAULT_THRESHOLD) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<T>(null);
  const [intersected, setIntersected] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    if (threshold === DEFAULT_THRESHOLD) {
      const observer = getSharedObserver();
      sharedCallbacks.set(el, () => setIntersected(true));
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        sharedCallbacks.delete(el);
      };
    }

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
