# Specifica UI/UX — redesign sito Gramazio Tabitha

Documento **operativo per agent AI e sviluppatori**: elenca gap visivi e di esperienza rispetto a un sito **moderno, semplice, agricolo-premium**, con istruzioni di implementazione file-per-file.

**Non sostituisce** [design-tokens.md](./design-tokens.md) (valori attuali), ma definisce **cosa manca** e **come evolvere** il design system e le pagine.

**Ultimo aggiornamento:** 2026-10-30  
**Stato implementazione:** completata in repo (F1–F6) — verificare checklist §16 a mano

---

## 1. Obiettivo e principi

| Principio | Significato pratico |
|-----------|---------------------|
| **Semplicità** | Poche varianti visive; pattern ripetuti (section head, card, toolbar). |
| **Territorio / premium leggero** | Serif per titoli, sans per UI; colori oliva/carta; niente “app admin”. |
| **Mobile first** | Filtri, carrello sticky e touch 44px già presenti — uniformare il resto. |
| **Token-first** | Niente hex sparsi in React; estendere `tokens.css` e riusare classi globali. |
| **Progressive enhancement** | Filtri catalogo: funzionano con link (SEO); miglioramenti JS opzionali. |

---

## 2. Audit sintetico (stato attuale)

### Punti di forza

- Palette coerente (oliva, carta, accenti caldi) in `src/styles/tokens.css`.
- Homepage curata: eyebrow, ornament, sezioni viewport, galleria.
- Componenti base: `Button`, `Card`, `Badge`, `PageHero`, header overlay.
- Accessibilità di base: skip link, focus ring, FAQ accordion con `aria-expanded`.

### Criticità trasversali

| ID | Problema | Dove si vede |
|----|----------|--------------|
| **UX-G1** | **Due linguaggi visivi**: home “editoriale” vs pagine interne “plain form” | Catalogo, FAQ, carrello vs `index.astro` |
| **UX-G2** | **`--content-max: 100%`**: griglia catalogo si allarga troppo su monitor larghi | `tokens.css`, `.product-grid` |
| **UX-G3** | **Stili duplicati / hardcoded** in isole React (`#3d4f37`, `#e8e4dc`, …) | `AddToCartButton.tsx`, `ProductPurchasePanel.tsx`, `FaqAccordion.tsx` |
| **UX-G4** | **Padding asimmetrico** (`--content-inset-start/end`) | `.container` — contenuti leggermente sbilanciati a sinistra |
| **UX-G5** | **Mancano token** ombre, stati focus componenti, superfici “elevated”, radius XL | Solo border 1px ovunque |
| **UX-G6** | **Titoli ridondanti** | Catalogo: hero “Catalogo — Olio” + intro H2 simile |
| **UX-G7** | **PageHero lead** troppo piccolo (uppercase stretto) | `PageHero.astro` — leggibilità bassa sotto il titolo |

---

## 3. Direzione visiva target (breve moodboard testuale)

- **Catalogo**: navigazione per categoria tipo **tab sottolineata** o **segment control** (non pill piene verdi); toolbar sticky opzionale; griglia max ~1200px centrata.
- **Schede prodotto**: più aria, prezzo in evidenza tipografica; sticky mobile già ok — allineare colori ai token.
- **Pagine contenuto** (chi siamo, FAQ): stesso **SectionHead** della home (eyebrow + titolo + ornament opzionale).
- **Feedback**: componente **Notice** (info / warning) al posto di box gialli ad hoc.
- **Micro-interazioni**: transizione 150–200ms su hover card; opzionale `ViewTransition` sul main al cambio categoria.

---

## 4. Foundation — cosa aggiungere in `tokens.css`

Implementare **prima** di rifare i componenti, così gli agent usano solo variabili.

