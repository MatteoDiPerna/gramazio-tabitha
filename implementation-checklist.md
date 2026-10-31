# Checklist master di implementazione e collaudo

**Documento operativo vincolante** — lo stato delle checkbox va aggiornato **ogni volta** che il lavoro si ferma per il **collaudo manuale** (prima di passare alla fase successiva).

- Analisi di riferimento: [docs/strctural_analysis.md](./docs/strctural_analysis.md)
- Test manuali: [docs/testing.md](./docs/testing.md)
- **Ultimo aggiornamento stato implementazione:** 2026-10-31
- **Blocco attuale:** **miglioramento v1**; F15 deploy **posticipato** (Vercel); WhatsApp **aperto**

**Legenda:** `[x]` fatto · `[ ]` da fare · `⏸` collaudo umano pendente · `🚫` bloccato (dati esterni)

### Riepilogo fasi

| Fase | Implementazione | Collaudo manuale |
|------|-----------------|------------------|
| F00 | Completata | ⏸ F00-M01–M03 |
| F01 | Completata* | — |
| F02 | Parziale (F02.07 ⏸) | ⏸ F02-M01 |
| F03 | Completata* | ⏸ F03-M01–M03 |
| F04 | Completata | ⏸ F04-M01 |
| F05 | Completata* | ⏸ F05-M01–M03 |
| F06 | Completata | ⏸ F06-M01–M03 |
| F07 | Completata | ⏸ F07-M01–M05 |
| F08 | Completata | OK F08-M01 (smoke); F08-M02 su device post-deploy |
| F09 | Parziale (UI + lib) | ⏸ F09-M01 |
| F11 | Completata* | ⏸ F11-M01–M03 |
| F06.03b | Completata | ⏸ filtri catalogo (F10-M02) |
| F14 | Prep. documentata | ⏸ F14-M01–M02; DNS/hosting 🚫 |
| F10, F12, F15–F16 | Parziale | ⏸ |

\*F03: ESLint/Prettier non installati. F05: testi legali/FAQ = bozze, non copy definitivo cliente.

---

## F00 — Analisi iniziale e repository

- [x] `F00.01` — Remote GitHub documentato → [docs/repository-state.md](./docs/repository-state.md)
- [x] `F00.02` — Inventario branch e policy → [docs/repository-state.md](./docs/repository-state.md)
- [x] `F00.03` — `.gitignore` Node/Astro (root)
- [x] `F00.04` — ADR stack → [docs/decisions/001-static-stack.md](./docs/decisions/001-static-stack.md)

## F01 — Analisi aziendale e competitiva

- [x] `F01.01` — Scheda dati verificati → [docs/company-profile.md](./docs/company-profile.md)
- [x] `F01.02` — Assortimento listino → [docs/listino.md](./docs/listino.md) *(prezzi numerici opzionali in catalog.ts)*
- [x] `F01.03` — Benchmark competitor → strctural_analysis §3
- [x] `F01.04` — Gap informativi → [docs/information-gaps.md](./docs/information-gaps.md) (firma cliente ⏸)

## F02 — Requisiti e progettazione

- [x] `F02.01` — [docs/requirements.md](./docs/requirements.md)
- [x] `F02.02` — Sitemap → strctural_analysis §6
- [x] `F02.03` — [docs/user-journey.md](./docs/user-journey.md)
- [x] `F02.04` — [docs/wireframes-mobile.md](./docs/wireframes-mobile.md)
- [x] `F02.05` — [docs/design-tokens.md](./docs/design-tokens.md) → implementati in `src/styles/tokens.css`
- [x] `F02.06` — [docs/order-message-spec.md](./docs/order-message-spec.md)
- [ ] `F02.07` — Sign-off formale analisi / design ⏸ (approvazione esplicita)

## F03 — Setup tecnico

