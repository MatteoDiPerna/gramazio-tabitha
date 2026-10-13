# Worklog — Gramazio Tabitha

Checklist di **lavoro da fare** (UX, contenuti, refactor, go-live).  
Aggiornare le checkbox man mano che si completa il lavoro.

**Documenti correlati**

| Documento | Uso |
|-----------|-----|
| [implementation-checklist.md](./implementation-checklist.md) | Fasi F00–F16, collaudo formale, stati ⏸/🚫 |
| [docs/information-gaps.md](./docs/information-gaps.md) | Dati mancanti dall’azienda (bloccanti go-live) |
| [docs/release-go-live.md](./docs/release-go-live.md) | Checklist deploy |
| [docs/page-paths.md](./docs/page-paths.md) | Mappa URL → file sorgente |
| [docs/concorrenti.md](./docs/concorrenti.md) | Benchmark «Chi siamo» e racconto |
| [docs/testing.md](./docs/testing.md) | Collaudo manuale |

**Ultimo aggiornamento worklog:** 2026-10-13

---

## Legenda

- `[ ]` da fare
- `[x]` completato (spostare o segnare inline quando fatto)
- Priorità indicativa: **P0** (bloccante / alto impatto), **P1**, **P2**

---

## Già implementato (baseline recente)

- [x] Banner pagina (`PageHero`) — titolo/sottotitolo centrati, contrasto foto, spazio sotto banner
- [x] Homepage — hero full viewport (`100svh`), sezioni competitor-style
- [x] Header — trasparente su banner, sfondo bianco allo scroll (`headerScroll.ts`)
- [x] Contatti — struttura allineata (hero figlio diretto di `main` per overlay header)
- [x] Loader navigazione, card catalogo, FAB telefono/WhatsApp

---

## Dati e go-live (🚫 dipendono dal cliente)

Vedi anche [docs/information-gaps.md](./docs/information-gaps.md).

- [ ] **P0** — Listino completo (prodotto × formato × prezzo IVA incl.) in `products.data.ts`
- [ ] **P0** — Foto prodotti reali + diritti d’uso (`public/images/products/`)
- [ ] **P0** — P.IVA, ragione sociale, REA, PEC → note legali
- [ ] **P0** — Testi privacy / cookie / note legali approvati (sostituire bozze in `privacy.astro`, `cookie.astro`, `note-legali.astro`)
- [ ] **P0** — Conferma WhatsApp E.164 in `site.config.ts` (F08.01)
- [ ] **P1** — Zone spedizione, costi, corrieri, tempi → FAQ + copy carrello
- [ ] **P1** — Metodi di pagamento e condizioni commerciali
- [ ] **P1** — Dominio produzione + `SITE_URL` / `siteConfig.url`
- [ ] **P2** — Logo vettoriale / linee guida brand

---

## Globale sito

- [ ] **P1** — Collaudo manuale completo ([docs/testing.md](./docs/testing.md), tabella in `implementation-checklist.md`)
- [ ] **P1** — Lighthouse mobile ≥ 85, accessibilità flussi principali (F10.02)
- [ ] **P2** — ESLint + Prettier (mancanti, citati in F03)
- [ ] **P2** — Immagini hero/WebP: pipeline o asset ottimizzati (F11.04)
- [ ] **P2** — Documentare header overlay in `docs/page-paths.md` (`headerScroll.ts`)
- [ ] **P2** — Banner cookie solo se si aggiunge analytics (F12.02)
- [ ] **P2** — Deploy Vercel + smoke test (F15) — **dopo** miglioramento v1

---

## Homepage (`src/pages/index.astro`)

- [ ] **P1** — Copy definitivo sezioni (allineare `homePage.ts` al materiale cliente)
- [ ] **P1** — Recensioni: fonte reale o rimuovere/soften se placeholder
- [ ] **P2** — Ridurre peso JS (galleria, bundle React) se Lighthouse lo richiede
- [ ] **P2** — Coerenza eyebrow sezioni interne vs banner (opzionale)

---

## Catalogo — refactoring (`src/pages/catalogo/index.astro`)

- [ ] **P0** — Refactoring pagina prodotti (catalogo): estrarre filtri + griglia in componenti dedicati
- [ ] **P1** — Intro testuale sotto banner (come competitor: titolo H2 + paragrafo categoria)
- [ ] **P1** — Stato filtro categoria più visibile (breadcrumb o titolo sezione)
- [ ] **P1** — Empty state e messaggi quando listino incompleto
- [ ] **P2** — Ordinamento prodotti (nome, categoria, disponibilità)
- [ ] **P2** — SEO: testi meta per `?categoria=` (description dedicata)
- [ ] **P2** — Allineare `products.data.ts` ↔ immagini reali già in `public/` (evitare placeholder SVG se foto esistono)

---

## Scheda prodotto singolo — migliorare (`src/pages/prodotti/[slug].astro`)

