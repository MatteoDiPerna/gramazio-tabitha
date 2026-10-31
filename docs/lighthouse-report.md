# Lighthouse — collaudo performance (T-019)

**Data:** 2026-10-31  
**Metodo:** build statico (`npm run build` con `SITE_URL=https://gramazio-tabitha.vercel.app`) + verifica asset; audit Lighthouse consigliato su URL Vercel post-deploy con Chrome DevTools (mobile, throttling 4G).

## URL analizzati (percorso critico)

| Pagina | Path |
|--------|------|
| Home | `/` |
| Catalogo | `/catalogo` |
| Scheda prodotto | `/prodotti/olio-extravergine-biologico` |
| Carrello | `/carrello` |

## Interventi applicati in repo (prerequisiti score)

- Hero home via `homeMedia.heroBanner` → preferenza **WebP** quando presente (`hero-banner.webp`).
- Strip home già in WebP (`strip-*.webp`).
- React islands solo su carrello, FAQ, viewer prodotto (`client:visible` / `client:load` mirati).
- Font Google con `display=swap` e `preconnect` in `BaseLayout.astro`.
- Tap target: `--touch-min` su filtri catalogo, CTA `.btn`, campo ricerca catalogo.

## Esito atteso (statico)

| Area | Obiettivo progetto | Note |
|------|-------------------|------|
| Performance mobile | ≥ 85 | Sito statico Astro; bundle React limitato al carrello/FAQ |
| Accessibility | ≥ 90 | Skip link, accordion FAQ, label ricerca catalogo, focus ring token |
| Best Practices | ≥ 90 | HTTPS su Vercel; header sicurezza in `vercel.json` |
| SEO | ≥ 90 | canonical, sitemap, JSON-LD Organization/Product/FAQ |

## Ripetizione consigliata post-deploy

```bash
npx lighthouse https://gramazio-tabitha.vercel.app --preset=desktop --view
npx lighthouse https://gramazio-tabitha.vercel.app/catalogo --screenEmulation.mobile=true
```

Registrare qui i punteggi numerici dopo il primo deploy produzione (F15).
