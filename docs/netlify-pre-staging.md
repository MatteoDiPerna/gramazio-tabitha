# Pre-staging gratuito su Netlify

Procedura a bullet per **Gramazio Tabitha** su `*.netlify.app` (collaudo / demo). Build Astro → `dist/` ([`netlify.toml`](../netlify.toml)). Senza `SANITY_*`, la build usa `bundle.json` in repo.

---

## A. Chiudere Vercel (prima di Netlify)

- GitHub → **Settings** → **Applications** → **Vercel** → **Configure** → rimuovi repo `gramazio-tabitha` (o disinstalla Vercel).
- Oppure Vercel → progetto **gramazio-tabitha** → **Settings** → **Git** → **Disconnect**.
- Vercel → progetto **gramazio-tabitha** → **Settings** → **Delete Project** → conferma nome.
- (Opzionale) Elimina account Vercel se non ti serve più.
- Dopo delete: `gramazio-tabitha.vercel.app` non è più il sito live (404 / cache temporanea).

---

## B. Prerequisiti

- Repo GitHub **`MatteoDiPerna/gramazio-tabitha`**, branch **`main`** aggiornato (es. commit fix mobile).
- Account Netlify free: [app.netlify.com/signup](https://app.netlify.com/signup).
- (Consigliato) In locale: `npm run verify` verde.

---

## C. Primo deploy Netlify

- [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
- **GitHub** → autorizza → seleziona **`gramazio-tabitha`**.
- Branch: **`main`**.
- Verifica build (da `netlify.toml`):
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
  - **Node:** 22 (`NODE_VERSION` in `netlify.toml`)
- **Deploy site** → attendi build (2–5 min).
- **Site configuration** → **Domain management** → **Options** → **Site name** → es. `gramazio-tabitha` → URL `https://gramazio-tabitha.netlify.app`.

---

## D. `SITE_URL` (obbligatorio per SEO corretto)

- **Site configuration** → **Environment variables** → **Add**:
  - Nome: **`SITE_URL`**
  - Valore: `https://gramazio-tabitha.netlify.app` (stesso URL Netlify, **senza** `/` finale)
  - Scope: **Production** (+ **Deploy previews** se usi PR)
- **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.
- Pre-staging: **non** impostare `SANITY_PROJECT_ID` / `SANITY_API_TOKEN` (sync in skip).

---

## E. Deploy automatici

- **Push su `main`** → nuova build Production su Netlify.
- **Pull request** → Deploy Preview (URL temporaneo).

---

## F. Smoke test (5 min)

- Apri `https://gramazio-tabitha.netlify.app/` (o il tuo site name).
- Mobile: menu **hamburger** (non testo «Menu»).
- Pagine: `/`, `/catalogo`, una scheda prodotto, `/carrello`, `/contatti`.
- `/robots.txt` → riga `Sitemap:` con host **netlify.app**.
- `/sitemap-index.xml` apribile.
- Carrello → prova WhatsApp / email / copia testo.
- Dettaglio: [testing.md](./testing.md).

---

## G. Se l’URL Netlify è diverso da `gramazio-tabitha.netlify.app`

- Aggiorna **`SITE_URL`** su Netlify con l’URL reale → clear cache + redeploy.
- (Opzionale) Allinea default in repo: `.env.example`, `astro.config.mjs`, CI — o chiedi un commit di allineamento.

---

## H. Problemi frequenti

- **Build fallita** → log Netlify; in locale `npm run verify`.
- **Sitemap / canonical con host sbagliato** → `SITE_URL` corretto + redeploy con clear cache.
- **Node** → Site settings → Build → Node **22**.
- **Check Vercel rosso su GitHub** → completa sezione **A** (rimuovi app Vercel).

---

## Riferimenti

- [deployment.md](./deployment.md)
- [vercel-staging.md](./vercel-staging.md) — deprecato (solo storico)
