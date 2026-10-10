# gramazio-tabitha

Sito web per **Azienda Agricola Gramazio Tabitha** (Carpino, FG): catalogo prodotti agricoli con **richiesta d'ordine** via WhatsApp ed email, **senza registrazione**.

## Obiettivi e contesto

- Valorizzare l'azienda e i prodotti (olio EVO bio, fava di Carpino, ecc.).
- Mostrare prezzi e formati quando disponibili.
- Permettere di comporre un ordine e inviarlo al produttore senza account.

Analisi completa: [docs/strctural_analysis.md](./docs/strctural_analysis.md)  
Checklist operativa: [docs/implementation-checklist.md](./docs/implementation-checklist.md)

## Funzionalità

### Previste (v1)

- Catalogo e schede prodotto
- Carrello leggero (localStorage)
- Riepilogo e invio WhatsApp / email
- Pagine istituzionali, SEO base, responsive mobile-first

### Escluse dalla v1

- Pagamenti online, login, CMS, gestione stock realtime

## Stato progetto

| Fase | Stato |
|------|--------|
| F00–F02 | Documentazione e ADR |
| F03 | Setup Astro + lib ordini + test |
| F04+ | In coda |

**Bloccante:** listino prezzi e asset da cliente ([information-gaps.md](./docs/information-gaps.md)).

## Stack e motivazioni

- **Astro 7** — sito statico performante
- **TypeScript** — tipi catalogo/carrello
- **React** (islands) — carrello (fasi successive)
- **Vitest** — test logica ordini e totali

Dettaglio decisione: [docs/decisions/001-static-stack.md](./docs/decisions/001-static-stack.md)

## Architettura (target)

```
src/
  config/site.config.ts   # contatti e testi globali
  data/                   # catalogo (F06)
  lib/                    # carrello, messaggi ordine
  components/
  pages/
docs/                     # analisi, checklist, test manuali
```

## Prerequisiti

- Node.js **≥ 22.12** (vedi `package.json` engines)
- npm

## Installazione

```bash
git clone https://github.com/MatteoDiPerna/gramazio-tabitha.git
cd gramazio-tabitha
npm ci
```

## Comandi

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Server di sviluppo |
| `npm run build` | Build produzione in `dist/` |
| `npm run preview` | Anteprima build |
| `npm test` | Test unitari (Vitest) |

## Configurazione contatti

Modificare **`src/config/site.config.ts`**:

- `email`, `ordersEmail`, `phoneDisplay`, `phoneTel`
- `whatsappE164` — solo cifre con prefisso IT (es. `393334125391`), **dopo conferma WhatsApp**
- `url` — dominio produzione

Non committare segreti o file `.env` con credenziali.

## Ordini (logica attuale)

- `src/lib/orderMessage.ts` — testo ordine
- `src/lib/whatsapp.ts` — URL wa.me (null se WhatsApp non configurato)
- `src/lib/mailto.ts` — link email con troncamento sicuro

Specifiche: [docs/order-message-spec.md](./docs/order-message-spec.md)

## Test e collaudo

- Automatici: `npm test`, `npm run build`
- Manuali per fase: [docs/testing.md](./docs/testing.md)

## Deployment

Build statica: deploy della cartella `dist/` su Netlify, Cloudflare Pages o Vercel collegati al repository GitHub.

## Git

Conventional Commits (`feat:`, `docs:`, `fix:`, …). Commit solo dopo test pertinenti.

## Roadmap

Vedi checklist F04–F16 in [docs/implementation-checklist.md](./docs/implementation-checklist.md).
