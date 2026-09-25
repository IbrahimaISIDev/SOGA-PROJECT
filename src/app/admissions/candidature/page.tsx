import type { Metadata } from "next";
import { getFormations } from "@/lib/api/formations";
import CandidatureWizard from "@/components/admissions/CandidatureWizard";

export const metadata: Metadata = {
  title: "Candidature en ligne",
  description: "Soumettez votre dossier de candidature à la Senegal Oil and Gas Academy.",
};

export default async function CandidaturePage() {
  const formations = await getFormations();
  return <CandidatureWizard formations={formations} />;
}
