# Checklist master di implementazione e collaudo

Documento operativo — aggiornare lo **stato** a fine di ogni fase.  
Analisi di riferimento: [strctural_analysis.md](./strctural_analysis.md)

**Legenda stato fase:** `completata` | `in corso` | `da fare`

| Fase | Stato | Note |
|------|--------|------|
| F00 | completata* | *collaudo manuale F00-M01–M03 pendente |
| F01 | in corso | F01.02 bloccante cliente |
| F02 | completata* | F02.07 sign-off utente; wireframe F02-M01 pendente |
| F03 | completata* | collaudo F03-M01–M03 pendente |
| F04–F16 | da fare | |

---

## F00 — Analisi iniziale e repository

- [x] `F00.01` — Verificare remote GitHub → documentato in [repository-state.md](./repository-state.md)
- [x] `F00.02` — Inventario branch e policy → [repository-state.md](./repository-state.md)
- [x] `F00.03` — `.gitignore` Node/Astro → root repo
- [x] `F00.04` — ADR stack → [decisions/001-static-stack.md](./decisions/001-static-stack.md)

## F01 — Analisi aziendale e competitiva

- [x] `F01.01` — [company-profile.md](./company-profile.md)
- [ ] `F01.02` — Listino e asset cliente (**bloccante**)
- [x] `F01.03` — Benchmark in strctural_analysis §3
- [x] `F01.04` — [information-gaps.md](./information-gaps.md)

## F02 — Requisiti e progettazione

- [x] `F02.01` — [requirements.md](./requirements.md)
- [x] `F02.02` — Sitemap in strctural_analysis §6
- [x] `F02.03` — [user-journey.md](./user-journey.md)
- [x] `F02.04` — [wireframes-mobile.md](./wireframes-mobile.md)
- [x] `F02.05` — [design-tokens.md](./design-tokens.md)
- [x] `F02.06` — [order-message-spec.md](./order-message-spec.md)
- [ ] `F02.07` — Sign-off formale analisi (approvazione cliente/progetto)

## F03 — Setup tecnico

- [x] `F03.01` — Astro 7 + TypeScript strict + React
- [x] `F03.02` — `src/config/site.config.ts`
- [x] `F03.03` — README (sezioni minime)
- [x] `F03.04` — Script `dev`, `build`, `preview`, `test`
- [x] `F03.05` — CI GitHub Actions (build + test)

## F04 — Design system

- [ ] `F04.01` — `src/styles/tokens.css`
- [ ] `F04.02` — Componenti base
- [ ] `F04.03` — Stati focus/hover

## F05 — Struttura sito

- [ ] `F05.01` — Header + nav
- [ ] `F05.02` — Footer
- [ ] `F05.03` — Homepage P0
- [ ] `F05.04` — Chi siamo
- [ ] `F05.05` — Contatti
- [ ] `F05.06` — FAQ
- [ ] `F05.07` — Pagine legali

## F06 — Catalogo

- [ ] `F06.01` — Schema prodotti (Zod)
- [ ] `F06.02` — `catalog.json` dati reali
- [ ] `F06.03` — Griglia catalogo
- [ ] `F06.04` — `/prodotti/[slug]`
- [ ] `F06.05` — €/L
- [ ] `F06.06` — Non disponibile / non pubblicato

## F07 — Carrello

- [ ] `F07.01` — Store + localStorage
- [ ] `F07.02` — CRUD righe
- [ ] `F07.03` — Pagina riepilogo
- [ ] `F07.04` — Campi cliente
- [ ] `F07.05` — Test totali

## F08 — WhatsApp

- [ ] `F08.01` — Numero E.164 in config
- [x] `F08.02` — `buildOrderMessage()` (lib)
- [x] `F08.03` — `buildWhatsAppUrl()` + test base
- [ ] `F08.04` — Copy UX in UI
- [ ] `F08.05` — Fallback UI

## F09 — Email

- [x] `F09.01` — `buildMailtoUrl()` (lib)
- [ ] `F09.02` — Test dispositivi reali
- [ ] `F09.03` — Documentazione limiti in README (parziale)

## F10 — F16

Vedi [strctural_analysis.md](./strctural_analysis.md) § checklist — da avviare dopo collaudo F03–F07.
