# Manutenzione (F16)

## Aggiornamento catalogo

Vedi [catalog-management.md](./catalog-management.md).

## Dipendenze (F16.02)

| Frequenza | Attività |
|-----------|----------|
| Trimestrale | `npm outdated`, `npm audit`, aggiornare patch/minor Astro/React |
| Dopo ogni aggiornamento | `npm test`, `npm run build`, smoke su `/carrello` |
| Annuale | Rivalutare major Astro; leggere changelog `@astrojs/sitemap` |

Registrare data e esito in commit `chore: dependency review YYYY-MM`.

## Monitoraggio post-lancio

- Verificare periodicamente link contatti e flusso ordine.
- Allineare prezzi sul sito al listino cartaceo dopo ogni variazione.
