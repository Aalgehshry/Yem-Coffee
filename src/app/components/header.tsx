import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Coffee, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../context/cart-context';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { pluralize } from '../lib/format';
import { cn } from './ui/utils';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
];

export function Header() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navigating from inside the mobile menu must close it. Previously only the
  // links themselves called `setIsOpen(false)`, so any other route change
  // (browser back, a redirect) left the panel hanging open.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Escape closes the menu, which is what every user expects from an overlay.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // The header is translucent over the hero image; it only earns a border and
  // shadow once the page has actually scrolled underneath it.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative py-1 text-sm font-medium transition-colors',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left',
      'after:bg-copper after:transition-transform after:duration-300 after:content-[""]',
      isActive
        ? 'text-copper after:scale-x-100'
        : 'text-foreground/75 hover:text-foreground after:scale-x-0 hover:after:scale-x-100',
    );

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-card/85 backdrop-blur-md transition-shadow duration-300',
        isScrolled
          ? 'border-b border-border/60 shadow-[0_1px_16px_-8px_rgba(44,24,16,0.4)]'
          : 'border-b border-transparent',
      )}
    >
      {/* Lets keyboard users jump past the nav on every page. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Yem Coffee — home"
        >
          <Coffee className="h-7 w-7 text-copper" aria-hidden="true" />
          <span className="font-display text-xl font-semibold text-primary">Yem Coffee</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          <Button
            asChild
            variant="outline"
            size="icon"
            className="relative border-border/70"
          >
            <Link
              to="/cart"
              aria-label={
                totalItems > 0
                  ? `Cart, ${pluralize(totalItems, 'item')}`
                  : 'Cart, empty'
              }
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span
                  aria-hidden="true"
                  className="tabular-price absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-copper px-1 text-[11px] font-semibold text-white"
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu — grid-rows trick animates height without a fixed value. */}
      <div
        id="mobile-nav"
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <nav
            aria-label="Mobile"
            className="flex flex-col border-t border-border/60 bg-card px-4 py-2"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                    isActive ? 'bg-sand text-copper' : 'text-foreground hover:bg-sand/50',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