```css
/* Aggiunte consigliate in src/styles/tokens.css */

:root {
  /* Larghezza contenuto leggibile */
  --content-max: 72rem; /* ~1152px — griglia catalogo + testo */

  /* Raggi e profondità */
  --radius-xl: 16px;
  --shadow-sm: 0 1px 2px rgb(44 42 38 / 0.06);
  --shadow-md: 0 4px 16px rgb(44 42 38 / 0.08);
  --shadow-lg: 0 12px 32px rgb(44 42 38 / 0.1);

  /* Superfici */
  --color-surface-raised: #ffffff;
  --color-surface-sunken: #f3f0e8;
  --color-border-strong: #d8d2c6;

  /* Tipografia scale (riferimento) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* Transizioni */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 150ms;
  --duration-normal: 220ms;

  /* Z-index scale */
  --z-sticky: 80;
  --z-header: 100;
  --z-fab: 90;
  --z-overlay: 110;
}
```

**Passi agent:**

1. Modificare `tokens.css` come sopra.
2. Aggiornare `.container` in `global.css`: `max-width: var(--content-max)` (già ereditato se `--content-max` cambia).
3. Valutare **allineamento simmetrico**: impostare `--content-inset-start` e `--content-inset-end` allo **stesso valore** (es. `0.5rem`) oppure azzerare e compensare solo il logo in `Header.astro`.
4. Aggiornare tabella in `docs/design-tokens.md` (1 riga per ogni token nuovo).
5. Eseguire `npm test` e `npm run build`.

---

## 5. Componenti condivisi da creare (priorità alta)

### UI-101 — `SectionHead.astro`

**Problema:** eyebrow / titolo / ornament duplicati solo in home.

**File nuovo:** `src/components/ui/SectionHead.astro`

**Props:**

```ts
interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  centered?: boolean;
  showOrnament?: boolean;
}
```

**Implementazione:**

1. Copiare regole da `index.astro` (`.home-eyebrow`, `.home-display-title`, `.home-ornament`, `.home-section-head--center`) in stili scoped del componente **oppure** estrarre in `src/styles/sections.css` importato da `global.css`.
2. Sostituire in `CatalogIntro.astro`, `chi-siamo.astro` (intro), sezione prodotti home se utile.
3. **Acceptance:** stesso aspetto tipografico della home senza copiare CSS inline nelle pagine.

---

### UI-102 — `Notice.astro`

**Problema:** avviso listino (`CatalogEmptyState` kind `pricing`) e note carrello usano stili one-off.

**File nuovo:** `src/components/ui/Notice.astro`

**Props:** `variant: 'info' | 'warning' | 'success'`, `title?`, slot default per testo.

**Stile:** bordo sinistro 3px (`--color-accent-warm` per warning), sfondo `--color-surface-sunken`, radius `--radius-md`, **no** bordo tratteggiato.

**Implementazione:**

1. Creare componente.
2. In `catalogo/index.astro`, sostituire `<CatalogEmptyState kind="pricing" />` con `<Notice variant="warning">…</Notice>`.
3. Opzionale: riusare in `CartPage` per messaggio sync prodotti rimossi.

---

### UI-103 — `CatalogCategoryNav.astro` (sostituisce filtri attuali)

**Problema (richiesta esplicita):** filtri a **pill/button pieni** con reload percepiti come generici e poco eleganti; competono visivamente con le card prodotto.

**File da sostituire/refactor:** `src/components/catalog/CatalogFilters.astro` → rinominare o delegare a `CatalogCategoryNav.astro`.

#### Design target (consigliato: **tab sottolineate**)

```
[ Tutti ]  Olio    Legumi    Condimenti
──────────────────────────────────────  ← border-bottom 1px
     ═══                                  ← underline 2px solo su active
```

- **Inactive:** testo `--color-text-muted`, hover `--color-primary`, sfondo trasparente.
- **Active:** testo `--color-primary`, `font-weight: 600`, pseudo-elemento `::after` sotto la voce (non riempimento verde).
- **Mobile:** `overflow-x: auto`, `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`, padding inferiore per non tagliare focus ring.
- **Accessibilità:** restano `<a href>` (SEO + no-JS); `aria-current="page"` su active.

**Implementazione passo-passo:**

1. Creare `CatalogCategoryNav.astro` con markup:

