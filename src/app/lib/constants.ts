/**
 * Storefront constants.
 *
 * The tax rate was a bare `0.08` written twice inside the cart's JSX, where the
 * subtotal and the total could silently drift apart. Naming it keeps the two
 * calculations tied to one number.
 */

/** Sales tax applied to the cart subtotal. */
export const TAX_RATE = 0.08;

/** Order subtotal at which shipping becomes free. */
export const FREE_SHIPPING_THRESHOLD = 35;

/** Flat shipping charge below the free-shipping threshold. */
export const SHIPPING_FLAT_RATE = 5.95;

/** Upper bound on a single line item, so a stray keypress cannot order 9999 bags. */
export const MAX_QUANTITY_PER_ITEM = 20;

/** localStorage key holding the cart between visits. */
export const CART_STORAGE_KEY = 'yem-coffee.cart.v1';
