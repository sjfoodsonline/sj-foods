import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";
import { VENDORS } from "@/lib/catalog";
import { formatPkr } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const vendor = VENDORS.find((v) => v.id === product.vendorId);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-paper">
      <Link to="/shop/$slug" params={{ slug: vendor?.slug ?? "sj-foods" }} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display text-lg text-forest-900">{product.name}</h3>
          <p className="text-xs text-muted">{product.roman} · per {product.unit}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="text-sm font-semibold tabular-nums text-forest-900">
            {formatPkr(product.price)}
          </p>
          <Button
            size="sm"
            variant="gold"
            onClick={() => add(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
