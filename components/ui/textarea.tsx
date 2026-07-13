import { cn } from "@/lib/utilities/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-2xl border border-border bg-white px-4 py-3 text-[0.95rem] text-[var(--text)] outline-none transition placeholder:text-[var(--text-secondary)] focus:border-electric focus:ring-4 focus:ring-electric/15",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
