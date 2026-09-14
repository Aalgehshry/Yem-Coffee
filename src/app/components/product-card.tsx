import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent } from './ui/card';
import { RoastBadge } from './roast-badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../context/cart-context';
import { formatPrice, formatWeight } from '../lib/format';
import type { Product } from '../types/product';
import { cn } from './ui/utils';

interface ProductCardProps {
  product: Product;
  /**
   * The first row of cards is above the fold, so those images load eagerly
   * while everything further down is deferred.
   */
  priority?: boolean;
  /** Hide the hover "quick add" control, e.g. in the related-products strip. */
  showQuickAdd?: boolean;
  className?: string;
}

/**
 * One coffee in a grid.
 *
 * This markup previously existed three times — home, shop and the
 * related-products strip — and had already drifted apart (different price
 * sizes, one grid had a hover underline and the others did not). It is one
 * component now, so the catalogue looks the same wherever it appears.
 *
 * Accessibility note: the old version wrapped the whole `<Card>` in a `<Link>`,
 * which makes it impossible to put a button inside. Here the link sits on the
 * product name and is stretched over the card with `after:absolute`, so the
 * card is still fully clickable but the "add" button stays a real button.
 */
export function ProductCard({
  product,
  priority = false,
  showQuickAdd = true,
  className,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);

    // Brief inline confirmation on the button itself: the toast is in the
    // corner, and the eye is on the button that was just pressed.
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <Card
      className={cn(
        'group relative h-full gap-0 overflow-hidden border-border/60 py-0',
        'shadow-[var(--shadow-card)] transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        'focus-within:-translate-y-1 focus-within:shadow-[var(--shadow-card-hover)]',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-sand/40">
        <ImageWithFallback
          src={product.image}
          alt={`${product.name} — ${product.roast} roast coffee from ${product.origin}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Warm scrim so the badge stays legible on light or busy photos. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-bean/35 via-transparent to-transparent opacity-70"
        />

        <RoastBadge roast={product.roast} className="absolute left-3 top-3" />

        {showQuickAdd && (
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              'absolute bottom-3 right-3 z-10 inline-flex h-10 items-center gap-2 rounded-full',
              'bg-card/95 px-4 text-sm font-medium text-foreground shadow-md backdrop-blur',
              'transition-all duration-300 hover:bg-cta hover:text-cta-foreground',
              // Revealed on hover for pointer users, but always visible on
              // touch screens (which never hover) and to keyboard focus.
              'md:translate-y-2 md:opacity-0',
              'md:group-hover:translate-y-0 md:group-hover:opacity-100',
              'md:focus-visible:translate-y-0 md:focus-visible:opacity-100',
            )}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add
              </>
            )}
          </button>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {product.origin}
        </p>

        <h3 className="mt-1.5 text-xl font-semibold leading-snug">
          <Link
            to={`/product/${product.id}`}
            className="after:absolute after:inset-0 after:content-[''] hover:text-copper-text focus-visible:text-copper-text"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mb-4 mt-3 flex flex-wrap gap-1.5">
          {product.flavorNotes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="rounded-full bg-sand px-2.5 py-1 text-xs text-secondary-foreground"
            >
              {note}
            </span>
          ))}
        </div>

        {/* `mt-auto` pins the price row to the bottom so prices line up across
            a row of cards even when the flavour-note chips wrap differently. */}
        <div className="mt-auto flex items-end justify-between border-t border-border/60 pt-4">
          <span className="tabular-price text-lg font-semibold text-copper-text">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatWeight(product.weightGrams)} bag
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
