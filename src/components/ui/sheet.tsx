import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SheetCtx = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = createContext<SheetCtx | null>(null);

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactNode;
}) {
  const ctx = useContext(SheetContext);
  if (!ctx) return null;
  const onClick = (event: MouseEvent) => {
    const childOnClick = (children as ReactElement<{ onClick?: (e: MouseEvent) => void }>).props
      ?.onClick;
    childOnClick?.(event);
    ctx.setOpen(true);
  };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onClick?: (e: MouseEvent) => void }>, {
      onClick,
    });
  }
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function SheetClose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(SheetContext);
  return (
    <button type="button" className={className} onClick={() => ctx?.setOpen(false)}>
      {children}
    </button>
  );
}

export function SheetContent({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  const ctx = useContext(SheetContext);
  useEffect(() => {
    if (!ctx?.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ctx]);

  if (!ctx?.open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40"
        onClick={() => ctx.setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-xl outline-none",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="sheet-title" className="font-display text-lg text-forest-900">
            {title}
          </h2>
          <SheetClose className="inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-cream">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