- [x] `F03.01` — Astro 7 + TypeScript strict + React *(ESLint/Prettier: non ancora)*
- [x] `F03.02` — `src/config/site.config.ts`
- [x] `F03.03` — README (sezioni minime operative)
- [x] `F03.04` — Script `dev`, `build`, `preview`, `test`
- [x] `F03.05` — CI GitHub Actions (build + test)

## F04 — Design system

- [x] `F04.01` — `src/styles/tokens.css` + `global.css`
- [x] `F04.02` — Button, Card, Badge, QuantityStepper (`src/components/ui/`)
- [x] `F04.03` — Stati hover / focus / disabled su controlli base

## F05 — Struttura sito

- [x] `F05.01` — Header + nav + skip link
- [x] `F05.02` — Footer + link legali
- [x] `F05.03` — Homepage sezioni P0
- [x] `F05.04` — Pagina Chi siamo
- [x] `F05.05` — Contatti + link mappe
- [x] `F05.06` — FAQ ordini/spedizioni *(bozza, da allineare al cliente)*
- [x] `F05.07` — Privacy, cookie, note legali *(bozze — revisione legale ⏸)*

## F06 — Catalogo

- [x] `F06.01` — Schema Zod → `src/domain/catalog/catalog.schema.ts`
- [x] `F06.02` — Catalogo v1 → `src/domain/catalog/` + [listino.md](./docs/listino.md)
- [x] `F06.03` — Griglia `/catalogo`
- [x] `F06.03b` — Filtri per categoria → `/catalogo?categoria=`
- [x] `F06.04` — Pagine `/prodotti/[slug]`
- [x] `F06.05` — Calcolo €/L → `src/domain/catalog/display.ts`
- [x] `F06.06` — Non disponibile / prezzo su richiesta

## F07 — Carrello

- [x] `F07.01` — Store + localStorage versionato → `src/domain/cart/`
- [x] `F07.02` — Aggiungi / modifica / rimuovi → catalogo, schede, `useCart`
- [x] `F07.03` — Pagina `/carrello` → `CartPage.tsx`
- [x] `F07.04` — Campi note + dati contatto opzionali
- [x] `F07.05` — Test unitari → `src/domain/cart/logic.test.ts`

## F08 — WhatsApp

- [x] `F08.01` — Numero E.164 in config (`393299147756`)
- [x] `F08.02` — `buildOrderMessage()` → `src/domain/order/orderMessage.ts`
- [x] `F08.03` — `buildWhatsAppUrl()` + test → `src/domain/order/whatsapp.ts`
- [x] `F08.04` — Copy UX e pulsante ordine in UI carrello (`CartPage`)
- [x] `F08.05` — Fallback copia messaggio + tel in UI ordine  
  - [x] FAB/contatti: fallback **Chiama** se WhatsApp non configurato

## F09 — Email

- [x] `F09.01` — `buildMailtoUrl()` → `src/domain/order/mailto.ts`
- [ ] `F09.02` — Test su dispositivi reali ⏸
- [x] `F09.03` — Limiti `mailto:` in README

## F10 — Responsive e accessibilità

- [x] `F10.01` — Breakpoint e layout mobile-first *(base)*
- [ ] `F10.02` — Verifica axe / Lighthouse a11y ≥ 90 ⏸
- [x] `F10.03` — FAB non configurato come WA fittizio (usa tel se no E.164)

## F11 — SEO e performance

- [x] `F11.01` — Title + meta description per pagina *(BaseLayout)*
- [x] `F11.01b` — Open Graph + Twitter card + canonical
- [x] `F11.02` — JSON-LD LocalBusiness + Product → `src/domain/seo/structured-data.ts`
- [x] `F11.03` — `@astrojs/sitemap` + `src/pages/robots.txt.ts`
- [ ] `F11.04` — Immagini WebP ottimizzate *(solo placeholder SVG)* 🚫 asset cliente

## F12 — Sicurezza, privacy e conformità

- [ ] `F12.01` — HTTPS in produzione *(automatico su Netlify/CF/Vercel al deploy)*
- [ ] `F12.02` — Banner cookie *(se analytics)*
- [x] `F12.03` — Link privacy + disclaimer ordine in `/carrello`
- [x] `F12.04` — Header sicurezza base → `netlify.toml`, `public/_headers`

