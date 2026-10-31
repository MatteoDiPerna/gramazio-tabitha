import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Carica `.env` in process.env (solo chiavi non già impostate). */
function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

/** Root `.env` + `backoffice/.env`; allinea SANITY_* dalle variabili Studio. */
export function loadCmsEnv(): void {
  const root = process.cwd();
  loadEnvFile(join(root, '.env'));
  loadEnvFile(join(root, 'backoffice', '.env'));

  if (!process.env.SANITY_PROJECT_ID && process.env.SANITY_STUDIO_PROJECT_ID) {
    process.env.SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID;
  }
  if (!process.env.SANITY_DATASET && process.env.SANITY_STUDIO_DATASET) {
    process.env.SANITY_DATASET = process.env.SANITY_STUDIO_DATASET;
  }
}