```astro
<nav class="catalog-nav" aria-label="Filtra per categoria">
  <ul class="catalog-nav__list">
    <!-- link Tutti + catalogCategories -->
  </ul>
</nav>
```

2. CSS scoped (essenziale):

```css
.catalog-nav {
  margin-top: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}
.catalog-nav__list {
  display: flex;
  gap: var(--space-md);
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  scroll-snap-type: x proximity;
}
.catalog-nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: var(--touch-min);
  padding: var(--space-sm) var(--space-xs);
  text-decoration: none;
  color: var(--color-text-muted);
  font-weight: 500;
  white-space: nowrap;
  scroll-snap-align: start;
  border: none;
  background: none;
}
.catalog-nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: transparent;
  transition: background var(--duration-fast) var(--ease-out);
}
.catalog-nav__link:is(:hover, :focus-visible) {
  color: var(--color-primary);
}
.catalog-nav__link.is-active {
  color: var(--color-primary);
  font-weight: 600;
}
.catalog-nav__link.is-active::after {
  background: var(--color-primary);
}
```

3. In `catalogo/index.astro`, importare `CatalogCategoryNav` al posto di `CatalogFilters`.
4. **Eliminare** o deprecare stili pill in `CatalogFilters.astro` (evitare duplicati).
5. **Opzionale UX+ (fase 2):** conteggio prodotti accanto label — es. `Olio (2)`:
   - In `catalogo/index.astro`, calcolare `Map<categoryId, number>` da `getPublishedProducts()`.
   - Passare prop `counts` a `CatalogCategoryNav`.

#### Alternativa mobile (UI-103b)

Se i tab scroll non bastano: sotto `768px` mostrare `<select>` nativo che fa `location.href = …` on change — stesso URL, zero librerie.

**File:** stesso componente con `@media (max-width: 767px)` che nasconde lista e mostra select (progressive enhancement).

---

### UI-104 — `CatalogToolbar.astro`

**Problema:** filtri isolati; manca contesto (“4 prodotti”) e ordinamento poco visibile.

**Composizione:**

```
┌ CatalogToolbar ────────────────────────────────┐
│  [ CatalogCategoryNav ]     4 prodotti · Ordina ▾ │
└────────────────────────────────────────────────┘
```

**Implementazione:**

1. Creare `src/components/catalog/CatalogToolbar.astro`.
2. Slot o prop per `activeCategory`, `productCount`, `sort` (query `?ordina=nome` già supportato da dominio — estendere UI).
3. `position: sticky; top: var(--header-height); z-index: var(--z-sticky); background: var(--color-bg); padding-block: var(--space-sm);` con `box-shadow: var(--shadow-sm)` quando stuck (opzionale: piccolo script `IntersectionObserver` o classe `.is-stuck` — solo se richiesto).
4. Pagina catalogo: intro **sopra**, toolbar **sotto intro**, griglia sotto.

---

## 6. Catalogo — ulteriori miglioramenti UX/UI

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **CAT-01** | Hero + intro ridondanti | Con categoria attiva: hero **solo** titolo categoria; intro **senza** H2 duplicato (solo paragrafo) | `catalogo/index.astro`, `CatalogIntro.astro` |
| **CAT-02** | Intro non centrata vs chi siamo | Allineare layout: `.catalog-page` flex center o `max-width` + `margin-inline: auto` come chi siamo | `catalogo/index.astro` |
| **CAT-03** | Card prodotto dense | Aumentare padding body; CTA “Dettagli” ghost → secondary outline; hover card `box-shadow: var(--shadow-md)` | `ProductCard.astro`, `Card.astro` |
| **CAT-04** | Immagine prodotto | Hover leggero zoom `transform: scale(1.02)` su `.product-card__media img/frame` (rispettare `prefers-reduced-motion`) | `ProductCard.astro` |
| **CAT-05** | Filtro = full reload | Accettabile per SEO; opzionale **View Transitions** su `<main>` | `BaseLayout.astro` o `catalogo/index.astro` — `transition:animate` Astro 7 |
| **CAT-06** | Empty state categorie | Illustration testuale + CTA primaria (Button) | `CatalogEmptyState.astro` |

