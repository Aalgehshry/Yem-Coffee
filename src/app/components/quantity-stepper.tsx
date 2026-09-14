import { Minus, Plus } from 'lucide-react';
import { MAX_QUANTITY_PER_ITEM } from '../lib/constants';
import { cn } from './ui/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (quantity: number) => void;
  /** Label fragment for screen readers, e.g. the product name. */
  label: string;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * −/+ quantity control.
 *
 * The product page and the cart each had their own copy of this, built from
 * ghost buttons and a `<span>`. Two problems that fixes: the controls had no
 * accessible names ("button" / "button" to a screen reader), and the value was
 * not announced when it changed. Here the buttons are labelled and the value
 * is an `aria-live` region.
 */
export function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = MAX_QUANTITY_PER_ITEM,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const valueSize = size === 'sm' ? 'w-9 text-sm' : 'w-12 text-base';

  const step = (delta: number) => {
    onChange(Math.min(max, Math.max(min, value + delta)));
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-card',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className={cn(
          buttonSize,
          'inline-flex items-center justify-center rounded-full text-foreground',
          'transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn('tabular-price text-center font-medium', valueSize)}
      >
        <span className="sr-only">{label} quantity: </span>
        {value}
      </span>

      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className={cn(
          buttonSize,
          'inline-flex items-center justify-center rounded-full text-foreground',
          'transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
