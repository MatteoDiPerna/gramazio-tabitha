/**
 * Genera src/generated/cms/bundle.json dai seed legacy (bootstrap / CI senza Sanity).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildLegacyBundle } from '../../src/cms/legacyBundle.ts';

const bundle = buildLegacyBundle();
bundle.syncedAt = new Date().toISOString();

const outDir = join(process.cwd(), 'src/generated/cms');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'bundle.json'), `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
console.log(`Scritto ${join(outDir, 'bundle.json')} (${bundle.catalog.length} prodotti)`);
