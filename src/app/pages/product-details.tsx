import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  ArrowLeft,
  Mountain,
  Package,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { ProductCard } from '../components/product-card';
import { QuantityStepper } from '../components/quantity-stepper';
import { RoastBadge } from '../components/roast-badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SectionHeading } from '../components/section-heading';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/cart-context';
import { formatPrice, formatWeight, pluralize } from '../lib/format';
import { FREE_SHIPPING_THRESHOLD } from '../lib/constants';
import { NotFoundPage } from './not-found';
import { toast } from 'sonner';

interface SpecRow {
  Icon: LucideIcon;
  label: string;
  value: string;
}

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  // Moving between two product pages reuses this component, so the quantity
  // has to be reset explicitly or it carries over to the next coffee.
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  // Keeps the browser tab useful when several products are open at once.
  useEffect(() => {
    if (!product) return;
    const previousTitle = document.title;
    document.title = `${product.name} — Yem Coffee`;
    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  if (!product) {
    // A missing product is a 404, so it gets the real 404 page rather than a
    // bare "Product Not Found" heading with no navigation.
    return <NotFoundPage />;
  }

  /**
   * `addToCart` now takes a quantity. The old code called it in a `for` loop,
   * which queued N separate state updates for a single click.
   */
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${pluralize(quantity, 'bag')} of ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const relatedProducts = getRelatedProducts(product);

  const specs: SpecRow[] = [
    { Icon: Mountain, label: 'Altitude', value: product.altitude },
    { Icon: Package, label: 'Bag size', value: formatWeight(product.weightGrams) },
    { Icon: ShieldCheck, label: 'Process', value: 'Natural, sun-dried' },
    { Icon: Truck, label: 'Shipping', value: `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
  ];

  return (
    <div className="container-page py-10">
      {/* Breadcrumb replaces the single "Back to Shop" link so the visitor can
          see where they are, not just how to leave. */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="transition-colors hover:text-copper">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shop" className="transition-colors hover:text-copper">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ------------------------------------------------------------ Image */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-xl bg-sand/40 shadow-[var(--shadow-card)]">
            <ImageWithFallback
              src={product.image}
              alt={`${product.name} — ${product.roast} roast coffee from ${product.origin}`}
              fetchPriority="high"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
            <RoastBadge roast={product.roast} className="absolute left-4 top-4" />
          </div>

          <Link
            to="/shop"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-copper"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all coffees
          </Link>
        </div>

        {/* ------------------------------------------------------------- Info */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            {product.origin}
          </p>

          <h1 className="mt-3 text-balance text-4xl text-primary sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="tabular-price font-display text-3xl font-semibold text-copper">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              per {formatWeight(product.weightGrams)} bag
            </span>
          </div>

          <p className="mt-6 text-pretty leading-relaxed text-foreground/80">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Flavor notes
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <li
                  key={note}
                  className="rounded-full border border-border/70 bg-sand px-4 py-1.5 text-sm text-secondary-foreground"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-8" />

          {/* Specs give the page something concrete to say beyond marketing
              copy — the details a specialty-coffee buyer actually looks for. */}
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {specs.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand">
                  <Icon className="h-4 w-4 text-copper" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <Separator className="my-8" />

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Quantity</span>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              label={product.name}
            />
            <span className="tabular-price text-sm text-muted-foreground">
              {formatPrice(product.price * quantity)} total
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="h-12 flex-1 bg-copper text-base text-white hover:bg-copper-dark"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleBuyNow}
              className="h-12 flex-1 border-primary/30 text-base"
            >
              Buy now
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4" aria-hidden="true" />
            Roasted to order — ships within 2 business days.
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------- Related grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <SectionHeading
            eyebrow="Keep exploring"
            title="You may also like"
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
