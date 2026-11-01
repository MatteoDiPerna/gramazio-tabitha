import { useEffect, useMemo, useState, type FC, type MouseEvent } from 'react';
import { siteClientConfig as siteConfig } from '@/config/site.client';
import {
  clearCartFormDraft,
  loadCartFormDraft,
  saveCartFormDraft,
} from '@/domain/cart/cartFormStorage';
import {
  cartLineKey,
  computeCartTotals,
  toOrderLines,
} from '@/domain/cart/logic';
import { cartContactValidationError } from '@/domain/cart/validation';
import { buildMailtoUrl } from '@/domain/order/mailto';
import { buildOrderMessage } from '@/domain/order/orderMessage';
import { formatEuros } from '@/domain/order/money';
import { buildWhatsAppUrl } from '@/domain/order/whatsapp';
import { useCart } from '@/hooks/useCart';
import { QuantityStepper } from '../ui/QuantityStepper';
import { OrderMessagePreviewModal } from './OrderMessagePreviewModal';
import './cartPage.css';

export const CartPage: FC = () => {
  const { ready, lines, updateQty, remove, clear, catalogSyncRemoved } = useCart();
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formHydrated, setFormHydrated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const draft = loadCartFormDraft();
    setNotes(draft.notes);
    setName(draft.name);
    setPhone(draft.phone);
    setDeliveryAddress(draft.deliveryAddress);
    setFormHydrated(true);
  }, []);

  useEffect(() => {
    if (!formHydrated) return;
    saveCartFormDraft({ notes, name, phone, deliveryAddress });
  }, [formHydrated, notes, name, phone, deliveryAddress]);

  const totals = useMemo(() => computeCartTotals(lines), [lines]);

  const orderMessage = useMemo(
    () =>
      buildOrderMessage(toOrderLines(lines), {
        notes,
        name,
        phone,
        deliveryAddress,
      }),
    [lines, notes, name, phone, deliveryAddress],
  );

  const waUrl = buildWhatsAppUrl(orderMessage);
  const mailUrl = buildMailtoUrl(
    `Richiesta ordine — ${siteConfig.shortName}`,
    orderMessage,
  );

  const validateContact = (): boolean => {
    const err = cartContactValidationError(phone);
    setFieldError(err);
    return !err;
  };

  const guardExternalOrder = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!validateContact()) {
      event.preventDefault();
    }
  };

  const onClearCart = () => {
    if (!window.confirm('Vuoi svuotare il carrello?')) return;
    clear();
    clearCartFormDraft();
    setCopyStatus(null);
    setFieldError(null);
  };

  const onCopy = async () => {
    if (!validateContact()) return;
    const copy = async () => {
      await navigator.clipboard.writeText(orderMessage);
      setCopyStatus('Testo ordine copiato negli appunti.');
    };
    try {
      if (window.siteLoader?.run) {
        await window.siteLoader.run(copy);
      } else {
        await copy();
      }
    } catch {
      setCopyStatus('Copia non riuscita: seleziona e copia manualmente il testo sotto.');
    }
  };

  if (!ready) {
    return <p className="cart-loading">Caricamento ordine…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="cart-empty">
        <p>Il riepilogo ordine è vuoto.</p>
        <div className="cart-empty__actions">
          <a href="/catalogo" className="cart-link">
            Sfoglia il catalogo
          </a>
          <a href="/contatti" className="cart-link">
            Contattaci
          </a>
        </div>
      </div>
    );
  }

  const actionButtons = (
    <>
      {waUrl ? (
        <a
          className="btn btn--whatsapp"
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={guardExternalOrder}
        >
          Ordina su WhatsApp
        </a>
      ) : (
        <p className="cart-hint">
          WhatsApp non configurato: usa email, copia testo o{' '}
          <a href={`tel:${siteConfig.phoneTel}`}>telefono</a>.
        </p>
      )}
      <a className="btn btn--secondary" href={mailUrl} onClick={guardExternalOrder}>
        Ordina via email
      </a>
      <button type="button" className="btn btn--ghost" onClick={onCopy}>
        Copia testo ordine
      </button>
    </>
  );

  return (
    <div className="cart-page cart-page--has-lines">
      {catalogSyncRemoved && (
        <p className="cart-hint" role="status">
          Alcuni prodotti non sono più disponibili nel catalogo e sono stati rimossi dal
          riepilogo.
        </p>
      )}

      <ul className="cart-lines">
        {lines.map((line) => {
          const key = cartLineKey(line.productId, line.variantId);
          const sub = totals.lineSubtotals.get(key);
          return (
            <li key={key} className="cart-line">
              <div className="cart-line__info">
                <strong>{line.name}</strong>
                <span>{line.format}</span>
                <span className="cart-line__price">
                  {line.unitPriceCents == null
                    ? 'Prezzo su richiesta'
                    : `${formatEuros(line.unitPriceCents)} cad.`}
                </span>
              </div>
              <QuantityStepper
                value={line.qty}
                min={1}
                onChange={(q) => updateQty(line.productId, line.variantId, q)}
              />
              <div className="cart-line__sub">
                {sub == null ? 'Subtot. da confermare' : formatEuros(sub)}
              </div>
              <button
                type="button"
                className="cart-line__remove"
                onClick={() => remove(line.productId, line.variantId)}
                aria-label={`Rimuovi ${line.name}`}
              >
                Rimuovi
              </button>
            </li>
          );
        })}
      </ul>

      <div className="cart-toolbar">
        <button type="button" className="btn btn--ghost cart-toolbar__clear" onClick={onClearCart}>
          Svuota carrello
        </button>
      </div>

      <div className="cart-summary">
        <p>
          <strong>Totale indicativo prodotti:</strong>{' '}
          {totals.totalCents != null
            ? formatEuros(totals.totalCents)
            : 'Da confermare'}
        </p>
        {totals.hasUnknownPrices && (
          <p className="cart-hint">
            Alcune voci non hanno prezzo in listino: l&apos;importo finale sarà concordato con
            l&apos;azienda.
          </p>
        )}
        <p className="cart-hint">Spedizione e pagamento: da concordare.</p>
      </div>

      <fieldset className="cart-fields">
        <legend>Dati utili per la consegna (opzionali)</legend>
        <label>
          Note
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </label>
        <label>
          Nome
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label>
          Telefono
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (fieldError) setFieldError(cartContactValidationError(e.target.value));
            }}
            autoComplete="tel"
            aria-invalid={fieldError ? true : undefined}
          />
        </label>
        <label>
          Indirizzo consegna
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows={2}
            autoComplete="street-address"
          />
        </label>
      </fieldset>

      {fieldError && (
        <p className="cart-hint cart-hint--error" role="alert">
          {fieldError}
        </p>
      )}

      <p className="cart-disclaimer">
        {siteConfig.orderDisclaimer}{' '}
        <a href="/privacy">Informativa privacy</a>.
      </p>

      <div className="cart-actions">{actionButtons}</div>

      <div className="cart-actions-sticky" aria-label="Azioni ordine">
        {actionButtons}
      </div>

      {waUrl && (
        <p className="cart-wa-note">
          Si aprirà WhatsApp con un messaggio precompilato: <strong>devi inviarlo</strong> per
          completare la richiesta. L&apos;ordine non è confermato automaticamente.
        </p>
      )}

      {copyStatus && (
        <p className="cart-hint" role="status">
          {copyStatus}
        </p>
      )}

      <div className="cart-preview-actions">
        <button
          type="button"
          className="btn btn--secondary"
          onClick={() => setPreviewOpen(true)}
        >
          Anteprima messaggio
        </button>
      </div>

      <OrderMessagePreviewModal
        open={previewOpen}
        message={orderMessage}
        onClose={() => setPreviewOpen(false)}
      />
    </div>
  );
};