---

## 7. Scheda prodotto

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **PDP-01** | Prezzo non domina | `font-size: var(--text-xl)` / display serif per prezzo in `ProductPurchasePanel` | `ProductPurchasePanel.tsx` → preferire classi CSS in file `productPurchase.css` importato |
| **PDP-02** | Stili inline React | Estrarre CSS in `src/components/cart/productPurchase.css` e `addToCart.css`; usare `var(--color-primary)` | `ProductPurchasePanel.tsx`, `AddToCartButton.tsx` |
| **PDP-03** | Breadcrumb piccolo | Aggiungere icona home opzionale; spacing `--space-md` sotto hero | `ProductBreadcrumb.astro` |
| **PDP-04** | Correlati | Titolo sezione con `SectionHead` | `ProductDetail.astro` |

---

## 8. Carrello e checkout leggero

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **CRT-01** | `cartPage.css` usa fallback hex | Sostituire con token | `cartPage.css` |
| **CRT-02** | Doppia barra azioni mobile | Verificare che sticky non duplichi visivamente troppo padding; considerare nascondere `.cart-actions` non-sticky su mobile | `CartPage.tsx`, `cartPage.css` |
| **CRT-03** | Fieldset dati ordine | Legenda più visibile; input `border-radius: var(--radius-md)`; focus ring coerente | `cartPage.css` |
| **CRT-04** | Gerarchia pulsanti | WhatsApp primary (verde token), email secondary | già parziale — uniformare a `Button.astro` varianti via classi condivise `.btn` in global (vedi UI-105) |

---

## 9. Header, footer, navigazione

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **NAV-01** | Menu mobile a tendina piatto | Aggiungere `box-shadow: var(--shadow-lg)` al pannello `.header__nav.is-open` | `Header.astro` |
| **NAV-02** | Link attivi poco distinti | Sottolineatura o dot sotto voce active desktop | `Header.astro` |
| **NAV-03** | Footer monolitico | Separatore superiore ornament SVG (come home); colonna 4 opzionale social placeholder | `Footer.astro` |
| **NAV-04** | FAB WhatsApp testuale | Icona SVG + testo solo su `min-width: md` | `WhatsAppFab.astro` |

---

## 10. PageHero e pagine istituzionali

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **HERO-01** | Lead illeggibile | Portare lead a `--text-sm` / `--text-base`, `letter-spacing: 0.06em`, max 2 righe; ridurre uppercase aggressivo | `PageHero.astro` |
| **HERO-02** | Altezza fissa eccessiva su pagine interne | `min-height: clamp(12rem, 28vh, 18rem)` per `size="page"` (non home) | `PageHero.astro` |
| **HERO-03** | Compact carrello | OK — aggiungere variante border-bottom soft | già `size="compact"` |

---

## 11. FAQ, chi siamo, contatti

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **CNT-01** | FAQ accordion stili React isolati | Spostare CSS in `src/components/faq/faqAccordion.css` con token | `FaqAccordion.tsx` |
| **CNT-02** | Anchor `#id` non espande panel | On mount, leggere `location.hash` e aprire item corrispondente | `FaqAccordion.tsx` — `useEffect` |
| **CNT-03** | Chi siamo | Applicare `SectionHead` per intro e ogni blocco | `chi-siamo.astro` |
| **CNT-04** | Contatti | Card contatto con `Card` + icona inline SVG per tel/email | `contatti.astro` |

---

## 12. Homepage (raffinamento, non rewrite)

| ID | Problema | Soluzione | File |
|----|----------|-----------|------|
| **HOME-01** | CSS enorme in pagina | Estrarre `src/styles/home.css` import in `index.astro` o layout dedicato | `index.astro` |
| **HOME-02** | Recensioni placeholder | Stile più “quote” con border-left accent | `index.astro` / `home.css` |
| **HOME-03** | Sezione prodotti in evidenza | Allineare card al nuovo hover shadow catalogo | `ProductCard.astro` |

---

## 13. UI-105 — Unificare React e Astro su classi `.btn`

