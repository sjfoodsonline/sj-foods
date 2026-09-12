import { cva, type VariantProps } from "class-variance-authority";
import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
  {
    variants: {
      variant: {
        default: "bg-forest-900 text-cream hover:bg-forest-800",
        gold: "bg-gold-500 text-forest-950 hover:bg-gold-600",
        outline:
          "border border-forest-800 bg-transparent text-forest-900 hover:bg-forest-50",
        ghost: "text-forest-900 hover:bg-forest-50",
        cream: "bg-cream text-forest-950 hover:bg-gold-100",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
