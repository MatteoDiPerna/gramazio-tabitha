# Checklist go-live (F14–F15)

Usare insieme a [deployment.md](./deployment.md) e `npm run check:release`.

## Configurazione (F14.03)

- [ ] `SITE_URL` impostata su hosting
- [ ] `siteConfig.url` coerente (se build senza env)
- [ ] `whatsappE164` verificato con l'azienda
- [ ] Email ordini testata

## Contenuti (F14.02)

- [ ] Prezzi e formati in `src/domain/catalog/products.data.ts`
- [ ] Foto prodotto reali
- [ ] Note legali / privacy approvate

## Dopo il deploy (F15)

- [ ] Smoke test desktop e mobile
- [ ] Flusso carrello → email / WhatsApp
- [ ] `sitemap-index.xml` e `robots.txt` sul dominio live
- [ ] HTTPS attivo (F12.01)

Registrare data go-live e commit/tag opzionale.
