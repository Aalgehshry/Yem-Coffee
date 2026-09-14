import type { RoastLevel } from '../types/product';
import { cn } from './ui/utils';

/**
 * Roast level as a colour-coded chip.
 *
 * Roast was rendered as plain grey text ("Medium Roast") everywhere, which
 * made it impossible to scan a grid for a light roast. The colours run light →
 * dark to match the thing they describe, and the bean glyphs mean the badge is
 * still readable without relying on colour alone.
 *
 * Every pair here is deliberately built from NON-inverting tokens. The badge
 * sits on product photography, which looks the same in both themes, so a token
 * that flips with the theme would destroy the contrast in one of them —
 * `bg-sand text-bean` was dark-on-dark in dark mode, and so was
 * `bg-espresso text-primary-foreground`.
 */
const ROAST_STYLES: Record<RoastLevel, { className: string; beans: string }> = {
  Light: { className: 'bg-roast-light text-roast-light-foreground', beans: '●○○' },
  Medium: { className: 'bg-roast-medium text-roast-medium-foreground', beans: '●●○' },
  Dark: { className: 'bg-roast-dark text-roast-dark-foreground', beans: '●●●' },
};

interface RoastBadgeProps {
  roast: RoastLevel;
  className?: string;
}

export function RoastBadge({ roast, className }: RoastBadgeProps) {
  const { className: roastClassName, beans } = ROAST_STYLES[roast];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
        'text-[11px] font-medium uppercase tracking-[0.08em] shadow-sm',
        roastClassName,
        className,
      )}
    >
      <span aria-hidden="true" className="text-[8px] leading-none tracking-tighter">
        {beans}
      </span>
      {roast} roast
    </span>
  );
}
