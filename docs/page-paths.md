# Mappa URL → file sorgente

Riferimento per sapere **quale file Astro corrisponde a quale URL** e quali file allegare in chat quando chiedi modifiche a una pagina.

Convenzione Astro: ogni file in `src/pages/` diventa una route pubblica (path = percorso del file, senza estensione; `index.astro` = cartella).

---

## Globale (presente su quasi tutte le pagine)

Modifiche a **header, footer, menu, SEO di base, stili globali** → allega almeno:

| Ruolo | Path |
|--------|------|
| Layout pagina | `src/layouts/BaseLayout.astro` |
| Header + menu principale | `src/components/layout/Header.astro` |
| Footer + link legali | `src/components/layout/Footer.astro` |
| FAB WhatsApp / telefono | `src/components/layout/WhatsAppFab.astro` |
| Voci menu header | `src/config/site.config.ts` (`nav`: Prodotti · Azienda ▾ · Contatti), `src/scripts/headerNavMenu.ts` |
| Link footer (FAQ, privacy, …) | `src/content/navigation.ts` |
| Stili globali + token | `src/styles/global.css`, `src/styles/tokens.css` |
| Config build / sitemap | `astro.config.mjs` |
| Loader navigazione / refresh | `src/components/layout/SiteLoader.astro`, `src/scripts/siteLoader.ts` |
| **Banner titolo pagina** (foto + titolo + sottotitolo) | `src/components/layout/PageHero.astro`, `src/content/pageHeroes.ts` |
| **Header trasparente su banner foto** | `src/scripts/headerScroll.ts` — attivo se in `main` c’è `.page-hero--photo`; pagine `size="compact"` (es. carrello) usano header solido |

Il carrello in header è un’isola React: `src/components/cart/CartNavLink.tsx`, `src/hooks/useCart.ts`.

---

## Pagine pubbliche

### Home

| | |
|---|---|
| **URL** | `/` |
| **File pagina** | `src/pages/index.astro` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Hero, sezioni homepage | `src/pages/index.astro` (hero via `PageHero` size=`home`) |
| Testi sezioni home (servizi, recensioni, …) | `src/content/homePage.ts` |
| Immagini strip home | `src/config/home.media.ts`, asset in `public/images/home/` |
| Foto about / banner / galleria home | `home.media.ts` (`aboutPhoto`, `bannerDivider`), `src/content/homePage.ts` (`homeGallerySection.slides`) |
| Hero banner | `public/images/home/hero-banner.png` (path hardcoded in pagina) |
| Anteprima prodotti in evidenza | anche `src/domain/catalog/products.data.ts`, `src/components/catalog/ProductCard.astro` |
| Testi azienda / CTA | `src/config/site.config.ts` |

---

### Catalogo

| | |
|---|---|
| **URL** | `/catalogo` |
| **URL con filtro** | `/catalogo?categoria=olio` · `legumi` · `condimenti` |
| **File pagina** | `src/pages/catalogo/index.astro` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Layout catalogo, filtri, griglia | `src/pages/catalogo/index.astro`, `CatalogToolbar.astro`, `CatalogCategoryNav.astro`, `CatalogIntro.astro` |
| Design system condiviso | `src/styles/tokens.css`, `buttons.css`, `sections.css`, `SectionHead.astro`, `Notice.astro` |
| Intro testuale catalogo | `src/content/catalogPage.ts`, `CatalogIntro.astro` |
| Etichette categorie | `src/domain/catalog/catalogCategories.ts` |
| Elenco prodotti, prezzi, categorie | `src/domain/catalog/products.data.ts` |
| Schema / tipi prodotto | `src/domain/catalog/catalog.schema.ts` |
| API catalogo (query) | `src/domain/catalog/index.ts` |
| Card in griglia | `src/components/catalog/ProductCard.astro` |
| Formattazione prezzi / disponibilità | `src/domain/catalog/display.ts` |

---

### Scheda prodotto (dinamica)

| | |
|---|---|
| **URL** | `/prodotti/{slug}` |
| **File pagina** | `src/pages/prodotti/[slug].astro` |

**Slug attuali** (da `products.data.ts`):

