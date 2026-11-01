# Gramazio Tabitha — sito vetrina e ordini diretti

Progetto web per **Azienda Agricola Gramazio Tabitha** (Carpino, Gargano, FG): azienda agricola orientata a **olio extravergine biologico** e **prodotti tipici del territorio** (fava di Carpino, legumi, condimenti).

Il sito mette in risalto brand e catalogo e permette al cliente finale di **comporre una richiesta d’ordine** e inviarla all’azienda **senza registrazione**, **senza pagamento online** e **senza backend dedicato** — modello adatto a piccole realtà agricole che vogliono presenza professionale online mantenendo la relazione diretta con l’acquirente.

---

## Per chi legge questo repository (portfolio)

| Aspetto | In sintesi |
|--------|------------|
| **Ruolo tipico** | End-to-end product delivery: analisi contesto, UX, implementazione, test, documentazione operativa e percorso go-live |
| **Dominio** | Agroalimentare / D2C leggero, territorio, bio, tracciabilità narrativa |
| **Tipo di prodotto** | Sito statico ad alte prestazioni + flusso ordine “umano in the loop” |
| **Lingua** | Italiano (contenuti e mercato) |

---

## Cosa offre il sito (funzionalità business)

### Presenza istituzionale

- **Homepage** con hero immersivo, presentazione azienda, servizi, galleria territorio, sezione prodotti in evidenza.
- **Chi siamo**: racconto strutturato (territorio, approccio produttivo, trasparenza sui claim).
- **Contatti**: indirizzo, telefono, email, mappa e link a indicazioni stradali.

### Catalogo e vendita assistita

- **Catalogo** con filtri per categoria (olio, legumi, condimenti), schede prodotto con immagini (incluso viewer 360° dove disponibile), badge (bio, Slow Food).
- **Prezzi e formati** quando presenti in listino; altrimenti messaggio chiaro «prezzo su richiesta» — evita promesse commerciali non verificate.
- **Carrello** lato browser: il visitatore accumula righe e vede un riepilogo con totali indicativi quando i prezzi sono noti.

### Canali d’ordine (conversione)

- Invio **richiesta d’ordine** via **WhatsApp** (quando il numero è configurato), **email** (`mailto:` con messaggio precompilato) o **copia testo** negli appunti.
- Messaggio ordine strutturato (prodotti, quantità, note, dati consegna opzionali) allineato a come l’azienda gestisce ordini offline.
- **Disclaimer** esplicito: l’invio non è conferma automatica; l’azienda ricontatta per disponibilità, spedizione e pagamento.

### Fiducia, SEO e compliance (base)

- Pagine **FAQ** (ordini, spedizioni, pagamenti — aggiornabili quando l’azienda fornisce condizioni definitive).
- **Privacy**, **cookie**, **note legali** (struttura pronta; testi definitivi da revisione legale e dati societari completi).
- **SEO tecnico**: titoli, meta, Open Graph, sitemap, dati strutturati (organizzazione, prodotti, FAQ).

### Esplicitamente fuori scope (scelta di prodotto)

- Pagamenti online, account utente, gestionale magazzino, analytics con banner cookie (finché non servono).

### Backoffice contenuti (2026-10-31)

- **Sanity Studio** in [`backoffice/`](./backoffice/) — applicazione **separata** dal sito (locale `npm run backoffice:dev` o hosted `*.sanity.studio`).
- Piano e requisiti: [`PLAN-BACKOFFICE.md`](./PLAN-BACKOFFICE.md).
- Sorgente runtime del sito: `src/generated/cms/bundle.json` (validazione catalogo Zod invariata).
- Script: `cms:snapshot` (seed repo), `cms:import` (→ Sanity), `cms:sync` (Sanity → bundle, anche in `prebuild`).
- Guide: [docs/backoffice-setup.md](./docs/backoffice-setup.md), [docs/backoffice-manuale-operatore.md](./docs/backoffice-manuale-operatore.md), ADR [003-backoffice-cms.md](./docs/decisions/003-backoffice-cms.md).

---

## Stack e competenze messe in giogo