**Problema:** bottoni carrello/prodotto non usano `Button.astro`.

**Approccio pragmatico:**

1. Copiare **solo le classi** `.btn`, `.btn--primary`, … da `Button.astro` in `src/styles/buttons.css`.
2. `@import './buttons.css'` in `global.css`.
3. Nei componenti React: `className="btn btn--primary"` invece di stili inline.
4. Rimuovere blocchi `<style>` interni dove possibile.

**Acceptance:** un solo aspetto pulsante su sito intero.

---

## 14. Accessibilità e motion

| ID | Azione | Implementazione |
|----|--------|-----------------|
| **A11Y-01** | Contrasto testo muted | Verificare `#5C574F` su `#FAFAF7` (WCAG AA); se fail, scurire a `#4A4640` in token |
| **A11Y-02** | `prefers-reduced-motion` | In `global.css`: disabilitare zoom card e transizioni lunghe |
| **A11Y-03** | Tab catalogo | Focus visible su link tab (già outline globale) — non rimuovere outline su `.catalog-nav__link` |

---

## 15. Ordine di implementazione consigliato (per agent)

Ogni fase: commit separato, `npm test`, `npm run build`, screenshot catalogo mobile/desktop.

| Fase | Scope | Item ID |
|------|--------|---------|
| **F1 Foundation** | Token, content-max, inset simmetrico, buttons.css | §4, UI-105 |
| **F2 Catalogo (priorità utente)** | Tab nav, toolbar, notice listino, intro/hero | UI-103, UI-104, UI-102, CAT-01–02 |
| **F3 Componenti shared** | SectionHead, Notice | UI-101, UI-102 |
| **F4 Product + cart polish** | CSS estratto React, card hover | PDP-02, CAT-03–04, CRT-01 |
| **F5 Nav + hero + FAQ hash** | Header shadow, hero lead, FAQ deep link | NAV-01, HERO-01, CNT-02 |
| **F6 Home refactor CSS** | home.css extract | HOME-01 |

---

## 16. Checklist accettazione visiva (manuale)

- [x] Catalogo: filtri **tab sottolineate**, niente pill verde piena su active (`CatalogCategoryNav.astro`).
- [x] Catalogo: griglia non supera ~1152px centrata su desktop ultrawide (`--content-max: 72rem`).
- [x] Stessi eyebrow/titolo sezione tra home e catalogo/chi siamo (`SectionHead.astro`, `sections.css`).
- [x] Nessun colore `#3d4f37` hardcoded nei file `.tsx` (CSS estratto + token).
- [x] Mobile: tab categorie scrollabili + `<select>` nativo sotto 768px.
- [ ] Lighthouse UX: tap target 44px su filtri e CTA — **collaudo umano**.
- [x] `prefers-reduced-motion`: zoom card disabilitato in `global.css`.

---

## 17. Riferimenti file (mappa rapida)

| Area | File principali |
|------|-----------------|
| Token | `src/styles/tokens.css`, `src/styles/global.css` |
| Catalogo | `src/pages/catalogo/index.astro`, `src/components/catalog/*` |
| Prodotti | `ProductCard.astro`, `ProductDetail.astro`, `ProductPurchasePanel.tsx` |
| Home | `src/pages/index.astro` (+ futuro `home.css`) |
| Layout | `Header.astro`, `Footer.astro`, `PageHero.astro`, `PageContainer.astro` |
| Design doc legacy | `docs/design-tokens.md` |

---

## 18. Note per agent AI

1. **Non cambiare URL** dei filtri (`/catalogo?categoria=`) senza aggiornare test SEO/canonical.
2. **Non inventare** prezzi, testi legali o foto — solo UI.
3. Preferire **componenti Astro** per navigazione catalogo; JS solo per enhancement (hash FAQ, sticky shadow).
4. Dopo ogni fase, aggiornare **2 righe** in `worklog.md` (sezione qualità/globale) se si chiude un tema UI.
5. Documento di riferimento per richieste utente: citare ID (es. «implementa UI-103 e CAT-01»).
