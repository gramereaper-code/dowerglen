"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/animations/reveal";

const MechanicalCore = dynamic(() => import("@/components/3d/MechanicalCore"), {
  ssr: false,
  loading: () => <div className="grid h-[72vh] min-h-[520px] place-items-center text-smoke/60">Calibrating 3D machine core...</div>
});

export function MechanicalCoreSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#060707]">
      <div className="absolute inset-0 bg-industrial-grid bg-[length:80px_80px] opacity-20" />
      <div className="absolute inset-0 bg-radial-reactor opacity-70" />
      <div className="section-pad relative z-10 pb-0">
        <div className="site-container">
          <SectionHeading
            eyebrow="Interactive engineering core"
            title="A responsive mechanical system built to feel alive."
            copy="Move your cursor across the machine core. The gear train responds with metallic light, easing motion and particle sparks."
          />
        </div>
      </div>
      <div className="relative z-10 -mt-8">
        <MechanicalCore />
      </div>
    </section>
  );
}
