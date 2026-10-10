import { useCallback, useEffect, useState } from 'react';
import { catalog } from '@/domain/catalog/catalog.client';
import {
  addLine,
  cartItemCount,
  createCartLine,
  removeLine,
  setLineQty,
  syncCartWithCatalog,
} from '@/domain/cart/logic';
import { loadCartLines, saveCartLines } from '@/domain/cart/storage';
import type { CartLine } from '@/domain/cart/types';

function commit(next: CartLine[]) {
  const synced = syncCartWithCatalog(next, catalog);
  saveCartLines(synced);
  return synced;
}

export function useCart() {
  const [lines, setLinesState] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = commit(loadCartLines());
    setLinesState(initial);
    setReady(true);

    const onUpdate = () => {
      setLinesState(syncCartWithCatalog(loadCartLines(), catalog));
    };
    window.addEventListener('cart-updated', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('cart-updated', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, []);

  const addProduct = useCallback(
    (productId: string, variantId: string, qty: number) => {
      const product = catalog.find((p) => p.id === productId);
      if (!product) return false;
      const line = createCartLine(product, variantId, qty);
      if (!line) return false;
      setLinesState((prev) => commit(addLine(prev, line)));
      return true;
    },
    [],
  );

  const updateQty = useCallback(
    (productId: string, variantId: string, qty: number) => {
      setLinesState((prev) => commit(setLineQty(prev, productId, variantId, qty)));
    },
    [],
  );

  const remove = useCallback((productId: string, variantId: string) => {
    setLinesState((prev) => commit(removeLine(prev, productId, variantId)));
  }, []);

  const clear = useCallback(() => {
    setLinesState(commit([]));
  }, []);

  return {
    ready,
    lines,
    itemCount: cartItemCount(lines),
    addProduct,
    updateQty,
    remove,
    clear,
  };
}
