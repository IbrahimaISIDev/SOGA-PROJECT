import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.RESEND_FROM_EMAIL ?? "SOGA — Site institutionnel <onboarding@resend.dev>";
const TO = process.env.CONTACT_EMAIL_TO ?? "direction@senegaloilandgasacademy.com";

type SendResult = { ok: true; simulated: boolean } | { ok: false; simulated: false };

export async function sendNotificationEmail(input: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!resend) {
    console.warn(`[mailer] RESEND_API_KEY absente — email simulé (non envoyé) : "${input.subject}"`);
    return { ok: true, simulated: true };
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: input.subject,
    html: input.html,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
  });

  if (error) {
    console.error("[mailer] Échec d'envoi Resend :", error);
    return { ok: false, simulated: false };
  }

  return { ok: true, simulated: false };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
