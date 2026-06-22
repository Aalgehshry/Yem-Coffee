import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { products } from '../data/products';

export function ShopPage() {
  const [roastFilter, setRoastFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const filteredProducts = products.filter((product) => {
    if (roastFilter === 'all') return true;
    return product.roast.toLowerCase() === roastFilter.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-3 text-4xl font-semibold text-primary">
            Our Coffee Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our selection of premium Yemeni coffee beans
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">Roast Type</label>
            <Select value={roastFilter} onValueChange={setRoastFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Roasts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roasts</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
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
                    <span className="text-lg font-semibold" style={{ color: '#B87333' }}>
                      ${product.price}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:underline">
                    {product.name}
                  </h3>
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

        {sortedProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No products found matching your filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setRoastFilter('all')}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
