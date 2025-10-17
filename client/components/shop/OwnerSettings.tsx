import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/cart";
import { useState } from "react";

export function OwnerSettings() {
  const { settings, setSettings } = useCart();
  const [email, setEmail] = useState(settings.email || "");

  return (
    <section id="owner" className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">Owner Settings</h3>
      <p className="mt-1 text-sm text-muted-foreground">Configure the email to receive orders (WhatsApp is always used).</p>
      <div className="mt-4 max-w-md space-y-2">
        <Label htmlFor="owner-email">Order Email</Label>
        <Input id="owner-email" type="email" placeholder="owner@yourdomain.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button className="mt-2 w-fit" onClick={() => setSettings({ email })}>Save</Button>
      </div>
    </section>
  );
}
