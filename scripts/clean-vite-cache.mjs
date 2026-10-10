import { rmSync } from 'node:fs';
import { join } from 'node:path';

const cacheDir = join(process.cwd(), 'node_modules', '.vite');
try {
  rmSync(cacheDir, { recursive: true, force: true });
} catch {
  // ignore
}
