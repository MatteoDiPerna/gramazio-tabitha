# ADR 001 — Stack statico Astro + catalogo dati + ordine WhatsApp/email

**Stato:** accettato  
**Data:** 2026-03-21  
**Contesto:** [strctural_analysis.md](../strctural_analysis.md)

## Decisione

Implementare il sito come **applicazione statica** con:

- **Astro 5** (output statico, HTML leggero)
- **TypeScript** strict
- **React** (islands) solo per carrello e interazioni catalogo
- Catalogo in **file dati versionati** (JSON/TS), single source of truth per prezzi
- Ordini via **WhatsApp Click to Chat** (canale primario) e **`mailto:`** (secondario)
- **Nessun** account utente, **nessun** pagamento online in v1
- Hosting **statico** (Netlify / Cloudflare Pages / Vercel)

## Alternative considerate

| Alternativa | Motivo del rigetto (v1) |
|-------------|-------------------------|
| Statico + backend email (Formspree, serverless) | Riserva se `mailto:` insufficiente; aggiunge costi e manutenzione |
| CMS / WooCommerce | Eccesso per aggiornamenti rari del catalogo; modello ordine non allineato a checkout classico |

## Conseguenze

- Aggiornamento prezzi/prodotti: edit file catalogo + deploy (documentato in README)
- Config centralizzata contatti in `src/config/site.config.ts` (placeholder fino a dati cliente)
- Test unitari su calcolo totali e generazione URL messaggi (Vitest)

## Revisione

Rivalutare CMS o modulo email serverless se:

- il catalogo supera ~30 SKU con aggiornamenti frequenti non gestibili via Git, oppure
- test reali su mobile dimostrano fallimenti sistematici di `mailto:`.
