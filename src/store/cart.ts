import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, type Product, type Unit } from "@/lib/catalog";

export type CartLine = {
  productId: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (productId, qty = 1) => {
        const existing = get().lines.find((l) => l.productId === productId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.productId === productId ? { ...l, qty: l.qty + qty } : l,
            ),
          });
        } else {
          set({ lines: [...get().lines, { productId, qty }] });
        }
      },
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set({ lines: get().lines.filter((l) => l.productId !== productId) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.productId === productId ? { ...l, qty } : l)),
        });
      },
      remove: (productId) =>
        set({ lines: get().lines.filter((l) => l.productId !== productId) }),
      clear: () => set({ lines: [] }),
    }),
    { name: "sj-online-cart" },
  ),
);

export type ResolvedLine = {
  product: Product;
  qty: number;
  lineTotal: number;
  unit: Unit;
};

export function resolveCart(lines: CartLine[]): ResolvedLine[] {
  return lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId);
      if (!product) return null;
      return {
        product,
        qty: line.qty,
        lineTotal: product.price * line.qty,
        unit: product.unit,
      };
    })
    .filter((x): x is ResolvedLine => x !== null);
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartTotal(lines: CartLine[]) {
  return resolveCart(lines).reduce((n, l) => n + l.lineTotal, 0);
}
