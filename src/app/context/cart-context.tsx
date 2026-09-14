import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../types/product';
import {
  CART_STORAGE_KEY,
  FREE_SHIPPING_THRESHOLD,
  MAX_QUANTITY_PER_ITEM,
  SHIPPING_FLAT_RATE,
  TAX_RATE,
} from '../lib/constants';

/**
 * `Product` and `CartItem` were declared here originally; they now live in
 * `types/product`. They are re-exported so existing imports keep working.
 */
export type { CartItem, Product } from '../types/product';

/** Everything the checkout summary needs, derived once from the cart. */
export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  /** Amount still needed to qualify for free shipping; 0 once qualified. */
  amountToFreeShipping: number;
}

interface CartContextType {
  cart: CartItem[];
  /** `quantity` defaults to 1, so existing `addToCart(product)` calls still work. */
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  /** Item count and subtotal as values, for render paths that just read them. */
  totalItems: number;
  totalPrice: number;
  totals: CartTotals;
}

type CartAction =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQuantity'; productId: string; quantity: number }
  | { type: 'clear' }
  | { type: 'hydrate'; cart: CartItem[] };

const clampQuantity = (quantity: number) =>
  Math.min(MAX_QUANTITY_PER_ITEM, Math.max(1, Math.floor(quantity)));

/**
 * A reducer rather than four separate `setCart` callbacks: every transition is
 * described in one place, which makes "add an item that is already in the
 * cart" and "set quantity to zero" impossible to get subtly different.
 */
function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'hydrate':
      return action.cart;

    case 'add': {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: clampQuantity(item.quantity + action.quantity) }
            : item,
        );
      }
      return [...state, { ...action.product, quantity: clampQuantity(action.quantity) }];
    }

    case 'remove':
      return state.filter((item) => item.id !== action.productId);

    case 'setQuantity': {
      // Dropping to zero (or below) removes the line, matching the behaviour
      // of the "−" button when quantity is 1.
      if (action.quantity <= 0) {
        return state.filter((item) => item.id !== action.productId);
      }
      return state.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: clampQuantity(action.quantity) }
          : item,
      );
    }

    case 'clear':
      return [];

    default:
      return state;
  }
}

/**
 * Read the previous cart back from localStorage. Anything unexpected in
 * storage (another app's key, an older shape, a private-mode throw) is treated
 * as "no cart" rather than crashing the whole app on boot.
 */
function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is CartItem => {
      if (typeof item !== 'object' || item === null) return false;
      const candidate = item as Partial<CartItem>;
      return (
        typeof candidate.id === 'string' &&
        typeof candidate.name === 'string' &&
        typeof candidate.price === 'number' &&
        typeof candidate.quantity === 'number' &&
        candidate.quantity > 0
      );
    });
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser: storage is read once on mount, not on every render.
  const [cart, dispatch] = useReducer(cartReducer, undefined, readStoredCart);

  // A cart that empties itself on refresh is the single most annoying thing a
  // storefront can do, so it is mirrored to localStorage on every change.
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Quota exceeded or storage blocked — the in-memory cart still works.
    }
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'add', product, quantity });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'remove', productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'setQuantity', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' });
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const totals = useMemo<CartTotals>(() => {
    const subtotal = totalPrice;
    const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = subtotal === 0 || qualifiesForFreeShipping ? 0 : SHIPPING_FLAT_RATE;
    const tax = subtotal * TAX_RATE;

    return {
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
      amountToFreeShipping: qualifiesForFreeShipping
        ? 0
        : FREE_SHIPPING_THRESHOLD - subtotal,
    };
  }, [totalPrice]);

  const getTotalItems = useCallback(() => totalItems, [totalItems]);
  const getTotalPrice = useCallback(() => totalPrice, [totalPrice]);

  // Memoised so consumers only re-render when the cart actually changes,
  // instead of on every render of the provider.
  const value = useMemo<CartContextType>(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      totalItems,
      totalPrice,
      totals,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      totalItems,
      totalPrice,
      totals,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
