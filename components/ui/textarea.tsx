"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "focus-ring flex min-h-36 w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white shadow-insetGlow transition placeholder:text-white/38 focus:border-electric/70 focus:bg-white/[0.07]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
