"use client";

import Image from "next/image";
import { useState } from "react";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] shadow-insetGlow">
      <div className="relative aspect-[16/10] min-h-[360px]">
        <Image src="/images/IMG-20260526-WA0022.jpg" alt="Before repair equipment inspection" fill className="object-cover opacity-75" sizes="100vw" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image src="/images/IMG-20260526-WA0021.jpg" alt="After repair commercial fryer bank operating" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-y-0 w-px bg-electric shadow-electric" style={{ left: `${position}%` }} />
        <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/58 px-4 py-2 text-xs font-bold uppercase text-white backdrop-blur-md">
          After
        </div>
        <div className="absolute right-5 top-5 rounded-full border border-white/12 bg-black/58 px-4 py-2 text-xs font-bold uppercase text-white backdrop-blur-md">
          Before
        </div>
        <input
          type="range"
          min="18"
          max="82"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-x-6 bottom-6 accent-electric"
          aria-label="Before and after comparison slider"
        />
      </div>
    </div>
  );
}
