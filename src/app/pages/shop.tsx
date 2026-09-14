import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ProductCard } from '../components/product-card';
import { SectionHeading } from '../components/section-heading';
import { products, getAvailableRoasts } from '../data/products';
import { pluralize } from '../lib/format';
import type { Product } from '../types/product';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name (A–Z)' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]['value'];

const DEFAULT_ROAST = 'all';
const DEFAULT_SORT: SortOption = 'name';

function sortProducts(list: Product[], sortBy: SortOption): Product[] {
  // Copy first: `Array.prototype.sort` mutates, and `products` is module state
  // shared with every other page.
  return [...list].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });
}

export function ShopPage() {
  /**
   * Filters live in the URL rather than in `useState`. That makes a filtered
   * view shareable and bookmarkable, lets the footer link straight to
   * `/shop?roast=light`, and makes the browser back button undo a filter
   * instead of leaving the page.
   */
  const [searchParams, setSearchParams] = useSearchParams();

  const roastFilter = searchParams.get('roast') ?? DEFAULT_ROAST;
  const sortBy = (searchParams.get('sort') as SortOption | null) ?? DEFAULT_SORT;
  const query = searchParams.get('q') ?? '';

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === defaultValue || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    // `replace` keeps typing in the search box out of the history stack.
    setSearchParams(next, { replace: true });
  };

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesRoast =
        roastFilter === DEFAULT_ROAST ||
        product.roast.toLowerCase() === roastFilter.toLowerCase();

      if (!matchesRoast) return false;
      if (!normalizedQuery) return true;

      // Search across everything a shopper might type: the name, the region
      // and the tasting notes.
      return [product.name, product.origin, ...product.flavorNotes]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });

    return sortProducts(filtered, sortBy);
  }, [roastFilter, sortBy, query]);

  const hasActiveFilters = roastFilter !== DEFAULT_ROAST || query.trim() !== '';

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('roast');
    next.delete('q');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="container-page py-14">
      <SectionHeading
        as="h1"
        eyebrow="The collection"
        title="Our coffee collection"
        description="Explore our selection of premium Yemeni coffee beans, each from a single mountain region."
      />

      {/* -------------------------------------------------------------- Filters */}
      <div className="mt-10 rounded-xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-medium"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="product-search"
                type="search"
                value={query}
                onChange={(event) => updateParam('q', event.target.value, '')}
                placeholder="Try “Haraaz”, “Sanaa” or “chocolate”"
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="roast-filter"
                className="mb-2 block text-sm font-medium"
              >
                Roast type
              </label>
              <Select
                value={roastFilter}
                onValueChange={(value) => updateParam('roast', value, DEFAULT_ROAST)}
              >
                <SelectTrigger id="roast-filter" className="w-full sm:w-[190px]">
                  <SelectValue placeholder="All roasts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roasts</SelectItem>
                  {getAvailableRoasts().map((roast) => (
                    <SelectItem key={roast} value={roast.toLowerCase()}>
                      {roast}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="sort-by" className="mb-2 block text-sm font-medium">
                Sort by
              </label>
              <Select
                value={sortBy}
                onValueChange={(value) => updateParam('sort', value, DEFAULT_SORT)}
              >
                <SelectTrigger id="sort-by" className="w-full sm:w-[190px]">
                  <SelectValue placeholder="Name (A–Z)" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
            <SlidersHorizontal
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">Filtering by</span>

            {roastFilter !== DEFAULT_ROAST && (
              <FilterChip
                label={`${roastFilter} roast`}
                onRemove={() => updateParam('roast', DEFAULT_ROAST, DEFAULT_ROAST)}
              />
            )}
            {query.trim() !== '' && (
              <FilterChip
                label={`“${query.trim()}”`}
                onRemove={() => updateParam('q', '', '')}
              />
            )}

            <Button
              variant="link"
              size="sm"
              onClick={clearFilters}
              className="h-auto p-0 text-copper"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Announced to screen readers whenever the filters change the result set. */}
      <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
        Showing {pluralize(visibleProducts.length, 'coffee')}
        {hasActiveFilters && ` of ${products.length}`}
      </p>

      {/* --------------------------------------------------------- Product grid */}
      {visibleProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sand">
            <Search className="h-6 w-6 text-copper" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl">No coffees match those filters</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Try a different roast level, or search for a region like “Sanaa” or a
            tasting note like “chocolate”.
          </p>
          <Button variant="outline" className="mt-6" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs font-medium capitalize text-secondary-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="rounded-full p-0.5 transition-colors hover:bg-bean/15"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}
