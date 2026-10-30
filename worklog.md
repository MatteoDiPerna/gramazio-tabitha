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
| [docs/ui-ux-redesign-spec.md](./docs/ui-ux-redesign-spec.md) | Redesign UI/UX — audit, gap, istruzioni implementazione per agent |

**Ultimo aggiornamento worklog:** 2026-10-30

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
- [x] **P2** — ESLint + Prettier (F03) — `eslint.config.js`, script `npm run lint` / `format`
- [ ] **P2** — Immagini hero/WebP: pipeline o asset ottimizzati (F11.04)
- [x] **P2** — Documentare header overlay in `docs/page-paths.md` (`headerScroll.ts`)
- [ ] **P2** — Banner cookie solo se si aggiunge analytics (F12.02)
- [ ] **P2** — Deploy Vercel + smoke test (F15) — **dopo** miglioramento v1

---

## Homepage (`src/pages/index.astro`)

- [ ] **P1** — Copy definitivo sezioni (allineare `homePage.ts` al materiale cliente)
- [x] **P1** — Recensioni: disclaimer esplicito placeholder in `homePage.ts` + homepage
- [ ] **P2** — Ridurre peso JS (galleria, bundle React) se Lighthouse lo richiede
- [ ] **P2** — Coerenza eyebrow sezioni interne vs banner (opzionale)

---

## Catalogo — refactoring (`src/pages/catalogo/index.astro`)

- [x] **P0** — Refactoring pagina prodotti (catalogo): filtri + griglia + intro in componenti dedicati
- [x] **P1** — Intro testuale sotto banner (H2 + paragrafo categoria in `catalogPage.ts`)
- [x] **P1** — Stato filtro categoria più visibile (breadcrumb intro + titolo hero categoria)
- [x] **P1** — Empty state e messaggi quando listino incompleto
- [x] **P2** — Ordinamento prodotti (nome; helper `sortPublishedProducts`)
- [x] **P2** — SEO: meta description per `?categoria=` (`catalogMetaDescription`)
- [ ] **P2** — Allineare `products.data.ts` ↔ immagini reali già in `public/` (evitare placeholder SVG se foto esistono) — **in attesa foto cliente**

---

## Scheda prodotto singolo — migliorare (`src/pages/prodotti/[slug].astro`)

- [x] **P0** — Migliorare pagina prodotto singolo (layout, gerarchia, mobile) → `ProductDetail.astro`
- [x] **P0** — Lead banner: sottotitolo breve da prodotto (`shortDescription`)
- [x] **P1** — Selettore **varianti/formato** quando `variants.length > 1` → `ProductPurchasePanel.tsx`
- [x] **P1** — Breadcrumb (Catalogo → categoria → prodotto)
- [x] **P1** — Blocco acquisto sticky su mobile
- [x] **P1** — Sezione «Informazioni» arricchita (schema `productInfo`; dati solo se presenti)
- [x] **P1** — Prodotti correlati / stessa categoria in fondo pagina
- [x] **P1** — Estrarre `ProductDetail.astro` da `[slug].astro`
- [x] **P2** — Galleria statica oltre al 360° (fallback `fallbackSrc` nel viewer)
- [x] **P2** — Tab o accordion per descrizione lunga (`<details>` se testo > 220 car.)
- [ ] **P2** — Open Graph sempre con foto prodotto reale — **dipende asset cliente** (logica `ogImagePath` già attiva)

---

## Refactoring area prodotti (catalogo + scheda + dominio)

- [x] **P1** — Contenuti catalogo intro in `src/content/catalogPage.ts`
- [x] **P1** — Unificare formattazione prezzo/disponibilità tra `ProductCard` e scheda (`display.ts` + `ProductPurchasePanel`)
- [x] **P2** — Test dominio catalogo (`query.test.ts`, FAQ JSON-LD)
- [x] **P2** — Guida aggiornamento schede in [docs/catalog-management.md](./docs/catalog-management.md)

---

## Chi siamo — refactoring (`src/pages/chi-siamo.astro`)

- [x] **P0** — Refactoring page chi siamo (da placeholder a pagina multi-sezione)
- [x] **P0** — Spostare copy in `src/content/chiSiamo.ts` (sezioni tipizzate)
- [x] **P1** — Layout multi-sezione (hero + blocchi foto/testo)
- [x] **P1** — Sezioni: territorio, approccio, prodotti, trasparenza (**solo claim documentati**)
- [x] **P1** — Galleria o immagini autentiche (`public/images/home/`)
- [x] **P1** — CTA verso catalogo e contatti
- [ ] **P2** — Timeline storia (solo dopo dati confermati dall’azienda)
- [ ] **P2** — Hub opzionale «Territorio» / «Produzione» se il contenuto cresce

---

## FAQ — refactoring (`src/pages/faq.astro`, `src/content/faq.ts`)

- [x] **P0** — Refactoring page FAQ (UX + contenuti)
- [x] **P1** — Accordion accessibile → `FaqAccordion.tsx`
- [x] **P1** — Reintrodurre intro (`faqIntro`)
- [ ] **P1** — Allineare risposte a dati reali spedizioni/pagamenti (quando disponibili)
- [x] **P1** — JSON-LD `FAQPage` in `structured-data.ts`
- [x] **P2** — Anchor link per singola domanda (`id` in `faq.ts`, es. `/faq#spedizioni`)
- [x] **P2** — Link incrociati carrello / contatti / privacy

---

## Carrello — refactoring (`src/pages/carrello.astro`, `CartPage.tsx`)

