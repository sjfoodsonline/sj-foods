import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { formatPkr, waOrderUrl } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { cartCount, cartTotal, resolveCart, useCart } from "@/store/cart";
import { useMarket } from "@/store/market";

export function CartSheet() {
  const { lines, setQty, remove, clear } = useCart();
  const whatsapp = useMarket((s) => s.whatsapp);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(lines) : 0;
  const items = hydrated ? resolveCart(lines) : [];
  const total = cartTotal(lines);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);

  function sendWhatsApp() {
    const list = items
      .map((l) => `• ${l.product.name} x ${l.qty} ${l.unit} = ${formatPkr(l.lineTotal)}`)
      .join("\n");
    const message = `SJ Online Order (Mingora)\nName: ${name || "Customer"}\nAddress: ${address || "Mingora"}\n\n${list}\n\nTotal: ${formatPkr(total)}\nPayment: Cash on Delivery`;
    window.open(waOrderUrl(whatsapp, message), "_blank", "noopener,noreferrer");
    clear();
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="gold" size="sm" className="relative">
          <ShoppingBag className="size-4" />
          Cart
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-forest-950 text-[10px] font-semibold text-cream tabular-nums">
              {count}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent title="Your order">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <p className="text-sm text-muted">Cart khali hai. Market se item add karein.</p>
            ) : (
              items.map((line) => (
                <div key={line.product.id} className="flex gap-3">
                  <img
                    src={line.product.image}
                    alt=""
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-forest-900">{line.product.name}</p>
                    <p className="text-xs text-muted tabular-nums">
                      {formatPkr(line.product.price)} / {line.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        onClick={() => setQty(line.product.id, line.qty - 1)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        onClick={() => setQty(line.product.id, line.qty + 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                      <button
                        type="button"
                        className="ml-auto text-muted hover:text-forest-900"
                        onClick={() => remove(line.product.id)}
                        aria-label="Remove"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 ? (
              <div className="space-y-3 border-t border-line pt-4">
                <div>
                  <Label htmlFor="cust-name">Name</Label>
                  <Input
                    id="cust-name"
                    className="mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aapka naam"
                  />
                </div>
                <div>
                  <Label htmlFor="cust-addr">Delivery address (Mingora)</Label>
                  <Input
                    id="cust-addr"
                    className="mt-1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Mohalla / street"
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="border-t border-line p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted">Total</span>
              <span className="font-semibold tabular-nums text-forest-900">
                {formatPkr(total)}
              </span>
            </div>
            <Button
              variant="gold"
              className="w-full"
              disabled={items.length === 0}
              onClick={sendWhatsApp}
            >
              Send order on WhatsApp
            </Button>
            <p className="mt-2 text-center text-xs text-muted">
              Cash on Delivery · few hours in Mingora
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
