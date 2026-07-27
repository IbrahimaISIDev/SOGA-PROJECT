import { formations } from "@/data/formations";
import CandidatureWizard from "@/components/admissions/CandidatureWizard";

export default function CandidaturePage() {
  return <CandidatureWizard formations={formations} />;
}
