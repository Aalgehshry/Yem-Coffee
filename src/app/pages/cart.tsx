import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/cart-context';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="mb-4 text-3xl font-semibold">Your Cart is Empty</h1>
        <p className="mb-8 text-muted-foreground">
          Add some delicious Yemeni coffee to your cart to get started
        </p>
        <Link to="/shop">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    alert('Checkout functionality would be implemented here');
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-semibold text-primary">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <Link
                              to={`/product/${item.id}`}
                              className="text-lg font-semibold hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.origin} • {item.roast} Roast
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-lg font-semibold" style={{ color: '#B87333' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-semibold">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span style={{ color: '#B87333' }}>
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-primary hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Button>

                <Link to="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-3 w-full"
                  >
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 rounded-lg p-4" style={{ backgroundColor: '#E8D5B7' }}>
                  <p className="text-sm text-center text-foreground/80">
                    🎁 Free shipping on all orders
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
