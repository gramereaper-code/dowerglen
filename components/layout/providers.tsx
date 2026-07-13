"use client";

import { CustomCursor } from "@/components/layout/custom-cursor";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      {children}
    </>
  );
}
