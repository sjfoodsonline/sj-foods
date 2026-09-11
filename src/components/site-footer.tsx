import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-forest-950 text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <img src="/logo.png" alt="" className="size-9 rounded-full bg-paper object-contain" />
            <p className="font-display text-lg">SJ Online</p>
          </div>
          <p className="max-w-xs text-sm text-cream/70">
            Swat ka pehla online market. Mingora local delivery, Cash on Delivery, WhatsApp orders.
            Categories, units aur pricing owner set karta hai.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Links</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>
              <Link to="/market" className="hover:text-cream">
                Market
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:text-cream">
                Become a vendor
              </Link>
            </li>
            <li>
              <Link to="/owner" className="hover:text-cream">
                Owner desk
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Service</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Mingora, Swat</li>
            <li>Delivery in a few hours</li>
            <li>Cash on Delivery + online later</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © 2026 SJ Online · Mingora Swat
      </p>
    </footer>
  );
}
