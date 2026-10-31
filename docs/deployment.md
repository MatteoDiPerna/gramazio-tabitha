# Deployment e preparazione rilascio (F14–F15)

**Hosting di riferimento:** [Vercel](https://vercel.com) (`vercel.json` in root).  
Il file `netlify.toml` è legacy/opzionale: non usarlo salvo deploy esplicito su Netlify.

## Prerequisiti

- [ ] URL Vercel (preview o custom domain) definito
- [x] Assortimento listino in `products.data.ts` — sostituire prezzi **placeholder** prima del go-live pubblico
- [x] `whatsappE164` in `site.config.ts` (verificare numero ordini)
- [ ] Testi privacy/cookie revisionati da professionista (bozze tecniche in repo)

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
|-----------|--------------|-------------|
| `SITE_URL` | Sì (produzione/preview) | Es. `https://gramazio-tabitha.vercel.app` — sitemap e `import.meta.env.SITE` |

Copia [.env.example](../.env.example) in `.env` in locale per test build; **non** committare `.env`.

In dev, se `SITE_URL` non è impostata, canonical/sitemap usano il fallback documentato in `astro.config.mjs`.

## Build locale di verifica

```bash
npm ci
npm test
npm run lint
# Windows PowerShell:
$env:SITE_URL="https://tuo-progetto.vercel.app"
npm run build
npm run preview
npm run check:release
```

## Vercel

1. Collegare repository GitHub a Vercel.
2. Framework: **Astro** — `vercel.json` imposta `outputDirectory: dist` e header di sicurezza base.
3. Environment variable **`SITE_URL`** = URL del deployment (preview `*.vercel.app` o dominio custom).
4. Deploy → verificare HTTPS, `/404` custom, pagine statiche.

## Post-deploy (F15 smoke)

1. Homepage, catalogo, scheda prodotto, carrello, pagina 404 inesistente.
2. Ordine test → WhatsApp (se E.164 configurato), email, copia testo.
3. `/robots.txt` e `/sitemap-index.xml` con host corretto.
4. Link footer (privacy, note legali, contatti).

Vedi [testing.md](./testing.md) e [release-go-live.md](./release-go-live.md).
