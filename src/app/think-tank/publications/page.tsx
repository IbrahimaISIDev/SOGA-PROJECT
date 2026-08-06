import Link from "next/link";
import ThinkTankHeader from "@/components/thinktank/ThinkTankHeader";
import Footer from "@/components/layout/Footer";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import PublicationsFilter from "@/components/thinktank/PublicationsFilter";
import { publications, thematiques } from "@/data/thinktank";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";

export default function PublicationsPage() {
  return (
    <>
      <ThinkTankHeader activeSection="Publications" />
      <main id="main-content" className="bg-soga-black min-h-screen text-white">
        {/* Header */}
        <div className="pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="container-soga">
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex items-center gap-2 text-eyebrow text-white/40">
                <li>
                  <Link href="/think-tank" className="hover:text-white/60 transition-colors">
                    Think Tank
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" style={{ color: TT_GREEN_LIGHT }}>
                  Publications
                </li>
              </ol>
            </nav>
            <h1 className="text-h1 text-white">Publications & Policy Briefs</h1>
            <p className="text-lead text-white/60 mt-4 max-w-xl">
              Analyses, rapports de fond et notes de politique publique du Think Tank SOGA.
            </p>
          </div>
        </div>

        {publications.length > 0 ? (
          <PublicationsFilter publications={publications} thematiques={thematiques} />
        ) : (
          <div className="container-soga py-20 text-center">
            <p className="text-lead text-white/60 mb-2">
              Le Think Tank SOGA est en cours de lancement.
            </p>
            <p className="text-body text-white/40">
              Les premières publications seront mises en ligne dès leur parution.
            </p>
          </div>
        )}

        <StratigraphicSeparator className="mx-16 md:mx-24 opacity-30" />

        {/* CTA */}
        <section className="container-soga py-16 text-center max-w-2xl mx-auto">
          <p className="text-eyebrow mb-4" style={{ color: TT_GREEN }}>
            CONTRIBUER AU THINK TANK
          </p>
          <h2 className="text-h2 text-white mb-6">
            Proposer un article ou une collaboration.
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border text-[15px] font-medium min-h-[44px] text-white transition-colors hover:bg-[#1E6F5C20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: TT_GREEN, outlineColor: TT_GREEN }}
          >
            Nous contacter
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
