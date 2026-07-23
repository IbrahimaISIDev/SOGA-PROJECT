import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header variant="dark" />
      <main className="flex-1 flex flex-col items-center justify-center section-gap bg-soga-sand text-center">
        <div className="container-soga max-w-xl">
          <span className="font-display text-[120px] text-soga-line leading-none block">
            404
          </span>
          <h1 className="text-h2 text-soga-ink mb-4">Page introuvable</h1>
          <p className="text-lead text-soga-muted mb-8">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-soga-black text-soga-gold-light border border-soga-gold text-[15px] font-medium hover:bg-soga-graphite transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
