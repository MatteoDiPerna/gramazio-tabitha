# Requisiti funzionali v1 / v2 (F02.01)

## v1 — In scope

| ID | Requisito | Priorità |
|----|-----------|----------|
| RF-01 | Homepage con presentazione, CTA catalogo, contatto | P0 |
| RF-02 | Catalogo prodotti con immagine, nome, formato, prezzo (quando disponibile) | P0 |
| RF-03 | Scheda prodotto per SEO (`/prodotti/[slug]`) | P1 |
| RF-04 | Selettore quantità e aggiunta a ordine (carrello leggero) | P0 |
| RF-05 | Carrello: modifica qty, rimuovi, subtotale/totale prodotti | P0 |
| RF-06 | Persistenza carrello in `localStorage` (no account) | P0 |
| RF-07 | Riepilogo con disclaimer richiesta d'ordine | P0 |
| RF-08 | Invio ordine via WhatsApp (messaggio precompilato) | P0 |
| RF-09 | Invio ordine via email (`mailto:`) | P0 |
| RF-10 | Pagine Chi siamo, Contatti, FAQ ordini/spedizioni (testi cliente) | P1 |
| RF-11 | Privacy, cookie (se necessario), note legali (testi legali) | P0 |
| RF-12 | Responsive mobile-first, FAB/link WhatsApp | P0 |
| RF-13 | SEO base: meta, sitemap, robots, schema.org minimi | P1 |

## v1 — Out of scope

- Registrazione / login
- Pagamento online
- Backend ordini / CRM
- CMS amministrativo
- Gestione stock in tempo reale
- Multilingua, blog, recensioni integrate

## v2 — Opzionale (post-lancio)

- Modulo contatto con invio email serverless
- Headless CMS per catalogo
- Contenuti editoriali (ricette)
- Analytics con consenso cookie

## Requisiti non funzionali

- Performance: obiettivo Lighthouse mobile ≥ 85
- Accessibilità: WCAG 2.1 AA per flussi principali
- Sicurezza: HTTPS, nessun segreto nel frontend
- Manutenibilità: catalogo e contatti in file configurazione centralizzati
