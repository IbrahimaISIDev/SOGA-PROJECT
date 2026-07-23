"use client";

import Link from "next/link";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";
const TT_BG_CARD = "#16181C";
const TT_BORDER = "#2a2d33";

interface PublicationSidebarProps {
  auteurs: string[];
  dateFormatted: string;
  thematique: string;
  type: string;
  telechargeable: boolean;
}

export default function PublicationSidebar({
  auteurs,
  dateFormatted,
  thematique,
  type,
  telechargeable,
}: PublicationSidebarProps) {
  return (
    <aside
      className="lg:sticky lg:top-20 h-fit rounded-md p-6 border space-y-5"
      style={{ backgroundColor: TT_BG_CARD, borderColor: TT_BORDER }}
      aria-label="Informations sur la publication"
    >
      {/* Download CTA */}
      {telechargeable && (
        <button
          className="w-full px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]"
          style={{ backgroundColor: TT_GREEN, outlineColor: TT_GREEN }}
        >
          Télécharger le PDF ↓
        </button>
      )}

      <div
        className="space-y-4 border-t pt-5"
        style={{ borderColor: TT_BORDER }}
      >
        <div>
          <p className="text-eyebrow text-white/40 mb-2">AUTEUR(S)</p>
          <p className="text-[15px] text-white">{auteurs.join(", ")}</p>
        </div>
        <div>
          <p className="text-eyebrow text-white/40 mb-2">DATE</p>
          <p className="text-[15px] text-white">{dateFormatted}</p>
        </div>
        <div>
          <p className="text-eyebrow text-white/40 mb-2">THÉMATIQUE</p>
          <p className="text-[15px]" style={{ color: TT_GREEN_LIGHT }}>
            {thematique}
          </p>
        </div>
        <div>
          <p className="text-eyebrow text-white/40 mb-2">TYPE</p>
          <span
            className="text-eyebrow text-[11px] px-2.5 py-1"
            style={{ backgroundColor: TT_GREEN + "20", color: TT_GREEN_LIGHT }}
          >
            {type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Share */}
      <div className="border-t pt-5" style={{ borderColor: TT_BORDER }}>
        <p className="text-eyebrow text-white/40 mb-3">PARTAGER</p>
        <div className="flex gap-3">
          {["LinkedIn", "X", "E-mail"].map((s) => (
            <button
              key={s}
              className="text-small px-3 py-1.5 border min-h-[36px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                borderColor: TT_BORDER,
                color: "rgba(246,244,239,0.5)",
                outlineColor: TT_GREEN,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = TT_GREEN;
                el.style.color = TT_GREEN_LIGHT;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = TT_BORDER;
                el.style.color = "rgba(246,244,239,0.5)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="border-t pt-5" style={{ borderColor: TT_BORDER }}>
        <Link
          href="/think-tank/publications"
          className="text-small transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color: TT_GREEN_LIGHT + "aa", outlineColor: TT_GREEN }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = TT_GREEN_LIGHT;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = TT_GREEN_LIGHT + "aa";
          }}
        >
          ← Toutes les publications
        </Link>
      </div>
    </aside>
  );
}
