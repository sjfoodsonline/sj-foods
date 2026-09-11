import { Link } from "@tanstack/react-router";
import { CartSheet } from "@/components/cart-sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="" className="size-10 rounded-full bg-paper object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-base text-forest-900">SJ Online</span>
            <span className="block text-[11px] text-muted">Mingora, Swat</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link to="/" className="hover:text-forest-900">
            Home
          </Link>
          <Link to="/market" className="hover:text-forest-900">
            Market
          </Link>
          <Link to="/apply" className="hover:text-forest-900">
            Become vendor
          </Link>
          <Link to="/owner" className="hover:text-forest-900">
            Owner
          </Link>
        </nav>
        <CartSheet />
      </div>
    </header>
  );
}
