/**
 * Domain types.
 *
 * These used to live inside `cart-context.tsx`, which meant the product
 * catalogue had to import from the cart in order to describe a product. Types
 * now sit on their own so data, cart and UI all depend on the same module
 * without depending on each other.
 */

export const ROAST_LEVELS = ['Light', 'Medium', 'Dark'] as const;

export type RoastLevel = (typeof ROAST_LEVELS)[number];

export interface Product {
  id: string;
  name: string;
  /** Price in USD for a single bag of `weightGrams`. */
  price: number;
  image: string;
  roast: RoastLevel;
  origin: string;
  /** Growing altitude, shown on the product page. */
  altitude: string;
  description: string;
  flavorNotes: string[];
  weightGrams: number;
}

export interface CartItem extends Product {
  quantity: number;
}
