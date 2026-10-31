# ADR 003 — Backoffice Sanity (server separato)

**Stato:** Accettato (2026-10-31)  
**Contesto:** Gap ADM-001 — contenuti solo via codice.

## Decisione

- **Sanity Studio** in `backoffice/` (hosting Sanity, separato dal sito Astro).
- **Sorgente runtime sito:** `src/generated/cms/bundle.json` generato da `npm run cms:sync` (prebuild).
- **Validazione:** `catalogSchema.parse` invariata.
- **Fallback:** seed in `src/content/seeds/` + `buildLegacyBundle()` se bundle assente.

## Conseguenze

- CI e dev funzionano senza Sanity se `bundle.json` è committato.
- Produzione con CMS richiede token Sanity su Vercel.
- Pubblicazione = Publish in Sanity + rebuild statico.

Vedi `PLAN-BACKOFFICE.md` e `docs/backoffice-setup.md`.
