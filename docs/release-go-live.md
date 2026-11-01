# Checklist go-live (F14–F15)

Usare insieme a [deployment.md](./deployment.md) e `npm run verify`.

## Configurazione (F14.03)

- [x] `SITE_URL` default documentato (`gramazio-tabitha.netlify.app`) + env Netlify
- [x] `siteConfig.url` allineato via `import.meta.env.SITE` / fallback `siteUrl.ts`
- [x] `whatsappE164` configurato (`393299147756`)
- [x] Email ordini in `site.config.ts` (test manuale mailto a cura del titolare)

## Contenuti (F14.02)

- [x] Prezzi e formati in `products.data.ts` (listino v1 indicativo)
- [x] Foto prodotto JPG in `public/images/products/`
- [x] Note legali con P.IVA/PEC; privacy/cookie bozze GDPR da revisione professionista

## Dopo il deploy (F15)

- [x] Smoke automatizzato `npm run smoke:dist` su artefatto build
- [x] Flusso carrello → WA/email coperto in bundle (verifica smoke)
- [x] `sitemap-index.xml` e `robots.txt` generati in build
- [x] HTTPS attivo su Vercel (F12.01)

Dettaglio: [deploy-log.md](./deploy-log.md).

Registrare data go-live reale e tag opzionale al primo deploy produzione visibile al pubblico.
