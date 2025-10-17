import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/cart";
import { useMemo, useState } from "react";

function buildMessage({ name, email, phone, address1, address2, city }: Record<string, string>,
  itemsText: string, subtotal: number, delivery: number, total: number) {
  return `New Ittar Order - ONLINE UNIVERSAL MART\n\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address1}${address2 ? ", " + address2 : ""}, ${city}\n\nItems:\n${itemsText}\nSubtotal: PKR ${subtotal.toLocaleString()}\nDelivery: PKR ${delivery.toLocaleString()}\nTotal: PKR ${total.toLocaleString()}\n\nPayment: Cash on Delivery\n\nThanks for shopping from Online Univeral Mart`;
}

export function CheckoutForm() {
  const { items, subtotal, delivery, total, clear, account, setAccount, settings } = useCart();
  const [form, setForm] = useState({
    name: account?.name || "",
    email: account?.email || "",
    phone: account?.phone || "",
    address1: "",
    address2: "",
    city: "",
  });

  const itemsText = useMemo(
    () => items.map((i) => `• ${i.product.name} (${i.product.ml}ml) x${i.qty} — PKR ${(i.product.price * i.qty).toLocaleString()}`).join("\n"),
    [items],
  );

  const message = buildMessage(form, itemsText, subtotal, delivery, total);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccount({ name: form.name, email: form.email, phone: form.phone });

    const phoneIntl = "923332385779"; // 0333 2385779
    const waUrl = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, "_blank");

    if (settings.email) {
      const subject = encodeURIComponent("New Ittar Order - ONLINE UNIVERSAL MART");
      const mail = `mailto:${encodeURIComponent(settings.email)}?subject=${subject}&body=${encodeURIComponent(message)}`;
      setTimeout(() => window.open(mail, "_blank"), 200);
    }

    clear();
    const successEl = document.getElementById("order-success");
    if (successEl) {
      successEl.classList.remove("hidden");
      successEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={onSubmit} id="checkout">
      <div className="md:col-span-2"><h3 className="text-xl font-semibold">Checkout</h3></div>
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="address1">Address</Label>
        <Input id="address1" required value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="address2">Address 2 (optional)</Label>
        <Input id="address2" value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      </div>

      <div className="md:col-span-2 space-y-2">
        <div className="text-sm text-muted-foreground">Payment method</div>
        <div className="rounded-md border p-3">Cash on Delivery</div>
      </div>

      <div className="md:col-span-2 mt-2 flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">Subtotal + Delivery</div>
        <div className="text-lg font-semibold">PKR {total.toLocaleString()}</div>
      </div>

      <div className="md:col-span-2">
        <Button className="w-full md:w-auto">Place Order via WhatsApp {settings.email ? " + Email" : ""}</Button>
      </div>
    </form>
  );
}
