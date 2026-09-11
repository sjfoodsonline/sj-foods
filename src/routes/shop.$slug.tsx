import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { productsByVendor } from "@/lib/catalog";
import { useAllVendors } from "@/store/market";

export const Route = createFileRoute("/shop/$slug")({ component: ShopPage });

function ShopPage() {
  const { slug } = Route.useParams();
  const vendors = useAllVendors();
  const vendor = vendors.find((v) => v.slug === slug);
  const items = vendor ? productsByVendor(vendor.id) : [];

  if (!vendor) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="font-display text-3xl text-forest-900">Shop not found</h1>
          <Link to="/" className="mt-4 inline-block text-sm text-forest-800 underline">
            Back home
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="relative h-48 overflow-hidden bg-forest-950 md:h-64">
        <img src={vendor.cover} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-forest-950/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 py-6 text-cream">
          <Badge className="border-gold-500/40 bg-forest-950/50 text-gold-400">
            {vendor.status === "approved" ? "Live shop" : "Coming soon"}
          </Badge>
          <h1 className="mt-2 font-display text-4xl">{vendor.name}</h1>
          <p className="text-sm text-cream/80">
            {vendor.city} · {vendor.note}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        {vendor.status !== "approved" ? (
          <p className="rounded-xl border border-gold-100 bg-gold-100/60 p-6 text-sm text-forest-900">
            Yeh shop owner approval ke baad live hogi. Same categories, units aur pricing rules
            apply honge.
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted">Is shop pe abhi products list nahi hue.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
