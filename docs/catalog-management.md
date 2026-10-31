# Gestione catalogo (F16.01)

## Dove sono i dati

- Schema: `src/domain/catalog/catalog.schema.ts`
- Dati prodotti: `src/domain/catalog/products.data.ts` (validati via `src/domain/catalog/index.ts`)

## Esempio: aggiornare prezzo e immagine

### 1. Prezzo di una variante esistente

In `products.data.ts`, trova il prodotto per `slug` e modifica `variants`:

```typescript
variants: [
  { id: '500ml', label: '500 ml', priceCents: 1490, unit: 'ml', unitAmount: 500 },
],
```

- `priceCents`: intero in centesimi EUR (1490 = € 14,90 IVA incl. se così comunicato).
- `null` → in sito compare «Prezzo su richiesta» e il carrello non somma quella voce.

### 2. Aggiungere un secondo formato (es. olio)

```typescript
variants: [
  { id: '500ml', label: '500 ml', priceCents: 1290, unit: 'ml', unitAmount: 500 },
  { id: '750ml', label: '750 ml', priceCents: 1790, unit: 'ml', unitAmount: 750 },
],
```

In scheda prodotto compare il selettore radio; in catalogo la card usa la **prima** variante per anteprima prezzo.

### 3. Immagine prodotto

1. Salva il file come `public/images/products/{slug}.jpg` (o `.webp`, `.png`).
2. Allinea `image.src` in `products.data.ts`:

```typescript
image: {
  src: '/images/products/olio-extravergine-biologico.jpg',
  alt: 'Descrizione accessibile verificata',
},
```

3. Opzionale: sequenza 360° in `public/images/products/{slug}/360/00.jpg` …

### 4. Stagionalità (testo)

Campo opzionale a livello prodotto:

```typescript
seasonalNote: 'Disponibile da ottobre a marzo — confermare al momento dell’ordine.',
```

### 5. Verifica e deploy

```bash
npm test
npm run build
npm run check:release
```

Il carrello **risincronizza** prezzi e nomi dal catalogo al caricamento pagina (`syncCartWithCatalog`).

## Flag utili

| Campo | Effetto |
|-------|---------|
| `published: false` | Prodotto escluso da sito e da `getStaticPaths` |
| `available: false` | Visibile ma non aggiungibile al carrello |
| `badges` | `bio`, `slow-food` in card e scheda |

## SEO prodotti

Ogni slug in `/prodotti/[slug]` genera JSON-LD `Product`; `Offer` compare se la prima variante (o quella selezionata in UI) ha `priceCents` valorizzato. L’immagine in JSON-LD usa il path risolto (come Open Graph).
