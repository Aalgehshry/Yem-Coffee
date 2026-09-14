import type { Product, RoastLevel } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Mocha Sanani',
    price: 24.99,
    image:
      'https://images.unsplash.com/photo-1661668998418-ff67c6b0194e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjU5NDE4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Medium',
    origin: 'Sanaa, Yemen',
    altitude: '1,800–2,200m',
    description:
      'A classic Yemeni coffee with wild, fruity flavors and a wine-like complexity. Grown in the mountains surrounding Sanaa.',
    flavorNotes: ['Blueberry', 'Dark Chocolate', 'Spice', 'Red Wine'],
    weightGrams: 250,
  },
  {
    id: '2',
    name: 'Haraaz Reserve',
    price: 29.99,
    image:
      'https://images.unsplash.com/photo-1669894196956-f7f3b0134d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBwcm9kdWN0JTIwcGFja2FnaW5nfGVufDF8fHx8MTc2NTkzMjI0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Light',
    origin: 'Haraaz, Yemen',
    altitude: '2,000–2,400m',
    description:
      "Exceptional coffee from one of Yemen's most renowned regions. Naturally processed with distinctive wild fruit notes.",
    flavorNotes: ['Strawberry', 'Jasmine', 'Cinnamon', 'Brown Sugar'],
    weightGrams: 250,
  },
  {
    id: '3',
    name: 'Ismaili Heritage',
    price: 27.99,
    image:
      'https://images.unsplash.com/photo-1687324960664-5a0b9ef76e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxZZW1lbmklMjBjb2ZmZWUlMjBiZWFucyUyMHJvYXN0aW5nfGVufDF8fHx8MTc2NjA0MDQzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Medium',
    origin: 'Bani Ismail, Yemen',
    altitude: '1,900–2,300m',
    description:
      'Traditional Yemeni coffee from terraced mountain farms. Rich body with complex flavor profile.',
    flavorNotes: ['Dried Fruit', 'Cardamom', 'Cocoa', 'Honey'],
    weightGrams: 250,
  },
  {
    id: '4',
    name: 'Al-Haimi Classic',
    price: 26.99,
    image:
      'https://images.unsplash.com/photo-1746623691157-c4c7a3bad0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNvZmZlZSUyMGZhcm18ZW58MXx8fHwxNzY2MDQwNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Dark',
    origin: 'Al-Haima, Yemen',
    altitude: '1,600–2,000m',
    description:
      'Bold and intense coffee from the Al-Haima region. Perfect for traditional Arabic coffee preparation.',
    flavorNotes: ['Dark Chocolate', 'Tobacco', 'Leather', 'Molasses'],
    weightGrams: 250,
  },
  {
    id: '5',
    name: 'Mattari Premium',
    price: 32.99,
    image:
      'https://images.unsplash.com/photo-1759250451236-855981aedbd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBcmFiaWMlMjBjb2ZmZWUlMjBjdWx0dXJlfGVufDF8fHx8MTc2NjA0MDQzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Medium',
    origin: 'Bani Mattar, Yemen',
    altitude: '2,100–2,400m',
    description:
      'Premium selection from the famed Mattari region. Known for its full body and distinctive flavor.',
    flavorNotes: ['Cherry', 'Cinnamon', 'Wine', 'Walnut'],
    weightGrams: 250,
  },
  {
    id: '6',
    name: "Sana'ani Blend",
    price: 23.99,
    image:
      'https://images.unsplash.com/photo-1661668998418-ff67c6b0194e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBjb2ZmZWUlMjBiZWFuc3xlbnwxfHx8fDE3NjU5NDE4OTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roast: 'Light',
    origin: 'Sanaa, Yemen',
    altitude: '1,800–2,100m',
    description:
      'A balanced blend showcasing the best of Yemeni coffee traditions. Versatile and approachable.',
    flavorNotes: ['Apricot', 'Almond', 'Caramel', 'Bergamot'],
    weightGrams: 250,
  },
];

/* -------------------------------------------------------------------------
 * Catalogue queries
 *
 * Pages used to reach into the `products` array directly and re-implement
 * these three lookups inline. Keeping them next to the data means a future
 * switch to a real API changes this file only.
 * ---------------------------------------------------------------------- */

export function getProductById(id: string | undefined): Product | undefined {
  if (!id) return undefined;
  return products.find((product) => product.id === id);
}

/**
 * Other coffees to show alongside `product` — same roast level first, so the
 * suggestions are actually related rather than just "the next three".
 */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const others = products.filter((candidate) => candidate.id !== product.id);
  const sameRoast = others.filter((candidate) => candidate.roast === product.roast);
  const rest = others.filter((candidate) => candidate.roast !== product.roast);
  return [...sameRoast, ...rest].slice(0, limit);
}

/** Roast levels that actually appear in the catalogue, for the shop filter. */
export function getAvailableRoasts(): RoastLevel[] {
  const seen = new Set(products.map((product) => product.roast));
  return (['Light', 'Medium', 'Dark'] as const).filter((roast) => seen.has(roast));
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map((product) => product.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
