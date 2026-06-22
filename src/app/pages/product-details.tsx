import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { products } from '../data/products';
import { useCart } from '../context/cart-context';
import { toast } from 'sonner';

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-semibold">Product Not Found</h1>
        <Link to="/shop">
          <Button>Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  const relatedProducts = products.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">{product.roast} Roast</span>
              <h1 className="mt-2 text-4xl font-semibold text-primary">
                {product.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{product.origin}</p>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-semibold" style={{ color: '#B87333' }}>
                ${product.price}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">per 250g bag</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">Description</h3>
              <p className="text-foreground/80">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">Flavor Notes</h3>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full px-4 py-2 text-sm"
                    style={{ backgroundColor: '#E8D5B7' }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                onClick={handleBuyNow}
                className="flex-1"
                style={{ backgroundColor: '#B87333' }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-8 text-3xl font-semibold text-primary text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{relatedProduct.roast} Roast</span>
                      <span className="text-lg font-semibold" style={{ color: '#B87333' }}>
                        ${relatedProduct.price}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold group-hover:underline">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{relatedProduct.origin}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
