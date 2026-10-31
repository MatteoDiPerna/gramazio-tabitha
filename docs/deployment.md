# Deployment e preparazione rilascio (F14–F15)

**Pre-staging (gratuito):** [Netlify](https://www.netlify.com) — [`netlify.toml`](../netlify.toml), guida [netlify-pre-staging.md](./netlify-pre-staging.md).  
**Vercel:** non usato in pre-staging (progetto rimosso); `vercel.json` opzionale/legacy.

## Prerequisiti

- [ ] URL Vercel (preview o custom domain) definito
- [x] Assortimento listino in `products.data.ts` — sostituire prezzi **placeholder** prima del go-live pubblico
- [x] `whatsappE164` in `site.config.ts` (verificare numero ordini)
- [ ] Testi privacy/cookie revisionati da professionista (bozze tecniche in repo)

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
|-----------|--------------|-------------|
| `SITE_URL` | Sì (produzione/preview) | Es. `https://gramazio-tabitha.netlify.app` — sitemap e `import.meta.env.SITE` |
| `SANITY_PROJECT_ID` | Con backoffice | Sync contenuti in `prebuild` |
| `SANITY_DATASET` | No | Default `production` |
| `SANITY_API_TOKEN` | Con backoffice | Token lettura dataset (solo server Vercel) |

Copia [.env.example](../.env.example) in `.env` in locale per test build; **non** committare `.env`.

In dev, se `SITE_URL` non è impostata, canonical/sitemap usano il fallback documentato in `astro.config.mjs`.

## Build locale di verifica

```bash
npm ci
npm test
npm run lint
# Windows PowerShell:
$env:SITE_URL="https://tuo-sito.netlify.app"
npm run build
npm run preview
npm run check:release
```

## Netlify (pre-staging)

**Procedura completa:** [netlify-pre-staging.md](./netlify-pre-staging.md) (include rimozione progetto Vercel).

In sintesi:

1. Import GitHub → repo root, build da `netlify.toml`.
2. Environment variable **`SITE_URL`** = URL `*.netlify.app` (senza slash finale) → redeploy.
3. Verificare HTTPS, `/404` custom, sitemap/robots con host corretto.

## Post-deploy (F15 smoke)

1. Homepage, catalogo, scheda prodotto, carrello, pagina 404 inesistente.
2. Ordine test → WhatsApp (se E.164 configurato), email, copia testo.
3. `/robots.txt` e `/sitemap-index.xml` con host corretto.
4. Link footer (privacy, note legali, contatti).

Vedi [testing.md](./testing.md) e [release-go-live.md](./release-go-live.md).
