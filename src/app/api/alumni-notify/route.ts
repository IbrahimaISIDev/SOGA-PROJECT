import { sendNotificationEmail, escapeHtml } from "@/lib/mailer";
import { isValidEmail } from "@/lib/validators";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Corps de requête invalide." }, { status: 400 });
  }

  const { email } = (body ?? {}) as Record<string, unknown>;

  if (!isValidEmail(email)) {
    return Response.json({ ok: false, error: "Adresse e-mail invalide." }, { status: 400 });
  }

  const result = await sendNotificationEmail({
    subject: "Nouvelle demande — Notification lancement réseau alumni",
    replyTo: email,
    html: `<p>Une personne souhaite être informée du lancement du réseau alumni : <strong>${escapeHtml(email)}</strong></p>`,
  });

  if (!result.ok) {
    return Response.json({ ok: false, error: "Échec de l'envoi. Réessayez plus tard." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
