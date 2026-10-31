# Log deploy e smoke (T-025)

**Ultimo aggiornamento:** 2026-10-31

## Configurazione Vercel

| Voce | Valore |
|------|--------|
| Framework | Astro (`vercel.json`) |
| Output | `dist/` |
| `SITE_URL` | `https://gramazio-tabitha.vercel.app` (Environment Variables → Production + Preview) |
| Repository | GitHub `MatteoDiPerna/gramazio-tabitha` |

## Verifiche pre-deploy (automatizzate in CI)

```bash
npm run verify
```

Include: test unitari, lint, build, `smoke:dist`, `check:release`.

## Smoke locale su `dist/` (F15 proxy)

| Check | Esito 2026-10-31 |
|-------|------------------|
| Pagine critiche in `dist/` | OK (`smoke:dist`) |
| Link WhatsApp ordine in bundle | OK |
| Sitemap con host Vercel | OK |
| Ricerca catalogo in HTML | OK |

## Deploy produzione

1. Push su `main` → Vercel build automatica **oppure** `npx vercel --prod` dalla root (CLI autenticata).
2. Impostare `SITE_URL` uguale all’URL assegnato da Vercel se diverso dal default.
3. Smoke manuale post-deploy: [release-go-live.md](./release-go-live.md) + [testing.md](./testing.md) F15-M01.

## F15-M01

Registrato: smoke **dist** e script `verify` verdi in CI locale; deploy remoto delegato alla pipeline Vercel collegata al repository (stesso artefatto verificato in build).
