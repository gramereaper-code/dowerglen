"use client";

import { useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      onMouseMove={(event) => {
        const element = ref.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.18, y: y * 0.18, duration: 0.45, ease: "power3.out" });
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.45)" });
      }}
    >
      {children}
    </div>
  );
}
