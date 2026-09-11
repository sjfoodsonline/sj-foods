import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_WHATSAPP, VENDORS, type Vendor } from "@/lib/catalog";
import { useHydrated } from "@/lib/use-hydrated";

export type VendorApplication = {
  id: string;
  name: string;
  city: string;
  phone: string;
  note: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

type MarketState = {
  whatsapp: string;
  applications: VendorApplication[];
  extraVendors: Vendor[];
  setWhatsapp: (phone: string) => void;
  apply: (data: Omit<VendorApplication, "id" | "status" | "createdAt">) => void;
  decide: (id: string, status: "approved" | "rejected") => void;
};

export const useMarket = create<MarketState>()(
  persist(
    (set, get) => ({
      whatsapp: DEFAULT_WHATSAPP,
      applications: [],
      extraVendors: [],
      setWhatsapp: (phone) => set({ whatsapp: phone }),
      apply: (data) => {
        const id = `app-${Date.now()}`;
        set({
          applications: [
            {
              ...data,
              id,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
            ...get().applications,
          ],
        });
      },
      decide: (id, status) => {
        const app = get().applications.find((a) => a.id === id);
        if (!app) return;
        const extraVendors =
          status === "approved"
            ? [
                ...get().extraVendors,
                {
                  id,
                  slug: id,
                  name: app.name,
                  city: app.city || "Mingora",
                  status: "approved" as const,
                  cover: "/hero.jpg",
                  note: "Approved by owner",
                },
              ]
            : get().extraVendors;
        set({
          applications: get().applications.map((a) =>
            a.id === id ? { ...a, status } : a,
          ),
          extraVendors,
        });
      },
    }),
    { name: "sj-online-market" },
  ),
);

export function useAllVendors(): Vendor[] {
  const extra = useMarket((s) => s.extraVendors);
  const hydrated = useHydrated();
  const map = new Map<string, Vendor>();
  for (const v of VENDORS) map.set(v.id, v);
  if (hydrated) {
    for (const v of extra) map.set(v.id, v);
  }
  return [...map.values()];
}
