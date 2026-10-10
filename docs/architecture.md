# Architettura del progetto

## Tipo di applicazione

Sito **statico** (Astro `output: static`): HTML/CSS/JS generati in build, serviti da CDN (target iniziale: **Vercel**).

Non c’è un “backend” separato in v1: catalogo e testi sono **dati versionati**; carrello e ordine girano **nel browser** (`localStorage`, `mailto:`, WhatsApp deep link).

## Perché non dividere frontend / backend (ora)

| Esigenza v1 | Soluzione attuale |
|-------------|-------------------|
| Catalogo | `src/domain/catalog/products.data.ts` + validazione Zod |
| Ordini | Messaggio testuale + canali esterni (email / WhatsApp) |
| Auth / pagamenti | Fuori scope |

Un monorepo `frontend/` + `backend/` aggiungerebbe deploy e manutenzione senza benefici finché non servono API (email serverless, CMS headless, pagamenti).

**Evoluzione su Vercel:** eventuali endpoint possono restare **nello stesso repo** come `src/pages/api/*` (Astro serverless) senza spezzare il progetto.

## Layer in `src/`

```
src/
├── config/          # site.config.ts — contatti, nav principale, URL
├── content/         # Copy strutturato (FAQ, link footer) — no logica
├── domain/          # Logica di business (testabile, senza UI)
│   ├── catalog/     # prodotti, schema, categorie, display
│   ├── cart/        # stato carrello, localStorage, totali
│   ├── order/       # messaggio ordine, mailto, WhatsApp, money
│   └── seo/         # URL assoluti, JSON-LD
├── components/      # UI Astro + React islands (cart)
├── hooks/           # useCart (client)
├── layouts/         # BaseLayout
├── pages/           # Route file-based (URL pubblici)
└── styles/          # token + global
```

### `pages/` — routing

Le URL restano **flat** e stabili (`/catalogo`, `/prodotti/[slug]`, `/privacy`, …). Astro mappa una file = una route; non usiamo cartelle “marketing/legal” che cambierebbero path senza redirect.

| Gruppo | Route |
|--------|--------|
| Vendita | `/`, `/catalogo`, `/prodotti/*`, `/carrello` |
| Istituto | `/chi-siamo`, `/contatti`, `/faq` |
| Legale | `/privacy`, `/cookie`, `/note-legali` |
| Sistema | `/robots.txt` |

### Import

Alias TypeScript/Vite: `@/` → `src/` (es. `@/domain/catalog`).

## Documentazione di progetto (`docs/`)

Analisi, requisiti, listino, deploy e test manuali restano in `docs/` — **non** mescolati al codice runtime.

## Roadmap tecnica (sintesi)

1. **Miglioramento v1** — UX, contenuti, immagini, prezzi opzionali, qualità (fase corrente).
2. **Collaudo** — [testing.md](./testing.md), Lighthouse, accessibilità.
3. **Pubblicazione (F15)** — ultima fase: Vercel + dominio + `SITE_URL` — vedi [deployment.md](./deployment.md).

ADR correlati: [001-static-stack.md](./decisions/001-static-stack.md), [002-source-layout.md](./decisions/002-source-layout.md).
