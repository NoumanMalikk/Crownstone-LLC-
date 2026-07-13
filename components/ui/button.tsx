import { cn } from "@/lib/utilities/cn";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  dark: "btn btn-dark",
  ghost: "btn bg-transparent hover:bg-cool-gray/70 text-inherit",
  outline:
    "btn border border-border bg-white text-[var(--text)] hover:border-electric hover:text-electric",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(variants[variant], "disabled:opacity-50 disabled:pointer-events-none", className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
