"use client";

import Image from "next/image";
import { SplitWords } from "@/components/animations/reveal";

const statements = [
  "Commercial kitchens do not pause when equipment fails.",
  "Rasheed Repairs brings field-tested diagnostics to fryers, refrigeration, electrical systems and appliance faults.",
  "The work is practical, precise and built around uptime."
];

export function RevealTextSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <Image
        src="/images/IMG-20260526-WA0021.jpg"
        alt="Commercial fryer equipment background"
        fill
        className="object-cover opacity-18"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/82 to-background" />
      <div className="site-container relative z-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="eyebrow">Repair discipline</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-smoke/65">
            Inspired by high-performance automotive and industrial product storytelling, the site presents repair work as a premium technical capability.
          </p>
        </div>
        <div className="space-y-8 font-display text-4xl font-black uppercase leading-[1.03] text-white md:text-6xl">
          {statements.map((statement) => (
            <p key={statement} className="text-balance">
              <SplitWords text={statement} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
