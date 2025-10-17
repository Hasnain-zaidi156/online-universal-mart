import { Button } from "@/components/ui/button";
import { ShoppingCart, Phone, Facebook, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useCart } from "@/store/cart";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F115a1cf6c42d4eef9d7bd186d282a17f?format=webp&width=800";

export function SiteHeader({ onOpenCart }: { onOpenCart?: () => void }) {
  const { items } = useCart();
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const location = useLocation();
  const ownerMode = new URLSearchParams(location.search).get("owner") === "1";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="ONLINE UNIVERSAL MART" className="h-10 w-10 rounded-md object-contain" />
          <Link to="/" className="text-lg font-semibold tracking-wide">
            ONLINE UNIVERSAL MART
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          <a href="#products" className="text-sm font-medium hover:text-primary">Shop</a>
          <a href="#about" className="text-sm font-medium hover:text-primary">About</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/923332385779"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
            aria-label="WhatsApp"
          >
            <Button variant="secondary" size="sm"><Phone className="mr-2" /> WhatsApp</Button>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61572891727401"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
            aria-label="Facebook"
          >
            <Button variant="ghost" size="icon"><Facebook /></Button>
          </a>
          {ownerMode && (
            <Link to="/?owner=1#owner" aria-label="Owner settings">
              <Button variant="outline" size="icon"><Settings /></Button>
            </Link>
          )}
          <Button onClick={onOpenCart} className="relative">
            <ShoppingCart />
            Cart
            {count > 0 && (
              <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">{count}</span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
