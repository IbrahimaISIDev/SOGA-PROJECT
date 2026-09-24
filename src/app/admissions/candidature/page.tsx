import { getFormations } from "@/lib/api/formations";
import CandidatureWizard from "@/components/admissions/CandidatureWizard";

export default async function CandidaturePage() {
  const formations = await getFormations();
  return <CandidatureWizard formations={formations} />;
}
