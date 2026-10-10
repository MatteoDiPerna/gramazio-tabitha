import type { FC } from 'react';
import { useCart } from '../../hooks/useCart';

export const CartNavLink: FC = () => {
  const { itemCount, ready } = useCart();

  const ariaLabel =
    ready && itemCount > 0
      ? `Riepilogo ordine, ${itemCount} ${itemCount === 1 ? 'articolo' : 'articoli'}`
      : 'Riepilogo ordine';

  const badge = ready && itemCount > 0 ? (itemCount > 99 ? '99+' : String(itemCount)) : null;

  return (
    <a className="header__cart" href="/carrello" aria-label={ariaLabel}>
      <span className="header__cart-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width={22}
          height={22}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6h15l-1.5 9h-12L6 6Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M6 6 5 3H2"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="19" r="1.25" fill="currentColor" />
          <circle cx="17.5" cy="19" r="1.25" fill="currentColor" />
        </svg>
      </span>
      {badge && <span className="header__cart-badge">{badge}</span>}
    </a>
  );
};