| Slug | URL |
|------|-----|
| `olio-extravergine-biologico` | `/prodotti/olio-extravergine-biologico` |
| `fava-di-carpino` | `/prodotti/fava-di-carpino` |
| `la-favetta` | `/prodotti/la-favetta` |
| `pate-di-fave` | `/prodotti/pate-di-fave` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Layout scheda, testi struttura | `src/pages/prodotti/[slug].astro`, `src/components/catalog/ProductDetail.astro` |
| Breadcrumb, correlati | `ProductBreadcrumb.astro`, `src/domain/catalog/query.ts` |
| Acquisto / varianti | `src/components/cart/ProductPurchasePanel.tsx` |
| Dati prodotto | `src/domain/catalog/products.data.ts` |
| Immagine statica | `src/domain/catalog/productImage.ts`, `public/images/products/` |
| Viewer 360° | `src/components/catalog/ProductSpinViewer.tsx`, `src/domain/catalog/productSpin.ts`, `public/images/products/{slug}/360/` |
| Aggiungi al carrello | `src/components/cart/AddToCartButton.tsx`, `src/domain/cart/logic.ts` |
| JSON-LD prodotto | `src/domain/seo/structured-data.ts` |
| Card (se coerenza con catalogo) | `src/components/catalog/ProductCard.astro` |

---

### Carrello / riepilogo ordine

| | |
|---|---|
| **URL** | `/carrello` |
| **File pagina** | `src/pages/carrello.astro` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Titolo / intro pagina | `src/pages/carrello.astro` (`PageHero` `size="compact"`) |
| UI carrello, form ordine, pulsanti invio | `src/components/cart/CartPage.tsx`, `src/components/cart/cartPage.css` |
| Stato carrello (client) | `src/hooks/useCart.ts`, `src/domain/cart/storage.ts`, `src/domain/cart/logic.ts`, `src/domain/cart/types.ts` |
| Testo messaggio ordine | `src/domain/order/orderMessage.ts` |
| Link email / WhatsApp | `src/domain/order/mailto.ts`, `src/domain/order/whatsapp.ts` |
| Quantità | `src/components/ui/QuantityStepper.tsx` |
| Disclaimer ordine | `src/config/site.config.ts` (`orderDisclaimer`, email, WhatsApp) |

---

### Chi siamo

| | |
|---|---|
| **URL** | `/chi-siamo` |
| **File pagina** | `src/pages/chi-siamo.astro` |

Copy strutturato in `src/content/chiSiamo.ts`; layout in `src/pages/chi-siamo.astro`.

---

### Contatti

| | |
|---|---|
| **URL** | `/contatti` |
| **File pagina** | `src/pages/contatti.astro` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Copy e layout contatti | `src/pages/contatti.astro` |
| Indirizzo, telefono, email | `src/config/site.config.ts` |

---

### FAQ (ordini e spedizioni)

| | |
|---|---|
| **URL** | `/faq` |
| **File pagina** | `src/pages/faq.astro` |

**File utili da allegare**

| Cosa modifichi | Path |
|----------------|------|
| Struttura pagina | `src/pages/faq.astro`, `src/components/faq/FaqAccordion.tsx` |
| Domande / risposte | `src/content/faq.ts` (campo `id` per anchor `#slug`) |
| JSON-LD FAQ | `src/domain/seo/structured-data.ts` (`buildFaqPageJsonLd`) |

---

### Privacy

| | |
|---|---|
| **URL** | `/privacy` |
| **File pagina** | `src/pages/privacy.astro` |

Testo legali nella pagina stessa.

---

### Cookie

| | |
|---|---|
| **URL** | `/cookie` |
| **File pagina** | `src/pages/cookie.astro` |

Testo legali nella pagina stessa.

---

### Note legali

| | |
|---|---|
| **URL** | `/note-legali` |
| **File pagina** | `src/pages/note-legali.astro` |

Per dati titolare / indirizzo: anche `src/config/site.config.ts`.

---

## Route di sistema (non sono “pagine” HTML)

| URL | File | Note |
|-----|------|------|
| `/robots.txt` | `src/pages/robots.txt.ts` | Generato a build |
| `/sitemap-index.xml` (e sitemap figlie) | integrazione `@astrojs/sitemap` in `astro.config.mjs` | URL da pagine in `src/pages/` |

---

## Schede rapide per tipo di richiesta

| Richiesta | Allega prioritariamente |
|-----------|-------------------------|
| “Cambia il menu / footer” | `site.config.ts`, `navigation.ts`, `Header.astro`, `Footer.astro` |
| “Nuovo prodotto o prezzo” | `products.data.ts`, `catalogCategories.ts` (se categoria nuova), immagini in `public/images/products/` |
| “Solo testi legali” | `privacy.astro`, `cookie.astro`, `note-legali.astro` |
| “Ordine WhatsApp / email” | `CartPage.tsx`, `orderMessage.ts`, `mailto.ts`, `whatsapp.ts`, `site.config.ts` |
| “Look & feel sito” | `tokens.css`, `global.css`, componenti UI in `src/components/ui/` |

---

## Aggiornare questo documento

Quando aggiungi una nuova pagina sotto `src/pages/`, aggiorna la sezione corrispondente (URL esatto + file pagina + dipendenze evidenti).
