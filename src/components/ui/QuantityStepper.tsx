import type { FC } from 'react';

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
};

export const QuantityStepper: FC<Props> = ({
  value,
  min = 0,
  max = 99,
  onChange,
  disabled = false,
  label = 'Quantità',
}) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qty" role="group" aria-label={label}>
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
      <style>{`
        .qty {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .qty__btn {
          min-width: 44px;
          min-height: 44px;
          font-size: 1.25rem;
          font-weight: 600;
          border: 1px solid var(--color-border, #e8e4dc);
          border-radius: 8px;
          background: #fff;
          color: #3d4f37;
          cursor: pointer;
        }
        .qty__btn:hover:not(:disabled) {
          border-color: #3d4f37;
        }
        .qty__btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .qty__btn:focus-visible {
          outline: 2px solid #3d4f37;
          outline-offset: 2px;
        }
        .qty__value {
          min-width: 2rem;
          text-align: center;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};
