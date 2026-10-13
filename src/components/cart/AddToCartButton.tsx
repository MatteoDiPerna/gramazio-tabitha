import { useState, type FC } from 'react';
import { useCart } from '../../hooks/useCart';
import { QuantityStepper } from '../ui/QuantityStepper';

export type AddToCartPayload = {
  productId: string;
  variantId: string;
  canAdd: boolean;
};

type Props = AddToCartPayload & {
  compact?: boolean;
};

export const AddToCartButton: FC<Props> = ({
  productId,
  variantId,
  canAdd,
  compact = false,
}) => {
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const onAdd = () => {
    if (!canAdd) return;
    const ok = addProduct(productId, variantId, qty);
    setFeedback(ok ? 'Aggiunto al riepilogo ordine' : 'Non è stato possibile aggiungere');
    if (ok) setQty(1);
  };

  if (!canAdd) {
    return (
      <p className="add-cart-msg add-cart-msg--muted">
        Prodotto non ordinabile al momento.
      </p>
    );
  }

  return (
    <div className={compact ? 'add-cart add-cart--compact' : 'add-cart'}>
      <QuantityStepper value={qty} min={1} onChange={setQty} compact={compact} />
      <button type="button" className="add-cart__btn" onClick={onAdd}>
        Aggiungi all&apos;ordine
      </button>
      {feedback && (
        <p className="add-cart-msg" role="status">
          {feedback}
        </p>
      )}
      <style>{`
        .add-cart {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .add-cart--compact {
          flex-direction: column;
          align-items: stretch;
          gap: 0.5rem;
          margin-top: 0;
        }
        .add-cart--compact .add-cart__btn {
          min-height: 2.5rem;
          padding: 0 0.75rem;
          font-size: 0.9375rem;
        }
        .add-cart__btn {
          min-height: 44px;
          padding: 0 1.25rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: #3d4f37;
          color: #fff;
          cursor: pointer;
        }
        .add-cart__btn:hover {
          background: #2f3d2a;
        }
        .add-cart__btn:focus-visible {
          outline: 2px solid #3d4f37;
          outline-offset: 2px;
        }
        .add-cart-msg {
          width: 100%;
          margin: 0;
          font-size: 0.875rem;
          color: #3d4f37;
        }
        .add-cart-msg--muted {
          color: #5c574f;
        }
      `}</style>
    </div>
  );
};
