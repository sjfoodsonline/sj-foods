import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";
import { getCategory, productsByCategory } from "@/lib/catalog";

export const Route = createFileRoute("/category/$slug")({ component: CategoryPage });

function CategoryPage() {
  const { slug } = Route.useParams();
  const category = getCategory(slug);
  const items = productsByCategory(slug);

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <Link to="/" className="text-sm text-muted hover:text-forest-900">
          Home
        </Link>
        <h1 className="mt-3 font-display text-4xl text-forest-900">
          {category?.name ?? "Category"}
        </h1>
        <p className="mt-2 text-sm text-muted">{category?.blurb}</p>
        {items.length === 0 ? (
          <p className="mt-10 text-sm text-muted">Is category mein abhi items nahi hain.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
