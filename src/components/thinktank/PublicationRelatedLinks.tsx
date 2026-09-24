"use client";

import Link from "next/link";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";
const TT_BG_CARD = "#16181C";
const TT_BORDER = "#2a2d33";

interface RelatedPub {
  id: string;
  slug: string;
  titre: string;
  type: string;
  thematique: string;
}

export default function PublicationRelatedLinks({
  publications,
}: {
  publications: RelatedPub[];
}) {
  if (!publications.length) return null;

  return (
    <div className="space-y-3">
      {publications.map((p) => (
        <Link
          key={p.id}
          href={`/think-tank/publications/${p.slug}`}
          className="group flex gap-4 p-4 border rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            borderColor: TT_BORDER,
            backgroundColor: TT_BG_CARD,
            outlineColor: TT_GREEN,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = TT_GREEN + "60";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = TT_BORDER;
          }}
        >
          <span
            className="text-eyebrow text-[10px] shrink-0 mt-0.5 px-2 py-0.5 self-start"
            style={{ backgroundColor: TT_GREEN + "20", color: TT_GREEN_LIGHT }}
          >
            {p.type.toUpperCase()}
          </span>
          <div>
            <h3 className="text-[15px] font-medium text-white line-clamp-2 mb-1 group-hover:text-white/80 transition-colors">
              {p.titre}
            </h3>
            <p className="text-small" style={{ color: TT_GREEN_LIGHT + "aa" }}>
              {p.thematique}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
