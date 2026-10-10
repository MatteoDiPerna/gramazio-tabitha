# ADR 002 — Layout sorgente: domain + content, sito monolitico statico

**Stato:** accettato  
**Data:** 2026-03-21  
**Contesto:** revisione struttura post-v1; hosting previsto Vercel.

## Decisione

- Mantenere **un solo package** Astro (no split frontend/backend).
- Raggruppare la logica in **`src/domain/`** (catalog, cart, order, seo).
- Estrarre copy riutilizzabile in **`src/content/`** (FAQ, link footer).
- Introdurre alias **`@/`** per import chiari.
- Separare dati grezzi catalogo in **`products.data.ts`** e API di lettura in **`domain/catalog/index.ts`**.

## Alternative considerate

| Alternativa | Motivo del rigetto (v1) |
|-------------|-------------------------|
| Monorepo `apps/web` + `apps/api` | Nessuna API in produzione |
| Cartella `src/data/` generica | Mescolava schema, query e presentazione |
| Spostare pagine legali sotto `/legal/*` | Cambio URL non necessario |

## Conseguenze

- Aggiornare doc e script che puntavano a `src/data/catalog.ts` → `src/domain/catalog/products.data.ts`.
- Test Vitest restano accanto ai moduli in `domain/`.
