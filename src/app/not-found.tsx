import Link from "next/link";

/* Stratigraphic bar pattern for 404: graphite / gold / graphite */
const BAR_404 =
  "repeating-linear-gradient(180deg,#3d4148 0,#3d4148 40px,#C9962C 40px,#C9962C 60px,#3d4148 60px,#3d4148 120px)";

export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{ margin: 0, backgroundColor: "#0B0C0E" }}>
        <main
          id="main-content"
          className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
          style={{ backgroundColor: "#0B0C0E" }}
        >
          {/* Left stratigraphic bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2"
            style={{ background: BAR_404 }}
            aria-hidden="true"
          />

          {/* 404 number */}
          <p
            className="font-display font-semibold leading-none mb-0"
            style={{ fontSize: "clamp(72px,12vw,96px)", color: "#C9962C" }}
            aria-hidden="true"
          >
            404
          </p>

          <h1
            className="font-display font-semibold mt-4 mb-3"
            style={{ fontSize: "clamp(20px,3vw,26px)", color: "#F6F4EF" }}
          >
            Cette page n&apos;existe pas
          </h1>

          <p
            className="text-[15px] mb-10 max-w-sm mx-auto px-6"
            style={{ color: "#B8B4A8" }}
          >
            La page recherchée a peut-être été déplacée ou renommée.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-semibold transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]"
            style={{
              backgroundColor: "#C9962C",
              color: "#0B0C0E",
              outlineColor: "#C9962C",
            }}
          >
            Retour à l&apos;accueil
          </Link>
        </main>
      </body>
    </html>
  );
}
