# Testing e collaudo manuale

## Automatici

```bash
npm test
npm run build
```

## F00 — Collaudo manuale repository

| ID | Scenario | Prerequisiti | Procedura | Risultato atteso | Esito | Note |
|----|----------|--------------|-----------|------------------|-------|------|
| F00-M01 | Remote configurato | Git installato | Aprire `docs/repository-state.md` e confrontare con `git remote -v` | URL `github.com/MatteoDiPerna/gramazio-tabitha.git` | Da eseguire | |
| F00-M02 | Dry-run push | Credenziali GitHub | `git push --dry-run origin main` | Nessun errore auth | Da eseguire | |
| F00-M03 | ADR stack | — | Leggere `docs/decisions/001-static-stack.md` | Coerente con strctural_analysis | Da eseguire | |

## F03 — Collaudo setup locale

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F03-M01 | Dev server | `npm run dev`, aprire localhost | Pagina "Sito in costruzione" in italiano | Da eseguire |
| F03-M02 | Build | `npm run build` | Exit code 0, cartella `dist/` | Da eseguire |
| F03-M03 | Test | `npm test` | Tutti i test passano | Da eseguire |

## F04–F05 — Layout e pagine

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F05-M01 | Navigazione | Da home, aprire Prodotti, Chi siamo, FAQ, Contatti | Pagine corrette, menu mobile funziona | Da eseguire |
| F05-M02 | Footer legali | Clic su Privacy, Cookie, Note legali | Bozze visibili con avviso giuridico | Da eseguire |
| F05-M03 | Skip link | Tab da inizio pagina | Focus su "Vai al contenuto" | Da eseguire |
| F04-M01 | Focus pulsanti | Tab su CTA homepage | Outline visibile | Da eseguire |

## F06 — Catalogo

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F06-M01 | Lista catalogo | `/catalogo` | 4 prodotti, "Prezzo su richiesta" | Da eseguire |
| F06-M02 | Scheda prodotto | Aprire olio EVO bio | Dettaglio, badge Bio, no prezzo inventato | Da eseguire |
| F06-M03 | FAB mobile | Scroll home | "Chiama" se WhatsApp non configurato | Da eseguire |

## F07 — Carrello

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F07-M01 | Aggiunta | Catalogo → Aggiungi all'ordine ×2 | Header "Ordine (2)" | Da eseguire |
| F07-M02 | Persistenza | Ricaricare `/carrello` | Righe ancora presenti | Da eseguire |
| F07-M03 | Modifica qty | Riepilogo → +/− e Rimuovi | Totali/testo coerenti | Da eseguire |
| F07-M04 | Campi ordine | Compilare nome/note | Compaiono in anteprima messaggio | Da eseguire |
| F07-M05 | Carrello vuoto | Rimuovi tutte le righe | Messaggio vuoto + link catalogo | Da eseguire |

## F08 — WhatsApp (UI)

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F08-M01 | Senza E.164 | Aprire `/carrello` con prodotti | Testo su WA non configurato; copia/tel/email ok | Da eseguire |
| F08-M02 | Con E.164 *(dopo config)* | Impostare `whatsappE164`, Ordina su WA | Messaggio precompilato corretto | Da eseguire |

## F09 — Email

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F09-M01 | mailto | Tap "Ordina via email" su mobile/desktop | Client posta con oggetto e corpo | Da eseguire |

## F11 — SEO

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F11-M01 | Sitemap | Dopo `npm run build`, aprire `dist/sitemap-index.xml` | URL principali e prodotti elencati | Da eseguire |
| F11-M02 | robots | Aprire `/robots.txt` in dev o dist | Allow / + riferimento sitemap | Da eseguire |
| F11-M03 | Meta / JSON-LD | View source scheda prodotto | canonical, og:tags, script ld+json Product | Da eseguire |

## F10 — Accessibilità (audit)

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F10-M01 | Lighthouse a11y | Chrome DevTools → Lighthouse su home e `/carrello` | Score ≥ 90 (obiettivo) | Da eseguire |
| F10-M02 | Filtri catalogo | Tab su filtri categoria | Focus visibile, `aria-current` sul filtro attivo | Da eseguire |

## F14 — Pre-release

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F14-M01 | check:release | `npm run check:release` | Elenco avvisi comprensibile; risolvere prima del live | Da eseguire |
| F14-M02 | Build con SITE_URL | `SITE_URL=https://test.example npm run build` | Sitemap con URL corretti in `dist/` | Da eseguire |

## F15 — Post-deploy

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F15-M01 | Smoke | Seguire [release-go-live.md](./release-go-live.md) | Tutte le voci critiche OK | Da eseguire |
