import type { FC } from 'react';
import { useCart } from '../../hooks/useCart';

export const CartNavLink: FC = () => {
  const { itemCount, ready } = useCart();
  const label =
    ready && itemCount > 0 ? `Ordine (${itemCount})` : 'Ordine';

  return (
    <a className="header__cart" href="/carrello" aria-label={`Riepilogo ordine, ${itemCount} articoli`}>
      {label}
      <style>{`
        .header__cart {
          display: flex;
          align-items: center;
          min-height: 44px;
          padding: 0 0.5rem;
          text-decoration: none;
          font-weight: 600;
          color: #3d4f37;
          border-radius: 4px;
        }
        .header__cart:hover {
          color: #2f3d2a;
          background: #fafaf7;
        }
      `}</style>
    </a>
  );
};
