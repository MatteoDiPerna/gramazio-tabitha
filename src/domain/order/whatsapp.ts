import { siteClientConfig } from '@/config/site.client';

export function buildWhatsAppUrl(message: string): string | null {
  const e164 = siteClientConfig.whatsappE164.replace(/\D/g, '');
  if (!e164) return null;
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}
