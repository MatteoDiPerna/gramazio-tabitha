# Gestione catalogo (F16.01)

## Dove sono i dati

- Schema: `src/domain/catalog/catalog.schema.ts`
- Dati prodotti: `src/domain/catalog/products.data.ts` (validati via `src/domain/catalog/index.ts`)

## Aggiornare prodotti e prezzi

1. Modifica `src/domain/catalog/products.data.ts` (o estrai in JSON importato da TS, se preferito).
2. Per ogni variante, imposta `priceCents` (intero, centesimi EUR) oppure `null` se non pubblicato.
3. `published: false` esclude il prodotto dal sito; `available: false` mostra “disponibilità da confermare”.
4. Esegui `npm test` e `npm run build`.
5. Deploy.

Il carrello **risincronizza** prezzi e nomi dal catalogo al caricamento pagina.

## Immagini

Sostituire `public/images/placeholder-product.svg` con file reali (WebP consigliato, F11.04) e aggiornare `product.image.src` / `alt`.

## SEO prodotti

Ogni slug in `/prodotti/[slug]` genera JSON-LD `Product`; `Offer` compare solo se `priceCents` è valorizzato.
