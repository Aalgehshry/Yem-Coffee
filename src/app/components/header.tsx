import { Link } from "react-router-dom";
import { ShoppingCart, Coffee, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/cart-context";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80"
        >
          <Coffee className="h-7 w-7" style={{ color: "#B87333" }} />
          <span className="text-xl font-semibold text-primary">
            Yem Coffee
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-foreground">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-foreground">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-foreground">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  style={{ backgroundColor: "#B87333" }}
                >
                  <span className="text-xs text-white">{totalItems}</span>
                </Badge>
              )}
            </Button>
          </Link>

          {/* Hamburger Button (Mobile Only) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="flex flex-col gap-4 px-6 py-4 items-center">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium"
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium"
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
