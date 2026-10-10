# Testing e collaudo manuale

## Automatici

```bash
npm test
npm run build
```

## F00 — Collaudo manuale repository

| ID | Scenario | Prerequisiti | Procedura | Risultato atteso | Esito | Note |
|----|----------|--------------|-----------|------------------|-------|------|
| F00-M01 | Remote configurato | Git installato | Aprire `docs/repository-state.md` e confrontare con `git remote -v` | URL `github.com/MatteoDiPerna/gramazio-tabitha.git` | Da eseguire | |
| F00-M02 | Dry-run push | Credenziali GitHub | `git push --dry-run origin main` | Nessun errore auth | Da eseguire | |
| F00-M03 | ADR stack | — | Leggere `docs/decisions/001-static-stack.md` | Coerente con strctural_analysis | Da eseguire | |

## F03 — Collaudo setup locale

| ID | Scenario | Procedura | Risultato atteso | Esito |
|----|----------|-----------|------------------|-------|
| F03-M01 | Dev server | `npm run dev`, aprire localhost | Pagina "Sito in costruzione" in italiano | Da eseguire |
| F03-M02 | Build | `npm run build` | Exit code 0, cartella `dist/` | Da eseguire |
| F03-M03 | Test | `npm test` | Tutti i test passano | Da eseguire |
