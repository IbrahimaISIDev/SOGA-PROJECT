import { sendNotificationEmail, escapeHtml } from "@/lib/mailer";
import { isNonEmptyString, isValidEmail } from "@/lib/validators";

const MOTIFS: Record<string, string> = {
  admissions: "Admissions",
  partenariat: "Partenariat",
  presse: "Presse",
  autre: "Autre",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, motif, message } = (body ?? {}) as Record<string, unknown>;

  if (
    !isNonEmptyString(nom) ||
    !isValidEmail(email) ||
    typeof motif !== "string" ||
    !(motif in MOTIFS) ||
    !isNonEmptyString(message, 10)
  ) {
    return Response.json({ ok: false, error: "Champs manquants ou invalides." }, { status: 400 });
  }

  const result = await sendNotificationEmail({
    subject: `Contact — ${MOTIFS[motif]} — ${nom}`,
    replyTo: email,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Motif :</strong> ${escapeHtml(MOTIFS[motif])}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: "Échec de l'envoi. Réessayez plus tard." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
