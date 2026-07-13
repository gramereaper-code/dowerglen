"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "focus-ring flex min-h-12 w-full rounded-lg border border-white/12 bg-graphite px-4 py-3 text-sm text-white shadow-insetGlow transition focus:border-electric/70 focus:bg-[#141414]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export { Select };
