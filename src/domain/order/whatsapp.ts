import { siteConfig } from '@/config/site.config';

export function buildWhatsAppUrl(message: string): string | null {
  const e164 = siteConfig.whatsappE164.replace(/\D/g, '');
  if (!e164) return null;
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}
