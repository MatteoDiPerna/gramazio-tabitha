export type FaqItem = {
  question: string;
  /** HTML consentito (link interni) */
  answerHtml: string;
};

export const faqIntro =
  "Informazioni generali sul funzionamento del sito. I dettagli commerciali definitivi saranno comunicati dall'azienda al momento della conferma dell'ordine.";

export const faqItems: FaqItem[] = [
  {
    question: 'Come posso ordinare?',
    answerHtml:
      "Potrai comporre l'ordine dal catalogo e inviarci una richiesta (telefono o email). Non serve creare un account. Attualmente puoi contattarci dalla pagina <a href=\"/contatti\">Contatti</a>.",
  },
  {
    question: "L'ordine online è immediatamente confermato?",
    answerHtml:
      "No. L'invio è una <strong>richiesta d'ordine</strong>. Ti ricontattiamo per confermare disponibilità, costi di spedizione, modalità di pagamento e tempi.",
  },
  {
    question: 'Quali sono i costi di spedizione?',
    answerHtml:
      "Da definire con l'azienda e pubblicati qui appena disponibili. Non mostriamo importi non confermati.",
  },
  {
    question: 'Quali metodi di pagamento accettate?',
    answerHtml:
      "Da concordare al momento della conferma (es. bonifico, contrassegno — da verificare con l'azienda).",
  },
  {
    question: 'Perché alcuni prezzi non sono visibili?',
    answerHtml:
      'Pubblicheremo listino e formati ufficiali non appena forniti. Fino ad allora compare «Prezzo su richiesta».',
  },
];
