import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/market")({ component: MarketPage });

function MarketPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl text-forest-900">Market</h1>
        <p className="mt-2 text-sm text-muted">
          All items follow owner units and pricing. Mingora delivery.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
