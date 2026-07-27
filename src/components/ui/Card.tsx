import Image from "next/image";
import Badge from "./Badge";
import type { Formation } from "@/data/formations";
import type { Article, Evenement } from "@/data/actualites";

/* ─── Formation card ─────────────────────────────────────────── */
export function CardFormation({ formation }: { formation: Formation }) {
  return (
    <a
      href={`/formations/${formation.slug}`}
      className="group card-lift block bg-white border border-soga-line rounded-md overflow-hidden hover:border-soga-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
    >
      <div className="p-6 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-3">
          <span className="text-eyebrow text-soga-muted">{formation.code}</span>
          {formation.placesLimitees && (
            <Badge variant="places">Places limitées</Badge>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-h3 line-clamp-2 group-hover:text-soga-gold-deep transition-colors">
            {formation.titre}
          </h3>
          <p className="text-small text-soga-muted mt-2 line-clamp-3">
            {formation.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-soga-line">
          <Badge variant="niveau">{formation.niveau}</Badge>
          <Badge variant="duree">{formation.duree}</Badge>
          <Badge variant="rentree">{formation.rentree}</Badge>
        </div>
      </div>
    </a>
  );
}

/* ─── Actualité card ─────────────────────────────────────────── */
export function CardActualite({ article }: { article: Article }) {
  const dateFormatted = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <a
      href={`/actualites/${article.slug}`}
      className="group block bg-white border border-soga-line rounded-md overflow-hidden card-img-hover card-lift hover:border-soga-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
    >
      <div className="aspect-[16/9] overflow-hidden bg-soga-graphite relative">
        {article.image ? (
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full placeholder-block flex items-end p-4">
            <span className="text-eyebrow text-soga-line/60">
              Photo provisoire
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Badge>{article.categorie}</Badge>
          <span className="text-small text-soga-muted">{dateFormatted}</span>
        </div>
        <h3 className="text-h3 text-[18px] line-clamp-2 group-hover:text-soga-gold-deep transition-colors">
          {article.titre}
        </h3>
        <p className="text-small text-soga-muted line-clamp-3">
          {article.extrait}
        </p>
      </div>
    </a>
  );
}

/* ─── Événement card ─────────────────────────────────────────── */
export function CardEvenement({ evenement }: { evenement: Evenement }) {
  const date = new Date(evenement.date);
  const jour = date.toLocaleDateString("fr-FR", { day: "2-digit" });
  const mois = date.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();

  return (
    <a
      href={`/actualites/evenements/${evenement.slug}`}
      className="group card-lift flex gap-5 p-5 bg-white border border-soga-line rounded-md hover:border-soga-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
    >
      <div className="shrink-0 w-14 text-center">
        <div className="text-h2 text-[28px] font-display text-soga-gold-deep leading-none">
          {jour}
        </div>
        <div className="text-eyebrow text-soga-muted mt-1">{mois}</div>
      </div>
      <div className="flex-1 min-w-0">
        <Badge className="mb-2">{evenement.type}</Badge>
        <h3 className="text-[16px] font-medium line-clamp-2 group-hover:text-soga-gold-deep transition-colors">
          {evenement.titre}
        </h3>
        <p className="text-small text-soga-muted mt-1">
          {evenement.heure} · {evenement.lieu}
        </p>
      </div>
    </a>
  );
}

/* ─── Membre card ────────────────────────────────────────────── */
export function CardMembre({
  membre,
}: {
  membre: { id: string; nom: string; titre: string; specialite?: string; portrait: string | null };
}) {
  return (
    <div className="bg-white border border-soga-line rounded-md overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden bg-soga-graphite relative">
        {membre.portrait ? (
          <Image
            src={membre.portrait}
            alt={`Portrait de ${membre.nom}`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full placeholder-block flex items-end p-4">
            <span className="text-eyebrow text-soga-line/60">
              Portrait provisoire
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-medium text-soga-ink">{membre.nom}</p>
        <p className="text-small text-soga-muted mt-0.5">{membre.titre}</p>
        {membre.specialite && (
          <Badge className="mt-3">{membre.specialite}</Badge>
        )}
      </div>
    </div>
  );
}
