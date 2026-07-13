"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring magnetic-target group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase transition duration-300 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "border border-electric/70 bg-electric text-black shadow-electric hover:bg-white hover:shadow-[0_0_54px_rgba(0,174,239,0.48)]",
        secondary:
          "border border-white/18 bg-white/6 text-white backdrop-blur-xl hover:border-reactor/70 hover:bg-reactor/12 hover:shadow-reactor",
        ghost:
          "border border-transparent bg-transparent text-smoke hover:border-white/18 hover:bg-white/8"
      },
      size: {
        default: "min-h-12 px-5",
        lg: "min-h-14 px-7 text-base",
        icon: "size-12 px-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
