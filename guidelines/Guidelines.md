# Yem Coffee — code & design guidelines

Short rules that keep this codebase consistent. When something here conflicts
with a shadcn/ui primitive in `src/app/components/ui/`, leave the primitive
alone — those files are vendored and should stay close to upstream.

## Colour

- **Never write a hex value in a component.** Every colour is a token in
  `src/styles/theme.css`, surfaced as a Tailwind utility: `text-copper`,
  `bg-sand`, `bg-espresso`, `text-gold`, plus the semantic set (`bg-card`,
  `text-muted-foreground`, `border-border`).
- Adding a colour means adding it in three places in `theme.css`: the `:root`
  value, the `.dark` override, and the `@theme inline` mapping.
- `style={{ ... }}` is for genuinely dynamic values only (a computed width, a
  transform). It is not a shortcut around the palette.

### Inverting vs non-inverting tokens

This is the easiest way to break dark mode, so check it before pairing two
colours:

- **Inverting** tokens are redefined under `.dark` — `primary`, `accent`,
  `card`, `sand`, `copper`, `primary-foreground`. They are correct for things
  that sit on the *page*, which changes with the theme.
- **Non-inverting** tokens are declared once in `:root` — `highlight`, `deep`,
  `espresso`, `bean`, `gold`, and the `roast-*` set. They are for things that
  sit on something dark in *both* themes: product photography, the footer, the
  hero, the story bands.

Never pair one of each. `bg-sand text-bean` looks right in light mode and is
dark-on-dark in dark mode; so was `bg-espresso text-primary-foreground`.

### Colour by role, not by name

`--copper` is a mid-tone: it does not clear 4.5:1 against either white or
near-black at body sizes. It is therefore split by job, and the right one must
be used:

| Token | Use for |
| --- | --- |
| `copper` | decorative fills, borders, dividers |
| `copper-text` | copper as text on a page or card background |
| `cta` / `cta-foreground` / `cta-hover` | the solid primary button |

Verify any new pair, in both themes, before shipping it. Targets: 4.5:1 for
body text, 3:1 for large text and UI boundaries.

## Typography

- `font-display` (Fraunces) for headings and prices; `font-sans` (Inter)
  everywhere else. Headings already default to the display face.
- Prices, quantities and totals get `tabular-price` so digits do not jitter as
  the value changes.
- Long-form copy gets `text-pretty`; headings get `text-balance`.

## Layout

- Page-level gutters come from `container-page`, not a hand-rolled
  `container mx-auto px-4 sm:px-6 lg:px-8`.
- Prefer flex/grid over absolute positioning. Absolute is for overlays
  (scrims, badges pinned to an image corner) only.
- Mobile first: write the small-screen layout, then add `sm:` / `md:` / `lg:`.

## Components

- If the same block of JSX appears on a second page, extract it. `ProductCard`,
  `QuantityStepper`, `SectionHeading` and `RoastBadge` all exist because the
  markup had already been copied two or three times and drifted apart.
- Content that repeats in a layout (trust badges, footer links, reviews) goes
  in a module-level array and gets mapped, so a layout change is one edit.
- Keep formatting in `lib/format.ts` and magic numbers in `lib/constants.ts`.
  A tax rate or a currency symbol should never be typed into JSX.

## Accessibility

These are requirements, not nice-to-haves:

- Every icon-only button needs an `aria-label`; every decorative icon and
  gradient needs `aria-hidden="true"`.
- Never nest a `<button>` inside an `<a>`. To make a card clickable, put the
  link on the title and stretch it with `after:absolute after:inset-0`.
- Images need a real `alt`, or `alt=""` plus `aria-hidden` when decorative.
- Content that changes in place (result counts, quantities) needs `aria-live`.
- Anything interactive must be reachable and visible on keyboard focus.
- New animation must survive `prefers-reduced-motion: reduce` — the base layer
  neutralises durations, so do not rely on a transition to reveal content.

## Images

- Above-the-fold images: `fetchPriority="high"`, no `loading="lazy"`.
- Everything below: `loading="lazy" decoding="async"`.
- Remote product photography goes through `ImageWithFallback`, so a dead URL
  renders a branded placeholder rather than a broken-image icon.

## State

- Filters and other view state that a user might want to share or undo belong
  in the URL (`useSearchParams`), not `useState`.
- Cart mutations go through the reducer in `context/cart-context.tsx`. Add an
  action there rather than reaching around it.
- Derive; do not duplicate. Totals come from `totals` in the cart context so
  two parts of the page cannot disagree about a number.

## Before committing

```bash
npm run typecheck
npm run build
```

Both must pass. `strict` is on and stays on.
