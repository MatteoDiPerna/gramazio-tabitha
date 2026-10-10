# gramazio-tabitha

Sito web per **Azienda Agricola Gramazio Tabitha** (Carpino, FG): catalogo prodotti agricoli con **richiesta d'ordine** via WhatsApp ed email, **senza registrazione**.

## Obiettivi e contesto

- Valorizzare l'azienda e i prodotti (olio EVO bio, fava di Carpino, ecc.).
- Mostrare prezzi e formati quando disponibili.
- Permettere di comporre un ordine e inviarlo al produttore senza account.

Analisi completa: [docs/strctural_analysis.md](./docs/strctural_analysis.md)  
Architettura codice: [docs/architecture.md](./docs/architecture.md)  
Checklist operativa: [implementation-checklist.md](./implementation-checklist.md)  
Listino prodotti v1: [docs/listino.md](./docs/listino.md)

## Roadmap di lavoro

| Fase | Contenuto | Stato |
|------|-----------|--------|
| **1. Miglioramento v1** | UX, contenuti, immagini, qualità codice | **In corso** |
| **2. Collaudo** | Test manuali, Lighthouse, accessibilità | Da pianificare |
| **3. Pubblicazione (F15)** | Deploy, dominio, smoke test reali | **Ultima fase — non prioritaria ora** |

La **pubblicazione online resta volutamente alla fine**: prima si consolida il sito in locale/staging.  
Hosting previsto per il go-live iniziale: **[Vercel](https://vercel.com)** (`vercel.json` già presente; variabile `SITE_URL` in build — vedi [docs/deployment.md](./docs/deployment.md)).

## Funzionalità implementate (prima release)

- Homepage, chi siamo, contatti, FAQ
- Catalogo con filtri per categoria e schede prodotto
- Carrello (`localStorage`) e pagina `/carrello`
- Invio richiesta ordine: email (`mailto:`), copia testo, telefono; WhatsApp quando configurato
- SEO: sitemap, robots.txt, Open Graph, JSON-LD
- CI: test, build, `check:release`
- Documentazione deploy e manutenzione (da usare in fase 3)

### Escluse da questa release

- Pagamenti online, account utente, CMS admin, magazzino in tempo reale, analytics con cookie banner
- Backend dedicato (eventuali API future possono restare nello stesso repo Astro/Vercel)

## Struttura repository (sintesi)

```
src/
  config/       # site.config.ts
  content/      # FAQ, link footer
  domain/       # catalog, cart, order, seo (logica + test)
  components/   # UI
  pages/        # route pubbliche
  layouts/
  styles/
docs/           # analisi, listino, deploy, test
public/         # asset statici
```

Dettaglio layer e scelta «no split frontend/backend»: [docs/architecture.md](./docs/architecture.md).

## Stato progetto

| Area | Stato |
|------|--------|
| Sviluppo funzionale v1 | Completato in repo |
| Affinamento v1 | In corso |
| Collaudo manuale | Da eseguire ([docs/testing.md](./docs/testing.md)) |
| Deploy produzione (F15) | **Posticipato** — Vercel quando pronti |

## Punti aperti dopo la prima implementazione

Questi elementi restano **da completare** prima o subito dopo il go-live pubblico. Non bloccano il miglioramento del sito in locale.

### Configurazione e canali (pre/post go-live)

- [ ] **WhatsApp (`whatsappE164`)** — da configurare in `src/config/site.config.ts` quando pronto; fino ad allora ordini via email, copia testo e telefono
- [ ] **Dominio produzione** — registrare DNS e impostare `SITE_URL` in build (fase pubblicazione)
- [ ] **Smoke test ordini reali** — prova WhatsApp/email da dispositivo reale post-deploy (F15)

### Contenuti e listino

- [ ] **Prezzi numerici** — assortimento in [docs/listino.md](./docs/listino.md); valorizzare `priceCents` in `src/domain/catalog/products.data.ts` per totali automatici
- [ ] **Formati confezione** — sostituire «Formato da concordare» con varianti reali
- [ ] **Fotografie prodotto** — sostituire placeholder in `public/images/`
- [ ] **Testi istituzionali** — revisione copy chi siamo/territorio con l'azienda
- [ ] **FAQ spedizioni e pagamenti** — allineare a condizioni commerciali (`src/content/faq.ts`)

### Legale e compliance

- [ ] **Privacy, cookie, note legali** — bozze in sito; **revisione professionista** obbligatoria prima del live
- [ ] **Dati societari** — P.IVA, REA, ragione sociale completa ([docs/information-gaps.md](./docs/information-gaps.md))
- [ ] **Banner cookie** — solo se verranno aggiunti analytics/marketing (F12.02)

### Qualità e processo

- [ ] **Collaudo manuale completo** — [implementation-checklist.md](./implementation-checklist.md) / [docs/testing.md](./docs/testing.md)
- [ ] **Lighthouse / accessibilità** — obiettivo ≥ 90 (F10-M01)
- [ ] **ESLint / Prettier** — non ancora introdotti (F03 opzionale)
- [ ] **Sign-off formale analisi** — F02.07 se richiesto per contratto/progetto

### Evoluzione futura (non v1)

- CMS o pannello per aggiornare catalogo senza Git
- Modulo email serverless se `mailto:` risultasse insufficiente
- Blog/ricette, recensioni, multilingua
- Pagamenti online e area ordini (esplicitamente fuori scope v1)

## Stack

- Astro 7, TypeScript, React (islands), Vitest, `@astrojs/sitemap`

Dettaglio: [docs/decisions/001-static-stack.md](./docs/decisions/001-static-stack.md)

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build in `dist/` |
| `npm run preview` | Anteprima build |
| `npm test` | Test unitari |
| `npm run check:release` | Avvisi pre-produzione |

## Configurazione

- Sito: `src/config/site.config.ts`
- Catalogo: `src/domain/catalog/products.data.ts` (schema in `catalog.schema.ts`)

Non committare `.env` — usare [.env.example](./.env.example).

## Documentazione

- [docs/catalog-management.md](./docs/catalog-management.md)
- [docs/deployment.md](./docs/deployment.md)
- [docs/release-go-live.md](./docs/release-go-live.md)
- [docs/maintenance.md](./docs/maintenance.md)
- [docs/order-message-spec.md](./docs/order-message-spec.md)

## Git

Conventional Commits. Eseguire `npm test` e `npm run build` prima dei commit significativi.
