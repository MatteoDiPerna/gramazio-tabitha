# Gestione catalogo (F16.01)

## Dove sono i dati

- Schema: `src/data/catalog.schema.ts`
- Catalogo: `src/data/catalog.ts` (array prodotti validato con Zod)

## Aggiornare prodotti e prezzi

1. Modifica `src/data/catalog.ts` (o estrai in `catalog.json` importato da TS, se preferito).
2. Per ogni variante, imposta `priceCents` (intero, centesimi EUR) oppure `null` se non pubblicato.
3. `published: false` esclude il prodotto dal sito; `available: false` mostra “disponibilità da confermare”.
4. Esegui `npm test` e `npm run build`.
5. Deploy.

Il carrello **risincronizza** prezzi e nomi dal catalogo al caricamento pagina.

## Immagini

Sostituire `public/images/placeholder-product.svg` con file reali (WebP consigliato, F11.04) e aggiornare `product.image.src` / `alt`.

## SEO prodotti

Ogni slug in `/prodotti/[slug]` genera JSON-LD `Product`; `Offer` compare solo se `priceCents` è valorizzato.
