import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { useLocation } from "react-router-dom";
import type { Product } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add, settings, setSettings, account } = useCart();
  const location = useLocation();
  const ownerMode = new URLSearchParams(location.search).get("owner") === "1";
  const price = settings.priceOverrides?.[product.id] ?? product.price;
  const canShop = Boolean(account?.name && account?.email && account?.phone);

  return (
    <Card className="overflow-hidden">
      <img
        src={product.imageUrl || "/placeholder.svg"}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between gap-2">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">{product.ml} ml</div>
          {ownerMode ? (
            <div className="flex items-center gap-2">
              <span className="text-xs">PKR</span>
              <Input
                type="number"
                value={price}
                onChange={(e) =>
                  setSettings({
                    priceOverrides: {
                      ...(settings.priceOverrides || {}),
                      [product.id]: Number(e.target.value || 0),
                    },
                  })
                }
                className="h-9 w-24"
              />
            </div>
          ) : (
            <div className="text-lg font-semibold">PKR {price.toLocaleString()}</div>
          )}
        </div>
        <Button onClick={() => add({ ...product, price })} disabled={!canShop} title={!canShop ? "Please sign up first" : undefined}>Add to cart</Button>
      </CardContent>
    </Card>
  );
}
