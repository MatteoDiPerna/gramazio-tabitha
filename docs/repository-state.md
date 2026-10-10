# Stato repository (F00)

Ultimo aggiornamento: 2026-03-21

## Remote e branch

| Elemento | Valore |
|----------|--------|
| Remote `origin` (fetch/push) | `https://github.com/MatteoDiPerna/gramazio-tabitha.git` |
| Branch corrente | `main` |
| Tracking | `origin/main` (allineato al momento del check) |
| Ultimo commit | `484c385` — Initial commit |

## Policy branch (da confermare su GitHub)

- **main:** branch di produzione; merge via PR consigliato.
- **Protezione branch:** non verificabile da CLI locale — controllare in GitHub → Settings → Branches se `main` richiede PR/review.
- **Push:** eseguire solo dopo test locali (`build`, `test`) e aggiornamento documentazione pertinente.

## Verifica permessi push

Test manuale consigliato:

```bash
git push --dry-run origin main
```

Esito atteso: nessun errore di autenticazione (credenziali/token configurati).

## Inventario cartelle (pre-setup Astro)

```
gramazio-tabitha/
  README.md
  docs/
    strctural_analysis.md
    prompt.txt
    decisions/
    repository-state.md
    implementation-checklist.md
```
