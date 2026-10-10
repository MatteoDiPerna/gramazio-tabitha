# Listino prodotti (v1 — confermato)

Assortimento commerciale ufficiale per il sito, allineato alle informazioni pubbliche dell'azienda (Cibovagare / scheda prodotti).

| Prodotto | Categoria | Note |
|----------|-----------|------|
| Olio extravergine di oliva biologico | olio | Bio, cultivar autoctone |
| Fava di Carpino | legumi | Riferimento Slow Food |
| La Favetta | legumi | — |
| Patè di fave | condimenti | — |

Implementazione tecnica: `src/domain/catalog/products.data.ts`.

I prezzi in euro (per formato) si impostano in `variants[].priceCents` quando comunicati; fino ad allora il sito mostra **Prezzo su richiesta** e calcola l'ordine di conseguenza.
