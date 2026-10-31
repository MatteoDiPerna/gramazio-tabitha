import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const site = (process.env.SITE_URL ?? 'https://gramazio-tabitha.vercel.app').replace(/\/$/, '');

const requiredFiles = [
  'index.html',
  '404.html',
  'carrello/index.html',
  'catalogo/index.html',
  'prodotti/olio-extravergine-biologico/index.html',
  'robots.txt',
  'sitemap-index.xml',
];

const errors = [];

for (const rel of requiredFiles) {
  const full = path.join(dist, rel);
  if (!fs.existsSync(full)) {
    errors.push(`File mancante in dist: ${rel}`);
  }
}

function distContains(substr) {
  const stack = [dist];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (/\.(html|js|mjs)$/i.test(ent.name)) {
        if (fs.readFileSync(full, 'utf8').includes(substr)) return true;
      }
    }
  }
  return false;
}

if (!distContains('wa.me/393299147756')) {
  errors.push('Build: link WhatsApp ordine (wa.me) non trovato in dist.');
}
if (!distContains('Ordina via email')) {
  errors.push('Build: copy ordine email non trovata in dist.');
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8');
if (!sitemap.includes(site.replace('https://', ''))) {
  errors.push(`Sitemap non contiene host atteso: ${site}`);
}

const catalogHtml = fs.readFileSync(path.join(dist, 'catalogo/index.html'), 'utf8');
if (!catalogHtml.includes('data-catalog-search')) {
  errors.push('Catalogo: campo ricerca non presente.');
}

if (errors.length) {
  console.error('smoke:dist — FALLITO:\n');
  for (const e of errors) console.error(`  • ${e}`);
  process.exit(1);
}

console.log('smoke:dist — OK (host sitemap:', site, ')');