- [ ] **P0** — Migliorare pagina prodotto singolo (layout, gerarchia, mobile)
- [ ] **P0** — Lead banner: sottotitolo breve da prodotto (non stringa fissa «Scheda prodotto…»)
- [ ] **P1** — Selettore **varianti/formato** quando `variants.length > 1`
- [ ] **P1** — Breadcrumb (Catalogo → categoria → prodotto)
- [ ] **P1** — Blocco acquisto sticky su mobile (qty + aggiungi ordine)
- [ ] **P1** — Sezione «Informazioni» arricchita (ingredienti, conservazione, allergeni — solo dati verificati)
- [ ] **P1** — Prodotti correlati / stessa categoria in fondo pagina
- [ ] **P1** — Estrarre `ProductDetail.astro` (+ eventuale CSS modulo) da `[slug].astro`
- [ ] **P2** — Galleria statica oltre al 360° (fallback se pochi frame)
- [ ] **P2** — Tab o accordion per descrizione lunga
- [ ] **P2** — Open Graph sempre con foto prodotto reale (già parzialmente via `ogImagePath`)

---

## Refactoring area prodotti (catalogo + scheda + dominio)

- [ ] **P1** — Refactoring page prodotti: contenuti strutturati in `src/content/` o campi schema catalogo (non solo prose inline)
- [ ] **P1** — Unificare formattazione prezzo/disponibilità tra `ProductCard` e scheda
- [ ] **P2** — Test integrazione catalogo + spin (`productSpin.test.ts`, casi mancanti)
- [ ] **P2** — Guida aggiornamento schede in [docs/catalog-management.md](./docs/catalog-management.md)

---

## Chi siamo — refactoring (`src/pages/chi-siamo.astro`)

- [ ] **P0** — Refactoring page chi siamo (da placeholder a pagina completa)
- [ ] **P0** — Spostare copy in `src/content/chiSiamo.ts` (sezioni tipizzate)
- [ ] **P1** — Layout multi-sezione (hero + blocchi foto/testo, stile home / [docs/concorrenti.md](./docs/concorrenti.md))
- [ ] **P1** — Sezioni: territorio (Carpino/Gargano), approccio produttivo, prodotti, trasparenza/certificazioni **solo claim documentati**
- [ ] **P1** — Galleria o immagini autentiche (`public/images/home/` o dedicate)
- [ ] **P1** — CTA verso catalogo e contatti
- [ ] **P2** — Timeline storia (solo dopo dati confermati dall’azienda)
- [ ] **P2** — Hub opzionale «Territorio» / «Produzione» se il contenuto cresce

---

## FAQ — refactoring (`src/pages/faq.astro`, `src/content/faq.ts`)

- [ ] **P0** — Refactoring page FAQ (UX + contenuti)
- [ ] **P1** — Accordion accessibile (espandi/chiudi) al posto del `<dl>` statico
- [ ] **P1** — Reintrodurre intro (`faqIntro`) sotto banner o in apertura contenuto
- [ ] **P1** — Allineare risposte a dati reali spedizioni/pagamenti (quando disponibili)
- [ ] **P1** — JSON-LD `FAQPage` in `structured-data.ts`
- [ ] **P2** — Anchor link per singola domanda (`#slug-domanda`)
- [ ] **P2** — Link incrociati carrello / contatti / privacy

---

## Carrello — refactoring (`src/pages/carrello.astro`, `CartPage.tsx`)

- [ ] **P0** — Refactoring page carrello (layout + UX invio ordine)
- [ ] **P1** — Valutare banner foto vs header compatto (pagina strumento)
- [ ] **P1** — Stili carrello: estrarre CSS da inline/global sparsi → modulo dedicato
- [ ] **P1** — Empty state e riepilogo visivamente allineati al design system
- [ ] **P1** — Barra azioni sticky mobile (WhatsApp / email / copia)
- [ ] **P1** — Validazione leggera campi (telefono, nome) prima di aprire `mailto:` / WA
- [ ] **P2** — Anteprima messaggio ordine collassabile
- [ ] **P2** — Messaggio errore se prodotti non più disponibili nel catalogo

---

## Altre pagine

### Contatti (`src/pages/contatti.astro`)

- [ ] **P1** — Copy e recapiti definitivi
- [ ] **P2** — Mappa: marker custom o link Maps app

### Pagine legali

- [ ] **P0** — Sostituire bozze privacy, cookie, note legali (vedi sezione go-live)

### Header / footer

- [ ] **P2** — Chiudere menu mobile su navigazione (View Transitions)
- [ ] **P2** — Stato header su pagine senza banner (se aggiunte in futuro)

---

## Qualità codice e CI

- [ ] **P1** — `npm run build` + `npm test` + `npm run check:release` prima di ogni merge significativo
- [ ] **P2** — Ampliare test dominio (catalog display, order message edge cases)
- [ ] **P2** — Aggiornare `implementation-checklist.md` quando una voce di questo worklog chiude un intero tema

---

## Ordine di lavoro suggerito

1. Dati cliente bloccanti (listino, foto, legali, WhatsApp) — in parallelo dove possibile  
2. **Scheda prodotto** + **refactoring catalogo**  
3. **Chi siamo**, **FAQ**, **carrello**  
4. Collaudo + performance  
5. Deploy (F15)

---

## Note sessione

_Aggiungere qui brevi note su decisioni prese durante lo sviluppo (data + cosa)._

| Data | Nota |
|------|------|
| 2026-10-13 | Creato `worklog.md`; banner/hero/header overlay implementati |
