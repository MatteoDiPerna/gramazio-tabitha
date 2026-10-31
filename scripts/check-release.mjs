import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'src/config/site.config.ts');
const catalogPath = path.join(root, 'src/domain/catalog/products.data.ts');

const DEFAULT_SITE = 'https://gramazio-tabitha.netlify.app';
const warnings = [];

const siteUrl = (process.env.SITE_URL ?? DEFAULT_SITE).replace(/\/$/, '');
if (siteUrl.includes('example.com')) {
  warnings.push('SITE_URL punta a example.com — impostare dominio reale.');
}

const config = fs.readFileSync(configPath, 'utf8');
if (/whatsappE164:\s*''/.test(config)) {
  warnings.push('whatsappE164 vuoto: pulsante WhatsApp ordine disabilitato.');
}

const catalog = fs.readFileSync(catalogPath, 'utf8');
if (catalog.includes('priceCents: null')) {
  warnings.push('Alcune varianti senza priceCents — totali parziali in carrello.');
}
if (catalog.includes('placeholder-product.svg')) {
  warnings.push('Immagini placeholder nel catalogo.');
}

if (warnings.length === 0) {
  console.log('check:release — nessun avviso.');
  process.exit(0);
}

console.log('check:release — avvisi pre-produzione:\n');
for (const w of warnings) console.log(`  • ${w}`);
console.log('\n(Uscita 0: non blocca CI.)');
process.exit(0);
