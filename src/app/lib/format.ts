/**
 * Display formatting helpers.
 *
 * Prices were previously rendered as `${'$'}{product.price}` in five places,
 * which drops the trailing zero on a round number ("$25" instead of "$25.00")
 * and hard-codes the currency symbol. One formatter keeps every price on the
 * page consistent.
 */

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

/** "250g" / "1kg" — used on product cards and the details page. */
export function formatWeight(grams: number): string {
  return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
}

/** "3 items" / "1 item" — cart counts and result counts. */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
