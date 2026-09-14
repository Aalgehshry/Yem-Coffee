# The Yemeni Museum Review

A bilingual (English / Arabic) digital magazine celebrating Yemen's cultural
heritage — read by **turning pages sideways** instead of scrolling. Six spreads
take the reader from a cover and editorial through featured collections, a
historical timeline, an interactive map, and visitor information.

Built from scratch in **vanilla HTML, CSS, and JavaScript** — no framework, no
build step — with full **right-to-left (RTL)** support and a clean,
content-driven internationalization layer.

<!-- Replace with your deployed link once it's live on Vercel / Netlify / GitHub Pages -->
🔗 **Live demo:** _add link here_
📸 **Preview:** _add a screenshot or short GIF here_

---

## Highlights

- **Fully bilingual (EN / AR)** with a live language switch — every translatable
  element is driven by a `data-i18n` key, so text is never hard-coded in the markup.
- **True RTL layout**, not just mirrored text — spacing, alignment, and reading
  direction adapt when Arabic is active.
- **Horizontal, page-turning interface** instead of a vertical scroll, mimicking
  a printed magazine.
- **Content-driven architecture** — collection cards, timeline eras, and map
  markers are all generated from arrays in one file, so adding a card means
  adding one object, not copying a block of HTML.
- **Zero dependencies** — opens and runs with nothing to install.
- Includes a small **Python tool** that compresses images and flags unused ones.

## Tech stack

| Concern            | Choice                                    |
| ------------------ | ----------------------------------------- |
| Markup             | Semantic HTML5                            |
| Styling            | CSS3 (custom properties, RTL-aware layout)|
| Behaviour          | Vanilla JavaScript (no framework)         |
| Internationalization | Custom `data-i18n` system, content in JS |
| Tooling            | Python (image compression / cleanup)      |

## Project structure

```
index.html          page structure — the six spreads and the nav bar
css/style.css       all styling, ordered spread by spread
js/content.js       ALL text and photo choices, in both languages
js/main.js          behaviour only: page turning, language switch, interactions
images/             photos used by the site
images/_originals/  untouched copies, kept so photos can be re-compressed safely
tools/images.py     compresses photos and finds unused ones
```

## How the two languages work

Every translatable element carries a `data-i18n` attribute naming its text:

```html
<h2 data-i18n="collTitle"></h2>
```

On load — and again whenever the language is switched — `main.js` fills each of
those elements from `js/content.js`. Content and presentation stay separate, so
translating or editing copy never means touching the layout.

## Running it locally

It needs to be served over HTTP (opening `index.html` directly won't load the
stylesheet and scripts correctly in every browser):

```bash
python -m http.server 8843
```

Then visit <http://localhost:8843>.

## Why I built it

A personal project connecting my Yemeni heritage with front-end craft — an
excuse to go deep on bilingual/RTL interfaces, a content-driven architecture,
and a reading experience that breaks away from the default vertical scroll.

---

_Built by Abeer Algehshry — Front-End Developer._
