import { siteConfig } from '@/config/site.config';

const MAILTO_MAX_LENGTH = 1800;

export function buildMailtoUrl(subject: string, body: string): string {
  const to = siteConfig.ordersEmail;
  let safeBody = body;
  const base = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=`;
  if (base.length + encodeURIComponent(safeBody).length > MAILTO_MAX_LENGTH) {
    safeBody =
      `${body.slice(0, 400)}…\n\n[Elenco completo troncato per limiti del client email. Usa WhatsApp o contatta l'azienda.]`;
  }
  return `${base}${encodeURIComponent(safeBody)}`;
}