- [x] **P0** — Refactoring page carrello (layout + UX invio ordine)
- [x] **P1** — Header compatto senza banner foto (`PageHero` `size="compact"`)
- [x] **P1** — Stili carrello in `cartPage.css`
- [x] **P1** — Empty state e riepilogo allineati al design system
- [x] **P1** — Barra azioni sticky mobile
- [x] **P1** — Validazione leggera telefono prima di WA / email
- [x] **P2** — Anteprima messaggio ordine collassabile (`<details>`)
- [x] **P2** — Messaggio se prodotti non più disponibili (`syncCartWithCatalog` + avviso UI)

---

## Altre pagine

### Contatti (`src/pages/contatti.astro`)

- [ ] **P1** — Copy e recapiti definitivi
- [x] **P2** — Mappa: link Maps app (indicazioni stradali)

### Pagine legali

- [ ] **P0** — Sostituire bozze privacy, cookie, note legali (vedi sezione go-live)

### Header / footer

- [x] **P2** — Chiudere menu mobile su navigazione (View Transitions)
- [x] **P2** — Stato header su pagine senza banner (`page-hero--compact` → header solido)

---

## Qualità codice e CI

- [ ] **P1** — `npm run build` + `npm test` + `npm run check:release` prima di ogni merge significativo (processo; build/test OK al 2026-10-30)
- [x] **P2** — Ampliare test dominio (catalog query, cart validation, FAQ JSON-LD)
- [ ] **P2** — Aggiornare `implementation-checklist.md` quando una voce di questo worklog chiude un intero tema

---

## Ordine di lavoro suggerito

1. Dati cliente bloccanti (listino, foto, legali, WhatsApp) — in parallelo dove possibile  
2. ~~Scheda prodotto~~ + ~~refactoring catalogo~~  
3. ~~Chi siamo~~, ~~FAQ~~, ~~carrello~~  
4. Collaudo + performance  
5. Deploy (F15)

---

## Note sessione

| Data | Nota |
|------|------|
| 2026-10-13 | Creato `worklog.md`; banner/hero/header overlay implementati |
| 2026-10-30 | Refactor catalogo, scheda prodotto, chi siamo, FAQ accordion, carrello; ESLint/Prettier; test aggiuntivi |
| 2026-10-30 | Redesign UI/UX (spec `docs/ui-ux-redesign-spec.md`): token, tab catalogo, toolbar, SectionHead, Notice, home.css |
| 2026-10-30 | Gutter laterali ridotti (`--layout-inline-padding`, `--content-max` fluido) |

---

## Test manuali (post-implementazione)

Verificare in locale (`npm run dev` o preview su `dist/`) e su mobile reale o emulazione.

### Catalogo (`/catalogo`, filtri categoria)

- Apri `/catalogo` e controlla intro testuale, filtri categoria e griglia prodotti ordinata per nome.
- **Statico:** filtri `?categoria=` e `?ordina=` applicati anche in produzione via `src/scripts/catalog-page.ts` (build unica HTML).
- Usa `?categoria=olio`, `legumi`, `condimenti`: titolo hero, breadcrumb intro e meta (view-source / tag description) coerenti.
- Con listino attuale (prezzi null): compare l’avviso giallo «listino in aggiornamento» sopra la griglia.
- Filtro su categoria senza prodotti (se simulabile): empty state con link «Vedi tutti i prodotti».

### Scheda prodotto (`/prodotti/{slug}`)

- Banner: sottotitolo = `shortDescription` del prodotto (non testo fisso «Scheda prodotto…»).
- Breadcrumb Catalogo → categoria → nome; link categoria tornano al catalogo filtrato.
- Su mobile: barra sticky in basso con prezzo e «Aggiungi all’ordine»; su desktop il pulsante resta nel pannello principale.
- Aggiungi al carrello, poi «Vai al riepilogo ordine».
- Sezione Informazioni: descrizione, eventuale accordion per testi lunghi, campo conservazione su olio EVO.
- In fondo: griglia «Della stessa categoria» (max 3) senza il prodotto corrente.

### Carrello (`/carrello`)

- Header compatto (senza foto banner); header sempre leggibile (non trasparente).
- Empty state con link catalogo e contatti.
- Con righe: totali, messaggio prezzi su richiesta se applicabile.
- Telefono invalido (es. `123`) blocca WA/email con messaggio errore; telefono vuoto o valido consente l’invio.
- Barra azioni sticky su mobile (WhatsApp / email / copia).
- `<details>` anteprima messaggio; copia negli appunti.
- Simula prodotto rimosso: imposta temporaneamente `published: false` su un id in `products.data.ts`, ricarica carrello → avviso rimozione righe.

### FAQ (`/faq`)

- Accordion: un pannello alla volta, `aria-expanded` sui pulsanti, navigazione da tastiera (Tab, Invio).
- Anchor `#come-ordinare`, `#spedizioni`, ecc. aprono la sezione corretta (scroll + espansione al reload).
- Link a carrello, contatti, privacy in fondo pagina.
- JSON-LD `FAQPage` presente nel sorgente HTML.

### Chi siamo (`/chi-siamo`)

- Sezioni da `chiSiamo.ts`, immagini home, CTA catalogo e contatti.
- Nessun claim non supportato (testi trasparenza).

### Header / navigazione

- Su pagine con banner foto: header trasparente in cima, solido dopo scroll.
- Menu mobile: tap su voce nav chiude il drawer; navigazione con View Transitions tra pagine.
- Sottomenu «Azienda» su desktop (hover/focus) e mobile.

### Homepage

- Disclaimer visibile sotto le recensioni (placeholder fino a testimonianze reali).

### Qualità automatica

- `npm test` — tutti i test verdi.
- `npm run build` — build statica senza errori.
- Opzionale: `npm run lint`, Lighthouse mobile su home, catalogo, scheda prodotto, carrello.
