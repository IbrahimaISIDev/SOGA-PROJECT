"use client";

/* Stratigraphic bar pattern for 500: graphite / petrol / graphite */
const BAR_500 =
  "repeating-linear-gradient(180deg,#3d4148 0,#3d4148 30px,#0D2B3E 30px,#0D2B3E 90px,#3d4148 90px,#3d4148 100px)";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
            style={{ background: BAR_500 }}
            aria-hidden="true"
          />

          {/* 500 number */}
          <p
            className="font-display font-semibold leading-none mb-0"
            style={{ fontSize: "clamp(72px,12vw,96px)", color: "#8C6516" }}
            aria-hidden="true"
          >
            500
          </p>

          <h1
            className="font-display font-semibold mt-4 mb-3"
            style={{ fontSize: "clamp(20px,3vw,26px)", color: "#F6F4EF" }}
          >
            Une erreur est survenue
          </h1>

          <p
            className="text-[15px] mb-10 max-w-sm mx-auto px-6"
            style={{ color: "#B8B4A8" }}
          >
            Nos équipes techniques ont été notifiées. Réessayez dans quelques instants.
          </p>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[14px] font-semibold transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]"
            style={{
              backgroundColor: "#C9962C",
              color: "#0B0C0E",
              outlineColor: "#C9962C",
            }}
          >
            Réessayer
          </button>
        </main>
      </body>
    </html>
  );
}
