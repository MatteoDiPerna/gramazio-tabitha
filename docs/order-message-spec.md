# Specifiche messaggio ordine (F02.06)

Implementazione: `src/domain/order/orderMessage.ts`, `whatsapp.ts`, `mailto.ts`.

## WhatsApp

- Base URL: `https://wa.me/{whatsappE164}?text={encodeURIComponent(body)}`
- `whatsappE164`: solo cifre, prefisso paese (es. `393334125391`) — **placeholder** in config fino a conferma F08.01
- Newline nel body: `\n` prima di encode
- Caratteri UTF-8 (accenti italiani) via `encodeURIComponent`

### Template body

```
Richiesta ordine — Azienda Agricola Gramazio Tabitha

Prodotti:
{for each line}
- {name} ({format}) × {qty} — {unitPrice} cad. — subtot. {lineTotal}

Totale indicativo prodotti: {total}
Spedizione e pagamento: da concordare con l'azienda.

Note: {notes or "—"}
Nome: {name or "—"}
Telefono: {phone or "—"}
Consegna: {address or "—"}

Inviato dal sito web. La richiesta sarà confermata secondo le condizioni commerciali dell'azienda.
```

## Email (`mailto:`)

| Campo | Valore |
|-------|--------|
| To | `ordersEmail` da site config (default placeholder uguale a email pubblica verificata) |
| Subject | `Richiesta ordine — Gramazio Tabitha` |
| Body | Stesso contenuto testuale del messaggio WhatsApp |

## Limiti

- Lunghezza URL `mailto:`: troncare note o rimandare a WhatsApp se supera soglia (~1500–2000 char) — logica in F09
- Non dichiarare ordine confermato in UI

## Test automatici (F08/F09)

- Totale coerente con carrello
- Encoding `àèéìòù`, simbolo €
- Carrello vuoto → pulsanti disabilitati + messaggio
