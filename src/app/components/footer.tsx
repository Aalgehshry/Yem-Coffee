import { Link } from 'react-router-dom';
import { Coffee, Instagram, Mail, Twitter } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SHOP_LINKS = [
  { to: '/shop', label: 'All coffee' },
  { to: '/shop?roast=light', label: 'Light roast' },
  { to: '/shop?roast=medium', label: 'Medium roast' },
  { to: '/shop?roast=dark', label: 'Dark roast' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'Our story' },
  { to: '/about#values', label: 'What we stand for' },
  { to: '/cart', label: 'Your cart' },
];

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://twitter.com', label: 'Twitter', Icon: Twitter },
  { href: 'mailto:hello@yemcoffee.example', label: 'Email us', Icon: Mail },
];

/**
 * Site footer.
 *
 * The site had no footer at all, so every page simply stopped — there was no
 * secondary navigation, no contact route and nothing to catch a visitor who
 * scrolled to the bottom without buying.
 */
export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No backend in this UI project — confirm and reset so the control still
    // behaves like a real form rather than doing nothing on submit.
    toast.success('Thanks! We will send you a note when the next harvest lands.');
    setEmail('');
  };

  return (
    <footer className="mt-20 border-t border-border/60 bg-deep text-deep-foreground">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <Coffee className="h-7 w-7 text-highlight" aria-hidden="true" />
              <span className="font-display text-xl font-semibold">Yem Coffee</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-deep-foreground/70">
              Single-origin coffee from Yemen's terraced mountain farms — the
              birthplace of coffee — roasted in small batches and shipped fresh.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              <label
                htmlFor="footer-email"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-deep-foreground/60"
              >
                Harvest notes, twice a year
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="border-deep-foreground/25 bg-deep-foreground/10 text-deep-foreground placeholder:text-deep-foreground/45"
                />
                <Button type="submit" className="bg-cta text-cta-foreground hover:bg-cta-hover">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>

          <nav aria-label="Shop">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-deep-foreground/60">
              Shop
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-deep-foreground/80 transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-deep-foreground/60">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-deep-foreground/80 transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-deep-foreground/25 text-deep-foreground/80 transition-colors hover:border-highlight hover:text-highlight"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-deep-foreground/15 pt-6 text-xs text-deep-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Yem Coffee. A front-end portfolio project.</p>
          <p>Roasted with care in small batches.</p>
        </div>
      </div>
    </footer>
  );
}
