# Deployment e preparazione rilascio (F14–F15)

## Prerequisiti

- [ ] Dominio registrato e DNS configurato (F14.01)
- [x] Assortimento listino allineato → [listino.md](./listino.md) (F14.02); foto prodotto ancora placeholder
- [ ] Dominio + `SITE_URL` (F14.01); email/tel in `site.config.ts` OK · **`whatsappE164` da configurare** (F08.01, posticipato)
- [ ] Testi legali revisionati da professionista

## Variabili d'ambiente

| Variabile | Obbligatoria | Descrizione |
|-----------|--------------|-------------|
| `SITE_URL` | Sì (produzione) | Es. `https://www.tuodominio.it` — alimenta sitemap e `import.meta.env.SITE` |

Copia [.env.example](../.env.example) in locale solo per test build; **non** committare `.env`.

Allineare anche `siteConfig.url` in `src/config/site.config.ts` al dominio reale (canonical/OG se `SITE` non impostato in dev).

## Build locale di verifica

```bash
npm ci
npm test
set SITE_URL=https://www.tuodominio.it   # Windows
npm run build
npm run preview
npm run check:release
```

## Netlify (consigliato)

1. Collegare repository GitHub.
2. Build command / publish directory: già in [netlify.toml](../netlify.toml).
3. Impostare `SITE_URL` nelle variabili d'ambiente.
4. Deploy → verificare HTTPS automatico (F12.01).

## Cloudflare Pages

- Build: `npm run build`
- Output: `dist`
- Variabile `SITE_URL` uguale al dominio Pages/custom domain.
- Header di sicurezza: usare regole Transform Rules o [public/_headers](../public/_headers) se supportati.

## Vercel

- Framework preset: Astro
- Output: `dist`
- Env: `SITE_URL`

## Post-deploy (F15 smoke)

1. Homepage, catalogo, scheda prodotto, carrello.
2. Ordine test → email / copia testo / telefono; WhatsApp dopo configurazione E.164.
3. `/robots.txt` e `/sitemap-index.xml`.
4. Link footer (privacy, contatti).

Vedi [testing.md](./testing.md) sezione F15.
