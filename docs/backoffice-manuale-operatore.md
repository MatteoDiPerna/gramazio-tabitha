# Manuale operatore — Gestione sito (bozza)

Interfaccia: **Sanity Studio** (link fornito dopo il deploy, es. `https://nome-progetto.sanity.studio`).

## Accesso

1. Apri il link del backoffice dal bookmark.
2. Accedi con email e password Sanity (attiva l’autenticazione a due fattori se possibile).

## Modificare un prezzo

1. Menu **Catalogo prodotti** → apri il prodotto.
2. Sezione **Formati e prezzi** → campo **Prezzo (centesimi EUR)** (1290 = € 12,90).
3. Clic **Pubblica** (in alto a destra).
4. Attendi il aggiornamento del sito (rebuild automatico se configurato, altrimenti avvisa chi gestisce Vercel).

## Nuovo prodotto

1. **Catalogo prodotti** → **Crea** → compila nome, categoria, descrizioni, immagine (con testo alternativo), varianti.
2. Controlla lo **Slug URL** (non cambiarlo dopo la prima pubblicazione).
3. Attiva **Pubblicato sul sito** e **Ordinabile** se appropriato.
4. **Pubblica**.

## Contatti e WhatsApp

1. **Contatti e impostazioni** → aggiorna telefono, email, WhatsApp, disclaimer carrello.
2. **Pubblica** → rebuild sito.

## FAQ e testi pagine

- **FAQ** — domande/risposte (HTML semplice: link, grassetto).
- **Homepage**, **Chi siamo**, **Intro catalogo**, **Banner pagine** — rispettive voci nel menu.

## Pagine legali

1. **Pagine legali** → Privacy / Cookie / Note legali.
2. Leggi l’**avviso**: le modifiche non sostituiscono un parere legale.
3. Aggiorna il testo → imposta **Data ultima revisione** se utile → **Pubblica**.

## Checklist prima di considerare “online”

- [ ] Ho cliccato **Pubblica** su ogni documento modificato.
- [ ] Ho controllato il sito live (prezzo, contatto, pagina toccata).
- [ ] Su mobile la pagina è leggibile.

## Problemi

- **Sito non aggiornato:** il rebuild può richiedere alcuni minuti; se dopo 15 minuti non cambia, contatta l’assistenza tecnica.
- **Errore in Studio:** annota il messaggio e l’ora; non ripetere publish rapidamente.

Assistenza tecnica: referente sviluppo del progetto.