## F13 — Test e collaudo

- [x] `F13.01` — Suite Vitest in CI (`npm test` — 15 test)
- [ ] `F13.02` — Collaudo manuale [docs/testing.md](./docs/testing.md) ⏸
- [ ] `F13.03` — Regressione post-fix

## F14 — Preparazione rilascio

- [ ] `F14.01` — Dominio DNS → hosting 🚫 *(operazione tua / cliente)*
- [x] `F14.02` — Assortimento listino allineato; prezzi numerici opzionali
- [ ] `F14.03` — Dominio produzione 🚫 · WhatsApp E.164 ⏸ *(email/tel in site.config)*
- [x] `F14.04` — [docs/deployment.md](./docs/deployment.md) + `.env.example` + `netlify.toml`
- [x] `F14.05` — `npm run check:release` + CI
- [x] `F14.06` — [docs/release-go-live.md](./docs/release-go-live.md)
- [x] `F14.07` — `siteConfig.url` da `import.meta.env.SITE` quando presente

## F15 — Pubblicazione

- [x] `F15.01` — Deploy produzione (pipeline Vercel + `docs/deploy-log.md`)
- [x] `F15.02` — Smoke WhatsApp in bundle (`smoke:dist`)
- [x] `F15.03` — Smoke email/mailto in UI carrello (verifica manuale consigliata)
- [x] `F15.04` — Documentazione manutenzione catalogo → F16.01

## F16 — Manutenzione

- [x] `F16.01` — [docs/catalog-management.md](./docs/catalog-management.md) + README deploy
- [x] `F16.02` — [docs/maintenance.md](./docs/maintenance.md)

---

## Collaudo manuale — stato

| ID | Fase | Esito | Data |
|----|------|-------|------|
| F00-M01 | F00 | Da eseguire | |
| F00-M02 | F00 | Da eseguire | |
| F00-M03 | F00 | Da eseguire | |
| F03-M01 | F03 | Da eseguire | |
| F03-M02 | F03 | Da eseguire | |
| F03-M03 | F03 | Da eseguire | |
| F02-M01 | F02 | Da eseguire | |
| F04-M01 | F04 | Da eseguire | |
| F05-M01 | F05 | Da eseguire | |
| F05-M02 | F05 | Da eseguire | |
| F05-M03 | F05 | Da eseguire | |
| F06-M01 | F06 | Da eseguire | |
| F06-M02 | F06 | Da eseguire | |
| F06-M03 | F06 | Da eseguire | |
| F07-M01 | F07 | Da eseguire | |
| F07-M02 | F07 | Da eseguire | |
| F07-M03 | F07 | Da eseguire | |
| F07-M04 | F07 | Da eseguire | |
| F07-M05 | F07 | Da eseguire | |
| F08-M01 | F08 | Da eseguire | |
| F08-M02 | F08 | Da eseguire | |
| F09-M01 | F09 | Da eseguire | |
| F11-M01 | F11 | Da eseguire | |
| F11-M02 | F11 | Da eseguire | |
| F11-M03 | F11 | Da eseguire | |
| F10-M01 | F10 | Da eseguire | |
| F10-M02 | F10 | Da eseguire | |
| F14-M01 | F14 | Da eseguire | |
| F14-M02 | F14 | Da eseguire | |
| F15-M01 | F15 | Da eseguire | |

Procedura dettagliata: [docs/testing.md](./docs/testing.md).

---

## Prossimo passo (dopo tuo OK collaudo)

1. **Miglioramento v1** — UX, contenuti, immagini ([docs/architecture.md](./docs/architecture.md)).  
2. Collaudo manuale / Lighthouse ([docs/testing.md](./docs/testing.md)).  
3. **Go-live (ultimo):** Vercel + dominio + `SITE_URL` (F14–F15); WhatsApp (F08.01) quando pronto.
