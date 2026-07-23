import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="LÉGAL"
          title="Mentions légales"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Mentions légales" },
          ]}
        />
        <section className="section-gap bg-soga-sand">
          <div className="container-soga max-w-3xl">
            <div className="prose-like space-y-8 text-body text-soga-ink">
              <div>
                <h2 className="text-h3 mb-3">Éditeur du site</h2>
                <p className="text-soga-muted">
                  Senegal Oil and Gas Academy (SOGA)<br />
                  Dakar, Sénégal<br />
                  Tél : +221 78 103 23 70<br />
                  E-mail : direction@senegaloilandgasacademy.com
                </p>
              </div>
              <div>
                <h2 className="text-h3 mb-3">Hébergement</h2>
                <p className="text-soga-muted">
                  Contenu provisoire — informations d&apos;hébergement à compléter.
                </p>
              </div>
              <div id="cookies">
                <h2 className="text-h3 mb-3">Cookies</h2>
                <p className="text-soga-muted">
                  Ce site utilise des cookies strictement nécessaires à son fonctionnement.
                  Aucun cookie de traçage publicitaire n&apos;est utilisé. Vous pouvez désactiver
                  les cookies dans les paramètres de votre navigateur.
                </p>
              </div>
              <div>
                <h2 className="text-h3 mb-3">Propriété intellectuelle</h2>
                <p className="text-soga-muted">
                  L&apos;ensemble du contenu de ce site (textes, images, publications, marques)
                  est la propriété exclusive de SOGA. Toute reproduction est interdite sans
                  autorisation préalable.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
