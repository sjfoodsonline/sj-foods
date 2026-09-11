import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { useAllVendors } from "@/store/market";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const vendors = useAllVendors();

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-forest-950 text-cream">
        <img
          src="/hero.jpg"
          alt="Mingora produce market"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-forest-950/55" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Badge className="border-gold-500/40 bg-forest-950/40 text-gold-400">
              Live in Mingora, Swat
            </Badge>
            <h1 className="mt-5 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Swat’s first
              <br />
              online market
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
              SJ Online — Mingora se few hours mein ghar tak. Cash on Delivery,
              WhatsApp order, aur sirf owner-approved vendors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="gold" size="lg" asChild>
                <Link to="/market">
                  Shop the market
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="cream" size="lg" asChild>
                <Link to="/apply">Become a vendor</Link>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-gold-400" /> Local delivery
              </li>
              <li className="flex items-center gap-2">
                <Clock3 className="size-4 text-gold-400" /> Few hours
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="size-4 text-gold-400" /> WhatsApp
              </li>
            </ul>
          </div>
          <aside className="hidden self-center rounded-xl border border-cream/15 bg-forest-950/50 p-6 md:block">
            <p className="text-xs uppercase tracking-wider text-gold-400">Owner controlled</p>
            <p className="mt-2 font-display text-2xl">One market. One standard.</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Categories, units (kg, piece, dozen) aur item pricing owner set karta hai.
              Naye vendors tabhi live hote hain jab aap approve karein.
            </p>
            <div className="mt-6 flex items-start gap-3 text-sm text-cream/80">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold-400" />
              Approved shops only · same units for everyone
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-forest-900">Categories</h2>
            <p className="mt-1 text-sm text-muted">Owner-defined, same for every shop</p>
          </div>
          <Link to="/market" className="text-sm text-forest-800 hover:underline">
            All items
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-xl border border-line bg-cream px-4 py-5 transition-colors hover:border-forest-800"
            >
              <p className="font-medium text-forest-900">{c.name}</p>
              <p className="mt-1 text-xs text-muted">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl text-forest-900">Top deals</h2>
          <p className="mt-1 text-sm text-muted">Standard rates · SJ Foods Mingora</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl text-forest-900">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Order",
              d: "Website se add karein ya WhatsApp pe bhej dein. Order realtime list mein save hota hai.",
            },
            {
              n: "02",
              t: "Approved vendor",
              d: "Sirf owner-approved shop prepare karti hai — same units, same pricing rules.",
            },
            {
              n: "03",
              t: "Delivery",
              d: "Mingora mein few hours. Cash on Delivery ya online payment.",
            },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border border-line bg-paper p-6">
              <p className="text-xs font-medium tracking-wider text-gold-600">{s.n}</p>
              <h3 className="mt-2 font-display text-xl text-forest-900">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl text-forest-900">Shops</h2>
          <p className="mt-1 text-sm text-muted">Har vendor ko apni shop page milti hai. Control owner ke paas.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vendors.map((v) => (
              <Link
                key={v.id}
                to="/shop/$slug"
                params={{ slug: v.slug }}
                className="overflow-hidden rounded-xl border border-line bg-paper"
              >
                <img src={v.cover} alt="" className="h-36 w-full object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg text-forest-900">{v.name}</h3>
                    <Badge
                      className={
                        v.status === "approved"
                          ? "border-forest-100 bg-forest-50 text-forest-800"
                          : "border-gold-100 bg-gold-100 text-forest-900"
                      }
                    >
                      {v.status === "approved" ? "Live" : "Coming soon"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {v.city} · {v.note}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
