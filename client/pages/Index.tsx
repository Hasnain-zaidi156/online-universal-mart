import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductCard } from "@/components/shop/ProductCard";
import { CartSheet } from "@/components/shop/CartSheet";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { OwnerSettings } from "@/components/shop/OwnerSettings";
import { useCart, type Product } from "@/store/cart";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F115a1cf6c42d4eef9d7bd186d282a17f?format=webp&width=800";

const PRODUCTS: Product[] = [
  {
    id: "img-wa0005",
    name: "ATTAR-E- DAVID BECHKAM",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F21e0ad0420674c3f9597686bb2eb3633?format=webp&width=800",
  },
  {
    id: "img-wa0006",
    name: "ATTAR-E- MURSHID",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F298d18ad04bf4931b4faa9ffc947f757?format=webp&width=800",
  },
  {
    id: "img-wa0007",
    name: "ATTAR-E- ONE MILLION",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F297a23696c2d41f5a436e71150e0751e?format=webp&width=800",
  },
  {
    id: "img-wa0008",
    name: "Sultan",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F83397907e5db427cb29911cc1bdeaec9?format=webp&width=800",
  },
  {
    id: "img-wa0009",
    name: "ATTAR-E- EIZA",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2Ff101223e908249779489ce4d19ecff50?format=webp&width=800",
  },
  {
    id: "img-wa0011",
    name: "ATTAR-E- SAUVAGE DIOR",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F4f99175f6897483bb72f8bfc31ed5130?format=webp&width=800",
  },
  {
    id: "img-wa0012",
    name: "ATTAR-E- WHITE OUD",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2Fc38bb71443ef49eeaa4e8ed91fa83f3b?format=webp&width=800",
  },
  {
    id: "img-untitled",
    name: "ATTAR-E- MURSHID",
    price: 1500,
    ml: 6,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F93d5c5b68f0f489a88a19174f68ffc61%2F99ab80dd8f81430fa08acd4bdd1a4dd8?format=webp&width=800",
  },
];

function SignupCard() {
  const { account, setAccount } = useCart();
  const [local, setLocal] = useState({ name: account?.name || "", email: account?.email || "", phone: account?.phone || "" });

  return (
    <Card className="bg-white/70 backdrop-blur">
      <CardContent className="grid gap-3 p-6 md:grid-cols-3">
        <div>
          <Label htmlFor="s-name">Full Name</Label>
          <Input id="s-name" value={local.name} onChange={(e) => setLocal({ ...local, name: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="s-email">Email</Label>
          <Input id="s-email" type="email" value={local.email} onChange={(e) => setLocal({ ...local, email: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="s-phone">Phone</Label>
          <Input id="s-phone" value={local.phone} onChange={(e) => setLocal({ ...local, phone: e.target.value })} />
        </div>
        <div className="md:col-span-3">
          <Button onClick={() => setAccount(local)}>Sign Up</Button>
          <span className="ml-3 text-sm text-muted-foreground">Your details auto-fill at checkout.</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ShopNowButton() {
  const { account } = useCart();
  const canShop = Boolean(account?.name && account?.email && account?.phone);
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = canShop ? "checkout" : "signup";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Button onClick={onClick}>Shop Now</Button>
  );
}

function HomeContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const ownerMode = new URLSearchParams(location.search).get("owner") === "1";

  return (
    <>
      <SiteHeader onOpenCart={() => setCartOpen(true)} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-white">
          <div className="container grid gap-8 py-16 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Finest Ittar Fragrances</h1>
              <p className="mt-3 text-muted-foreground">Pure, alcohol-free perfumes delivered to your doorstep across Pakistan.</p>
              <div className="mt-6 flex gap-3">
                <ShopNowButton />
                <a href="#products"><Button variant="outline">Browse Ittar</Button></a>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground" id="about">
                <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded" />
                <span>Cash on Delivery • Flat PKR 250 delivery</span>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1600&auto=format&fit=crop" alt="Ittar bottles" className="rounded-xl shadow-lg" />
              <div className="absolute -right-6 -top-6 hidden rounded-full bg-primary p-8 text-primary-foreground md:block">100% Pure</div>
            </div>
          </div>
        </section>

        {/* Sign up */}
        <section className="container -mt-10" aria-label="Sign up" id="signup">
          <SignupCard />
        </section>

        {/* Products */}
        <section className="container py-12" id="products">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Shop Ittar</h2>
              <p className="text-sm text-muted-foreground">Add to cart and checkout when ready.</p>
            </div>
            <Button onClick={() => setCartOpen(true)} variant="secondary">View Cart</Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {ownerMode && (
            <div className="mt-8">
              <OwnerSettings />
            </div>
          )}
        </section>

        {/* Checkout */}
        <section className="container py-12">
          <CheckoutForm />
          <div id="order-success" className="mt-10 hidden rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 text-emerald-900">
            <div className="text-lg font-semibold">Thanks for shopping from Online Univeral Mart</div>
            <p className="text-sm">You will be contacted shortly for delivery confirmation.</p>
          </div>
        </section>
      </main>
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <SiteFooter />
    </>
  );
}

export default function Index() {
  return <HomeContent />;
}
