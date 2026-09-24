"use client";

import { useState } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnMount";

interface Semestre {
  numero: number;
  titre: string;
  ues: string[];
}

interface SemesterTimelineProps {
  semestres: Semestre[];
}

/* Couleur de strate progressive : gris foncé → pétrol → or profond → or */
function strateColor(index: number, total: number): string {
  const ratio = index / Math.max(total - 1, 1);
  if (ratio < 0.25) return "#3d4148";          // graphite sombre
  if (ratio < 0.5)  return "#0D2B3E";          // petrol
  if (ratio < 0.75) return "#8C6516";          // gold-deep
  return "#C9962C";                            // gold
}

export default function SemesterTimeline({ semestres }: SemesterTimelineProps) {
  const { ref, revealed } = useRevealOnScroll<HTMLDivElement>(0.2);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!semestres.length) {
    return (
      <div className="bg-soga-sand border border-soga-line rounded-md p-4 text-small text-soga-muted">
        Programme détaillé disponible sur demande.
      </div>
    );
  }

  return (
    <div ref={ref} className="flex gap-5">
      {/* Stratigraphic bars */}
      <div className="flex flex-col gap-1.5 pt-0.5 shrink-0" aria-hidden>
        {semestres.map((s, i) => (
          <div
            key={s.numero}
            style={{
              width: "10px",
              height: "44px",
              backgroundColor: strateColor(i, semestres.length),
              borderRadius: "2px",
              opacity: revealed ? 1 : 0.15,
              transform: revealed ? "scaleY(1)" : "scaleY(0.3)",
              transformOrigin: "top",
              transition: `opacity 400ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 400ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Semester content */}
      <div className="flex-1 flex flex-col gap-1.5">
        {semestres.map((s, i) => (
          <div
            key={s.numero}
            className="h-11 flex items-center cursor-pointer"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="flex items-baseline gap-3 min-w-0">
              <span
                className="text-eyebrow shrink-0 transition-colors duration-150"
                style={{ color: activeIndex === i ? strateColor(i, semestres.length) : "var(--soga-muted)" }}
              >
                S{s.numero}
              </span>
              <span className="text-[15px] font-medium text-soga-ink truncate">
                {s.titre}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* UEs tooltip on active */}
      {activeIndex !== null && (
        <div
          className="hidden lg:block w-52 shrink-0 border border-soga-line rounded-md bg-soga-surface p-4 self-start"
          style={{ marginTop: `${activeIndex * 44 + activeIndex * 6}px` }}
        >
          <p className="text-eyebrow text-soga-muted mb-2">
            Semestre {semestres[activeIndex].numero}
          </p>
          <p className="text-small font-medium text-soga-ink mb-3">
            {semestres[activeIndex].titre}
          </p>
          <ul className="space-y-1">
            {semestres[activeIndex].ues.map((ue) => (
              <li key={ue} className="text-small text-soga-muted flex gap-2">
                <span className="text-soga-gold shrink-0" aria-hidden>—</span>
                {ue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Compact semester list (mobile / sidebar) ───────────────── */
export function SemesterList({ semestres }: { semestres: Semestre[] }) {
  if (!semestres.length) return null;

  return (
    <ul className="space-y-4">
      {semestres.map((s) => (
        <li key={s.numero} className="flex gap-4">
          <span className="text-eyebrow text-soga-muted mt-0.5 shrink-0">S{s.numero}</span>
          <div>
            <p className="text-[15px] font-medium text-soga-ink">{s.titre}</p>
            <p className="text-small text-soga-muted mt-1">{s.ues.join(" · ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
