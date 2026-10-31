# Backoffice — Sanity Studio (server separato)

Interfaccia amministrativa **non** servita dal sito pubblico Astro. Gira come applicazione Sanity dedicata (locale o hosted su `*.sanity.studio`).

## Setup iniziale

1. Crea un progetto su [sanity.io/manage](https://www.sanity.io/manage).
2. Copia `backoffice/.env.example` in `backoffice/.env` e imposta:
   - `SANITY_STUDIO_PROJECT_ID`
   - `SANITY_STUDIO_DATASET` (`production` o `staging`)
3. Nella root del sito, copia variabili in `.env` per la sync in build:
   - `SANITY_PROJECT_ID` (stesso ID)
   - `SANITY_DATASET`
   - `SANITY_API_TOKEN` (token con lettura; scrittura solo per import)
4. Installa e avvia lo studio:

```bash
cd backoffice
npm install
npm run dev
```

5. Importa i contenuti attuali dal repository (una tantum):

```bash
cd ..
npm run cms:import
```

6. Pubblica le bozze in Sanity, poi sincronizza:

```bash
npm run cms:sync
npm run verify
```

## Deploy studio (produzione)

```bash
cd backoffice
npm run deploy
```

Sanity ospita lo studio su un URL dedicato. Invita gli utenti admin dal pannello Sanity (MFA consigliata).

## Pubblicazione sito

Dopo le modifiche in Sanity:

1. **Pubblica** i documenti in Studio (non basta salvare bozza).
2. Su Vercel, la build esegue `npm run cms:sync` prima di `astro build` (script `prebuild`).
3. Opzionale: webhook Sanity → `VERCEL_DEPLOY_HOOK` (vedi `docs/backoffice-setup.md`).

## Documentazione

Guida completa: [docs/backoffice-setup.md](../docs/backoffice-setup.md)
