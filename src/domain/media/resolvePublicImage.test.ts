import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolvePublicImage } from './resolvePublicImage';

const fixtureDir = join(process.cwd(), 'public', 'images', '_test-fixture');

describe('resolvePublicImage', () => {
  beforeEach(() => {
    mkdirSync(fixtureDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('preferisce webp quando presente', () => {
    writeFileSync(join(fixtureDir, 'sample.webp'), '');
    writeFileSync(join(fixtureDir, 'sample.jpg'), '');
    expect(resolvePublicImage('images/_test-fixture/sample', '/fallback.svg')).toBe(
      '/images/_test-fixture/sample.webp',
    );
  });

  it('restituisce fallback se nessun file esiste', () => {
    expect(resolvePublicImage('images/_test-fixture/missing', '/images/placeholder.svg')).toBe(
      '/images/placeholder.svg',
    );
  });

  it('restituisce null se nessun file e fallback null', () => {
    expect(resolvePublicImage('images/_test-fixture/missing', null)).toBeNull();
  });
});
