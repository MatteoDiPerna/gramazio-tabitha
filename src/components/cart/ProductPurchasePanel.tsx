import { useMemo, useState, type FC } from 'react';
import type { Product } from '@/domain/catalog/catalog.schema';
import {
  formatVariantPrice,
  pricePerLiter,
  productAvailabilityLabel,
} from '@/domain/catalog/display';
import { AddToCartButton } from './AddToCartButton';
import { canAddProductToCart } from '@/domain/cart/logic';
import './productPurchase.css';

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
  const priceLabel = formatVariantPrice(variant);

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
            <dd className="product-purchase__price">
              {priceLabel}
              {perLiter && (
                <span className="product-purchase__per-liter"> · {perLiter}</span>
              )}
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
          <span className="product-purchase-sticky__price">{priceLabel}</span>
          <AddToCartButton
            productId={product.id}
            variantId={variant.id}
            canAdd={canAdd}
            compact
          />
        </div>
      </div>
    </>
  );
};
