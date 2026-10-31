# Procedura: deploy staging su Vercel (gratuito)

Guida passo-passo per pubblicare il sito **Gramazio Tabitha** su un URL `*.vercel.app` per **anteprima e collaudo**, senza dominio custom e senza trattarlo come go-live pubblico ufficiale.

**Cosa ottieni:** HTTPS, build identica alla CI, sitemap/robots con host corretto (se `SITE_URL` è impostato), flusso ordine WhatsApp/email testabile.

**Cosa non è obbligatorio in staging:** listino definitivo, testi legali approvati, Sanity configurato (il sito usa `src/generated/cms/bundle.json` committato).

---

## 0. Prima di iniziare

| Requisito | Dettaglio |
|-----------|-----------|
| Repository su **GitHub** | Il codice del progetto pushato (branch `main` aggiornato) |
| Account **Vercel** | [vercel.com/signup](https://vercel.com/signup) (Hobby / gratuito va bene) |
| Node in CI/Vercel | Progetto richiede **Node ≥ 22** (`package.json` → Vercel usa 22.x se non cambi impostazioni) |
| Build locale (consigliato) | Dalla root: `npm run verify` verde prima del primo deploy |

---

## 1. Collegare GitHub a Vercel

1. Accedi a [vercel.com/dashboard](https://vercel.com/dashboard).
2. **Add New…** → **Project**.
3. **Import** il repository `gramazio-tabitha` (autorizza GitHub se richiesto).
4. Nella schermata **Configure Project** controlla:

   | Campo | Valore atteso |
   |-------|----------------|
   | Framework Preset | **Astro** (auto-rilevato) |
   | Root Directory | `.` (root repo, non `backoffice/`) |
   | Build Command | `npm run build` (o lascia default se legge `vercel.json`) |
   | Output Directory | `dist` |
   | Install Command | `npm ci` o `npm install` (default ok) |

5. **Non** cliccare ancora Deploy se vuoi impostare subito `SITE_URL` — passo 2.

---

## 2. Variabili d'ambiente (importante)

### 2.1 Prima deploy: `SITE_URL` provvisorio

Alla **prima** installazione non conosci ancora l’URL finale Vercel. Puoi:

- **Opzione A (rapida):** imposta subito  
  `SITE_URL` = `https://gramazio-tabitha.vercel.app`  
  (se il nome progetto su Vercel sarà `gramazio-tabitha`; altrimenti usa il nome che scegli tu, coerente con l’URL che Vercel assegnerà).

- **Opzione B (precisa):** fai il **primo deploy** senza `SITE_URL`, copia l’URL assegnato (es. `https://gramazio-tabitha-xxxxx.vercel.app`), poi aggiungi la variabile e **Redeploy**.

In **Environment Variables** aggiungi:

| Nome | Valore | Ambienti consigliati per staging |
|------|--------|----------------------------------|
| `SITE_URL` | URL **senza** slash finale, es. `https://gramazio-tabitha.vercel.app` | Production **e** Preview |

Perché serve: canonical, sitemap, Open Graph e `robots.txt` usano l’host da `SITE_URL` / `import.meta.env.SITE`.

### 2.2 Backoffice Sanity (opzionale in staging)

Solo se vuoi che **ogni build su Vercel** scarichi i contenuti da Sanity (`prebuild` → `cms:sync`):

| Nome | Valore |
|------|--------|
| `SANITY_PROJECT_ID` | Stesso ID di `SANITY_STUDIO_PROJECT_ID` |
| `SANITY_DATASET` | es. `production` |
| `SANITY_API_TOKEN` | Token **Viewer** (lettura) |

Se **non** imposti queste variabili, `cms:sync` esce subito (skip) e la build usa il `bundle.json` già nel repository — **comportamento adatto allo staging iniziale**.

Non committare mai token nel codice; solo pannello Vercel.

---

## 3. Primo deploy

1. Clic **Deploy**.
2. Attendi la build (tipicamente 2–5 minuti). Log utili:
   - `cms:sync — Sanity non configurato: skip` → ok senza CMS
   - `astro build` completato → `dist/`
3. Alla fine Vercel mostra **Visit** → apri l’URL (es. `https://…vercel.app`).

### 3.1 Allinea `SITE_URL` (se non l’hai fatto prima)

1. Vercel → Project → **Settings** → **Environment Variables**.
2. Imposta o correggi `SITE_URL` = URL **Production** esatto (quello che vedi in Visit, senza `/` finale).
3. **Deployments** → ultimo deploy → menu **⋯** → **Redeploy** (usa stesso commit).

---

## 4. Verifica post-deploy (checklist staging)

Esegui sul URL Vercel (non solo in locale).

### Pagine

- [ ] `/` — homepage
- [ ] `/catalogo` e `/catalogo?categoria=olio`
- [ ] `/prodotti/olio-extravergine-biologico` (altra scheda a piacere)
- [ ] `/carrello`, `/chi-siamo`, `/faq`, `/contatti`
- [ ] `/privacy`, `/cookie`, `/note-legali`
- [ ] URL inventato → `/404` custom

### Ordine (test reale consigliato)

- [ ] Aggiungi prodotto al carrello → **WhatsApp** apre messaggio (numero da bundle/CMS)
- [ ] **Email** → client mail con testo precompilato
- [ ] **Copia testo** negli appunti

### SEO tecnico

- [ ] `https://TUO-URL.vercel.app/robots.txt` — contiene `Sitemap:` con **lo stesso host**
- [ ] `https://TUO-URL.vercel.app/sitemap-index.xml` — apribile, link alle pagine
- [ ] View source di una scheda prodotto: presenza JSON-LD

### Build / CI

- [ ] Su GitHub, workflow **CI** verde sull’ultimo commit su `main`
- [ ] In Vercel, log build senza errori (warning ok)

Dettaglio test manuali: [testing.md](./testing.md).

---

## 5. Deploy successivi (ogni push)

Con il progetto collegato a GitHub:

| Evento | Comportamento Vercel |
|--------|----------------------|
| Push su `main` | Nuovo deploy **Production** (URL principale del progetto) |
| Pull request | Deploy **Preview** (URL temporaneo per branch) |

Dopo ogni merge su `main`, attendi deploy verde e ripeti un campione della checklist (§4).

---

## 6. Staging vs go-live pubblico

| Aspetto | Staging (questa guida) | Go-live pubblico (dopo) |
|---------|------------------------|---------------------------|
| URL | `*.vercel.app` | Dominio azienda (DNS) |
| `SITE_URL` | URL Vercel | URL dominio definitivo |
| Contenuti | Listino indicativo, legali bozza, recensioni placeholder | Dati confermati + revisione legale |
| Comunicazione | Link solo a cliente/collaboratori | Google, social, stampa |
| Sanity | Opzionale | Consigliato + webhook rebuild |

---

## 7. Problemi frequenti

| Problema | Soluzione |
|----------|-----------|
| Build fallisce su Vercel | Apri log → cerca errore Zod/test; riproduci con `npm run verify` in locale |
| Sitemap con host sbagliato | Correggi `SITE_URL` → Redeploy |
| Sito vecchio dopo edit Sanity | Su Vercel servono `SANITY_*` + redeploy; in locale `cms:sync` + rebuild |
| Pagina bianca / 404 su route | Verifica Output Directory = `dist`, framework Astro |
| Node version error | Vercel → Settings → General → Node.js Version → **22.x** |

---

## 8. Comandi utili in locale (prima del push)

```powershell
cd d:\progetti\gramazio-tabitha
npm ci
npm run verify
```

Simula build come Vercel (senza Sanity):

```powershell
$env:SITE_URL="https://gramazio-tabitha.vercel.app"
npm run build
npm run preview
```

---

## 9. Riferimenti nel repo

- [deployment.md](./deployment.md) — variabili e note generali
- [release-go-live.md](./release-go-live.md) — checklist go-live completo
- [backoffice-setup.md](./backoffice-setup.md) — CMS separato (non hosted su Vercel)
- `vercel.json` — output `dist`, header sicurezza base

---

**Registro staging (opzionale):** annota in [deploy-log.md](./deploy-log.md) data, URL Vercel e esito smoke test.
