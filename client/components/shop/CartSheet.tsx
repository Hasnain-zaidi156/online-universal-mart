import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { items, setQty, remove, subtotal, delivery, total, account } = useCart();

  useEffect(() => {
    if (open) document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review items and proceed to checkout.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4 overflow-y-auto">
          {items.length === 0 && <div className="text-sm text-muted-foreground">Your cart is empty.</div>}
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <img src={item.product.imageUrl || "/placeholder.svg"} alt={item.product.name} className="h-16 w-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium">{item.product.name}</div>
                <div className="text-xs text-muted-foreground">{item.product.ml} ml</div>
                <div className="text-sm">PKR {item.product.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => setQty(item.product.id, Math.max(1, item.qty - 1))}><Minus /></Button>
                <Input className="w-12 text-center" type="number" value={item.qty} onChange={(e) => setQty(item.product.id, Math.max(1, Number(e.target.value || 1)))} />
                <Button size="icon" variant="outline" onClick={() => setQty(item.product.id, item.qty + 1)}><Plus /></Button>
              </div>
              <Button size="icon" variant="ghost" onClick={() => remove(item.product.id)}><Trash2 /></Button>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>PKR {delivery.toLocaleString()}</span></div>
          <div className="flex justify-between font-semibold text-primary"><span>Total</span><span>PKR {total.toLocaleString()}</span></div>
        </div>
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <a href={account?.name && account?.email && account?.phone ? "#checkout" : "#signup"}>
              <Button className="w-full">{account?.name && account?.email && account?.phone ? "Proceed to Checkout" : "Sign Up to Checkout"}</Button>
            </a>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
