# Roadmap v2 — fuori scope v1 (T-028)

Decisione **2026-10-31:** il sito v1 resta statico con catalogo in codice e ordini via WhatsApp/email. Le voci sotto sono tracciate per evoluzione futura, **non** incluse nel completamento PLAN v1.

## Modulo contatto serverless

- Endpoint Astro/Vercel (`output: hybrid` o adapter serverless).
- Invio email tramite provider transazionale (Resend, SendGrid, …).
- Rate limiting e honeypot anti-spam.
- **Alternativa attuale:** pagina `/contatti` + `mailto:` + telefono + ordine strutturato da `/carrello`.

## Headless CMS

- Sanity / Directus / Decap per prodotti e pagine editoriali.
- Sync build CI o webhook rebuild.
- **Alternativa attuale:** [catalog-management.md](./catalog-management.md).

## Analytics e cookie banner

- Solo se introdotto strumento di misurazione; aggiornare `cookie.astro` e banner consenso.

## Self-host font

- Migrazione da Google Fonts a `@fontsource` per ridurre richieste terze parti (vedi worklog T-022).
