import { sendNotificationEmail, escapeHtml } from "@/lib/mailer";
import { isNonEmptyString, isValidEmail } from "@/lib/validators";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  const { nom, email, titre } = (body ?? {}) as Record<string, unknown>;

  if (!isNonEmptyString(nom) || !isValidEmail(email) || !isNonEmptyString(titre)) {
    return Response.json({ ok: false, error: "Champs manquants ou invalides." }, { status: 400 });
  }

  const result = await sendNotificationEmail({
    subject: `Inscription événement — ${titre}`,
    replyTo: email,
    html: `
      <p><strong>Événement :</strong> ${escapeHtml(titre)}</p>
      <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    `,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: "Échec de l'envoi. Réessayez plus tard." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
