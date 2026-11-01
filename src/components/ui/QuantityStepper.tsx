import { useEffect, useState, type FC } from 'react';
import { CART_QTY_MAX, CART_QTY_MIN } from '@/domain/cart/logic';
import './quantityStepper.css';

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  compact?: boolean;
};

function clampQty(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function parseQtyInput(raw: string, min: number, max: number): number {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return min;
  return clampQty(Number.parseInt(digits, 10), min, max);
}

export const QuantityStepper: FC<Props> = ({
  value,
  min = CART_QTY_MIN,
  max = CART_QTY_MAX,
  onChange,
  disabled = false,
  label = 'Quantità',
  compact = false,
}) => {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) {
      setDraft(String(value));
    }
  }, [value, focused]);

  const applyQty = (next: number) => {
    const safe = clampQty(next, min, max);
    onChange(safe);
    setDraft(String(safe));
  };

  const dec = () => applyQty(value - 1);
  const inc = () => applyQty(value + 1);

  const commitDraft = () => {
    applyQty(parseQtyInput(draft, min, max));
  };

  return (
    <div className={compact ? 'qty qty--compact' : 'qty'} role="group" aria-label={label}>
      <button
        type="button"
        className="qty__btn"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label="Diminuisci quantità"
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="qty__input"
        value={focused ? draft : String(value)}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => {
          setFocused(true);
          setDraft(String(value));
        }}
        onBlur={() => {
          setFocused(false);
          commitDraft();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        disabled={disabled}
      />
      <button
        type="button"
        className="qty__btn"
        onClick={inc}
        disabled={disabled || value >= max}
        aria-label="Aumenta quantità"
      >
        +
      </button>
    </div>
  );
};
