"use client";

import { useEffect, useRef, useState } from "react";

interface Strate {
  height: number;
  color: "line" | "gold" | "petrol" | "muted";
  thickness: number;
}

const DEFAULT_STRATES: Strate[] = [
  { height: 32, color: "line", thickness: 1 },
  { height: 8, color: "gold", thickness: 2 },
  { height: 48, color: "line", thickness: 1 },
  { height: 4, color: "petrol", thickness: 1 },
  { height: 24, color: "line", thickness: 1 },
  { height: 12, color: "gold", thickness: 3 },
  { height: 64, color: "line", thickness: 1 },
  { height: 6, color: "petrol", thickness: 1 },
  { height: 32, color: "line", thickness: 1 },
  { height: 8, color: "gold", thickness: 2 },
  { height: 48, color: "line", thickness: 1 },
  { height: 4, color: "muted", thickness: 1 },
];

const colorMap = {
  line:   "var(--soga-line)",
  gold:   "var(--soga-gold)",
  petrol: "var(--soga-petrol)",
  muted:  "var(--soga-muted)",
};

type ColumnVariant = "hero" | "separator" | "semester";

interface StratigraphicColumnProps {
  variant?: ColumnVariant;
  strates?: Strate[];
  className?: string;
  progress?: number;
}

export default function StratigraphicColumn({
  variant = "separator",
  strates = DEFAULT_STRATES,
  className = "",
  progress,
}: StratigraphicColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(progress ?? 0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (variant !== "hero" || progress !== undefined) return;
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant, progress]);

  const totalHeight = strates.reduce((s, r) => s + r.height, 0);

  return (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={`relative flex flex-col ${className}`}
      style={{ width: "10px" }}
    >
      {strates.map((strate, i) => {
        const cumulative = strates.slice(0, i).reduce((s, r) => s + r.height, 0);
        const strateProgress = cumulative / totalHeight;
        const isActive =
          revealed &&
          (variant === "hero"
            ? scrollProgress >= strateProgress
            : true);

        return (
          <div
            key={i}
            style={{
              height: `${strate.height}px`,
              width: `${strate.thickness}px`,
              marginLeft: `${(10 - strate.thickness) / 2}px`,
              backgroundColor: isActive ? colorMap[strate.color] : colorMap.line,
              opacity: isActive ? (strate.color === "line" ? 0.4 : 1) : 0.15,
              transition: revealed
                ? `opacity 400ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, background-color 400ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms`
                : "none",
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Section separator variant (horizontal) ─────────────────── */
export function StratigraphicSeparator({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const segments = [
    { flex: 3, color: "var(--soga-line)", h: 1 },
    { flex: 0.5, color: "var(--soga-gold)", h: 2 },
    { flex: 2, color: "var(--soga-line)", h: 1 },
    { flex: 0.3, color: "var(--soga-petrol)", h: 1 },
    { flex: 4, color: "var(--soga-line)", h: 1 },
    { flex: 0.4, color: "var(--soga-gold)", h: 3 },
    { flex: 5, color: "var(--soga-line)", h: 1 },
    { flex: 0.3, color: "var(--soga-petrol)", h: 1 },
    { flex: 3, color: "var(--soga-line)", h: 1 },
  ];

  return (
    <div
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={`flex items-center h-[3px] w-full ${className}`}
    >
      {segments.map((seg, i) => (
        <div
          key={i}
          style={{
            flex: seg.flex,
            height: `${seg.h}px`,
            backgroundColor: seg.color,
            opacity: revealed ? (seg.color === "var(--soga-line)" ? 0.4 : 1) : 0,
            transition: revealed
              ? `opacity 350ms cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`
              : "none",
          }}
        />
      ))}
    </div>
  );
}
