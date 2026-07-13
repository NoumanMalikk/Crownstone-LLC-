import { cn } from "@/lib/utilities/cn";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-border bg-white px-4 py-3 text-[0.95rem] text-[var(--text)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-electric focus:ring-4 focus:ring-electric/15",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
