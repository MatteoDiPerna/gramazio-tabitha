export type FaqItem = {
  id: string;
  question: string;
  /** HTML consentito (link interni) */
  answerHtml: string;
};

export const faqIntro =
  "Informazioni generali sul funzionamento del sito. I dettagli commerciali definitivi saranno comunicati dall'azienda al momento della conferma dell'ordine.";

export const faqItems: FaqItem[] = [
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
      "Da definire con l'azienda e pubblicati qui appena disponibili. Non mostriamo importi non confermati. Nel frattempo puoi chiedere informazioni via <a href=\"/contatti\">Contatti</a>.",
  },
  {
    id: 'pagamenti',
    question: 'Quali metodi di pagamento accettate?',
    answerHtml:
      "Da concordare al momento della conferma (es. bonifico, contrassegno — da verificare con l'azienda). Vedi anche il riepilogo in <a href=\"/carrello\">Carrello</a>.",
  },
  {
    id: 'prezzi-listino',
    question: 'Perché alcuni prezzi non sono visibili?',
    answerHtml:
      'Pubblicheremo listino e formati ufficiali non appena forniti. Fino ad allora compare «Prezzo su richiesta» in catalogo e carrello.',
  },
  {
    id: 'privacy-dati',
    question: 'Come trattate i dati che inserisco?',
    answerHtml:
      'I dati opzionali nel carrello servono solo a comporre il messaggio d\'ordine. Leggi l\'<a href="/privacy">informativa privacy</a> e le <a href="/note-legali">note legali</a>.',
  },
];