| Area | Scelte / pratiche |
|------|-------------------|
| **Frontend & sito** | [Astro](https://astro.build) 7 — pagine statiche veloci, SEO-friendly |
| **Interattività mirata** | [React](https://react.dev) “islands” solo dove serve (carrello, accordion FAQ, viewer prodotto) |
| **Linguaggio & qualità** | TypeScript strict, validazione catalogo (schema), test unitari ([Vitest](https://vitest.dev)) |
| **Design** | Design system leggero (token, componenti UI riusabili), layout responsive e touch-friendly |
| **Accessibilità & UX** | Navigazione chiara, accordion FAQ accessibile, form ordine con validazione leggera, header adattivo su banner |
| **DevOps leggero** | CI GitHub Actions (`npm run verify`), `netlify.toml`, deploy **Netlify** (pre-staging / produzione) |
| **Contenuti / CMS** | Sanity headless + bundle JSON; seed in `src/content/seeds/` |
| **Documentazione** | PLAN v1/v backoffice, gap cliente, mappa URL, catalogo, deploy e backoffice |

Documentazione tecnica di supporto (non necessaria per capire il valore business): [docs/architecture.md](./docs/architecture.md), [docs/strctural_analysis.md](./docs/strctural_analysis.md).

---

## Stato del progetto: cosa è “fatto” e cosa manca

Due livelli distinti — è normale in progetti B2B con dati che arrivano dal cliente.

### Completato lato prodotto / sviluppo

- Architettura informativa e pagine principali (home, catalogo, scheda prodotto, carrello, chi siamo, FAQ, contatti, legali bozza).
- Refactoring UX su catalogo, scheda prodotto, carrello e FAQ (componenti dedicati, mobile sticky, breadcrumb, correlati).
- Flusso ordine end-to-end in locale; CI con test, lint, build, smoke dist, check release.
- **Backoffice Sanity:** studio in `backoffice/`, integrazione CMS → `bundle.json`, pagine legali editabili da bundle, documentazione operatore/setup.
- Piano backoffice: `PLAN-BACKOFFICE.md` (analisi + roadmap implementazione).

Dettaglio checkbox: [worklog.md](./worklog.md).

### Ancora aperto prima del go-live **pubblico** (dominio, marketing)

Non blocca un **deploy di prova** su Vercel, ma sì la promozione come sito ufficiale:

| Tema | Perché è ancora aperto |
|------|-------------------------|
| **Listino definitivo** (IVA, formati) | Prezzi attuali = listino v1 **indicativo** → [docs/listino.md](./docs/listino.md); aggiornabile da backoffice dopo conferma |
| **Foto / diritti** | Alcune immagini presenti; validazione commerciale e sostituzioni via CMS |
| **Dati legali e testi privacy/cookie** | Bozze tecniche; revisione professionista → [docs/information-gaps.md](./docs/information-gaps.md) |
| **WhatsApp E.164** | Da confermare con titolare (`site.config` / Impostazioni sito in Sanity) |
| **Spedizioni, pagamenti, FAQ** | Copy generico finché l’azienda non fissa condizioni |
| **Dominio custom + SEO “finale”** | `SITE_URL` su `*.vercel.app` sufficiente per staging |
| **Collaudo manuale + Lighthouse** | [docs/testing.md](./docs/testing.md) |

### Deploy su Vercel (gratuito) — quando conviene

| Obiettivo | Momento | Note |
|-----------|---------|------|
| **Staging / anteprima** (URL `*.vercel.app`, non indicizzato come brand ufficiale) | **Sì, ora** | Build già pronta (`vercel.json`, CI verde). Utile per demo al cliente, test ordini WA/email, prova backoffice + `cms:sync` in preview. Imposta `SITE_URL` = URL del deployment. **Non** serve listino finale né dominio. |
| **Go-live pubblico** (dominio azienda, Google, materiale stampa) | **Dopo** gap sopra | Evita recensioni placeholder visibili, prezzi non confermati e legali in bozza come “ufficiali”. |

**Ordine consigliato:** (1) deploy Vercel staging + smoke test → (2) dati cliente + edit backoffice → (3) collaudo → (4) dominio + `SITE_URL` produzione → (5) comunicazione pubblica.

Procedura dettagliata staging: [docs/vercel-staging.md](./docs/vercel-staging.md).  
Vedi anche [docs/deployment.md](./docs/deployment.md), [docs/release-go-live.md](./docs/release-go-live.md).

---

## Roadmap (allineata al worklog)

1. **Miglioramento v1 + backoffice MVP** — completato in codice (2026-10-31).  
2. **Deploy Vercel staging** — consigliato per validazione con cliente (opzionale Sanity env in preview).  
3. **Dati e compliance** — in attesa azienda (bloccante go-live **pubblico**).  
4. **Collaudo e performance** — manuale + Lighthouse.  
5. **Go-live dominio** — DNS, `SITE_URL` definitivo, webhook Sanity → Vercel (se CMS attivo).

---

## Comandi rapidi (sviluppo)

| Comando | Uso |
|---------|-----|
| `npm run dev` | Sito locale (http://localhost:4321) |
| `npm run backoffice:dev` | Sanity Studio locale (http://localhost:3333) |
| `npm run cms:import` | Seed repo → Sanity (token in `.env` root) |
| `npm run cms:sync` | Sanity → `bundle.json` (anche in `prebuild`) |
| `npm run cms:snapshot` | Rigenera bundle dai seed senza Sanity |
| `npm run build` | Build produzione in `dist/` |
| `npm test` | Test unitari |
| `npm run verify` | Test + lint + build + smoke + check release |
| `npm run backoffice:deploy` | Pubblica Studio su sanity.studio |

Contenuti runtime: `src/generated/cms/bundle.json` (catalogo + impostazioni + editoriali). Seed tecnico: `src/content/seeds/`, `src/domain/catalog/products.data.ts`.

---

## Documenti utili nel repo

| Documento | Contenuto |
|-----------|-----------|
| [worklog.md](./worklog.md) | Checklist lavoro + test manuali post-implementazione |
| [implementation-checklist.md](./implementation-checklist.md) | Fasi F00–F16 e collaudo formale |
| [docs/information-gaps.md](./docs/information-gaps.md) | Elenco dati da raccogliere con l’azienda |
| [docs/page-paths.md](./docs/page-paths.md) | Mappa pagine (per manutenzione) |
| [docs/catalog-management.md](./docs/catalog-management.md) | Catalogo (backoffice o seed tecnico) |
| [PLAN-BACKOFFICE.md](./PLAN-BACKOFFICE.md) | Piano backoffice e autonomia contenuti |
| [docs/backoffice-setup.md](./docs/backoffice-setup.md) | Avvio Studio, import, sync, Vercel |
| [docs/backoffice-manuale-operatore.md](./docs/backoffice-manuale-operatore.md) | Guida per il titolare |

---

## Git

Conventional Commits. Prima di merge significativi: `npm test`, `npm run build`, e quando si avvicina il go-live anche `npm run check:release`.
