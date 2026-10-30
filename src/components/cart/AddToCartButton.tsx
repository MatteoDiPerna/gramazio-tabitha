import { useState, type FC } from 'react';
import { useCart } from '../../hooks/useCart';
import { QuantityStepper } from '../ui/QuantityStepper';
import './addToCart.css';

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
      <button type="button" className="btn btn--primary" onClick={onAdd}>
        Aggiungi all&apos;ordine
      </button>
      {feedback && (
        <p className="add-cart-msg" role="status">
          {feedback}
        </p>
      )}
    </div>
  );
};
