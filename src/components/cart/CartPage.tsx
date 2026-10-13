import { useMemo, useState, type FC } from 'react';
import { siteConfig } from '@/config/site.config';
import {
  cartLineKey,
  computeCartTotals,
  toOrderLines,
} from '@/domain/cart/logic';
import { buildMailtoUrl } from '@/domain/order/mailto';
import { buildOrderMessage } from '@/domain/order/orderMessage';
import { formatEuros } from '@/domain/order/money';
import { buildWhatsAppUrl } from '@/domain/order/whatsapp';
import { useCart } from '@/hooks/useCart';
import { QuantityStepper } from '../ui/QuantityStepper';

export const CartPage: FC = () => {
  const { ready, lines, updateQty, remove } = useCart();
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

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

  const onCopy = async () => {
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
        <a href="/catalogo" className="cart-link">
          Sfoglia il catalogo
        </a>
      </div>
    );
  }

  return (
    <div className="cart-page">
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

      <div className="cart-summary">
        <p>
          <strong>Totale indicativo prodotti:</strong>{' '}
          {totals.totalCents != null
            ? formatEuros(totals.totalCents)
            : 'Da confermare'}
        </p>
        {totals.hasUnknownPrices && (
          <p className="cart-hint">
            Alcune voci non hanno prezzo in listino: l&apos;importo finale sarà
            concordato con l&apos;azienda.
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
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
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

      <p className="cart-disclaimer">
        {siteConfig.orderDisclaimer}{' '}
        <a href="/privacy">Informativa privacy</a>.
      </p>

      <div className="cart-actions">
        {waUrl ? (
          <a className="cart-btn cart-btn--wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            Ordina su WhatsApp
          </a>
        ) : (
          <p className="cart-hint">
            WhatsApp non configurato: usa email, copia testo o{' '}
            <a href={`tel:${siteConfig.phoneTel}`}>telefono</a>.
          </p>
        )}
        <a className="cart-btn cart-btn--mail" href={mailUrl}>
          Ordina via email
        </a>
        <button type="button" className="cart-btn cart-btn--ghost" onClick={onCopy}>
          Copia testo ordine
        </button>
      </div>

      {waUrl && (
        <p className="cart-wa-note">
          Si aprirà WhatsApp con un messaggio precompilato: <strong>devi inviarlo</strong>{' '}
          per completare la richiesta. L&apos;ordine non è confermato automaticamente.
        </p>
      )}

      {copyStatus && (
        <p className="cart-hint" role="status">
          {copyStatus}
        </p>
      )}

      <details className="cart-preview">
        <summary>Anteprima messaggio</summary>
        <pre>{orderMessage}</pre>
      </details>

      <style>{`
        .cart-page { display: flex; flex-direction: column; gap: 1.25rem; }
        .cart-lines { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .cart-line {
          display: grid;
          gap: 0.75rem;
          padding: 1rem;
          background: #fff;
          border: 1px solid #e8e4dc;
          border-radius: 12px;
        }
        @media (min-width: 640px) {
          .cart-line {
            grid-template-columns: 1fr auto auto auto;
            align-items: center;
          }
        }
        .cart-line__info { display: flex; flex-direction: column; gap: 0.25rem; }
        .cart-line__price, .cart-line__sub { font-size: 0.9375rem; color: #5c574f; }
        .cart-line__remove {
          background: none;
          border: none;
          color: #9c6b4e;
          text-decoration: underline;
          cursor: pointer;
          min-height: 44px;
        }
        .cart-summary { padding: 1rem; background: #fafaf7; border-radius: 8px; }
        .cart-hint { font-size: 0.875rem; color: #5c574f; margin: 0.25rem 0 0; }
        .cart-fields {
          border: 1px solid #e8e4dc;
          border-radius: 8px;
          padding: 1rem;
          display: grid; gap: 0.75rem;
        }
        .cart-fields legend { font-weight: 600; padding: 0 0.25rem; }
        .cart-fields label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; }
        .cart-fields input, .cart-fields textarea {
          font: inherit; padding: 0.5rem; border: 1px solid #e8e4dc; border-radius: 4px;
        }
        .cart-disclaimer { font-size: 0.8125rem; color: #5c574f; }
        .cart-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .cart-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-height: 44px; padding: 0 1.25rem; font-weight: 600; text-decoration: none;
          border-radius: 8px; border: 2px solid transparent; cursor: pointer; font: inherit;
        }
        .cart-btn--wa { background: #25d366; color: #fff; }
        .cart-btn--mail { background: #3d4f37; color: #fff; }
        .cart-btn--ghost { background: #fff; color: #3d4f37; border-color: #3d4f37; }
        .cart-wa-note { font-size: 0.875rem; background: #fff8e6; padding: 0.75rem; border-radius: 8px; }
        .cart-preview pre {
          white-space: pre-wrap; font-size: 0.8125rem; background: #fff; padding: 1rem;
          border: 1px solid #e8e4dc; border-radius: 8px;
        }
        .cart-empty, .cart-loading { padding: 2rem 0; }
        .cart-link { font-weight: 600; }
      `}</style>
    </div>
  );
};
