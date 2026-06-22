import { Link } from 'react-router-dom';
import { Star, Award, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { products } from '../data/products';

export function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1687324960664-5a0b9ef76e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxZZW1lbmklMjBjb2ZmZWUlMjBiZWFucyUyMHJvYXN0aW5nfGVufDF8fHx8MTc2NjA0MDQzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Yemeni Coffee"
          className="absolute inset-0 h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="container relative mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight">
              Authentic Yemeni Coffee
            </h1>
            <p className="mb-8 text-xl md:text-2xl text-white/90">
              Experience the rich heritage and complex flavors of Yemen's finest coffee beans
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white  text-primary hover:bg-white/10 hover:text-white"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border/40 bg-card py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Handpicked beans from mountain farms</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Authentic Origin</h3>
                <p className="text-sm text-muted-foreground">Direct from Yemen's heritage regions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: '#D4A574' }}>
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Freshly roasted and shipped to you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl md:text-4xl font-semibold text-primary">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our most popular Yemeni coffee selections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{product.roast} Roast</span>
                      <span className="text-sm font-medium" style={{ color: '#B87333' }}>
                        ${product.price}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{product.origin}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.flavorNotes.slice(0, 3).map((note) => (
                        <span
                          key={note}
                          className="rounded-full px-3 py-1 text-xs"
                          style={{ backgroundColor: '#E8D5B7' }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-card py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl md:text-4xl font-semibold text-primary">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                comment: 'The Mocha Sanani is absolutely incredible. The flavor complexity is unlike any coffee I\'ve tried before.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                comment: 'Authentic Yemeni coffee delivered to my door. The Haraaz Reserve is my new favorite!',
                rating: 5,
              },
              {
                name: 'Emma Williams',
                comment: 'Amazing quality and rich heritage. You can taste the tradition in every cup.',
                rating: 5,
              },
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#D4AF37' }} />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-foreground/80">{review.comment}</p>
                  <p className="font-semibold text-sm">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
