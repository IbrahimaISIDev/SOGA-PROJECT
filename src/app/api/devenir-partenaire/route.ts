import { sendNotificationEmail, escapeHtml } from "@/lib/mailer";
import { isNonEmptyString, isValidEmail } from "@/lib/validators";

const TYPES: Record<string, string> = {
  entreprise: "Entreprise",
  academique: "Institution académique",
  ong: "ONG / bailleur",
  ministere: "Ministère",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  const { org, type, contact, email, objet } = (body ?? {}) as Record<string, unknown>;

  if (
    !isNonEmptyString(org) ||
    typeof type !== "string" ||
    !(type in TYPES) ||
    !isNonEmptyString(contact) ||
    !isValidEmail(email) ||
    !isNonEmptyString(objet, 20)
  ) {
    return Response.json({ ok: false, error: "Champs manquants ou invalides." }, { status: 400 });
  }

  const result = await sendNotificationEmail({
    subject: `Demande de partenariat — ${org}`,
    replyTo: email,
    html: `
      <p><strong>Organisation :</strong> ${escapeHtml(org)}</p>
      <p><strong>Type de partenariat :</strong> ${escapeHtml(TYPES[type])}</p>
      <p><strong>Personne contact :</strong> ${escapeHtml(contact)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Objet :</strong></p>
      <p>${escapeHtml(objet).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: "Échec de l'envoi. Réessayez plus tard." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
