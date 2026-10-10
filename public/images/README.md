# Immagini statiche

I file in questa cartella vengono serviti così come sono in build (`/images/...`).  
Molte immagini sono **opzionali**: se aggiungi un file con il nome previsto, il sito lo userà automaticamente al prossimo `npm run build`.

## Homepage

| File (scegli un’estensione: `.webp`, `.jpg`, `.jpeg`, `.png`) | Uso |
|----------------------------------------------------------------|-----|
| `home/hero-banner.*` | Banner in cima alla home (sotto header) |
| `home/strip-chi-siamo.*` | Fascia orizzontale nella sezione «Chi siamo» |
| `home/strip-territorio.*` | Fascia opzionale tra sezioni (territorio / storytelling) |

## Prodotti

Per ogni prodotto, salva un’immagine con **slug** del prodotto (come in URL `/prodotti/[slug]`):

```
products/olio-extravergine-biologico.webp
products/fava-di-carpino.webp
products/la-favetta.webp
products/pate-di-fave.webp
```

Se manca, resta il placeholder definito in `products.data.ts` (`placeholder-product.svg`).

## Altri asset

- `og-default.svg` — anteprima social di default
- `placeholder-product.svg` — fallback catalogo

WebP consigliato per foto (F11.04). Testo alternativo (`alt`) resta nei dati prodotto o nei componenti pagina.
