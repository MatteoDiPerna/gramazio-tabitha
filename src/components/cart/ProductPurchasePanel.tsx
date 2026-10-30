import { useMemo, useState, type FC } from 'react';
import type { Product } from '@/domain/catalog/catalog.schema';
import {
  formatVariantPrice,
  pricePerLiter,
  productAvailabilityLabel,
} from '@/domain/catalog/display';
import { AddToCartButton } from './AddToCartButton';
import { canAddProductToCart } from '@/domain/cart/logic';

type Props = {
  product: Product;
};

export const ProductPurchasePanel: FC<Props> = ({ product }) => {
  const canAdd = canAddProductToCart(product);
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? '');

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? product.variants[0],
    [product.variants, variantId],
  );

  if (!variant) return null;

  const perLiter = pricePerLiter(variant);
  const multiVariant = product.variants.length > 1;

  return (
    <>
      <div className="product-purchase">
        {multiVariant && (
          <fieldset className="product-purchase__variants">
            <legend>Formato</legend>
            <div className="product-purchase__variant-list" role="radiogroup" aria-label="Formato">
              {product.variants.map((v) => (
                <label key={v.id} className="product-purchase__variant">
                  <input
                    type="radio"
                    name={`variant-${product.id}`}
                    value={v.id}
                    checked={variantId === v.id}
                    onChange={() => setVariantId(v.id)}
                  />
                  <span>
                    {v.label} · {formatVariantPrice(v)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <dl className="product-purchase__facts">
          {!multiVariant && (
            <div>
              <dt>Formato</dt>
              <dd>{variant.label}</dd>
            </div>
          )}
          <div>
            <dt>Prezzo</dt>
            <dd>
              {formatVariantPrice(variant)}
              {perLiter && ` · ${perLiter}`}
            </dd>
          </div>
          <div>
            <dt>Stato</dt>
            <dd>{productAvailabilityLabel(product)}</dd>
          </div>
        </dl>

        <div className="product-purchase__add-desktop">
          <AddToCartButton
            productId={product.id}
            variantId={variant.id}
            canAdd={canAdd}
          />
        </div>
      </div>

      <div className="product-purchase-sticky">
        <div className="product-purchase-sticky__inner">
          <span className="product-purchase-sticky__price">{formatVariantPrice(variant)}</span>
          <AddToCartButton
            productId={product.id}
            variantId={variant.id}
            canAdd={canAdd}
            compact
          />
        </div>
      </div>

      <style>{`
        .product-purchase__variants {
          border: none;
          margin: 0 0 1rem;
          padding: 0;
        }
        .product-purchase__variants legend {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #5c574f;
          margin-bottom: 0.5rem;
        }
        .product-purchase__variant-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .product-purchase__variant {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          min-height: 44px;
        }
        .product-purchase__facts {
          margin: 0 0 0.5rem;
          display: grid;
          gap: 0.75rem;
        }
        .product-purchase__facts dt {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #5c574f;
        }
        .product-purchase__facts dd {
          margin: 0.25rem 0 0;
          font-weight: 600;
        }
        .product-purchase-sticky {
          display: none;
        }
        @media (max-width: 767px) {
          .product-purchase__add-desktop {
            display: none;
          }
          .product-purchase-sticky {
            display: block;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 90;
            padding: 0.75rem var(--layout-inline-padding, 1rem);
            background: #fff;
            border-top: 1px solid #e8e4dc;
            box-shadow: 0 -4px 16px rgb(0 0 0 / 0.06);
          }
          .product-purchase-sticky__inner {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 40rem;
            margin: 0 auto;
          }
          .product-purchase-sticky__price {
            font-weight: 700;
            font-size: 0.9375rem;
            flex-shrink: 0;
          }
          .product-purchase-sticky .add-cart--compact {
            flex: 1;
          }
          .product-detail {
            padding-bottom: 5.5rem;
          }
        }
      `}</style>
    </>
  );
};
