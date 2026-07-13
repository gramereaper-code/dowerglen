"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 420, damping: 32, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 420, damping: 32, mass: 0.45 });
  const [hovering, setHovering] = useState(false);
  const trail = useMemo(() => Array.from({ length: 5 }, (_, index) => index), []);

  useEffect(() => {
    const canUseCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canUseCursor) return;

    const move = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest("a,button,input,textarea,select,.magnetic-target,[data-cursor='expand']")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden="true">
      {trail.map((index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-electric/20 blur-md"
          style={{
            x,
            y,
            width: hovering ? 42 - index * 3 : 22 - index * 2,
            height: hovering ? 42 - index * 3 : 22 - index * 2,
            marginLeft: hovering ? -21 + index * 1.5 : -11 + index,
            marginTop: hovering ? -21 + index * 1.5 : -11 + index,
            opacity: 0.22 - index * 0.03,
            transitionDelay: `${index * 18}ms`
          }}
        />
      ))}
      <motion.span
        className="absolute rounded-full border border-electric/90 bg-white/8 mix-blend-screen shadow-electric backdrop-blur-sm"
        style={{
          x,
          y,
          width: hovering ? 58 : 24,
          height: hovering ? 58 : 24,
          marginLeft: hovering ? -29 : -12,
          marginTop: hovering ? -29 : -12
        }}
        animate={{ rotate: hovering ? 135 : 0, borderRadius: hovering ? "34%" : "50%" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </div>
  );
}
