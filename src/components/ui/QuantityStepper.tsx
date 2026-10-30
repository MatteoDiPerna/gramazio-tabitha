import type { FC } from 'react';
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

export const QuantityStepper: FC<Props> = ({
  value,
  min = 0,
  max = 99,
  onChange,
  disabled = false,
  label = 'Quantità',
  compact = false,
}) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

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
      <span className="qty__value" aria-live="polite">
        {value}
      </span>
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
