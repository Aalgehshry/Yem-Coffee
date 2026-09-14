# Yem Coffee

A front-end e-commerce storefront for Yemeni specialty coffee — browse a
single-origin catalogue, filter it by roast, read tasting notes, and check out
through a cart that survives a refresh.

Built with **React + TypeScript + Vite**, styled with **Tailwind CSS v4** design
tokens, on top of **shadcn/ui** (Radix) primitives.

🔗 **Live demo:** <https://yem-coffee.vercel.app>

---

## Highlights

- **A real design system, not scattered hex codes.** The whole palette —
  copper, gold, sand, espresso — lives as CSS custom properties in
  `src/styles/theme.css` and is exposed to Tailwind as utilities
  (`text-copper`, `bg-sand`), so the brand can be retuned in one file.
- **Shareable, bookmarkable filters.** Shop filters live in the URL
  (`/shop?roast=light&q=jasmine`), so a filtered view can be linked and the back
  button undoes a filter instead of leaving the page.
- **A cart that remembers.** Cart state is a reducer mirrored to
  `localStorage`, guarded so that corrupt or blocked storage degrades to an
  empty cart rather than a white screen.
- **Accessible by construction.** Skip link, labelled icon buttons, a live
  region for filter results, `aria-expanded` on the mobile menu, visible focus
  rings, and a `prefers-reduced-motion` escape hatch.
- **Typed end to end** — `npm run build` type-checks before it bundles.

## Tech stack

| Concern    | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | React 18 + TypeScript (strict)              |
| Build      | Vite 6                                      |
| Styling    | Tailwind CSS v4 with CSS custom properties  |
| Components | shadcn/ui on Radix primitives               |
| Routing    | React Router 7                              |
| Icons      | lucide-react                                |
| Toasts     | sonner                                      |
| Typography | Fraunces (display) + Inter (UI)             |

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

| Script              | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                  |
| `npm run build`     | Type-check, then build to `dist/`         |
| `npm run typecheck` | `tsc --noEmit` on its own                 |
| `npm run preview`   | Serve the production build locally        |

## Project structure

```
index.html                    document shell, meta tags, font <link>
vercel.json                   SPA rewrite so deep links resolve on Vercel
src/main.tsx                  React entry point
src/app/App.tsx               routes, providers, page chrome
src/app/types/product.ts      Product / CartItem domain types
src/app/data/products.ts      the catalogue + its query helpers
src/app/context/cart-context  cart reducer, totals, localStorage persistence
src/app/lib/constants.ts      tax rate, shipping thresholds, storage key
src/app/lib/format.ts         price / weight / plural formatting
src/app/components/           shared components (product card, footer, …)
src/app/components/ui/        shadcn/ui primitives
src/app/pages/                one file per route
src/styles/theme.css          design tokens + base layer
```

## How the pieces fit

**Design tokens.** `theme.css` declares the palette on `:root`, overrides it
under `.dark`, and re-exports it through Tailwind's `@theme inline` block.
Components then use `text-copper` rather than `style={{ color: '#B87333' }}`,
which is what makes the dark theme a palette swap instead of a rewrite.

**One product card.** `ProductCard` is used by the home page, the shop grid and
the related-products strip. The link sits on the product name and is stretched
across the card with `after:absolute`, so the card is fully clickable while the
quick-add control stays a real, focusable `<button>` — impossible when the
whole card is wrapped in an anchor.

**Cart totals.** Subtotal, tax, shipping and the free-shipping gap are all
derived in one memoised place in the cart context, so nothing on the page can
disagree with anything else about the number.

## Deploying

The app is a static SPA. `vercel.json` rewrites every path to `index.html` so
that loading `/shop` directly returns the app rather than a 404.

```bash
npm run build   # → dist/
```

## Credits

Photography from [Unsplash](https://unsplash.com); UI primitives from
[shadcn/ui](https://ui.shadcn.com). See [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

---

_Built by Abeer Algehshry — Front-End Developer._
