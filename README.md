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

- Pagamenti online, account utente, gestionale magazzino, CMS admin, analytics con banner cookie (finché non servono).

---

## Stack e competenze messe in gioco

| Area | Scelte / pratiche |
|------|-------------------|
| **Frontend & sito** | [Astro](https://astro.build) 7 — pagine statiche veloci, SEO-friendly |
| **Interattività mirata** | [React](https://react.dev) “islands” solo dove serve (carrello, accordion FAQ, viewer prodotto) |
| **Linguaggio & qualità** | TypeScript strict, validazione catalogo (schema), test unitari ([Vitest](https://vitest.dev)) |
| **Design** | Design system leggero (token, componenti UI riusabili), layout responsive e touch-friendly |
| **Accessibilità & UX** | Navigazione chiara, accordion FAQ accessibile, form ordine con validazione leggera, header adattivo su banner |
| **DevOps leggero** | CI (build + test), script pre-release, deploy previsto su **Vercel** (config presente, dominio da attivare) |
| **Documentazione** | Analisi, checklist implementazione, gap informativi cliente, mappa URL→file, guida catalogo e go-live |

Documentazione tecnica di supporto (non necessaria per capire il valore business): [docs/architecture.md](./docs/architecture.md), [docs/strctural_analysis.md](./docs/strctural_analysis.md).

---

## Stato del progetto: cosa è “fatto” e cosa manca

Due livelli distinti — è normale in progetti B2B con dati che arrivano dal cliente.

### Completato lato prodotto / sviluppo

- Architettura informativa e pagine principali (home, catalogo, scheda prodotto, carrello, chi siamo, FAQ, contatti, legali bozza).
- Refactoring UX su catalogo, scheda prodotto, carrello e FAQ (componenti dedicati, mobile sticky, breadcrumb, correlati).
- Flusso ordine end-to-end in ambiente locale/staging.
- Test automatici su logiche critiche (catalogo, carrello, messaggio ordine, SEO strutturato).
- ESLint / Prettier, worklog e checklist aggiornati.

Dettaglio checkbox: [worklog.md](./worklog.md).

### Ancora aperto prima del go-live “pubblico”

Non dipende da ulteriore codice feature, ma da **input azienda** e **fasi finali**:

| Tema | Perché è ancora aperto |
|------|-------------------------|
| **Listino** (formati × prezzi IVA) | Serve conferma commerciale → [docs/listino.md](./docs/listino.md), `products.data.ts` |
| **Foto prodotto** e diritti | Asset reali da cliente |
| **Dati legali** (P.IVA, REA, PEC, ragione sociale) | Obbligatori per note legali corrette → [docs/information-gaps.md](./docs/information-gaps.md) |
| **Testi privacy/cookie** approvati | Revisione professionista, non inventabile in repo |
| **WhatsApp E.164 verificato** | Il telefono pubblico non è ancora confermato come linea WA |
| **Spedizioni, pagamenti, dominio** | Condizioni commerciali e URL produzione (`SITE_URL`) |
| **Collaudo manuale + Lighthouse** | Attività di QA pre-deploy → [docs/testing.md](./docs/testing.md) |
| **Deploy Vercel** | **Dopo** chiusura gap sopra → [docs/release-go-live.md](./docs/release-go-live.md), [docs/deployment.md](./docs/deployment.md) |

**Ordine consigliato:** raccogliere dati cliente → aggiornare config/catalogo/legali → collaudo → impostare dominio e `SITE_URL` → deploy Vercel e smoke test ordini reali.

---

## Roadmap (allineata al worklog)

1. **Miglioramento v1** — sostanzialmente completato in codice.  
2. **Dati e compliance** — in attesa azienda (bloccante go-live).  
3. **Collaudo e performance** — manuale + Lighthouse.  
4. **Pubblicazione (F15)** — Vercel, DNS, smoke test WhatsApp/email.

---

## Comandi rapidi (sviluppo)

| Comando | Uso |
|---------|-----|
| `npm run dev` | Anteprima locale |
| `npm run build` | Build produzione in `dist/` |
| `npm test` | Test unitari |
| `npm run check:release` | Controlli pre-go-live |
| `npm run verify` | Test + lint + build + smoke dist + check release |
| `npm run lint` | Lint codice |

Configurazione commerciale centralizzata: `src/config/site.config.ts`. Catalogo: `src/domain/catalog/products.data.ts`.

---

## Documenti utili nel repo

| Documento | Contenuto |
|-----------|-----------|
| [worklog.md](./worklog.md) | Checklist lavoro + test manuali post-implementazione |
| [implementation-checklist.md](./implementation-checklist.md) | Fasi F00–F16 e collaudo formale |
| [docs/information-gaps.md](./docs/information-gaps.md) | Elenco dati da raccogliere con l’azienda |
| [docs/page-paths.md](./docs/page-paths.md) | Mappa pagine (per manutenzione) |
| [docs/catalog-management.md](./docs/catalog-management.md) | Come aggiornare prodotti e prezzi |

---

## Git

Conventional Commits. Prima di merge significativi: `npm test`, `npm run build`, e quando si avvicina il go-live anche `npm run check:release`.
