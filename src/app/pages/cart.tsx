import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Truck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { QuantityStepper } from '../components/quantity-stepper';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/cart-context';
import { formatPrice, formatWeight, pluralize } from '../lib/format';
import { FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../lib/constants';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totals } =
    useCart();
  const navigate = useNavigate();
  const [isConfirmingCheckout, setIsConfirmingCheckout] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sand">
          <ShoppingBag className="h-9 w-9 text-copper" aria-hidden="true" />
        </div>

        <h1 className="mt-8 text-4xl text-primary">Your cart is empty</h1>
        <p className="mt-3 max-w-md text-pretty text-muted-foreground">
          Add some Yemeni coffee to your cart to get started — every order over{' '}
          {formatPrice(FREE_SHIPPING_THRESHOLD)} ships free.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 h-12 bg-copper px-7 text-base text-white hover:bg-copper-dark"
        >
          <Link to="/shop">Start shopping</Link>
        </Button>
      </div>
    );
  }

  const handleRemove = (productId: string, name: string) => {
    removeFromCart(productId);
    toast(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    // This is a front-end UI project with no payment backend. The old code used
    // a blocking `window.alert`; a dialog explains the situation in the page's
    // own design language and can be cancelled.
    setIsConfirmingCheckout(false);
    clearCart();
    toast.success('Order placed — thank you!');
    navigate('/');
  };

  const freeShippingProgress = Math.min(
    100,
    (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <div className="container-page py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl text-primary">Shopping cart</h1>
          <p className="mt-2 text-muted-foreground">
            {pluralize(totalItems, 'item')} in your cart
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            clearCart();
            toast('Cart cleared');
          }}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear cart
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ------------------------------------------------------- Line items */}
        <ul className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <li key={item.id}>
              <Card className="border-border/60 shadow-[var(--shadow-card)]">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex gap-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-sand/40 sm:h-28 sm:w-28"
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${item.id}`}
                            className="text-lg font-semibold hover:text-copper hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.origin} • {item.roast} roast
                          </p>
                          <p className="tabular-price mt-1 text-sm text-muted-foreground">
                            {formatPrice(item.price)} ·{' '}
                            {formatWeight(item.weightGrams)} bag
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id, item.name)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <QuantityStepper
                          size="sm"
                          value={item.quantity}
                          label={item.name}
                          // Below 1 the stepper is disabled; the bin button is
                          // the deliberate way to remove a line.
                          onChange={(quantity) => updateQuantity(item.id, quantity)}
                        />
                        <span className="tabular-price text-lg font-semibold text-copper">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        {/* ---------------------------------------------------- Order summary */}
        <div className="lg:col-span-1">
          <Card className="border-border/60 shadow-[var(--shadow-card)] lg:sticky lg:top-24">
            <CardContent className="p-6">
              <h2 className="font-display text-2xl">Order summary</h2>

              {/* Progress toward free shipping — a concrete nudge, instead of
                  the flat "free shipping on all orders" note that used to sit
                  under a summary charging nothing for shipping anyway. */}
              <div className="mt-5 rounded-lg bg-sand/60 p-4">
                {totals.amountToFreeShipping > 0 ? (
                  <>
                    <p className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-copper" aria-hidden="true" />
                      <span>
                        <strong className="tabular-price">
                          {formatPrice(totals.amountToFreeShipping)}
                        </strong>{' '}
                        away from free shipping
                      </span>
                    </p>
                    <Progress value={freeShippingProgress} className="mt-3 h-2" />
                  </>
                ) : (
                  <p className="flex items-center gap-2 text-sm font-medium text-success">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Your order ships free
                  </p>
                )}
              </div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-price">{formatPrice(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="tabular-price">
                    {totals.shipping === 0 ? (
                      <span className="font-medium text-success">Free</span>
                    ) : (
                      formatPrice(totals.shipping)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Estimated tax ({Math.round(TAX_RATE * 100)}%)
                  </dt>
                  <dd className="tabular-price">{formatPrice(totals.tax)}</dd>
                </div>

                <Separator />

                <div className="flex items-baseline justify-between text-lg font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-price text-copper">
                    {formatPrice(totals.total)}
                  </dd>
                </div>
              </dl>

              <Button
                size="lg"
                onClick={() => setIsConfirmingCheckout(true)}
                className="mt-6 h-12 w-full bg-copper text-base text-white hover:bg-copper-dark"
              >
                Proceed to checkout
              </Button>

              <Button asChild variant="outline" size="lg" className="mt-3 h-12 w-full">
                <Link to="/shop">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Continue shopping
                </Link>
              </Button>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Roasted to order · Ships within 2 business days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={isConfirmingCheckout} onOpenChange={setIsConfirmingCheckout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This is a demo storefront</AlertDialogTitle>
            <AlertDialogDescription>
              Yem Coffee is a front-end portfolio project, so there is no payment
              step. Continuing will simulate a completed order for{' '}
              {formatPrice(totals.total)} and empty your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep shopping</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCheckout}
              className="bg-copper text-white hover:bg-copper-dark"
            >
              Place demo order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
