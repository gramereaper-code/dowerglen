"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "focus-ring flex min-h-12 w-full rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white shadow-insetGlow transition placeholder:text-white/38 focus:border-electric/70 focus:bg-white/[0.07]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
