export type FaqItemSeed = {
  id: string;
  question: string;
  answerHtml: string;
};

export const faqIntro =
  "Informazioni generali sul funzionamento del sito. I dettagli commerciali definitivi saranno comunicati dall'azienda al momento della conferma dell'ordine.";

export const faqItems: FaqItemSeed[] = [
  {
    id: 'come-ordinare',
    question: 'Come posso ordinare?',
    answerHtml:
      'Componi il riepilogo dal <a href="/catalogo">catalogo</a> e invia la richiesta dalla pagina <a href="/carrello">Carrello</a> via WhatsApp o email. Non serve creare un account. Per domande generiche usa anche <a href="/contatti">Contatti</a>.',
  },
  {
    id: 'conferma-ordine',
    question: "L'ordine online è immediatamente confermato?",
    answerHtml:
      "No. L'invio è una <strong>richiesta d'ordine</strong>. Ti ricontattiamo per confermare disponibilità, costi di spedizione, modalità di pagamento e tempi.",
  },
  {
    id: 'spedizioni',
    question: 'Quali sono i costi di spedizione?',
    answerHtml:
      'Spediamo in Italia su accordo. Costi e tempi dipendono da peso, destinazione e prodotti ordinati: ' +
      'li confermiamo insieme a disponibilità e importo definitivo. Per urgenze scrivi da <a href="/contatti">Contatti</a> o nel riepilogo ordine.',
  },
  {
    id: 'pagamenti',
    question: 'Quali metodi di pagamento accettate?',
    answerHtml:
      'Di solito bonifico bancario su coordinate che inviamo in conferma ordine. Altre modalità (es. contrassegno) solo se concordate caso per caso. ' +
      'Dettagli nel messaggio d\'ordine e in <a href="/carrello">Carrello</a>.',
  },
  {
    id: 'prezzi-listino',
    question: 'Perché alcuni prezzi non sono visibili?',
    answerHtml:
      'In catalogo vedi prezzi indicativi del listino v1 quando disponibili; l\'importo definitivo è quello confermato per iscritto prima dell\'evasione. ' +
      'Eventuali voci «Prezzo su richiesta» restano da concordare direttamente.',
  },
  {
    id: 'privacy-dati',
    question: 'Come trattate i dati che inserisco?',
    answerHtml:
      'I dati opzionali nel carrello servono solo a comporre il messaggio d\'ordine. Leggi l\'<a href="/privacy">informativa privacy</a> e le <a href="/note-legali">note legali</a>.',
  },
];
