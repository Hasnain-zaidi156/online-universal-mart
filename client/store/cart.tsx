import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number; // PKR
  ml: number;
  notes?: string;
  imageUrl?: string;
};

export type CartItem = { product: Product; qty: number };

const DELIVERY_FEE = 250; // PKR

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export type OwnerSettings = {
  email?: string;
  priceOverrides?: Record<string, number>;
};

const OWNER_KEY = "oum.owner.settings";
const CART_KEY = "oum.cart.items";
const ACCOUNT_KEY = "oum.account";

export type Account = {
  name: string;
  email: string;
  phone: string;
};

type CartContextValue = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  setQty: (id: string, qty: number) => void;
  subtotal: number;
  delivery: number;
  total: number;
  settings: OwnerSettings;
  setSettings: (s: OwnerSettings) => void;
  account: Account | null;
  setAccount: (a: Account | null) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => load(CART_KEY, []));
  const [settings, setSettingsState] = useState<OwnerSettings>(() =>
    load(OWNER_KEY, {}),
  );
  const [account, setAccount] = useState<Account | null>(() =>
    load<Account | null>(ACCOUNT_KEY, null),
  );

  useEffect(() => save(CART_KEY, items), [items]);
  useEffect(() => save(OWNER_KEY, settings), [settings]);
  useEffect(() => save(ACCOUNT_KEY, account), [account]);

  const add = (product: Product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { product, qty }];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));
  const clear = () => setItems([]);
  const setQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items],
  );
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  const setSettings = (s: OwnerSettings) => setSettingsState((prev) => ({ ...prev, ...s }));

  const value: CartContextValue = {
    items,
    add,
    remove,
    clear,
    setQty,
    subtotal,
    delivery,
    total,
    settings,
    setSettings,
    account,
    setAccount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { DELIVERY_FEE };
