import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'src/config/site.config.ts');
const catalogPath = path.join(root, 'src/domain/catalog/products.data.ts');

const warnings = [];

const siteUrl = process.env.SITE_URL ?? '';
if (!siteUrl || siteUrl.includes('example.com')) {
  warnings.push('SITE_URL non impostata o ancora example.com (sitemap/canonical errati in produzione).');
}

const config = fs.readFileSync(configPath, 'utf8');
if (/whatsappE164:\s*''/.test(config)) {
  warnings.push('whatsappE164 vuoto: pulsante WhatsApp ordine disabilitato (solo tel/email/copia).');
}
if (config.includes('https://example.com')) {
  warnings.push('siteConfig.url contiene placeholder example.com — aggiornare prima del go-live.');
}

const catalog = fs.readFileSync(catalogPath, 'utf8');
if (catalog.includes('priceCents: null')) {
  warnings.push(
    'Prezzi numerici (priceCents) non impostati: assortimento OK (docs/listino.md), totali ordine «da confermare».',
  );
}
if (catalog.includes('placeholder-product.svg')) {
  warnings.push('Immagini placeholder nel catalogo (F11.04 / F01.02).');
}

if (warnings.length === 0) {
  console.log('check:release — nessun avviso.');
  process.exit(0);
}

console.log('check:release — avvisi pre-produzione:\n');
for (const w of warnings) console.log(`  • ${w}`);
console.log('\n(Uscita 0: non blocca CI; correggere prima del lancio pubblico.)');
process.exit(0);
