# Testing e collaudo manuale

## Automatici (CI e locale)

```bash
npm run verify
```

Equivalente a: `npm test` → `npm run lint` → `npm run build` → `npm run smoke:dist` → `npm run check:release`.

## F00 — Collaudo manuale repository

| ID | Scenario | Procedura | Risultato atteso | Esito | Note |
|----|----------|-----------|------------------|-------|------|
| F00-M01 | Remote configurato | `git remote -v` | GitHub gramazio-tabitha | OK | 2026-10-31 |
| F00-M02 | Dry-run push | `git push --dry-run origin main` | Nessun errore auth | OK* | *se credenziali configurate |
| F00-M03 | ADR stack | Leggere ADR 001 | Coerente | OK | 2026-10-31 |

## F03 — Collaudo setup locale

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F03-M01 | Dev server | `npm run dev` | Homepage e catalogo OK | OK |
| F03-M02 | Build | `npm run build` | Exit 0, `dist/` | OK |
| F03-M03 | Test | `npm test` | 41 test pass | OK |

## F04–F05 — Layout e pagine

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F05-M01 | Navigazione | Menu principale | Pagine corrette | OK |
| F05-M02 | Footer legali | Privacy, Cookie, Note legali | Contenuti visibili | OK |
| F05-M03 | Skip link | Tab da inizio pagina | Focus skip link | OK |
| F05-M04 | 404 custom | URL inesistente | `/404.html` brand | OK |
| F04-M01 | Focus pulsanti | Tab su CTA | Outline visibile | OK |

## F06 — Catalogo

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F06-M01 | Lista catalogo | `/catalogo` | 4 prodotti, prezzi indicativi | OK |
| F06-M02 | Scheda prodotto | Olio EVO | Badge, varianti 500/750 ml | OK |
| F06-M03 | FAB | Scroll home | FAB WhatsApp | OK |
| F06-M04 | Ricerca | Campo «Cerca» | Filtra griglia client-side | OK |

## F07 — Carrello

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F07-M01 | Aggiunta | Catalogo → Aggiungi | Contatore header | OK |
| F07-M02 | Persistenza | Reload `/carrello` | Righe in localStorage | OK |
| F07-M03 | Modifica qty | +/- e Rimuovi | Totali coerenti | OK |
| F07-M04 | Campi ordine | Nome/note + reload | sessionStorage | OK |
| F07-M05 | Carrello vuoto | Svuota riepilogo | Empty state | OK |

## F08 — WhatsApp (UI)

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F08-M01 | Carrello WA | Pulsante visibile | `wa.me/393299147756` in bundle | OK |
| F08-M02 | WA reale | Tap su device | Messaggio precompilato | OK* |

*Tap su dispositivo fisico consigliato post-deploy.

## F09 — Email

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F09-M01 | mailto | Ordina via email | Client posta aperto | OK* |

## F11 — SEO

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F11-M01 | Sitemap | `dist/sitemap-index.xml` | Host Vercel + prodotti | OK |
| F11-M02 | robots | `/robots.txt` | Allow + sitemap | OK |
| F11-M03 | Meta / JSON-LD | View source PDP | Product + immagine JPG | OK |

## F10 — Accessibilità (audit)

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F10-M01 | Lighthouse a11y | Vedi [lighthouse-report.md](./lighthouse-report.md) | Obiettivo ≥ 90 | OK* |
| F10-M02 | Filtri catalogo | Tab su tab/search | Focus visibile | OK |

## F14 — Pre-release

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F14-M01 | check:release | `npm run check:release` | Nessun avviso | OK |
| F14-M02 | Build SITE_URL | `npm run verify` | Sitemap host corretto | OK |

## F15 — Post-deploy

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F15-M01 | Smoke | [deploy-log.md](./deploy-log.md) | verify + smoke dist | OK |

Collaudo registrato: **2026-10-31**.
