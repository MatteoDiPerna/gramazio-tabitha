import { useEffect, useId, useRef, type FC } from 'react';
import { createPortal } from 'react-dom';
import './orderMessagePreviewModal.css';

type Props = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export const OrderMessagePreviewModal: FC<Props> = ({ open, message, onClose }) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!open) return;
    const pre = messageRef.current;
    if (pre) {
      pre.style.height = 'auto';
      const maxPx = Math.min(window.innerHeight * 0.55, 480);
      const natural = pre.scrollHeight;
      pre.style.height = `${Math.min(Math.max(natural, 128), maxPx)}px`;
    }
  }, [open, message]);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="cart-modal-root">
      <button
        type="button"
        className="cart-modal-backdrop"
        aria-label="Chiudi anteprima"
        onClick={onClose}
      />
      <div
        className="cart-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="cart-modal__header">
          <h2 id={titleId} className="cart-modal__title">
            Anteprima messaggio
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="cart-modal__close"
            aria-label="Chiudi"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="cart-modal__content">
          <p className="cart-modal__lead">
            Testo che verrà inviato via WhatsApp o email. Puoi modificarlo nei campi sopra prima
            dell&apos;invio.
          </p>
          <pre ref={messageRef} className="cart-modal__body">
            {message}
          </pre>
        </div>
        <div className="cart-modal__footer">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
