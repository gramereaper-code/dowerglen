"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const controls = useAnimationControls();

  useEffect(() => {
    controls.set({ opacity: 0, y: 18, filter: "blur(12px)" });
    void controls.start({ opacity: 1, y: 0, filter: "blur(0px)" });
  }, [controls, pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
      animate={controls}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
