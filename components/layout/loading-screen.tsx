"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const tick = (time: number) => {
      const elapsed = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setComplete(true), 260);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-background transition duration-700 ease-out ${
        complete ? "pointer-events-none scale-[1.02] opacity-0 blur-xl" : "opacity-100"
      }`}
      aria-hidden={complete}
    >
      <div className="absolute inset-0 bg-industrial-grid bg-[length:58px_58px] opacity-25" />
      <div className="absolute inset-0 bg-radial-reactor" />
      <div className="relative flex w-[min(88vw,520px)] flex-col items-center gap-8 text-center">
        <div className="relative grid size-36 place-items-center">
          <div className="absolute inset-0 rounded-full border border-electric/30" />
          <div className="absolute inset-4 animate-spin rounded-full border-x border-electric/80 border-y-transparent" />
          <div className="absolute inset-8 animate-[spin_1.4s_linear_infinite_reverse] rounded-full border-x border-reactor/80 border-y-transparent" />
          <div className="size-16 rounded-full border border-white/16 bg-white/8 shadow-electric" />
        </div>
        <div>
          <p className="eyebrow">Mechanical startup sequence</p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase text-white">Rasheed Repairs</h1>
        </div>
        <div className="w-full">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-electric transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs uppercase text-smoke/70">
            <span>Calibrating systems</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
